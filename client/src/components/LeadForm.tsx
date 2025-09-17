import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActions } from '@/hooks/useActions';
import { CheckCircle, Download, ExternalLink, Loader2, Mail } from 'lucide-react';

const leadFormSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().optional(),
  email: z.string().email('Email invalide'),
  company: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Vous devez accepter d\'être contacté par NOESIS AI'),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  onSuccess?: () => void;
  title?: string;
  description?: string;
}

export default function LeadForm({ onSuccess, title, description }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { submitLead, openGuide } = useActions();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      consent: false,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setError(null);
    
    const result = await submitLead({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      consent: data.consent,
    });

    if (result.ok) {
      setIsSubmitted(true);
      onSuccess?.();
    } else {
      setError(result.error || 'Une erreur est survenue');
    }
  };

  const handleOpenGuide = () => {
    openGuide();
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError(null);
    form.reset();
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg mx-auto" data-testid="card-lead-success">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Merci pour votre inscription !
          </h3>
          
          <p className="text-muted-foreground mb-8">
            Votre demande a été enregistrée avec succès. Vous pouvez maintenant accéder au guide ou le recevoir par email.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleOpenGuide}
              className="gap-2"
              data-testid="button-guide-open"
            >
              <ExternalLink className="h-4 w-4" />
              Ouvrir le guide maintenant
            </Button>
            
            <Button
              variant="outline"
              onClick={resetForm}
              data-testid="button-lead-reset"
            >
              Faire une nouvelle demande
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto" data-testid="card-lead-form">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          {title || 'Télécharger le guide gratuit'}
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre prénom"
                      {...field}
                      disabled={form.formState.isSubmitting}
                      data-testid="input-firstName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre nom (optionnel)"
                      {...field}
                      disabled={form.formState.isSubmitting}
                      data-testid="input-lastName"
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
                      disabled={form.formState.isSubmitting}
                      data-testid="input-email"
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
                      disabled={form.formState.isSubmitting}
                      data-testid="input-company"
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
                      disabled={form.formState.isSubmitting}
                      data-testid="checkbox-consent"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <Label
                      className="text-sm text-muted-foreground cursor-pointer"
                      onClick={() => field.onChange(!field.value)}
                    >
                      J'accepte d'être contacté par NOESIS AI au sujet du guide et de ressources associées. *
                    </Label>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {error && (
              <div
                className="text-sm text-red-600 bg-red-50 p-3 rounded-md"
                role="alert"
                aria-live="polite"
                data-testid="error-message"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={form.formState.isSubmitting}
              data-testid="button-lead-submit"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Télécharger le guide
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}