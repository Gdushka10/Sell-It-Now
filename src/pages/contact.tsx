import { motion } from "framer-motion"
import { Link } from "react-router"
import { Camera, ChevronLeft, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
} as const

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Message sent! We'll get back to you soon.")
    const form = e.target as HTMLFormElement
    form.reset()
  }

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
        <motion.div {...fadeIn} className="max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Have questions or need help? We're here to assist you on your selling journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Card className="border-none shadow-xl rounded-[32px] bg-white p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Name</label>
                      <Input 
                        placeholder="John Doe" 
                        required 
                        className="rounded-xl h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Email</label>
                      <Input 
                        type="email" 
                        placeholder="name@example.com" 
                        required 
                        className="rounded-xl h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Message</label>
                    <Textarea 
                      placeholder="How can we help you?" 
                      required 
                      className="min-h-[160px] rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-colors resize-none leading-relaxed"
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-primary/20 text-lg">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Info Card */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-none shadow-xl rounded-[32px] bg-primary text-white p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Mail className="w-32 h-32 rotate-12" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold">Email Us</p>
                        <p className="text-primary-foreground/90 font-medium">support@sellitnow.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold">Response Time</p>
                        <p className="text-primary-foreground/90 font-medium">We typically respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] bg-white p-8">
                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground font-medium">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9am - 6pm EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10am - 4pm EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 tracking-tight">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How does the AI pricing work?",
                  a: "Our AI analyzes current market data from various marketplaces to suggest a competitive price range based on your item's condition and category."
                },
                {
                  q: "What marketplaces do you support?",
                  a: "Currently we support Facebook Marketplace, OfferUp, Mercari, and Craigslist, with more platforms being added regularly."
                },
                {
                  q: "How do I cancel my Pro subscription?",
                  a: "You can manage or cancel your subscription at any time through your account settings or directly via Whop."
                },
                {
                  q: "Is my data secure?",
                  a: "Yes, we use industry-standard encryption and secure cloud storage through Convex to ensure your personal data and photos are protected."
                }
              ].map((faq, i) => (
                <Card key={i} className="border border-gray-100 shadow-sm rounded-[24px] p-6 bg-white hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
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
