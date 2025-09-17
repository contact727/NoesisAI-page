import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InlineWidget } from 'react-calendly';
import { track, ANALYTICS_EVENTS } from '@/utils/analytics';
import { ExternalLink } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const calendlyUrl = 'https://calendly.com/contact-noesisiai/30min';

  const handleCalendlyEvent = (event: any) => {
    if (event.data?.event === 'calendly.event_scheduled') {
      track(ANALYTICS_EVENTS.CALENDLY_SCHEDULED, {
        eventType: event.data.payload?.event_type?.name,
        invitee: event.data.payload?.invitee?.email,
      });
    }
  };

  const openInNewTab = () => {
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('message', handleCalendlyEvent);
      return () => window.removeEventListener('message', handleCalendlyEvent);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0" data-testid="modal-calendly">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Réserver votre audit gratuit</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={openInNewTab}
              className="gap-2"
              data-testid="button-calendly-external"
            >
              <ExternalLink className="h-4 w-4" />
              Ouvrir dans un nouvel onglet
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <InlineWidget
            url={calendlyUrl}
            styles={{
              height: '100%',
              minHeight: '500px',
            }}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '3b82f6',
              textColor: '4d5562'
            }}
            prefill={{
              name: '',
              email: '',
              customAnswers: {
                a1: 'Website - Modal',
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}