import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS, Product } from './src/data/products.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Warning: Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!apiKey,
    productsCount: PRODUCTS.length,
  });
});

// Helper: Filter candidates according to filters or query
function findMatchingProducts(query: string, filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
}): Product[] {
  let list = [...PRODUCTS];

  if (filters?.category && filters.category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
  }

  if (filters?.minPrice !== undefined && filters.minPrice > 0) {
    list = list.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined && filters.maxPrice > 0) {
    list = list.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.brand) {
    list = list.filter((p) => p.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
  }

  // Also check query keywords for category/budget if filters were default
  const lowerQ = query.toLowerCase();
  if (lowerQ.includes('phone') || lowerQ.includes('mobile')) {
    const phoneList = list.filter((p) => p.category === 'smartphones');
    if (phoneList.length > 0) list = phoneList;
  } else if (lowerQ.includes('laptop') || lowerQ.includes('macbook') || lowerQ.includes('notebook')) {
    const laptopList = list.filter((p) => p.category === 'laptops');
    if (laptopList.length > 0) list = laptopList;
  } else if (lowerQ.includes('watch') || lowerQ.includes('smartwatch')) {
    const watchList = list.filter((p) => p.category === 'smartwatches');
    if (watchList.length > 0) list = watchList;
  } else if (lowerQ.includes('headphone') || lowerQ.includes('earbud') || lowerQ.includes('audio') || lowerQ.includes('tws')) {
    const audioList = list.filter((p) => p.category === 'audio');
    if (audioList.length > 0) list = audioList;
  } else if (lowerQ.includes('tablet') || lowerQ.includes('ipad')) {
    const tabList = list.filter((p) => p.category === 'tablets');
    if (tabList.length > 0) list = tabList;
  }

  return list;
}

// Fallback rule-based recommendation generator
function generateLocalFallbackResponse(
  message: string,
  candidates: Product[],
  priority?: string,
  minBudget?: number,
  maxBudget?: number
) {
  const lowerQ = message.toLowerCase();

  // If specific comparison requested
  const mentionedProducts = PRODUCTS.filter((p) =>
    lowerQ.includes(p.name.toLowerCase()) ||
    lowerQ.includes(p.brand.toLowerCase()) ||
    lowerQ.includes(p.id)
  );

  if (mentionedProducts.length >= 2) {
    const [p1, p2] = mentionedProducts;
    return {
      text: `### ⚖️ Side-by-Side Comparison: **${p1.name}** vs **${p2.name}**\n\n` +
        `**1. Price & Value:**\n` +
        `- **${p1.name}**: ₹${p1.price.toLocaleString('en-IN')} (MRP: ₹${p1.originalPrice.toLocaleString('en-IN')})\n` +
        `- **${p2.name}**: ₹${p2.price.toLocaleString('en-IN')} (MRP: ₹${p2.originalPrice.toLocaleString('en-IN')})\n` +
        `*(Price difference: ₹${Math.abs(p1.price - p2.price).toLocaleString('en-IN')})*\n\n` +
        `**2. Processor & Core Performance:**\n` +
        `- **${p1.name}**: ${p1.specs.processor}\n` +
        `- **${p2.name}**: ${p2.specs.processor}\n\n` +
        `**3. Battery & Charging:**\n` +
        `- **${p1.name}**: ${p1.specs.battery} (${p1.specs.charging || 'Standard'})\n` +
        `- **${p2.name}**: ${p2.specs.battery} (${p2.specs.charging || 'Standard'})\n\n` +
        `**4. Key Pros & Cons:**\n` +
        `- **${p1.name} Pros:** ${p1.pros.join(', ')}. **Cons:** ${p1.cons.join(', ')}.\n` +
        `- **${p2.name} Pros:** ${p2.pros.join(', ')}. **Cons:** ${p2.cons.join(', ')}.\n\n` +
        `**💡 Assistant Verdict:**\n` +
        `Go with **${p1.name}** if your primary goal is **${p1.bestFor}**.\n` +
        `Choose **${p2.name}** if you value **${p2.bestFor}**.`,
      recommendedProductIds: [p1.id, p2.id],
      isAiGrounded: true,
      followUpSuggestions: [
        `What is the camera difference between them?`,
        `Are there better alternatives under ₹${Math.max(p1.price, p2.price).toLocaleString('en-IN')}?`,
        `Add both to Comparison table`
      ]
    };
  }

  // If no candidates match budget
  if (candidates.length === 0) {
    const budgetStr = maxBudget ? `under ₹${maxBudget.toLocaleString('en-IN')}` : 'in this range';
    const closest = [...PRODUCTS].sort((a, b) => (a.price - (maxBudget || 20000)))[0];
    return {
      text: `⚠️ **No exact products found ${budgetStr} in this category.**\n\n` +
        `However, the closest verified match in our catalog is **${closest.name}** at ₹${closest.price.toLocaleString('en-IN')}.\n\n` +
        `Would you like to increase your budget slider slightly, or check alternative categories?`,
      recommendedProductIds: [closest.id],
      isAiGrounded: true,
      followUpSuggestions: [
        'Increase budget limit by ₹5,000',
        'Show all products in this category',
        'Recommend best value alternative'
      ]
    };
  }

  // Sort candidates by priority score
  const sorted = [...candidates].sort((a, b) => {
    if (priority === 'gaming') return b.useCaseScores.gaming - a.useCaseScores.gaming;
    if (priority === 'battery') return b.useCaseScores.batteryLife - a.useCaseScores.batteryLife;
    if (priority === 'camera') return b.useCaseScores.photography - a.useCaseScores.photography;
    if (priority === 'productivity') return b.useCaseScores.productivity - a.useCaseScores.productivity;
    return b.useCaseScores.valueForMoney - a.useCaseScores.valueForMoney;
  });

  const topPick = sorted[0];
  const runnerUp = sorted[1];

  let text = `Based on your request, I searched our verified product database and selected the top recommendations:\n\n` +
    `### 🏆 Top Recommendation: **${topPick.name}**\n` +
    `- **Verified Price:** ₹${topPick.price.toLocaleString('en-IN')} *(MRP: ₹${topPick.originalPrice.toLocaleString('en-IN')})*\n` +
    `- **Rating:** ⭐ ${topPick.rating} / 5 (${topPick.reviewsCount.toLocaleString('en-IN')} reviews)\n` +
    `- **Processor:** ${topPick.specs.processor}\n` +
    `- **RAM & Storage:** ${topPick.specs.ram} | ${topPick.specs.storage}\n` +
    `- **Display:** ${topPick.specs.display}\n` +
    `- **Battery & Fast Charging:** ${topPick.specs.battery} (${topPick.specs.charging || 'Standard'})\n\n` +
    `#### 💡 Why This Matches Your Requirements:\n` +
    `${topPick.bestFor}. It scores **${topPick.useCaseScores.valueForMoney}/10** for Value-For-Money and **${topPick.useCaseScores.gaming}/10** for Gaming.\n\n` +
    `**Key Advantages:**\n` +
    topPick.pros.map((p) => `- ✅ ${p}`).join('\n') + '\n\n' +
    `**Trade-offs to Consider:**\n` +
    topPick.cons.map((c) => `- ⚠️ ${c}`).join('\n');

  if (runnerUp) {
    text += `\n\n---\n` +
      `### 🥈 Alternative Option: **${runnerUp.name}** (₹${runnerUp.price.toLocaleString('en-IN')})\n` +
      `- **Why consider this:** ${runnerUp.bestFor}\n` +
      `- **Advantage over ${topPick.name}:** ${runnerUp.pros[0] || 'Distinct build style'}`;
  }

  return {
    text,
    recommendedProductIds: runnerUp ? [topPick.id, runnerUp.id] : [topPick.id],
    isAiGrounded: true,
    followUpSuggestions: [
      `Compare ${topPick.name} with ${runnerUp ? runnerUp.name : 'other phones'}`,
      `Explain processor speed in simple words`,
      `Show battery life test details`
    ]
  };
}

// Chat API endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], filters, priority } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Match candidates from catalog
    const candidates = findMatchingProducts(message, filters);

    // If Gemini client is not initialized, use local recommendation engine
    if (!ai) {
      const fallback = generateLocalFallbackResponse(
        message,
        candidates,
        priority,
        filters?.minPrice,
        filters?.maxPrice
      );
      res.json(fallback);
      return;
    }

    // Grounding Context: Format relevant verified products as system reference
    const catalogContext = candidates.slice(0, 8).map((p) => {
      return `[PRODUCT_ID: ${p.id}]
Name: ${p.name}
Category: ${p.category}
Brand: ${p.brand}
Price: ₹${p.price.toLocaleString('en-IN')} (Original MRP: ₹${p.originalPrice.toLocaleString('en-IN')})
Rating: ${p.rating} / 5 (${p.reviewsCount} reviews)
Badge: ${p.badge || 'N/A'}
Specs:
  - Processor: ${p.specs.processor}
  - RAM: ${p.specs.ram}
  - Storage: ${p.specs.storage}
  - Display: ${p.specs.display}
  - Battery: ${p.specs.battery}
  - Charging: ${p.specs.charging || 'N/A'}
  - Camera/Audio: ${p.specs.camera || p.specs.audio || 'N/A'}
  - OS: ${p.specs.os || 'N/A'}
Best For: ${p.bestFor}
Pros: ${p.pros.join('; ')}
Cons: ${p.cons.join('; ')}
Scores (out of 10): Gaming=${p.useCaseScores.gaming}, Photo=${p.useCaseScores.photography}, Battery=${p.useCaseScores.batteryLife}, Productivity=${p.useCaseScores.productivity}, Value=${p.useCaseScores.valueForMoney}`;
    }).join('\n\n---\n\n');

    const systemInstruction = `You are an expert, objective, friendly AI Shopping Assistant.
Your goal is to guide shoppers in selecting and ordering the optimal electronics (smartphones, laptops, smartwatches, headphones, tablets) tailored to their budget, technical specifications, and intended usage.

CRITICAL RULES FOR ACCURACY AND ZERO HALLUCINATION:
1. STRICT PRODUCT GROUNDING: Recommend ONLY products that exist in the provided VERIFIED PRODUCT CATALOG below. NEVER fabricate product names, hypothetical models, inaccurate prices, or false specs.
2. ORDERING & PURCHASE ASSISTANCE: You CAN facilitate orders! If the user says "I want to order [product]", "Buy [product]", or asks how to purchase, confirm the product name, exact price in ₹, free express delivery, and payment options (UPI, Cash on Delivery, Cards). Tell them they can click the "Order Now" button on the product card right below your message to complete instant checkout.
3. If the user asks for a price range where no product matches, explicitly inform them that no product is currently cataloged in that exact budget, and suggest the nearest verified alternatives.
4. EXPLAINABLE RECOMMENDATIONS: For every recommendation, explain clearly WHY it matches the user's priorities (gaming, battery, coding, photography, etc.) and what trade-offs they should be aware of.
5. SIMPLE TECHNICAL EXPLANATIONS: If the user asks about technical terms (RAM, ROM, refresh rate, processor, AMOLED vs LCD, mAh, OIS), explain them in simple English using practical everyday analogies (e.g., comparing RAM to desk size or processor to engine horsepower).
6. STRUCTURED PRODUCT CITATIONS: Whenever you recommend, reference, or order a product from the catalog, ALWAYS include its ID tag in your text using the exact format: [REC:product-id] (e.g., [REC:phone-1] or [REC:laptop-2]). This renders the interactive card with the "Order Now" and "Add to Cart" buttons.
7. Provide 2 to 3 concise, relevant follow-up questions or suggestions at the very end in a special block:
[FOLLOWUPS]
- Question 1
- Question 2
[ENDFOLLOWUPS]

CURRENT ACTIVE FILTERS:
Category: ${filters?.category || 'All'}
Budget Min: ₹${(filters?.minPrice || 0).toLocaleString('en-IN')}
Budget Max: ₹${(filters?.maxPrice || 100000).toLocaleString('en-IN')}
User Priority: ${priority || 'Balanced'}

VERIFIED PRODUCT CATALOG:
${catalogContext.length > 0 ? catalogContext : 'No products strictly matched the initial filter window. Reference general electronics catalog if appropriate.'}`;

    // Format conversation history for Gemini API
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Add previous messages (limited to last 6 turns to keep context fast)
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const turn of recentHistory) {
        if (turn && turn.parts && (turn.role === 'user' || turn.role === 'model')) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.parts }],
          });
        }
      }
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const rawText = response.text || '';

    // Extract product IDs tagged with [REC:id]
    const idMatches = Array.from(rawText.matchAll(/\[REC:([a-zA-Z0-9_-]+)\]/g)).map((m) => m[1]);
    const uniqueIds = Array.from(new Set(idMatches));

    // Extract follow-ups
    const followUps: string[] = [];
    const followUpMatch = rawText.match(/\[FOLLOWUPS\]([\s\S]*?)\[ENDFOLLOWUPS\]/);
    if (followUpMatch) {
      const lines = followUpMatch[1].split('\n').map((l) => l.replace(/^[-*•]\s*/, '').trim()).filter(Boolean);
      followUps.push(...lines);
    }

    // Clean text by stripping custom tags for clean markdown rendering
    const cleanedText = rawText
      .replace(/\[REC:[a-zA-Z0-9_-]+\]/g, '')
      .replace(/\[FOLLOWUPS\][\s\S]*?\[ENDFOLLOWUPS\]/g, '')
      .trim();

    res.json({
      text: cleanedText,
      recommendedProductIds: uniqueIds.length > 0 ? uniqueIds : candidates.slice(0, 2).map((p) => p.id),
      isAiGrounded: true,
      followUpSuggestions: followUps.length > 0 ? followUps : [
        'Compare these side-by-side',
        'Explain technical specs in simpler terms',
        'Show best battery life option'
      ],
    });
  } catch (err: any) {
    console.error('Error generating AI response:', err);

    // Fall back to rule-based engine gracefully on any API error or rate limit
    const fallback = generateLocalFallbackResponse(
      req.body.message || '',
      findMatchingProducts(req.body.message || '', req.body.filters),
      req.body.priority,
      req.body.filters?.minPrice,
      req.body.filters?.maxPrice
    );

    res.json({
      ...fallback,
      errorNote: 'Live AI API experienced high demand; responded using grounded local engine.',
    });
  }
});

// Setup Vite middleware for development or serve static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
