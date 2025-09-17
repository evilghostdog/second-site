import { users, products, type User, type InsertUser, type Product, type InsertProduct, type UpdateProduct } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: UpdateProduct): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<string, Product>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentId = 1;
    
    // Initialize with default MIRA products
    this.initializeProducts();
  }

  private initializeProducts() {
    const defaultProducts: Product[] = [
      {
        id: 'mango-chili-pack',
        name: 'Mango-Chili 6-Pack',
        description: 'Tropical sweetness meets gentle heat. Perfect for those who like bold flavors.',
        price: '18.99',
        image: '/src/assets/nava-mango-chili.jpg',
        flavors: ['Sweet Mango', 'Mild Chili', 'Citrus Finish'],
        gradient: 'bg-gradient-mango-chili',
        inStock: true
      },
      {
        id: 'cucumber-lime-pack',
        name: 'Cucumber-Lime 6-Pack',
        description: 'Refreshing garden-to-glass clarity. Clean and crisp.',
        price: '18.99',
        image: '/src/assets/nava-cucumber-lime.jpg',
        flavors: ['Fresh Cucumber', 'Zesty Lime', 'Herbal Notes'],
        gradient: 'bg-gradient-cucumber-lime',
        inStock: true
      },
      {
        id: 'hibiscus-ginger-pack',
        name: 'Hibiscus-Ginger 6-Pack',
        description: 'Floral elegance with warming spice. Sophisticated and unique.',
        price: '18.99',
        image: '/src/assets/nava-hibiscus-ginger.jpg',
        flavors: ['Floral Hibiscus', 'Warm Ginger', 'Berry Hints'],
        gradient: 'bg-gradient-hibiscus-ginger',
        inStock: true
      },
      {
        id: 'grapefruit-rosemary-pack',
        name: 'Grapefruit-Rosemary 6-Pack',
        description: 'Citrus brightness with herbal sophistication. Refreshing and complex.',
        price: '18.99',
        image: '/src/assets/nava-grapefruit-rosemary.jpg',
        flavors: ['Pink Grapefruit', 'Fresh Rosemary', 'Clean Finish'],
        gradient: 'bg-gradient-grapefruit-rosemary',
        inStock: true
      },
      {
        id: 'variety-pack',
        name: 'Variety Pack (24 cans)',
        description: 'Try all four flavors! 6 cans of each flavor in one convenient pack.',
        price: '64.99',
        image: '/src/assets/nava-mango-chili.jpg',
        flavors: ['All Four Flavors', '6 of Each', 'Perfect Sampler'],
        gradient: 'bg-gradient-to-r from-orange-400 via-green-400 via-purple-400 to-pink-400',
        inStock: true
      }
    ];

    defaultProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = { 
      ...insertProduct,
      inStock: insertProduct.inStock ?? true // Ensure inStock has a default value
    };
    this.products.set(product.id, product);
    return product;
  }

  async updateProduct(id: string, updateProduct: UpdateProduct): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return undefined;
    }
    
    const updatedProduct: Product = { ...existingProduct, ...updateProduct };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }
}

export const storage = new MemStorage();
