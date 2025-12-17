import { useState } from "react";
import { Endpoint, Parameter } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Loader2, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EndpointPanelProps {
  endpoints: Endpoint[];
  moduleName: string;
}

const BASE_URL = "https://dadosabertos.compras.gov.br/modulo-pesquisa-preco";

export function EndpointPanel({ endpoints, moduleName }: EndpointPanelProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(endpoints[0] || null);
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const buildUrl = () => {
    if (!selectedEndpoint) return "";
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    const queryString = queryParams.toString();
    return `${BASE_URL}${selectedEndpoint.path}${queryString ? `?${queryString}` : ""}`;
  };

  const executeQuery = async () => {
    if (!selectedEndpoint) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const url = buildUrl();
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResult(data);
      toast({
        title: "Consulta realizada",
        description: "Os dados foram carregados com sucesso.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao executar consulta";
      setError(errorMessage);
      toast({
        title: "Erro na consulta",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copiado!", description: "JSON copiado para a área de transferência." });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{moduleName}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Selecione um endpoint e configure os parâmetros
          </p>
        </div>
        <a
          href="https://dadosabertos.compras.gov.br/swagger-ui/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          Documentação <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <Tabs
        defaultValue={endpoints[0]?.id}
        onValueChange={(value) => {
          const endpoint = endpoints.find((e) => e.id === value);
          setSelectedEndpoint(endpoint || null);
          setParams({});
          setResult(null);
          setError(null);
        }}
      >
        <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {endpoints.map((endpoint) => (
            <TabsTrigger
              key={endpoint.id}
              value={endpoint.id}
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Badge
                variant="outline"
                className={`mr-1.5 text-[10px] px-1 py-0 ${
                  endpoint.method === "GET" ? "border-secondary text-secondary" : "border-primary text-primary"
                }`}
              >
                {endpoint.method}
              </Badge>
              {endpoint.description}
            </TabsTrigger>
          ))}
        </TabsList>

        {endpoints.map((endpoint) => (
          <TabsContent key={endpoint.id} value={endpoint.id} className="mt-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-secondary text-secondary-foreground">{endpoint.method}</Badge>
                  <code className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    {endpoint.path}
                  </code>
                </div>
                <CardDescription className="mt-2">{endpoint.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {endpoint.parameters.map((param: Parameter) => (
                      <div key={param.name} className="space-y-1.5">
                        <Label htmlFor={param.name} className="text-sm flex items-center gap-2">
                          {param.name}
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
                )}

                <div className="pt-2">
                  <Label className="text-sm text-muted-foreground">URL da Requisição</Label>
                  <code className="block mt-1.5 text-xs bg-muted p-3 rounded-lg break-all text-foreground">
                    {buildUrl()}
                  </code>
                </div>

                <Button
                  onClick={executeQuery}
                  disabled={loading}
                  className="w-full gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Consultando...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Executar Consulta
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {(result || error) && (
        <Card className="animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {error ? "Erro" : "Resultado"}
              </CardTitle>
              {result && (
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? (
                    <Check className="h-4 w-4 mr-1.5" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1.5" />
                  )}
                  {copied ? "Copiado" : "Copiar JSON"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-lg border bg-muted/30">
              <pre className="p-4 text-xs">
                {error ? (
                  <span className="text-destructive">{error}</span>
                ) : (
                  <code className="text-foreground">{JSON.stringify(result, null, 2)}</code>
                )}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
