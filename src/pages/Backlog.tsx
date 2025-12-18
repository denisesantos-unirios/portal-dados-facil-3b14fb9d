import { useState } from "react";
import { backlogSections, getTaskStats, TaskStatus, TaskPriority } from "@/data/backlog";
import { Database, CheckCircle2, Clock, AlertCircle, ListTodo, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Package, DollarSign, FileText, FileSignature, Building2, ClipboardList, Bot, LucideIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const iconMap: Record<string, LucideIcon> = {
  Package,
  DollarSign,
  FileText,
  FileSignature,
  Building2,
  ClipboardList,
  Bot,
  Settings,
};

const statusConfig: Record<TaskStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  todo: { label: "A Fazer", color: "bg-muted text-muted-foreground", icon: ListTodo },
  in_progress: { label: "Em Progresso", color: "bg-blue-500/20 text-blue-500", icon: Clock },
  done: { label: "Concluído", color: "bg-green-500/20 text-green-500", icon: CheckCircle2 },
  blocked: { label: "Bloqueado", color: "bg-red-500/20 text-red-500", icon: AlertCircle },
};

const priorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  high: { label: "Alta", color: "bg-red-500" },
  medium: { label: "Média", color: "bg-amber-500" },
  low: { label: "Baixa", color: "bg-slate-400" },
};

export default function Backlog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const stats = getTaskStats();
  const progress = stats.total > 0 ? (stats.done / stats.total) * 100 : 0;

  const filteredSections = backlogSections.map((section) => ({
    ...section,
    tasks: section.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.endpoint?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = filterStatus === "all" || task.status === filterStatus;
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    }),
  })).filter((section) => section.tasks.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">ComprasGov Explorer</span>
          </div>
          <nav className="flex items-center gap-4">
            <NavLink to="/" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">API Explorer</NavLink>
            <NavLink to="/documentacao" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Documentação</NavLink>
            <NavLink to="/backlog" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Backlog</NavLink>
            <NavLink to="/forum" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Fórum</NavLink>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-8 sm:py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <ListTodo className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              Backlog de Integração
            </h1>
          </div>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Lista de tarefas para integração do frontend com os endpoints da API Compras.gov.br
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-muted-foreground">{stats.todo}</p>
              <p className="text-sm text-muted-foreground">A Fazer</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">Em Progresso</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{stats.done}</p>
              <p className="text-sm text-muted-foreground">Concluídos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-500">{stats.highPriority}</p>
              <p className="text-sm text-muted-foreground">Alta Prioridade</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso Geral</span>
              <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tarefas, endpoints, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="todo">A Fazer</SelectItem>
              <SelectItem value="in_progress">Em Progresso</SelectItem>
              <SelectItem value="done">Concluído</SelectItem>
              <SelectItem value="blocked">Bloqueado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Prioridades</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Backlog Sections */}
        <div className="space-y-6">
          {filteredSections.map((section) => {
            const Icon = iconMap[section.icon] || Package;
            return (
              <Card key={section.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${section.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {section.tasks.length} tarefas
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    {section.tasks.map((task) => {
                      const StatusIcon = statusConfig[task.status].icon;
                      return (
                        <div
                          key={task.id}
                          className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/30"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-1.5 rounded-md ${statusConfig[task.status].color}`}>
                              <StatusIcon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium text-foreground">{task.title}</h4>
                                <div className={`w-2 h-2 rounded-full ${priorityConfig[task.priority].color}`} title={`Prioridade ${priorityConfig[task.priority].label}`} />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                              {task.endpoint && (
                                <code className="text-xs text-primary mt-2 block font-mono bg-primary/10 px-2 py-1 rounded w-fit">
                                  {task.endpoint}
                                </code>
                              )}
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {task.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Badge className={statusConfig[task.status].color}>
                              {statusConfig[task.status].label}
                            </Badge>
                          </div>

                          {/* Objetivo */}
                          <div className="mt-4 p-3 rounded-md bg-primary/5 border-l-2 border-primary">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Objetivo</h5>
                            <p className="text-sm text-foreground">{task.objective}</p>
                          </div>

                          {/* Histórias de Usuário (HUs) */}
                          <div className="mt-4 space-y-3">
                            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Histórias de Usuário (HUs)</h5>
                            {task.userStories.map((story) => (
                              <div key={story.id} className="p-3 rounded-md bg-background border border-border/50">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs font-mono">{story.id}</Badge>
                                </div>
                                <p className="text-sm text-foreground mb-2">{story.description}</p>
                                <div className="mt-2">
                                  <span className="text-xs font-medium text-muted-foreground">Critérios de Aceite:</span>
                                  <ul className="mt-1 space-y-1">
                                    {story.acceptanceCriteria.map((criteria, idx) => (
                                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                        <span className="text-primary mt-0.5">✓</span>
                                        {criteria}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <ListTodo className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma tarefa encontrada com os filtros aplicados</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-muted-foreground text-center">
            Backlog de integração • ComprasGov Explorer
          </p>
        </div>
      </footer>
    </div>
  );
}
