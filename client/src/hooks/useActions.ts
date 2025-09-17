import { useState } from 'react';
import { track, ANALYTICS_EVENTS } from '@/utils/analytics';

interface LeadFormData {
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  consent: boolean;
}

interface SubmitLeadResult {
  ok: boolean;
  error?: string;
}

export function useActions() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  
  const openMailto = (subject?: string, body?: string) => {
    const email = import.meta.env.VITE_CONTACT_EMAIL ?? 'contact@noesisai.pro';
    const encodedSubject = encodeURIComponent(subject || 'Demande d\'information NOESIS AI');
    const encodedBody = encodeURIComponent(body || 'Bonjour NOESIS AI, je souhaite en savoir plus sur vos services d\'automatisation.');
    
    const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = mailtoUrl;
    
    track(ANALYTICS_EVENTS.EMAIL_CLICK, { email, subject, body });
  };

  const openCalendlyModal = () => {
    setIsCalendlyOpen(true);
    track(ANALYTICS_EVENTS.CALENDLY_OPEN);
  };

  const closeCalendlyModal = () => {
    setIsCalendlyOpen(false);
  };

  const openSocial = (url: string, platform?: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    if (platform) {
      track(platform === 'linkedin' ? ANALYTICS_EVENTS.LINKEDIN_CLICK : ANALYTICS_EVENTS.INSTAGRAM_CLICK, { url });
    }
  };

  const submitLead = async (formData: LeadFormData): Promise<SubmitLeadResult> => {
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName || '',
        email: formData.email,
        company: formData.company || '',
        consent: formData.consent,
        source: 'website:noesisai',
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      let response: Response;

      // Option A: Formspree
      if (import.meta.env.VITE_FORMSPREE_ENDPOINT) {
        response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Option B: Internal API
        response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok || response.status === 201) {
        track(ANALYTICS_EVENTS.LEAD_SUBMITTED, { email: formData.email, source: payload.source });
        return { ok: true };
      } else {
        const errorText = await response.text().catch(() => 'Network error');
        console.error('Lead submission failed:', response.status, errorText);
        return { ok: false, error: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.' };
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      return { ok: false, error: 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.' };
    }
  };

  const openGuide = () => {
    const guideUrl = 'https://www.notion.so/NoesisAI-Guide-2705602ff08580108940e7de5c7a95ed?source=copy_link';
    window.open(guideUrl, '_blank', 'noopener,noreferrer');
    track(ANALYTICS_EVENTS.GUIDE_OPENED, { url: guideUrl });
  };

  return {
    openMailto,
    openCalendlyModal,
    closeCalendlyModal,
    isCalendlyOpen,
    openSocial,
    submitLead,
    openGuide,
  };
}