import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { insertProductSchema, type InsertProduct, type Product } from '@shared/schema';
import { z } from 'zod';

const productFormSchema = insertProductSchema.extend({
  flavors: z.array(z.string()).min(1, "At least one flavor is required"),
});

type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [flavors, setFlavors] = useState<string[]>(product?.flavors || []);
  const [flavorInput, setFlavorInput] = useState('');

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      id: product?.id || '',
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '0.00',
      image: product?.image || '',
      flavors: product?.flavors || [],
      gradient: product?.gradient || '',
      inStock: product?.inStock ?? true,
    },
  });

  const addFlavor = () => {
    if (flavorInput.trim() && !flavors.includes(flavorInput.trim())) {
      const newFlavors = [...flavors, flavorInput.trim()];
      setFlavors(newFlavors);
      form.setValue('flavors', newFlavors);
      setFlavorInput('');
    }
  };

  const removeFlavor = (index: number) => {
    const newFlavors = flavors.filter((_, i) => i !== index);
    setFlavors(newFlavors);
    form.setValue('flavors', newFlavors);
  };

  const handleSubmit = async (data: ProductFormData) => {
    await onSubmit({ ...data, flavors });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
        <CardDescription>
          {product ? 'Update product information' : 'Create a new product for your store'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., mango-chili-pack"
                        {...field}
                        disabled={!!product}
                        data-testid="input-product-id"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Mango-Chili 6-Pack"
                        {...field}
                        data-testid="input-product-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the product..."
                      {...field}
                      data-testid="input-product-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="18.99"
                        {...field}
                        data-testid="input-product-price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/src/assets/product.jpg"
                        {...field}
                        data-testid="input-product-image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gradient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CSS Gradient Class</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="bg-gradient-mango-chili"
                      {...field}
                      data-testid="input-product-gradient"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Flavors Section */}
            <div>
              <Label htmlFor="flavors">Flavors</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="flavors"
                  value={flavorInput}
                  onChange={(e) => setFlavorInput(e.target.value)}
                  placeholder="Add a flavor..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavor())}
                  data-testid="input-flavor"
                />
                <Button
                  type="button"
                  onClick={addFlavor}
                  variant="outline"
                  size="icon"
                  data-testid="button-add-flavor"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {flavors.map((flavor, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {flavor}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0"
                      onClick={() => removeFlavor(index)}
                      data-testid={`button-remove-flavor-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {flavors.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">No flavors added yet</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">In Stock</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Product is available for purchase
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="switch-in-stock"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
                data-testid="button-save-product"
              >
                {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};