import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import {
  Database,
  MessageSquare,
  LayoutGrid,
  BarChart3,
  Bell,
  TrendingUp,
  Package,
  FileText,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const contratosPorMes = [
  { mes: "Jan", contratos: 145 },
  { mes: "Fev", contratos: 132 },
  { mes: "Mar", contratos: 178 },
  { mes: "Abr", contratos: 156 },
  { mes: "Mai", contratos: 189 },
  { mes: "Jun", contratos: 201 },
];

const distribuicaoCategoria = [
  { categoria: "Materiais", valor: 35, fill: "hsl(var(--chart-1))" },
  { categoria: "Serviços", valor: 40, fill: "hsl(var(--chart-2))" },
  { categoria: "Obras", valor: 15, fill: "hsl(var(--chart-3))" },
  { categoria: "Outros", valor: 10, fill: "hsl(var(--chart-4))" },
];

const tendenciaSemanal = [
  { semana: "Sem 1", processos: 42 },
  { semana: "Sem 2", processos: 38 },
  { semana: "Sem 3", processos: 55 },
  { semana: "Sem 4", processos: 48 },
  { semana: "Sem 5", processos: 62 },
  { semana: "Sem 6", processos: 58 },
];

const chartConfig: ChartConfig = {
  contratos: {
    label: "Contratos",
    color: "hsl(var(--chart-1))",
  },
  processos: {
    label: "Processos",
    color: "hsl(var(--chart-2))",
  },
};

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Nav Bar */}
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
            </NavLink>
            <NavLink
              to="/"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
              activeClassName="text-foreground bg-muted font-medium"
            >
              <LayoutGrid className="h-4 w-4" />
              Sistema
            </NavLink>
            <NavLink
              to="/notificacoes"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
              activeClassName="text-foreground bg-muted font-medium"
            >
              <Bell className="h-4 w-4" />
              Notificações
            </NavLink>
            <NavLink
              to="/forum"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors flex items-center gap-2"
              activeClassName="text-foreground bg-muted font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              Fórum
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/30 p-6">
        {/* Hero Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Visão Geral - Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Análise consolidada de dados de compras governamentais
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Materiais</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.847</div>
              <p className="text-xs text-muted-foreground">+5.2% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Serviços</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.234</div>
              <p className="text-xs text-muted-foreground">+2.8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.456</div>
              <p className="text-xs text-muted-foreground">+12.3% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Volume Negociado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 2.4B</div>
              <p className="text-xs text-muted-foreground">+8.7% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contratos por Mês */}
          <Card>
            <CardHeader>
              <CardTitle>Contratos por Mês</CardTitle>
              <CardDescription>Quantidade de contratos firmados por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={contratosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="contratos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Distribuição por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
              <CardDescription>Proporção de compras por tipo de categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={distribuicaoCategoria}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="valor"
                    nameKey="categoria"
                    label={({ categoria, valor }) => `${categoria}: ${valor}%`}
                  >
                    {distribuicaoCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Tendência Semanal */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tendência Semanal de Processos</CardTitle>
              <CardDescription>Evolução do número de processos nas últimas semanas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={tendenciaSemanal}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="semana" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="processos"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
