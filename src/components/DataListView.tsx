import { useState, useEffect } from "react";
import { ApiModule, Endpoint, Parameter } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, Loader2, Download, RefreshCw, ChevronLeft, ChevronRight, 
  Filter, AlertCircle, Eye, X, SlidersHorizontal, List, Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getMockData } from "@/data/mockData";

interface DataListViewProps {
  module: ApiModule;
  endpoint?: Endpoint;
}

const BASE_URL = "https://dadosabertos.compras.gov.br";
const PAGE_SIZE = 10;

export function DataListView({ module, endpoint: initialEndpoint }: DataListViewProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(initialEndpoint || module.endpoints[0]);
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const { toast } = useToast();

  // Reset when module changes
  useEffect(() => {
    if (initialEndpoint) {
      setSelectedEndpoint(initialEndpoint);
    } else {
      setSelectedEndpoint(module.endpoints[0]);
    }
    setParams({});
    setData([]);
    setError(null);
  }, [module.id, initialEndpoint?.id]);

  // Auto-load when endpoint changes
  useEffect(() => {
    executeQuery(1);
  }, [selectedEndpoint.id]);

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setParams({});
  };

  const buildUrl = (page?: number) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    if (page) queryParams.set("pagina", String(page));
    queryParams.set("tamanhoPagina", String(PAGE_SIZE));
    const queryString = queryParams.toString();
    return `${BASE_URL}${selectedEndpoint.path}${queryString ? `?${queryString}` : ""}`;
  };

  const executeQuery = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    setCurrentPage(page);

    // Using mock data since API has CORS restrictions
    // In production, use a proxy server or backend
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
    
    const mockData = getMockData(selectedEndpoint.id);
    setData(mockData);
    setTotalRecords(mockData.length);
    setLoading(false);
  };

  const exportToCsv = () => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(";"),
      ...data.map(row => headers.map(h => JSON.stringify(row[h] ?? "")).join(";"))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${module.id}_${selectedEndpoint.id}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast({ title: "Exportado!", description: "Arquivo CSV gerado com sucesso." });
  };

  const getDisplayColumns = (item: any): string[] => {
    if (!item) return [];
    const keys = Object.keys(item);
    const priorityKeys = ["codigo", "id", "nome", "descricao", "valor", "data", "status", "tipo"];
    const sortedKeys = [
      ...priorityKeys.filter(k => keys.some(key => key.toLowerCase().includes(k))),
      ...keys.filter(k => !priorityKeys.some(pk => k.toLowerCase().includes(pk)))
    ];
    return sortedKeys.slice(0, 7);
  };

  const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "object") return JSON.stringify(value);
    if (typeof value === "boolean") return value ? "Sim" : "Não";
    return String(value);
  };

  const formatColumnHeader = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const activeFiltersCount = Object.values(params).filter(Boolean).length;

  return (
    <div className="flex h-full">
      {/* Filter Panel */}
      {showFilters && (
        <aside className="w-72 border-r border-border bg-muted/20 flex flex-col">
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-sm">Filtros</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            {/* Endpoint Selector */}
            <div className="space-y-2 mb-6">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Consulta
              </Label>
              <Select 
                value={selectedEndpoint.id} 
                onValueChange={(value) => {
                  const ep = module.endpoints.find(e => e.id === value);
                  if (ep) setSelectedEndpoint(ep);
                }}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {module.endpoints.map((ep) => (
                    <SelectItem key={ep.id} value={ep.id} className="text-sm">
                      {ep.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Parameters */}
            <div className="space-y-4">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Parâmetros
              </Label>
              
              {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 ? (
                selectedEndpoint.parameters.map((param: Parameter) => (
                  <div key={param.name} className="space-y-1.5">
                    <Label htmlFor={param.name} className="text-sm flex items-center gap-2">
                      {formatColumnHeader(param.name)}
                      {param.required && (
                        <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                          *
                        </Badge>
                      )}
                    </Label>
                    <Input
                      id={param.name}
                      placeholder={param.example || param.description}
                      value={params[param.name] || ""}
                      onChange={(e) => handleParamChange(param.name, e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground py-2">
                  Sem parâmetros configuráveis.
                </p>
              )}
            </div>
          </ScrollArea>

          {/* Filter Actions */}
          <div className="p-4 border-t border-border bg-card space-y-2">
            <Button onClick={() => executeQuery(1)} className="w-full" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Pesquisar
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full" size="sm">
              Limpar Filtros
            </Button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!showFilters && (
                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 h-5 min-w-[20px] flex items-center justify-center p-0 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              )}
              <div>
                <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <List className="h-5 w-5 text-primary" />
                  {module.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {selectedEndpoint.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => executeQuery(currentPage)} disabled={loading}>
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              </Button>
              <Button variant="outline" size="sm" onClick={exportToCsv} disabled={data.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden p-6">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Carregando dados...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Erro na consulta</p>
                    <p className="text-sm opacity-80">{error}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => executeQuery(1)}>
                  Tentar novamente
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Data Table */}
          {!loading && !error && data.length > 0 && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">
                  {totalRecords} registros encontrados
                </Badge>
              </div>

              <ScrollArea className="flex-1 rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {getDisplayColumns(data[0]).map((col) => (
                        <TableHead key={col} className="font-semibold whitespace-nowrap">
                          {formatColumnHeader(col)}
                        </TableHead>
                      ))}
                      <TableHead className="w-[80px] text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        {getDisplayColumns(data[0]).map((col) => (
                          <TableCell key={col} className="max-w-[180px] truncate">
                            {formatCellValue(item[col])}
                          </TableCell>
                        ))}
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Registro</DialogTitle>
                                <DialogDescription>
                                  Visualização completa de todos os campos
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3 mt-4">
                                {Object.entries(item).map(([key, value]) => (
                                  <div key={key} className="grid grid-cols-3 gap-4 py-2 border-b border-border/50 last:border-0">
                                    <span className="font-medium text-sm text-muted-foreground">
                                      {formatColumnHeader(key)}
                                    </span>
                                    <span className="col-span-2 text-sm break-words">
                                      {typeof value === "object" 
                                        ? <pre className="text-xs bg-muted p-2 rounded overflow-auto">{JSON.stringify(value, null, 2)}</pre>
                                        : formatCellValue(value)
                                      }
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>

              {/* Pagination */}
              {totalRecords > PAGE_SIZE && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Página {currentPage} • {Math.min(PAGE_SIZE, data.length)} de {totalRecords} registros
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1 || loading}
                      onClick={() => executeQuery(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      onClick={() => executeQuery(currentPage + 1)}
                    >
                      Próxima
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && data.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">Nenhum dado encontrado</h3>
                <p className="text-sm text-muted-foreground/70 mt-1 max-w-sm">
                  Tente ajustar os filtros ou verificar a disponibilidade dos dados.
                </p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => executeQuery(1)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recarregar
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}