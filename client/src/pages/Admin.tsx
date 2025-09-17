import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Package, 
  AlertCircle,
  Calendar,
  Download,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { AdminLogin } from './AdminLogin';
import { useLocation } from 'wouter';
import { ProductManagement } from '@/components/ProductManagement';

// Mock data for demonstration - in production, this would come from your database
const mockOrders = [
  {
    id: 'ord_123',
    customerEmail: 'john@example.com',
    amount: 46.97,
    status: 'completed',
    items: [{ name: 'Mango-Chili 6-Pack', quantity: 2, price: 18.99 }],
    date: '2025-02-02T18:30:00Z',
    paymentId: 'pi_3RrkO806xob3GzTw1jk1Q3FT'
  },
  {
    id: 'ord_124',
    customerEmail: 'sarah@example.com',
    amount: 64.99,
    status: 'completed',
    items: [{ name: 'Variety Pack (24 cans)', quantity: 1, price: 64.99 }],
    date: '2025-02-02T17:15:00Z',
    paymentId: 'pi_3RrkMU06xob3GzTw17zGCdlC'
  },
  {
    id: 'ord_125',
    customerEmail: 'mike@example.com',
    amount: 18.99,
    status: 'pending',
    items: [{ name: 'Cucumber-Lime 6-Pack', quantity: 1, price: 18.99 }],
    date: '2025-02-02T16:45:00Z',
    paymentId: 'pi_3RrkLG06xob3GzTw1MzYBpqX'
  }
];

const mockStats = {
  totalRevenue: 130.95,
  totalOrders: 3,
  averageOrderValue: 43.65,
  conversionRate: 12.5,
  topProducts: [
    { name: 'Variety Pack (24 cans)', sales: 1, revenue: 64.99 },
    { name: 'Mango-Chili 6-Pack', sales: 2, revenue: 37.98 },
    { name: 'Cucumber-Lime 6-Pack', sales: 1, revenue: 18.99 }
  ]
};

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      // Try new key first, migrate from old key if needed
      let token = localStorage.getItem('mira-admin-token');
      
      if (!token) {
        const oldToken = localStorage.getItem('nava-admin-token');
        if (oldToken) {
          // Migrate token to new key
          localStorage.setItem('mira-admin-token', oldToken);
          localStorage.removeItem('nava-admin-token');
          token = oldToken;
          console.log('Migrated admin token from nava-admin-token to mira-admin-token');
        }
      }
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('mira-admin-token');
        }
      } catch (error) {
        localStorage.removeItem('mira-admin-token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('mira-admin-token');
    setIsAuthenticated(false);
    setLocation('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mira Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your sparkling beverage business</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockStats.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockStats.averageOrderValue)}</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{order.customerEmail}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(order.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(order.amount)}</p>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best performing flavors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStats.topProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                          </div>
                        </div>
                        <p className="font-medium">{formatCurrency(product.revenue)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Orders</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Order ID</th>
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Items</th>
                        <th className="p-4 font-medium">Amount</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">{order.customerEmail}</td>
                          <td className="p-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-sm">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </td>
                          <td className="p-4 font-medium">{formatCurrency(order.amount)}</td>
                          <td className="p-4">
                            <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(order.date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <ProductManagement />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Stripe Integration</CardTitle>
                <CardDescription>Your payment processing is active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Connected to Stripe</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Configuration</CardTitle>
                <CardDescription>Basic store settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Free Shipping Threshold</label>
                    <p className="text-2xl font-bold">$50.00</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Shipping Cost</label>
                    <p className="text-2xl font-bold">$8.99</p>
                  </div>
                </div>
                <Button variant="outline">Update Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;