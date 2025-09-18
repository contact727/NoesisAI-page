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
  const [location] = useLocation();
  const { openCalendlyModal, closeCalendlyModal, isCalendlyOpen } = useActions();

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" data-testid="link-logo">
            <span className="sr-only">NOESIS AI</span>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                {/* Cercle extérieur */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-0.5">
                  {/* Cercle intérieur */}
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {/* Motif réseau central */}
                    <svg width="16" height="16" viewBox="0 0 16 16" className="text-white">
                      <g fill="currentColor">
                        {/* Points du réseau */}
                        <circle cx="8" cy="4" r="1.5"/>
                        <circle cx="4" cy="8" r="1.5"/>
                        <circle cx="12" cy="8" r="1.5"/>
                        <circle cx="8" cy="12" r="1.5"/>
                        <circle cx="8" cy="8" r="1"/>
                        {/* Lignes de connexion */}
                        <line x1="8" y1="4" x2="4" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="8" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="4" y1="8" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="12" y1="8" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="8" y1="4" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                        <line x1="4" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                        <line x1="12" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                        <line x1="8" y1="12" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      </g>
                    </svg>
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
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                    location === '/' ? 'text-primary' : 'text-foreground'
                  }`}
                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </a>
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
          <Button onClick={openCalendlyModal} data-testid="button-cta-header">
            Demander un audit gratuit
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" data-testid="link-logo-mobile">
                <span className="sr-only">NOESIS AI</span>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10">
                    {/* Cercle extérieur */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-0.5">
                      {/* Cercle intérieur */}
                      <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        {/* Motif réseau central */}
                        <svg width="16" height="16" viewBox="0 0 16 16" className="text-white">
                          <g fill="currentColor">
                            {/* Points du réseau */}
                            <circle cx="8" cy="4" r="1.5"/>
                            <circle cx="4" cy="8" r="1.5"/>
                            <circle cx="12" cy="8" r="1.5"/>
                            <circle cx="8" cy="12" r="1.5"/>
                            <circle cx="8" cy="8" r="1"/>
                            {/* Lignes de connexion */}
                            <line x1="8" y1="4" x2="4" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="8" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="4" y1="8" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="12" y1="8" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="8" y1="4" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="4" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="12" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="8" y1="12" x2="8" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                          </g>
                        </svg>
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
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    if (item.href === '/#faq') {
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {item.name}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="py-6">
                  <Button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openCalendlyModal();
                    }} 
                    className="w-full" 
                    data-testid="button-cta-mobile"
                  >
                    Demander un audit gratuit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}