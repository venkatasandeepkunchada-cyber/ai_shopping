export interface Product {
  id: string;
  name: string;
  category: 'smartphones' | 'laptops' | 'smartwatches' | 'audio' | 'tablets';
  brand: string;
  price: number; // in INR ₹
  originalPrice: number;
  rating: number; // out of 5
  reviewsCount: number;
  imageUrl: string;
  badge?: 'Best Seller' | 'Best Budget' | 'Editor Pick' | 'Top Performance';
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    battery: string;
    charging?: string;
    camera?: string;
    audio?: string;
    os?: string;
    weight?: string;
  };
  keyHighlights: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  useCaseScores: {
    gaming: number; // 1-10
    photography: number; // 1-10
    batteryLife: number; // 1-10
    productivity: number; // 1-10
    valueForMoney: number; // 1-10
    dailyUse: number; // 1-10
  };
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  // --- SMARTPHONES ---
  {
    id: 'phone-1',
    name: 'OnePlus Nord CE4 5G',
    category: 'smartphones',
    brand: 'OnePlus',
    price: 19999,
    originalPrice: 24999,
    rating: 4.4,
    reviewsCount: 14200,
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Budget',
    specs: {
      processor: 'Qualcomm Snapdragon 7 Gen 3 (4nm)',
      ram: '8GB LPDDR4X (expandable up to 8GB virtual)',
      storage: '128GB UFS 3.1 (expandable up to 1TB)',
      display: '6.7-inch 120Hz FHD+ AMOLED, 2160Hz PWM dimming',
      battery: '5500 mAh Lithium Polymer',
      charging: '100W SUPERVOOC (1-100% in ~29 mins)',
      camera: '50MP Sony LYT-600 with OIS + 8MP Ultra-wide, 16MP Selfie',
      os: 'OxygenOS 14 based on Android 14',
      weight: '186 grams'
    },
    keyHighlights: [
      'Huge 5500 mAh battery with blistering 100W charging',
      'Smooth 120Hz AMOLED display with Aqua Touch feature',
      'Clean, bloatware-minimal OxygenOS experience',
      'Sony LYT-600 sensor with Optical Image Stabilization'
    ],
    pros: [
      'Exceptional battery endurance lasting nearly 2 days',
      'Fast 100W charger included inside the retail box',
      'Great daily multitasking and steady BGMI 60fps gaming',
      'Display touch works reliably even with wet fingers'
    ],
    cons: [
      'Plastic frame and back panel',
      'No dedicated telephoto optical zoom lens',
      'Ultra-wide camera is average in low-light'
    ],
    bestFor: 'All-day gaming, fast charging, and smooth daily social media under ₹20,000',
    useCaseScores: {
      gaming: 8.5,
      photography: 7.8,
      batteryLife: 9.8,
      productivity: 8.2,
      valueForMoney: 9.5,
      dailyUse: 9.2
    },
    inStock: true
  },
  {
    id: 'phone-2',
    name: 'POCO X6 Pro 5G',
    category: 'smartphones',
    brand: 'POCO',
    price: 23999,
    originalPrice: 28999,
    rating: 4.5,
    reviewsCount: 9800,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    badge: 'Top Performance',
    specs: {
      processor: 'MediaTek Dimensity 8300 Ultra (4nm flagship-tier, 1.4M+ AnTuTu)',
      ram: '8GB / 12GB LPDDR5X high-speed RAM',
      storage: '256GB / 512GB UFS 4.0 flash storage',
      display: '6.67-inch 1.5K Flow AMOLED, 120Hz, 1800 nits peak, Dolby Vision',
      battery: '5000 mAh',
      charging: '67W Turbo Charge (full charge in 45 mins)',
      camera: '64MP with OIS + 8MP Ultra-wide + 2MP Macro, 16MP Selfie',
      os: 'Xiaomi HyperOS based on Android 14',
      weight: '186 grams'
    },
    keyHighlights: [
      'Over 1.4 Million AnTuTu benchmark score at under ₹25K',
      'LPDDR5X RAM + ultra-fast UFS 4.0 storage',
      'Sharp 1.5K high-resolution bezel-less Flow AMOLED panel',
      'LiquidCool Technology 2.0 with 5000mm² vapor chamber'
    ],
    pros: [
      'Best gaming performance in its segment (90fps stable)',
      'Crisp, ultra-bright 1.5K display with razor-thin bezels',
      'Fast app installs and load times thanks to UFS 4.0',
      '67W fast charger bundled in box'
    ],
    cons: [
      'HyperOS comes with some pre-installed bloatware',
      'Camera tuning is geared for casual use rather than pro portraits',
      'Battery life is average during heavy gaming'
    ],
    bestFor: 'Hardcore mobile gaming (BGMI, COD, Genshin Impact) and raw processing power',
    useCaseScores: {
      gaming: 9.6,
      photography: 7.2,
      batteryLife: 8.0,
      productivity: 8.8,
      valueForMoney: 9.4,
      dailyUse: 8.7
    },
    inStock: true
  },
  {
    id: 'phone-3',
    name: 'Redmi Note 13 Pro 5G',
    category: 'smartphones',
    brand: 'Redmi',
    price: 21999,
    originalPrice: 25999,
    rating: 4.3,
    reviewsCount: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    specs: {
      processor: 'Snapdragon 7s Gen 2 (4nm)',
      ram: '8GB LPDDR4X',
      storage: '128GB / 256GB UFS 2.2',
      display: '6.67-inch 1.5K AMOLED, 120Hz, Corning Gorilla Glass Victus',
      battery: '5100 mAh',
      charging: '67W Turbo Charge',
      camera: '200MP Samsung HP3 Sensor with OIS + 8MP Ultra-wide + 2MP Macro',
      os: 'MIUI 14 / HyperOS ready',
      weight: '187 grams'
    },
    keyHighlights: [
      'Flagship-grade 200MP camera sensor with lossless 4x in-sensor zoom',
      'Premium double-sided glass design with Gorilla Glass Victus',
      'IP54 dust and splash water resistance',
      'In-display fingerprint scanner with heart rate detection'
    ],
    pros: [
      'Stunning daylight and detailed 200MP portrait photos',
      'Gorgeous 1.5K curved-feel display with tiny bezels',
      'Solid Gorilla Glass Victus build durability',
      '3.5mm headphone jack preserved!'
    ],
    cons: [
      'Snapdragon 7s Gen 2 is slower for heavy gaming than Dimensity 8300',
      'UFS 2.2 storage speeds are slower than UFS 3.1/4.0 competitors',
      'Video stabilization at 4K could be smoother'
    ],
    bestFor: 'Photography enthusiasts, content creators, and everyday media consumption',
    useCaseScores: {
      gaming: 7.4,
      photography: 9.1,
      batteryLife: 8.4,
      productivity: 8.1,
      valueForMoney: 8.8,
      dailyUse: 8.9
    },
    inStock: true
  },
  {
    id: 'phone-4',
    name: 'Motorola Edge 50 Fusion 5G',
    category: 'smartphones',
    brand: 'Motorola',
    price: 22999,
    originalPrice: 25999,
    rating: 4.4,
    reviewsCount: 11200,
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80',
    badge: 'Editor Pick',
    specs: {
      processor: 'Snapdragon 7s Gen 2 (4nm)',
      ram: '8GB / 12GB LPDDR4X',
      storage: '128GB / 256GB UFS 2.2',
      display: '6.7-inch 144Hz 3D Curved pOLED, 1600 nits, Gorilla Glass 5',
      battery: '5000 mAh',
      charging: '68W TurboPower',
      camera: '50MP Sony LYT-700C OIS + 13MP Ultra-wide Macro, 32MP Selfie',
      os: 'Hello UI based on Android 14 (Near Stock)',
      weight: '175 grams (Ultra-light)'
    },
    keyHighlights: [
      'Flagship IP68 underwater and dust protection',
      'Butter-smooth 144Hz 3D Curved pOLED screen',
      'Clean Android experience with zero bloatware or ads',
      'Premium vegan leather back finish'
    ],
    pros: [
      'Real IP68 water protection unheard of at this price point',
      'Super clean and lightweight Android interface',
      'Lightweight and ergonomic in-hand feel (175g)',
      'Sharp 32MP selfie camera with 4K video recording'
    ],
    cons: [
      'Curved screen is prone to accidental palm touches without case',
      'Snapdragon 7s Gen 2 throttles during sustained heavy gaming',
      'Only 3 years of Android version updates'
    ],
    bestFor: 'Users who hate ads/bloatware, love curved premium design, and need IP68 water resistance',
    useCaseScores: {
      gaming: 7.5,
      photography: 8.7,
      batteryLife: 8.5,
      productivity: 8.6,
      valueForMoney: 9.1,
      dailyUse: 9.4
    },
    inStock: true
  },
  {
    id: 'phone-5',
    name: 'Samsung Galaxy A35 5G',
    category: 'smartphones',
    brand: 'Samsung',
    price: 27999,
    originalPrice: 33999,
    rating: 4.3,
    reviewsCount: 7600,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
    badge: 'Editor Pick',
    specs: {
      processor: 'Exynos 1380 (5nm octa-core)',
      ram: '8GB RAM',
      storage: '128GB / 256GB (microSD up to 1TB)',
      display: '6.6-inch FHD+ Super AMOLED, 120Hz, 1000 nits Vision Booster',
      battery: '5000 mAh',
      charging: '25W Fast Charging (Adapter not included)',
      camera: '50MP OIS Main + 8MP Ultra-wide + 5MP Macro, 13MP Front',
      os: 'One UI 6.1 (4 OS Upgrades + 5 Years Security Updates)',
      weight: '209 grams'
    },
    keyHighlights: [
      'Industry-leading 4 major Android updates & 5 years security patches',
      'Samsung Knox Vault hardware-level security',
      'IP67 dust and water resistance with Gorilla Glass Victus+',
      'Signature Galaxy floating camera design'
    ],
    pros: [
      'Superb long-term software support and regular updates',
      'Reliable daylight camera colors and natural skin tones',
      'IP67 water resistance rating',
      'Expandable storage via microSD slot'
    ],
    cons: [
      'Charging speed capped at 25W; charger sold separately',
      'Exynos processor runs slightly warm during heavy games',
      'Thicker bezels compared to Chinese competitors'
    ],
    bestFor: 'Long-term reliability (4+ years), Samsung ecosystem, and secure business/college use',
    useCaseScores: {
      gaming: 7.0,
      photography: 8.6,
      batteryLife: 8.6,
      productivity: 9.0,
      valueForMoney: 8.0,
      dailyUse: 9.1
    },
    inStock: true
  },
  {
    id: 'phone-6',
    name: 'iQOO Neo 9 Pro 5G',
    category: 'smartphones',
    brand: 'iQOO',
    price: 34999,
    originalPrice: 39999,
    rating: 4.6,
    reviewsCount: 8400,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    badge: 'Top Performance',
    specs: {
      processor: 'Snapdragon 8 Gen 2 (4nm Flagship SoC) + Supercomputing Chip Q1',
      ram: '8GB / 12GB LPDDR5X',
      storage: '256GB UFS 4.0',
      display: '6.78-inch 1.5K 144Hz LTPO AMOLED, 3000 nits peak',
      battery: '5160 mAh',
      charging: '120W FlashCharge (0 to 50% in 11 minutes)',
      camera: '50MP Sony IMX920 VCS (from Vivo X100 flagship) with OIS + 8MP Ultra-wide',
      os: 'Funtouch OS 14 based on Android 14',
      weight: '190 grams'
    },
    keyHighlights: [
      'True flagship Snapdragon 8 Gen 2 processor under ₹35,000',
      'Dual-chip architecture with Q1 gaming frame interpolation up to 144fps',
      'Sony IMX920 flagship camera sensor with custom bionic tuning',
      '120W FlashCharge adapter bundled in the box'
    ],
    pros: [
      'Unstoppable sustained gaming performance with minimal thermal throttling',
      'Top-tier flagship photo quality with vibrant portrait bokeh',
      '144Hz LTPO display with intelligent variable refresh rate',
      'Rapid 120W charging that powers from 0 to 100% in ~24 minutes'
    ],
    cons: [
      'Funtouch OS has some notification clutter',
      'Plastic frame rather than metal',
      'No IP68 water rating'
    ],
    bestFor: 'Competitive mobile esports, heavy multitasking, and flagship photography under ₹35K',
    useCaseScores: {
      gaming: 9.9,
      photography: 9.2,
      batteryLife: 8.8,
      productivity: 9.2,
      valueForMoney: 9.6,
      dailyUse: 9.3
    },
    inStock: true
  },

  // --- LAPTOPS ---
  {
    id: 'laptop-1',
    name: 'ASUS Vivobook 15 (2024)',
    category: 'laptops',
    brand: 'ASUS',
    price: 38990,
    originalPrice: 49990,
    rating: 4.2,
    reviewsCount: 6500,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Budget',
    specs: {
      processor: 'Intel Core i3-1315U (6 Cores, 8 Threads, up to 4.5 GHz)',
      ram: '8GB DDR4 3200MHz (upgradable to 16GB via 1 slot)',
      storage: '512GB PCIe 4.0 NVMe M.2 SSD',
      display: '15.6-inch FHD (1920 x 1080) 60Hz Anti-glare, 250 nits',
      battery: '42WHrs 3-cell Li-ion (around 5-6 hours battery)',
      charging: '45W AC Adapter with fast charge (60% in 49 mins)',
      camera: '720p HD webcam with physical privacy shutter',
      os: 'Windows 11 Home + MS Office Home & Student 2021',
      weight: '1.70 kg'
    },
    keyHighlights: [
      '13th Gen Intel Core i3 with 6 efficient cores for smooth college tasks',
      'Pre-installed lifetime Microsoft Office 2021 license',
      'Physical webcam privacy shutter & antimicrobial guard keyboard',
      '180-degree lay-flat hinge for easy collaboration'
    ],
    pros: [
      'Great value for money under ₹40,000',
      'Full numeric keypad and comfortable chiclet keyboard',
      'Upgradable RAM slot allows easy 16GB future upgrade',
      'Includes genuine MS Office suite forever'
    ],
    cons: [
      'TN display panel has limited viewing angles compared to IPS',
      'Integrated Intel UHD graphics not meant for AAA 3D gaming',
      'Average 42Wh battery lasts around 5 hours'
    ],
    bestFor: 'College students, office productivity, online classes, and casual coding (Python/Web)',
    useCaseScores: {
      gaming: 3.5,
      photography: 5.0,
      batteryLife: 6.5,
      productivity: 8.5,
      valueForMoney: 9.3,
      dailyUse: 8.7
    },
    inStock: true
  },
  {
    id: 'laptop-2',
    name: 'Lenovo IdeaPad Slim 3 14IAH8',
    category: 'laptops',
    brand: 'Lenovo',
    price: 49990,
    originalPrice: 65990,
    rating: 4.4,
    reviewsCount: 8200,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    specs: {
      processor: 'Intel Core i5-12450H (8 Cores, 12 Threads, 4.4 GHz Max Turbo)',
      ram: '16GB LPDDR5 4800MHz dual-channel RAM',
      storage: '512GB NVMe SSD (expandable up to 1TB)',
      display: '14-inch FHD (1920x1080) IPS Anti-glare, 300 nits brightness',
      battery: '47WHrs Rapid Charge Boost (2 hours usage in 15 mins)',
      charging: '65W Round Tip adapter',
      camera: 'FHD 1080p camera with privacy shutter and array mic',
      os: 'Windows 11 Home + MS Office 2021',
      weight: '1.37 kg (Ultra-portable)'
    },
    keyHighlights: [
      'High-performance "H" series Intel Core i5 processor',
      '16GB fast LPDDR5 RAM out of the box for effortless multitasking',
      'Crisp 14-inch IPS display with 300 nits and wide viewing angles',
      'Lightweight 1.37kg portable military-grade durability (MIL-STD-810H)'
    ],
    pros: [
      'Powerful 8-core H-series CPU crushes programming builds and Docker',
      '16GB RAM prevents tab freezing and code editor sluggishness',
      'Sharp 1080p webcam ideal for interviews and online exams',
      'Very lightweight and easy to carry inside a college backpack'
    ],
    cons: [
      'RAM is soldered to motherboard (cannot upgrade past 16GB)',
      'High-power H processor drains battery in 4.5-5.5 hours under load',
      'No dedicated GPU for heavy 3D rendering'
    ],
    bestFor: 'B.Tech / CS engineering students, software developers, data science, and multitasking',
    useCaseScores: {
      gaming: 5.5,
      photography: 7.0,
      batteryLife: 7.0,
      productivity: 9.4,
      valueForMoney: 9.2,
      dailyUse: 9.2
    },
    inStock: true
  },
  {
    id: 'laptop-3',
    name: 'Acer Nitro V 15 Gaming',
    category: 'laptops',
    brand: 'Acer',
    price: 67990,
    originalPrice: 84990,
    rating: 4.5,
    reviewsCount: 5100,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    badge: 'Top Performance',
    specs: {
      processor: 'Intel Core i5-13420H (8 Cores, 12 Threads, 4.6 GHz)',
      ram: '16GB DDR5 5200MHz (upgradable to 32GB)',
      storage: '512GB PCIe Gen 4 SSD (dual M.2 slots)',
      display: '15.6-inch FHD IPS 144Hz, 45% NTSC, 250 nits',
      battery: '57WHrs 4-cell Li-ion',
      charging: '135W AC Adapter',
      camera: '720p HD webcam with Acer PurifiedVoice AI noise reduction',
      os: 'Windows 11 Home',
      weight: '2.1 kg'
    },
    keyHighlights: [
      'NVIDIA GeForce RTX 4050 (6GB GDDR6 VRAM, 75W TGP)',
      'DLSS 3.5 & Full Hardware Ray Tracing support',
      'Dual fans and dual exhaust vents for low thermal throttling',
      'Upgradable DDR5 RAM and secondary M.2 SSD slot'
    ],
    pros: [
      'Plays GTA V, Cyberpunk 2077, Valorant at high settings smoothly',
      'CUDA acceleration for Machine Learning, PyTorch, and Deep Learning models',
      'Smooth 144Hz gaming refresh rate display',
      'Extensive port selection including Thunderbolt 4 / USB Type-C'
    ],
    cons: [
      'Heavier at 2.1kg plus bulky 135W power brick',
      'Battery life lasts around 3 hours when unplugged',
      'Fan noise is noticeable during intense gaming'
    ],
    bestFor: 'Heavy 3D gaming, ML/AI training (CUDA), video editing (Premiere/Blender), and CAD',
    useCaseScores: {
      gaming: 9.5,
      photography: 7.8,
      batteryLife: 4.8,
      productivity: 9.1,
      valueForMoney: 9.0,
      dailyUse: 8.0
    },
    inStock: true
  },
  {
    id: 'laptop-4',
    name: 'Apple MacBook Air M2 (13.6-inch)',
    category: 'laptops',
    brand: 'Apple',
    price: 84990,
    originalPrice: 99900,
    rating: 4.8,
    reviewsCount: 15400,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    badge: 'Editor Pick',
    specs: {
      processor: 'Apple M2 Chip (8-Core CPU, 8-Core GPU, 16-Core Neural Engine)',
      ram: '8GB Unified Memory (high bandwidth)',
      storage: '256GB Superfast SSD',
      display: '13.6-inch Liquid Retina, 2560x1664, 500 nits, P3 Wide Color, True Tone',
      battery: '52.6WHrs Lithium-polymer (up to 18 hours battery life)',
      charging: '30W USB-C Power Adapter with MagSafe 3 cable',
      camera: '1080p FaceTime HD camera with advanced computational video',
      os: 'macOS Sequoia',
      weight: '1.24 kg'
    },
    keyHighlights: [
      'Phenomenal 18-hour real-world battery life without charger anxiety',
      'Completely silent fanless acoustic design',
      'Stunning 500 nits Liquid Retina display with 1 Billion colors',
      'Premium all-aluminum unibody enclosure with MagSafe charging'
    ],
    pros: [
      'Best-in-class battery life; easily lasts 2 days of classes/work',
      'Industry-leading Force Touch trackpad and Magic Keyboard',
      'Top-quality 4-speaker sound system with Spatial Audio',
      'Instant wake from sleep and zero lag in daily apps'
    ],
    cons: [
      'Base model has only 8GB Unified memory and 256GB storage (non-upgradable)',
      'Limited ports: only 2 Thunderbolt / USB 4 ports and headphone jack',
      'Cannot run Windows-exclusive engineering CAD software directly'
    ],
    bestFor: 'College students, web developers, writers, video creators, and all-day mobile work',
    useCaseScores: {
      gaming: 5.0,
      photography: 9.6,
      batteryLife: 10.0,
      productivity: 9.5,
      valueForMoney: 8.6,
      dailyUse: 9.8
    },
    inStock: true
  },

  // --- SMARTWATCHES ---
  {
    id: 'watch-1',
    name: 'Noise ColorFit Pro 5',
    category: 'smartwatches',
    brand: 'Noise',
    price: 3499,
    originalPrice: 7999,
    rating: 4.3,
    reviewsCount: 16800,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Budget',
    specs: {
      processor: 'Dual-core SoC with TruSync BT 5.3',
      ram: 'Embedded',
      storage: 'Embedded flash for watch faces',
      display: '1.85-inch AMOLED Display, 60Hz refresh rate, 1000 nits brightness',
      battery: '300 mAh (up to 7 days battery, 2 days with BT calling)',
      charging: 'Magnetic pogo-pin dock (full charge in 2 hours)',
      os: 'Noise Health Suite (Android & iOS compatible)',
      weight: '41 grams'
    },
    keyHighlights: [
      '1.85" AMOLED display with Always-On Display (AOD)',
      'Bluetooth Calling with dial pad and recent call logs',
      'Rapid Health measurement (Heart Rate, SpO2, Stress in 1 tap)',
      'SOS calling feature with emergency contacts'
    ],
    pros: [
      'Vibrant AMOLED screen with deep blacks and high brightness',
      'Clear Bluetooth calling microphone and speaker',
      'Affordable price tag under ₹3,500',
      'IP68 water resistant for workouts and rain'
    ],
    cons: [
      'No built-in standalone GPS (relies on connected phone GPS)',
      'Cannot install third-party apps like WhatsApp or Spotify',
      'Step counter can occasionally record arm movements'
    ],
    bestFor: 'Budget fitness tracking, Bluetooth calling, and stylish AMOLED watch under ₹4,000',
    useCaseScores: {
      gaming: 1.0,
      photography: 2.0,
      batteryLife: 9.0,
      productivity: 7.5,
      valueForMoney: 9.6,
      dailyUse: 9.0
    },
    inStock: true
  },
  {
    id: 'watch-2',
    name: 'Amazfit Active Smartwatch',
    category: 'smartwatches',
    brand: 'Amazfit',
    price: 7999,
    originalPrice: 12999,
    rating: 4.5,
    reviewsCount: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
    badge: 'Editor Pick',
    specs: {
      processor: 'Zepp OS 3.0 dual-core processor',
      ram: 'Embedded',
      storage: '250MB for music storage (store ~30 songs on watch)',
      display: '1.75-inch HD AMOLED, 390x450 resolution, 341 PPI',
      battery: '300 mAh (up to 14 days normal usage, 16 hours continuous GPS)',
      charging: 'Magnetic charging base',
      os: 'Zepp OS 3.0 (Supports mini-apps & Bluetooth HR straps)',
      weight: '24 grams (body only, ultra-featherlight)'
    },
    keyHighlights: [
      'Built-in 5 satellite positioning systems (GPS) for outdoor run mapping without phone',
      'AI-powered Zepp Coach for personalized training plans',
      'Readiness Score evaluating physical recovery and mental fatigue',
      'Standalone MP3 music storage & Bluetooth headphone pairing'
    ],
    pros: [
      'Accurate standalone GPS tracking for runners and cyclists',
      'Impressive 14-day battery life eliminates daily charging hassle',
      'Extremely lightweight on wrist even when sleeping',
      'Syncs directly to Strava, Apple Health, and Google Fit'
    ],
    cons: [
      'No reply to WhatsApp notifications on iOS (canned replies on Android only)',
      'Voice assistant is Alexa-based (requires phone internet connection)',
      'Speaker volume is moderate in noisy traffic'
    ],
    bestFor: 'Serious fitness enthusiasts, runners, gym-goers wanting standalone GPS and long battery',
    useCaseScores: {
      gaming: 1.0,
      photography: 2.0,
      batteryLife: 9.7,
      productivity: 8.2,
      valueForMoney: 9.2,
      dailyUse: 9.4
    },
    inStock: true
  },
  {
    id: 'watch-3',
    name: 'Samsung Galaxy Watch 6 (44mm)',
    category: 'smartwatches',
    brand: 'Samsung',
    price: 18999,
    originalPrice: 33999,
    rating: 4.6,
    reviewsCount: 5800,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    badge: 'Top Performance',
    specs: {
      processor: 'Exynos W930 Dual-core 1.4 GHz',
      ram: '2GB RAM',
      storage: '16GB onboard storage',
      display: '1.5-inch Super AMOLED, 480x480, Sapphire Crystal Glass, 2000 nits',
      battery: '425 mAh (up to 40 hours battery life)',
      charging: 'WPC-based wireless fast charging',
      os: 'Wear OS 4 Powered by Samsung (One UI 5 Watch)',
      weight: '33.3 grams'
    },
    keyHighlights: [
      'Full Wear OS with Google Play Store: WhatsApp, Google Maps, Spotify offline',
      'Advanced BioActive sensor: ECG, Blood Pressure, Body Composition (BIA)',
      'Scratch-resistant Sapphire Crystal glass screen',
      'NFC payments via Samsung Wallet'
    ],
    pros: [
      'Type full replies to WhatsApp messages via on-screen keyboard',
      'Turn-by-turn Google Maps navigation right on your wrist',
      'Medical-grade body composition and sleep coaching metrics',
      'Super sharp and bright 2000 nits display'
    ],
    cons: [
      'Battery lasts around 1 to 1.5 days; requires daily charging',
      'ECG and Blood Pressure features require a Samsung Galaxy phone',
      'Not compatible with Apple iPhones'
    ],
    bestFor: 'Android users wanting a true smartwatch with apps, offline maps, WhatsApp, and health tech',
    useCaseScores: {
      gaming: 2.0,
      photography: 3.0,
      batteryLife: 5.5,
      productivity: 9.8,
      valueForMoney: 8.5,
      dailyUse: 9.3
    },
    inStock: true
  },

  // --- AUDIO / HEADPHONES ---
  {
    id: 'audio-1',
    name: 'boAt Rockerz 550 Over-Ear',
    category: 'audio',
    brand: 'boAt',
    price: 1799,
    originalPrice: 4999,
    rating: 4.1,
    reviewsCount: 38400,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Budget',
    specs: {
      processor: 'Custom Bluetooth 5.0 chipset',
      ram: 'N/A',
      storage: 'N/A',
      display: 'N/A',
      battery: '500 mAh battery (up to 20 hours playback)',
      charging: 'Type-C charging port',
      audio: '50mm Dynamic Audio Drivers, boAt Signature Sound with punchy bass',
      weight: '245 grams'
    },
    keyHighlights: [
      'Massive 50mm dynamic drivers delivering heavy thumping bass',
      'Dual connectivity: Wireless Bluetooth + 3.5mm AUX wired cable included',
      'Plush padded ear cushions for passive noise isolation',
      'In-line controls for volume and call handling'
    ],
    pros: [
      'Very affordable over-ear design under ₹2,000',
      'Thumping bass favored for hip-hop, EDM, and action movies',
      'Works wired even if the battery runs completely flat',
      'Decent 20-hour playback duration'
    ],
    cons: [
      'No Active Noise Cancellation (ANC)',
      'Heavy bass can overpower vocal clarity in podcasts and classical music',
      'Can feel warm on ears during summer after 2 hours'
    ],
    bestFor: 'College students on a tight budget wanting loud bass, movies, and casual gaming',
    useCaseScores: {
      gaming: 6.8,
      photography: 1.0,
      batteryLife: 8.2,
      productivity: 7.0,
      valueForMoney: 9.7,
      dailyUse: 8.5
    },
    inStock: true
  },
  {
    id: 'audio-2',
    name: 'Realme Buds Air 5 Pro TWS',
    category: 'audio',
    brand: 'Realme',
    price: 4999,
    originalPrice: 7999,
    rating: 4.5,
    reviewsCount: 11200,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    specs: {
      processor: 'Dual-core digital noise cancellation chip',
      ram: 'N/A',
      storage: 'N/A',
      display: 'N/A',
      battery: '40 hours total with case (10 hours per bud without ANC)',
      charging: 'Dart Fast Charge (10 mins charge = 7 hours music)',
      audio: 'Dual Drivers: 11mm Bass Driver + 6mm Micro-planar Tweeter, LDAC Hi-Res audio',
      weight: '4.7 grams per bud'
    },
    keyHighlights: [
      'Flagship 50dB Active Noise Cancellation with 4000Hz ultra-wideband',
      'Hi-Res Audio Certified with Sony LDAC codec support',
      'Dual drivers (Woofer + Tweeter) for crystal-clear instrument separation',
      'Dual-device connection (simultaneously connect laptop & phone)'
    ],
    pros: [
      'ANC drowns out AC hum, bus engine noise, and hostel chatter',
      'Outstanding soundstage with sparkling highs and deep punchy sub-bass',
      'Seamless multi-point switching between laptop and phone',
      'Very low 40ms gaming latency'
    ],
    cons: [
      'Glossy case shows micro-scratches easily',
      'LDAC streaming drains earbud battery slightly faster',
      'Touch controls require learning the sensitivity curve'
    ],
    bestFor: 'Study sessions in noisy libraries, commuting, high-fidelity music, and work calls',
    useCaseScores: {
      gaming: 8.5,
      photography: 1.0,
      batteryLife: 9.2,
      productivity: 9.3,
      valueForMoney: 9.6,
      dailyUse: 9.5
    },
    inStock: true
  },
  {
    id: 'audio-3',
    name: 'Sony WH-1000XM4 Wireless ANC',
    category: 'audio',
    brand: 'Sony',
    price: 22990,
    originalPrice: 29990,
    rating: 4.7,
    reviewsCount: 22400,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    badge: 'Editor Pick',
    specs: {
      processor: 'HD Noise Cancelling Processor QN1',
      ram: 'N/A',
      storage: 'N/A',
      display: 'N/A',
      battery: '30 hours with ANC on (38 hours with ANC off)',
      charging: 'USB-C (10 mins charge = 5 hours playback)',
      audio: '40mm drivers with Liquid Crystal Polymer (LCP) diaphragms, LDAC, DSEE Extreme',
      weight: '254 grams'
    },
    keyHighlights: [
      'Gold standard industry-leading Active Noise Cancellation',
      'Speak-to-Chat: Automatically pauses music when you start speaking',
      'Multipoint connection to switch effortlessly between PC and phone',
      'Foldable compact design with premium travel hard case'
    ],
    pros: [
      'Complete silence in flights, trains, and crowded offices',
      'Supreme comfort with pressure-relieving foamed urethane ear pads',
      'Rich, warm, audiophile-grade acoustic tuning with customizable EQ',
      'Reliable 30-hour battery life'
    ],
    cons: [
      'Microphone quality in windy environments is average',
      'No IP water resistance rating (not designed for sweaty gym workouts)',
      'Touchpad can trigger in cold weather or with winter gloves'
    ],
    bestFor: 'Serious coders, frequent flyers, remote workers, and audiophiles needing total silence',
    useCaseScores: {
      gaming: 7.5,
      photography: 1.0,
      batteryLife: 9.8,
      productivity: 9.9,
      valueForMoney: 8.8,
      dailyUse: 9.7
    },
    inStock: true
  },

  // --- TABLETS ---
  {
    id: 'tablet-1',
    name: 'Xiaomi Pad 6 (Wi-Fi)',
    category: 'tablets',
    brand: 'Xiaomi',
    price: 24999,
    originalPrice: 39999,
    rating: 4.6,
    reviewsCount: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Budget',
    specs: {
      processor: 'Qualcomm Snapdragon 870 (7nm Flagship-grade SoC)',
      ram: '6GB / 8GB LPDDR5',
      storage: '128GB / 256GB UFS 3.1',
      display: '11-inch 2.8K (2880x1800) 144Hz 7-stage refresh rate, Dolby Vision, 550 nits',
      battery: '8840 mAh',
      charging: '33W Fast Charging',
      camera: '13MP Rear + 8MP Front camera with FocusFrame center-stage tracking',
      os: 'MIUI Pad 14 / HyperOS based on Android 13',
      weight: '490 grams'
    },
    keyHighlights: [
      'Silky smooth 144Hz 2.8K resolution display with Dolby Atmos quad speakers',
      'Snapdragon 870 processor easily handles split-screen multitasking & gaming',
      'Support for Xiaomi Smart Pen 2nd Gen (4096 pressure levels) & Keyboard',
      'Sleek unibody metal frame that looks like a ₹50,000 device'
    ],
    pros: [
      'Unmatched display sharpness and speaker immersion in the sub-₹25,000 range',
      'Snapdragon 870 runs Genshin Impact and BGMI without lag',
      'Huge 8840 mAh battery easily lasts 10-12 hours of screen time',
      'Great for digital notes, PDF reading, and multimedia consumption'
    ],
    cons: [
      'No cellular LTE / 5G SIM option (Wi-Fi only)',
      'Stylus and keyboard must be bought separately',
      'No fingerprint scanner (relies on face unlock or PIN)'
    ],
    bestFor: 'College students for note-taking, reading textbooks, watching lectures, and gaming',
    useCaseScores: {
      gaming: 8.8,
      photography: 6.0,
      batteryLife: 9.3,
      productivity: 9.0,
      valueForMoney: 9.8,
      dailyUse: 9.4
    },
    inStock: true
  },
  {
    id: 'tablet-2',
    name: 'Apple iPad (10th Generation)',
    category: 'tablets',
    brand: 'Apple',
    price: 33990,
    originalPrice: 39900,
    rating: 4.7,
    reviewsCount: 19300,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    badge: 'Editor Pick',
    specs: {
      processor: 'Apple A14 Bionic chip (6-Core CPU, 4-Core GPU, 16-Core Neural Engine)',
      ram: '4GB RAM',
      storage: '64GB / 256GB',
      display: '10.9-inch Liquid Retina display (2360x1640), True Tone, 500 nits',
      battery: '28.6 watt-hour rechargeable battery (around 10 hours web surfing)',
      charging: '20W USB-C Power Adapter included',
      camera: 'Landscape 12MP Ultra-Wide front with Center Stage + 12MP Wide rear',
      os: 'iPadOS 17 / iPadOS 18',
      weight: '477 grams'
    },
    keyHighlights: [
      'Modern all-screen design with vibrant color options and USB-C',
      'Landscape 12MP front camera with Apple Center Stage auto-tracking',
      'Huge catalog of optimized tablet apps (GoodNotes, Procreate, Notability)',
      'Touch ID sensor integrated directly into the top power button'
    ],
    pros: [
      'Unrivaled tablet app ecosystem for drawing, note-taking, and studying',
      'Smooth long-term performance backed by 5+ years of iPadOS updates',
      'High resale value and durable hardware build quality',
      'Center Stage keeps you centered during Zoom and FaceTime calls'
    ],
    cons: [
      'Base model has only 64GB storage (fills quickly with high-res PDFs and games)',
      'Display is non-laminated (slight gap between glass and LCD layer)',
      'Only 60Hz refresh rate compared to Android 120Hz/144Hz tablets'
    ],
    bestFor: 'Creative students, digital artists using Procreate, GoodNotes study notes, and video calls',
    useCaseScores: {
      gaming: 8.2,
      photography: 7.2,
      batteryLife: 8.8,
      productivity: 9.3,
      valueForMoney: 8.6,
      dailyUse: 9.5
    },
    inStock: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Products', icon: 'Sparkles' },
  { id: 'smartphones', label: 'Smartphones', icon: 'Smartphone' },
  { id: 'laptops', label: 'Laptops', icon: 'Laptop' },
  { id: 'smartwatches', label: 'Smartwatches', icon: 'Watch' },
  { id: 'audio', label: 'Headphones & Audio', icon: 'Headphones' },
  { id: 'tablets', label: 'Tablets', icon: 'Tablet' },
] as const;
