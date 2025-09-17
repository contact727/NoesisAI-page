import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { BookOpen, CheckCircle } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import CalendlyModal from '@/components/CalendlyModal';
import { useActions } from '@/hooks/useActions';

export default function LeadMagnet() {
  const { openCalendlyModal, closeCalendlyModal, isCalendlyOpen } = useActions();

  const handleLeadSuccess = () => {
    console.log('Lead submitted successfully!');
  };

  const benefits = [
    'Les 5 processus les plus rentables à automatiser',
    'Comment identifier les tâches chronophages',
    'Guide étape par étape pour démarrer',
    'Calculateur de ROI intégré',
    'Templates prêts à utiliser'
  ];

  return (
    <div className="py-24 sm:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6" data-testid="text-leadmagnet-title">
            Guide Gratuit : Automatisation IA
          </h2>
          
          <p className="text-xl leading-8 text-muted-foreground mb-8" data-testid="text-leadmagnet-subtitle">
            Découvrez comment automatiser vos processus métier et gagner jusqu'à 20h par semaine
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Benefits */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Ce que vous allez apprendre :
            </h3>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={benefit} className="flex items-start gap-3" data-testid={`text-benefit-${index}`}>
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/5 rounded-lg p-6 border-l-4 border-primary">
              <p className="text-sm text-muted-foreground">
                <strong className="text-primary">Plus de 500 entreprises</strong> utilisent déjà nos méthodes pour automatiser leurs processus et réduire leurs coûts opérationnels.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <Button onClick={openCalendlyModal} variant="outline" size="lg" data-testid="button-request-quote">
                Demander un devis personnalisé
              </Button>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <LeadForm
              onSuccess={handleLeadSuccess}
              title="Télécharger le guide gratuit"
              description="Remplissez le formulaire pour accéder immédiatement au guide complet sur l'automatisation IA"
            />
          </div>
        </div>
      </div>
      
      <CalendlyModal isOpen={isCalendlyOpen} onClose={closeCalendlyModal} />
    </div>
  );
}