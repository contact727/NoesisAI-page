import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useActions } from '@/hooks/useActions';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const handleFAQClick = () => {
    setMobileMenuOpen(false);
    
    if (location === '/') {
      // Si on est déjà sur la page d'accueil, faire défiler vers la FAQ
      setTimeout(() => {
        const faqElement = document.getElementById('faq');
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si on n'est pas sur la page d'accueil, naviguer vers "/" puis vers la FAQ
      setLocation('/');
      setTimeout(() => {
        const faqElement = document.getElementById('faq');
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" data-testid="link-logo">
            <span className="sr-only">NOESIS AI</span>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                {/* Cercle extérieur le plus grand */}
                <div className="absolute inset-0 rounded-full p-0.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
                  {/* Fond sombre intérieur */}
                  <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                    {/* Cercle intérieur avec dégradé */}
                    <div className="h-6 w-6 rounded-full p-0.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
                      {/* Fond sombre pour le motif */}
                      <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                        {/* Motif losange central */}
                        <svg width="12" height="12" viewBox="0 0 16 16" className="text-blue-400">
                          <g fill="currentColor" stroke="currentColor" strokeWidth="1">
                            {/* 4 points du losange */}
                            <circle cx="8" cy="4" r="1.5"/>
                            <circle cx="12" cy="8" r="1.5"/>
                            <circle cx="8" cy="12" r="1.5"/>
                            <circle cx="4" cy="8" r="1.5"/>
                            {/* Connexions entre les points */}
                            <line x1="8" y1="4" x2="12" y2="8" strokeWidth="1.5"/>
                            <line x1="12" y1="8" x2="8" y2="12" strokeWidth="1.5"/>
                            <line x1="8" y1="12" x2="4" y2="8" strokeWidth="1.5"/>
                            <line x1="4" y1="8" x2="8" y2="4" strokeWidth="1.5"/>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold text-foreground">NOESIS AI</span>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="button-mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            if (item.href === '/#faq') {
              return (
                <button
                  key={item.name}
                  onClick={handleFAQClick}
                  className={`text-sm font-semibold leading-6 transition-colors hover:text-primary bg-transparent border-none cursor-pointer ${
                    location === '/' ? 'text-primary' : 'text-foreground'
                  }`}
                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </button>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                  location === item.href ? 'text-primary' : 'text-foreground'
                }`}
                data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button onClick={() => setLocation('/contact')} data-testid="button-cta-header">
            Demander un audit gratuit
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu - Rendered outside normal flow */}
      {mobileMenuOpen && (
        <>
          {/* Overlay backdrop */}
          <div 
            className="lg:hidden fixed inset-0 z-[9998] bg-black/50" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
          />
          
          {/* Mobile menu panel */}
          <div 
            className="lg:hidden fixed inset-0 z-[9999] bg-background"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
            role="dialog" 
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Link href="/" className="-m-1.5 p-1.5" data-testid="link-logo-mobile">
                <span className="sr-only">NOESIS AI</span>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10">
                    <div className="absolute inset-0 rounded-full p-0.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
                      <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full p-0.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
                          <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 16 16" className="text-blue-400">
                              <g fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <circle cx="8" cy="4" r="1.5"/>
                                <circle cx="12" cy="8" r="1.5"/>
                                <circle cx="8" cy="12" r="1.5"/>
                                <circle cx="4" cy="8" r="1.5"/>
                                <line x1="8" y1="4" x2="12" y2="8" strokeWidth="1.5"/>
                                <line x1="12" y1="8" x2="8" y2="12" strokeWidth="1.5"/>
                                <line x1="8" y1="12" x2="4" y2="8" strokeWidth="1.5"/>
                                <line x1="4" y1="8" x2="8" y2="4" strokeWidth="1.5"/>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-foreground">NOESIS AI</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="button-close-mobile-menu"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            
            {/* Navigation links - full height container */}
            <div 
              className="flex flex-col justify-center px-6"
              style={{ height: 'calc(100vh - 100px)' }}
            >
              <nav className="space-y-8 text-center">
                {navigation.map((item) => {
                  if (item.href === '/#faq') {
                    return (
                      <button
                        key={item.name}
                        onClick={handleFAQClick}
                        className="block text-3xl font-bold text-foreground hover:text-primary transition-colors py-2 bg-transparent border-none cursor-pointer w-full"
                        data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.name}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-3xl font-bold text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              
              {/* CTA Button */}
              <div className="mt-12 px-4">
                <Button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLocation('/contact');
                  }} 
                  className="w-full py-4 text-lg font-semibold" 
                  data-testid="button-cta-mobile"
                >
                  Demander un audit gratuit
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}