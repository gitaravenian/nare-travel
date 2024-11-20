"use client";

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/hooks/use-language';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 space-y-6"
            >
              <h3 className="text-2xl font-bold tracking-tight">Nare Travel and Tours</h3>
              <p className="text-gray-400 leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-6 w-6" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-3 space-y-4"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {t('footer.quickLinks.title')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.quickLinks.about')}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.quickLinks.services')}
                  </Link>
                </li>
                <li>
                  <Link href="/armenia-tours" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.quickLinks.tours')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    {t('footer.quickLinks.contact')}
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 space-y-6"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {t('footer.contactInfo.title')}
              </h3>
              <ul className="space-y-4">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 text-gray-400"
                >
                  <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                  <span>{t('footer.contactInfo.address')}</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 text-gray-400"
                >
                  <Phone className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div className="space-y-1">
                    <div>{t('footer.contactInfo.phone1')}</div>
                    <div>{t('footer.contactInfo.phone2')}</div>
                  </div>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 text-gray-400"
                >
                  <Mail className="h-6 w-6 flex-shrink-0 mt-1" />
                  <Link 
                    href={`mailto:${t('footer.contactInfo.email')}`}
                    className="hover:text-white transition-colors"
                  >
                    {t('footer.contactInfo.email')}
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          <Separator className="my-10 bg-gray-800" />

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-sm"
          >
            <p>
              &copy; {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}