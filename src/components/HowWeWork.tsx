import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { Search, Code2, Cog, TrendingUp } from 'lucide-react';

const steps = [
  {
    name: 'Audit',
    description: 'Analyse approfondie de vos processus pour identifier les opportunités d\'automatisation.',
    icon: Search,
  },
  {
    name: 'Prototype',
    description: 'Création d\'un prototype fonctionnel pour valider la solution avant déploiement.',
    icon: Code2,
  },
  {
    name: 'Intégration',
    description: 'Mise en place complète des automatisations dans votre environnement de travail.',
    icon: Cog,
  },
  {
    name: 'Pilotage/Optimisation',
    description: 'Suivi continu et optimisation des performances pour maximiser les bénéfices.',
    icon: TrendingUp,
  },
];

export default function HowWeWork() {
  return (
    <div className="bg-muted/20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary" data-testid="text-process-eyebrow">
            Notre méthode
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-process-title">
            Comment nous travaillons
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-process-subtitle">
            Une approche structurée en 4 étapes pour garantir le succès de vos automatisations.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="relative" data-testid={`step-${stepIdx}`}>
                {stepIdx < steps.length - 1 && (
                  <div className="absolute top-12 left-1/2 hidden lg:block">
                    <div className="h-0.5 w-16 bg-border translate-x-8" />
                  </div>
                )}
                
                <Card className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary mx-auto">
                      <step.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground mr-2">
                          Étape {stepIdx + 1}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {step.name}
                        </span>
                      </div>
                      
                      <p className="mt-4 text-sm text-muted-foreground leading-6" data-testid={`text-step-description-${stepIdx}`}>
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" data-testid="button-process-cta">
              <Link href="/contact">
                Lancer un audit (gratuit)
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}