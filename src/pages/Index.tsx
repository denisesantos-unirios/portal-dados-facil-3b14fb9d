import { useState } from "react";
import { apiModules } from "@/data/modules";
import { ApiModule, Endpoint } from "@/types/api";
import { SystemSidebar } from "@/components/SystemSidebar";
import { DataListView } from "@/components/DataListView";
import { NavLink } from "@/components/NavLink";
import { Database, FileText, ListTodo, MessageSquare, LayoutGrid } from "lucide-react";

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
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm">ComprasGov Explorer</span>
          </div>
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
              activeClassName="text-foreground bg-muted font-medium"
            >
              <LayoutGrid className="h-4 w-4" />
              Sistema
            </NavLink>
            <NavLink
              to="/documentacao"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
              activeClassName="text-foreground bg-muted font-medium"
            >
              <FileText className="h-4 w-4" />
              Documentação
            </NavLink>
            <NavLink
              to="/backlog"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
              activeClassName="text-foreground bg-muted font-medium"
            >
              <ListTodo className="h-4 w-4" />
              Backlog
            </NavLink>
            <NavLink
              to="/forum"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
              activeClassName="text-foreground bg-muted font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              Fórum
            </NavLink>
          </nav>
        </div>
        <div className="text-xs text-muted-foreground">
          <a
            href="https://dadosabertos.compras.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            dadosabertos.compras.gov.br
          </a>
        </div>
      </header>

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
        <main className="flex-1 overflow-hidden bg-muted/30">
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
        </main>
      </div>
    </div>
  );
};

export default Index;