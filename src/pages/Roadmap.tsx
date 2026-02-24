import { GovBrHeader } from "@/components/GovBrHeader";
import { GovBrFooter } from "@/components/GovBrFooter";
import { MainNav } from "@/components/MainNav";
import { moduleFlows } from "@/data/documentation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Clock,
  Package,
  Briefcase,
  DollarSign,
  ClipboardList,
  Building2,
  History,
  FileText,
  FileSignature,
  FileSpreadsheet,
  ShoppingCart,
  Globe,
  Bell,
  MessageSquare,
  Bot,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Package, Briefcase, DollarSign, ClipboardList, Building2, History,
  FileText, FileSignature, FileSpreadsheet, ShoppingCart, Globe, Bot,
  Bell, MessageSquare, BarChart3,
};

type DeliveryStatus = "entregue" | "em-andamento" | "previsto";

interface RoadmapModule {
  id: string;
  number: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  endpointCount: number;
  status: DeliveryStatus;
  sprint?: string;
}

// Define delivery status for each module based on project context
const moduleStatusMap: Record<string, { status: DeliveryStatus; sprint?: string }> = {
  "catalogo-material": { status: "entregue", sprint: "Sprint 1" },
  "catalogo-servico": { status: "entregue", sprint: "Sprint 1" },
  "pesquisa-preco": { status: "entregue", sprint: "Sprint 2" },
  "pgc": { status: "entregue", sprint: "Sprint 2" },
  "uasg": { status: "entregue", sprint: "Sprint 3" },
  "legado": { status: "entregue", sprint: "Sprint 3" },
  "contratacoes": { status: "entregue", sprint: "Sprint 4" },
  "arp": { status: "entregue", sprint: "Sprint 4" },
  "contratos": { status: "entregue", sprint: "Sprint 5" },
  "fornecedor": { status: "entregue", sprint: "Sprint 5" },
  "ocds": { status: "entregue", sprint: "Sprint 6" },
  "pagina-inicial": { status: "entregue", sprint: "Sprint 7" },
  "notificacoes": { status: "entregue", sprint: "Sprint 7" },
  "forum": { status: "entregue", sprint: "Sprint 7" },
  "visao-geral": { status: "entregue", sprint: "Sprint 7" },
  "alice": { status: "em-andamento", sprint: "Sprint 8" },
  "pca": { status: "previsto", sprint: "Sprint 9" },
};

const roadmapModules: RoadmapModule[] = moduleFlows.map((m) => {
  const statusInfo = moduleStatusMap[m.id] || { status: "previsto" as DeliveryStatus };
  return {
    id: m.id,
    number: m.number,
    name: m.name,
    description: m.description,
    icon: m.icon,
    color: m.color,
    endpointCount: m.endpoints.length,
    status: statusInfo.status,
    sprint: statusInfo.sprint,
  };
});

const statusConfig: Record<DeliveryStatus, { label: string; color: string; badgeVariant: "default" | "secondary" | "destructive"; icon: React.ElementType }> = {
  entregue: { label: "Entregue", color: "text-green-600", badgeVariant: "default", icon: Check },
  "em-andamento": { label: "Em Andamento", color: "text-amber-600", badgeVariant: "secondary", icon: Clock },
  previsto: { label: "Previsto", color: "text-muted-foreground", badgeVariant: "secondary", icon: Clock },
};

const Roadmap = () => {
  const entregues = roadmapModules.filter((m) => m.status === "entregue");
  const emAndamento = roadmapModules.filter((m) => m.status === "em-andamento");
  const previstos = roadmapModules.filter((m) => m.status === "previsto");
  const progressPercent = Math.round((entregues.length / roadmapModules.length) * 100);

  return (
    <div className="h-screen flex flex-col bg-background">
      <GovBrHeader />
      <MainNav />

      <main className="flex-1 overflow-auto bg-muted/30 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Roadmap de Entregas</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Acompanhe o progresso das entregas dos módulos do Portal de Dados Abertos
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-6 shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Progresso Geral</span>
                <span className="text-sm font-bold text-primary">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-3 mb-4" />
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Entregues: <strong className="text-foreground">{entregues.length}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">Em Andamento: <strong className="text-foreground">{emAndamento.length}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                  <span className="text-muted-foreground">Previstos: <strong className="text-foreground">{previstos.length}</strong></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          {[
            { title: "Entregues", items: entregues, accent: "border-l-primary" },
            { title: "Em Andamento", items: emAndamento, accent: "border-l-amber-500" },
            { title: "Previstos para 2026", items: previstos, accent: "border-l-muted-foreground/40" },
          ]
            .filter((s) => s.items.length > 0)
            .map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">{section.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((mod) => {
                    const Icon = iconMap[mod.icon] || Package;
                    const statusCfg = statusConfig[mod.status];
                    const StatusIcon = statusCfg.icon;
                    return (
                      <Card
                        key={mod.id}
                        className={cn("shadow-card border-l-4", section.accent)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", mod.color)}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-sm font-semibold leading-tight">
                                  {mod.name}
                                </CardTitle>
                                {mod.sprint && (
                                  <span className="text-xs text-muted-foreground">{mod.sprint}</span>
                                )}
                              </div>
                            </div>
                            <StatusIcon className={cn("h-4 w-4 mt-1", statusCfg.color)} />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                            {mod.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant={statusCfg.badgeVariant} className="text-xs">
                              {statusCfg.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {mod.endpointCount} endpoint{mod.endpointCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </main>

      <GovBrFooter />
    </div>
  );
};

export default Roadmap;
