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

export function TermsPage() {
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
              <CardTitle className="text-3xl md:text-4xl font-bold">Terms of Service</CardTitle>
              <p className="text-muted-foreground mt-2 font-medium">Last updated: April 1, 2026</p>
            </CardHeader>
            <CardContent className="pb-12 px-8 md:px-12 prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using the Sell It Now platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Sell It Now is an AI-powered marketplace listing tool designed to help users create optimized product listings, suggest competitive prices, and post to multiple platforms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You must be at least 18 years old to use this service. You are responsible for maintaining the security of your account and for all activities that occur under your account credentials.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Free & Pro Plans</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We offer a free tier limited to 3 AI-powered listings. Our Pro Plan is available for $9.99/month, providing unlimited listings and advanced features. Subscriptions are processed via Whop and can be canceled at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree not to use the service to list illegal items, counterfeit goods, or any content that violates marketplace policies or local laws. We reserve the right to remove any content that violates these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">6. AI-Generated Content</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All suggestions provided by our AI, including titles, descriptions, and prices, are for informational purposes. You are responsible for reviewing and verifying all information before posting it to any marketplace.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Users retain ownership of their photos and content. By using the service, you grant Sell It Now a license to process your content for the purpose of providing the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The service is provided "as is" without warranties of any kind. Sell It Now is not liable for any damages resulting from your use of the platform or transactions made on third-party marketplaces.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity on the platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For any questions regarding these terms, please contact support@sellitnow.com.
                  </p>
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
