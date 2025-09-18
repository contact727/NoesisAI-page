import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Qu'est-ce que l'automatisation IA ?",
      answer: "L'automatisation IA combine l'intelligence artificielle et l'automatisation pour créer des solutions qui peuvent traiter, analyser et réagir aux données de manière autonome. Elle permet d'automatiser des tâches complexes qui nécessitaient auparavant une intervention humaine, comme la gestion de documents, l'analyse de données ou la prise de décision basée sur des critères spécifiques."
    },
    {
      question: "Comment fonctionne un audit d'automatisation ?",
      answer: "Notre audit se déroule en plusieurs étapes : analyse de vos processus actuels, identification des tâches répétitives et chronophages, évaluation du potentiel d'automatisation, calcul du ROI estimé et présentation d'un plan d'action personnalisé. Cette démarche nous permet de cibler les automatisations les plus rentables pour votre entreprise."
    },
    {
      question: "Quels sont les bénéfices de l'automatisation pour mon entreprise ?",
      answer: "L'automatisation IA offre de nombreux avantages : réduction des coûts opérationnels (jusqu'à 60%), gain de temps significatif (15-30h par semaine), diminution des erreurs humaines, amélioration de la productivité, libération de vos équipes pour des tâches à plus forte valeur ajoutée, et disponibilité 24h/24 des processus automatisés."
    },
    {
      question: "Proposez-vous des formations ?",
      answer: "Oui, nous proposons des formations personnalisées pour vos équipes sur l'utilisation des outils d'automatisation IA. Ces formations couvrent les bonnes pratiques, l'optimisation des workflows, la maintenance des automatisations et l'exploitation maximale des solutions déployées."
    },
    {
      question: "Avez-vous des exemples concrets d'automatisations réussies ?",
      answer: "Nous avons accompagné de nombreuses entreprises : automatisation de la facturation pour un cabinet comptable (économie de 25h/semaine), agent vocal IA pour une clinique dentaire (80% d'appels traités automatiquement), workflow de gestion documentaire pour un cabinet juridique (réduction de 70% du temps de traitement)."
    },
    {
      question: "Mon entreprise a des processus très spécifiques. L'automatisation IA est-elle adaptée ?",
      answer: "Absolument ! L'un des grands avantages de l'automatisation IA moderne est sa capacité d'adaptation. Nous créons des solutions sur mesure qui s'intègrent parfaitement à vos processus existants, quelle que soit la spécificité de votre secteur d'activité."
    },
    {
      question: "Qu'en est-il de la sécurité de mes données ?",
      answer: "La sécurité de vos données est notre priorité absolue. Toutes nos solutions respectent le RGPD et les standards de sécurité les plus élevés. Nous utilisons des connexions chiffrées, des serveurs sécurisés et pouvons déployer des solutions on-premise si nécessaire pour garantir une confidentialité maximale."
    },
    {
      question: "Combien de temps faut-il pour mettre en place une automatisation ?",
      answer: "Le délai varie selon la complexité du projet : automatisations simples (1-2 semaines), projets moyens (3-6 semaines), solutions complexes (2-3 mois). Nous privilégions une approche itérative avec des livraisons rapides pour que vous puissiez bénéficier des premiers résultats dès que possible."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div id="faq" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <HelpCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6" data-testid="text-faq-title">
            F.A.Q
          </h2>
          
          <p className="text-xl leading-8 text-muted-foreground" data-testid="text-faq-subtitle">
            Une question ? Trouvez toutes les réponses sur l'automatisation IA et nos services.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full p-6 text-left hover-elevate active-elevate-2 transition-all duration-200"
                  onClick={() => toggleQuestion(index)}
                  data-testid={`button-faq-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground pr-4" data-testid={`text-question-${index}`}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openQuestion === index ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openQuestion === index && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="border-t border-border pt-4">
                      <p className="text-muted-foreground leading-relaxed" data-testid={`text-answer-${index}`}>
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover-elevate active-elevate-2 transition-all duration-200"
              data-testid="button-contact-us"
            >
              Contactez-nous
            </a>
            <a
              href="mailto:contact@noesisiai.pro"
              className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover-elevate active-elevate-2 transition-all duration-200"
              data-testid="button-email-us"
            >
              contact@noesisiai.pro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}