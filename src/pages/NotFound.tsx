import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-24 sm:py-32">
        <div className="text-center px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <div className="text-6xl font-bold text-primary mb-4">404</div>
              <h1 className="text-2xl font-bold text-foreground mb-4" data-testid="text-404-title">
                Page non trouvée
              </h1>
              <p className="text-muted-foreground mb-8" data-testid="text-404-description">
                Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été déplacée ou n'existe plus.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild data-testid="button-back">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Link>
              </Button>
              
              <Button asChild variant="outline" data-testid="button-home">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}