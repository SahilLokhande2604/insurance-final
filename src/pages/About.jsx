import Navbar from "../components/NavbarNew";
import Footer from "../components/FooterNew";
import { Shield, Award, Clock, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A73E8] to-[#34A853] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About SecureLife Insurance
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Providing reliable, affordable, and innovative insurance solutions
            to protect what matters most in your life.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-[#1A73E8]">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              At SecureLife, our mission is to deliver comprehensive insurance
              solutions tailored to individual and family needs. We focus on
              transparency, affordability, and customer-first service to ensure
              complete peace of mind.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#34A853] mt-1" />
                <p className="text-gray-600">
                  Customer-first approach with personalized policies
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#34A853] mt-1" />
                <p className="text-gray-600">
                  Transparent pricing and no hidden charges
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#34A853] mt-1" />
                <p className="text-gray-600">
                  Fast and hassle-free claim settlement process
                </p>
              </div>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80"
              alt="About SecureLife"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose SecureLife?
          </h2>
          <p className="text-xl text-gray-600">
            We combine trust, technology, and transparency
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1A73E8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-[#1A73E8]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Trusted Protection
            </h3>
            <p className="text-gray-600">
              Industry-leading coverage plans trusted by thousands of customers.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#34A853]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-[#34A853]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Round-the-clock assistance for policy queries and claim support.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#1A73E8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-[#1A73E8]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Best Value Plans
            </h3>
            <p className="text-gray-600">
              Competitive premiums with maximum coverage benefits.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#1A73E8] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who trust SecureLife for comprehensive insurance coverage.
          </p>
          <Button asChild size="lg" className="bg-white text-[#1A73E8] hover:bg-gray-100">
            <Link to="/login">Get Started Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
