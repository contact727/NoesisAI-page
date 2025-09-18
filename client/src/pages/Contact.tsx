import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingCalendly from '@/components/BookingCalendly';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact – NOESIS AI</title>
        <meta name="description" content="Parlons de vos automatisations IA. Réponse en 24–48h. Audit gratuit sur demande." />
        <link rel="canonical" href="https://noesisai.fr/contact" />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-background to-muted/20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" data-testid="text-contact-title">
                Contactez-nous
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-contact-subtitle">
                Prêt à transformer vos processus ? Commencez par un audit gratuit de vos workflows actuels.
              </p>
            </div>
          </div>
        </div>

        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="text-info-title">
                      Parlons de votre projet
                    </h2>
                    <p className="text-muted-foreground mb-8" data-testid="text-info-description">
                      Notre équipe d'experts en automatisation IA est là pour vous accompagner dans votre transformation digitale.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Mail className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Email</div>
                        <div className="text-muted-foreground">contact@noesisiai.pro</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Phone className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Téléphone</div>
                        <div className="text-muted-foreground">+33 6 89 39 56 23</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Clock className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Horaires</div>
                        <div className="text-muted-foreground">Lun-Ven 9h-18h</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Localisation</div>
                        <div className="text-muted-foreground">Paris, France</div>
                      </div>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">Consultation gratuite</h3>
                      <p className="text-sm text-muted-foreground">
                        Réservez un rendez-vous de 30 minutes pour discuter de vos besoins et identifier les opportunités d'automatisation les plus rentables.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Booking Form */}
              <div className="lg:col-span-2">
                <BookingCalendly
                  title="Prendre un rendez-vous"
                  description="Réservez un créneau de 30 minutes pour discuter de vos besoins en automatisation IA"
                  mode="popup"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}