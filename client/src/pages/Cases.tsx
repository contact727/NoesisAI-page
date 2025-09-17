import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building2, Calculator, Megaphone, ShoppingCart, Users, Stethoscope, Clock, TrendingUp, TrendingDown } from 'lucide-react';

// todo: remove mock functionality
const caseStudies = [
  {
    id: 1,
    title: 'PME Bâtiment Pro',
    category: 'Construction',
    sector: 'construction',
    icon: Building2,
    summary: 'Automatisation complète de la gestion administrative et du SAV.',
    context: 'Entreprise de 25 employés avec 70% du temps consacré aux tâches administratives.',
    objectives: ['Réduire le temps administratif', 'Améliorer la réactivité SAV', 'Optimiser la facturation'],
    solution: 'Mise en place d\'un workflow n8n connecté à leur CRM, automatisation des devis et facturation.',
    results: [
      { metric: 'Temps admin', value: '-70%', trend: 'down' },
      { metric: 'Réactivité SAV', value: '+30%', trend: 'up' },
      { metric: 'Satisfaction client', value: '+25%', trend: 'up' },
    ],
    stack: ['n8n', 'Airtable', 'Gmail API', 'Slack'],
    timeline: '6 semaines',
  },
  {
    id: 2,
    title: 'Cabinet Laurent & Associés',
    category: 'Finance',
    sector: 'finance',
    icon: Calculator,
    summary: 'Saisie automatique des factures et réduction des erreurs.',
    context: 'Cabinet comptable traitant 500+ factures mensuelles avec nombreuses erreurs de saisie.',
    objectives: ['Automatiser la saisie', 'Réduire les erreurs', 'Accélérer le traitement'],
    solution: 'OCR intelligent + validation IA pour extraction automatique des données factures.',
    results: [
      { metric: 'Saisie automatique', value: '100%', trend: 'up' },
      { metric: 'Erreurs', value: '-80%', trend: 'down' },
      { metric: 'Temps traitement', value: '-60%', trend: 'down' },
    ],
    stack: ['Make', 'OpenAI', 'Google Drive', 'Sage'],
    timeline: '4 semaines',
  },
  {
    id: 3,
    title: 'Growth Agency',
    category: 'Marketing',
    sector: 'marketing',
    icon: Megaphone,
    summary: 'Génération et publication de contenu semi-automatisée.',
    context: 'Agence marketing gérant 15 comptes clients avec besoin de contenu constant.',
    objectives: ['Automatiser la création', 'Planifier les publications', 'Analyser les performances'],
    solution: 'Pipeline IA pour génération de contenu + programmation automatique sur réseaux sociaux.',
    results: [
      { metric: 'Productivité', value: '+150%', trend: 'up' },
      { metric: 'Temps création', value: '-60%', trend: 'down' },
      { metric: 'Engagement', value: '+40%', trend: 'up' },
    ],
    stack: ['Zapier', 'OpenAI', 'Buffer', 'Google Analytics'],
    timeline: '5 semaines',
  },
  {
    id: 4,
    title: 'E-commerce Fashion',
    category: 'Retail',
    sector: 'retail',
    icon: ShoppingCart,
    summary: 'Automatisation de la gestion stock et relation client.',
    context: 'Boutique en ligne avec problèmes de ruptures stock et SAV chronophage.',
    objectives: ['Optimiser le stock', 'Automatiser le SAV', 'Personnaliser l\'expérience'],
    solution: 'Système prédictif de gestion stock + chatbot IA pour support client 24/7.',
    results: [
      { metric: 'Ruptures stock', value: '-85%', trend: 'down' },
      { metric: 'Temps SAV', value: '-70%', trend: 'down' },
      { metric: 'CA', value: '+35%', trend: 'up' },
    ],
    stack: ['n8n', 'Shopify', 'Anthropic', 'Zendesk'],
    timeline: '8 semaines',
  },
  {
    id: 5,
    title: 'Agence RH Talents',
    category: 'RH',
    sector: 'hr',
    icon: Users,
    summary: 'Automatisation du recrutement et onboarding.',
    context: 'Cabinet RH avec processus recrutement long et onboarding manuel.',
    objectives: ['Accélérer le sourcing', 'Automatiser les entretiens', 'Fluidifier l\'onboarding'],
    solution: 'IA de matching candidats + entretiens vidéo automatisés + parcours onboarding.',
    results: [
      { metric: 'Temps recrutement', value: '-50%', trend: 'down' },
      { metric: 'Qualité matching', value: '+65%', trend: 'up' },
      { metric: 'Satisfaction RH', value: '+45%', trend: 'up' },
    ],
    stack: ['Make', 'LinkedIn API', 'Zoom', 'Notion'],
    timeline: '7 semaines',
  },
  {
    id: 6,
    title: 'Clinique Santé Plus',
    category: 'Santé',
    sector: 'healthcare',
    icon: Stethoscope,
    summary: 'Automatisation des rendez-vous et suivi patients.',
    context: 'Clinique avec gestion RDV complexe et suivi patients insuffisant.',
    objectives: ['Optimiser la prise de RDV', 'Automatiser les rappels', 'Améliorer le suivi'],
    solution: 'Système intelligent de réservation + rappels automatiques + suivi post-consultation.',
    results: [
      { metric: 'Taux occupation', value: '+30%', trend: 'up' },
      { metric: 'No-show', value: '-75%', trend: 'down' },
      { metric: 'Satisfaction patients', value: '+40%', trend: 'up' },
    ],
    stack: ['n8n', 'Calendly', 'Twilio', 'DoctoLib'],
    timeline: '6 semaines',
  },
];

const sectors = [
  { value: 'all', label: 'Tous les secteurs' },
  { value: 'construction', label: 'Construction' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'retail', label: 'Retail' },
  { value: 'hr', label: 'RH' },
  { value: 'healthcare', label: 'Santé' },
];

export default function Cases() {
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const filteredCases = selectedSector === 'all' 
    ? caseStudies 
    : caseStudies.filter(c => c.sector === selectedSector);

  const selectedCaseData = selectedCase ? caseStudies.find(c => c.id === selectedCase) : null;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-background to-muted/20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" data-testid="text-cases-title">
                Études de cas
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-cases-subtitle">
                Découvrez comment nos clients ont transformé leurs opérations grâce à nos automatisations IA.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="py-8 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {sectors.map((sector) => (
                <Button
                  key={sector.value}
                  variant={selectedSector === sector.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSector(sector.value)}
                  data-testid={`button-filter-${sector.value}`}
                >
                  {sector.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {filteredCases.map((study, index) => (
                <Card 
                  key={study.id} 
                  className="hover-elevate transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedCase(study.id)}
                  data-testid={`card-case-${study.id}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <study.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <Badge variant="secondary" data-testid={`badge-category-${study.id}`}>
                        {study.category}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors" data-testid={`text-case-title-${study.id}`}>
                      {study.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-sm leading-6" data-testid={`text-case-summary-${study.id}`}>
                      {study.summary}
                    </p>
                    
                    <div className="space-y-3">
                      {study.results.slice(0, 2).map((result, resultIndex) => (
                        <div key={result.metric} className="flex items-center justify-between" data-testid={`metric-${study.id}-${resultIndex}`}>
                          <div className="flex items-center gap-2">
                            {result.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm text-muted-foreground">{result.metric}</span>
                          </div>
                          <span className={`font-semibold ${
                            result.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {result.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{study.timeline}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Detail Modal */}
        {selectedCaseData && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} data-testid="modal-case-detail">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                      <selectedCaseData.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl" data-testid="text-modal-title">
                        {selectedCaseData.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {selectedCaseData.category}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCase(null)} data-testid="button-close-modal">
                    ×
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contexte</h3>
                  <p className="text-muted-foreground" data-testid="text-modal-context">
                    {selectedCaseData.context}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Objectifs</h3>
                  <ul className="space-y-2">
                    {selectedCaseData.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center text-muted-foreground" data-testid={`text-objective-${index}`}>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Solution</h3>
                  <p className="text-muted-foreground" data-testid="text-modal-solution">
                    {selectedCaseData.solution}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Résultats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedCaseData.results.map((result, index) => (
                      <Card key={result.metric} data-testid={`result-card-${index}`}>
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center mb-2">
                            {result.trend === 'up' ? (
                              <TrendingUp className="h-5 w-5 text-green-500" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div className={`text-2xl font-bold ${
                            result.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {result.value}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {result.metric}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Stack technique</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseData.stack.map((tech, index) => (
                      <Badge key={tech} variant="outline" data-testid={`badge-tech-${index}`}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Timeline</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span data-testid="text-modal-timeline">{selectedCaseData.timeline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}