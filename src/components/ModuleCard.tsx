import { ApiModule } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Briefcase, 
  Building2, 
  Landmark, 
  FileText, 
  ShoppingCart, 
  DollarSign, 
  ClipboardList, 
  History, 
  FileSignature, 
  FileSpreadsheet,
  Globe,
  Bot,
  LucideIcon 
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Package,
  Briefcase,
  Building2,
  Landmark,
  FileText,
  ShoppingCart,
  DollarSign,
  ClipboardList,
  History,
  FileSignature,
  FileSpreadsheet,
  Globe,
  Bot,
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
          <div className={`p-2.5 rounded-lg ${module.color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold truncate">{module.name}</CardTitle>
            <CardDescription className="text-xs mt-0.5 line-clamp-2">{module.description}</CardDescription>
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
