import { GovBrHeader } from "@/components/GovBrHeader";
import { GovBrFooter } from "@/components/GovBrFooter";
import { MainNav } from "@/components/MainNav";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import {
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
      {/* Header gov.br */}
      <GovBrHeader />

      {/* Main Navigation */}
      <MainNav />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/30 p-6">
        {/* Hero Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Análise consolidada de dados de compras governamentais - Portal de Dados Abertos
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Materiais</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12.847</div>
              <p className="text-xs text-muted-foreground">+5.2% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Serviços</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8.234</div>
              <p className="text-xs text-muted-foreground">+2.8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3.456</div>
              <p className="text-xs text-muted-foreground">+12.3% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Volume Negociado</CardTitle>
              <DollarSign className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ 2.4B</div>
              <p className="text-xs text-muted-foreground">+8.7% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap Timeline */}
        <div className="mb-6">
          <RoadmapTimeline />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contratos por Mês */}
          <Card className="shadow-card">
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
          <Card className="shadow-card">
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
          <Card className="lg:col-span-2 shadow-card">
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

      <GovBrFooter />
    </div>
  );
};

export default Dashboard;
