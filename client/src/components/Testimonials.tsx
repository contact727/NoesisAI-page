import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import avatar1 from '@assets/generated_images/Testimonial_avatar_male_executive_a1b7b7c5.png';
import avatar2 from '@assets/generated_images/Testimonial_avatar_female_executive_1ff73acb.png';
import avatar3 from '@assets/generated_images/Testimonial_avatar_young_professional_c9e132b0.png';

// todo: remove mock functionality
const testimonials = [
  {
    content: "NOESIS AI a transformé notre gestion administrative. Nous avons récupéré 15h par semaine que nous consacrons maintenant au développement commercial.",
    author: {
      name: "Pierre Dubois",
      role: "Directeur Général",
      company: "Bâtiment Pro",
      avatar: avatar1,
      initials: "PD"
    },
  },
  {
    content: "L'automatisation de notre saisie comptable nous fait économiser 80% de temps et a considérablement réduit les erreurs. Un investissement rapidement rentabilisé.",
    author: {
      name: "Marie Laurent",
      role: "Expert-Comptable",
      company: "Cabinet Laurent & Associés",
      avatar: avatar2,
      initials: "ML"
    },
  },
  {
    content: "Nos campagnes marketing sont maintenant pilotées par IA. Nous produisons 3x plus de contenus avec la même équipe. Résultats impressionnants !",
    author: {
      name: "Alex Chen",
      role: "Directeur Marketing",
      company: "Growth Agency",
      avatar: avatar3,
      initials: "AC"
    },
  },
];

export default function Testimonials() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary" data-testid="text-testimonials-eyebrow">
            Témoignages
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-testimonials-title">
            Ce que disent nos clients
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.author.name} className="hover-elevate transition-all duration-300" data-testid={`card-testimonial-${index}`}>
              <CardContent className="p-8">
                <blockquote className="text-muted-foreground text-sm leading-7 mb-6" data-testid={`text-testimonial-content-${index}`}>
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`text-testimonial-name-${index}`}>
                      {testimonial.author.name}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                      {testimonial.author.role}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-company-${index}`}>
                      {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}