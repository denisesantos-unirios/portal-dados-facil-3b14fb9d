import { useState } from "react";
import { ApiModule, Endpoint } from "@/types/api";
import { apiModules } from "@/data/modules";
import { Package, Briefcase, DollarSign, ClipboardList, Landmark, History, FileSignature, Building, Users, Shield, Database, LayoutDashboard, List, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-sm">ComprasGov</h1>
            <p className="text-xs text-muted-foreground">Sistema de Consultas</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="py-3">
          <div className="px-4 py-2 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Módulos
            </span>
          </div>

          <div className="px-2 space-y-0.5">
            {apiModules.map((module) => {
              const Icon = iconMap[module.icon] || Package;
              const isSelected = selectedModuleId === module.id;
              const isExpanded = expandedModules.has(module.id);

              return (
                <div key={module.id}>
                  <button
                    onClick={() => handleModuleClick(module)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all",
                      isSelected
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    )}
                    <Icon className={cn("h-4 w-4 shrink-0", module.color.replace("bg-", "text-"))} />
                    <span className="text-sm truncate flex-1">{module.name}</span>
                  </button>

                  {isExpanded && (
                    <div className="ml-6 pl-2 border-l border-border mt-0.5 space-y-0.5">
                      {module.endpoints.map((endpoint) => (
                        <button
                          key={endpoint.id}
                          onClick={() => handleEndpointClick(module, endpoint)}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors text-left",
                            selectedEndpointId === endpoint.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <List className="h-3 w-3 shrink-0" />
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
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">v1.0 - Dados Abertos</span>
        </div>
      </div>
    </aside>
  );
}