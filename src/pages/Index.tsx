import { useState } from "react";
import { apiModules } from "@/data/modules";
import { ApiModule, Endpoint } from "@/types/api";
import { SystemSidebar } from "@/components/SystemSidebar";
import { DataListView } from "@/components/DataListView";
import { MainNav } from "@/components/MainNav";
import { Database, ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Index = () => {
  const [selectedModule, setSelectedModule] = useState<ApiModule | null>(apiModules[0] || null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | undefined>(
    apiModules[0]?.endpoints[0]
  );

  const handleSelectModule = (module: ApiModule) => {
    setSelectedModule(module);
    setSelectedEndpoint(module.endpoints[0]);
  };

  const handleSelectEndpoint = (module: ApiModule, endpoint: Endpoint) => {
    setSelectedModule(module);
    setSelectedEndpoint(endpoint);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Nav Bar */}
      <MainNav />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SystemSidebar
          onSelectModule={handleSelectModule}
          onSelectEndpoint={handleSelectEndpoint}
          selectedModuleId={selectedModule?.id || null}
          selectedEndpointId={selectedEndpoint?.id}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden bg-muted/30 flex flex-col">
          {/* Hero Header */}
          <div className="px-6 py-5 border-b border-border bg-card">
            <h1 className="text-xl font-bold text-foreground">
              Dados Abertos - Compras Gov
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Consulte informações públicas sobre compras governamentais, contratos, fornecedores e catálogos através da API de Dados Abertos do Governo Federal.
            </p>
          </div>

          {/* Breadcrumb */}
          {selectedModule && (
            <div className="px-6 py-3 border-b border-border bg-background">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="flex items-center gap-1 text-muted-foreground hover:text-foreground cursor-pointer">
                      <Home className="h-3.5 w-3.5" />
                      <span>Sistema</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-muted-foreground hover:text-foreground cursor-pointer">
                      {selectedModule.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {selectedEndpoint && (
                    <>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-medium text-foreground">
                          {selectedEndpoint.description}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
          
          {/* Data Content */}
          <div className="flex-1 overflow-hidden">
            {selectedModule ? (
              <DataListView
                key={`${selectedModule.id}-${selectedEndpoint?.id}`}
                module={selectedModule}
                endpoint={selectedEndpoint}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Database className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h2 className="text-xl font-medium text-muted-foreground">
                    Selecione um módulo
                  </h2>
                  <p className="text-sm text-muted-foreground/70 mt-2 max-w-md">
                    Escolha um módulo no menu lateral para visualizar os dados.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;