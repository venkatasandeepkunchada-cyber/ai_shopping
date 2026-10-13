export interface TechTerm {
  term: string;
  category: 'performance' | 'display' | 'battery' | 'camera' | 'storage' | 'build';
  simpleExplanation: string;
  everydayAnalogy: string;
  ruleOfThumb: string;
  exampleValues: { spec: string; meaning: string }[];
}

export const TECH_GLOSSARY: TechTerm[] = [
  {
    term: 'RAM (Random Access Memory)',
    category: 'performance',
    simpleExplanation: 'RAM is your device’s short-term desk space where active apps, open browser tabs, and games run at high speed.',
    everydayAnalogy: 'Think of RAM as the size of your study table. A small desk holds only 1 book before you must pack it away; a large desk lets you spread out 10 notebooks, reference books, and calculator simultaneously without clutter.',
    ruleOfThumb: 'For smartphones: 8GB is the sweet spot. For laptops: 16GB is ideal for programming, compiling code, and heavy Chrome multitasking (8GB is minimum).',
    exampleValues: [
      { spec: '8GB RAM', meaning: 'Runs 15-20 apps without refreshing in background; smooth daily multitasking.' },
      { spec: '16GB RAM', meaning: 'Zero lag with Android Studio, VS Code, Docker, plus 30+ browser tabs open.' },
      { spec: 'LPDDR5X', meaning: 'Latest generation mobile RAM that transfers data 30% faster while using less battery.' }
    ]
  },
  {
    term: 'Processor (CPU / SoC)',
    category: 'performance',
    simpleExplanation: 'The brain of your phone or laptop. It determines how fast apps open, how smooth games run, and how quickly photos process.',
    everydayAnalogy: 'Think of the processor as the engine of a car. A 1000cc engine gets you to the grocery store fine (budget chip), but an AMG V8 twin-turbo reaches 100 km/h in 3 seconds and hauls heavy cargo easily (flagship chip).',
    ruleOfThumb: 'In phones: Snapdragon 7/8 series or Dimensity 8000/9000 series are best. In laptops: Intel Core i5/i7 (H-series for power, U-series for battery) or Apple M-series.',
    exampleValues: [
      { spec: 'Dimensity 8300 / Snapdragon 8 Gen 2', meaning: 'Flagship power; plays heavy 3D games like BGMI/COD at 60-90 frames per second.' },
      { spec: 'Intel Core i5-12450H', meaning: 'High-performance laptop chip with dedicated performance & efficiency cores.' },
      { spec: 'Apple M2', meaning: 'Custom ARM architecture uniting CPU, GPU, and AI engine with insane battery efficiency.' }
    ]
  },
  {
    term: 'Refresh Rate (Hz)',
    category: 'display',
    simpleExplanation: 'The number of times the screen updates its picture every single second. Measured in Hertz (Hz).',
    everydayAnalogy: 'Think of a cartoon flipbook. A flipbook with 60 pages per second looks okay, but one with 120 pages looks extraordinarily smooth and lifelike, like fluid water.',
    ruleOfThumb: '120Hz makes everyday scrolling, Instagram feeds, and menu animations feel butter-smooth compared to traditional 60Hz.',
    exampleValues: [
      { spec: '60 Hz', meaning: 'Standard baseline; acceptable for reading, but scrolling feels slightly choppy.' },
      { spec: '120 Hz / 144 Hz', meaning: 'Ultra-smooth; feels instantaneous to the touch and provides competitive edge in fast gaming.' },
      { spec: 'LTPO 1-120 Hz', meaning: 'Smart variable refresh rate: drops to 1Hz when reading text to save battery, jumps to 120Hz when you scroll.' }
    ]
  },
  {
    term: 'Display Panel: AMOLED vs IPS LCD',
    category: 'display',
    simpleExplanation: 'The physical screen technology. AMOLED lights up each individual pixel, whereas IPS LCD uses a continuous backlight behind the entire screen.',
    everydayAnalogy: 'AMOLED is like having millions of microscopic individual light bulbs. To show black, it literally turns the bulbs completely OFF (yielding infinite true black and saving battery). LCD is like shining a flashlight through stained glass.',
    ruleOfThumb: 'Always choose AMOLED when possible for phones for richer colors, deeper blacks, and sunlight readability.',
    exampleValues: [
      { spec: 'AMOLED / OLED', meaning: 'True blacks, punchy vibrant colors, supports Always-On Display (AOD), thinner bezels.' },
      { spec: 'IPS LCD', meaning: 'Natural color reproduction and zero risk of burn-in; common in budget laptops and monitors.' },
      { spec: 'Peak Brightness (Nits)', meaning: '1000+ nits means you can read the screen effortlessly even under harsh midday Indian sunlight.' }
    ]
  },
  {
    term: 'Battery Capacity (mAh) & Charging Wattage (W)',
    category: 'battery',
    simpleExplanation: 'mAh (milliampere-hours) is the fuel tank size. Wattage (W) is the speed of the fuel pump.',
    everydayAnalogy: 'A 5500 mAh battery is a 55-liter petrol tank. A 100W charger is a high-speed racing pit-stop fuel hose that fills the whole tank in 25 minutes, whereas a 15W charger is a slow garden hose.',
    ruleOfThumb: 'For phones: 5000 mAh + 67W+ charging will easily give 1 full day of heavy use and recharge in under 45 minutes.',
    exampleValues: [
      { spec: '5000 - 5500 mAh', meaning: 'Full 1.5 to 2 days of moderate social media, WhatsApp, and Spotify.' },
      { spec: '67W / 100W Charging', meaning: '0% to 100% in ~25 to 45 minutes; 15 minutes in the morning gives enough juice for a college day.' },
      { spec: 'WHrs (Laptops)', meaning: 'Laptop battery capacity; 50WHr+ with an efficient chip yields 7-10 hours real-world battery.' }
    ]
  },
  {
    term: 'Storage: UFS 2.2 vs UFS 3.1 vs NVMe SSD',
    category: 'storage',
    simpleExplanation: 'The permanent digital closet where your photos, apps, operating system, and videos live.',
    everydayAnalogy: 'Older eMMC storage is like walking upstairs to fetch a book. UFS 3.1 is like having a motorized conveyor belt bring it in 1 second. NVMe SSD is like having a teleportation pod.',
    ruleOfThumb: 'Look for UFS 3.1 or UFS 4.0 in phones for snappy app launches and fast phone restarts. Look for PCIe NVMe SSDs in laptops.',
    exampleValues: [
      { spec: 'UFS 2.2', meaning: 'Standard budget speed (~500 MB/s read); okay for basic phones.' },
      { spec: 'UFS 3.1 / UFS 4.0', meaning: 'Blazing fast (2000-4000 MB/s); installs large 3GB games in seconds and opens apps instantly.' },
      { spec: 'PCIe Gen 4 NVMe SSD', meaning: 'Laptops boot up Windows in 8 seconds and load heavy IDE projects without stalling.' }
    ]
  },
  {
    term: 'Camera: Megapixels (MP) vs Sensor Size vs OIS',
    category: 'camera',
    simpleExplanation: 'More megapixels does NOT always mean better photos. A larger physical sensor size and OIS (Optical Image Stabilization) matter far more!',
    everydayAnalogy: 'Megapixels is like dividing a pizza into 200 tiny slices instead of 50. It’s still the same amount of cheese! The sensor size is the size of the whole pizza plate. Larger sensor catches more light.',
    ruleOfThumb: 'A 50MP camera with Sony sensor + OIS takes dramatically sharper and cleaner night photos than a cheap 108MP camera without OIS.',
    exampleValues: [
      { spec: 'OIS (Optical Image Stabilization)', meaning: 'Physical springs that stabilize the lens against shaky hands, keeping low-light photos sharp and video smooth.' },
      { spec: '50MP Sony LYT / IMX sensor', meaning: 'Flagship-grade light intake, rich dynamic range, and natural color science.' },
      { spec: '200MP In-Sensor Zoom', meaning: 'Crops into the middle of the high-res sensor to produce crisp 2x or 4x photos without digital blur.' }
    ]
  },
  {
    term: 'Ingress Protection (IP Rating: IP54 vs IP68)',
    category: 'build',
    simpleExplanation: 'The certified rating for resistance against dust (first digit) and liquids/water (second digit).',
    everydayAnalogy: 'IP54 is like a lightweight raincoat that protects against light rain drizzles. IP68 is like a scuba diving suit that can survive being dropped into a 1.5-meter deep pool.',
    ruleOfThumb: 'IP54 is fine for gym sweat and rain sprinkles. IP68 protects you if you accidentally drop your phone in a bucket, puddle, or washbasin.',
    exampleValues: [
      { spec: 'IP54', meaning: 'Dust protected and splash resistant from any direction.' },
      { spec: 'IP67 / IP68', meaning: 'Completely dust-tight and submersible in fresh water up to 1.5 meters for 30 minutes.' }
    ]
  }
];
