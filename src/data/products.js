// Comprehensive Flipkart Products Database (70+ items across 9 categories)

export const PRODUCTS = [
  // ==========================================
  // MOBILES & ACCESSORIES (9 products)
  // ==========================================
  {
    id: 'mob-1',
    title: 'Apple iPhone 15 (Blue, 128 GB)',
    brand: 'Apple',
    category: 'mobiles',
    price: 65999,
    mrp: 79900,
    discount: 17,
    rating: 4.6,
    reviewCount: 38240,
    stock: 14,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '128 GB ROM',
      '15.49 cm (6.1 inch) Super Retina XDR Display',
      '48MP + 12MP Dual Rear Camera | 12MP Front Camera',
      'A16 Bionic Chip, 6 Core Processor',
      'Dynamic Island, Ceramic Shield Front'
    ],
    specs: {
      'In The Box': 'Handset, USB-C Charge Cable (1m), Documentation',
      'Model Number': 'MTP43HN/A',
      'Model Name': 'iPhone 15',
      'Color': 'Blue',
      'SIM Type': 'Dual SIM (nano-SIM and eSIM)',
      'Display Size': '15.49 cm (6.1 inch)',
      'Resolution': '2556 x 1179 Pixels',
      'Internal Storage': '128 GB',
      'Primary Camera': '48MP + 12MP',
      'Secondary Camera': '12MP',
      'Network Type': '5G, 4G VOLTE, 3G, 2G',
      'Warranty': '1 Year Domestic Warranty for Device and 6 Months for In-box Accessories'
    },
    variants: {
      storage: ['128 GB', '256 GB', '512 GB'],
      color: ['Blue', 'Black', 'Green', 'Yellow', 'Pink']
    }
  },
  {
    id: 'mob-2',
    title: 'SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
    brand: 'Samsung',
    category: 'mobiles',
    price: 119999,
    mrp: 134999,
    discount: 11,
    rating: 4.7,
    reviewCount: 15420,
    stock: 8,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '12 GB RAM | 256 GB ROM',
      '17.27 cm (6.8 inch) Dynamic AMOLED 2X Display',
      '200MP + 50MP + 12MP + 10MP Quad Camera | 12MP Front',
      '5000 mAh Lithium-ion Battery',
      'Snapdragon 8 Gen 3 Processor | Built-in S Pen'
    ],
    specs: {
      'Model Name': 'Galaxy S24 Ultra',
      'Color': 'Titanium Gray',
      'RAM': '12 GB',
      'Internal Storage': '256 GB',
      'Primary Camera': '200MP Quad Camera with AI Zoom',
      'Battery Capacity': '5000 mAh',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    variants: {
      storage: ['256 GB', '512 GB', '1 TB'],
      color: ['Titanium Gray', 'Titanium Black', 'Titanium Violet']
    }
  },
  {
    id: 'mob-3',
    title: 'OnePlus 12R (Iron Gray, 128 GB)',
    brand: 'OnePlus',
    category: 'mobiles',
    price: 39999,
    mrp: 42999,
    discount: 6,
    rating: 4.5,
    reviewCount: 22890,
    stock: 25,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '8 GB RAM | 128 GB ROM',
      '17.22 cm (6.78 inch) 120Hz ProXDR AMOLED Display',
      '50MP (Sony IMX890) + 8MP + 2MP | 16MP Front',
      '5500 mAh Battery with 100W SUPERVOOC Charging',
      'Snapdragon 8 Gen 2 Mobile Platform'
    ],
    specs: {
      'Model Name': '12R',
      'Color': 'Iron Gray',
      'RAM': '8 GB',
      'Storage': '128 GB',
      'Processor': 'Snapdragon 8 Gen 2',
      'Charging': '100W Fast Charging'
    },
    variants: {
      storage: ['128 GB', '256 GB'],
      color: ['Iron Gray', 'Cool Blue']
    }
  },
  {
    id: 'mob-4',
    title: 'REDMI Note 13 Pro 5G (Midnight Black, 128 GB)',
    brand: 'Xiaomi',
    category: 'mobiles',
    price: 24999,
    mrp: 28999,
    discount: 13,
    rating: 4.3,
    reviewCount: 41200,
    stock: 30,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '8 GB RAM | 128 GB ROM',
      '16.94 cm (6.67 inch) 1.5K 120Hz AMOLED',
      '200MP OIS Camera + 8MP + 2MP | 16MP Front',
      '5100 mAh Battery | 67W Turbo Charge',
      'Snapdragon 7s Gen 2 Processor'
    ],
    specs: {
      'Model': 'Note 13 Pro 5G',
      'Color': 'Midnight Black',
      'Camera': '200MP OIS',
      'Battery': '5100 mAh'
    },
    variants: {
      storage: ['128 GB', '256 GB'],
      color: ['Midnight Black', 'Coral Purple', 'Arctic White']
    }
  },
  {
    id: 'mob-5',
    title: 'realme 12 Pro+ 5G (Submarine Blue, 256 GB)',
    brand: 'Realme',
    category: 'mobiles',
    price: 29999,
    mrp: 34999,
    discount: 14,
    rating: 4.4,
    reviewCount: 18450,
    stock: 12,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '8 GB RAM | 256 GB ROM',
      '64MP Periscope Portrait Camera with 120X SuperZoom',
      'Luxury Watch Design with Vegan Leather Back',
      'Snapdragon 7s Gen 2 Chipset'
    ],
    specs: {
      'Model': '12 Pro+ 5G',
      'Color': 'Submarine Blue',
      'Periscope Zoom': '3X Optical, 120X Digital'
    },
    variants: {
      storage: ['128 GB', '256 GB'],
      color: ['Submarine Blue', 'Navigator Beige']
    }
  },
  {
    id: 'mob-6',
    title: 'Google Pixel 8 (Hazel, 128 GB)',
    brand: 'Google',
    category: 'mobiles',
    price: 58999,
    mrp: 75999,
    discount: 22,
    rating: 4.5,
    reviewCount: 9400,
    stock: 7,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1598327105740-96f7e44280b2?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '8 GB RAM | 128 GB ROM',
      '15.75 cm (6.2 inch) Actua 120Hz OLED Display',
      'Google Tensor G3 with Titan M2 Security',
      '7 Years of OS and Feature Updates'
    ],
    specs: {
      'Model': 'Pixel 8',
      'Processor': 'Google Tensor G3',
      'AI Features': 'Best Take, Magic Audio Eraser'
    },
    variants: {
      storage: ['128 GB', '256 GB'],
      color: ['Hazel', 'Obsidian', 'Rose']
    }
  },
  {
    id: 'mob-7',
    title: 'POCO X6 Pro 5G (Racing Yellow, 256 GB)',
    brand: 'POCO',
    category: 'mobiles',
    price: 24999,
    mrp: 30999,
    discount: 19,
    rating: 4.4,
    reviewCount: 31200,
    stock: 20,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '8 GB RAM | 256 GB ROM | Dimensity 8300 Ultra',
      '1.5K 120Hz CrystalRes Flow AMOLED Display',
      '64MP OIS Triple Camera'
    ],
    specs: {
      'Processor': 'MediaTek Dimensity 8300-Ultra',
      'Antutu Score': '1.4M+'
    },
    variants: {
      storage: ['256 GB', '512 GB'],
      color: ['Racing Yellow', 'Spectre Black']
    }
  },
  {
    id: 'mob-8',
    title: 'Motorola Edge 50 Pro 5G (Luxe Lavender, 256 GB)',
    brand: 'Motorola',
    category: 'mobiles',
    price: 31999,
    mrp: 36999,
    discount: 13,
    rating: 4.4,
    reviewCount: 14200,
    stock: 18,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '12 GB RAM | 256 GB ROM',
      'Pantone Validated 1.5K 144Hz 3D Curved pOLED',
      '125W TurboPower Charging + 50W Wireless',
      'IP68 Underwater Protection'
    ],
    specs: {
      'Rating': 'IP68 Water Resistant',
      'Charging Speed': '125W TurboPower'
    },
    variants: {
      color: ['Luxe Lavender', 'Black Beauty', 'Moonlight Pearl']
    }
  },
  {
    id: 'mob-9',
    title: 'boAt 20000 mAh 22.5W Fast Charging Power Bank',
    brand: 'boAt',
    category: 'mobiles',
    price: 1499,
    mrp: 3999,
    discount: 62,
    rating: 4.2,
    reviewCount: 54100,
    stock: 45,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1609592806787-3d9c72e2cfb7?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '20000 mAh Capacity',
      '22.5W Two-Way Quick Charge',
      'Triple Output Ports (2x USB-A, 1x Type-C PD)',
      '12 Layer Smart IC Protection'
    ],
    specs: {
      'Battery Type': 'Lithium Polymer',
      'Output Ports': '3'
    },
    variants: {
      color: ['Carbon Black', 'Steel Blue']
    }
  },

  // ==========================================
  // ELECTRONICS & LAPTOPS (9 products)
  // ==========================================
  {
    id: 'elec-1',
    title: 'Apple MacBook Air M2 - (8 GB/256 GB SSD/macOS) Midnight',
    brand: 'Apple',
    category: 'electronics',
    price: 89990,
    mrp: 99900,
    discount: 9,
    rating: 4.8,
    reviewCount: 11200,
    stock: 10,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Apple M2 Chip with 8-Core CPU and 8-Core GPU',
      '8 GB Unified Memory | 256 GB SSD',
      '34.54 cm (13.6 Inch) Liquid Retina Display with True Tone',
      'Up to 18 hours battery life | MagSafe 3 charging',
      'Backlit Magic Keyboard with Touch ID'
    ],
    specs: {
      'Processor': 'Apple M2',
      'RAM': '8 GB Unified',
      'SSD': '256 GB',
      'Weight': '1.24 kg',
      'Display': '13.6 Inch 2560 x 1664'
    },
    variants: {
      color: ['Midnight', 'Space Grey', 'Starlight', 'Silver'],
      storage: ['256 GB SSD', '512 GB SSD']
    }
  },
  {
    id: 'elec-2',
    title: 'ASUS Vivobook 15 Intel Core i5 12th Gen (16 GB/512 GB SSD/Win 11)',
    brand: 'ASUS',
    category: 'electronics',
    price: 49990,
    mrp: 69990,
    discount: 28,
    rating: 4.3,
    reviewCount: 8400,
    stock: 15,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Intel Core i5 1235U 12th Gen Processor',
      '16 GB DDR4 RAM | 512 GB M.2 NVMe SSD',
      '39.62 cm (15.6 inch) Full HD Anti-Glare Display',
      'Windows 11 Home + MS Office Home & Student 2021'
    ],
    specs: {
      'Processor': 'Intel Core i5-1235U',
      'RAM': '16 GB',
      'Storage': '512 GB SSD',
      'Operating System': 'Windows 11 Home'
    },
    variants: {
      color: ['Quiet Blue', 'Icelight Silver']
    }
  },
  {
    id: 'elec-3',
    title: 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'electronics',
    price: 26990,
    mrp: 34990,
    discount: 22,
    rating: 4.7,
    reviewCount: 7600,
    stock: 12,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Industry-leading Noise Cancellation with 2 processors & 8 mics',
      'Up to 30-hour battery life with quick charging (3 min for 3 hours)',
      'Ultra-comfortable, lightweight design with soft fit leather',
      'Speak-to-chat and multipoint connection'
    ],
    specs: {
      'Headphone Type': 'Over the Ear',
      'Battery Life': '30 Hours',
      'Bluetooth Version': '5.2',
      'Voice Assistant': 'Google Assistant, Alexa Built-in'
    },
    variants: {
      color: ['Black', 'Silver', 'Midnight Blue']
    }
  },
  {
    id: 'elec-4',
    title: 'boAt Airdopes 141 Bluetooth Truly Wireless in Ear Earbuds',
    brand: 'boAt',
    category: 'electronics',
    price: 1099,
    mrp: 4490,
    discount: 75,
    rating: 4.1,
    reviewCount: 189000,
    stock: 50,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Up to 42 Hours Total Playback',
      'ENx Environmental Noise Cancellation Tech',
      'ASAP Fast Charge (5 mins = 75 mins play)',
      'IPX4 Water & Sweat Resistance'
    ],
    specs: {
      'Playtime': '42 Hours',
      'Fast Charging': 'Yes',
      'Water Resistance': 'IPX4'
    },
    variants: {
      color: ['Bold Black', 'Pure White', 'Cider Cyan']
    }
  },
  {
    id: 'elec-5',
    title: 'Apple iPad (10th Gen) 64 GB ROM 10.9 Inch with Wi-Fi Only',
    brand: 'Apple',
    category: 'electronics',
    price: 33900,
    mrp: 39900,
    discount: 15,
    rating: 4.7,
    reviewCount: 16500,
    stock: 9,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '64 GB ROM | A14 Bionic chip',
      '27.69 cm (10.9 inch) Liquid Retina Display',
      '12MP Landscape Ultra Wide front camera with Center Stage',
      'Touch ID for secure authentication and Apple Pay'
    ],
    specs: {
      'Display': '10.9 Inch Liquid Retina',
      'Chipset': 'A14 Bionic',
      'OS': 'iPadOS 17'
    },
    variants: {
      color: ['Blue', 'Pink', 'Silver', 'Yellow'],
      storage: ['64 GB', '256 GB']
    }
  },
  {
    id: 'elec-6',
    title: 'Logitech MX Master 3S Wireless Performance Mouse',
    brand: 'Logitech',
    category: 'electronics',
    price: 8995,
    mrp: 10995,
    discount: 18,
    rating: 4.8,
    reviewCount: 4200,
    stock: 14,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Quiet Clicks with 8000 DPI Any-Surface Tracking',
      'MagSpeed Electromagnetic Scrolling (1000 lines/sec)',
      'App-Specific Customizations and Flow Cross-Computer Control',
      'USB-C Quick Rechargeable (70 days on full charge)'
    ],
    specs: {
      'DPI': '8000 DPI Darkfield Sensor',
      'Connectivity': 'Bluetooth Low Energy & Logi Bolt'
    },
    variants: {
      color: ['Graphite', 'Pale Grey']
    }
  },
  {
    id: 'elec-7',
    title: 'Canon EOS 1500D DSLR Camera Body+ 18-55 mm IS II Lens',
    brand: 'Canon',
    category: 'electronics',
    price: 41990,
    mrp: 47995,
    discount: 12,
    rating: 4.5,
    reviewCount: 29800,
    stock: 6,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '24.1 MP APS-C CMOS Sensor',
      'DIGIC 4+ Image Processor',
      '9-point AF with 1 centre cross-type AF point',
      'Full HD video with full manual control and selectable frame rates',
      'Wi-Fi / NFC connectivity'
    ],
    specs: {
      'Sensor Type': 'CMOS',
      'Effective Pixels': '24.1 MP',
      'Optical Zoom': '3x'
    },
    variants: {
      color: ['Black']
    }
  },
  {
    id: 'elec-8',
    title: 'SanDisk Extreme 1TB Portable SSD - Up to 1050MB/s',
    brand: 'SanDisk',
    category: 'electronics',
    price: 9499,
    mrp: 21000,
    discount: 54,
    rating: 4.6,
    reviewCount: 14500,
    stock: 22,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Fast NVMe Solid State Performance: Up to 1050MB/s Read',
      'Up to 3-meter drop protection and IP65 water and dust resistance',
      'Handy carabiner loop to secure the drive',
      '5-Year Limited Manufacturer Warranty'
    ],
    specs: {
      'Capacity': '1 TB',
      'Read Speed': '1050 MB/s',
      'Interface': 'USB 3.2 Gen 2 Type-C'
    },
    variants: {
      storage: ['500 GB', '1 TB', '2 TB']
    }
  },
  {
    id: 'elec-9',
    title: 'Noise ColorFit Pulse 2 Max 1.85 Inch Display Bluetooth Calling Smartwatch',
    brand: 'Noise',
    category: 'electronics',
    price: 1499,
    mrp: 5999,
    discount: 75,
    rating: 4.1,
    reviewCount: 88400,
    stock: 35,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '1.85 Inch TFT LCD Display with 550 Nits brightness',
      'Advanced Bluetooth Calling with Tru Sync technology',
      '100 Sports Modes & 150+ Watch Faces',
      '10-Day Battery Life | Heart Rate & SpO2 Tracking'
    ],
    specs: {
      'Display Size': '1.85 Inch',
      'Battery Life': 'Up to 10 Days',
      'Water Resistant': 'IP68'
    },
    variants: {
      color: ['Jet Black', 'Deep Wine', 'Rose Gold', 'Cobalt Blue']
    }
  },

  // ==========================================
  // APPLIANCES & TVS (8 products)
  // ==========================================
  {
    id: 'app-1',
    title: 'LG 139 cm (55 inch) OLED 4K Ultra HD Smart WebOS TV',
    brand: 'LG',
    category: 'appliances',
    price: 89990,
    mrp: 149990,
    discount: 40,
    rating: 4.8,
    reviewCount: 3900,
    stock: 5,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Self-Lit OLED Pixels for Perfect Black & Infinite Contrast',
      'α7 AI Processor 4K Gen6',
      'Dolby Vision & Dolby Atmos Audio (20W)',
      '120Hz Native Refresh Rate, HDMI 2.1, VRR for PS5 Gaming'
    ],
    specs: {
      'Screen Size': '55 Inch (139 cm)',
      'Resolution': '3840 x 2160 Pixels (4K)',
      'Operating System': 'WebOS',
      'Warranty': '3 Years Comprehensive Warranty'
    },
    variants: {
      size: ['48 Inch', '55 Inch', '65 Inch']
    }
  },
  {
    id: 'app-2',
    title: 'Samsung 108 cm (43 inch) Crystal 4K Vivid Ultra HD Smart TV',
    brand: 'Samsung',
    category: 'appliances',
    price: 28990,
    mrp: 44900,
    discount: 35,
    rating: 4.4,
    reviewCount: 32000,
    stock: 14,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Crystal Processor 4K with PurColor',
      'HDR 10+ Support and Mega Contrast',
      '20W Sound Output with Q-Symphony & OTS Lite',
      'Tizen OS with Support for Netflix, Prime Video, Disney+ Hotstar'
    ],
    specs: {
      'Screen Size': '43 Inch',
      'Resolution': '4K UHD',
      'Refresh Rate': '50 Hz'
    },
    variants: {
      size: ['43 Inch', '50 Inch', '55 Inch']
    }
  },
  {
    id: 'app-3',
    title: 'Whirlpool 265 L Frost Free Double Door 3 Star Refrigerator',
    brand: 'Whirlpool',
    category: 'appliances',
    price: 25490,
    mrp: 34950,
    discount: 27,
    rating: 4.3,
    reviewCount: 19400,
    stock: 8,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '265 L Capacity: Suitable for families with 3 to 5 members',
      '6th Sense DeepFreeze Technology & MicroBlock Tech',
      'Inverter Compressor for Energy Efficiency and Silent Operation',
      'Up to 12 Days of Garden Freshness'
    ],
    specs: {
      'Capacity': '265 Litres',
      'Energy Rating': '3 Star',
      'Defrosting Type': 'Frost Free'
    },
    variants: {
      color: ['German Steel', 'Alpha Steel']
    }
  },
  {
    id: 'app-4',
    title: 'IFB 8 Kg 5 Star AI Powered Front Load Washing Machine',
    brand: 'IFB',
    category: 'appliances',
    price: 36990,
    mrp: 46990,
    discount: 21,
    rating: 4.4,
    reviewCount: 8100,
    stock: 6,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '8 Kg: Ideal for large families',
      '1400 RPM Spin Speed: Faster drying',
      'Steam Refresh & 9 Swirl Wash Movements',
      'Built-in Heater & Aqua Energie Water Softener'
    ],
    specs: {
      'Washing Capacity': '8 Kg',
      'Star Rating': '5 Star BEE',
      'Motor Warranty': '10 Years'
    },
    variants: {
      color: ['Silver', 'White']
    }
  },
  {
    id: 'app-5',
    title: 'Voltas 1.5 Ton 3 Star Inverter Split AC - Copper Condenser',
    brand: 'Voltas',
    category: 'appliances',
    price: 32490,
    mrp: 58990,
    discount: 44,
    rating: 4.2,
    reviewCount: 26400,
    stock: 11,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1614633837726-5b4d6b63dca8?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '1.5 Ton Capacity: Suitable for medium sized rooms (111 to 150 sq ft)',
      'Adjustable Inverter cooling: operates in 4 different modes',
      '100% Copper Condenser with Anti-Corrosion Coating',
      'High Ambient Cooling at 52°C'
    ],
    specs: {
      'Capacity': '1.5 Ton',
      'Energy Star': '3 Star',
      'Condenser': 'Copper Coil'
    },
    variants: {
      capacity: ['1 Ton', '1.5 Ton', '2 Ton']
    }
  },
  {
    id: 'app-6',
    title: 'Philips Digital Air Fryer HD9252/90 with Rapid Air Tech (4.1 L)',
    brand: 'Philips',
    category: 'appliances',
    price: 7999,
    mrp: 12995,
    discount: 38,
    rating: 4.5,
    reviewCount: 15300,
    stock: 20,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Rapid Air Technology with 90% Less Fat Cooking',
      'Touch Screen with 7 Preset Cooking Menus',
      'Keep Warm function for up to 30 mins',
      'Dishwasher-Safe Removable Parts'
    ],
    specs: {
      'Capacity': '4.1 Litre',
      'Power': '1400 W',
      'Presets': '7 Presets'
    },
    variants: {
      color: ['Black', 'White']
    }
  },
  {
    id: 'app-7',
    title: 'Dyson V8 Absolute Cord-Free Vacuum Cleaner',
    brand: 'Dyson',
    category: 'appliances',
    price: 29900,
    mrp: 43900,
    discount: 31,
    rating: 4.6,
    reviewCount: 3400,
    stock: 7,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Powerful suction driven by the Dyson digital motor V8',
      'Up to 40 minutes of fade-free suction',
      'Whole machine advanced filtration captures allergens',
      'Transforms to a handheld in 1 click'
    ],
    specs: {
      'Suction Power': '115 AW',
      'Run Time': '40 mins',
      'Weight': '2.61 kg'
    },
    variants: {
      color: ['Nickel/Yellow']
    }
  },
  {
    id: 'app-8',
    title: 'Prestige Iris 750 Watt Mixer Grinder with 4 Jars',
    brand: 'Prestige',
    category: 'appliances',
    price: 2999,
    mrp: 6195,
    discount: 51,
    rating: 4.1,
    reviewCount: 74900,
    stock: 40,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '750 Watts Heavy Duty Motor',
      '3 Stainless Steel Jars + 1 Transparent Juicer Jar',
      'Ergonomic Handles with Overload Protection Switch',
      'Efficient Multi-Function Stainless Steel Blades'
    ],
    specs: {
      'Wattage': '750 W',
      'No. of Jars': '4 Jars',
      'Warranty': '2 Years'
    },
    variants: {
      color: ['White & Blue']
    }
  },

  // ==========================================
  // FASHION (9 products)
  // ==========================================
  {
    id: 'fash-1',
    title: "Levi's Men Slim Mid Rise Blue Stretchable Jeans",
    brand: "Levi's",
    category: 'fashion',
    price: 1899,
    mrp: 3599,
    discount: 47,
    rating: 4.3,
    reviewCount: 12400,
    stock: 22,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Fit: Slim Fit | Mid Rise',
      'Material: 98% Cotton, 2% Elastane for superior stretch',
      'Wash Care: Machine Wash cold with like colors',
      '5 Pocket Styling with iconic leather patch'
    ],
    specs: {
      'Fabric': 'Cotton Blend Stretch',
      'Pattern': 'Solid',
      'Closure': 'Button & Zip'
    },
    variants: {
      size: ['30', '32', '34', '36', '38'],
      color: ['Dark Blue', 'Light Blue', 'Washed Black']
    }
  },
  {
    id: 'fash-2',
    title: 'Nike Air Max Excee Running & Walking Sneakers For Men',
    brand: 'Nike',
    category: 'fashion',
    price: 5495,
    mrp: 7995,
    discount: 31,
    rating: 4.5,
    reviewCount: 8300,
    stock: 12,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Visible Air-Sole unit provides lightweight cushioning',
      'Foam midsole delivers plush comfort with every step',
      'Elongated design lines pay homage to the classic Air Max 90',
      'Rubber pods on outsole provide durable traction'
    ],
    specs: {
      'Sole Material': 'Rubber',
      'Outer Material': 'Mesh & Synthetic Leather',
      'Fastening': 'Lace-Ups'
    },
    variants: {
      size: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      color: ['White/Black', 'Pure Red', 'Wolf Grey']
    }
  },
  {
    id: 'fash-3',
    title: 'Roadster Washed Denim Jacket with Dual Chest Pockets',
    brand: 'Roadster',
    category: 'fashion',
    price: 1299,
    mrp: 3299,
    discount: 60,
    rating: 4.2,
    reviewCount: 27900,
    stock: 35,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '100% Cotton durable denim construction',
      'Spread collar with metallic button placket',
      'Regular fit, perfect for layering over tees',
      'Pre-washed for vintage rustic look'
    ],
    specs: {
      'Fabric': '100% Pure Cotton',
      'Sleeve Length': 'Long Sleeves',
      'Fit': 'Regular Fit'
    },
    variants: {
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: ['Medium Blue', 'Charcoal Grey']
    }
  },
  {
    id: 'fash-4',
    title: 'Allen Solly Men Regular Fit Solid Formal Spread Collar Shirt',
    brand: 'Allen Solly',
    category: 'fashion',
    price: 1149,
    mrp: 2299,
    discount: 50,
    rating: 4.3,
    reviewCount: 16200,
    stock: 28,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '100% Premium Cotton with wrinkle-resistant finish',
      'Classic spread collar with single patch pocket',
      'Ideal for office, conferences and formal events',
      'Breathable weave keeps you cool all day'
    ],
    specs: {
      'Pattern': 'Solid',
      'Sleeve': 'Full Sleeve',
      'Collar': 'Spread Collar'
    },
    variants: {
      size: ['38', '40', '42', '44'],
      color: ['Sky Blue', 'Crisp White', 'Soft Pink']
    }
  },
  {
    id: 'fash-5',
    title: 'Puma Smash v2 Leather Casual Shoes & Sneakers',
    brand: 'Puma',
    category: 'fashion',
    price: 2199,
    mrp: 4499,
    discount: 51,
    rating: 4.3,
    reviewCount: 44100,
    stock: 19,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Soft leather upper with iconic Puma Formstrip',
      'SoftFoam+ comfort sockliner for instant step-in cushioning',
      'Durable rubber outsole for grip and court feel'
    ],
    specs: {
      'Upper Material': 'Leather',
      'Sole Material': 'Rubber',
      'Closure': 'Lace-Up'
    },
    variants: {
      size: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
      color: ['Puma White/Black', 'Puma Black']
    }
  },
  {
    id: 'fash-6',
    title: 'Biba Women Embroidered Pure Cotton Anarkali Kurta & Dupatta',
    brand: 'Biba',
    category: 'fashion',
    price: 2399,
    mrp: 4999,
    discount: 52,
    rating: 4.4,
    reviewCount: 9100,
    stock: 16,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Pure Cotton Anarkali Silhouette with intricate zari embroidery',
      'Includes matching flared palazzo and sheer dupatta with border',
      'Festive and wedding celebration wear'
    ],
    specs: {
      'Fabric': 'Pure Cotton',
      'Style': 'Anarkali Set',
      'Occasion': 'Festive / Wedding'
    },
    variants: {
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: ['Emerald Green', 'Royal Navy', 'Ruby Red']
    }
  },
  {
    id: 'fash-7',
    title: 'Titan Neo Analog Watch with Black Dial & Leather Strap',
    brand: 'Titan',
    category: 'fashion',
    price: 3595,
    mrp: 4995,
    discount: 28,
    rating: 4.6,
    reviewCount: 21500,
    stock: 15,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Contemporary textured black dial with rose gold hour markers',
      'Genuine brown calfskin leather strap',
      '50m Water Resistance (5 ATM)',
      '24 Months manufacturer warranty'
    ],
    specs: {
      'Movement': 'Quartz',
      'Case Diameter': '42 mm',
      'Strap Material': 'Genuine Leather'
    },
    variants: {
      color: ['Black & Brown Strap', 'Silver & Blue Strap']
    }
  },
  {
    id: 'fash-8',
    title: 'Zara Floral Print V-Neck Tiered Midi Dress For Women',
    brand: 'Zara',
    category: 'fashion',
    price: 2490,
    mrp: 3990,
    discount: 37,
    rating: 4.3,
    reviewCount: 6200,
    stock: 14,
    assured: false,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Flowy breathable viscose fabric',
      'V-neckline with delicate ruffle details',
      'Elasticated waist for an ultra-flattering drape'
    ],
    specs: {
      'Length': 'Midi',
      'Fabric': '100% Viscose'
    },
    variants: {
      size: ['S', 'M', 'L'],
      color: ['Floral Yellow', 'Floral Blue']
    }
  },
  {
    id: 'fash-9',
    title: 'Ray-Ban Polarized Wayfarer Sunglasses (Matte Black)',
    brand: 'Ray-Ban',
    category: 'fashion',
    price: 6890,
    mrp: 8990,
    discount: 23,
    rating: 4.7,
    reviewCount: 5200,
    stock: 8,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '100% UV400 Protection polarized crystal lenses',
      'Reduces intense glare from reflective surfaces',
      'Iconic classic Wayfarer unisex frame silhouette'
    ],
    specs: {
      'Lens Color': 'Green Classic G-15',
      'Frame Material': 'Acetate'
    },
    variants: {
      color: ['Matte Black', 'Tortoise Brown']
    }
  },

  // ==========================================
  // HOME & FURNITURE (8 products)
  // ==========================================
  {
    id: 'home-1',
    title: 'Wakefit Orthopedic Memory Foam 6-inch King Size Mattress',
    brand: 'Wakefit',
    category: 'home',
    price: 11999,
    mrp: 18499,
    discount: 35,
    rating: 4.6,
    reviewCount: 38900,
    stock: 10,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Size: King (78 x 72 x 6 inches)',
      'Next-Gen High Resilience foam + Memory foam layer',
      'Targeted spinal alignment & pressure point relief',
      'Removable & washable breathable outer cover with 10-year warranty'
    ],
    specs: {
      'Comfort Level': 'Medium Firm',
      'Warranty': '10 Years',
      'Thickness': '6 Inch'
    },
    variants: {
      size: ['Single (72x36)', 'Queen (78x60)', 'King (78x72)'],
      thickness: ['5 Inch', '6 Inch', '8 Inch']
    }
  },
  {
    id: 'home-2',
    title: 'Green Soul Monster Ergonomic Gaming & High Back Office Chair',
    brand: 'Green Soul',
    category: 'home',
    price: 15990,
    mrp: 27990,
    discount: 42,
    rating: 4.7,
    reviewCount: 14800,
    stock: 7,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a824479e0a?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '4D Adjustable Armrests & 180° Recline mechanism',
      'Breathable Spandex & PU Leather upholstery',
      'Heavy-duty BIFMA certified Class 4 Gas Lift and alloy base',
      'Ergonomic memory foam neck & lumbar support pillows'
    ],
    specs: {
      'Maximum Weight': '125 kg',
      'Mechanism': 'Multi-function Frog Mechanism',
      'Warranty': '3 Years'
    },
    variants: {
      color: ['Full Black', 'Black & Red', 'Black & Blue']
    }
  },
  {
    id: 'home-3',
    title: 'Solimo Engineered Wood Wall Mounted TV Unit & Entertainment Center',
    brand: 'Solimo',
    category: 'home',
    price: 2499,
    mrp: 5999,
    discount: 58,
    rating: 4.1,
    reviewCount: 22100,
    stock: 18,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Supports TVs up to 55 inches',
      'Premium dark wenge finish with open shelves for set-top box and decor',
      'Made from European standard particle board with smooth edges'
    ],
    specs: {
      'Material': 'Engineered Wood',
      'Color Finish': 'Walnut / Wenge'
    },
    variants: {
      color: ['Dark Wenge', 'Walnut Brown']
    }
  },
  {
    id: 'home-4',
    title: 'Home Centre 3-Seater Fabric Sofa in Charcoal Grey',
    brand: 'Home Centre',
    category: 'home',
    price: 18999,
    mrp: 34999,
    discount: 45,
    rating: 4.4,
    reviewCount: 7100,
    stock: 5,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Sturdy kiln-dried solid pinewood internal frame',
      'High density 32-D foam cushioning for anti-sag comfort',
      'Upholstered in stain-resistant textured poly fabric'
    ],
    specs: {
      'Seating Capacity': '3 Seater',
      'Dimensions': '185 x 85 x 82 cm',
      'Warranty': '5 Years Frame Warranty'
    },
    variants: {
      color: ['Charcoal Grey', 'Navy Blue', 'Beige']
    }
  },
  {
    id: 'home-5',
    title: 'Bombay Dyeing 100% Pure Cotton Floral Double Bedsheet with 2 Pillow Covers',
    brand: 'Bombay Dyeing',
    category: 'home',
    price: 899,
    mrp: 1999,
    discount: 55,
    rating: 4.3,
    reviewCount: 53000,
    stock: 40,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '180 Thread Count Pure Cotton',
      'Size: Double Bed (220 cm x 240 cm)',
      'Colorfast reactive dyes that withstand dozens of washes'
    ],
    specs: {
      'Material': '100% Combed Cotton',
      'Thread Count': '180 TC'
    },
    variants: {
      color: ['Blue Flora', 'Pink Garden', 'Beige Blossom']
    }
  },
  {
    id: 'home-6',
    title: 'Wipro Smart LED 16 Million Colors RGB Smart Batten & Lamp (12W)',
    brand: 'Wipro',
    category: 'home',
    price: 799,
    mrp: 2090,
    discount: 61,
    rating: 4.2,
    reviewCount: 29000,
    stock: 30,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '16 Million Colors with Warm to Cool White tuning (2700K - 6500K)',
      'Voice control via Amazon Alexa and Google Assistant',
      'Timer schedules and music rhythm sync'
    ],
    specs: {
      'Wattage': '12 W',
      'Holder Type': 'B22',
      'Connectivity': 'Wi-Fi 2.4GHz'
    },
    variants: {
      pack: ['Pack of 1', 'Pack of 2']
    }
  },
  {
    id: 'home-7',
    title: 'Milton Thermosteel Flip Lid Flask 1000 ml Vacuum Insulated Bottle',
    brand: 'Milton',
    category: 'home',
    price: 949,
    mrp: 1290,
    discount: 26,
    rating: 4.5,
    reviewCount: 81200,
    stock: 50,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Keeps beverages Hot or Cold for 24 Hours',
      '100% Rust-proof Grade 304 Stainless Steel interior and exterior',
      'Leak-proof flip lid with carry pouch included'
    ],
    specs: {
      'Capacity': '1000 ml',
      'Insulation': 'Double Wall Vacuum'
    },
    variants: {
      capacity: ['500 ml', '750 ml', '1000 ml']
    }
  },
  {
    id: 'home-8',
    title: 'Solimo Non-Stick Die Cast Granite 3-Piece Cookware Set',
    brand: 'Solimo',
    category: 'home',
    price: 1999,
    mrp: 3999,
    discount: 50,
    rating: 4.3,
    reviewCount: 17400,
    stock: 24,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1584990347449-3990666657c9?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Includes: Kadhai with Glass Lid (24cm), Fry Pan (24cm), Dosa Tawa (28cm)',
      '5-Layer Food-Grade Non-Stick Granite coating (100% PFOA Free)',
      'Induction and Gas Stove compatible'
    ],
    specs: {
      'Pieces': '3 Pieces',
      'Coating': 'Granite 5-Layer'
    },
    variants: {
      color: ['Granite Grey', 'Granite Red']
    }
  },

  // ==========================================
  // BEAUTY & PERSONAL CARE (8 products)
  // ==========================================
  {
    id: 'bty-1',
    title: 'Minimalist 10% Niacinamide Face Serum with Zinc For Blemishes (30 ml)',
    brand: 'Minimalist',
    category: 'beauty',
    price: 569,
    mrp: 599,
    discount: 5,
    rating: 4.5,
    reviewCount: 62000,
    stock: 35,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Reduces acne marks, blemishes & balances sebum production',
      'Formulated with pure 10% Niacinamide and 1% Zinc PCA',
      'Fragrance-Free, Essential Oil-Free, Non-Comedogenic'
    ],
    specs: {
      'Skin Type': 'All Skin Types / Acne Prone',
      'Volume': '30 ml'
    },
    variants: {
      volume: ['30 ml', '60 ml']
    }
  },
  {
    id: 'bty-2',
    title: 'Cetaphil Gentle Skin Cleanser for Dry to Normal Sensitive Skin (250 ml)',
    brand: 'Cetaphil',
    category: 'beauty',
    price: 520,
    mrp: 650,
    discount: 20,
    rating: 4.6,
    reviewCount: 78500,
    stock: 40,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Hydrating glycerin, Vitamin B5 (Panthenol) & Vitamin B3 (Niacinamide)',
      'Defends against 5 signs of skin sensitivity',
      'Soap-free, hypoallergenic, non-irritating formula'
    ],
    specs: {
      'Volume': '250 ml',
      'Dermatologist Tested': 'Yes'
    },
    variants: {
      volume: ['125 ml', '250 ml', '500 ml']
    }
  },
  {
    id: 'bty-3',
    title: 'Maybelline New York Super Stay Matte Ink Liquid Lipstick (Fighter)',
    brand: 'Maybelline',
    category: 'beauty',
    price: 529,
    mrp: 699,
    discount: 24,
    rating: 4.4,
    reviewCount: 110400,
    stock: 45,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Up to 16 Hours Flawless Matte finish without budging',
      'Arrow precision applicator for precise lines',
      'Highly pigmented formula transfer-proof'
    ],
    specs: {
      'Finish': 'Matte',
      'Form': 'Liquid'
    },
    variants: {
      shade: ['Fighter 70', 'Seductress 65', 'Ruler 80', 'Pioneer 20']
    }
  },
  {
    id: 'bty-4',
    title: 'Philips Series 3000 Self-Sharpening Blades Beard Trimmer (BT3231/15)',
    brand: 'Philips',
    category: 'beauty',
    price: 1699,
    mrp: 2395,
    discount: 29,
    rating: 4.4,
    reviewCount: 92300,
    stock: 25,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Lift & Trim system cuts 30% faster without pulling',
      'DuraPower technology for 6x longer battery life (60 min run time)',
      '20 Lock-in length settings (0.5mm to 10mm with 0.5mm precision)'
    ],
    specs: {
      'Battery Runtime': '60 mins',
      'Blade Material': 'Stainless Steel',
      'Warranty': '2 + 1 Year Extended'
    },
    variants: {
      color: ['Emerald Green', 'Deep Black']
    }
  },
  {
    id: 'bty-5',
    title: "L'Oreal Paris Total Repair 5 Damaged Hair Shampoo (650 ml)",
    brand: "L'Oreal",
    category: 'beauty',
    price: 499,
    mrp: 849,
    discount: 41,
    rating: 4.4,
    reviewCount: 58000,
    stock: 55,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Fights 5 signs of damaged hair: Hair fall, dryness, roughness, dullness, split ends',
      'Enriched with Keratin XS & Ceramide',
      'Restores strength to hair fibers'
    ],
    specs: {
      'Volume': '650 ml',
      'Target': 'Damaged Hair'
    },
    variants: {
      volume: ['340 ml', '650 ml', '1000 ml']
    }
  },
  {
    id: 'bty-6',
    title: 'Beardo Godfather Beard Growth Oil & Softener for Men (30 ml)',
    brand: 'Beardo',
    category: 'beauty',
    price: 299,
    mrp: 500,
    discount: 40,
    rating: 4.2,
    reviewCount: 37000,
    stock: 30,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1552046122-03184de85e08?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Nourishing blend of almond oil, castor oil, and Vitamin E',
      'Softens coarse beard hair and conditions itchy skin underneath',
      'Mild masculine fragrance'
    ],
    specs: {
      'Volume': '30 ml',
      'Ingredients': 'Almond Oil, Argan Oil, Castor Oil'
    },
    variants: {
      volume: ['30 ml', '50 ml']
    }
  },
  {
    id: 'bty-7',
    title: 'The Derma Co 1% Hyaluronic Sunscreen Aqua Gel SPF 50 PA++++ (50g)',
    brand: 'The Derma Co',
    category: 'beauty',
    price: 449,
    mrp: 499,
    discount: 10,
    rating: 4.5,
    reviewCount: 41900,
    stock: 38,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Broad spectrum SPF 50 PA++++ blue light protection',
      'Non-greasy, ultra-lightweight aqua gel that leaves zero white cast',
      'Enriched with Hyaluronic Acid and Vitamin E'
    ],
    specs: {
      'SPF': '50 PA++++',
      'Weight': '50 g'
    },
    variants: {
      pack: ['Pack of 1', 'Pack of 2']
    }
  },
  {
    id: 'bty-8',
    title: 'Fogg Scent Xpressio Eau De Parfum Long Lasting Perfume For Men (100 ml)',
    brand: 'Fogg',
    category: 'beauty',
    price: 499,
    mrp: 899,
    discount: 44,
    rating: 4.1,
    reviewCount: 46700,
    stock: 45,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '100% Perfume liquid with zero gas formulation',
      'Rich woody & spicy masculine fragrance notes',
      'Ensures up to 800+ sprays'
    ],
    specs: {
      'Type': 'Eau De Parfum',
      'Volume': '100 ml'
    },
    variants: {
      scent: ['Xpressio', 'Intense Oudh', 'Sultan']
    }
  },

  // ==========================================
  // TOYS & KIDS (8 products)
  // ==========================================
  {
    id: 'toy-1',
    title: 'LEGO Classic Medium Creative Brick Box Building Set (484 Pieces)',
    brand: 'LEGO',
    category: 'toys',
    price: 2499,
    mrp: 3499,
    discount: 28,
    rating: 4.7,
    reviewCount: 9600,
    stock: 15,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Includes 484 colorful LEGO bricks across 35 different colors',
      'Special pieces: 18 tires, 18 wheel rims, windows, toy eyes & baseplate',
      'Comes in a reusable plastic storage box container'
    ],
    specs: {
      'Pieces': '484 Pieces',
      'Age Range': '4 Years and above',
      'Material': 'ABS Plastic'
    },
    variants: {
      pieces: ['484 Pieces', '790 Pieces']
    }
  },
  {
    id: 'toy-2',
    title: 'Hot Wheels 5-Car Gift Pack Assorted Die-cast 1:64 Scale Vehicles',
    brand: 'Hot Wheels',
    category: 'toys',
    price: 749,
    mrp: 999,
    discount: 25,
    rating: 4.6,
    reviewCount: 38000,
    stock: 60,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Pack of 5 authentic 1:64 die-cast vehicles with real rider wheels',
      'Cool unifying themes with high detailed graphics',
      'Track stars ready to race on Hot Wheels tracks'
    ],
    specs: {
      'Scale': '1:64',
      'Number of Cars': '5 Cars'
    },
    variants: {
      theme: ['Muscle Mania', 'HW Exotics', 'Flame Cars']
    }
  },
  {
    id: 'toy-3',
    title: 'Fisher-Price Musical Activity Walker for Babies & Toddlers',
    brand: 'Fisher-Price',
    category: 'toys',
    price: 1999,
    mrp: 2999,
    discount: 33,
    rating: 4.5,
    reviewCount: 11200,
    stock: 12,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '2 ways to play as baby grows: Sit & Play or Stand & Walk',
      'Musical keys, spinners, roller balls and turning pages',
      'Sturdy 4-wheel base helps steady wobbly first steps'
    ],
    specs: {
      'Age Range': '6 to 36 Months',
      'Battery': '2 AA Batteries'
    },
    variants: {
      color: ['Multicolor Zebra', 'Lion']
    }
  },
  {
    id: 'toy-4',
    title: 'Barbie Dreamhouse Doll with Fashion Outfit & Accessories',
    brand: 'Barbie',
    category: 'toys',
    price: 899,
    mrp: 1499,
    discount: 40,
    rating: 4.4,
    reviewCount: 16700,
    stock: 25,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1560859250-949463cfae90?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Classic Barbie doll dressed in a trendy signature print dress',
      'Includes shoes, sunglasses, and tote bag accessories',
      'Articulated joints for fun storytelling poses'
    ],
    specs: {
      'Height': '29 cm',
      'Material': 'Non-toxic Vinyl'
    },
    variants: {
      outfit: ['Floral Pink', 'Striped Blue']
    }
  },
  {
    id: 'toy-5',
    title: 'Nerf Elite 2.0 Commander RD-6 Dart Blaster with 12 Darts',
    brand: 'Nerf',
    category: 'toys',
    price: 1099,
    mrp: 1799,
    discount: 38,
    rating: 4.4,
    reviewCount: 18400,
    stock: 20,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1533228896884-297d26859740?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '6-dart rotating cylinder drum',
      'Fires darts up to 90 feet (27 meters)',
      'Slam-fire action to unleash darts rapidly',
      'Customizable with 3 tactical rails and barrel attachment points'
    ],
    specs: {
      'Included Darts': '12 Official Nerf Darts',
      'Age': '8+ Years'
    },
    variants: {
      model: ['Commander RD-6', 'Echo CS-10']
    }
  },
  {
    id: 'toy-6',
    title: 'Pampers All Round Protection Baby Diapers Pants (Large, 74 Count)',
    brand: 'Pampers',
    category: 'toys',
    price: 1049,
    mrp: 1499,
    discount: 30,
    rating: 4.6,
    reviewCount: 134000,
    stock: 50,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Up to 100% leakage lock with absorbent Magic Gel core',
      'Infused with Aloe Vera lotion to protect gentle skin from rashes',
      'Ultra-soft 360-degree elastic waistband'
    ],
    specs: {
      'Size': 'Large (9-14 kg)',
      'Count': '74 Pants'
    },
    variants: {
      size: ['M (7-12 kg)', 'L (9-14 kg)', 'XL (12-17 kg)']
    }
  },
  {
    id: 'toy-7',
    title: 'LuvLap Sunshine Baby Stroller & Buggy with Reversible Handle',
    brand: 'LuvLap',
    category: 'toys',
    price: 4299,
    mrp: 6999,
    discount: 38,
    rating: 4.3,
    reviewCount: 15900,
    stock: 8,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '5-point safety harness for highest infant security',
      '3-position seat recline (sitting, resting, sleeping flat)',
      'Reversible handlebar allows parents to face baby while strolling'
    ],
    specs: {
      'Max Weight': '15 kg',
      'Wheel Suspension': 'Front Wheels with Swivel Lock'
    },
    variants: {
      color: ['Navy Blue', 'Wine Red', 'Jet Black']
    }
  },
  {
    id: 'toy-8',
    title: 'Monopoly Deluxe Indian Edition Family Board Game',
    brand: 'Hasbro',
    category: 'toys',
    price: 899,
    mrp: 1299,
    discount: 30,
    rating: 4.6,
    reviewCount: 22700,
    stock: 35,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Buy, trade, and mortgage iconic Indian cities & landmarks',
      'Includes metallic tokens, houses, hotels, chance cards and dice',
      'The world-favorite family trading board game'
    ],
    specs: {
      'Players': '2 to 6 Players',
      'Age': '8 Years and Above'
    },
    variants: {
      edition: ['India Edition', 'Classic World']
    }
  },

  // ==========================================
  // GROCERY & GOURMET (8 products)
  // ==========================================
  {
    id: 'groc-1',
    title: 'Fortune Sunlite Refined Sunflower Oil Pouch (1 L)',
    brand: 'Fortune',
    category: 'grocery',
    price: 125,
    mrp: 165,
    discount: 24,
    rating: 4.5,
    reviewCount: 94000,
    stock: 100,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Light and healthy edible cooking oil',
      'Enriched with Vitamins A, D, and E',
      'High smoke point, ideal for everyday Indian cooking and frying'
    ],
    specs: {
      'Quantity': '1 Litre',
      'Food Type': '100% Vegetarian'
    },
    variants: {
      pack: ['1 L Pouch', '5 L Can']
    }
  },
  {
    id: 'groc-2',
    title: 'Aashirvaad Superior MP Shudh Chakki Atta (5 kg)',
    brand: 'Aashirvaad',
    category: 'grocery',
    price: 249,
    mrp: 295,
    discount: 15,
    rating: 4.6,
    reviewCount: 142000,
    stock: 80,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '100% Pure Whole Wheat with high natural fiber',
      'Traditional stone-ground process locks in nutrients and sweetness',
      'Rotis stay soft and fluffy for hours'
    ],
    specs: {
      'Weight': '5 kg',
      'Dietary Preference': 'High Fiber Whole Grain'
    },
    variants: {
      pack: ['1 kg', '5 kg', '10 kg']
    }
  },
  {
    id: 'groc-3',
    title: 'Tata Salt Vacuum Evaporated Iodised Salt (1 kg)',
    brand: 'Tata',
    category: 'grocery',
    price: 28,
    mrp: 30,
    discount: 6,
    rating: 4.7,
    reviewCount: 220000,
    stock: 120,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Desh Ka Namak - pioneer of packaged iodised salt in India',
      'Essential for mental and physical development of children',
      'Vacuum evaporated purity guarantee'
    ],
    specs: {
      'Weight': '1 kg',
      'Iodine Level': 'Minimum 15 ppm'
    },
    variants: {
      pack: ['1 kg']
    }
  },
  {
    id: 'groc-4',
    title: 'Nescafe Classic 100% Pure Instant Coffee Glass Jar (200 g)',
    brand: 'Nescafe',
    category: 'grocery',
    price: 499,
    mrp: 650,
    discount: 23,
    rating: 4.6,
    reviewCount: 81400,
    stock: 45,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Signature robust flavor and rich aroma',
      'Crafted with 100% pure Robusta and Arabica coffee beans',
      'Dissolves effortlessly in both hot and cold milk'
    ],
    specs: {
      'Weight': '200 g',
      'Container': 'Glass Jar'
    },
    variants: {
      weight: ['50 g', '100 g', '200 g']
    }
  },
  {
    id: 'groc-5',
    title: 'Cadbury Celebrations Premium Assorted Chocolate Gift Pack (286 g)',
    brand: 'Cadbury',
    category: 'grocery',
    price: 299,
    mrp: 350,
    discount: 14,
    rating: 4.5,
    reviewCount: 61000,
    stock: 55,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Includes Dairy Milk, 5 Star, and Gems favorite chocolates',
      'Festive packaging with celebratory heartfelt design',
      'Perfect gift for family, friends, and special moments'
    ],
    specs: {
      'Weight': '286 g',
      'Form': 'Assorted Chocolates'
    },
    variants: {
      weight: ['130 g', '286 g', '450 g']
    }
  },
  {
    id: 'groc-6',
    title: "Kellogg's Real Almond & Honey Crunchy Corn Flakes (1 kg)",
    brand: "Kellogg's",
    category: 'grocery',
    price: 440,
    mrp: 550,
    discount: 20,
    rating: 4.4,
    reviewCount: 38400,
    stock: 35,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Golden roasted corn flakes with sliced crunchy almonds & natural honey',
      'High in B-group vitamins and Vitamin C',
      'Healthy energizing breakfast choice'
    ],
    specs: {
      'Weight': '1 kg',
      'Shelf Life': '9 Months'
    },
    variants: {
      pack: ['500 g', '1 kg']
    }
  },
  {
    id: 'groc-7',
    title: 'Tata Tea Gold Assam Orthodox Leaf Tea (1 kg)',
    brand: 'Tata Tea',
    category: 'grocery',
    price: 520,
    mrp: 660,
    discount: 21,
    rating: 4.5,
    reviewCount: 49000,
    stock: 40,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Exquisite blend of 85% Assam CTC teas and 15% long orthodox leaves',
      'Delivers an irresistible gentle aroma and rich golden liquor',
      'Perfect cup to rejuvenate your senses'
    ],
    specs: {
      'Quantity': '1 kg',
      'Form': 'Loose Tea Leaves'
    },
    variants: {
      weight: ['500 g', '1 kg']
    }
  },
  {
    id: 'groc-8',
    title: 'Nutraj California Inshell Crunchy Walnuts Akhrot (1 kg)',
    brand: 'Nutraj',
    category: 'grocery',
    price: 799,
    mrp: 1499,
    discount: 46,
    rating: 4.3,
    reviewCount: 28600,
    stock: 28,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1543208541-00429edbdece?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '100% Natural raw California whole walnuts',
      'Packed with brain-boosting Omega-3 fatty acids and antioxidants',
      'Crisp, clean shells easy to crack open'
    ],
    specs: {
      'Weight': '1 kg',
      'Storage': 'Store in a cool dry place'
    },
    variants: {
      pack: ['500 g', '1 kg']
    }
  },

  // ==========================================
  // TRAVEL & LUGGAGE (6 products)
  // ==========================================
  {
    id: 'trv-1',
    title: 'American Tourister 68 cm Polycarbonate Hard Suitcase Trolley',
    brand: 'American Tourister',
    category: 'travel',
    price: 3499,
    mrp: 8500,
    discount: 58,
    rating: 4.4,
    reviewCount: 24000,
    stock: 14,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Scratch-resistant micro-diamond textured polycarbonate shell',
      '360-degree 8-wheel silent spinner system',
      'Built-in recessed 3-dial TSA combination lock',
      '3 Years global warranty'
    ],
    specs: {
      'Capacity': '76 L',
      'Dimensions': '68 x 47 x 28 cm',
      'Shell': 'Hard Shell Polycarbonate'
    },
    variants: {
      size: ['Cabin (55cm)', 'Medium (68cm)', 'Large (79cm)'],
      color: ['Teal Blue', 'Jet Black', 'Ruby Red']
    }
  },
  {
    id: 'trv-2',
    title: 'Safari Thorium 8-Wheel Hard Luggage Trolley Bag (55 cm Cabin)',
    brand: 'Safari',
    category: 'travel',
    price: 1999,
    mrp: 6999,
    discount: 71,
    rating: 4.3,
    reviewCount: 42100,
    stock: 22,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Airline cabin approved size for all major domestic airlines',
      'Lightweight and durable textured polypropylene body',
      'Internal zippered partition with cross elastic compression straps'
    ],
    specs: {
      'Size': '55 cm Cabin',
      'Wheels': '8 Wheels 360 Rotation'
    },
    variants: {
      color: ['Midnight Blue', 'Gunmetal Grey', 'Rose Gold']
    }
  },
  {
    id: 'trv-3',
    title: 'Wildcraft 45 L Outdoor Camping & Hiking Rucksack Backpack',
    brand: 'Wildcraft',
    category: 'travel',
    price: 2199,
    mrp: 4199,
    discount: 47,
    rating: 4.4,
    reviewCount: 17200,
    stock: 18,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Padded back system with airway mesh for ventilation',
      'Top-loading main compartment with quick-access drawstring closure',
      'Reinforced hauling loop with trekking pole attachments',
      'Water repellent nylon fabric'
    ],
    specs: {
      'Capacity': '45 L',
      'Material': 'Ripstop Nylon'
    },
    variants: {
      color: ['Olive Green', 'Jet Black', 'Cobalt Blue']
    }
  },
  {
    id: 'trv-4',
    title: 'Travel Blue Ergonomic Memory Foam Neck Pillow for Flights',
    brand: 'Travel Blue',
    category: 'travel',
    price: 999,
    mrp: 1999,
    discount: 50,
    rating: 4.5,
    reviewCount: 6800,
    stock: 30,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'High-density memory foam contours to neck and chin perfectly',
      'Prevents head swaying during long haul flights or road trips',
      'Machine washable plush velour outer cover'
    ],
    specs: {
      'Material': 'Pure Memory Foam',
      'Weight': '320 g'
    },
    variants: {
      color: ['Navy Blue', 'Slate Grey']
    }
  },
  {
    id: 'trv-5',
    title: 'Universal All-in-One Worldwide Travel Adapter with Dual USB Ports',
    brand: 'Syska',
    category: 'travel',
    price: 599,
    mrp: 1499,
    discount: 60,
    rating: 4.3,
    reviewCount: 19200,
    stock: 45,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Covers more than 150 countries with US/EU/UK/AU plugs',
      'Dual fast USB charging ports (2.4A output)',
      'Built-in safety shutters and surge fuse protection'
    ],
    specs: {
      'Max Power': '1500W at 250V',
      'USB Ports': '2'
    },
    variants: {
      color: ['White', 'Black']
    }
  },
  {
    id: 'trv-6',
    title: 'Skybags Cardiff 55 L Water Resistant Polyester Duffel Bag',
    brand: 'Skybags',
    category: 'travel',
    price: 1399,
    mrp: 3200,
    discount: 56,
    rating: 4.2,
    reviewCount: 12800,
    stock: 25,
    assured: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Heavy-duty dual wheels for easy pulling',
      'Large U-shaped opening for hassle-free packing',
      'Adjustable padded shoulder strap and dual grab handles'
    ],
    specs: {
      'Capacity': '55 L',
      'Warranty': '3 Years'
    },
    variants: {
      color: ['Blue Print', 'Black Geometric']
    }
  }
];

// Helper functions for filtering and querying products
export const getProductById = (id) => {
  return PRODUCTS.find((p) => String(p.id) === String(id));
};

export const getProductsByCategory = (categorySlug) => {
  if (!categorySlug || categorySlug === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category.toLowerCase() === categorySlug.toLowerCase());
};

export const getFeaturedProducts = (limit = 8) => {
  return PRODUCTS.slice(0, limit);
};

export const getDealsOfTheDay = (limit = 6) => {
  return PRODUCTS.filter((p) => p.discount >= 30).slice(0, limit);
};
