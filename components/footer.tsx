"use client";

import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone,
  Mail,
  ChevronRight,
  Globe,
  Wine,
  Mountain,
  Building,
  Calendar,
  Users,
  Car,
  Utensils
} from 'lucide-react';

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const socialLinks = [
  { Icon: Facebook, href: '#', color: '#1877f2', label: 'Facebook' },
  { Icon: Instagram, href: '#', color: '#e4405f', label: 'Instagram' },
  { Icon: Twitter, href: '#', color: '#1da1f2', label: 'Twitter' }
];

const tourTypes = [
  { icon: Globe, label: 'Cultural Tours', href: '/tours/cultural' },
  { icon: Wine, label: 'Wine Tours', href: '/tours/wine' },
  { icon: Mountain, label: 'Adventure Tours', href: '/tours/adventure' },
  { icon: Building, label: 'City Tours', href: '/tours/city' }
];

const services = [
  { icon: Calendar, label: 'Tour Planning', href: '/services/planning' },
  { icon: Users, label: 'Group Tours', href: '/services/groups' },
  { icon: Car, label: 'Transportation', href: '/services/transport' },
  { icon: Utensils, label: 'Food Tours', href: '/services/food' }
];

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    variants={listVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="space-y-6"
  >
    <motion.div className="relative inline-block">
      <motion.h3 
        variants={titleVariants}
        className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 text-transparent bg-clip-text"
      >
        {title}
      </motion.h3>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "2rem" }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
      />
    </motion.div>
    {children}
  </motion.div>
);

export function Footer() {
  return (
    <footer className="relative bg-[#1A1B1E] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1A1B1E] via-[#1F2937] to-[#111827]" />
        
        {/* Animated color layers */}
        <div className="absolute inset-0">
          {/* Elegant moving gradients */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 animate-gradient-x" />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-violet-500/10 to-pink-500/10 animate-gradient-y" />
          </div>
          
          {/* Subtle floating orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full filter blur-[80px] animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full filter blur-[60px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-orange-500/5 to-transparent rounded-full filter blur-[70px] mix-blend-soft-light animate-pulse-slow" />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-soft-light" />
        
        {/* Glass effect overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <FooterColumn title="Nare Travel">
            <motion.p 
              variants={itemVariants}
              className="text-gray-300 leading-relaxed"
            >
              Discover Armenia's hidden treasures with our expertly curated tours. 
              Let us guide you through an unforgettable journey of culture, history, and adventure.
            </motion.p>
            
            <motion.div 
              variants={listVariants}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="social-icon-wrapper group"
                >
                  <div className="social-icon-inner" style={{ '--hover-color': social.color } as any}>
                    <social.Icon className="w-5 h-5" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </FooterColumn>

          {/* Tour Types */}
          <FooterColumn title="Tour Types">
            <motion.div 
              variants={listVariants}
              className="space-y-3"
            >
              {tourTypes.map((tour) => (
                <motion.a
                  key={tour.label}
                  href={tour.href}
                  variants={itemVariants}
                  className="quick-link-item group"
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <tour.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  <span className="ml-2 flex-grow">{tour.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </FooterColumn>

          {/* Services */}
          <FooterColumn title="Our Services">
            <motion.div 
              variants={listVariants}
              className="space-y-3"
            >
              {services.map((service) => (
                <motion.a
                  key={service.label}
                  href={service.href}
                  variants={itemVariants}
                  className="quick-link-item group"
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <service.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  <span className="ml-2 flex-grow">{service.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </FooterColumn>

          {/* Contact Info */}
          <FooterColumn title="Contact Us">
            <motion.div 
              variants={listVariants}
              className="space-y-4"
            >
              {[
                { Icon: MapPin, text: '123 Travel Street, Yerevan, Armenia' },
                { Icon: Phone, text: '+374 XX XXX XXX' },
                { Icon: Mail, text: 'info@naretravel.com' }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="contact-item group"
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <div className="contact-icon-wrapper">
                    <contact.Icon className="w-5 h-5" />
                  </div>
                  <span>{contact.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </FooterColumn>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-500"
            >
              {new Date().getFullYear()} Nare Travel. All rights reserved.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex space-x-6"
            >
              <a href="/privacy" className="text-gray-500 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}