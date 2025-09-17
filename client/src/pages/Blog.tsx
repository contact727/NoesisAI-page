import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';

// todo: remove mock functionality
const blogPosts = [
  {
    id: 1,
    title: 'Comment automatiser votre facturation avec n8n',
    excerpt: 'Découvrez étape par étape comment créer un workflow automatisé pour vos factures et gagner des heures chaque mois.',
    content: `# Comment automatiser votre facturation avec n8n

    L'automatisation de la facturation est l'une des premières étapes vers une gestion d'entreprise plus efficace...

    ## Table des matières
    1. Préparation de votre environnement
    2. Configuration du webhook
    3. Intégration avec votre CRM
    4. Génération automatique des PDF
    5. Envoi par email

    ## Préparation de votre environnement

    Avant de commencer, vous aurez besoin de...
    `,
    category: 'Tutoriel',
    author: 'NOESIS AI',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['n8n', 'Automatisation', 'Facturation'],
  },
  {
    id: 2,
    title: 'Les 5 erreurs courantes en automatisation IA',
    excerpt: 'Évitez ces pièges fréquents lors de la mise en place de vos premiers workflows d\'automatisation.',
    content: `# Les 5 erreurs courantes en automatisation IA

    Après avoir accompagné plus de 100 entreprises dans leur transformation...
    `,
    category: 'Guide',
    author: 'NOESIS AI',
    publishedAt: '2024-01-10',
    readTime: 5,
    tags: ['IA', 'Bonnes pratiques', 'Erreurs'],
  },
  {
    id: 3,
    title: 'ROI de l\'automatisation : calcul et métriques',
    excerpt: 'Apprenez à mesurer concrètement le retour sur investissement de vos projets d\'automatisation.',
    content: `# ROI de l'automatisation : calcul et métriques

    Calculer le ROI de vos automatisations est essentiel...
    `,
    category: 'Business',
    author: 'NOESIS AI',
    publishedAt: '2024-01-05',
    readTime: 12,
    tags: ['ROI', 'Métriques', 'Business'],
  },
  {
    id: 4,
    title: 'Make vs n8n : comparatif complet 2024',
    excerpt: 'Analyse détaillée des deux plateformes d\'automatisation les plus populaires du marché.',
    content: `# Make vs n8n : comparatif complet 2024

    Le choix de la plateforme d'automatisation est crucial...
    `,
    category: 'Comparatif',
    author: 'NOESIS AI',
    publishedAt: '2024-01-01',
    readTime: 15,
    tags: ['Make', 'n8n', 'Comparaison'],
  },
  {
    id: 5,
    title: 'Agents vocaux IA : guide du débutant',
    excerpt: 'Créez votre premier agent vocal intelligent capable de prendre des appels et réserver des RDV.',
    content: `# Agents vocaux IA : guide du débutant

    Les agents vocaux révolutionnent la relation client...
    `,
    category: 'Tutoriel',
    author: 'NOESIS AI',
    publishedAt: '2023-12-28',
    readTime: 10,
    tags: ['Agent vocal', 'IA', 'Téléphonie'],
  },
  {
    id: 6,
    title: 'RGPD et automatisation : ce qu\'il faut savoir',
    excerpt: 'Guide complet pour rester conforme au RGPD lors de la mise en place de vos automatisations.',
    content: `# RGPD et automatisation : ce qu'il faut savoir

    La conformité RGPD est un enjeu majeur...
    `,
    category: 'Légal',
    author: 'NOESIS AI',
    publishedAt: '2023-12-25',
    readTime: 7,
    tags: ['RGPD', 'Conformité', 'Données'],
  },
];

const categories = [
  { value: 'all', label: 'Tous les articles' },
  { value: 'Tutoriel', label: 'Tutoriels' },
  { value: 'Guide', label: 'Guides' },
  { value: 'Business', label: 'Business' },
  { value: 'Comparatif', label: 'Comparatifs' },
  { value: 'Légal', label: 'Légal' },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedPostData = selectedPost ? blogPosts.find(p => p.id === selectedPost) : null;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-background to-muted/20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl" data-testid="text-blog-title">
                Blog
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-blog-subtitle">
                Guides pratiques, tutoriels et insights sur l'automatisation IA pour booster votre productivité.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="py-8 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    data-testid={`button-filter-${category.value}`}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="hover-elevate transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedPost(post.id)}
                  data-testid={`card-post-${post.id}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" data-testid={`badge-category-${post.id}`}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2" data-testid={`text-post-title-${post.id}`}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm leading-6 line-clamp-3" data-testid={`text-post-excerpt-${post.id}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <span>Par {post.author}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tag} variant="outline" className="text-xs" data-testid={`badge-tag-${post.id}-${tagIndex}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground" data-testid="text-no-results">
                  Aucun article trouvé pour votre recherche.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Article Detail Modal */}
        {selectedPostData && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} data-testid="modal-post-detail">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">
                    {selectedPostData.category}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPost(null)} data-testid="button-close-modal">
                    ×
                  </Button>
                </div>
                <CardTitle className="text-3xl leading-tight" data-testid="text-modal-title">
                  {selectedPostData.title}
                </CardTitle>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedPostData.publishedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{selectedPostData.readTime} min de lecture</span>
                  </div>
                  <span>Par {selectedPostData.author}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="prose prose-sm max-w-none" data-testid="text-modal-content">
                  <div className="whitespace-pre-line">
                    {selectedPostData.content}
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="text-sm font-semibold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPostData.tags.map((tag, index) => (
                      <Badge key={tag} variant="outline" data-testid={`badge-modal-tag-${index}`}>
                        {tag}
                      </Badge>
                    ))}
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