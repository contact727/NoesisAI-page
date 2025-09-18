import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ExternalLink, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const bookingSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  company: z.string().optional(),
  industry: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Vous devez accepter le traitement des données'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingCalendlyProps {
  url?: string;
  mode?: 'popup' | 'inline';
  title?: string;
  description?: string;
}

const industries = [
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

// Déclarer les types globaux pour Calendly
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export default function BookingCalendly({
  url = 'https://calendly.com/contact-noesisiai/30min',
  mode = 'popup',
  title = 'Prendre un rendez-vous',
  description
}: BookingCalendlyProps) {
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [checkingCalendly, setCheckingCalendly] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      industry: '',
      message: '',
      consent: false,
    },
  });

  // Vérifier si Calendly est chargé
  const checkCalendlyLoaded = useCallback(() => {
    return !!window.Calendly;
  }, []);

  // Écouter les événements Calendly
  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      // Vérifier l'origine pour plus de sécurité
      if (e.origin !== 'https://calendly.com') return;
      
      if (e.data?.event && e.data.event === 'calendly.event_scheduled') {
        setIsBookingConfirmed(true);
        toast({
          title: "Rendez-vous confirmé !",
          description: "Merci, votre rendez-vous a été réservé avec succès.",
        });
        
        // Tracking Plausible
        window.plausible?.('booking_confirmed');
      }
    };

    window.addEventListener('message', handleCalendlyMessage);
    
    // Vérifier le chargement initial
    checkCalendlyLoaded();
    
    return () => {
      window.removeEventListener('message', handleCalendlyMessage);
    };
  }, [checkCalendlyLoaded, toast]);

  // Construire l'URL Calendly avec prefill
  const buildCalendlyUrl = (data: BookingFormData): string => {
    const calendlyUrl = new URL(url);
    
    // Prefill des champs
    calendlyUrl.searchParams.set('name', data.name);
    calendlyUrl.searchParams.set('email', data.email);
    
    // Custom answers pour les questions additionnelles
    if (data.company) {
      calendlyUrl.searchParams.set('a1', data.company);
    }
    if (data.industry) {
      calendlyUrl.searchParams.set('a2', data.industry);
    }
    if (data.message) {
      calendlyUrl.searchParams.set('a3', data.message);
    }
    
    // UTM tracking
    calendlyUrl.searchParams.set('utm_source', 'noesisai.fr');
    calendlyUrl.searchParams.set('utm_medium', 'site');
    calendlyUrl.searchParams.set('utm_campaign', 'booking');
    
    return calendlyUrl.toString();
  };

  // Attendre que Calendly soit chargé
  const waitForCalendly = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (checkCalendlyLoaded()) {
        resolve(true);
        return;
      }
      
      let attempts = 0;
      const maxAttempts = 50; // 5 secondes max
      
      const checkInterval = setInterval(() => {
        attempts++;
        
        if (checkCalendlyLoaded()) {
          clearInterval(checkInterval);
          resolve(true);
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          resolve(false);
        }
      }, 100);
    });
  };

  const onSubmit = async (data: BookingFormData) => {
    // Tracking Plausible
    window.plausible?.('booking_start');
    
    const calendlyUrl = buildCalendlyUrl(data);
    
    setCheckingCalendly(true);
    
    // Attendre que Calendly soit chargé
    const calendlyReady = await waitForCalendly();
    
    setCheckingCalendly(false);
    
    if (!calendlyReady) {
      toast({
        title: "Erreur de chargement",
        description: "Le widget Calendly n'a pas pu se charger. Utilisez le lien direct ci-dessous.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (mode === 'popup') {
        window.Calendly!.initPopupWidget({ url: calendlyUrl });
      } else if (mode === 'inline') {
        const inlineElement = document.getElementById('calendly-inline-widget');
        if (inlineElement) {
          window.Calendly!.initInlineWidget({
            url: calendlyUrl,
            parentElement: inlineElement
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture de Calendly:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ouvrir le calendrier. Utilisez le lien direct ci-dessous.",
        variant: "destructive",
      });
    }
  };

  if (isBookingConfirmed) {
    return (
      <Card className="w-full max-w-lg mx-auto" data-testid="card-booking-success">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Rendez-vous confirmé !
          </h3>
          
          <p className="text-muted-foreground mb-8">
            Merci ! Votre rendez-vous a été réservé avec succès. Vous devriez recevoir un email de confirmation sous peu.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setIsBookingConfirmed(false)}
              variant="outline"
              data-testid="button-booking-reset"
            >
              Prendre un autre rendez-vous
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Card className="w-full max-w-lg mx-auto" data-testid="card-booking-form">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {title}
          </CardTitle>
          {description && (
            <p className="text-muted-foreground text-sm mt-2">
              {description}
            </p>
          )}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom complet"
                        {...field}
                        disabled={form.formState.isSubmitting || checkingCalendly}
                        data-testid="input-name"
                        aria-label="Nom complet"
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
                        disabled={form.formState.isSubmitting || checkingCalendly}
                        data-testid="input-email"
                        aria-label="Adresse email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Société</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nom de votre société (optionnel)"
                        {...field}
                        disabled={form.formState.isSubmitting || checkingCalendly}
                        data-testid="input-company"
                        aria-label="Nom de société"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secteur d'activité</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={form.formState.isSubmitting || checkingCalendly}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-industry" aria-label="Secteur d'activité">
                          <SelectValue placeholder="Sélectionnez votre secteur (optionnel)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez brièvement vos besoins ou questions (optionnel)"
                        className="min-h-[100px]"
                        {...field}
                        disabled={form.formState.isSubmitting || checkingCalendly}
                        data-testid="textarea-message"
                        aria-label="Message ou questions"
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
                        disabled={form.formState.isSubmitting || checkingCalendly}
                        data-testid="checkbox-consent"
                        aria-label="Consentement traitement des données"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <Label
                        className="text-sm text-muted-foreground cursor-pointer"
                        onClick={() => field.onChange(!field.value)}
                      >
                        J'accepte le traitement de mes données personnelles par NOESIS AI dans le cadre de cette prise de rendez-vous. *
                      </Label>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={form.formState.isSubmitting || checkingCalendly || !form.watch('consent')}
                data-testid="button-booking-submit"
                aria-label="Prendre rendez-vous"
              >
                {form.formState.isSubmitting || checkingCalendly ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {checkingCalendly ? 'Chargement du calendrier...' : 'Préparation...'}
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Prendre rendez-vous
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Lien fallback */}
          <div className="mt-4 text-center">
            <a
              href={buildCalendlyUrl(form.getValues())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline opacity-70 hover:opacity-100 inline-flex items-center gap-1"
              data-testid="link-calendly-fallback"
            >
              <ExternalLink className="h-3 w-3" />
              Ouvrir Calendly dans un nouvel onglet
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Inline widget container */}
      {mode === 'inline' && (
        <div 
          id="calendly-inline-widget" 
          className="h-[720px] w-full rounded-xl border bg-background"
          data-testid="calendly-inline-widget"
        />
      )}
    </div>
  );
}