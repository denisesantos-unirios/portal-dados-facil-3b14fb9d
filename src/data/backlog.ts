export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";
export type TaskPriority = "high" | "medium" | "low";

export interface UserStory {
  id: string;
  description: string;
  acceptanceCriteria: string[];
}

export interface BacklogTask {
  id: string;
  title: string;
  description: string;
  objective: string;
  userStories: UserStory[];
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
        objective: "Permitir que o usuário visualize a lista hierárquica de grupos de materiais do catálogo CATMAT para navegação e seleção.",
        userStories: [
          {
            id: "HU-CATMAT-01",
            description: "Como comprador, quero listar todos os grupos de materiais para navegar pela hierarquia do catálogo.",
            acceptanceCriteria: [
              "Exibir código e descrição de cada grupo",
              "Permitir busca por código ou descrição",
              "Ordenar resultados alfabeticamente"
            ]
          },
          {
            id: "HU-CATMAT-02",
            description: "Como gestor, quero filtrar grupos por status ativo/inativo para ver apenas itens válidos.",
            acceptanceCriteria: [
              "Filtro de status funcional",
              "Indicação visual de status",
              "Contagem de itens por status"
            ]
          }
        ],
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
        objective: "Permitir navegação nas classes de material, segundo nível da hierarquia CATMAT, associadas aos grupos.",
        userStories: [
          {
            id: "HU-CATMAT-03",
            description: "Como comprador, quero ver as classes dentro de um grupo para refinar minha busca de materiais.",
            acceptanceCriteria: [
              "Listar classes filtradas por grupo selecionado",
              "Exibir código, descrição e grupo pai",
              "Permitir navegação breadcrumb"
            ]
          },
          {
            id: "HU-CATMAT-04",
            description: "Como analista, quero buscar classes por palavra-chave para encontrar categorias específicas.",
            acceptanceCriteria: [
              "Campo de busca com autocomplete",
              "Highlight nos termos encontrados",
              "Resultados em tempo real"
            ]
          }
        ],
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
        objective: "Disponibilizar consulta ao Padrão Descritivo de Material (PDM) para especificações técnicas padronizadas.",
        userStories: [
          {
            id: "HU-CATMAT-05",
            description: "Como especificador, quero acessar o PDM de um material para usar descrições padronizadas em editais.",
            acceptanceCriteria: [
              "Exibir todos os campos do PDM",
              "Permitir cópia da descrição completa",
              "Mostrar unidades de medida válidas"
            ]
          },
          {
            id: "HU-CATMAT-06",
            description: "Como comprador, quero ver materiais similares via PDM para comparar especificações.",
            acceptanceCriteria: [
              "Listar materiais com mesmo PDM",
              "Comparativo lado a lado",
              "Exportar comparativo"
            ]
          }
        ],
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
        objective: "Permitir busca e visualização detalhada de itens específicos do catálogo de materiais com suporte a grandes volumes de dados.",
        userStories: [
          {
            id: "HU-CATMAT-07",
            description: "Como comprador, quero buscar itens de material por código ou descrição para encontrar o item exato.",
            acceptanceCriteria: [
              "Busca por código CATMAT",
              "Busca por descrição parcial",
              "Paginação com 50 itens por página"
            ]
          },
          {
            id: "HU-CATMAT-08",
            description: "Como gestor, quero ver detalhes completos de um item incluindo sustentabilidade.",
            acceptanceCriteria: [
              "Modal com detalhes expandidos",
              "Indicador de item sustentável",
              "Histórico de alterações"
            ]
          }
        ],
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
        objective: "Disponibilizar a navegação na estrutura hierárquica do catálogo de serviços (CATSER) começando pelas seções.",
        userStories: [
          {
            id: "HU-CATSER-01",
            description: "Como comprador, quero listar seções de serviço para iniciar a navegação no catálogo CATSER.",
            acceptanceCriteria: [
              "Listar todas as seções ativas",
              "Exibir código e nome da seção",
              "Mostrar quantidade de serviços por seção"
            ]
          },
          {
            id: "HU-CATSER-02",
            description: "Como analista, quero comparar seções para entender a organização do catálogo.",
            acceptanceCriteria: [
              "Visão em cards ou lista",
              "Estatísticas por seção",
              "Navegação para subníveis"
            ]
          }
        ],
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
        objective: "Permitir busca avançada de serviços do catálogo com múltiplos critérios de filtro.",
        userStories: [
          {
            id: "HU-CATSER-03",
            description: "Como comprador, quero buscar serviços por código ou descrição com filtros avançados.",
            acceptanceCriteria: [
              "Filtros por seção, divisão, grupo, classe",
              "Busca textual na descrição",
              "Combinação de múltiplos filtros"
            ]
          },
          {
            id: "HU-CATSER-04",
            description: "Como especificador, quero ver unidades de medida válidas para cada serviço.",
            acceptanceCriteria: [
              "Lista de unidades por serviço",
              "Unidade padrão destacada",
              "Conversões quando aplicável"
            ]
          }
        ],
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
        objective: "Disponibilizar consulta de preços praticados em compras públicas para materiais, apoiando a pesquisa de preços.",
        userStories: [
          {
            id: "HU-PRECO-01",
            description: "Como comprador, quero pesquisar preços de um material por código CATMAT para embasar minha pesquisa de preços.",
            acceptanceCriteria: [
              "Busca por código CATMAT",
              "Exibir preço mínimo, médio, máximo",
              "Filtrar por período de compra"
            ]
          },
          {
            id: "HU-PRECO-02",
            description: "Como analista, quero ver estatísticas de preço por região/UF para análise de mercado.",
            acceptanceCriteria: [
              "Agrupamento por UF",
              "Gráfico de variação regional",
              "Exportar análise"
            ]
          }
        ],
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
        objective: "Permitir exportação dos resultados de pesquisa de preços de materiais em formato CSV para uso em planilhas.",
        userStories: [
          {
            id: "HU-PRECO-03",
            description: "Como comprador, quero exportar resultados da pesquisa de preços em CSV para anexar ao processo.",
            acceptanceCriteria: [
              "Botão de exportação visível",
              "Download inicia automaticamente",
              "CSV com todos os campos consultados"
            ]
          },
          {
            id: "HU-PRECO-04",
            description: "Como auditor, quero baixar histórico de preços para análise offline.",
            acceptanceCriteria: [
              "Exportação com filtros aplicados",
              "Limite de registros configurável",
              "Nome do arquivo com data/hora"
            ]
          }
        ],
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
        objective: "Disponibilizar consulta de preços praticados para serviços contratados pelo governo.",
        userStories: [
          {
            id: "HU-PRECO-05",
            description: "Como comprador, quero pesquisar preços de serviços por código CATSER para referência em contratações.",
            acceptanceCriteria: [
              "Busca por código CATSER",
              "Filtro por modalidade de contratação",
              "Preços por unidade de medida"
            ]
          },
          {
            id: "HU-PRECO-06",
            description: "Como gestor, quero comparar preços de serviços similares para negociação.",
            acceptanceCriteria: [
              "Seleção múltipla de serviços",
              "Tabela comparativa",
              "Indicador de melhor preço"
            ]
          }
        ],
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
        objective: "Exibir informações detalhadas de uma compra específica incluindo órgão, fornecedor e condições.",
        userStories: [
          {
            id: "HU-PRECO-07",
            description: "Como comprador, quero ver detalhes de uma compra para validar a referência de preço.",
            acceptanceCriteria: [
              "Modal com dados completos da compra",
              "Informações do órgão comprador",
              "Dados do fornecedor vencedor"
            ]
          },
          {
            id: "HU-PRECO-08",
            description: "Como auditor, quero rastrear a origem do preço até a contratação original.",
            acceptanceCriteria: [
              "Link para licitação/contrato origem",
              "Número do processo",
              "Data da homologação"
            ]
          }
        ],
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
        objective: "Permitir consulta de contratações realizadas sob a nova Lei de Licitações (14.133/21) integradas ao PNCP.",
        userStories: [
          {
            id: "HU-CONT-01",
            description: "Como cidadão, quero consultar contratações públicas recentes para acompanhar gastos governamentais.",
            acceptanceCriteria: [
              "Filtro por órgão/UASG",
              "Filtro por período",
              "Filtro por modalidade"
            ]
          },
          {
            id: "HU-CONT-02",
            description: "Como fornecedor, quero ver oportunidades de contratação abertas na minha área de atuação.",
            acceptanceCriteria: [
              "Filtro por objeto/descrição",
              "Filtro por valor estimado",
              "Alerta de novas publicações"
            ]
          }
        ],
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
        objective: "Exibir detalhes dos itens de uma contratação específica incluindo quantidades e valores.",
        userStories: [
          {
            id: "HU-CONT-03",
            description: "Como analista, quero ver os itens de uma contratação para análise detalhada.",
            acceptanceCriteria: [
              "Lista de itens com descrição",
              "Quantidade e valor unitário",
              "Valor total por item"
            ]
          },
          {
            id: "HU-CONT-04",
            description: "Como comprador, quero comparar itens entre diferentes contratações.",
            acceptanceCriteria: [
              "Exportar itens selecionados",
              "Comparativo de preços",
              "Identificar variações significativas"
            ]
          }
        ],
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
        objective: "Manter acesso ao histórico de licitações realizadas sob a Lei 8.666/93 e outras modalidades anteriores.",
        userStories: [
          {
            id: "HU-LEG-01",
            description: "Como pesquisador, quero acessar licitações históricas para análises comparativas.",
            acceptanceCriteria: [
              "Filtro por ano/período",
              "Filtro por modalidade (8.666)",
              "Dados de arquivo preservados"
            ]
          },
          {
            id: "HU-LEG-02",
            description: "Como auditor, quero consultar processos licitatórios antigos para verificação.",
            acceptanceCriteria: [
              "Busca por número do processo",
              "Acesso a documentos anexos",
              "Rastreabilidade completa"
            ]
          }
        ],
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
        objective: "Disponibilizar consulta específica de pregões eletrônicos realizados no sistema legado.",
        userStories: [
          {
            id: "HU-LEG-03",
            description: "Como comprador, quero consultar pregões anteriores como referência para novas aquisições.",
            acceptanceCriteria: [
              "Filtro por UASG compradora",
              "Filtro por situação do pregão",
              "Histórico de lances quando disponível"
            ]
          },
          {
            id: "HU-LEG-04",
            description: "Como fornecedor, quero ver meu histórico de participação em pregões.",
            acceptanceCriteria: [
              "Filtro por CNPJ fornecedor",
              "Status de cada participação",
              "Valores ofertados"
            ]
          }
        ],
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
        objective: "Permitir consulta de Atas de Registro de Preços vigentes para adesão (carona) por outros órgãos.",
        userStories: [
          {
            id: "HU-ARP-01",
            description: "Como comprador, quero buscar ARPs vigentes para avaliar possibilidade de adesão.",
            acceptanceCriteria: [
              "Filtro por item/material/serviço",
              "Mostrar apenas ARPs com saldo",
              "Indicar prazo de vigência"
            ]
          },
          {
            id: "HU-ARP-02",
            description: "Como gestor de ARP, quero acompanhar o consumo da minha ata.",
            acceptanceCriteria: [
              "Saldo disponível por item",
              "Histórico de adesões",
              "Projeção de esgotamento"
            ]
          }
        ],
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
        objective: "Exibir itens detalhados de uma ARP incluindo quantidades, preços e fornecedores.",
        userStories: [
          {
            id: "HU-ARP-03",
            description: "Como comprador, quero ver todos os itens de uma ARP com preços e quantidades.",
            acceptanceCriteria: [
              "Lista completa de itens",
              "Preço unitário registrado",
              "Quantidade total e saldo"
            ]
          },
          {
            id: "HU-ARP-04",
            description: "Como analista, quero comparar itens de diferentes ARPs para escolher a melhor opção.",
            acceptanceCriteria: [
              "Seleção múltipla de ARPs",
              "Comparativo de preços e condições",
              "Ranking por economia"
            ]
          }
        ],
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
        objective: "Disponibilizar consulta de contratos administrativos vigentes e encerrados.",
        userStories: [
          {
            id: "HU-CONTR-01",
            description: "Como gestor de contratos, quero listar contratos do meu órgão para gestão de vigências.",
            acceptanceCriteria: [
              "Filtro por UASG",
              "Filtro por vigência (vigente/encerrado)",
              "Alerta de contratos a vencer"
            ]
          },
          {
            id: "HU-CONTR-02",
            description: "Como cidadão, quero consultar contratos públicos para transparência.",
            acceptanceCriteria: [
              "Busca por objeto",
              "Valor total do contrato",
              "Dados do contratado"
            ]
          }
        ],
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
        objective: "Exibir itens contratados com quantidades, valores e cronograma de entrega.",
        userStories: [
          {
            id: "HU-CONTR-03",
            description: "Como fiscal de contrato, quero ver os itens para acompanhar entregas.",
            acceptanceCriteria: [
              "Lista de itens do contrato",
              "Quantidade contratada vs entregue",
              "Status de cada item"
            ]
          },
          {
            id: "HU-CONTR-04",
            description: "Como analista, quero extrair itens para relatórios de execução.",
            acceptanceCriteria: [
              "Exportar para Excel/CSV",
              "Agrupamento por categoria",
              "Totalização de valores"
            ]
          }
        ],
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
        objective: "Permitir busca e visualização de Unidades Administrativas de Serviços Gerais cadastradas.",
        userStories: [
          {
            id: "HU-UASG-01",
            description: "Como usuário, quero buscar UASGs por código ou nome para identificar órgãos compradores.",
            acceptanceCriteria: [
              "Busca por código UASG",
              "Busca por nome/sigla",
              "Filtro por UF/município"
            ]
          },
          {
            id: "HU-UASG-02",
            description: "Como analista, quero ver informações completas de uma UASG.",
            acceptanceCriteria: [
              "Dados cadastrais completos",
              "Órgão superior vinculado",
              "Situação (ativa/inativa)"
            ]
          }
        ],
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
        objective: "Disponibilizar a estrutura hierárquica de órgãos da administração pública federal.",
        userStories: [
          {
            id: "HU-UASG-03",
            description: "Como usuário, quero navegar na estrutura de órgãos para entender a hierarquia.",
            acceptanceCriteria: [
              "Visualização em árvore",
              "Expandir/colapsar níveis",
              "Buscar dentro da estrutura"
            ]
          },
          {
            id: "HU-UASG-04",
            description: "Como pesquisador, quero listar UASGs de um órgão específico.",
            acceptanceCriteria: [
              "Filtrar UASGs por órgão",
              "Contagem de UASGs por órgão",
              "Exportar listagem"
            ]
          }
        ],
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
        objective: "Permitir consulta de fornecedores cadastrados no SICAF com situação de habilitação.",
        userStories: [
          {
            id: "HU-FORN-01",
            description: "Como comprador, quero consultar a situação de um fornecedor antes de contratá-lo.",
            acceptanceCriteria: [
              "Busca por CNPJ/CPF",
              "Status de habilitação no SICAF",
              "Pendências cadastrais"
            ]
          },
          {
            id: "HU-FORN-02",
            description: "Como fornecedor, quero ver meus dados cadastrais públicos.",
            acceptanceCriteria: [
              "Razão social e nome fantasia",
              "Ramo de atividade/CNAE",
              "Porte da empresa"
            ]
          }
        ],
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
        objective: "Disponibilizar acesso ao Plano de Gestão de Contratações detalhado dos órgãos.",
        userStories: [
          {
            id: "HU-PGC-01",
            description: "Como fornecedor, quero consultar o PGC de órgãos para planejar propostas futuras.",
            acceptanceCriteria: [
              "Filtrar por órgão/UASG",
              "Filtrar por ano do PGC",
              "Ver itens planejados"
            ]
          },
          {
            id: "HU-PGC-02",
            description: "Como gestor, quero acompanhar a execução do PGC do meu órgão.",
            acceptanceCriteria: [
              "Status de cada item (planejado/executado)",
              "Percentual de execução",
              "Desvios do planejamento"
            ]
          }
        ],
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
        objective: "Exibir dados agregados do PGC para visão consolidada de demandas.",
        userStories: [
          {
            id: "HU-PGC-03",
            description: "Como analista, quero ver demandas agregadas por categoria para identificar oportunidades de compra conjunta.",
            acceptanceCriteria: [
              "Agrupamento por material/serviço",
              "Totalização de valores",
              "Identificar órgãos com demandas similares"
            ]
          },
          {
            id: "HU-PGC-04",
            description: "Como gestor, quero relatório consolidado do PGC para apresentação.",
            acceptanceCriteria: [
              "Dashboard resumido",
              "Gráficos de distribuição",
              "Exportar apresentação"
            ]
          }
        ],
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
        objective: "Disponibilizar dados de contratações no padrão internacional OCDS para interoperabilidade.",
        userStories: [
          {
            id: "HU-OCDS-01",
            description: "Como desenvolvedor, quero acessar dados em formato OCDS para integração com sistemas internacionais.",
            acceptanceCriteria: [
              "Dados em JSON válido OCDS",
              "Documentação das extensões usadas",
              "Exemplos de requisição"
            ]
          },
          {
            id: "HU-OCDS-02",
            description: "Como pesquisador, quero baixar releases OCDS para análises comparativas internacionais.",
            acceptanceCriteria: [
              "Filtro por período",
              "Download em lote",
              "Metadados de publicação"
            ]
          }
        ],
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
        objective: "Exibir alertas de potenciais irregularidades detectados pelo sistema ALICE do TCU.",
        userStories: [
          {
            id: "HU-ALICE-01",
            description: "Como auditor, quero ver avisos de irregularidades para priorizar fiscalizações.",
            acceptanceCriteria: [
              "Lista de avisos por gravidade",
              "Filtro por tipo de irregularidade",
              "Link para o processo relacionado"
            ]
          },
          {
            id: "HU-ALICE-02",
            description: "Como gestor, quero monitorar avisos do meu órgão para ações preventivas.",
            acceptanceCriteria: [
              "Filtro por UASG",
              "Notificação de novos avisos",
              "Status de tratamento"
            ]
          }
        ],
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
        objective: "Permitir consulta de compras analisadas pelo ALICE com indicadores de risco.",
        userStories: [
          {
            id: "HU-ALICE-03",
            description: "Como auditor, quero consultar compras com score de risco para análise.",
            acceptanceCriteria: [
              "Score de risco por compra",
              "Detalhamento dos indicadores",
              "Ordenação por risco"
            ]
          },
          {
            id: "HU-ALICE-04",
            description: "Como cidadão, quero verificar se uma compra tem alertas de irregularidade.",
            acceptanceCriteria: [
              "Busca por número do processo",
              "Indicador visual de risco",
              "Explicação dos alertas"
            ]
          }
        ],
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
        objective: "Exibir tickets de acompanhamento gerados pelo ALICE para tratamento de irregularidades.",
        userStories: [
          {
            id: "HU-ALICE-05",
            description: "Como gestor, quero ver tickets pendentes do meu órgão para providências.",
            acceptanceCriteria: [
              "Lista de tickets por status",
              "Prazo para resposta",
              "Histórico de interações"
            ]
          },
          {
            id: "HU-ALICE-06",
            description: "Como auditor, quero acompanhar o andamento dos tickets gerados.",
            acceptanceCriteria: [
              "Dashboard de tickets",
              "Tempo médio de resolução",
              "Relatório de produtividade"
            ]
          }
        ],
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
        objective: "Centralizar tratamento de erros HTTP e implementar retry automático para melhorar resiliência.",
        userStories: [
          {
            id: "HU-INFRA-01",
            description: "Como usuário, quero que erros temporários sejam tratados automaticamente sem perder minha consulta.",
            acceptanceCriteria: [
              "Retry automático para erros 5xx",
              "Retry com backoff exponencial",
              "Limite máximo de tentativas"
            ]
          },
          {
            id: "HU-INFRA-02",
            description: "Como usuário, quero ver mensagens de erro claras quando algo falha.",
            acceptanceCriteria: [
              "Toast com mensagem amigável",
              "Código do erro para suporte",
              "Opção de tentar novamente"
            ]
          }
        ],
        module: "Infra",
        status: "todo",
        priority: "high",
        tags: ["Axios", "Error Handling", "Retry"],
      },
      {
        id: "infra-2",
        title: "Implementar cache de requisições",
        description: "Configurar React Query para cache e invalidação automática",
        objective: "Otimizar performance e reduzir requisições repetidas através de cache inteligente.",
        userStories: [
          {
            id: "HU-INFRA-03",
            description: "Como usuário, quero que consultas recentes carreguem instantaneamente do cache.",
            acceptanceCriteria: [
              "Cache de 5 minutos para consultas",
              "Indicador de dados em cache",
              "Botão para forçar atualização"
            ]
          },
          {
            id: "HU-INFRA-04",
            description: "Como desenvolvedor, quero invalidar cache quando dados são modificados.",
            acceptanceCriteria: [
              "Invalidação por query key",
              "Invalidação por prefixo",
              "Logs de cache para debug"
            ]
          }
        ],
        module: "Infra",
        status: "todo",
        priority: "medium",
        tags: ["Cache", "React Query", "Performance"],
      },
      {
        id: "infra-3",
        title: "Implementar paginação genérica",
        description: "Criar hook reutilizável para paginação de resultados",
        objective: "Padronizar navegação em listas grandes com paginação consistente em toda aplicação.",
        userStories: [
          {
            id: "HU-INFRA-05",
            description: "Como usuário, quero navegar facilmente entre páginas de resultados.",
            acceptanceCriteria: [
              "Controles de página anterior/próxima",
              "Ir para página específica",
              "Indicador de página atual/total"
            ]
          },
          {
            id: "HU-INFRA-06",
            description: "Como usuário, quero escolher quantos itens ver por página.",
            acceptanceCriteria: [
              "Seletor de itens por página",
              "Opções: 10, 25, 50, 100",
              "Persistir preferência"
            ]
          }
        ],
        module: "Infra",
        status: "todo",
        priority: "high",
        tags: ["Hook", "Paginação", "Reutilizável"],
      },
      {
        id: "infra-4",
        title: "Implementar exportação genérica CSV",
        description: "Criar utilitário para download de arquivos CSV",
        objective: "Permitir exportação de dados em formato CSV para uso em planilhas e análises.",
        userStories: [
          {
            id: "HU-INFRA-07",
            description: "Como usuário, quero exportar resultados de consultas para Excel.",
            acceptanceCriteria: [
              "Botão de exportar em todas as listas",
              "Download automático do arquivo",
              "Nome do arquivo com data/hora"
            ]
          },
          {
            id: "HU-INFRA-08",
            description: "Como analista, quero escolher quais colunas exportar.",
            acceptanceCriteria: [
              "Seleção de colunas",
              "Ordem das colunas configurável",
              "Preview antes de exportar"
            ]
          }
        ],
        module: "Infra",
        status: "todo",
        priority: "medium",
        tags: ["CSV", "Download", "Utilitário"],
      },
      {
        id: "infra-5",
        title: "Configurar variáveis de ambiente",
        description: "Definir BASE_URL e outras configs via .env",
        objective: "Centralizar configurações de ambiente para facilitar deploy em diferentes ambientes.",
        userStories: [
          {
            id: "HU-INFRA-09",
            description: "Como desenvolvedor, quero alternar entre ambientes de dev/staging/prod facilmente.",
            acceptanceCriteria: [
              "Arquivo .env.example documentado",
              "BASE_URL configurável",
              "Validação de variáveis obrigatórias"
            ]
          },
          {
            id: "HU-INFRA-10",
            description: "Como DevOps, quero configurar a aplicação via variáveis de ambiente no deploy.",
            acceptanceCriteria: [
              "Todas configs sensíveis em env vars",
              "Documentação de cada variável",
              "Valores default seguros"
            ]
          }
        ],
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
