import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Search, Cog, Bot, Headphones, Shield, Zap, Clock, TrendingUp } from 'lucide-react';

const services = [
  {
    title: 'Audit & roadmap',
    description: 'Analyse approfondie de vos processus pour identifier les opportunités d\'automatisation les plus rentables.',
    icon: Search,
    features: [
      'Audit complet de vos workflows',
      'Identification des gains potentiels',
      'Roadmap personnalisée',
      'Estimation du ROI',
    ],
    timeline: '1-2 semaines',
    price: 'Gratuit',
  },
  {
    title: 'Intégration & déploiement',
    description: 'Mise en place complète de vos automatisations avec respect des standards de sécurité et RGPD.',
    icon: Cog,
    features: [
      'Développement sur n8n/Make',
      'Intégrations API natives',
      'Sécurité & conformité RGPD',
      'Tests et validation',
    ],
    timeline: '2-6 semaines',
    price: 'Sur devis',
  },
  {
    title: 'Agents IA (texte/voix)',
    description: 'Création d\'agents conversationnels intelligents pour automatiser vos interactions clients.',
    icon: Bot,
    features: [
      'Chatbots intelligents',
      'Agents vocaux',
      'Traitement du langage naturel',
      'Intégration multicanal',
    ],
    timeline: '3-4 semaines',
    price: 'Sur devis',
  },
  {
    title: 'Support & optimisation continue',
    description: 'Accompagnement long terme pour maintenir et optimiser vos automatisations.',
    icon: Headphones,
    features: [
      'Support technique prioritaire',
      'Optimisations régulières',
      'Nouvelles fonctionnalités',
      'Formation équipes',
    ],
    timeline: 'En continu',
    price: 'Abonnement',
  },
];

const benefits = [
  {
    icon: Clock,
    title: 'Gain de temps',
    description: 'Jusqu\'à 70% de temps économisé sur les tâches répétitives',
  },
  {
    icon: TrendingUp,
    title: 'ROI garanti',
    description: 'Retour sur investissement visible dès les premiers mois',
  },
  {
    icon: Shield,
    title: 'Sécurisé',
    description: 'Respect des normes RGPD et sécurité des données',
  },
  {
    icon: Zap,
    title: 'Évolutif',
    description: 'Solutions qui grandissent avec votre entreprise',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-background to-muted/20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" data-testid="text-services-title">
                Services d'automatisation IA
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-services-subtitle">
                Des solutions complètes pour transformer vos processus métier en workflows intelligents et automatisés.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {services.map((service, index) => (
                <Card key={service.title} className="hover-elevate transition-all duration-300" data-testid={`card-service-${index}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary" data-testid={`badge-timeline-${index}`}>
                          {service.timeline}
                        </Badge>
                        <Badge variant="outline" data-testid={`badge-price-${index}`}>
                          {service.price}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl" data-testid={`text-service-title-${index}`}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6" data-testid={`text-service-description-${index}`}>
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={feature} className="flex items-center text-sm" data-testid={`text-feature-${index}-${featureIndex}`}>
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-b from-background via-primary/5 to-primary/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-benefits-title">
                Pourquoi choisir NOESIS AI ?
              </h2>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="text-center" data-testid={`benefit-${index}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground" data-testid={`text-benefit-title-${index}`}>
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground" data-testid={`text-benefit-description-${index}`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-b from-background via-primary/5 to-primary/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-cta-title">
                Prêt à automatiser vos processus ?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-cta-subtitle">
                Commencez par un audit gratuit de vos workflows actuels.
              </p>
              <div className="mt-10">
                <Button asChild size="lg" data-testid="button-services-cta">
                  <Link href="/contact">
                    Demander un audit gratuit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button asChild data-testid="button-sticky-cta">
          <Link href="/contact">
            Demander un audit
          </Link>
        </Button>
      </div>
      
      <Footer />
    </div>
  );
}