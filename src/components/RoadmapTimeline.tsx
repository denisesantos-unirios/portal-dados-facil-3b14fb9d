import { Check, Clock, Package, FileText, DollarSign, Users, FileSignature, ClipboardList, BarChart3, Receipt, ScrollText, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  status: "entregue" | "previsto";
}

const roadmapItems: RoadmapItem[] = [
  {
    id: "1",
    icon: Package,
    title: "Catálogo de Materiais e Serviços",
    description: "Consulta de itens catalogados",
    status: "entregue",
  },
  {
    id: "2",
    icon: ClipboardList,
    title: "PGC e PCA",
    description: "Planos de Contratações",
    status: "entregue",
  },
  {
    id: "3",
    icon: FileText,
    title: "Contratações (Lei nº 8.666/93)",
    description: "Processos de compras",
    status: "entregue",
  },
  {
    id: "4",
    icon: DollarSign,
    title: "Atas de Registro de Preços",
    description: "Consulta de atas vigentes",
    status: "entregue",
  },
  {
    id: "5",
    icon: Users,
    title: "Fornecedores",
    description: "Cadastro de fornecedores",
    status: "entregue",
  },
  {
    id: "6",
    icon: BarChart3,
    title: "API Padrão OCDS",
    description: "Open Contracting Data Standard",
    status: "entregue",
  },
  {
    id: "7",
    icon: Receipt,
    title: "Consulta de Faturas Contratuais",
    description: "Pagamentos e faturas",
    status: "previsto",
  },
  {
    id: "8",
    icon: ScrollText,
    title: "Consulta de Propostas",
    description: "Propostas de fornecedores",
    status: "previsto",
  },
  {
    id: "9",
    icon: FileSignature,
    title: "Consulta de Gestão de Contratos",
    description: "Gestão e aditivos",
    status: "previsto",
  },
  {
    id: "10",
    icon: FileSearch,
    title: "Consulta de Intenção de Registro de Preços",
    description: "IRP e consolidação",
    status: "previsto",
  },
];

export function RoadmapTimeline() {
  const entregues = roadmapItems.filter((item) => item.status === "entregue");
  const previstos = roadmapItems.filter((item) => item.status === "previsto");

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Roadmap de Dados Abertos</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Veja o que já foi entregue e o que estamos preparando para aumentar ainda mais a transparência
        </p>
      </div>

      <div className="relative">
        {/* Timeline bar */}
        <div className="absolute top-16 left-0 right-0 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(entregues.length / roadmapItems.length) * 100}%` }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-primary">ENTREGUES</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm font-semibold text-accent-foreground">PREVISTAS PARA 2026</span>
          </div>
        </div>

        {/* Items grid */}
        <div className="mt-12 grid grid-cols-2 gap-8">
          {/* Entregues */}
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {entregues.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center text-center p-3 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground leading-tight">
                      {item.title}
                    </span>
                    <Check className="h-4 w-4 text-success mt-2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Previstos */}
          <div>
            <div className="grid grid-cols-2 gap-3">
              {previstos.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center text-center p-3 rounded-lg bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-2 group-hover:bg-accent/30 transition-colors">
                      <Icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <span className="text-xs font-medium text-foreground leading-tight">
                      {item.title}
                    </span>
                    <Clock className="h-4 w-4 text-accent-foreground mt-2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
