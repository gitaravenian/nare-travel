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
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">Nare Travel</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.trigger}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuTrigger className="px-4">{t(`menu.${item.trigger}`)}</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.content.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          title={subItem.title}
                          href={subItem.href}
                          icon={subItem.icon}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Link href="/about" className={cn(navigationMenuTriggerStyle(), "px-4")}>
                  {t('menu.about')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "px-4")}>
                  {t('menu.contact')}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 space-y-4">
            {menuItems.map((item) => (
              <div key={item.trigger} className="space-y-2">
                <div className="font-medium">{t(`menu.${item.trigger}`)}</div>
                <div className="pl-4 space-y-2">
                  {item.content.map((subItem) => (
                    <Link 
                      key={subItem.title}
                      href={subItem.href}
                      className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <subItem.icon className="h-4 w-4" />
                      {t(`menu.${subItem.title}`)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/about" className="block py-2" onClick={() => setIsMenuOpen(false)}>
              {t('menu.about')}
            </Link>
            <Link href="/contact" className="block py-2" onClick={() => setIsMenuOpen(false)}>
              {t('menu.contact')}
            </Link>
            
            <div className="flex items-center gap-4 pt-4 border-t">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}