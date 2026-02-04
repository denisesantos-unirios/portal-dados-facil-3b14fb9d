import { NavLink } from "@/components/NavLink";
import { LayoutGrid, BarChart3, Bell, MessageSquare, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiModules } from "@/data/modules";
import { discussions } from "@/data/forum";
import { moduleFlows } from "@/data/documentation";

// Contadores para cada seção
const getCounters = () => {
  const totalEndpoints = apiModules.reduce((acc, m) => acc + m.endpoints.length, 0);
  const totalHUs = moduleFlows.reduce((acc, m) => acc + m.endpoints.length, 0);
  
  return {
    dashboard: 4,
    sistema: totalEndpoints,
    documentacao: totalHUs,
    notificacoes: 3,
    forum: discussions.length,
  };
};

export function MainNav() {
  const counters = getCounters();

  return (
    <nav className="h-12 border-b border-border bg-card flex items-center px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-1">
        <NavLink
          to="/dashboard"
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2 border-b-2 border-transparent"
          activeClassName="text-primary font-semibold border-b-2 border-primary bg-primary/5"
        >
          <BarChart3 className="h-4 w-4" />
          Visão Geral
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs font-medium bg-muted">
            {counters.dashboard}
          </Badge>
        </NavLink>
        <NavLink
          to="/"
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2 border-b-2 border-transparent"
          activeClassName="text-primary font-semibold border-b-2 border-primary bg-primary/5"
        >
          <LayoutGrid className="h-4 w-4" />
          Sistema
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs font-medium bg-muted">
            {counters.sistema}
          </Badge>
        </NavLink>
        <NavLink
          to="/notificacoes"
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2 border-b-2 border-transparent"
          activeClassName="text-primary font-semibold border-b-2 border-primary bg-primary/5"
        >
          <Bell className="h-4 w-4" />
          Notificações
          <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-xs font-medium">
            {counters.notificacoes}
          </Badge>
        </NavLink>
        <NavLink
          to="/documentacao"
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2 border-b-2 border-transparent"
          activeClassName="text-primary font-semibold border-b-2 border-primary bg-primary/5"
        >
          <Book className="h-4 w-4" />
          Documentação
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs font-medium bg-muted">
            {counters.documentacao}
          </Badge>
        </NavLink>
        <NavLink
          to="/forum"
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2 border-b-2 border-transparent"
          activeClassName="text-primary font-semibold border-b-2 border-primary bg-primary/5"
        >
          <MessageSquare className="h-4 w-4" />
          Fórum
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs font-medium bg-muted">
            {counters.forum}
          </Badge>
        </NavLink>
      </div>
    </nav>
  );
}
