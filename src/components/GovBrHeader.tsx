import { ExternalLink, Accessibility, Contrast, Type } from "lucide-react";

export function GovBrHeader() {
  return (
    <header className="govbr-header">
      {/* Barra superior gov.br */}
      <div className="h-10 flex items-center justify-between px-4 lg:px-8 border-b border-white/10">
        {/* Logo e título */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg
              className="h-6 w-auto"
              viewBox="0 0 120 40"
              fill="currentColor"
              aria-label="gov.br"
            >
              <text x="0" y="28" fontSize="24" fontWeight="bold" fill="currentColor">
                gov.br
              </text>
            </svg>
          </a>
          <span className="hidden sm:inline text-xs text-white/80">
            Governo Federal
          </span>
        </div>

        {/* Links institucionais */}
        <nav className="hidden md:flex items-center gap-4 text-xs">
          <a
            href="https://www.gov.br/pt-br/orgaos-do-governo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white/80 transition-colors"
          >
            Órgãos do Governo
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://www.gov.br/pt-br/acessoainformacao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white/80 transition-colors"
          >
            Acesso à Informação
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://www.gov.br/pt-br/legislacao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white/80 transition-colors"
          >
            Legislação
            <ExternalLink className="h-3 w-3" />
          </a>
        </nav>

        {/* Acessibilidade */}
        <div className="flex items-center gap-3">
          <button
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Acessibilidade"
            aria-label="Opções de acessibilidade"
          >
            <Accessibility className="h-4 w-4" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Alto contraste"
            aria-label="Alternar alto contraste"
          >
            <Contrast className="h-4 w-4" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Tamanho da fonte"
            aria-label="Ajustar tamanho da fonte"
          >
            <Type className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Barra do portal */}
      <div className="h-14 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">
              Portal de Compras do Governo Federal
            </h1>
            <p className="text-xs text-white/70">
              Dados Abertos - Transparência em Contratações Públicas
            </p>
          </div>
        </div>

        {/* Busca (opcional) */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://dadosabertos.compras.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1"
          >
            dadosabertos.compras.gov.br
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
