import { motion } from "framer-motion"
import { Link } from "react-router"
import { 
  Camera, 
  Sparkles, 
  Check, 
  Smartphone,
  ShoppingBag,
  Zap,
  BarChart3,
  Globe,
  Layers,
  Search,
  ShieldCheck,
  ChevronRight,
  Facebook,
  Tag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
} as const

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
} as const

export function HomePage() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] selection:bg-primary/10">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Camera className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Sell It Now</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <button onClick={scrollToHowItWorks} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">How It Works</button>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/app">Sign In</Link>
            </Button>
            <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
              <Link to="/app">Start Selling</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="rounded-full bg-primary/5 text-primary border-primary/10 px-4 py-1.5 text-sm font-semibold">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                New: AI Multi-Platform Posting
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Snap a Photo. Get the <span className="text-primary">Perfect Price.</span> Sell Instantly.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              AI-powered marketplace helper that writes listings, suggests prices, and posts to multiple platforms — all in seconds.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Button size="lg" asChild className="h-14 rounded-full px-8 text-lg font-bold shadow-xl shadow-primary/20">
                <Link to="/app">Start Selling Free</Link>
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToHowItWorks} className="h-14 rounded-full px-8 text-lg font-bold">
                See How It Works
              </Button>
            </motion.div>

            {/* App Preview Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 w-full max-w-5xl"
            >
              <div className="relative rounded-[32px] border border-gray-200 bg-white p-4 shadow-2xl md:p-8">
                <div className="flex flex-col gap-8 md:flex-row">
                  {/* Mockup Left: Image */}
                  <div className="w-full md:w-2/5">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
                      <img 
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
                        alt="Product mockup" 
                        className="h-full w-full object-cover opacity-90 transition-transform hover:scale-105 duration-700"
                      />
                    </div>
                  </div>
                  {/* Mockup Right: Analysis */}
                  <div className="flex flex-1 flex-col justify-center text-left">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">AI Analysis Complete</Badge>
                      <div className="flex -space-x-2">
                        {[Facebook, Smartphone, ShoppingBag].map((Icon, i) => (
                          <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-50 text-gray-400">
                            <Icon className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">Sony WH-1000XM4 Wireless</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">$185.00</span>
                      <span className="text-sm font-medium text-muted-foreground">Suggested Price</span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-3/4 rounded-full bg-primary" />
                      </div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <span>Low: $140</span>
                        <span>Market Average: $180</span>
                        <span>High: $220</span>
                      </div>
                    </div>
                    <div className="mt-8 rounded-xl bg-gray-50 p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        "Excellent condition Sony headphones. Noise canceling is top-tier. Includes original accessories..."
                      </p>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -right-6 -top-6 hidden h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg md:flex">
                  <Zap className="h-10 w-10 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute left-1/2 top-0 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f610,transparent)]" />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Three simple steps to turn your items into cash.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Camera,
                title: "Snap a Photo",
                description: "Take a photo of anything you want to sell with your phone or camera.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: Sparkles,
                title: "AI Does the Work",
                description: "Get instant pricing, title, and a compelling description generated automatically.",
                color: "bg-purple-50 text-purple-600"
              },
              {
                icon: Globe,
                title: "Post Everywhere",
                description: "List on Facebook Marketplace, OfferUp, Mercari and more in one click.",
                color: "bg-green-50 text-green-600"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-[24px] shadow-sm transition-transform group-hover:scale-110 duration-300 ${step.color}`}>
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-24 bg-[#FAFAFA] border-y border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.p 
            {...fadeIn}
            className="mb-12 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Join thousands of smart sellers
          </motion.p>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {[
              { label: "10x Faster", sub: "Than writing listings manually" },
              { label: "$150+", sub: "Average item value analyzed" },
              { label: "5 Platforms", sub: "Post to multiple marketplaces at once" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-5xl font-extrabold tracking-tight text-primary">{stat.label}</span>
                <span className="mt-2 text-lg font-medium text-muted-foreground">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Packed with Smart Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to sell faster and for more money.</p>
          </div>
          
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: BarChart3,
                title: "AI Price Analysis",
                description: "Our AI scans market data to suggest the perfect price range for your specific item."
              },
              {
                icon: Layers,
                title: "Smart Descriptions",
                description: "Compelling, buyer-friendly copy written automatically using advanced language models."
              },
              {
                icon: Smartphone,
                title: "Multi-Platform Posting",
                description: "Post to Facebook, OfferUp, Mercari, and more simultaneously without re-typing."
              },
              {
                icon: ShieldCheck,
                title: "Condition Detection",
                description: "AI assesses item condition from your photos to ensure accurate and honest listings."
              },
              {
                icon: Tag,
                title: "Category Tagging",
                description: "Automatic categorization and tagging for maximum visibility in marketplace searches."
              },
              {
                icon: Search,
                title: "Listing History",
                description: "Track all your listings and sales in one central place to optimize your selling strategy."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="group h-full"
              >
                <Card className="h-full relative rounded-[32px] border border-gray-100 bg-gray-50/30 p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">Choose the plan that fits your selling needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              {...fadeIn}
              className="group"
            >
              <Card className="relative flex flex-col h-full rounded-[40px] border border-gray-200 bg-white p-10 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Free Plan</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold tracking-tight">$0</span>
                    <span className="text-muted-foreground font-medium">/month</span>
                  </div>
                </div>
                <ul className="mb-10 space-y-4 flex-1">
                  {[
                    "3 AI-powered listings",
                    "Basic price suggestions",
                    "Single platform posting",
                    "Standard image analysis"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" variant="outline" asChild className="h-14 rounded-2xl font-bold">
                  <Link to="/app">Get Started Free</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <Card className="relative flex flex-col h-full rounded-[40px] border-2 border-primary bg-white p-10 shadow-2xl shadow-primary/10 transition-all hover:shadow-primary/20">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-xs">
                    Most Popular
                  </Badge>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Pro Plan</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold tracking-tight">$9.99</span>
                    <span className="text-muted-foreground font-medium">/month</span>
                  </div>
                </div>
                <ul className="mb-10 space-y-4 flex-1">
                  {[
                    "Unlimited AI listings",
                    "Advanced pricing insights",
                    "Multi-platform posting",
                    "Priority support",
                    "Listing history & analytics"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" asChild className="h-14 rounded-2xl font-bold shadow-lg shadow-primary/20">
                  <Link to="/app">Start Pro Trial</Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="relative overflow-hidden rounded-[48px] bg-primary px-10 py-20 text-center text-white shadow-2xl shadow-primary/30"
          >
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Ready to turn your clutter into cash?</h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-primary-foreground/90 font-medium leading-relaxed">
                Join Sell It Now and start selling smarter today. No credit card required to start.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="h-16 bg-white text-primary hover:bg-gray-50 rounded-full px-10 text-xl font-bold shadow-xl">
                  <Link to="/app">Start Selling Free</Link>
                </Button>
                <Button size="lg" variant="ghost" asChild className="h-16 text-white hover:bg-white/10 rounded-full px-8 text-lg font-bold">
                  <Link to="/app" className="flex items-center gap-2">
                    Learn More <ChevronRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            {/* Background Decorative Circles */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
            <div className="absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-white/5" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Camera className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">Sell It Now</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Sell It Now. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
