import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Mail } from 'lucide-react';

export default function LeadMagnet() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead magnet form submitted:', formData);
    // todo: remove mock functionality - integrate with real email service
    alert('Merci ! Vous recevrez le guide dans quelques minutes.');
    setIsOpen(false);
  };

  return (
    <div className="bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Download className="mx-auto h-12 w-12 text-primary-foreground mb-8" />
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl" data-testid="text-magnet-title">
            Le guide pratique : 12 automatisations IA prêtes à déployer
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-foreground/80" data-testid="text-magnet-subtitle">
            Cas concrets, architecture, coûts, KPI. Tout ce dont vous avez besoin pour commencer dès aujourd'hui.
          </p>
          
          <div className="mt-10">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" data-testid="button-download-guide">
                  <Download className="mr-2 h-5 w-5" />
                  Recevoir le guide gratuit
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md" data-testid="modal-lead-magnet">
                <DialogHeader>
                  <DialogTitle className="text-center">Télécharger le guide</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre@email.com"
                        data-testid="input-email"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Société</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nom de votre société"
                        data-testid="input-company"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consent"
                        required
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({ ...formData, consent: !!checked })}
                        data-testid="checkbox-consent"
                      />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground">
                        J'accepte de recevoir des informations de NOESIS AI *
                      </Label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" data-testid="button-submit-guide">
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer le guide
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}