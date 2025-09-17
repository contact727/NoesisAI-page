const tools = [
  { name: 'n8n', category: 'Automation' },
  { name: 'Make', category: 'Automation' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'Anthropic', category: 'AI' },
  { name: 'Perplexity', category: 'AI' },
  { name: 'Google Workspace', category: 'Productivity' },
  { name: 'Airtable', category: 'Database' },
  { name: 'Notion', category: 'Productivity' },
  { name: 'Zapier', category: 'Automation' },
];

export default function StackTools() {
  return (
    <div className="bg-muted/20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary" data-testid="text-stack-eyebrow">
            Technologies
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-stack-title">
            Stack & outils
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-stack-subtitle">
            Les meilleurs outils du marché pour créer vos automatisations sur-mesure.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-9">
          {tools.map((tool, index) => (
            <div 
              key={tool.name}
              className="col-span-1 flex justify-center"
              data-testid={`tool-${index}`}
            >
              <div className="bg-card rounded-lg p-6 hover-elevate transition-all duration-300 w-full text-center">
                <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-mono text-muted-foreground">
                    {tool.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-foreground" data-testid={`text-tool-name-${index}`}>
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1" data-testid={`text-tool-category-${index}`}>
                  {tool.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}