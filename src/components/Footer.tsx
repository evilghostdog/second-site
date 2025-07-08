import React from 'react';
import { Instagram, Twitter, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Brand */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold text-foreground mb-4">NAVA</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Premium sparkling drinks for those who refuse to compromise. 
                Clean ingredients, bold flavors, zero sugar.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mt-6">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Shop</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Press</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Wholesale</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Shipping</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Returns</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-muted-foreground text-sm">
                <p className="font-semibold text-foreground mb-1">Alcohol 5% vol. Drink responsibly.</p>
                <p>Only for ages 18+ in BE and EU. © 2024 NAVA. All rights reserved.</p>
              </div>
              
              <div className="text-muted-foreground text-sm text-center md:text-right">
                <p>Made with ❤️ in Belgium</p>
                <p>Distributed responsibly across Europe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};