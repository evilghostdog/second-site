import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useLocation } from 'wouter';

export const OrderSuccess: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-lg mx-auto text-center">
          <Card className="border-green-200">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Order Confirmed!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for your NAVA purchase
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  Your order has been successfully processed and you'll receive a confirmation email shortly.
                </p>
                <p className="text-sm text-muted-foreground">
                  Your NAVA sparkling drinks will be shipped within 2-3 business days.
                </p>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You'll receive an email confirmation</li>
                  <li>• Tracking information will be sent when shipped</li>
                  <li>• Your drinks will arrive cold and ready to enjoy</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setLocation('/shop')}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setLocation('/')}
                >
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;