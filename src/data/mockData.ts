// Mock data for demonstration when API is unavailable (CORS)

export const mockDataByEndpoint: Record<string, any[]> = {
  // Material
  "material-grupo": [
    { codigoGrupo: 1400, nomeGrupo: "VEÍCULOS DE TRAÇÃO MECÂNICA", descricao: "Veículos automotores em geral" },
    { codigoGrupo: 1405, nomeGrupo: "VEÍCULOS DE RODAS E TRATORES", descricao: "Tratores e equipamentos agrícolas" },
    { codigoGrupo: 2210, nomeGrupo: "EQUIPAMENTOS DE PROCESSAMENTO DE DADOS", descricao: "Computadores e periféricos" },
    { codigoGrupo: 2320, nomeGrupo: "EQUIPAMENTOS DE COMUNICAÇÃO", descricao: "Telefones, rádios e equipamentos" },
    { codigoGrupo: 3510, nomeGrupo: "COMBUSTÍVEIS E LUBRIFICANTES", descricao: "Gasolina, diesel, óleos" },
    { codigoGrupo: 4110, nomeGrupo: "REFRIGERAÇÃO E AR CONDICIONADO", descricao: "Aparelhos de climatização" },
    { codigoGrupo: 5110, nomeGrupo: "MATERIAL DE CONSTRUÇÃO", descricao: "Cimento, areia, tijolos" },
    { codigoGrupo: 6510, nomeGrupo: "MATERIAL MÉDICO", descricao: "Equipamentos hospitalares" },
    { codigoGrupo: 7010, nomeGrupo: "MOBILIÁRIO", descricao: "Mesas, cadeiras, armários" },
    { codigoGrupo: 7520, nomeGrupo: "MATERIAL DE ESCRITÓRIO", descricao: "Papéis, canetas, materiais diversos" },
  ],
  "material-classe": [
    { codigoClasse: 14050, nomeClasse: "AUTOMÓVEIS DE PASSAGEIROS", codigoGrupo: 1400 },
    { codigoClasse: 14051, nomeClasse: "VEÍCULOS UTILITÁRIOS", codigoGrupo: 1400 },
    { codigoClasse: 22101, nomeClasse: "COMPUTADORES DESKTOP", codigoGrupo: 2210 },
    { codigoClasse: 22102, nomeClasse: "NOTEBOOKS E LAPTOPS", codigoGrupo: 2210 },
    { codigoClasse: 22103, nomeClasse: "SERVIDORES", codigoGrupo: 2210 },
    { codigoClasse: 23201, nomeClasse: "TELEFONES FIXOS", codigoGrupo: 2320 },
    { codigoClasse: 23202, nomeClasse: "TELEFONES CELULARES", codigoGrupo: 2320 },
    { codigoClasse: 35101, nomeClasse: "GASOLINA", codigoGrupo: 3510 },
    { codigoClasse: 35102, nomeClasse: "DIESEL", codigoGrupo: 3510 },
    { codigoClasse: 75201, nomeClasse: "PAPEL A4", codigoGrupo: 7520 },
  ],
  "material-item": [
    { codigoItem: 440001, descricao: "PAPEL A4 75G/M2 BRANCO", unidadeFornecimento: "RESMA", precoMedio: 25.50 },
    { codigoItem: 440002, descricao: "CANETA ESFEROGRÁFICA AZUL", unidadeFornecimento: "UNIDADE", precoMedio: 1.20 },
    { codigoItem: 440003, descricao: "LÁPIS PRETO Nº 2", unidadeFornecimento: "UNIDADE", precoMedio: 0.80 },
    { codigoItem: 440004, descricao: "BORRACHA BRANCA", unidadeFornecimento: "UNIDADE", precoMedio: 0.50 },
    { codigoItem: 440005, descricao: "GRAMPEADOR DE MESA", unidadeFornecimento: "UNIDADE", precoMedio: 15.00 },
    { codigoItem: 440006, descricao: "CLIPS NIQUELADO 2/0", unidadeFornecimento: "CAIXA", precoMedio: 3.50 },
    { codigoItem: 440007, descricao: "PASTA ARQUIVO MORTO", unidadeFornecimento: "UNIDADE", precoMedio: 8.00 },
    { codigoItem: 440008, descricao: "COLA BRANCA 90G", unidadeFornecimento: "UNIDADE", precoMedio: 4.50 },
    { codigoItem: 440009, descricao: "FITA ADESIVA TRANSPARENTE", unidadeFornecimento: "ROLO", precoMedio: 3.00 },
    { codigoItem: 440010, descricao: "MARCADOR DE TEXTO AMARELO", unidadeFornecimento: "UNIDADE", precoMedio: 2.80 },
  ],

  // Serviço
  "servico-secao": [
    { codigoSecao: "A", nomeSecao: "AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS" },
    { codigoSecao: "B", nomeSecao: "PESCA E AQUICULTURA" },
    { codigoSecao: "C", nomeSecao: "INDÚSTRIAS EXTRATIVAS" },
    { codigoSecao: "D", nomeSecao: "INDÚSTRIAS DE TRANSFORMAÇÃO" },
    { codigoSecao: "E", nomeSecao: "ELETRICIDADE E GÁS" },
    { codigoSecao: "F", nomeSecao: "ÁGUA, ESGOTO E RESÍDUOS" },
    { codigoSecao: "G", nomeSecao: "CONSTRUÇÃO" },
    { codigoSecao: "H", nomeSecao: "COMÉRCIO E REPARAÇÃO DE VEÍCULOS" },
    { codigoSecao: "I", nomeSecao: "TRANSPORTE E ARMAZENAGEM" },
    { codigoSecao: "J", nomeSecao: "ALOJAMENTO E ALIMENTAÇÃO" },
  ],
  "servico-divisao": [
    { codigoDivisao: 1, nomeDivisao: "SERVIÇOS DE LIMPEZA E CONSERVAÇÃO" },
    { codigoDivisao: 2, nomeDivisao: "SERVIÇOS DE VIGILÂNCIA" },
    { codigoDivisao: 3, nomeDivisao: "SERVIÇOS DE MANUTENÇÃO PREDIAL" },
    { codigoDivisao: 4, nomeDivisao: "SERVIÇOS DE TRANSPORTE" },
    { codigoDivisao: 5, nomeDivisao: "SERVIÇOS DE TECNOLOGIA DA INFORMAÇÃO" },
    { codigoDivisao: 6, nomeDivisao: "SERVIÇOS DE CONSULTORIA" },
    { codigoDivisao: 7, nomeDivisao: "SERVIÇOS DE COMUNICAÇÃO" },
    { codigoDivisao: 8, nomeDivisao: "SERVIÇOS DE ALIMENTAÇÃO" },
    { codigoDivisao: 9, nomeDivisao: "SERVIÇOS DE EVENTOS" },
    { codigoDivisao: 10, nomeDivisao: "SERVIÇOS GRÁFICOS" },
  ],

  // UASG
  "uasg-consultar": [
    { codigoUasg: 110001, nomeUasg: "CÂMARA DOS DEPUTADOS", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 110002, nomeUasg: "SENADO FEDERAL", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 110003, nomeUasg: "TRIBUNAL DE CONTAS DA UNIÃO", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 110004, nomeUasg: "SUPREMO TRIBUNAL FEDERAL", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 110005, nomeUasg: "PRESIDÊNCIA DA REPÚBLICA", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 150001, nomeUasg: "MINISTÉRIO DA FAZENDA", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 160001, nomeUasg: "MINISTÉRIO DA DEFESA", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 170001, nomeUasg: "MINISTÉRIO DA SAÚDE", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 180001, nomeUasg: "MINISTÉRIO DA EDUCAÇÃO", uf: "DF", municipio: "BRASÍLIA" },
    { codigoUasg: 190001, nomeUasg: "MINISTÉRIO DA JUSTIÇA", uf: "DF", municipio: "BRASÍLIA" },
  ],
  "orgao-consultar": [
    { codigoOrgao: "11000", nomeOrgao: "PODER LEGISLATIVO", sigla: "PL" },
    { codigoOrgao: "20000", nomeOrgao: "PRESIDÊNCIA DA REPÚBLICA", sigla: "PR" },
    { codigoOrgao: "22000", nomeOrgao: "MINISTÉRIO DA AGRICULTURA", sigla: "MAPA" },
    { codigoOrgao: "25000", nomeOrgao: "MINISTÉRIO DA FAZENDA", sigla: "MF" },
    { codigoOrgao: "26000", nomeOrgao: "MINISTÉRIO DA EDUCAÇÃO", sigla: "MEC" },
    { codigoOrgao: "30000", nomeOrgao: "MINISTÉRIO DA JUSTIÇA", sigla: "MJ" },
    { codigoOrgao: "36000", nomeOrgao: "MINISTÉRIO DA SAÚDE", sigla: "MS" },
    { codigoOrgao: "39000", nomeOrgao: "MINISTÉRIO DOS TRANSPORTES", sigla: "MT" },
    { codigoOrgao: "52000", nomeOrgao: "MINISTÉRIO DA DEFESA", sigla: "MD" },
    { codigoOrgao: "54000", nomeOrgao: "MINISTÉRIO DO TURISMO", sigla: "MTUR" },
  ],

  // PGC
  "pgc-detalhe": [
    { codigoUasg: 110001, ano: 2024, descricao: "Aquisição de equipamentos de TI", valorEstimado: 500000, status: "EM ANDAMENTO" },
    { codigoUasg: 110002, ano: 2024, descricao: "Contratação de serviços de limpeza", valorEstimado: 1200000, status: "APROVADO" },
    { codigoUasg: 110003, ano: 2024, descricao: "Reforma predial bloco A", valorEstimado: 3500000, status: "PLANEJADO" },
    { codigoUasg: 150001, ano: 2024, descricao: "Material de escritório", valorEstimado: 80000, status: "CONCLUÍDO" },
    { codigoUasg: 160001, ano: 2024, descricao: "Veículos operacionais", valorEstimado: 2000000, status: "EM ANDAMENTO" },
    { codigoUasg: 170001, ano: 2024, descricao: "Equipamentos hospitalares", valorEstimado: 5000000, status: "APROVADO" },
    { codigoUasg: 180001, ano: 2024, descricao: "Mobiliário escolar", valorEstimado: 800000, status: "PLANEJADO" },
    { codigoUasg: 190001, ano: 2024, descricao: "Sistema de segurança", valorEstimado: 1500000, status: "EM ANDAMENTO" },
    { codigoUasg: 110004, ano: 2024, descricao: "Biblioteca digital", valorEstimado: 600000, status: "APROVADO" },
    { codigoUasg: 110005, ano: 2024, descricao: "Eventos institucionais", valorEstimado: 400000, status: "PLANEJADO" },
  ],

  // Legado
  "legado-licitacao": [
    { numeroLicitacao: "001/2024", codigoUasg: 110001, modalidade: "PREGÃO", objeto: "Aquisição de computadores", valorEstimado: 250000, dataAbertura: "2024-03-15" },
    { numeroLicitacao: "002/2024", codigoUasg: 110002, modalidade: "CONCORRÊNCIA", objeto: "Obra de reforma", valorEstimado: 5000000, dataAbertura: "2024-04-01" },
    { numeroLicitacao: "003/2024", codigoUasg: 150001, modalidade: "PREGÃO", objeto: "Material de consumo", valorEstimado: 50000, dataAbertura: "2024-02-20" },
    { numeroLicitacao: "004/2024", codigoUasg: 160001, modalidade: "TOMADA DE PREÇOS", objeto: "Serviços de engenharia", valorEstimado: 800000, dataAbertura: "2024-05-10" },
    { numeroLicitacao: "005/2024", codigoUasg: 170001, modalidade: "PREGÃO", objeto: "Medicamentos", valorEstimado: 1500000, dataAbertura: "2024-03-25" },
    { numeroLicitacao: "006/2024", codigoUasg: 180001, modalidade: "CONVITE", objeto: "Impressão de livros", valorEstimado: 30000, dataAbertura: "2024-04-15" },
    { numeroLicitacao: "007/2024", codigoUasg: 190001, modalidade: "PREGÃO", objeto: "Equipamentos de segurança", valorEstimado: 200000, dataAbertura: "2024-05-20" },
    { numeroLicitacao: "008/2024", codigoUasg: 110003, modalidade: "CONCORRÊNCIA", objeto: "Consultoria técnica", valorEstimado: 400000, dataAbertura: "2024-06-01" },
    { numeroLicitacao: "009/2024", codigoUasg: 110004, modalidade: "PREGÃO", objeto: "Mobiliário", valorEstimado: 180000, dataAbertura: "2024-04-30" },
    { numeroLicitacao: "010/2024", codigoUasg: 110005, modalidade: "PREGÃO", objeto: "Veículos", valorEstimado: 600000, dataAbertura: "2024-05-15" },
  ],

  // Contratações
  "contratacoes-pncp": [
    { numeroContratacao: "90001/2024", codigoUasg: 110001, modalidade: "PREGÃO ELETRÔNICO", objeto: "Serviços de TI", valorTotal: 1200000, situacao: "ADJUDICADO" },
    { numeroContratacao: "90002/2024", codigoUasg: 110002, modalidade: "DISPENSA", objeto: "Manutenção emergencial", valorTotal: 45000, situacao: "HOMOLOGADO" },
    { numeroContratacao: "90003/2024", codigoUasg: 150001, modalidade: "PREGÃO ELETRÔNICO", objeto: "Equipamentos", valorTotal: 350000, situacao: "EM ANDAMENTO" },
    { numeroContratacao: "90004/2024", codigoUasg: 160001, modalidade: "CONCORRÊNCIA", objeto: "Construção civil", valorTotal: 8000000, situacao: "PUBLICADO" },
    { numeroContratacao: "90005/2024", codigoUasg: 170001, modalidade: "PREGÃO ELETRÔNICO", objeto: "Insumos médicos", valorTotal: 2500000, situacao: "ADJUDICADO" },
    { numeroContratacao: "90006/2024", codigoUasg: 180001, modalidade: "DISPENSA", objeto: "Material didático", valorTotal: 28000, situacao: "HOMOLOGADO" },
    { numeroContratacao: "90007/2024", codigoUasg: 190001, modalidade: "PREGÃO ELETRÔNICO", objeto: "Vigilância", valorTotal: 960000, situacao: "EM ANDAMENTO" },
    { numeroContratacao: "90008/2024", codigoUasg: 110003, modalidade: "INEXIGIBILIDADE", objeto: "Treinamento", valorTotal: 85000, situacao: "HOMOLOGADO" },
    { numeroContratacao: "90009/2024", codigoUasg: 110004, modalidade: "PREGÃO ELETRÔNICO", objeto: "Software", valorTotal: 420000, situacao: "ADJUDICADO" },
    { numeroContratacao: "90010/2024", codigoUasg: 110005, modalidade: "CONCORRÊNCIA", objeto: "Obras", valorTotal: 15000000, situacao: "PUBLICADO" },
  ],

  // ARP
  "arp-consultar": [
    { numeroARP: "001/2024", codigoUasg: 110001, objeto: "Computadores e periféricos", vigencia: "12 meses", valorUnitario: 3500 },
    { numeroARP: "002/2024", codigoUasg: 110002, objeto: "Material de escritório", vigencia: "12 meses", valorUnitario: 25 },
    { numeroARP: "003/2024", codigoUasg: 150001, objeto: "Combustíveis", vigencia: "12 meses", valorUnitario: 5.89 },
    { numeroARP: "004/2024", codigoUasg: 160001, objeto: "Uniformes", vigencia: "12 meses", valorUnitario: 180 },
    { numeroARP: "005/2024", codigoUasg: 170001, objeto: "Medicamentos básicos", vigencia: "12 meses", valorUnitario: 12.50 },
    { numeroARP: "006/2024", codigoUasg: 180001, objeto: "Livros didáticos", vigencia: "12 meses", valorUnitario: 45 },
    { numeroARP: "007/2024", codigoUasg: 190001, objeto: "Equipamentos de proteção", vigencia: "12 meses", valorUnitario: 85 },
    { numeroARP: "008/2024", codigoUasg: 110003, objeto: "Mobiliário", vigencia: "12 meses", valorUnitario: 650 },
    { numeroARP: "009/2024", codigoUasg: 110004, objeto: "Ar condicionado", vigencia: "12 meses", valorUnitario: 2800 },
    { numeroARP: "010/2024", codigoUasg: 110005, objeto: "Veículos", vigencia: "12 meses", valorUnitario: 95000 },
  ],

  // Contratos
  "contratos-consultar": [
    { numeroContrato: "001/2024", codigoUasg: 110001, fornecedor: "TECH SOLUTIONS LTDA", objeto: "Suporte de TI", valorTotal: 480000, vigencia: "2024-2025" },
    { numeroContrato: "002/2024", codigoUasg: 110002, fornecedor: "LIMPEZA TOTAL SA", objeto: "Limpeza predial", valorTotal: 1200000, vigencia: "2024-2025" },
    { numeroContrato: "003/2024", codigoUasg: 150001, fornecedor: "CONSTRUTORA ABC", objeto: "Reforma", valorTotal: 3500000, vigencia: "2024-2026" },
    { numeroContrato: "004/2024", codigoUasg: 160001, fornecedor: "SEGURANÇA BRASIL", objeto: "Vigilância", valorTotal: 960000, vigencia: "2024-2025" },
    { numeroContrato: "005/2024", codigoUasg: 170001, fornecedor: "PHARMA DIST LTDA", objeto: "Medicamentos", valorTotal: 2500000, vigencia: "2024-2025" },
    { numeroContrato: "006/2024", codigoUasg: 180001, fornecedor: "EDITORA NACIONAL", objeto: "Livros", valorTotal: 350000, vigencia: "2024-2024" },
    { numeroContrato: "007/2024", codigoUasg: 190001, fornecedor: "TRANSPORTE RÁPIDO", objeto: "Transporte", valorTotal: 720000, vigencia: "2024-2025" },
    { numeroContrato: "008/2024", codigoUasg: 110003, fornecedor: "CONSULTORIA EXPERT", objeto: "Assessoria", valorTotal: 180000, vigencia: "2024-2024" },
    { numeroContrato: "009/2024", codigoUasg: 110004, fornecedor: "MÓVEIS ESCRITÓRIO", objeto: "Mobiliário", valorTotal: 420000, vigencia: "2024-2024" },
    { numeroContrato: "010/2024", codigoUasg: 110005, fornecedor: "AUTO VEÍCULOS SA", objeto: "Veículos", valorTotal: 850000, vigencia: "2024-2024" },
  ],

  // Fornecedor
  "fornecedor-consultar": [
    { cnpj: "00.000.000/0001-01", razaoSocial: "TECH SOLUTIONS LTDA", nomeFantasia: "TECH SOLUTIONS", uf: "SP", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-02", razaoSocial: "LIMPEZA TOTAL SA", nomeFantasia: "LIMPA TUDO", uf: "RJ", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-03", razaoSocial: "CONSTRUTORA ABC LTDA", nomeFantasia: "CONSTRUTORA ABC", uf: "MG", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-04", razaoSocial: "SEGURANÇA BRASIL LTDA", nomeFantasia: "SEG BRASIL", uf: "DF", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-05", razaoSocial: "PHARMA DISTRIBUIDORA", nomeFantasia: "PHARMA DIST", uf: "SP", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-06", razaoSocial: "EDITORA NACIONAL SA", nomeFantasia: "ED NACIONAL", uf: "RS", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-07", razaoSocial: "TRANSPORTE RÁPIDO LTDA", nomeFantasia: "TRANS RÁPIDO", uf: "PR", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-08", razaoSocial: "CONSULTORIA EXPERT LTDA", nomeFantasia: "EXPERT CONS", uf: "DF", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-09", razaoSocial: "MÓVEIS ESCRITÓRIO LTDA", nomeFantasia: "MOV OFFICE", uf: "SC", situacao: "ATIVO" },
    { cnpj: "00.000.000/0001-10", razaoSocial: "AUTO VEÍCULOS SA", nomeFantasia: "AUTO VEI", uf: "SP", situacao: "ATIVO" },
  ],

  // OCDS
  "ocds-releases": [
    { ocid: "ocds-br-001-2024", releaseDate: "2024-03-01", tag: "tender", buyer: "CÂMARA DOS DEPUTADOS" },
    { ocid: "ocds-br-002-2024", releaseDate: "2024-03-05", tag: "award", buyer: "SENADO FEDERAL" },
    { ocid: "ocds-br-003-2024", releaseDate: "2024-03-10", tag: "contract", buyer: "MINISTÉRIO DA FAZENDA" },
    { ocid: "ocds-br-004-2024", releaseDate: "2024-03-15", tag: "tender", buyer: "MINISTÉRIO DA DEFESA" },
    { ocid: "ocds-br-005-2024", releaseDate: "2024-03-20", tag: "planning", buyer: "MINISTÉRIO DA SAÚDE" },
    { ocid: "ocds-br-006-2024", releaseDate: "2024-03-25", tag: "tender", buyer: "MINISTÉRIO DA EDUCAÇÃO" },
    { ocid: "ocds-br-007-2024", releaseDate: "2024-04-01", tag: "award", buyer: "MINISTÉRIO DA JUSTIÇA" },
    { ocid: "ocds-br-008-2024", releaseDate: "2024-04-05", tag: "contract", buyer: "TCU" },
    { ocid: "ocds-br-009-2024", releaseDate: "2024-04-10", tag: "tender", buyer: "STF" },
    { ocid: "ocds-br-010-2024", releaseDate: "2024-04-15", tag: "implementation", buyer: "PRESIDÊNCIA" },
  ],

  // ALICE
  "alice-avisos": [
    { numeroAviso: "AV001/2024", orgao: "CÂMARA DOS DEPUTADOS", tipo: "ALERTA", descricao: "Preço acima da média", data: "2024-03-01" },
    { numeroAviso: "AV002/2024", orgao: "SENADO FEDERAL", tipo: "RESTRIÇÃO", descricao: "Fornecedor com pendências", data: "2024-03-05" },
    { numeroAviso: "AV003/2024", orgao: "MIN. FAZENDA", tipo: "ALERTA", descricao: "Prazo de entrega extenso", data: "2024-03-10" },
    { numeroAviso: "AV004/2024", orgao: "MIN. DEFESA", tipo: "BLOQUEIO", descricao: "Documentação irregular", data: "2024-03-15" },
    { numeroAviso: "AV005/2024", orgao: "MIN. SAÚDE", tipo: "ALERTA", descricao: "Quantidade elevada", data: "2024-03-20" },
    { numeroAviso: "AV006/2024", orgao: "MIN. EDUCAÇÃO", tipo: "RESTRIÇÃO", descricao: "Especificação restritiva", data: "2024-03-25" },
    { numeroAviso: "AV007/2024", orgao: "MIN. JUSTIÇA", tipo: "ALERTA", descricao: "Histórico de aditivos", data: "2024-04-01" },
    { numeroAviso: "AV008/2024", orgao: "TCU", tipo: "BLOQUEIO", descricao: "Indícios de irregularidade", data: "2024-04-05" },
    { numeroAviso: "AV009/2024", orgao: "STF", tipo: "ALERTA", descricao: "Concentração de compras", data: "2024-04-10" },
    { numeroAviso: "AV010/2024", orgao: "PRESIDÊNCIA", tipo: "RESTRIÇÃO", descricao: "Fracionamento suspeito", data: "2024-04-15" },
  ],
};

// Generic fallback data
export const getGenericMockData = (endpointId: string): any[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    codigo: `${endpointId.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
    descricao: `Registro de demonstração ${i + 1}`,
    status: i % 2 === 0 ? "ATIVO" : "INATIVO",
    dataCriacao: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  }));
};

export const getMockData = (endpointId: string): any[] => {
  return mockDataByEndpoint[endpointId] || getGenericMockData(endpointId);
};
