import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  company: z.string().min(2, 'Le nom de société doit contenir au moins 2 caractères'),
  sector: z.string().min(1, 'Veuillez sélectionner un secteur'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  consent: z.boolean().refine(val => val === true, 'Vous devez accepter le traitement des données'),
});

type ContactForm = z.infer<typeof contactSchema>;

const sectors = [
  { value: 'construction', label: 'Construction / BTP' },
  { value: 'finance', label: 'Finance / Comptabilité' },
  { value: 'marketing', label: 'Marketing / Communication' },
  { value: 'retail', label: 'Commerce / E-commerce' },
  { value: 'hr', label: 'Ressources Humaines' },
  { value: 'healthcare', label: 'Santé / Médical' },
  { value: 'legal', label: 'Juridique / Notariat' },
  { value: 'consulting', label: 'Conseil / Services' },
  { value: 'manufacturing', label: 'Industrie / Production' },
  { value: 'other', label: 'Autre' },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      sector: '',
      message: '',
      consent: false,
    },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      console.log('Contact form submitted:', data);
      // todo: remove mock functionality - integrate with real form service
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center px-6 lg:px-8">
            <div className="rounded-lg bg-green-50 dark:bg-green-950 p-8">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-900 dark:text-green-100" data-testid="text-success-title">
                Merci pour votre message !
              </h2>
              <p className="mt-4 text-green-700 dark:text-green-300" data-testid="text-success-message">
                Nous avons bien reçu votre demande d'audit gratuit. Notre équipe vous contactera dans les 24h pour planifier un rendez-vous.
              </p>
              <Button 
                asChild 
                className="mt-6" 
                onClick={() => setIsSubmitted(false)}
                data-testid="button-back-home"
              >
                <a href="/">Retour à l'accueil</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
                      <h3 className="font-semibold text-foreground mb-2">Audit gratuit inclus</h3>
                      <p className="text-sm text-muted-foreground">
                        Nous analysons gratuitement vos processus actuels et identifions les opportunités d'automatisation les plus rentables.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="text-form-title">Demander un audit gratuit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Votre nom complet" 
                                    {...field} 
                                    data-testid="input-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="votre@email.com" 
                                    {...field} 
                                    data-testid="input-email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Société *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Nom de votre société" 
                                    {...field} 
                                    data-testid="input-company"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="sector"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Secteur d'activité *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-sector">
                                      <SelectValue placeholder="Sélectionnez votre secteur" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {sectors.map((sector) => (
                                      <SelectItem key={sector.value} value={sector.value}>
                                        {sector.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Décrivez vos besoins et les processus que vous souhaitez automatiser..."
                                  className="min-h-[120px]"
                                  {...field} 
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="consent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-consent"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm">
                                  J'accepte le traitement de mes données personnelles par NOESIS AI dans le cadre de cette demande, conformément à la politique de confidentialité. *
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full"
                          disabled={form.formState.isSubmitting}
                          data-testid="button-submit"
                        >
                          {form.formState.isSubmitting ? (
                            <>Envoi en cours...</>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Demander un audit gratuit
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}