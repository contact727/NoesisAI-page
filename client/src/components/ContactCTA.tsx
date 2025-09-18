import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useLocation } from 'wouter';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useActions } from '@/hooks/useActions';

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+33 6 89 39 56 23',
    action: 'phone'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@noesisiai.pro',
    action: 'email'
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Paris, France',
    action: null
  },
];

export default function ContactCTA() {
  const { openMailto } = useActions();
  const [, setLocation] = useLocation();
  
  const handleContactClick = (info: any) => {
    if (info.action === 'email') {
      openMailto();
    } else if (info.action === 'phone') {
      window.location.href = `tel:+33689395623`;
    }
  };
  
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6" data-testid="text-contact-title">
            Discutons de votre projet
          </h2>
          <p className="text-xl leading-8 text-muted-foreground" data-testid="text-contact-subtitle">
            Transformez votre entreprise avec nos solutions d'IA sur mesure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={info.title} className="hover-elevate transition-all duration-300" data-testid={`card-contact-${index}`}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2" data-testid={`text-contact-title-${index}`}>
                  {info.title}
                </h3>
                {info.action ? (
                  <button 
                    onClick={() => handleContactClick(info)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`button-contact-${index}`}
                  >
                    {info.value}
                  </button>
                ) : (
                  <p className="text-muted-foreground" data-testid={`text-contact-value-${index}`}>
                    {info.value}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
          
          <Card className="hover-elevate transition-all duration-300 bg-primary/5">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Pourquoi nous choisir ?
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Configuration personnalisée</div>
                <div>• Support réactif</div>
                <div>• Satisfaction garantie</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={() => setLocation('/contact')} size="lg" className="px-8 py-4 text-lg" data-testid="button-contact-cta">
            <MessageSquare className="mr-2 h-5 w-5" />
            Demander un audit gratuit
          </Button>
        </div>
      </div>
    </div>
  );
}