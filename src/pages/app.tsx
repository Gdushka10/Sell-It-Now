import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMutation, useAction, useQuery, useConvexAuth } from "convex/react"
import { useAuthActions } from "@convex-dev/auth/react"
import { api } from "@convex/api"
import { 
  Camera, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Copy, 
  RefreshCcw, 
  ArrowRight,
  Package,
  Tag,
  Info,
  Facebook,
  Globe,
  ShoppingBag,
  Store,
  Smartphone,
  LogOut,
  User,
  Zap,
  Loader2,
  History,
  Shield
} from "lucide-react"
import { toast } from "sonner"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Dialog, 
  DialogContent
} from "@/components/ui/dialog"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

type Step = 1 | 2 | 3 | 4 | 5

interface ItemDetails {
  title: string
  priceRange: { low: number; high: number; suggested: number }
  description: string
  condition: string
  category: string
}

const MOCK_DATA: ItemDetails = {
  title: "Sony WH-1000XM4 Wireless Headphones - Black",
  priceRange: { low: 120, high: 180, suggested: 150 },
  description: "Premium wireless noise-canceling headphones in excellent condition. Includes original case, charging cable, and audio cable. Battery holds full charge (30+ hours). Minor wear on ear cushions. Perfect for commuting, work from home, or travel. Originally $350 - grab this deal!",
  condition: "Good",
  category: "Electronics"
}

const MARKETPLACES = [
  { id: "fb", name: "Facebook Marketplace", icon: Facebook, connected: true },
  { id: "craigslist", name: "Craigslist", icon: Globe, connected: false },
  { id: "offerup", name: "OfferUp", icon: Smartphone, connected: true },
  { id: "mercari", name: "Mercari", icon: ShoppingBag, connected: true },
  { id: "poshmark", name: "Poshmark", icon: Store, connected: false },
]

function AuthPage() {
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn } = useAuthActions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Safety timeout - reset loading state after 10 seconds
    // signIn may not resolve its promise in all cases
    const timeout = setTimeout(() => {
      setIsSubmitting(false)
    }, 10000)
    
    try {
      await signIn("password", {
        email,
        password,
        flow,
        ...(flow === "signUp" ? { name } : {}),
      })
      // If we get here, auth succeeded - the component will unmount
      // as isAuthenticated becomes true
    } catch (error) {
      clearTimeout(timeout)
      setIsSubmitting(false)
      const message = String(error)
      if (message.includes("InvalidAccountId") || message.includes("InvalidSecret")) {
        toast.error("Invalid email or password")
      } else if (message.includes("TooManyFailedAttempts")) {
        toast.error("Too many attempts, try again later")
      } else if (message.includes("Could not verify")) {
        toast.error("Invalid email or password")
      } else {
        toast.error("Authentication failed. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Sell It Now</h1>
          <p className="text-muted-foreground mt-2 font-medium">Turn your clutter into cash with AI</p>
        </div>

        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center">
              {flow === "signIn" ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-center">
              {flow === "signIn" 
                ? "Enter your credentials to access your account" 
                : "Join thousands of sellers turning items into cash"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {flow === "signUp" && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Name</label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-colors"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="rounded-xl h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-colors"
                />
                {flow === "signUp" && (
                  <p className="text-xs text-muted-foreground ml-1">Must be at least 8 characters</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20" 
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (flow === "signIn" ? "Sign In" : "Sign Up")}
              </Button>
              <button
                type="button"
                onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {flow === "signIn" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

function UpgradeModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const createCheckout = useAction(api.pay.createCheckout)
  const listProducts = useAction(api.pay.listProducts)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-[32px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary px-8 py-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-32 h-32 rotate-12" />
          </div>
          <div className="relative z-10">
            <Badge className="bg-white/20 hover:bg-white/20 text-white border-none mb-4 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
              Pro Plan
            </Badge>
            <h2 className="text-3xl font-bold mb-2">You've used all 3 free analyses!</h2>
            <p className="text-primary-foreground/90 font-medium">
              Upgrade to Pro for unlimited AI-powered listings and more features.
            </p>
          </div>
        </div>
        <div className="p-8 bg-white">
          <div className="mb-8 space-y-4">
            {[
              "Unlimited AI photo analysis",
              "Priority marketplace posting",
              "Listing history & analytics",
              "Advanced pricing insights"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-3xl font-bold">$9.99 USD</span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <Button 
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                try {
                  // Fetch products to get the real priceId
                  const products = await listProducts({})
                  const proProduct = products.data?.find(
                    (p: any) => p.product.slug === "sell-it-now-pro"
                  )
                  
                  if (!proProduct || !proProduct.prices?.[0]) {
                    toast.error("Pro plan is not available yet. Please try again later.")
                    return
                  }

                  const priceId = proProduct.prices[0].id
                  
                  const { data, error } = await createCheckout({
                    productSlug: "sell-it-now-pro",
                    priceId,
                    successUrl: window.location.origin + "/app",
                  })

                  if (error) {
                    toast.error(error.message || "Checkout failed")
                    return
                  }
                  
                  if (!data?.purchaseUrl) {
                    toast.error("Could not create checkout. Please try again.")
                    return
                  }

                  // Open in new tab (required for iframe context)
                  window.open(data.purchaseUrl, "_blank", "noopener,noreferrer")
                  toast.success("Checkout opened in a new tab!")
                  onOpenChange(false)
                } catch (error) {
                  toast.error("Something went wrong. Please try again.")
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLoading ? "Loading..." : "Upgrade to Pro"}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full h-12 rounded-xl text-muted-foreground font-medium"
              onClick={() => onOpenChange(false)}
            >
              Maybe later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AppPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()
  const { signOut } = useAuthActions()
  const [step, setStep] = useState<Step>(1)
  const [image, setImage] = useState<string | null>(null)
  const [itemDetails, setItemDetails] = useState<ItemDetails>(MOCK_DATA)
  const [analyzingMessage, setAnalyzingMessage] = useState("Checking market prices...")
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>(["fb", "offerup", "mercari"])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const checkAccess = useAction(api.pay.check)
  const [isPro, setIsPro] = useState(false)

  const generateUploadUrl = useMutation(api.listings.generateUploadUrl)
  const analyzeImage = useAction(api.analyze.analyzeImage)
  const saveAnalysis = useMutation(api.listings.saveAnalysis)
  const updateListingPosted = useMutation(api.listings.updateListingPosted)
  const recordUsage = useMutation(api.listings.recordUsage)
  const usageCount = useQuery(api.listings.getUsageCount)
  const isAdmin = useQuery(api.admin.isAdmin)

  const [currentListingId, setCurrentListingId] = useState<string | null>(null)

  const nextStep = () => setStep((s) => (s + 1) as Step)

  useEffect(() => {
    if (isAuthenticated) {
      checkAccess({ productSlug: "sell-it-now-pro" })
        .then(({ data }) => {
          if (data?.allowed) setIsPro(true)
        })
        .catch(() => {})
    }
  }, [isAuthenticated])


  const handleFileUpload = async (file: File) => {
    if (usageCount === undefined) {
      toast.error("Loading your account... please try again in a moment.")
      return
    }
    if (!isPro && usageCount >= 3) {
      setShowUpgradeModal(true)
      return
    }

    setIsAnalyzing(true)
    setStep(2)
    setImage(URL.createObjectURL(file))

    try {
      const uploadUrl = await generateUploadUrl()
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!response.ok) throw new Error("Upload failed")

      const { storageId } = await response.json()
      const data = await analyzeImage({ storageId })
      
      setItemDetails(data as ItemDetails)
      
      // Record this as a free usage (counts toward the 3 free limit)
      try {
        await recordUsage({ type: "ai_analysis" })
      } catch {
        // Don't block the flow if recording fails
      }

      // Save the analysis to the database
      try {
        const listingId = await saveAnalysis({
          storageId: storageId,
          title: (data as any).title,
          description: (data as any).description,
          priceLow: (data as any).priceRange.low,
          priceHigh: (data as any).priceRange.high,
          priceSuggested: (data as any).priceRange.suggested,
          condition: (data as any).condition,
          category: (data as any).category,
        })
        setCurrentListingId(listingId)
      } catch {}

      setStep(3)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Analysis failed")
      setStep(1)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG)")
      return false
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("Image must be under 10MB")
      return false
    }
    return true
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (isAnalyzing) return
    const file = e.dataTransfer.files?.[0]
    if (file && validateFile(file)) {
      handleFileUpload(file)
    }
  }

  // Step 2: Analyzing messages
  useEffect(() => {
    if (step === 2) {
      const messages = [
        "Checking market prices...",
        "Writing the perfect description...",
        "Finding similar listings...",
        "Almost ready..."
      ]
      let i = 0
      const interval = setInterval(() => {
        i++
        if (i < messages.length) {
          setAnalyzingMessage(messages[i])
        }
      }, 600)

      return () => {
        clearInterval(interval)
      }
    }
  }, [step])

  const handlePost = async () => {
    if (!currentListingId) {
      toast.error("Something went wrong. Please try again.")
      return
    }

    try {
      await updateListingPosted({
        listingId: currentListingId as any,
        title: itemDetails.title,
        description: itemDetails.description,
        priceLow: itemDetails.priceRange.low,
        priceHigh: itemDetails.priceRange.high,
        priceSuggested: itemDetails.priceRange.suggested,
        condition: itemDetails.condition,
        category: itemDetails.category,
        postedTo: selectedMarketplaces,
      })
      toast.success("Item listed successfully!")
      setStep(5)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to list item")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${itemDetails.title}\n\n${itemDetails.description}\n\nPrice: $${itemDetails.priceRange.suggested} USD`)
    toast.success("Copied to clipboard")
  }

  const reset = () => {
    if (image) URL.revokeObjectURL(image)
    setStep(1)
    setImage(null)
    setCurrentListingId(null)
    setItemDetails(MOCK_DATA)
  }

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Spinner className="size-8 text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans">
      <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Progress Indicator */}
        {step <= 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Sell It Now</h1>
                {isPro ? (
                  <Badge variant="secondary" className="rounded-full bg-green-50 text-green-700 border-green-100 px-3 py-1 flex items-center gap-1.5 font-semibold">
                    <Zap className="w-3 h-3 fill-current" />
                    Pro
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="rounded-full bg-primary/5 text-primary border-primary/10 px-3 py-1 flex items-center gap-1.5 font-semibold">
                    <Zap className="w-3 h-3 fill-current" />
                    {Math.max(0, 3 - (usageCount ?? 0))} free analyses left
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Step {step} of 4
                </div>
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
                        My Analyses
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild className="rounded-xl font-medium cursor-pointer">
                        <Link to="/app/admin">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
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
            <Progress value={(step / 4) * 100} className="h-1.5" />
          </div>
        )}

        {step === 5 && (
          <div className="mb-12 flex items-center justify-between">
            <div className="w-10" /> {/* Spacer */}
            <h1 className="text-2xl font-bold tracking-tight">Sell It Now</h1>
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
                      My Analyses
                    </Link>

                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild className="rounded-xl font-medium cursor-pointer">
                    <Link to="/app/admin">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
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
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3">Turn your clutter into cash</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Upload a photo and let our AI handle the pricing, description, and listing for you.
                </p>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="relative group cursor-pointer"
              >
                <label className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-dashed border-gray-200 rounded-3xl bg-white hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-sm overflow-hidden">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-10 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <p className="mb-2 text-xl font-semibold tracking-tight">Drop your item photo here</p>
                    <p className="text-sm text-muted-foreground mb-8">or click to browse your files</p>
                    <Badge variant="secondary" className="px-4 py-1.5 rounded-full font-medium">
                      JPG, PNG supported
                    </Badge>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    disabled={isAnalyzing}
                  />
                </label>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Sparkles, title: "AI Pricing", text: "Get the best market price automatically." },
                  { icon: Package, title: "Smart Tags", text: "We categorize and tag your items for visibility." },
                  { icon: Check, title: "Multi-Post", text: "List on all major marketplaces in one click." }
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative mb-12">
                {image && (
                  <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl relative">
                    <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  </div>
                )}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Analyzing your item...</h2>
              <p className="text-muted-foreground animate-pulse">{analyzingMessage}</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">AI Analysis Ready</h2>
                  <p className="text-muted-foreground">Review and tweak the details before posting.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep(1)} className="rounded-full">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Photo & Price */}
                <div className="lg:col-span-5 space-y-6">
                  <Card className="overflow-hidden border-none shadow-md rounded-3xl">
                    <div className="aspect-square relative">
                      {image && <img src={image} alt="Item" className="w-full h-full object-cover" />}
                      <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black hover:bg-white/90 border-none font-semibold px-3 py-1">
                        {itemDetails.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Suggested Price</span>
                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100 font-bold">
                          High Demand
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold">${itemDetails.priceRange.suggested} <span className="text-lg font-medium text-muted-foreground">USD</span></span>
                        <span className="text-sm text-muted-foreground">Sweet spot</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-2xl">
                        <div className="text-center flex-1 border-r">
                          <p className="text-[10px] uppercase text-muted-foreground font-bold">Low</p>
                          <p className="font-bold text-lg">${itemDetails.priceRange.low} <span className="text-xs text-muted-foreground">USD</span></p>
                        </div>
                        <div className="text-center flex-1 border-r">
                          <p className="text-[10px] uppercase text-muted-foreground font-bold">Average</p>
                          <p className="font-bold text-lg">${itemDetails.priceRange.suggested} <span className="text-xs text-muted-foreground">USD</span></p>
                        </div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] uppercase text-muted-foreground font-bold">High</p>
                          <p className="font-bold text-lg">${itemDetails.priceRange.high} <span className="text-xs text-muted-foreground">USD</span></p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Side: Form */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        Title
                      </label>
                      <Input 
                        value={itemDetails.title} 
                        onChange={(e) => setItemDetails({...itemDetails, title: e.target.value})}
                        className="rounded-xl border-gray-200 focus:ring-primary h-12"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold flex items-center gap-2">
                          <Info className="w-4 h-4 text-primary" />
                          Condition
                        </label>
                        <Select 
                          defaultValue={itemDetails.condition}
                          onValueChange={(val) => setItemDetails({...itemDetails, condition: val})}
                        >
                          <SelectTrigger className="rounded-xl border-gray-200 h-12">
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">Brand New</SelectItem>
                            <SelectItem value="Like New">Like New</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Parts">For Parts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" />
                          Category
                        </label>
                        <Select 
                          defaultValue={itemDetails.category}
                          onValueChange={(val) => setItemDetails({...itemDetails, category: val})}
                        >
                          <SelectTrigger className="rounded-xl border-gray-200 h-12">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Furniture">Furniture</SelectItem>
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Collectibles">Collectibles</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Description</label>
                      <Textarea 
                        value={itemDetails.description}
                        onChange={(e) => setItemDetails({...itemDetails, description: e.target.value})}
                        className="min-h-[160px] rounded-2xl border-gray-200 resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" className="flex-1 rounded-2xl h-14 font-semibold" onClick={() => toast.info("Regenerating details...")}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button className="flex-1 rounded-2xl h-14 font-semibold shadow-lg shadow-primary/20" onClick={nextStep}>
                      Continue to Post
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl font-bold mb-3">Where should we post?</h2>
                <p className="text-muted-foreground">
                  Select the marketplaces you want to list on. We'll handle the cross-posting automatically.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MARKETPLACES.map((mp) => (
                  <div
                    key={mp.id}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl border bg-white transition-all duration-200",
                      selectedMarketplaces.includes(mp.id) ? "border-primary ring-1 ring-primary/20 shadow-sm" : "border-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        mp.connected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        <mp.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{mp.name}</p>
                        {mp.connected ? (
                          <span className="text-[10px] font-bold uppercase text-green-600 tracking-wider">Connected</span>
                        ) : (
                          <button className="text-[10px] font-bold uppercase text-primary hover:underline tracking-wider">Connect Account</button>
                        )}
                      </div>
                    </div>
                    <Checkbox
                      id={mp.id}
                      checked={selectedMarketplaces.includes(mp.id)}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedMarketplaces([...selectedMarketplaces, mp.id])
                        else setSelectedMarketplaces(selectedMarketplaces.filter(id => id !== mp.id))
                      }}
                      disabled={!mp.connected}
                      className="w-6 h-6 rounded-full border-gray-300"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-8 space-y-4">
                <Button 
                  className="w-full h-16 text-lg font-bold rounded-3xl shadow-xl shadow-primary/25"
                  onClick={handlePost}
                  disabled={selectedMarketplaces.length === 0}
                >
                  Post to {selectedMarketplaces.length} Marketplaces
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full h-12 rounded-2xl text-muted-foreground"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy details to clipboard
                </Button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8 relative">
                <Check className="w-12 h-12 text-green-600" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-0 rounded-full border-4 border-green-500/20"
                />
              </div>
              
              <h2 className="text-4xl font-bold mb-4">Listed Successfully!</h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
                Your Sony WH-1000XM4 is now live on {selectedMarketplaces.length} platforms. Expect messages soon!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="h-14 px-8 rounded-2xl font-bold" onClick={reset}>
                  Sell Another Item
                </Button>
                <Button variant="outline" className="h-14 px-8 rounded-2xl font-bold" asChild>
                  <Link to="/app/history">
                    View My Analyses
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Celebration Animation (CSS-only simplified) */}
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      top: "100%", 
                      left: `${Math.random() * 100}%`,
                      scale: Math.random() * 0.5 + 0.5,
                      rotate: 0 
                    }}
                    animate={{ 
                      top: "-10%",
                      rotate: 360,
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: Math.random() * 2 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    className="absolute w-3 h-3 bg-primary rounded-sm"
                    style={{ backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#10b981' : '#f59e0b' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
