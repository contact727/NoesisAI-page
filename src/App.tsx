import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { MentionsLegales } from "./pages/MentionsLegales";
import { Confidentialite } from "./pages/Confidentialite";
import { Cgu } from "./pages/Cgu";
import { NotFound } from "./pages/NotFound";
import { DiagnosticIA } from "./pages/DiagnosticIA";

/** Remonte en haut à chaque changement de route (sauf ancres #). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Chrome public du site : barre de navigation + pied de page. */
function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Ressource cloisonnée : hors du layout public, donc sans
            aucun lien de navigation vers ou depuis le reste du site.
            Accessible uniquement via son URL directe. */}
        <Route path="/diagnostic-ia" element={<DiagnosticIA />} />

        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgu" element={<Cgu />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
