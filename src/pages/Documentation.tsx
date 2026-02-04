import { useState } from "react";
import { moduleFlows, apiInfo } from "@/data/documentation";
import { ChevronDown, ChevronRight, Book, FileText, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { GovBrHeader } from "@/components/GovBrHeader";
import { MainNav } from "@/components/MainNav";
import { 
  Package, 
  Briefcase, 
  Building2, 
  Landmark, 
  FileSignature, 
  ShoppingCart, 
  DollarSign, 
  ClipboardList, 
  History, 
  FileSpreadsheet,
  Globe,
  Bot,
  LucideIcon 
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Package,
  Briefcase,
  Building2,
  Landmark,
  FileText,
  ShoppingCart,
  DollarSign,
  ClipboardList,
  History,
  FileSignature,
  FileSpreadsheet,
  Globe,
  Bot,
};

const methodColors: Record<string, string> = {
  GET: "bg-green-600",
  POST: "bg-primary",
  PUT: "bg-amber-600",
  DELETE: "bg-destructive",
  PATCH: "bg-purple-600",
};

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const filteredModules = moduleFlows.filter(module =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.endpoints.some(e => e.path.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalEndpoints = moduleFlows.reduce((acc, m) => acc + m.endpoints.length, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GovBrHeader />
      <MainNav />

      {/* Hero Section */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-8 sm:py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <Book className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Documentação e Histórias de Usuário
            </h1>
          </div>
          <p className="text-white/90 max-w-2xl mx-auto">
            Regras, critérios de aceite e fluxos de todas as funcionalidades do sistema
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className="bg-white/20 text-white border-white/30 text-sm">
              {moduleFlows.length} Módulos
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-sm">
              {totalEndpoints} HUs Documentadas
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-sm">
              Versão {apiInfo.version}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar módulos, funcionalidades ou critérios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 text-base bg-card border-border"
            />
          </div>
        </div>

        {/* Module Flows with HUs */}
        <div className="grid gap-4">
          {filteredModules.map((module) => {
            const Icon = iconMap[module.icon] || Package;
            const isExpanded = expandedModules.includes(module.id);

            return (
              <Collapsible key={module.id} open={isExpanded} onOpenChange={() => toggleModule(module.id)}>
                <Card className="overflow-hidden border-border">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${module.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <span className="text-muted-foreground font-normal">#{module.number}</span>
                              {module.name}
                            </CardTitle>
                            <CardDescription className="mt-1">{module.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-primary/30 text-primary">
                            {module.endpoints.length} HUs
                          </Badge>
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="border-t border-border">
                      <div className="space-y-6 pt-4">
                        {/* Histórias de Usuário */}
                        <div>
                          <h4 className="font-semibold text-sm text-primary uppercase tracking-wide mb-4 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Histórias de Usuário (HUs)
                          </h4>
                          <div className="space-y-4">
                            {module.endpoints.map((endpoint, idx) => (
                              <div key={idx} className="p-4 rounded-lg bg-muted/30 border border-border">
                                <div className="flex items-start gap-3 mb-3">
                                  <Badge className={`${methodColors[endpoint.method]} text-white text-xs shrink-0`}>
                                    {endpoint.method}
                                  </Badge>
                                  <div className="flex-1">
                                    <code className="text-sm font-medium text-foreground">{endpoint.path}</code>
                                    <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                                  </div>
                                </div>
                                
                                {/* Critérios de Aceite */}
                                <div className="mt-3 pl-4 border-l-2 border-primary/30">
                                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                                    Critérios de Aceite
                                  </p>
                                  <ul className="space-y-1.5">
                                    <li className="flex items-start gap-2 text-sm text-foreground">
                                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                      <span>Deve retornar dados no formato JSON conforme especificação</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-foreground">
                                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                      <span>Suportar paginação com parâmetros offset e limit</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-foreground">
                                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                      <span>Tempo de resposta inferior a 3 segundos</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Casos de Uso */}
                        <div>
                          <h4 className="font-semibold text-sm text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Regras de Negócio
                          </h4>
                          <ul className="space-y-2">
                            {module.useCases.map((useCase, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-foreground p-2 rounded bg-accent/50">
                                <span className="text-primary font-bold">•</span>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum módulo encontrado para "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 bg-card">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-muted-foreground text-center">
            Documentação do Portal de Dados Abertos •{" "}
            <a
              href="https://dadosabertos.compras.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              dadosabertos.compras.gov.br
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
