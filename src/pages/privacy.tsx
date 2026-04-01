import { motion } from "framer-motion"
import { Link } from "react-router"
import { Camera, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
} as const

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] selection:bg-primary/10 flex flex-col">
      {/* Simple Header */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Camera className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Sell It Now</span>
          </Link>
          <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
            <Link to="/app">Start Selling</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-12 md:py-20">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="pt-10 px-8 md:px-12">
              <CardTitle className="text-3xl md:text-4xl font-bold">Privacy Policy</CardTitle>
              <p className="text-muted-foreground mt-2 font-medium">Last updated: April 1, 2026</p>
            </CardHeader>
            <CardContent className="pb-12 px-8 md:px-12 prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information that you provide directly to us when you create an account, upload photos, or use our services. This includes:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                    <li><strong>Account Information:</strong> Name, email address, and profile details.</li>
                    <li><strong>Listing Data:</strong> Photos of items you wish to sell, item descriptions, and pricing information.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our platform, including device information and log data.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                    <li>Provide, maintain, and improve the Sell It Now platform.</li>
                    <li>Analyze photos using AI to generate listing suggestions and price estimates.</li>
                    <li>Process payments through our third-party provider, Whop.</li>
                    <li>Communicate with you about your account and our services.</li>
                    <li>Personalize your experience and provide relevant content.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We utilize several third-party services to provide our platform:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                    <li><strong>OpenAI:</strong> Used for image analysis and listing generation. Your photos may be processed by OpenAI to provide these features.</li>
                    <li><strong>Whop:</strong> Our payment processor for Pro subscriptions. Whop handles your payment information securely.</li>
                    <li><strong>Convex:</strong> Our backend and database provider, where your data is stored securely.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Data Storage and Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your data is stored securely using industry-standard encryption and security measures via Convex. We take reasonable steps to protect your information from unauthorized access or disclosure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                    <li>Access and export your personal data.</li>
                    <li>Request the deletion of your account and associated data.</li>
                    <li>Opt out of marketing communications at any time.</li>
                    <li>Update your account information through your profile settings.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="mt-4 font-bold text-primary">support@sellitnow.com</p>
                </section>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

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
