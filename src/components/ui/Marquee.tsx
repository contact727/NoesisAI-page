/**
 * Bande défilante infinie. Le contenu est dupliqué et l'animation
 * translate de 0 à -50%, ce qui donne un défilement sans couture.
 */
export function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="mask-fade-x overflow-hidden">
      <div className="marquee-track flex w-max animate-marquee gap-5">
        <div className="flex shrink-0 gap-5">{children}</div>
        <div className="flex shrink-0 gap-5" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
