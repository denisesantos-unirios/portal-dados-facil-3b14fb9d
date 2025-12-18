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
  Filter, AlertCircle, Eye, X, SlidersHorizontal
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface DataListViewProps {
  module: ApiModule;
  endpoint: Endpoint;
}

const BASE_URL = "https://dadosabertos.compras.gov.br";

export function DataListView({ module, endpoint }: DataListViewProps) {
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { toast } = useToast();

  // Auto-load on mount
  useEffect(() => {
    executeQuery(1);
  }, [endpoint.id]);

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const buildUrl = (page?: number) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    if (page) queryParams.set("pagina", String(page));
    queryParams.set("tamanhoPagina", "20");
    const queryString = queryParams.toString();
    return `${BASE_URL}${endpoint.path}${queryString ? `?${queryString}` : ""}`;
  };

  const executeQuery = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const url = buildUrl(page);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (Array.isArray(result)) {
        setData(result);
        setTotalRecords(result.length);
      } else if (result.content || result.data || result.items || result.resultado) {
        const items = result.content || result.data || result.items || result.resultado || [];
        setData(Array.isArray(items) ? items : [items]);
        setTotalRecords(result.totalElements || result.total || result.totalRegistros || items.length);
      } else {
        setData([result]);
        setTotalRecords(1);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao executar consulta";
      setError(errorMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
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
    link.download = `${module.id}_${endpoint.id}_${new Date().toISOString().split("T")[0]}.csv`;
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
    return sortedKeys.slice(0, 8);
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{endpoint.description}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {module.name} • <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{endpoint.path.split("/").pop()}</code>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtros de Pesquisa
                  </SheetTitle>
                  <SheetDescription>
                    Configure os parâmetros para refinar sua consulta
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {endpoint.parameters && endpoint.parameters.length > 0 ? (
                    endpoint.parameters.map((param: Parameter) => (
                      <div key={param.name} className="space-y-1.5">
                        <Label htmlFor={param.name} className="text-sm flex items-center gap-2">
                          {formatColumnHeader(param.name)}
                          {param.required && (
                            <Badge variant="destructive" className="text-[10px] px-1 py-0">
                              obrigatório
                            </Badge>
                          )}
                        </Label>
                        <Input
                          id={param.name}
                          placeholder={param.example || param.description}
                          value={params[param.name] || ""}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                          className="h-9"
                        />
                        <p className="text-xs text-muted-foreground">{param.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      Esta consulta não possui parâmetros configuráveis.
                    </p>
                  )}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button onClick={() => { executeQuery(1); setFiltersOpen(false); }} className="flex-1">
                      <Search className="h-4 w-4 mr-2" />
                      Aplicar Filtros
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setParams({});
                        executeQuery(1);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
                    <TableHead className="w-[60px] text-center">Ver</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/30">
                      {getDisplayColumns(data[0]).map((col) => (
                        <TableCell key={col} className="max-w-[200px] truncate">
                          {formatCellValue(item[col])}
                        </TableCell>
                      ))}
                      <TableCell className="text-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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
            {totalRecords > 20 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Página {currentPage} • {Math.min(20, data.length)} de {totalRecords} registros
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
  );
}
