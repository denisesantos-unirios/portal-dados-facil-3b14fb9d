import { useState } from "react";
import { GovBrHeader } from "@/components/GovBrHeader";
import { MainNav } from "@/components/MainNav";
import {
  Bell,
  Plus,
  AlertTriangle,
  Info,
  CheckCircle,
  Trash2,
  Send,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: "manutencao" | "info" | "alerta" | "sucesso";
  endpoint?: string;
  criadoEm: Date;
  ativo: boolean;
}

const tipoConfig = {
  manutencao: {
    label: "Manutenção",
    icon: Wrench,
    badgeClass: "bg-destructive text-destructive-foreground",
    iconClass: "text-destructive",
  },
  info: {
    label: "Informação",
    icon: Info,
    badgeClass: "bg-primary text-primary-foreground",
    iconClass: "text-primary",
  },
  alerta: {
    label: "Alerta",
    icon: AlertTriangle,
    badgeClass: "bg-accent text-accent-foreground",
    iconClass: "text-accent-foreground",
  },
  sucesso: {
    label: "Sucesso",
    icon: CheckCircle,
    badgeClass: "bg-success text-success-foreground",
    iconClass: "text-success",
  },
};

const Notifications = () => {
  const [notificacoes, setNotificacoes] = useState<Notification[]>([
    {
      id: "1",
      titulo: "Endpoint de Contratos em Manutenção",
      mensagem:
        "O endpoint /contratos estará indisponível das 22h às 06h para manutenção programada do banco de dados.",
      tipo: "manutencao",
      endpoint: "/contratos",
      criadoEm: new Date("2024-01-15T10:00:00"),
      ativo: true,
    },
    {
      id: "2",
      titulo: "Nova versão da API disponível",
      mensagem:
        "A versão 2.0 da API de Compras Governamentais está disponível. Consulte a documentação para mais detalhes sobre as novas funcionalidades.",
      tipo: "info",
      criadoEm: new Date("2024-01-14T14:30:00"),
      ativo: true,
    },
    {
      id: "3",
      titulo: "Atualização de Catálogos concluída",
      mensagem:
        "A sincronização dos catálogos de materiais e serviços foi concluída com sucesso. Todos os dados estão atualizados.",
      tipo: "sucesso",
      criadoEm: new Date("2024-01-13T09:15:00"),
      ativo: true,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [novaNotificacao, setNovaNotificacao] = useState({
    titulo: "",
    mensagem: "",
    tipo: "info" as Notification["tipo"],
    endpoint: "",
  });

  const handleCriarNotificacao = () => {
    const nova: Notification = {
      id: Date.now().toString(),
      titulo: novaNotificacao.titulo,
      mensagem: novaNotificacao.mensagem,
      tipo: novaNotificacao.tipo,
      endpoint: novaNotificacao.endpoint || undefined,
      criadoEm: new Date(),
      ativo: true,
    };
    setNotificacoes([nova, ...notificacoes]);
    setNovaNotificacao({ titulo: "", mensagem: "", tipo: "info", endpoint: "" });
    setDialogOpen(false);
  };

  const handleRemoverNotificacao = (id: string) => {
    setNotificacoes(notificacoes.filter((n) => n.id !== id));
  };

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header gov.br */}
      <GovBrHeader />

      {/* Main Navigation */}
      <MainNav />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/30 p-6">
        {/* Hero Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Central de Notificações</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie avisos sobre manutenções, atualizações e status dos endpoints
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 govbr-button-primary">
                <Plus className="h-4 w-4" />
                Nova Notificação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Notificação</DialogTitle>
                <DialogDescription>
                  Envie uma mensagem para todos os usuários do sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    placeholder="Ex: Manutenção programada"
                    value={novaNotificacao.titulo}
                    onChange={(e) =>
                      setNovaNotificacao({ ...novaNotificacao, titulo: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select
                    value={novaNotificacao.tipo}
                    onValueChange={(value: Notification["tipo"]) =>
                      setNovaNotificacao({ ...novaNotificacao, tipo: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manutencao">🔧 Manutenção</SelectItem>
                      <SelectItem value="info">ℹ️ Informação</SelectItem>
                      <SelectItem value="alerta">⚠️ Alerta</SelectItem>
                      <SelectItem value="sucesso">✅ Sucesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endpoint">Endpoint Afetado (opcional)</Label>
                  <Input
                    id="endpoint"
                    placeholder="Ex: /contratos, /fornecedores"
                    value={novaNotificacao.endpoint}
                    onChange={(e) =>
                      setNovaNotificacao({ ...novaNotificacao, endpoint: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Descreva os detalhes da notificação..."
                    rows={4}
                    value={novaNotificacao.mensagem}
                    onChange={(e) =>
                      setNovaNotificacao({ ...novaNotificacao, mensagem: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCriarNotificacao}
                  disabled={!novaNotificacao.titulo || !novaNotificacao.mensagem}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Enviar Notificação
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-4">
            {notificacoes.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Nenhuma notificação cadastrada</p>
                </CardContent>
              </Card>
            ) : (
              notificacoes.map((notificacao) => {
                const config = tipoConfig[notificacao.tipo];
                const Icon = config.icon;

                return (
                  <Card key={notificacao.id} className="shadow-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 ${config.iconClass}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{notificacao.titulo}</CardTitle>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <Badge className={config.badgeClass}>{config.label}</Badge>
                              {notificacao.endpoint && (
                                <Badge variant="outline" className="font-mono text-xs">
                                  {notificacao.endpoint}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatarData(notificacao.criadoEm)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoverNotificacao(notificacao.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{notificacao.mensagem}</p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Notifications;
