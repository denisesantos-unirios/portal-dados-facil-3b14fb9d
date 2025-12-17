import { useState } from "react";
import { apiModules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { EndpointPanel } from "@/components/EndpointPanel";
import { ApiModule } from "@/types/api";
import { Database, ExternalLink } from "lucide-react";

const Index = () => {
  const [selectedModule, setSelectedModule] = useState<ApiModule | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              Dados Abertos - Compras Gov
            </h1>
          </div>
          <p className="text-primary-foreground/80 max-w-2xl">
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar - Modules */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Módulos</h2>
              <div className="grid gap-3">
                {apiModules.map((module) => (
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

      {/* Footer */}
      <footer className="border-t border-border mt-12">
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
