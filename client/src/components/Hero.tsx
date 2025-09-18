import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-primary via-accent to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32">
        <div className="text-center">
          <div className="mb-12">
            <div className="mb-8">
              <span className="inline-flex items-center gap-x-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20 backdrop-blur-md">
                🤖 Agence d'automatisation IA
              </span>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-6" data-testid="text-hero-title">
              <div className="mb-2">Automatisez.</div>
              <div className="mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Optimisez.
              </div>
              <div>Gagnez du temps.</div>
            </h1>
          </div>
          
          <p className="text-xl leading-8 text-muted-foreground max-w-3xl mx-auto mb-12" data-testid="text-hero-subtitle">
            Solutions IA sur mesure pour professionnels
          </p>
          
          <div className="flex items-center justify-center gap-x-6 mb-16">
            <Button asChild size="lg" className="px-8 py-4 text-lg" data-testid="button-primary-cta">
              <Link href="/contact">
                Découvrir nos solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">+40%</div>
              <div className="text-sm text-muted-foreground">de productivité en moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">disponibilité garantie</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15h</div>
              <div className="text-sm text-muted-foreground">économisées par semaine</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}