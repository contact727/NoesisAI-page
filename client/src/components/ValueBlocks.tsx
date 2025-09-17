import { Card, CardContent } from '@/components/ui/card';
import { Mail, TrendingUp, Settings, Phone } from 'lucide-react';

const features = [
  {
    name: 'Email & documents',
    description: 'Extraction factures, tri automatique, tagging CRM pour optimiser vos processus documentaires.',
    icon: Mail,
  },
  {
    name: 'Ventes & marketing',
    description: 'Prospection multicanal, scoring leads, séquences IA pour maximiser vos conversions.',
    icon: TrendingUp,
  },
  {
    name: 'Opérations',
    description: 'Synchronisation bases, reporting automatique pour une gestion optimisée de vos données.',
    icon: Settings,
  },
  {
    name: 'Agents vocaux',
    description: 'Prise d\'appels, RDV, FAQ automatisés pour améliorer l\'expérience client 24/7.',
    icon: Phone,
  },
];

export default function ValueBlocks() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary" data-testid="text-section-eyebrow">
            Solutions d'automatisation
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-section-title">
            Automatisez tous vos processus métier
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-section-subtitle">
            Des solutions complètes pour transformer vos opérations quotidiennes en workflows intelligents et efficaces.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={feature.name} className="hover-elevate transition-all duration-300" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <dt className="mt-4 font-semibold text-foreground" data-testid={`text-feature-title-${index}`}>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 leading-7 text-muted-foreground text-sm" data-testid={`text-feature-description-${index}`}>
                    {feature.description}
                  </dd>
                </CardContent>
              </Card>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}