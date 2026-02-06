import { Link } from "react-router-dom";
import { GovBrHeader } from "@/components/GovBrHeader";
import { GovBrFooter } from "@/components/GovBrFooter";
import { MainNav } from "@/components/MainNav";
import { apiModules } from "@/data/modules";
import {
  Search,
  Database,
  BarChart3,
  FileCode2,
  BookOpen,
  ArrowRight,
  Package,
  Briefcase,
  DollarSign,
  ClipboardList,
  Landmark,
  History,
  FileSignature,
  ShoppingCart,
  FileText,
  Users,
  Globe,
  Shield,
  ExternalLink,
  TrendingUp,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroPattern from "@/assets/hero-pattern.jpg";

const iconMap: Record<string, React.ElementType> = {
  Package, Briefcase, DollarSign, ClipboardList, Landmark,
  History, FileSignature, ShoppingCart, FileText, Users, Globe, Shield,
};

const totalEndpoints = apiModules.reduce((acc, m) => acc + m.endpoints.length, 0);

const stats = [
  { label: "Módulos de Dados", value: apiModules.length.toString(), icon: Database },
  { label: "Endpoints Disponíveis", value: totalEndpoints.toString(), icon: FileCode2 },
  { label: "Formatos Abertos", value: "JSON / CSV", icon: Download },
  { label: "Atualização", value: "Diária", icon: TrendingUp },
];

const highlights = [
  {
    title: "Explorar Dados",
    description: "Navegue pelos módulos e consulte dados abertos de compras públicas com filtros avançados e exportação CSV.",
    icon: Database,
    link: "/sistema",
    linkLabel: "Acessar Sistema",
    accent: "primary",
  },
  {
    title: "Visão Geral",
    description: "Acompanhe indicadores, estatísticas consolidadas e o roadmap de evolução do portal.",
    icon: BarChart3,
    link: "/dashboard",
    linkLabel: "Ver Dashboard",
    accent: "primary",
  },
  {
    title: "Documentação da API",
    description: "Consulte as Histórias de Usuário, critérios de aceite e regras de negócio de cada endpoint.",
    icon: BookOpen,
    link: "/documentacao",
    linkLabel: "Ver Documentação",
    accent: "primary",
  },
  {
    title: "Fórum da Comunidade",
    description: "Participe de discussões, tire dúvidas e contribua com sugestões para o aprimoramento do portal.",
    icon: Users,
    link: "/forum",
    linkLabel: "Participar",
    accent: "primary",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovBrHeader />
      <MainNav />

      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPattern})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-primary/90 to-secondary/95" />
        <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-accent text-accent-foreground font-semibold px-3 py-1 text-xs">
              Dados Abertos • Governo Federal
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Portal de Dados Abertos de Compras Públicas
            </h1>
            <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Acesse informações sobre contratações, licitações, preços e fornecedores do Governo Federal.
              Transparência e controle social ao alcance de todos.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar conjuntos de dados, endpoints, módulos..."
                  className="w-full h-12 pl-12 pr-4 rounded-sm bg-white text-foreground placeholder:text-muted-foreground border-0 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
              </div>
              <button className="h-12 px-6 rounded-sm bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors text-sm shrink-0">
                Buscar
              </button>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2 mt-6">
              {["Materiais", "Serviços", "Licitações", "Contratos", "Fornecedores"].map((tag) => (
                <Link
                  key={tag}
                  to="/sistema"
                  className="px-3 py-1.5 rounded-sm bg-white/10 text-white/90 text-xs hover:bg-white/20 transition-colors border border-white/10"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 py-6 px-4 lg:px-6">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              O que você encontra aqui
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore as funcionalidades do portal e acesse dados abertos de contratações públicas do Governo Federal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {highlights.map((item) => (
              <Card key={item.title} className="group hover:shadow-elevated transition-shadow border-border">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {item.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conjuntos de Dados (Modules) */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Conjuntos de Dados
              </h2>
              <p className="text-muted-foreground">
                Módulos organizados por tema para consulta via API REST.
              </p>
            </div>
            <Link
              to="/sistema"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiModules.map((mod) => {
              const IconComponent = iconMap[mod.icon] || Database;
              return (
                <Link
                  key={mod.id}
                  to="/sistema"
                  className="group flex gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-card bg-background transition-all"
                >
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {mod.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{mod.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                        {mod.endpoints.length} endpoints
                      </Badge>
                      <span className="text-xs text-muted-foreground">REST • JSON</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link
              to="/sistema"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Ver todos os módulos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Open Data */}
      <section className="py-12 lg:py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary font-semibold px-3 py-1 text-xs border-0">
                Transparência
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                O que são Dados Abertos?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Dados Abertos</strong> são informações que podem ser livremente acessadas,
                utilizadas, reutilizadas e redistribuídas por qualquer pessoa.
                No contexto de compras públicas, representam um pilar fundamental da transparência governamental.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Este portal disponibiliza dados do <strong className="text-foreground">Sistema Integrado de Administração e Serviços Gerais (SIASG)</strong> e
                do <strong className="text-foreground">Compras.gov.br</strong>, abrangendo todo o ciclo de contratações públicas do Governo Federal.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://dadosabertos.compras.gov.br/swagger-ui/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="govbr-button-secondary inline-flex items-center gap-2 text-sm"
                >
                  API Swagger
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <Link
                  to="/documentacao"
                  className="govbr-button-primary inline-flex items-center gap-2 text-sm"
                >
                  Documentação
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Transparência", desc: "Dados públicos acessíveis para controle social" },
                { icon: Globe, title: "Padrão OCDS", desc: "Compatível com Open Contracting Data Standard" },
                { icon: FileCode2, title: "API REST", desc: "Endpoints documentados com formato JSON/CSV" },
                { icon: TrendingUp, title: "Atualizado", desc: "Dados sincronizados com os sistemas oficiais" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg bg-card border border-border"
                >
                  <item.icon className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-14 bg-secondary text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            Comece a explorar agora
          </h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Acesse o sistema de consulta e navegue pelos módulos de dados abertos de compras públicas do Governo Federal.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/sistema"
              className="h-11 px-6 rounded-sm bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-2 text-sm"
            >
              Explorar Dados
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="h-11 px-6 rounded-sm bg-transparent border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2 text-sm"
            >
              Visão Geral
            </Link>
          </div>
        </div>
      </section>

      <GovBrFooter />
    </div>
  );
}
