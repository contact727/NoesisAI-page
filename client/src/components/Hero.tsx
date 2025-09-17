import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@assets/generated_images/Hero_workflow_dashboard_mockup_f880d7a3.png';

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-x-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent-foreground ring-1 ring-inset ring-accent/20">
              Agence d'automatisation IA
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" data-testid="text-hero-title">
            Gagnez des heures.{' '}
            <span className="text-primary">Accélérez votre croissance.</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            NOESIS AI conçoit et intègre des automatisations sur-mesure (n8n, Make, API, agents IA) pour éliminer les tâches répétitives et booster votre ROI.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" data-testid="button-primary-cta">
              <Link href="/contact">
                Demander un audit gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" data-testid="button-secondary-cta">
              <Play className="mr-2 h-4 w-4" />
              Voir nos cas d'usage
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero image */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-background/10 p-2 ring-1 ring-inset ring-border/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img
              src={heroImage}
              alt="Workflow automation dashboard"
              className="rounded-md shadow-2xl ring-1 ring-border/10"
              data-testid="img-hero-dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
}