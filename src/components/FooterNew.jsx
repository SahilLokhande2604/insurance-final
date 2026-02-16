import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-[#1A73E8]" />
              <span className="font-semibold text-lg">SecureLife</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner in comprehensive insurance solutions. Protecting what matters most since 2014.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-[#1A73E8] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#1A73E8] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#1A73E8] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#1A73E8] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-gray-400 hover:text-white transition-colors">
                  Our Policies
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4">Insurance Plans</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Medical Insurance</li>
              <li className="text-gray-400">Accident Insurance</li>
              <li className="text-gray-400">Term Life Insurance</li>
              <li className="text-gray-400">Vehicle Insurance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>support@securelife.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  123 Insurance Plaza,
                  <br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2026 SecureLife Insurance. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
