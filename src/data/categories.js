// Flipkart Categories Data with Subcategories for Mega-Dropdown

export const CATEGORIES = [
  {
    id: 'top-offers',
    name: 'Top Offers',
    slug: 'top-offers',
    icon: 'Percent',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Deal Zones',
        items: ['Deals of the Day', 'Under ₹499 Store', 'Clearance Sale', 'Flash Deals', 'Refurbished Goods']
      },
      {
        title: 'Offers by Category',
        items: ['Mobile Offers', 'Electronics Special', 'Fashion Fest (Min 60% Off)', 'Home Makeover Deals']
      },
      {
        title: 'Bank Offers',
        items: ['Flipkart Axis Card 5% Cashback', 'HDFC Instant Discount', 'SBI Card Offers', 'No Cost EMI']
      }
    ]
  },
  {
    id: 'mobiles',
    name: 'Mobiles',
    slug: 'mobiles',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Popular Brands',
        items: ['Apple iPhones', 'Samsung Galaxy', 'OnePlus', 'Realme', 'Xiaomi / Redmi', 'Google Pixel', 'Motorola', 'POCO']
      },
      {
        title: 'Mobile Accessories',
        items: ['Mobile Cases & Covers', 'Screen Protectors', 'Fast Chargers & Cables', 'Power Banks', 'Headphones & Earbuds']
      },
      {
        title: 'Price Range',
        items: ['Under ₹10,000', '₹10,000 - ₹20,000', '₹20,000 - ₹40,000', 'Flagship (₹40,000+)']
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Laptops & Computers',
        items: ['MacBooks', 'Gaming Laptops', 'Thin & Light Laptops', 'Computer Monitors', 'Keyboards & Mice', 'Printers']
      },
      {
        title: 'Audio & Wearables',
        items: ['True Wireless Earbuds', 'Bluetooth Headphones', 'Smartwatches', 'Soundbars', 'Bluetooth Speakers']
      },
      {
        title: 'Cameras & Gear',
        items: ['DSLR & Mirrorless', 'Action Cameras & GoPros', 'Ring Lights & Tripods', 'Camera Lenses']
      },
      {
        title: 'Storage & Accessories',
        items: ['External Hard Drives', 'SSD Storage', 'Pendrives', 'Memory Cards', 'Laptop Bags']
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: "Men's Fashion",
        items: ['T-Shirts & Polos', 'Casual & Formal Shirts', 'Jeans & Trousers', 'Jackets & Sweatshirts', 'Sport Shoes & Sneakers', 'Formal Shoes']
      },
      {
        title: "Women's Fashion",
        items: ['Kurtas & Ethnic Sets', 'Western Dresses & Tops', 'Sarees & Lehengas', 'Heels & Casual Flats', 'Handbags & Clutches']
      },
      {
        title: 'Watches & Accessories',
        items: ['Men Watches', 'Women Watches', 'Sunglasses', 'Wallets & Belts', 'Fashion Jewellery']
      }
    ]
  },
  {
    id: 'home',
    name: 'Home & Furniture',
    slug: 'home',
    icon: 'Armchair',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Furniture',
        items: ['Beds & Mattresses', 'Sofas & Recliners', 'Dining Tables & Sets', 'Office Chairs & Study Tables', 'Wardrobes']
      },
      {
        title: 'Home Furnishing',
        items: ['Bedsheets & Comforters', 'Curtains & Drapes', 'Cushions & Pillows', 'Carpets & Rugs']
      },
      {
        title: 'Home Decor & Lighting',
        items: ['Wall Clocks', 'Floor & Table Lamps', 'Smart Lighting', 'Paintings & Wall Art']
      },
      {
        title: 'Kitchen & Dining',
        items: ['Cookware Sets', 'Storage Containers', 'Dinnerware & Bowls', 'Water Bottles & Flasks']
      }
    ]
  },
  {
    id: 'appliances',
    name: 'Appliances',
    slug: 'appliances',
    icon: 'Tv',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Televisions',
        items: ['Smart Android TVs', '4K Ultra HD TVs', 'OLED & QLED TVs', 'Projectors']
      },
      {
        title: 'Large Appliances',
        items: ['Air Conditioners', 'Refrigerators', 'Washing Machines', 'Microwave Ovens', 'Dishwashers']
      },
      {
        title: 'Small Kitchen Appliances',
        items: ['Mixer Grinders', 'Air Fryers', 'Electric Kettles', 'Toasters', 'Induction Cooktops']
      }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Skin Care',
        items: ['Face Moisturizers', 'Sunscreens', 'Serums & Essences', 'Face Washes & Scrubs']
      },
      {
        title: 'Hair & Makeup',
        items: ['Lipsticks & Glosses', 'Foundations & Compacts', 'Shampoos & Conditioners', 'Hair Oils & Serums']
      },
      {
        title: "Men's Grooming",
        items: ['Beard Trimmers & Shavers', 'Beard Oils & Wash', 'Deodorants & Perfumes']
      }
    ]
  },
  {
    id: 'toys',
    name: 'Toys & Baby',
    slug: 'toys',
    icon: 'Gamepad2',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Toys & Games',
        items: ['Building Blocks & LEGO', 'Remote Control Cars & Drones', 'Board Games & Puzzles', 'Action Figures & Dolls']
      },
      {
        title: 'Baby Care',
        items: ['Baby Diapers & Wipes', 'Baby Strollers & Prams', 'Feeding Bottles & Warmers', 'Baby Clothing Sets']
      }
    ]
  },
  {
    id: 'grocery',
    name: 'Grocery',
    slug: 'grocery',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Staples',
        items: ['Atta & Flours', 'Rice & Grains', 'Edible Oils & Ghee', 'Pulses & Dals', 'Spices & Masalas']
      },
      {
        title: 'Snacks & Beverages',
        items: ['Tea & Coffee', 'Biscuits & Cookies', 'Chocolates & Sweets', 'Breakfast Cereals']
      },
      {
        title: 'Packaged Foods',
        items: ['Noodles & Pasta', 'Jams & Honey', 'Dry Fruits & Nuts', 'Sauces & Spreads']
      }
    ]
  },
  {
    id: 'travel',
    name: 'Travel',
    slug: 'travel',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&auto=format&fit=crop&q=80',
    subcategories: [
      {
        title: 'Luggage & Bags',
        items: ['Cabin Trolley Bags', 'Hard Luggage Suitcases', 'Trekking Rucksacks', 'Duffel Bags']
      },
      {
        title: 'Travel Accessories',
        items: ['Neck Pillows & Eye Masks', 'Luggage Tags & Locks', 'Universal Travel Adapters', 'Toiletry Kits']
      }
    ]
  }
];
