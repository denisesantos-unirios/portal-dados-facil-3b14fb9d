import { NavLink } from "@/components/NavLink";
import { Database, MessageSquare, LayoutGrid, BarChart3, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiModules } from "@/data/modules";
import { discussions } from "@/data/forum";

// Contadores para cada seção
const getCounters = () => {
  const totalEndpoints = apiModules.reduce((acc, m) => acc + m.endpoints.length, 0);
  
  return {
    dashboard: 4, // 4 métricas principais
    sistema: totalEndpoints,
    notificacoes: 3, // Notificações ativas (mock)
    forum: discussions.length,
  };
};

export function MainNav() {
  const counters = getCounters();

  return (
    <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <span className="font-bold text-sm">ComprasGov Explorer</span>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink
            to="/dashboard"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
            activeClassName="text-foreground bg-muted font-medium"
          >
            <BarChart3 className="h-4 w-4" />
            Visão Geral
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs font-medium">
              {counters.dashboard}
            </Badge>
          </NavLink>
          <NavLink
            to="/"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
            activeClassName="text-foreground bg-muted font-medium"
          >
            <LayoutGrid className="h-4 w-4" />
            Sistema
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs font-medium">
              {counters.sistema}
            </Badge>
          </NavLink>
          <NavLink
            to="/notificacoes"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
            activeClassName="text-foreground bg-muted font-medium"
          >
            <Bell className="h-4 w-4" />
            Notificações
            <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-xs font-medium">
              {counters.notificacoes}
            </Badge>
          </NavLink>
          <NavLink
            to="/forum"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
            activeClassName="text-foreground bg-muted font-medium"
          >
            <MessageSquare className="h-4 w-4" />
            Fórum
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs font-medium">
              {counters.forum}
            </Badge>
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
  );
}
