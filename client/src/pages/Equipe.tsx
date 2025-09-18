import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Linkedin } from 'lucide-react';
import { Link } from 'wouter';
// import ugoPhoto from '@assets/ugo-sartini.png'; // Image à corriger

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  linkedin: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ugo Sartini',
    role: 'Co founder',
    photo: undefined, // Image à ajouter
    linkedin: 'https://www.linkedin.com/in/ugo-sartini-04a14620a/',
    initials: 'US'
  },
  {
    name: 'Karim Kraiouh',
    role: 'Co founder',
    photo: undefined, // Photo à ajouter
    linkedin: 'https://www.linkedin.com/in/karim-k-702890198/',
    initials: 'KK'
  }
];

export default function Equipe() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" data-testid="text-team-title">
                Notre équipe
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-team-subtitle">
                Les experts derrière NOESIS AI, passionnés par l'innovation et l'automatisation intelligente.
              </p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
                {teamMembers.map((member, index) => (
                  <Card key={member.name} className="max-w-sm w-full hover-elevate" data-testid={`card-team-member-${index}`}>
                    <CardContent className="p-8">
                      <div className="text-center">
                        {/* Avatar */}
                        <div className="mb-6">
                          <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
                            {member.photo && (
                              <AvatarImage 
                                src={member.photo} 
                                alt={member.name}
                                className="object-cover"
                              />
                            )}
                            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        
                        {/* Name & Role */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`text-member-name-${index}`}>
                            {member.name}
                          </h3>
                          <p className="text-lg text-muted-foreground font-medium" data-testid={`text-member-role-${index}`}>
                            {member.role}
                          </p>
                        </div>
                        
                        {/* LinkedIn Button */}
                        <Button 
                          variant="outline" 
                          size="lg"
                          asChild
                          className="w-full"
                          data-testid={`button-linkedin-${index}`}
                        >
                          <a 
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Linkedin className="w-5 h-5" />
                            Voir le profil LinkedIn
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-muted py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-team-cta-title">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-team-cta-subtitle">
                Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale.
              </p>
              <div className="mt-10">
                <Button size="lg" asChild data-testid="button-team-cta">
                  <Link href="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}