import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, TrendingUp, TrendingDown, Clock } from 'lucide-react';

// todo: remove mock functionality
const caseStudies = [
  {
    title: 'PME bâtiment',
    description: 'Automatisation complète de la gestion administrative et du SAV.',
    metrics: [
      { label: 'Temps admin', value: '-70%', trend: 'down', icon: Clock },
      { label: 'Réactivité SAV', value: '+30%', trend: 'up', icon: TrendingUp },
    ],
    category: 'Construction',
  },
  {
    title: 'Cabinet comptable',
    description: 'Saisie automatique des factures et réduction drastique des erreurs.',
    metrics: [
      { label: 'Saisie auto', value: '100%', trend: 'up', icon: TrendingUp },
      { label: 'Erreurs', value: '-80%', trend: 'down', icon: TrendingDown },
    ],
    category: 'Finance',
  },
  {
    title: 'Agence marketing',
    description: 'Génération et publication de contenu semi-automatisée.',
    metrics: [
      { label: 'Productivité', value: '+150%', trend: 'up', icon: TrendingUp },
      { label: 'Temps création', value: '-60%', trend: 'down', icon: Clock },
    ],
    category: 'Marketing',
  },
];

export default function CaseStudies() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary" data-testid="text-cases-eyebrow">
            Résultats clients
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-cases-title">
            Cas d'usage réels
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-cases-subtitle">
            Découvrez comment nos clients ont transformé leurs opérations grâce à nos automatisations.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Card key={study.title} className="hover-elevate transition-all duration-300 group cursor-pointer" data-testid={`card-case-study-${index}`}>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" data-testid={`badge-category-${index}`}>
                    {study.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors" data-testid={`text-case-title-${index}`}>
                  {study.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 text-sm leading-6" data-testid={`text-case-description-${index}`}>
                  {study.description}
                </p>
                
                <div className="space-y-4">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metric.label} className="flex items-center justify-between" data-testid={`metric-${index}-${metricIndex}`}>
                      <div className="flex items-center gap-2">
                        <metric.icon className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`} />
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                      </div>
                      <span className={`font-semibold ${
                        metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" asChild data-testid="button-view-all-cases">
            <Link href="/cases">
              Voir toutes les études de cas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}