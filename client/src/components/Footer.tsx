import { Link } from 'wouter';
import { Linkedin, Instagram } from 'lucide-react';
import { useActions } from '@/hooks/useActions';

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Politique de confidentialité', href: '/privacy' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ugo-sartini-04a14620a/',
      icon: Linkedin,
      platform: 'linkedin',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ugoia2025/',
      icon: Instagram,
      platform: 'instagram',
    },
  ],
};

export default function Footer() {
  const { openSocial } = useActions();
  
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                {/* Grand cercle extérieur */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-30"></div>
                {/* Cercle intérieur principal */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  {/* Motif losange central */}
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-white">
                    <g stroke="currentColor" fill="currentColor" strokeWidth="1">
                      {/* Losange central avec 4 points */}
                      <circle cx="6" cy="3" r="1.2"/>
                      <circle cx="9" cy="6" r="1.2"/>
                      <circle cx="6" cy="9" r="1.2"/>
                      <circle cx="3" cy="6" r="1.2"/>
                      {/* Connexions entre les points */}
                      <path d="M6,3 L9,6 L6,9 L3,6 Z" fill="none" strokeWidth="1.2" strokeLinejoin="round"/>
                    </g>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold text-foreground">NOESIS AI</span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground max-w-md" data-testid="text-footer-description">
              NOESIS AI conçoit et intègre des automatisations sur-mesure pour éliminer les tâches répétitives et booster votre croissance.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <button
                  key={item.name}
                  onClick={() => openSocial(item.href, item.platform)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Suivre NOESIS AI sur ${item.name}`}
                  data-testid={`button-social-${item.name.toLowerCase()}`}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                        data-testid={`link-footer-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Légal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                        data-testid={`link-footer-legal-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-card-border pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-muted-foreground text-center" data-testid="text-copyright">
            © {new Date().getFullYear()} NOESIS AI. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}