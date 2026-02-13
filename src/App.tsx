import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Experiencias from "./pages/Experiencias";
import ExperienciaCategoria from "./pages/ExperienciaCategoria";
import ExperienciaSubcategoria from "./pages/ExperienciaSubcategoria";
import ExperienciaDetalle from "./pages/ExperienciaDetalle";
import TrenMaya from "./pages/TrenMaya";
import Packages from "./pages/Packages";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Destinos from "./pages/Destinos";
import Contacto from "./pages/Contacto";
import Itinerarios from "./pages/Itinerarios";
import ItinerarioCompartido from "./pages/ItinerarioCompartido";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/experiencias" element={<Experiencias />} />
          <Route path="/experiencias/:slugOrCategory" element={<ExperienciaCategoria />} />
          <Route path="/experiencias/:categorySlug/:subcategorySlug" element={<ExperienciaSubcategoria />} />
          <Route path="/tren-maya" element={<TrenMaya />} />
          <Route path="/paquetes" element={<Packages />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/itinerarios" element={<Itinerarios />} />
          <Route path="/itinerarios/:code" element={<ItinerarioCompartido />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
