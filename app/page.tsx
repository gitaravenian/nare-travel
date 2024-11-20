"use client";

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Building2, Globe, Calendar, CreditCard, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useImages } from '@/hooks/use-images';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { useLanguage } from '@/hooks/use-language';

interface SlideItem {
  imageKey: keyof ReturnType<typeof useImages>['images'];
  href: string;
}

const slides: SlideItem[] = [
  {
    imageKey: "heroArmeniaMain",
    href: "/armenia-tours"
  },
  {
    imageKey: "serviceFlight",
    href: "/services/outgoing-packages"
  },
  {
    imageKey: "serviceMice",
    href: "/b2b"
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    skipSnaps: false
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { images } = useImages();
  const { t } = useLanguage();

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="overflow-hidden h-full w-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className=" flex-[0_0_100%] h-full min-w-0 relative flex align-middle">
                <ImageWithFallback
                  src={images[slide.imageKey]}
                  fallbackKey="heroArmeniaMain"
                  alt={t(`home.slider.${index}.title`)}
                  fill
                  className="hero-image"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                    className="hero-title"
                  >
                    {t(`home.slider.${index}.title`)}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                    transition={{ delay: 0.2 }}
                    className="hero-subtitle"
                  >
                    {t(`home.slider.${index}.subtitle`)}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                    transition={{ delay: 0.4 }}
                    className="hero-cta"
                  >
                    <Button size="lg" asChild className="text-lg">
                      <Link href={slide.href}>{t(`home.slider.${index}.cta`)}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="carousel-nav-button carousel-nav-prev"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="carousel-nav-button carousel-nav-next"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </section>

      {/* Google Reviews Section */}
      <section className="bg-muted section-padding">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="section-title">{t('home.reviews.title')}</h2>
            <p className="section-subtitle">{t('home.reviews.subtitle')}</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.services.title')}</h2>
            <p className="section-subtitle">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <ImageWithFallback
                src={images.tourGarni}
                fallbackKey="heroArmeniaMain"
                alt={t('home.services.daily.title')}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                width={400}
                height={256}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{t('home.services.daily.title')}</h3>
                <p className="mb-4">{t('home.services.daily.description')}</p>
                <Button asChild variant="secondary">
                  <Link href="/armenia-tours/daily">{t('cta.learnMore')}</Link>
                </Button>
              </div>
            </Card>

            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <ImageWithFallback
                src={images.destinationDubai}
                fallbackKey="heroArmeniaMain"
                alt={t('home.services.international.title')}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                width={400}
                height={256}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{t('home.services.international.title')}</h3>
                <p className="mb-4">{t('home.services.international.description')}</p>
                <Button asChild variant="secondary">
                  <Link href="/services/outgoing-packages">{t('cta.learnMore')}</Link>
                </Button>
              </div>
            </Card>

            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <ImageWithFallback
                src={images.serviceMice}
                fallbackKey="heroArmeniaMain"
                alt={t('home.services.business.title')}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                width={400}
                height={256}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{t('home.services.business.title')}</h3>
                <p className="mb-4">{t('home.services.business.description')}</p>
                <Button asChild variant="secondary">
                  <Link href="/b2b">{t('cta.learnMore')}</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.whyChooseUs.title')}</h2>
            <p className="section-subtitle">
              {t('home.whyChooseUs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{t('home.whyChooseUs.expertTeam.title')}</h3>
                <p className="text-muted-foreground">{t('home.whyChooseUs.expertTeam.description')}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{t('home.whyChooseUs.globalNetwork.title')}</h3>
                <p className="text-muted-foreground">{t('home.whyChooseUs.globalNetwork.description')}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{t('home.whyChooseUs.securePayments.title')}</h3>
                <p className="text-muted-foreground">{t('home.whyChooseUs.securePayments.description')}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{t('home.whyChooseUs.bestValue.title')}</h3>
                <p className="text-muted-foreground">{t('home.whyChooseUs.bestValue.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}