import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PolicyCard } from '../components/PolicyCard';
import { ArrowRight, CheckCircle, Shield, Clock, Award } from 'lucide-react';
import Navbar from '../components/NavbarNew';
import Footer from '../components/FooterNew';
import { useEffect, useState } from "react";
import policyApi from "../api/policyApi";

// Dummy policies data (replace with real data or import)
const policies = [
  {
    id: 1,
    name: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Life Insurance',
    description: 'Secure your loved ones\' future with our life insurance plans.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Vehicle Insurance',
    description: 'Protect your vehicle against accidents and theft.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Travel Insurance',
    description: 'Travel with peace of mind with our travel insurance.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
];

export default function Home() {
const [policies, setPolicies] = useState([]);
// Fetch policies from backend
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await policyApi.getAllPolicies();
        setPolicies(data);
      } catch (err) {
        console.error("Error fetching policies:", err);
        setError("Failed to load policies");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A73E8] to-[#34A853] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl mb-6 font-bold">
                Secure Your Future with Smart Insurance
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Comprehensive coverage plans tailored to protect what matters most. Get started in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="primary" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-black">
                  <Link to="/policies">
                    Explore Policies
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                  
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-black">
                  <Link to="/support">Get Quote</Link>
                </Button>
              
  
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1659352786973-82ae3af461a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBmYW1pbHklMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc3MDczNDAwNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Family Protection"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1A73E8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#1A73E8]" />
              </div>
              <h3 className="text-xl mb-2 font-semibold">Trusted Protection</h3>
              <p className="text-gray-600">
                Industry-leading coverage backed by top insurance providers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#34A853]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#34A853]" />
              </div>
              <h3 className="text-xl mb-2 font-semibold">Quick Claims</h3>
              <p className="text-gray-600">
                Fast and hassle-free claim settlement process
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1A73E8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#1A73E8]" />
              </div>
              <h3 className="text-xl mb-2 font-semibold">Best Rates</h3>
              <p className="text-gray-600">
                Competitive premiums with maximum coverage benefits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Policies Section */}
      <section id="policies" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 font-bold">Choose Your Insurance Plan</h2>
            <p className="text-xl text-gray-600">
              Comprehensive protection plans for every need
            </p>
          </div>
          <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6">
            {/* Policies Grid */}
          
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
              {policies.length > 0 ? (
                policies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No policies available
                </div>
              )}
            {/* </div> */}
          
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 font-bold">Why Choose SecureLife?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#34A853] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Comprehensive Coverage</h4>
                    <p className="text-gray-600">
                      All-inclusive plans covering medical, life, accident, and vehicle insurance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#34A853] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Support</h4>
                    <p className="text-gray-600">
                      Round-the-clock customer support for all your queries and claims
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#34A853] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Easy Claims Process</h4>
                    <p className="text-gray-600">
                      Simplified claim submission and quick settlement within 7 days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#34A853] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">No Hidden Charges</h4>
                    <p className="text-gray-600">
                      Transparent pricing with no hidden fees or surprise costs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1766818438279-ed7dc1b9611b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlJTIwaW5zdXJhbmNlJTIwZmFtaWx5JTIwaGFwcHl8ZW58MXx8fHwxNzcwNjQ5Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy Family"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#1A73E8] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-4 font-bold">Ready to Get Protected?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust SecureLife for their insurance needs
          </p>
          {/* <Button asChild size="lg" className="bg-white text-[#1A73E8] hover:bg-gray-100">
            <Link to="/login">Get Started Today</Link>
          </Button> */}
          <Button
  asChild
  size="lg"
  className="border-2 border-white text-white font-semibold
               hover:bg-white hover:text-[#1A73E8]
               hover:scale-105 transition-all duration-300"
>
  <Link to="/login">Get Started Today</Link>
</Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

