import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Mentions légales</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Informations légales</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>Raison sociale :</strong> NOESIS AI</p>
                <p><strong>Adresse :</strong> Paris, France</p>
                <p><strong>Email :</strong> <a href="mailto:contact@noesisiai.pro" aria-label="Envoyer un email à contact@noesisiai.pro" className="text-primary hover:text-primary/80 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors" data-testid="link-legal-email">contact@noesisiai.pro</a></p>
                <p><strong>Téléphone :</strong> <a href="tel:+33689395623" aria-label="Appeler le +33 6 89 39 56 23" className="text-primary hover:text-primary/80 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors" data-testid="link-legal-phone">+33 6 89 39 56 23</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Hébergement</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Ce site est hébergé par Replit, Inc.</p>
                <p>Adresse : 767 Bryant St. #203, San Francisco, CA 94107, États-Unis</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Propriété intellectuelle</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Le contenu de ce site web (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de NOESIS AI, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou tiers.</p>
                <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Responsabilité</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes ou des omissions.</p>
                <p>NOESIS AI ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Liens hypertextes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de NOESIS AI.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Droit applicable</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}