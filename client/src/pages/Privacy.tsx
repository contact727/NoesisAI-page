import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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
          <h1 className="text-4xl font-bold text-foreground mb-8">Politique de confidentialité</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Collecte des informations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Nous collectons des informations lorsque vous vous inscrivez sur notre site, remplissez un formulaire ou utilisez nos services d'automatisation IA.</p>
                <p>Les informations collectées incluent votre nom, votre adresse e-mail, votre entreprise et d'autres informations pertinentes pour nos services.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Utilisation des informations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Toute information que nous collectons auprès de vous peut être utilisée pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                  <li>Fournir un contenu publicitaire personnalisé</li>
                  <li>Améliorer notre site web</li>
                  <li>Améliorer le service client et vos besoins de prise en charge</li>
                  <li>Vous contacter par e-mail</li>
                  <li>Administrer un concours, une promotion, ou une enquête</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Confidentialité du commerce électronique</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Nous sommes les seuls propriétaires des informations collectées sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et/ou transaction.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Divulgation à des tiers</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierces parties de confiance qui nous aident à exploiter notre site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.</p>
                <p>Nous pensons qu'il est nécessaire de partager des informations afin d'enquêter, de prévenir ou de prendre des mesures concernant des activités illégales, fraudes présumées, situations impliquant des menaces potentielles à la sécurité physique de toute personne, violations de nos conditions d'utilisation, ou quand la loi nous y oblige.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Protection des informations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Nous utilisons des cookies pour améliorer votre expérience, recueillir des informations générales et démographiques, et surveiller le trafic web. Les cookies sont de petits fichiers qu'un site ou son fournisseur de services transfère sur le disque dur de votre ordinateur par l'intermédiaire de votre navigateur web (si vous le permettez).</p>
                <p>Vous pouvez choisir de désactiver les cookies via les paramètres de votre navigateur. Cependant, si vous désactivez les cookies, certaines fonctionnalités peuvent être désactivées.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Consentement</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications de notre politique de confidentialité</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Si nous décidons de changer notre politique de confidentialité, nous publierons ces changements sur cette page.</p>
                <p><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Nous contacter</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Par email : <a href="mailto:contact@noesisiai.pro" aria-label="Envoyer un email à contact@noesisiai.pro" className="text-primary hover:text-primary/80 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors" data-testid="link-privacy-email">contact@noesisiai.pro</a></li>
                  <li>Par téléphone : <a href="tel:+33689395623" aria-label="Appeler le +33 6 89 39 56 23" className="text-primary hover:text-primary/80 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors" data-testid="link-privacy-phone">+33 6 89 39 56 23</a></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}