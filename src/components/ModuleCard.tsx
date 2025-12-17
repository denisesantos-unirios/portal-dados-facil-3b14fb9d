import { ApiModule } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Briefcase, Building2, Landmark, FileText, ShoppingCart, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Package,
  Briefcase,
  Building2,
  Landmark,
  FileText,
  ShoppingCart,
};

interface ModuleCardProps {
  module: ApiModule;
  isSelected: boolean;
  onClick: () => void;
}

export function ModuleCard({ module, isSelected, onClick }: ModuleCardProps) {
  const Icon = iconMap[module.icon] || Package;

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
        isSelected
          ? "ring-2 ring-primary border-primary bg-accent/50"
          : "hover:border-primary/50"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${isSelected ? "gradient-hero" : "bg-muted"}`}>
            <Icon className={`h-5 w-5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base font-semibold">{module.name}</CardTitle>
            <CardDescription className="text-sm mt-0.5">{module.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {module.endpoints.length} endpoint{module.endpoints.length > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
