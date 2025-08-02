export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in dollars
  image: string;
  flavors: string[];
  gradient: string;
}

export const products: Product[] = [
  {
    id: 'mango-chili-pack',
    name: 'Mango-Chili 6-Pack',
    description: 'Tropical sweetness meets gentle heat. Perfect for those who like bold flavors.',
    price: 18.99,
    image: '/src/assets/nava-mango-chili.jpg',
    flavors: ['Sweet Mango', 'Mild Chili', 'Citrus Finish'],
    gradient: 'bg-gradient-mango-chili'
  },
  {
    id: 'cucumber-lime-pack',
    name: 'Cucumber-Lime 6-Pack',
    description: 'Refreshing garden-to-glass clarity. Clean and crisp.',
    price: 18.99,
    image: '/src/assets/nava-cucumber-lime.jpg',
    flavors: ['Fresh Cucumber', 'Zesty Lime', 'Herbal Notes'],
    gradient: 'bg-gradient-cucumber-lime'
  },
  {
    id: 'hibiscus-ginger-pack',
    name: 'Hibiscus-Ginger 6-Pack',
    description: 'Floral elegance with warming spice. Sophisticated and unique.',
    price: 18.99,
    image: '/src/assets/nava-hibiscus-ginger.jpg',
    flavors: ['Floral Hibiscus', 'Warm Ginger', 'Berry Hints'],
    gradient: 'bg-gradient-hibiscus-ginger'
  },
  {
    id: 'grapefruit-rosemary-pack',
    name: 'Grapefruit-Rosemary 6-Pack',
    description: 'Citrus brightness with herbal sophistication. Refreshing and complex.',
    price: 18.99,
    image: '/src/assets/nava-grapefruit-rosemary.jpg',
    flavors: ['Pink Grapefruit', 'Fresh Rosemary', 'Clean Finish'],
    gradient: 'bg-gradient-grapefruit-rosemary'
  },
  {
    id: 'variety-pack',
    name: 'Variety Pack (24 cans)',
    description: 'Try all four flavors! 6 cans of each flavor in one convenient pack.',
    price: 64.99,
    image: '/src/assets/nava-mango-chili.jpg',
    flavors: ['All Four Flavors', '6 of Each', 'Perfect Sampler'],
    gradient: 'bg-gradient-to-r from-orange-400 via-green-400 via-purple-400 to-pink-400'
  }
];

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}