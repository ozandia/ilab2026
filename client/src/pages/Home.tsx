import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Phone, Mail, Download, ExternalLink, Clock, MapPinIcon } from "lucide-react";

/**
 * Design: Institucional Elegante com Modernidade Sutil
 * Paleta: Azul Marinho (#00375e), Branco (#ffffff), Dourado (#e1ad31)
 * Tipografia: Poppins (títulos), Inter (corpo)
 * Elementos: Cards com sombra, linhas douradas, transições suaves 200-300ms
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState("consespd");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="accent-line h-8"></div>
            <h1 className="text-2xl font-bold text-primary">ComprasSusp 2026</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#programacao" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out">
              Programação
            </a>
            <a href="#logistica" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out">
              Logística
            </a>
            <a href="#roteiro" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out">
              Roteiro
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out">
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main className="space-y-16 py-12">
        {/* Hero Section */}
        <section className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-primary leading-tight">
                Encontro Nacional ComprasSusp 2026
              </h1>
              <p className="text-xl text-muted-foreground">
                Inovação em contratações e aquisições do SUSP
              </p>
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="w-6 h-6 text-accent" />
                <span className="font-semibold">CICB - Brasília/DF</span>
              </div>
              <div className="flex gap-4">
                <Button className="btn-institutional">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Relatório
                </Button>
                <Button className="btn-institutional-secondary">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  Localização no Maps
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center h-80">
              <div className="text-center">
                <div className="text-6xl font-bold text-accent mb-4">03-06</div>
                <p className="text-xl text-muted-foreground">Março 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programação Section */}
        <section id="programacao" className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="accent-line h-8"></div>
            <h2 className="text-4xl font-bold text-primary">Programação</h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="consespd">GTI CONSESPD / CNCG</TabsTrigger>
              <TabsTrigger value="ligabom">GTI LIGABOM</TabsTrigger>
              <TabsTrigger value="concpc">GTI CONCPC / CONDPCI</TabsTrigger>
            </TabsList>

            {/* CONSESPD Tab */}
            <TabsContent value="consespd" className="space-y-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    03 de março - Abertura
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold">Horário: 19h</p>
                  <p className="text-muted-foreground">Local: CICB</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    04 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Plenária</p>
                    <p className="text-sm text-muted-foreground">9h - 12h | CICB</p>
                  </div>
                  <div>
                    <p className="font-semibold">Reunião Técnica</p>
                    <p className="text-sm text-muted-foreground">14h - 17h | Sala GTI</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    05 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Security Day</p>
                    <p className="text-sm text-muted-foreground">9h - 12h | Sala GTI</p>
                  </div>
                  <div>
                    <p className="font-semibold">Tarde Livre</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    06 de março - Palestras SENASP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">9h - 17h | CICB</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* LIGABOM Tab */}
            <TabsContent value="ligabom" className="space-y-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    03 de março - Abertura
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold">Horário: 19h</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    04 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Plenária</p>
                    <p className="text-sm text-muted-foreground">9h - 12h</p>
                  </div>
                  <div>
                    <p className="font-semibold">Reunião Técnica</p>
                    <p className="text-sm text-muted-foreground">14h - 17h</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    05 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Visita Técnica Canil CBMDF</p>
                    <p className="text-sm text-muted-foreground">9h - 12h | Academia CBMDF</p>
                  </div>
                  <div>
                    <p className="font-semibold">Tarde Livre</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    06 de março - Palestras SENASP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">9h - 17h</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CONCPC Tab */}
            <TabsContent value="concpc" className="space-y-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    03 de março - Abertura
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold">Horário: 19h</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    04 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Plenária</p>
                    <p className="text-sm text-muted-foreground">9h - 12h</p>
                  </div>
                  <div>
                    <p className="font-semibold">Tarde Livre</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    05 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Security Day</p>
                    <p className="text-sm text-muted-foreground">9h - 12h</p>
                  </div>
                  <div>
                    <p className="font-semibold">Reunião Técnica</p>
                    <p className="text-sm text-muted-foreground">14h - 17h</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    06 de março - Palestras SENASP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">9h - 17h</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Logística e Diárias Section */}
        <section id="logistica" className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="accent-line h-8"></div>
            <h2 className="text-4xl font-bold text-primary">Logística e Diárias</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="valores" className="card-elevated px-6">
              <AccordionTrigger className="py-4 hover:no-underline">
                <h3 className="text-lg font-semibold text-primary">Valores de Diárias</h3>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-muted">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Diárias (4,5 dias)</p>
                      <p className="text-2xl font-bold text-primary">R$ 425,00</p>
                      <p className="text-xs text-muted-foreground mt-2">Por dia</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Adicional de Embarque</p>
                      <p className="text-2xl font-bold text-accent">R$ 95,00</p>
                      <p className="text-xs text-muted-foreground mt-2">Valor único</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="bg-blue-50 border border-primary border-opacity-20 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-primary">Total Estimado</p>
                  <p className="text-3xl font-bold text-primary">R$ 2.007,50</p>
                  <p className="text-xs text-muted-foreground mt-2">(4,5 × R$ 425,00) + R$ 95,00</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prestacao" className="card-elevated px-6">
              <AccordionTrigger className="py-4 hover:no-underline">
                <h3 className="text-lg font-semibold text-primary">Prestação de Contas</h3>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4">
                <p className="text-foreground">
                  A entrega da Prestação de Contas é <span className="font-bold text-accent">obrigatória</span>.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-primary">Documentos Necessários:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Relatório de Viagem assinado</li>
                    <li>Cartões de embarque (ida e volta)</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enviar nos grupos de WhatsApp do GTI
                </p>
                <Button className="btn-institutional-secondary w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Relatório de Viagem
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="traje" className="card-elevated px-6">
              <AccordionTrigger className="py-4 hover:no-underline">
                <h3 className="text-lg font-semibold text-primary">Código de Traje</h3>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <p className="text-foreground">
                  O traje é <span className="font-semibold">à critério da instituição de origem</span>.
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  Recomendamos verificar com sua instituição as orientações específicas para o evento.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Roteiro Cultural Section */}
        <section id="roteiro" className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="accent-line h-8"></div>
            <h2 className="text-4xl font-bold text-primary">Roteiro Cultural e Gastronômico</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Culinária */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-2xl">Culinária</CardTitle>
                <CardDescription>Experiências gastronômicas em Brasília</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Setor de Clubes Sul</h4>
                  <p className="text-sm text-muted-foreground">
                    Diversos restaurantes e bares com culinária variada e ambiente sofisticado.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Pontão do Lago Sul</h4>
                  <p className="text-sm text-muted-foreground">
                    Região com restaurantes à beira do lago, oferecendo vista privilegiada e gastronomia de qualidade.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cultura */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-2xl">Cultura</CardTitle>
                <CardDescription>Pontos turísticos imprescindíveis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Praça dos Três Poderes</h4>
                  <p className="text-sm text-muted-foreground">
                    Centro político de Brasília com arquitetura icônica de Oscar Niemeyer.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Catedral Metropolitana</h4>
                  <p className="text-sm text-muted-foreground">
                    Obra-prima arquitetônica com design único e impressionante.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Ermida Dom Bosco</h4>
                  <p className="text-sm text-muted-foreground">
                    Local ideal para apreciar o pôr do sol sobre Brasília.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contato Section */}
        <section id="contato" className="container bg-primary text-white rounded-lg p-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">Entre em Contato</h2>
            <p className="text-lg opacity-90">
              Dúvidas sobre o evento? Fale conosco pelos canais abaixo.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Mail className="w-8 h-8 mx-auto text-accent" />
                <p className="text-sm opacity-75">Email</p>
                <a
                  href="mailto:comprassusp@mj.gov.br"
                  className="text-lg font-semibold hover:text-accent transition-smooth"
                >
                  comprassusp@mj.gov.br
                </a>
              </div>
              <div className="space-y-2">
                <Phone className="w-8 h-8 mx-auto text-accent" />
                <p className="text-sm opacity-75">Telefone</p>
                <div className="space-y-1">
                  <a href="tel:+556120253008" className="text-lg font-semibold hover:text-accent transition-all duration-300 ease-in-out block">
                    (61) 2025-3008
                  </a>
                  <a href="tel:+556120259796" className="text-lg font-semibold hover:text-accent transition-all duration-300 ease-in-out block">
                    (61) 9796
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white border-opacity-20">
              <Button className="bg-accent text-accent-foreground hover:bg-opacity-90">
                <MapPinIcon className="w-4 h-4 mr-2" />
                Abrir CICB no Google Maps
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-8 mt-16">
        <div className="container text-center">
          <p className="text-sm">
            © 2026 Encontro Nacional ComprasSusp. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2">
            Ministério da Justiça e Segurança Pública
          </p>
        </div>
      </footer>
    </div>
  );
}
