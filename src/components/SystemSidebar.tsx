import { useState } from "react";
import { ApiModule, Endpoint } from "@/types/api";
import { apiModules } from "@/data/modules";
import { Package, Briefcase, DollarSign, ClipboardList, Landmark, History, FileSignature, Building, Users, Shield, List, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface SystemSidebarProps {
  onSelectModule: (module: ApiModule) => void;
  onSelectEndpoint?: (module: ApiModule, endpoint: Endpoint) => void;
  selectedModuleId: string | null;
  selectedEndpointId?: string | null;
}

const iconMap: Record<string, any> = {
  Package,
  Briefcase,
  DollarSign,
  ClipboardList,
  Landmark,
  History,
  FileSignature,
  Building,
  Users,
  Shield,
};

export function SystemSidebar({ onSelectModule, onSelectEndpoint, selectedModuleId, selectedEndpointId }: SystemSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([apiModules[0]?.id])
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const handleModuleClick = (module: ApiModule) => {
    toggleModule(module.id);
    onSelectModule(module);
  };

  const handleEndpointClick = (module: ApiModule, endpoint: Endpoint) => {
    onSelectEndpoint?.(module, endpoint);
  };

  return (
    <aside className="w-72 bg-card border-r border-border flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-sm text-foreground">Módulos de Dados</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Selecione um módulo para consultar
        </p>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="py-2">
          <div className="px-3 space-y-0.5">
            {apiModules.map((module) => {
              const Icon = iconMap[module.icon] || Package;
              const isSelected = selectedModuleId === module.id;
              const isExpanded = expandedModules.has(module.id);

              return (
                <div key={module.id}>
                  <button
                    onClick={() => handleModuleClick(module)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all group",
                      isSelected
                        ? "bg-primary/10 border-l-4 border-primary text-primary"
                        : "hover:bg-muted text-foreground border-l-4 border-transparent"
                    )}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <Icon className={cn("h-5 w-5 shrink-0", isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                    <span className="text-sm font-medium truncate flex-1">{module.name}</span>
                    <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-muted text-muted-foreground">
                      {module.endpoints.length}
                    </Badge>
                  </button>

                  {isExpanded && (
                    <div className="ml-7 pl-4 border-l-2 border-border mt-1 space-y-0.5">
                      {module.endpoints.map((endpoint) => (
                        <button
                          key={endpoint.id}
                          onClick={() => handleEndpointClick(module, endpoint)}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors text-left",
                            selectedEndpointId === endpoint.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <List className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{endpoint.description}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          <span className="font-medium">Dados Abertos</span>
          <span className="mx-1">•</span>
          <span>Atualizado em tempo real</span>
        </div>
      </div>
    </aside>
  );
}
