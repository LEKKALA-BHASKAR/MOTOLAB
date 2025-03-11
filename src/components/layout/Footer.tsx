import { Mail, Phone, Globe, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="py-12 mt-16 bg-cover bg-center text-red"
      style={{ backgroundImage: "url('/footer-bg.JPG')" }} 
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="mr-2" size={18} />
                <a href="mailto:team@MOTOLAB.in" className="hover:underline">
                  team@MOTOLAB.in
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="mr-2" size={18} />
                <a href="tel:+918825978338" className="hover:underline">
                  +91-8825978338
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Globe className="mr-2" size={18} />
                <a
                  href="https://www.MOTOLAB.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  www.MOTOLAB.in
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="font-bold text-xxl mb-5">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns & Exchanges
                </a>
              </li>
              
              <li>
                <a href="/PrivacyPolicy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-xl mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="hover:scale-110 transform transition duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:scale-110 transform transition duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:scale-110 transform transition duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:scale-110 transform transition duration-300">
                <Youtube size={24} />
              </a>
              <a href="#" className="hover:scale-110 transform transition duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-black mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} MOTO LAB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
