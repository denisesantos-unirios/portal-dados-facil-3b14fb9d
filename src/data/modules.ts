import { ApiModule } from "@/types/api";

export const apiModules: ApiModule[] = [
  {
    id: "material",
    name: "Catálogo - Material",
    description: "Consulta itens do catálogo de materiais do governo",
    icon: "Package",
    endpoints: [
      {
        id: "material-grupo",
        method: "GET",
        path: "/modulo-material/1_consultarGrupo",
        description: "Consultar grupos de materiais",
        parameters: [
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
          { name: "tamanhoPagina", type: "number", required: false, description: "Itens por página", example: "10" },
        ],
      },
      {
        id: "material-classe",
        method: "GET",
        path: "/modulo-material/2_consultarClasse",
        description: "Consultar classes de materiais",
        parameters: [
          { name: "codigoGrupo", type: "number", required: false, description: "Código do grupo", example: "1400" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
      {
        id: "material-pdm",
        method: "GET",
        path: "/modulo-material/3_consultarPdm",
        description: "Consultar PDM (Padrão Descritivo de Material)",
        parameters: [
          { name: "codigoClasse", type: "number", required: false, description: "Código da classe", example: "14050" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
      {
        id: "material-item",
        method: "GET",
        path: "/modulo-material/4_consultarItem",
        description: "Consultar itens de material",
        parameters: [
          { name: "codigoPdm", type: "number", required: false, description: "Código do PDM" },
          { name: "descricao", type: "string", required: false, description: "Descrição do item", example: "papel" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
    ],
  },
  {
    id: "servico",
    name: "Catálogo - Serviço",
    description: "Consulta itens do catálogo de serviços",
    icon: "Briefcase",
    endpoints: [
      {
        id: "servico-grupo",
        method: "GET",
        path: "/modulo-servico/1_consultarGrupo",
        description: "Consultar grupos de serviços",
        parameters: [
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
      {
        id: "servico-classe",
        method: "GET",
        path: "/modulo-servico/2_consultarClasse",
        description: "Consultar classes de serviços",
        parameters: [
          { name: "codigoGrupo", type: "number", required: false, description: "Código do grupo" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
      {
        id: "servico-item",
        method: "GET",
        path: "/modulo-servico/3_consultarItem",
        description: "Consultar itens de serviço",
        parameters: [
          { name: "codigoClasse", type: "number", required: false, description: "Código da classe" },
          { name: "descricao", type: "string", required: false, description: "Descrição do serviço" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
    ],
  },
  {
    id: "fornecedor",
    name: "Fornecedor",
    description: "Consulta dados de fornecedores cadastrados",
    icon: "Building2",
    endpoints: [
      {
        id: "fornecedor-consultar",
        method: "GET",
        path: "/modulo-fornecedor/1_consultarFornecedor",
        description: "Consultar fornecedores",
        parameters: [
          { name: "cnpj", type: "string", required: false, description: "CNPJ do fornecedor", example: "00000000000000" },
          { name: "razaoSocial", type: "string", required: false, description: "Razão social" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
    ],
  },
  {
    id: "orgao",
    name: "Órgão / Entidade",
    description: "Consulta órgãos e entidades governamentais",
    icon: "Landmark",
    endpoints: [
      {
        id: "orgao-consultar",
        method: "GET",
        path: "/modulo-orgao/1_consultarOrgao",
        description: "Consultar órgãos",
        parameters: [
          { name: "codigoSiorg", type: "string", required: false, description: "Código SIORG" },
          { name: "nome", type: "string", required: false, description: "Nome do órgão" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
      {
        id: "uasg-consultar",
        method: "GET",
        path: "/modulo-orgao/2_consultarUasg",
        description: "Consultar UASG",
        parameters: [
          { name: "codigoUasg", type: "number", required: false, description: "Código UASG" },
          { name: "nome", type: "string", required: false, description: "Nome da UASG" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
    ],
  },
  {
    id: "contrato",
    name: "Contratos",
    description: "Consulta contratos governamentais",
    icon: "FileText",
    endpoints: [
      {
        id: "contrato-consultar",
        method: "GET",
        path: "/modulo-contrato/1_consultarContrato",
        description: "Consultar contratos",
        parameters: [
          { name: "codigoUasg", type: "number", required: false, description: "Código UASG" },
          { name: "cnpjFornecedor", type: "string", required: false, description: "CNPJ do fornecedor" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
    ],
  },
  {
    id: "compra",
    name: "Compras / Licitações",
    description: "Consulta processos de compras e licitações",
    icon: "ShoppingCart",
    endpoints: [
      {
        id: "compra-consultar",
        method: "GET",
        path: "/modulo-compra/1_consultarCompra",
        description: "Consultar compras",
        parameters: [
          { name: "codigoUasg", type: "number", required: false, description: "Código UASG" },
          { name: "numeroCompra", type: "string", required: false, description: "Número da compra" },
          { name: "modalidade", type: "number", required: false, description: "Modalidade de licitação" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
      {
        id: "compra-item",
        method: "GET",
        path: "/modulo-compra/2_consultarItemCompra",
        description: "Consultar itens de compra",
        parameters: [
          { name: "codigoUasg", type: "number", required: true, description: "Código UASG" },
          { name: "numeroCompra", type: "string", required: true, description: "Número da compra" },
          { name: "pagina", type: "number", required: false, description: "Número da página", example: "1" },
        ],
      },
    ],
  },
];
