import { motion } from "framer-motion"
import { useQuery, useConvexAuth } from "convex/react"
import { useAuthActions } from "@convex-dev/auth/react"
import { api } from "@convex/api"
import { 
  ArrowLeft, 
  User, 
  LogOut, 
  History as HistoryIcon,
  Plus,
  Smartphone,
  Package,
  ShoppingBag,
  Sparkles,
  LayoutGrid,
  DollarSign,
  TrendingUp,
  Facebook,
  Globe,
  Store
} from "lucide-react"
import { Link, Navigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

const MARKETPLACE_ICONS: Record<string, any> = {
  fb: Facebook,
  craigslist: Globe,
  offerup: Smartphone,
  mercari: ShoppingBag,
  poshmark: Store,
}

const MARKETPLACE_NAMES: Record<string, string> = {
  fb: "Facebook",
  craigslist: "Craigslist",
  offerup: "OfferUp",
  mercari: "Mercari",
  poshmark: "Poshmark",
}

const CATEGORY_STYLES: Record<string, { gradient: string; icon: any }> = {
  Electronics: { 
    gradient: "from-blue-400 to-blue-600", 
    icon: Smartphone 
  },
  Furniture: { 
    gradient: "from-amber-400 to-amber-600", 
    icon: Package 
  },
  Clothing: { 
    gradient: "from-pink-400 to-pink-600", 
    icon: ShoppingBag 
  },
  Collectibles: { 
    gradient: "from-purple-400 to-purple-600", 
    icon: Sparkles 
  },
  Other: { 
    gradient: "from-gray-400 to-gray-600", 
    icon: Package 
  },
}

const getRelativeTime = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export function HistoryPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()
  const { signOut } = useAuthActions()
  const listings = useQuery(api.listings.getMyListings)

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Spinner className="size-8 text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  const totalValue = listings?.reduce((sum, l) => sum + l.priceSuggested, 0) || 0;
  
  const categoryCounts = listings?.reduce((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonCategory = categoryCounts 
    ? Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] 
    : "N/A";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Analysis History</h1>
            <Button variant="ghost" size="sm" asChild className="rounded-full font-medium text-muted-foreground hover:text-primary">
              <Link to="/app">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to App
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-gray-100 bg-white">
                  <User className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 border-none shadow-xl">
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="rounded-xl focus:bg-red-50 focus:text-red-600 text-muted-foreground font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Analyses</p>
                  <p className="text-2xl font-bold">{listings?.length || 0}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Category</p>
                  <p className="text-2xl font-bold truncate">{mostCommonCategory}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Listings Grid */}
        {!listings ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-3xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-dashed border-gray-200"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HistoryIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No analyses yet</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Upload your first item to get started and see it here in your history.
            </p>
            <Button asChild className="rounded-2xl h-12 px-8 font-bold shadow-lg shadow-primary/20">
              <Link to="/app">
                <Plus className="w-4 h-4 mr-2" />
                Start Selling
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, index) => {
              const style = CATEGORY_STYLES[listing.category] || CATEGORY_STYLES.Other;
              const CategoryIcon = style.icon;

              return (
                <motion.div
                  key={listing._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[32px] overflow-hidden bg-white h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {/* Gradient Placeholder */}
                      <div className={cn("w-full h-full bg-gradient-to-br flex items-center justify-center", style.gradient)}>
                        <CategoryIcon className="w-16 h-16 text-white/40" />
                      </div>
                      
                      <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black hover:bg-white/90 border-none font-bold px-3 py-1 rounded-full shadow-sm">
                        {listing.category}
                      </Badge>

                      <div className="absolute bottom-4 left-4 flex gap-1.5">
                        {listing.postedTo?.map((mp) => {
                          const Icon = MARKETPLACE_ICONS[mp];
                          if (!Icon) return null;
                          return (
                            <div key={mp} className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                              <Icon className="w-4 h-4" />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {getRelativeTime(listing.createdAt)}
                          </span>
                          {listing.postedTo && listing.postedTo.length > 0 ? (
                            <Badge variant="secondary" className="rounded-full bg-green-50 text-green-700 border-green-100 font-semibold text-[8px] h-4 px-1.5 w-fit">
                              Posted to {listing.postedTo.map(id => MARKETPLACE_NAMES[id] || id).join(", ")}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="rounded-full bg-gray-50 text-gray-400 border-gray-100 font-semibold text-[8px] h-4 px-1.5 w-fit">
                              Not Posted
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className="rounded-full bg-gray-50 text-gray-600 border-gray-100 font-semibold text-[10px]">
                          {listing.condition}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-xl mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {listing.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-wider">Suggested Price</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-primary">{formatCurrency(listing.priceSuggested)}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground font-medium">
                            Range: {formatCurrency(listing.priceLow)} - {formatCurrency(listing.priceHigh)}
                          </p>
                        </div>
                        
                        <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                          <Link to="/app">
                            <Plus className="w-5 h-5 text-primary" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  )
}
