"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Building2, Globe, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useState, useEffect } from 'react';

interface ServiceIconProps {
  icon: LucideIcon;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ icon: Icon }) => {
  if (!Icon) return null;
  return <Icon className="h-5 w-5" />;
};

interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  image: string;
}

const services: ServiceItem[] = [
  {
    title: 'Tour Packages',
    description: 'International travel packages to Dubai, Sharm El Sheikh, Maldives, and more',
    icon: Plane,
    href: '/services/outgoing-packages',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05'
  },
  {
    title: 'Flight Tickets',
    description: 'Book your flights with our professional assistance',
    icon: Plane,
    href: '/services/air-tickets',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05'
  },
  {
    title: 'Visa Services',
    description: 'USA and Schengen tourist visa assistance',
    icon: Building2,
    href: '/services/visa-assistance',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c'
  }
];

export default function ServicesPage() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{t('services.title')}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ServiceIcon icon={service.icon} />
                        {t(`services.${service.title.toLowerCase().replace(' ', '_')}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {t(`services.${service.title.toLowerCase().replace(' ', '_')}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}