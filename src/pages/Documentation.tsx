import { useState } from "react";
import { moduleFlows, apiInfo, ModuleFlow } from "@/data/documentation";
import { Database, ExternalLink, ChevronDown, ChevronRight, Book, FileText, Workflow } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
  GET: "bg-green-500",
  POST: "bg-blue-500",
  PUT: "bg-amber-500",
  DELETE: "bg-red-500",
  PATCH: "bg-purple-500",
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
            <NavLink to="/forum" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Fórum</NavLink>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-8 sm:py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <Book className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              Documentação da API
            </h1>
          </div>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Documentação completa dos módulos e fluxos da API de Dados Abertos do Compras.gov.br
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="text-sm">
              Versão {apiInfo.version}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {apiInfo.openApiVersion}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar módulos, endpoints ou funcionalidades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 text-base"
            />
          </div>
        </div>

        {/* API Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-primary" />
              Informações da API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Base URL</p>
                <p className="font-mono text-sm text-foreground">{apiInfo.baseUrl}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Versão</p>
                <p className="font-mono text-sm text-foreground">{apiInfo.version}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Especificação</p>
                <p className="font-mono text-sm text-foreground">{apiInfo.openApiVersion}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documentação Oficial</p>
                <a 
                  href={apiInfo.documentation} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Swagger UI <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module Flows */}
        <h2 className="text-xl font-semibold mb-4 text-center">Fluxos e Módulos</h2>
        <div className="grid gap-4">
          {filteredModules.map((module) => {
            const Icon = iconMap[module.icon] || Package;
            const isExpanded = expandedModules.includes(module.id);

            return (
              <Collapsible key={module.id} open={isExpanded} onOpenChange={() => toggleModule(module.id)}>
                <Card className="overflow-hidden">
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
                          <Badge variant="outline">{module.endpoints.length} endpoints</Badge>
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
                    <CardContent className="border-t">
                      <div className="grid lg:grid-cols-2 gap-6 pt-4">
                        {/* Endpoints */}
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                            Endpoints Disponíveis
                          </h4>
                          <div className="space-y-2">
                            {module.endpoints.map((endpoint, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                                <Badge className={`${methodColors[endpoint.method]} text-white text-xs shrink-0`}>
                                  {endpoint.method}
                                </Badge>
                                <div className="min-w-0">
                                  <code className="text-xs text-foreground break-all">{endpoint.path}</code>
                                  <p className="text-xs text-muted-foreground mt-0.5">{endpoint.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Use Cases */}
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                            Casos de Uso
                          </h4>
                          <ul className="space-y-2">
                            {module.useCases.map((useCase, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                                <span className="text-primary mt-0.5">•</span>
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
      <footer className="border-t border-border mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-muted-foreground text-center">
            Dados fornecidos pelo Portal de Dados Abertos do Governo Federal •{" "}
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
