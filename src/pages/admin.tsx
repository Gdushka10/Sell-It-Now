import { useState } from "react"
import { motion } from "framer-motion"
import { useConvexAuth, useQuery } from "convex/react"
import { useAuthActions } from "@convex-dev/auth/react"
import { api } from "@convex/api"
import { 
  Shield, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  ArrowLeft, 
  LogOut, 
  User,
  Search,
  ExternalLink,
  History
} from "lucide-react"
import { Link, Navigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export function AdminPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()
  const { signOut } = useAuthActions()
  const isAdmin = useQuery(api.admin.isAdmin)
  const stats = useQuery(api.admin.getStats)
  const users = useQuery(api.admin.getAllUsers)
  
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isListingsOpen, setIsListingsOpen] = useState(false)
  
  const selectedUser = users?.find(u => u._id === selectedUserId)
  const userListings = useQuery(api.admin.getUserListings, 
    selectedUserId ? { userId: selectedUserId as any } : "skip"
  )

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

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
          <p className="text-muted-foreground mb-8">
            You don't have permission to view this page. This area is reserved for administrators only.
          </p>
          <Button asChild className="rounded-2xl h-12 px-8 font-bold shadow-lg shadow-primary/20">
            <Link to="/app">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isAdmin === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Spinner className="size-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
            <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden sm:block" />
            <Button variant="ghost" size="sm" asChild className="rounded-full font-medium text-muted-foreground hover:text-primary hidden sm:flex">
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
                <DropdownMenuItem asChild className="rounded-xl font-medium cursor-pointer">
                  <Link to="/app/history">
                    <History className="w-4 h-4 mr-2" />
                    My Listings
                  </Link>
                </DropdownMenuItem>
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

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { 
              label: "Total Users", 
              value: stats?.totalUsers ?? 0, 
              icon: Users, 
              color: "bg-blue-50 text-blue-600",
              delay: 0.1 
            },
            { 
              label: "Total Listings", 
              value: stats?.totalListings ?? 0, 
              icon: Package, 
              color: "bg-orange-50 text-orange-600",
              delay: 0.2
            },
            { 
              label: "Total Value", 
              value: formatCurrency(stats?.totalValue ?? 0), 
              icon: DollarSign, 
              color: "bg-green-50 text-green-600",
              delay: 0.3
            },
            { 
              label: "New This Week", 
              value: stats?.recentSignups ?? 0, 
              icon: TrendingUp, 
              color: "bg-purple-50 text-purple-600",
              delay: 0.4
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
            >
              <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Users Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-2xl font-bold">Platform Users</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Manage and view all registered users</p>
              </div>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all w-64"
                />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-gray-50">
                      <TableHead className="pl-8 font-semibold text-muted-foreground">User</TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Joined</TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Listings</TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Total Value</TableHead>
                      <TableHead className="pr-8 text-right font-semibold text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!users ? (
                      [...Array(5)].map((_, i) => (
                        <TableRow key={i} className="border-gray-50">
                          <TableCell className="pl-8 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
                              <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                                <div className="h-3 w-32 bg-gray-50 animate-pulse rounded" />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell><div className="h-4 w-16 bg-gray-50 animate-pulse rounded" /></TableCell>
                          <TableCell><div className="h-4 w-8 bg-gray-50 animate-pulse rounded" /></TableCell>
                          <TableCell><div className="h-4 w-16 bg-gray-50 animate-pulse rounded" /></TableCell>
                          <TableCell className="pr-8 text-right"><div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg ml-auto" /></TableCell>
                        </TableRow>
                      ))
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-20 text-center text-muted-foreground">
                          No users have signed up yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user, i) => (
                        <motion.tr 
                          key={user._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + i * 0.05 }}
                          className="group border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <TableCell className="pl-8 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {user.name?.[0] || user.email?.[0] || "A"}
                              </div>
                              <div>
                                <p className="font-bold">{user.name || "Anonymous"}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm font-medium">
                            {timeAgo(user._creationTime)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700 border-none font-bold">
                              {user.listingCount || 0}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold text-primary">
                            {formatCurrency(user.totalValue || 0)}
                          </TableCell>
                          <TableCell className="pr-8 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-xl font-bold hover:bg-primary/10 hover:text-primary"
                              onClick={() => {
                                setSelectedUserId(user._id)
                                setIsListingsOpen(true)
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Listings
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile List */}
              <div className="md:hidden divide-y divide-gray-50">
                {!users ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                          <div className="h-3 w-32 bg-gray-50 animate-pulse rounded" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : users.length === 0 ? (
                  <div className="py-20 text-center text-muted-foreground px-6">
                    No users have signed up yet
                  </div>
                ) : (
                  users.map((user) => (
                    <div key={user._id} className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user.name?.[0] || user.email?.[0] || "A"}
                          </div>
                          <div>
                            <p className="font-bold">{user.name || "Anonymous"}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700 border-none font-bold">
                          {user.listingCount || 0}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Joined {timeAgo(user._creationTime)}</span>
                        <span className="font-bold text-primary">{formatCurrency(user.totalValue || 0)}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full rounded-xl font-bold"
                        onClick={() => {
                          setSelectedUserId(user._id)
                          setIsListingsOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Listings
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* User Listings Dialog */}
      <Dialog open={isListingsOpen} onOpenChange={setIsListingsOpen}>
        <DialogContent className="sm:max-w-2xl rounded-[32px] p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-8 pb-4 bg-white sticky top-0 z-10 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {selectedUser?.name?.[0] || selectedUser?.email?.[0] || "U"}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {selectedUser?.name || "User"}'s Listings
                </DialogTitle>
                <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="p-8 pt-4 bg-white">
            <ScrollArea className="h-[50vh] pr-4">
              {!userListings ? (
                <div className="flex items-center justify-center py-20">
                  <Spinner className="size-8 text-primary" />
                </div>
              ) : userListings.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                  <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">This user hasn't created any listings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userListings.map((listing) => (
                    <Card key={listing._id} className="border-gray-100 shadow-none rounded-2xl overflow-hidden hover:border-primary/20 transition-colors group">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-32 aspect-square bg-gray-100 flex-shrink-0 relative overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Package className="w-8 h-8" />
                          </div>
                          <Badge className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] text-black border-none font-bold px-1.5 py-0.5 rounded-md">
                            {listing.category}
                          </Badge>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                              {listing.title}
                            </h4>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap ml-2">
                              {timeAgo(listing.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-[10px] font-bold rounded-md bg-gray-50 border-gray-100">
                              {listing.condition}
                            </Badge>
                            <div className="flex gap-1">
                              {listing.postedTo?.map((mp: string) => (
                                <div key={mp} className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400">
                                  {mp[0].toUpperCase()}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Suggested</p>
                              <p className="text-xl font-black text-primary">{formatCurrency(listing.priceSuggested)}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
            <div className="mt-8">
              <Button className="w-full h-12 rounded-2xl font-bold" onClick={() => setIsListingsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
