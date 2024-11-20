"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookNowButton } from '@/components/book-now-button';
import { Clock, Globe, Users } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: 'Dubai Adventure',
    description: 'Experience the luxury and excitement of Dubai',
    duration: '5 days',
    groupSize: '2+',
    destination: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    price: 450000,
  },
  {
    id: 2,
    title: 'European Highlights',
    description: 'Visit the most iconic cities of Europe',
    duration: '10 days',
    groupSize: '2+',
    destination: 'Europe',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    price: 890000,
  },
  {
    id: 3,
    title: 'Turkish Delight',
    description: 'Explore the rich culture and history of Turkey',
    duration: '7 days',
    groupSize: '2+',
    destination: 'Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
    price: 350000,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function OutgoingPackages() {
  return (
    <div>
      <section className="relative h-[40vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
          alt="International Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative container text-center text-white"
        >
          <h1 className="text-4xl font-bold mb-4">International Travel Packages</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore the world with our carefully curated travel packages
          </p>
        </motion.div>
      </section>

      <section className="container py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={item}>
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{pkg.title}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{pkg.groupSize} people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{pkg.destination}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {pkg.price.toLocaleString()} AMD
                  </span>
                  <BookNowButton />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}