import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center pt-32 pb-20">
      <div className="container-page max-w-lg text-center">
        <p className="font-display text-7xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Page non trouvée</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été
          déplacée ou n'existe plus.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
