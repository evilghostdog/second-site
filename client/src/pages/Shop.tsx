import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@shared/schema';

export const Shop: React.FC = () => {
  const { addToCart, setIsOpen } = useCart();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Shop NAVA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your flavor journey. All products feature our signature clean ingredients, 
            zero sugar, and 5% alcohol content.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Failed to load products</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.filter(product => product.inStock).map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 ${product.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Special Badge for Variety Pack */}
                {product.id === 'variety-pack' && (
                  <Badge 
                    className="absolute top-4 right-4 bg-primary text-primary-foreground"
                    variant="default"
                  >
                    Best Value
                  </Badge>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Flavor Notes */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-muted-foreground">Flavor Notes:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.flavors.map((flavor, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {flavor}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                    {product.id === 'variety-pack' && (
                      <p className="text-sm text-muted-foreground">
                        ${(parseFloat(product.price) / 24).toFixed(2)} per can
                      </p>
                    )}
                    {product.id !== 'variety-pack' && (
                      <p className="text-sm text-muted-foreground">
                        ${(parseFloat(product.price) / 6).toFixed(2)} per can
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full group"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Why Choose NAVA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Real Ingredients</h3>
              <p className="text-muted-foreground text-sm">
                No artificial flavors or preservatives. Just clean, natural taste.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Free shipping on orders over $50. Delivered fresh to your door.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Badge className="w-8 h-8 bg-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-muted-foreground text-sm">
                30-day money-back guarantee. Love it or get your money back.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;