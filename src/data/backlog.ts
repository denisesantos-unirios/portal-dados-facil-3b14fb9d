export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";
export type TaskPriority = "high" | "medium" | "low";

export interface BacklogTask {
  id: string;
  title: string;
  description: string;
  module: string;
  endpoint?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
}

export interface BacklogSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tasks: BacklogTask[];
}

export const backlogSections: BacklogSection[] = [
  {
    id: "catalogo",
    title: "Catálogo de Materiais e Serviços",
    description: "Integração com módulos CATMAT e CATSER",
    icon: "Package",
    color: "bg-blue-500",
    tasks: [
      {
        id: "catmat-1",
        title: "Integrar consulta de Grupos de Material",
        description: "Implementar chamada GET para /modulo-material/1_consultarGrupoMaterial",
        module: "CATMAT",
        endpoint: "/modulo-material/1_consultarGrupoMaterial",
        status: "todo",
        priority: "high",
        tags: ["GET", "Material", "Hierarquia"],
      },
      {
        id: "catmat-2",
        title: "Integrar consulta de Classes de Material",
        description: "Implementar chamada GET para /modulo-material/2_consultarClasseMaterial",
        module: "CATMAT",
        endpoint: "/modulo-material/2_consultarClasseMaterial",
        status: "todo",
        priority: "high",
        tags: ["GET", "Material", "Hierarquia"],
      },
      {
        id: "catmat-3",
        title: "Integrar consulta de PDM Material",
        description: "Implementar chamada GET para /modulo-material/3_consultarPdmMaterial",
        module: "CATMAT",
        endpoint: "/modulo-material/3_consultarPdmMaterial",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Material", "PDM"],
      },
      {
        id: "catmat-4",
        title: "Integrar consulta de Itens de Material",
        description: "Implementar chamada GET para /modulo-material/4_consultarItemMaterial com paginação",
        module: "CATMAT",
        endpoint: "/modulo-material/4_consultarItemMaterial",
        status: "todo",
        priority: "high",
        tags: ["GET", "Material", "Paginação"],
      },
      {
        id: "catser-1",
        title: "Integrar consulta de Seção de Serviço",
        description: "Implementar chamada GET para /modulo-servico/1_consultarSecaoServico",
        module: "CATSER",
        endpoint: "/modulo-servico/1_consultarSecaoServico",
        status: "todo",
        priority: "high",
        tags: ["GET", "Serviço", "Hierarquia"],
      },
      {
        id: "catser-2",
        title: "Integrar consulta de Itens de Serviço",
        description: "Implementar chamada GET para /modulo-servico/6_consultarItemServico com filtros",
        module: "CATSER",
        endpoint: "/modulo-servico/6_consultarItemServico",
        status: "todo",
        priority: "high",
        tags: ["GET", "Serviço", "Filtros"],
      },
    ],
  },
  {
    id: "pesquisa-preco",
    title: "Pesquisa de Preços",
    description: "Integração com módulo de preços praticados",
    icon: "DollarSign",
    color: "bg-green-500",
    tasks: [
      {
        id: "preco-1",
        title: "Integrar consulta de preços de Material",
        description: "Implementar chamada GET para /modulo-pesquisa-preco/1_consultarMaterial",
        module: "Pesquisa Preço",
        endpoint: "/modulo-pesquisa-preco/1_consultarMaterial",
        status: "todo",
        priority: "high",
        tags: ["GET", "Preço", "Material"],
      },
      {
        id: "preco-2",
        title: "Implementar exportação CSV de Material",
        description: "Implementar download via /modulo-pesquisa-preco/1.1_consultarMaterial_CSV",
        module: "Pesquisa Preço",
        endpoint: "/modulo-pesquisa-preco/1.1_consultarMaterial_CSV",
        status: "todo",
        priority: "medium",
        tags: ["GET", "CSV", "Export"],
      },
      {
        id: "preco-3",
        title: "Integrar consulta de preços de Serviço",
        description: "Implementar chamada GET para /modulo-pesquisa-preco/3_consultarServico",
        module: "Pesquisa Preço",
        endpoint: "/modulo-pesquisa-preco/3_consultarServico",
        status: "todo",
        priority: "high",
        tags: ["GET", "Preço", "Serviço"],
      },
      {
        id: "preco-4",
        title: "Implementar detalhes de preço Material",
        description: "Implementar chamada GET para /modulo-pesquisa-preco/2_consultarMaterialDetalhe",
        module: "Pesquisa Preço",
        endpoint: "/modulo-pesquisa-preco/2_consultarMaterialDetalhe",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Detalhe", "Material"],
      },
    ],
  },
  {
    id: "contratacoes",
    title: "Contratações e Licitações",
    description: "Integração com módulos de contratações (Lei 14.133 e Legado)",
    icon: "FileText",
    color: "bg-cyan-500",
    tasks: [
      {
        id: "cont-1",
        title: "Integrar consulta de Contratações PNCP",
        description: "Implementar chamada GET para /modulo-contratacoes/1_consultarContratacoes_PNCP_14133",
        module: "Contratações",
        endpoint: "/modulo-contratacoes/1_consultarContratacoes_PNCP_14133",
        status: "todo",
        priority: "high",
        tags: ["GET", "PNCP", "14.133"],
      },
      {
        id: "cont-2",
        title: "Integrar consulta de Itens de Contratação",
        description: "Implementar chamada GET para /modulo-contratacoes/2_consultarItensContratacoes_PNCP_14133",
        module: "Contratações",
        endpoint: "/modulo-contratacoes/2_consultarItensContratacoes_PNCP_14133",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Itens", "PNCP"],
      },
      {
        id: "leg-1",
        title: "Integrar consulta de Licitações Legado",
        description: "Implementar chamada GET para /modulo-legado/1_consultarLicitacao",
        module: "Legado",
        endpoint: "/modulo-legado/1_consultarLicitacao",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Licitação", "8.666"],
      },
      {
        id: "leg-2",
        title: "Integrar consulta de Pregões",
        description: "Implementar chamada GET para /modulo-legado/3_consultarPregoes",
        module: "Legado",
        endpoint: "/modulo-legado/3_consultarPregoes",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Pregão", "Legado"],
      },
    ],
  },
  {
    id: "contratos-arp",
    title: "Contratos e Atas de Registro",
    description: "Integração com módulos de contratos e ARP",
    icon: "FileSignature",
    color: "bg-pink-500",
    tasks: [
      {
        id: "arp-1",
        title: "Integrar consulta de ARPs",
        description: "Implementar chamada GET para /modulo-arp/1_consultarARP",
        module: "ARP",
        endpoint: "/modulo-arp/1_consultarARP",
        status: "todo",
        priority: "high",
        tags: ["GET", "ARP", "Registro Preços"],
      },
      {
        id: "arp-2",
        title: "Integrar consulta de Itens ARP",
        description: "Implementar chamada GET para /modulo-arp/2_consultarARPItem",
        module: "ARP",
        endpoint: "/modulo-arp/2_consultarARPItem",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Itens", "ARP"],
      },
      {
        id: "contr-1",
        title: "Integrar consulta de Contratos",
        description: "Implementar chamada GET para /modulo-contratos/1_consultarContratos",
        module: "Contratos",
        endpoint: "/modulo-contratos/1_consultarContratos",
        status: "todo",
        priority: "high",
        tags: ["GET", "Contrato", "Vigência"],
      },
      {
        id: "contr-2",
        title: "Integrar consulta de Itens de Contrato",
        description: "Implementar chamada GET para /modulo-contratos/2_consultarContratosItem",
        module: "Contratos",
        endpoint: "/modulo-contratos/2_consultarContratosItem",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Itens", "Contrato"],
      },
    ],
  },
  {
    id: "uasg-fornecedor",
    title: "UASG e Fornecedores",
    description: "Integração com módulos de órgãos e fornecedores",
    icon: "Building2",
    color: "bg-indigo-500",
    tasks: [
      {
        id: "uasg-1",
        title: "Integrar consulta de UASGs",
        description: "Implementar chamada GET para /modulo-uasg/1_consultarUasg",
        module: "UASG",
        endpoint: "/modulo-uasg/1_consultarUasg",
        status: "todo",
        priority: "high",
        tags: ["GET", "UASG", "Órgão"],
      },
      {
        id: "uasg-2",
        title: "Integrar consulta de Órgãos",
        description: "Implementar chamada GET para /modulo-uasg/2_consultarOrgao",
        module: "UASG",
        endpoint: "/modulo-uasg/2_consultarOrgao",
        status: "todo",
        priority: "medium",
        tags: ["GET", "Órgão", "Estrutura"],
      },
      {
        id: "forn-1",
        title: "Integrar consulta de Fornecedores",
        description: "Implementar chamada GET para /modulo-fornecedor/1_consultarFornecedor",
        module: "Fornecedor",
        endpoint: "/modulo-fornecedor/1_consultarFornecedor",
        status: "todo",
        priority: "high",
        tags: ["GET", "Fornecedor", "CNPJ"],
      },
    ],
  },
  {
    id: "pgc-ocds",
    title: "PGC e OCDS",
    description: "Integração com planejamento e padrão internacional",
    icon: "ClipboardList",
    color: "bg-purple-500",
    tasks: [
      {
        id: "pgc-1",
        title: "Integrar consulta de PGC Detalhe",
        description: "Implementar chamada GET para /modulo-pgc/1_consultarPgcDetalhe",
        module: "PGC",
        endpoint: "/modulo-pgc/1_consultarPgcDetalhe",
        status: "todo",
        priority: "medium",
        tags: ["GET", "PGC", "Planejamento"],
      },
      {
        id: "pgc-2",
        title: "Integrar consulta de PGC Agregação",
        description: "Implementar chamada GET para /modulo-pgc/3_consultarPgcAgregacao",
        module: "PGC",
        endpoint: "/modulo-pgc/3_consultarPgcAgregacao",
        status: "todo",
        priority: "low",
        tags: ["GET", "PGC", "Agregação"],
      },
      {
        id: "ocds-1",
        title: "Integrar releases OCDS",
        description: "Implementar chamada GET para /modulo-ocds/1_releases",
        module: "OCDS",
        endpoint: "/modulo-ocds/1_releases",
        status: "todo",
        priority: "low",
        tags: ["GET", "OCDS", "Internacional"],
      },
    ],
  },
  {
    id: "alice",
    title: "Integração ALICE",
    description: "Integração com o Analisador de Licitações",
    icon: "Bot",
    color: "bg-violet-500",
    tasks: [
      {
        id: "alice-1",
        title: "Integrar avisos restritos ALICE",
        description: "Implementar chamada GET para /alice/avisos-restritos",
        module: "ALICE",
        endpoint: "/alice/avisos-restritos",
        status: "todo",
        priority: "medium",
        tags: ["GET", "ALICE", "Avisos"],
      },
      {
        id: "alice-2",
        title: "Integrar consulta de compras ALICE",
        description: "Implementar chamada GET para /alice/compras",
        module: "ALICE",
        endpoint: "/alice/compras",
        status: "todo",
        priority: "medium",
        tags: ["GET", "ALICE", "Compras"],
      },
      {
        id: "alice-3",
        title: "Integrar tickets ALICE",
        description: "Implementar chamada GET para /alice/tickets",
        module: "ALICE",
        endpoint: "/alice/tickets",
        status: "todo",
        priority: "low",
        tags: ["GET", "ALICE", "Tickets"],
      },
    ],
  },
  {
    id: "infra",
    title: "Infraestrutura e Utilitários",
    description: "Configurações gerais e funcionalidades de suporte",
    icon: "Settings",
    color: "bg-slate-500",
    tasks: [
      {
        id: "infra-1",
        title: "Configurar interceptor de requisições",
        description: "Implementar axios interceptor para tratamento de erros e retry",
        module: "Infra",
        status: "todo",
        priority: "high",
        tags: ["Axios", "Error Handling", "Retry"],
      },
      {
        id: "infra-2",
        title: "Implementar cache de requisições",
        description: "Configurar React Query para cache e invalidação automática",
        module: "Infra",
        status: "todo",
        priority: "medium",
        tags: ["Cache", "React Query", "Performance"],
      },
      {
        id: "infra-3",
        title: "Implementar paginação genérica",
        description: "Criar hook reutilizável para paginação de resultados",
        module: "Infra",
        status: "todo",
        priority: "high",
        tags: ["Hook", "Paginação", "Reutilizável"],
      },
      {
        id: "infra-4",
        title: "Implementar exportação genérica CSV",
        description: "Criar utilitário para download de arquivos CSV",
        module: "Infra",
        status: "todo",
        priority: "medium",
        tags: ["CSV", "Download", "Utilitário"],
      },
      {
        id: "infra-5",
        title: "Configurar variáveis de ambiente",
        description: "Definir BASE_URL e outras configs via .env",
        module: "Infra",
        status: "todo",
        priority: "high",
        tags: ["Env", "Config", "Segurança"],
      },
    ],
  },
];

export const getTaskStats = () => {
  let total = 0;
  let todo = 0;
  let inProgress = 0;
  let done = 0;
  let highPriority = 0;

  backlogSections.forEach((section) => {
    section.tasks.forEach((task) => {
      total++;
      if (task.status === "todo") todo++;
      if (task.status === "in_progress") inProgress++;
      if (task.status === "done") done++;
      if (task.priority === "high") highPriority++;
    });
  });

  return { total, todo, inProgress, done, highPriority };
};
