import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { Check, Star, Zap, Crown } from 'lucide-react';

// todo: remove mock functionality
const plans = [
  {
    name: 'Assistant IA Basic',
    description: 'Parfait pour débuter avec l\'automatisation',
    icon: Zap,
    features: [
      'Réponses automatiques 24/7',
      'Gestion des demandes simples',
      'Intégration site web & email',
      'Support par email',
    ],
    benefits: [
      'Configuration personnalisée',
      'Support réactif',
      'Satisfaction garantie',
    ],
    popular: false,
    cta: 'Demander un devis',
  },
  {
    name: 'Assistant IA Pro',
    description: 'Solution complète pour automatiser votre entreprise',
    icon: Star,
    features: [
      'Automatisation complète',
      'Gestion intelligente des emails',
      'Génération de devis',
      'Support prioritaire 24/7',
      'Intégration CRM avancée',
      'Analyses et rapports détaillés',
    ],
    benefits: [
      'Configuration personnalisée',
      'Support réactif',
      'Satisfaction garantie',
    ],
    popular: true,
    badge: '2 places restantes !',
    cta: 'Demander un devis',
  },
  {
    name: 'Crew AI Enterprise',
    description: 'Solution sur mesure pour les grandes entreprises',
    icon: Crown,
    features: [
      'Équipe d\'agents IA spécialisés',
      'Automatisation sur mesure',
      'Intégration complète',
      'Support dédié 24/7',
      'Formation personnalisée',
      'Solutions sur mesure',
    ],
    benefits: [
      'Configuration personnalisée',
      'Support réactif',
      'Satisfaction garantie',
    ],
    popular: false,
    cta: 'Demander un devis',
  },
];

export default function Pricing() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary" data-testid="text-pricing-eyebrow">
            Tarification
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-testid="text-pricing-title">
            Solutions d'IA sur mesure
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-pricing-subtitle">
            Chaque projet étant unique, nous établissons un devis personnalisé adapté à vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative hover-elevate transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
              }`}
              data-testid={`card-plan-${index}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Recommandé
                  </Badge>
                </div>
              )}
              
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive" className="text-xs">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-4">
                  <plan.icon className="h-6 w-6 text-primary" />
                </div>
                
                <CardTitle className="text-2xl" data-testid={`text-plan-name-${index}`}>
                  {plan.name}
                </CardTitle>
                
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold text-primary" data-testid={`text-plan-price-${index}`}>
                    Tarif sur devis
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4" data-testid={`text-plan-description-${index}`}>
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={feature} className="flex items-start" data-testid={`text-plan-feature-${index}-${featureIndex}`}>
                        <Check className="h-4 w-4 text-primary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <div className="space-y-2">
                    {plan.benefits.map((benefit, benefitIndex) => (
                      <div key={benefit} className="flex items-center text-sm" data-testid={`text-plan-benefit-${index}-${benefitIndex}`}>
                        <Check className="h-3 w-3 text-green-500 mr-2" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  asChild 
                  className="w-full mt-6"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  data-testid={`button-plan-cta-${index}`}
                >
                  <Link href="/contact">
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-6">
            Toutes nos solutions incluent une garantie de satisfaction et un support réactif
          </p>
          <Button asChild size="lg" className="px-8 py-4 text-lg">
            <Link href="/contact">
              Demander votre devis gratuit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}