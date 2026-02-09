import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export function GovBrFooter() {
  return (
    <footer className="border-t border-border bg-card shrink-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            Portal de Dados Abertos •{" "}
            <a
              href="https://dadosabertos.compras.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              dadosabertos.compras.gov.br
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/roadmap"
              className="text-primary hover:underline"
            >
              Roadmap
            </Link>
            <span className="text-border">|</span>
            <Link
              to="/documentacao"
              className="text-primary hover:underline"
            >
              Documentação das HUs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
