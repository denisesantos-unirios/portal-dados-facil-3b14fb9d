import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { forumCategories } from "@/data/forum";
import { toast } from "sonner";

export function NewDiscussionForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    // Here you would typically send to backend
    toast.success("Discussão criada com sucesso!");
    setOpen(false);
    setTitle("");
    setContent("");
    setCategory("");
  };

  const categoriesWithoutTodos = forumCategories.filter(c => c.id !== "todos");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Nova Discussão
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Discussão</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Digite o título da discussão..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categoriesWithoutTodos.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              placeholder="Descreva sua dúvida ou compartilhe seu conhecimento..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
