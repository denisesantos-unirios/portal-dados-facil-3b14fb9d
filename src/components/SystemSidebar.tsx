import { ApiModule } from "@/types/api";
import { apiModules } from "@/data/modules";
import { Package, Briefcase, DollarSign, ClipboardList, Landmark, History, FileSignature, Building, Users, Shield, Database, LayoutDashboard, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemSidebarProps {
  onSelectModule: (module: ApiModule) => void;
  selectedModuleId: string | null;
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

export function SystemSidebar({ onSelectModule, selectedModuleId }: SystemSidebarProps) {
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
      <nav className="flex-1 overflow-y-auto py-3">
        <div className="px-4 py-2 mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Módulos
          </span>
        </div>

        <div className="px-2 space-y-1">
          {apiModules.map((module) => {
            const Icon = iconMap[module.icon] || Package;
            const isSelected = selectedModuleId === module.id;

            return (
              <button
                key={module.id}
                onClick={() => onSelectModule(module)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", !isSelected && module.color.replace("bg-", "text-"))} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium truncate block">{module.name}</span>
                </div>
                <List className="h-3.5 w-3.5 opacity-50" />
              </button>
            );
          })}
        </div>
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