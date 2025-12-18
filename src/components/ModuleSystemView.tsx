import { useState } from "react";
import { ApiModule, Endpoint, Parameter } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Loader2, Download, RefreshCw, ChevronLeft, ChevronRight, 
  Filter, List, FileText, AlertCircle, Database, Eye
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
import { Separator } from "@/components/ui/separator";

interface ModuleSystemViewProps {
  module: ApiModule;
}

const BASE_URL = "https://dadosabertos.compras.gov.br";

export function ModuleSystemView({ module }: ModuleSystemViewProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(module.endpoints[0]);
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const { toast } = useToast();

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const buildUrl = (page?: number) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    if (page) queryParams.set("pagina", String(page));
    const queryString = queryParams.toString();
    return `${BASE_URL}${selectedEndpoint.path}${queryString ? `?${queryString}` : ""}`;
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
      
      // Handle different response structures
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

      toast({
        title: "Consulta realizada",
        description: `${data.length} registros encontrados`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao executar consulta";
      setError(errorMessage);
      setData([]);
      toast({
        title: "Erro na consulta",
        description: errorMessage,
        variant: "destructive",
      });
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
    link.download = `${module.id}_${selectedEndpoint.id}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast({ title: "Exportado!", description: "Arquivo CSV gerado com sucesso." });
  };

  const getDisplayColumns = (item: any): string[] => {
    if (!item) return [];
    const keys = Object.keys(item);
    // Prioritize important columns
    const priorityKeys = ["codigo", "id", "nome", "descricao", "valor", "data", "status", "tipo"];
    const sortedKeys = [
      ...priorityKeys.filter(k => keys.some(key => key.toLowerCase().includes(k))),
      ...keys.filter(k => !priorityKeys.some(pk => k.toLowerCase().includes(pk)))
    ];
    return sortedKeys.slice(0, 8); // Show max 8 columns in table
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            {module.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {module.endpoints.length} funcionalidades
        </Badge>
      </div>

      {/* Endpoint Selection as Menu */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <List className="h-4 w-4" />
            Funcionalidades do Módulo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {module.endpoints.map((endpoint) => (
              <Button
                key={endpoint.id}
                variant={selectedEndpoint.id === endpoint.id ? "default" : "outline"}
                className={`justify-start h-auto py-3 px-4 text-left ${
                  selectedEndpoint.id === endpoint.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                }`}
                onClick={() => {
                  setSelectedEndpoint(endpoint);
                  setParams({});
                  setData([]);
                  setError(null);
                }}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-medium text-sm">{endpoint.description}</span>
                  <code className="text-xs opacity-70">{endpoint.path.split("/").pop()}</code>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search/Filter Form */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros de Pesquisa
          </CardTitle>
          <CardDescription>{selectedEndpoint.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedEndpoint.parameters.map((param: Parameter) => (
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
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Esta consulta não possui parâmetros configuráveis.</p>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => executeQuery(1)}
              disabled={loading}
              className="flex-1 sm:flex-none"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Consultando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Pesquisar
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setParams({});
                setData([]);
                setError(null);
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Erro na consulta</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resultados
                <Badge variant="secondary" className="ml-2">
                  {totalRecords} registros
                </Badge>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={exportToCsv}>
                <Download className="h-4 w-4 mr-1.5" />
                Exportar CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <div className="rounded-lg border overflow-hidden">
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
                    {data.slice(0, 20).map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        {getDisplayColumns(data[0]).map((col) => (
                          <TableCell key={col} className="max-w-[200px] truncate">
                            {formatCellValue(item[col])}
                          </TableCell>
                        ))}
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedRecord(item)}
                              >
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
              </div>
            </ScrollArea>

            {/* Pagination */}
            {totalRecords > 20 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Mostrando página {currentPage} • {Math.min(20, data.length)} de {totalRecords} registros
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
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && data.length === 0 && (
        <Card className="border-dashed border-2 border-border/50 bg-muted/20">
          <CardContent className="py-12">
            <div className="text-center">
              <Database className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">
                Nenhum resultado ainda
              </h3>
              <p className="text-sm text-muted-foreground/70 mt-1 max-w-sm mx-auto">
                Configure os filtros acima e clique em "Pesquisar" para visualizar os dados.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}