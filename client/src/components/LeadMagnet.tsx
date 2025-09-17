import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { Download, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // todo: remove mock functionality - integrate with real email service
      console.log('Lead magnet email submitted:', email);
      setIsSubmitted(true);
      
      // Reset after 3 seconds for demo
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
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
          </div>

          {/* Right side - Form */}
          <div>
            <Card className="bg-card/50 backdrop-blur-md border-2 border-primary/20">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-primary p-3">
                          <Download className="h-6 w-6 text-primary-foreground" />
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        Téléchargement Gratuit
                      </h4>
                      
                      <p className="text-sm text-muted-foreground">
                        Entrez votre email pour recevoir le guide complet sur l'automatisation IA
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="text-center"
                          data-testid="input-lead-email"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        data-testid="button-download-guide"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger le Guide Gratuit
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Pas de spam. Vous pouvez vous désabonner à tout moment.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-green-500/10 p-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      Merci !
                    </h4>
                    
                    <p className="text-muted-foreground">
                      Vérifiez votre boîte email. Le guide vous attend ! 📧
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Besoin d'une solution personnalisée ?
              </p>
              
              <Button variant="outline" asChild data-testid="button-custom-quote">
                <Link href="/contact">
                  Demander un devis sur mesure
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}