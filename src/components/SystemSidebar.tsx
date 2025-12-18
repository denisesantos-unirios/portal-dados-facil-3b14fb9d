import { useState } from "react";
import { ApiModule, Endpoint } from "@/types/api";
import { apiModules } from "@/data/modules";
import { ChevronDown, ChevronRight, Package, Briefcase, DollarSign, ClipboardList, Landmark, History, FileSignature, Building, Users, Shield, Bot, Settings, Database, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemSidebarProps {
  onSelectEndpoint: (module: ApiModule, endpoint: Endpoint) => void;
  selectedEndpointId: string | null;
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
  Bot,
  Settings,
};

export function SystemSidebar({ onSelectEndpoint, selectedEndpointId }: SystemSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([apiModules[0]?.id || ""]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleEndpointClick = (module: ApiModule, endpoint: Endpoint) => {
    if (!expandedModules.includes(module.id)) {
      setExpandedModules((prev) => [...prev, module.id]);
    }
    onSelectEndpoint(module, endpoint);
  };

  return (
    <aside className="w-72 bg-card border-r border-border flex flex-col h-full">
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
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="px-3 py-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Módulos
          </span>
        </div>

        {apiModules.map((module) => {
          const Icon = iconMap[module.icon] || Package;
          const isExpanded = expandedModules.includes(module.id);

          return (
            <div key={module.id} className="px-2">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors",
                  "hover:bg-muted/50 group",
                  isExpanded && "bg-muted/30"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", module.color.replace("bg-", "text-"))} />
                <span className="flex-1 text-sm font-medium truncate">{module.name}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Submenu - Endpoints */}
              {isExpanded && (
                <div className="ml-4 pl-3 border-l border-border/50 space-y-0.5 py-1">
                  {module.endpoints.map((endpoint) => {
                    const isSelected = selectedEndpointId === endpoint.id;
                    return (
                      <button
                        key={endpoint.id}
                        onClick={() => handleEndpointClick(module, endpoint)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-all text-sm",
                          isSelected
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <span className="truncate">{endpoint.description}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

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
