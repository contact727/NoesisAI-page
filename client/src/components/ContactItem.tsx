import { type LucideIcon } from 'lucide-react';

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  ariaLabel?: string;
  className?: string;
}

export default function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  ariaLabel,
  className = ""
}: ContactItemProps) {
  const baseClasses = "flex items-center gap-4";
  const contentClasses = href 
    ? "group hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md transition-colors duration-200 p-3 -m-3" 
    : "";

  const content = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <div className="font-medium text-foreground">{label}</div>
        <div className={href ? "text-muted-foreground group-hover:text-primary transition-colors" : "text-muted-foreground"}>{value}</div>
      </div>
    </>
  );

  if (href) {
    return (
      <div className={`${baseClasses} ${className}`}>
        <a
          href={href}
          aria-label={ariaLabel || `${label}: ${value}`}
          className={contentClasses}
          data-testid={`link-${label.toLowerCase()}`}
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`} data-testid={`item-${label.toLowerCase()}`}>
      {content}
    </div>
  );
}