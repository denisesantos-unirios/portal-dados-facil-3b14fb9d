import { useState } from "react";
import { apiModules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { EndpointPanel } from "@/components/EndpointPanel";
import { ApiModule } from "@/types/api";
import { Database, ExternalLink, MessageSquare, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [selectedModule, setSelectedModule] = useState<ApiModule | null>(null);
  const [moduleSearch, setModuleSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">ComprasGov Explorer</span>
          </div>
          <nav className="flex items-center gap-4">
            <NavLink to="/" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">API Explorer</NavLink>
            <NavLink to="/documentacao" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Documentação</NavLink>
            <NavLink to="/forum" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Fórum</NavLink>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-8 sm:py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              Dados Abertos - Compras Gov
            </h1>
          </div>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Consulte informações públicas sobre compras governamentais, contratos, fornecedores e
            catálogos através da API de Dados Abertos do Governo Federal.
          </p>
          <a
            href="https://dadosabertos.compras.gov.br/swagger-ui/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            Ver documentação completa <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar - Modules */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-20">
              <h2 className="text-lg font-semibold mb-4 text-foreground text-center">Módulos</h2>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar módulos..."
                  value={moduleSearch}
                  onChange={(e) => setModuleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid gap-3 max-h-[calc(100vh-260px)] overflow-y-auto pr-2">
                {apiModules
                  .filter((module) =>
                    module.name.toLowerCase().includes(moduleSearch.toLowerCase()) ||
                    module.description.toLowerCase().includes(moduleSearch.toLowerCase())
                  )
                  .map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      isSelected={selectedModule?.id === module.id}
                      onClick={() => setSelectedModule(module)}
                    />
                  ))}
              </div>
            </div>
          </aside>

          {/* Content - Endpoint Panel */}
          <section className="lg:col-span-8 xl:col-span-9">
            {selectedModule ? (
              <EndpointPanel
                key={selectedModule.id}
                endpoints={selectedModule.endpoints}
                moduleName={selectedModule.name}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed border-border rounded-xl bg-muted/30">
                <Database className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  Selecione um módulo
                </h3>
                <p className="text-sm text-muted-foreground/70 mt-1 max-w-sm">
                  Escolha um módulo na lista ao lado para visualizar os endpoints disponíveis e
                  realizar consultas.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Forum CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Fórum de Discussões</h3>
                <p className="text-muted-foreground">
                  Tire dúvidas, compartilhe conhecimento e conecte-se com outros desenvolvedores.
                </p>
              </div>
            </div>
            <NavLink 
              to="/forum" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Acessar Fórum
              <MessageSquare className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-muted-foreground text-center">
            Dados fornecidos pelo Portal de Dados Abertos do Governo Federal •{" "}
            <a
              href="https://dadosabertos.compras.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              dadosabertos.compras.gov.br
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
