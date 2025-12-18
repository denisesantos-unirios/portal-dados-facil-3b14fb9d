import { useState } from "react";
import { apiModules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { ModuleSystemView } from "@/components/ModuleSystemView";
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
            <NavLink to="/" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Sistema</NavLink>
            <NavLink to="/documentacao" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Documentação</NavLink>
            <NavLink to="/backlog" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Backlog</NavLink>
            <NavLink to="/forum" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Fórum</NavLink>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <Database className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              Sistema de Consultas - Compras Gov
            </h1>
          </div>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-sm">
            Consulte informações públicas sobre compras governamentais, contratos, fornecedores e catálogos.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar - Modules */}
          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="sticky top-20">
              <h2 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
                <Database className="h-4 w-4" />
                Módulos do Sistema
              </h2>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar módulos..."
                  value={moduleSearch}
                  onChange={(e) => setModuleSearch(e.target.value)}
                  className="pl-10 h-9 text-sm"
                />
              </div>
              <div className="grid gap-2 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
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

          {/* Content - System View */}
          <section className="lg:col-span-9 xl:col-span-9">
            {selectedModule ? (
              <ModuleSystemView
                key={selectedModule.id}
                module={selectedModule}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed border-border rounded-xl bg-muted/30">
                <Database className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  Selecione um módulo
                </h3>
                <p className="text-sm text-muted-foreground/70 mt-1 max-w-sm">
                  Escolha um módulo na lista ao lado para acessar as funcionalidades e realizar consultas.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Forum CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Fórum de Discussões</h3>
                <p className="text-sm text-muted-foreground">
                  Tire dúvidas e compartilhe conhecimento com outros desenvolvedores.
                </p>
              </div>
            </div>
            <NavLink 
              to="/forum" 
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm"
            >
              Acessar Fórum
              <MessageSquare className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-muted-foreground text-center">
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
