"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitcher } from '@/components/language-switcher';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Plane,
  Building2,
  Calendar,
  Camera,
  Mountain,
  Globe,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BookNowButton } from './book-now-button';

const menuItems = [
  {
    trigger: 'services',
    href: '/services',
    content: [
      {
        title: 'tourPackages',
        icon: Plane,
        href: '/services/outgoing-packages'
      },
      {
        title: 'flightTickets',
        icon: Plane,
        href: '/services/air-tickets'
      },
      {
        title: 'visaServices',
        icon: Building2,
        href: '/services/visa-assistance'
      }
    ]
  },
  {
    trigger: 'armeniaTours',
    href: '/armenia-tours',
    content: [
      {
        title: 'dailyTours',
        icon: Calendar,
        href: '/armenia-tours/daily'
      },
      {
        title: 'culturalTours',
        icon: Camera,
        href: '/armenia-tours/cultural'
      },
      {
        title: 'adventureTours',
        icon: Mountain,
        href: '/armenia-tours/adventure'
      }
    ]
  },
  {
    trigger: 'b2bServices',
    href: '/b2b',
    content: [
      {
        title: 'dmcServices',
        icon: Globe,
        href: '/b2b/dmc'
      },
      {
        title: 'miceServices',
        icon: Briefcase,
        href: '/b2b/mice'
      }
    ]
  }
];

const ListItem = ({ className, title, href, icon: Icon, ...props }: any) => {
  const { t } = useLanguage();
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <div className="text-sm font-medium leading-none">{t(`menu.${title}`)}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {t(`menu.${title}Desc`)}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border" 
          : "bg-background/0 border-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Nare Travel" 
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.trigger}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuTrigger 
                      className={cn(
                        "px-4 transition-colors",
                        pathname.startsWith(item.href) && "text-primary font-medium"
                      )}
                    >
                      {t(`menu.${item.trigger}`)}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] rounded-lg">
                      {item.content.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          title={subItem.title}
                          href={subItem.href}
                          icon={subItem.icon}
                          className={cn(
                            pathname === subItem.href && "bg-accent"
                          )}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Link 
                  href="/about" 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "px-4",
                    pathname === '/about' && "text-primary font-medium"
                  )}
                >
                  {t('menu.about')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  href="/contact" 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "px-4",
                    pathname === '/contact' && "text-primary font-medium"
                  )}
                >
                  {t('menu.contact')}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <BookNowButton variant="default" size="sm" />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative"
          >
            <div className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity",
              isMenuOpen ? "opacity-100" : "opacity-0"
            )}>
              <X className="h-5 w-5" />
            </div>
            <div className={cn(
              "flex items-center justify-center transition-opacity",
              isMenuOpen ? "opacity-0" : "opacity-100"
            )}>
              <Menu className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-background border-t"
      >
        <div className="container py-6 space-y-6">
          {menuItems.map((item) => (
            <div key={item.trigger} className="space-y-3">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between font-medium",
                  pathname.startsWith(item.href) && "text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(`menu.${item.trigger}`)}
              </Link>
              <div className="pl-4 space-y-3">
                {item.content.map((subItem) => (
                  <Link 
                    key={subItem.title}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                      pathname === subItem.href && "text-primary font-medium"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <subItem.icon className="h-4 w-4" />
                    {t(`menu.${subItem.title}`)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-3">
            <Link 
              href="/about" 
              className={cn(
                "block py-2 hover:text-primary transition-colors",
                pathname === '/about' && "text-primary font-medium"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('menu.about')}
            </Link>
            <Link 
              href="/contact" 
              className={cn(
                "block py-2 hover:text-primary transition-colors",
                pathname === '/contact' && "text-primary font-medium"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('menu.contact')}
            </Link>
          </div>
          
          <div className="pt-6 border-t">
            <BookNowButton className="w-full" />
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}