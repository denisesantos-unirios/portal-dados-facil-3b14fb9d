import { useState } from "react";
import { MessageSquare, Search, Users, MessagesSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DiscussionCard } from "@/components/DiscussionCard";
import { forumCategories, forumStats, discussions } from "@/data/forum";
import { NavLink } from "@/components/NavLink";
import { NewDiscussionForm } from "@/components/NewDiscussionForm";

export default function Forum() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDiscussions = discussions.filter((d) => {
    const matchesCategory = selectedCategory === "todos" || d.categoryId === selectedCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">ComprasGov Explorer</span>
          </div>
          <nav className="flex items-center gap-4">
            <NavLink to="/" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">API Explorer</NavLink>
            <NavLink to="/documentacao" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Documentação</NavLink>
            <NavLink to="/backlog" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Backlog</NavLink>
            <NavLink to="/forum" className="text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-primary font-medium">Fórum</NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3 mb-2">
            <MessageSquare className="w-8 h-8 text-primary" />
            Fórum de Discussões
          </h1>
          <p className="text-muted-foreground">
            Tire dúvidas, compartilhe conhecimento e conecte-se com outros desenvolvedores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* New Discussion Button */}
            <NewDiscussionForm />

            {/* Categories */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 text-foreground">Categorias</h3>
              <div className="space-y-1">
                {forumCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Statistics */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 text-foreground">Estatísticas</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MessagesSquare className="w-4 h-4" />
                    Discussões
                  </span>
                  <span className="font-semibold text-foreground">{forumStats.discussions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Membros
                  </span>
                  <span className="font-semibold text-foreground">{forumStats.members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Respostas
                  </span>
                  <span className="font-semibold text-foreground">{forumStats.responses}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Discussion List */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar discussões..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Discussions */}
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-3 pr-4">
                {filteredDiscussions.length > 0 ? (
                  filteredDiscussions.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma discussão encontrada.</p>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}
