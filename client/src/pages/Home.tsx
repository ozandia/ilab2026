import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  MapPin,
  Phone,
  Mail,
  Download,
  ExternalLink,
  Clock,
  MapPinIcon,
  Calendar,
  Briefcase,
  UtensilsCrossed,
  Plane,
  AlertCircle
} from "lucide-react";
import { TravelProgressBar } from "@/components/TravelProgressBar";

/**
 * Design: Institucional Elegante com Modernidade Sutil
 * Paleta: Azul Marinho (#00375e), Branco (#ffffff), Dourado (#e1ad31)
 * Tipografia: Montserrat (títulos), Open Sans (corpo)
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState("consespd");

  const progressSteps = [
    { id: 'checkin', label: 'Check-in', status: 'completed' as const },
    { id: 'abertura', label: 'Abertura', status: 'current' as const },
    { id: 'programacao', label: 'Programação', status: 'upcoming' as const },
    { id: 'contas', label: 'Prestação de Contas', status: 'upcoming' as const },
  ];

  return (
    <div className="min-h-screen bg-site text-foreground font-sans selection:bg-accent selection:text-primary">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 header-gradient shadow-lg">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-accent rounded-full"></div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ComprasSusp 2026</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#programacao" className="text-white/80 hover:text-accent font-medium transition-all duration-300">
              Programação
            </a>
            <a href="#logistica" className="text-white/80 hover:text-accent font-medium transition-all duration-300">
              Logística
            </a>
            <a href="#roteiro" className="text-white/80 hover:text-accent font-medium transition-all duration-300">
              Roteiro
            </a>
            <a href="#contato" className="text-white/80 hover:text-accent font-medium transition-all duration-300">
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main className="pb-24">
        {/* Progress Bar Section */}
        <section className="bg-gray-50/50 border-b border-gray-100">
          <div className="container overflow-x-auto">
            <TravelProgressBar steps={progressSteps} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center overflow-hidden">
          {/* Background Overlay Wrapper */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-primary/70 z-10"></div>
            <img
              src="/cicb.jpeg"
              alt="CICB - Brasília"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container relative z-20">
            <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent font-bold rounded-full text-sm tracking-widest uppercase">
                  Brasília • 03-06 Março
                </span>
                <h1 className="text-6xl font-bold text-white leading-tight">
                  Encontro Nacional <br />
                  <span className="text-accent underline decoration-white/20 underline-offset-8">ComprasSusp 2026</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed font-light">
                  A excelência na gestão de contratações e aquisições <br />
                  fortalecendo a segurança pública em todo o Brasil.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="w-6 h-6 text-accent" />
                  <span className="font-semibold text-lg">CICB - Brasília/DF</span>
                </div>
                <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                <div className="flex items-center gap-3 text-white">
                  <Calendar className="w-6 h-6 text-accent" />
                  <span className="font-semibold text-lg">Março 2026</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="btn-navy h-14 px-10 text-lg shadow-xl shadow-primary/20">
                  <Download className="w-5 h-5 mr-3" />
                  Guia do Participante
                </Button>
                <Button className="btn-gold h-14 px-10 text-lg shadow-xl shadow-accent/20">
                  <MapPinIcon className="w-5 h-5 mr-3" />
                  Localização CICB
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Programação Section */}
        <section id="programacao" className="container pt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-10 bg-accent rounded-full"></div>
            <div>
              <h2 className="text-4xl font-bold text-primary">Programação</h2>
              <p className="text-gray-500 font-medium">Cronograma detalhado por grupo de trabalho</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="consespd">GTI CONSESPD / CNCG</TabsTrigger>
              <TabsTrigger value="ligabom">GTI LIGABOM</TabsTrigger>
              <TabsTrigger value="concpc">GTI CONCPC / CONDPCI</TabsTrigger>
            </TabsList>

            {/* CONSESPD Tab */}
            <TabsContent value="consespd" className="grid md:grid-cols-2 gap-6 pt-6">
              <Card className="card-premium card-highlight">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary text-xl">
                    <Clock className="w-5 h-5 text-accent" />
                    03 de março - Abertura
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">Horário: 19h</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Local: CICB</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary text-xl">
                    <Clock className="w-5 h-5 text-accent" />
                    04 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-primary">Plenária</p>
                    <p className="text-sm text-gray-500">9h - 12h | CICB</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-primary">Reunião Técnica</p>
                    <p className="text-sm text-gray-500">14h - 17h | Sala GTI</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary text-xl">
                    <Clock className="w-5 h-5 text-accent" />
                    05 de março
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-primary">Security Day</p>
                    <p className="text-sm text-gray-500">9h - 12h | Sala GTI</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-primary">Tarde Livre</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary text-xl">
                    <Clock className="w-5 h-5 text-accent" />
                    06 de março
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="font-bold text-primary">Palestras SENASP</p>
                    <p className="text-sm text-gray-600">9h - 17h | CICB</p>
                  </div>
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
        <section id="logistica" className="container pt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-10 bg-accent rounded-full"></div>
            <div>
              <h2 className="text-4xl font-bold text-primary">Logística e Diárias</h2>
              <p className="text-gray-500 font-medium">Informações essenciais para sua viagem</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="card-premium lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Plane className="w-6 h-6" />
                  Passagens e Diárias
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Valor da Diária</p>
                    <p className="text-3xl font-bold text-primary">R$ 425,00</p>
                    <p className="text-xs text-primary/60 mt-1">Nível Superior / GSISP</p>
                  </div>
                  <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                    <p className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Adicional Embarque</p>
                    <p className="text-3xl font-bold text-primary">R$ 95,00</p>
                    <p className="text-xs text-primary/60 mt-1">Taxa única por trecho</p>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl space-y-4">
                  <h4 className="font-bold text-primary flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-accent" />
                    Regras Importantes
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5"></div>
                      Afastamento SCDP obrigatório
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5"></div>
                      Bilhetes emitidos via agência MJ
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5"></div>
                      Traje conforme normas da instituição
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5"></div>
                      Check-in no hotel com antecedência
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Briefcase className="w-6 h-6" />
                  Prestação de Contas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  A entrega da documentação é <span className="font-bold text-primary">imprescindível</span> para a regularização da sua viagem no sistema.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Relatório de Viagem</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Canhotos de Embarque</span>
                  </div>
                </div>

                <Button className="btn-gold w-full h-12 shadow-lg shadow-accent/20">
                  <Download className="w-4 h-4 mr-2" />
                  Modelo de Relatório
                </Button>

                <p className="text-[10px] text-center text-gray-400">
                  Prazo: Até 5 dias após o término do evento.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Roteiro Cultural Section */}
        <section id="roteiro" className="container pt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-10 bg-accent rounded-full"></div>
            <div>
              <h2 className="text-4xl font-bold text-primary">Brasília: Guia Rápido</h2>
              <p className="text-gray-500 font-medium">Cultura e Gastronomia na Capital Federal</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-premium">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <UtensilsCrossed className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Culinária</CardTitle>
                <CardDescription>Experiências gastronômicas recomendadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-primary">Setor de Clubes Sul</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Localizado às margens do Lago Paranoá, oferece restaurantes sofisticados com carnes, frutos do mar e culinária contemporânea.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-primary">Pontão do Lago Sul</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    O maior centro de lazer e gastronomia da capital, ideal para um jantar com vista para a Ponte JK.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Cultura</CardTitle>
                <CardDescription>Pontos turísticos essenciais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-bold text-primary">Praça dos Três Poderes</p>
                      <p className="text-xs text-gray-500">Centro político e arquitetura de Niemeyer</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-bold text-primary">Catedral Metropolitana</p>
                      <p className="text-xs text-gray-500">Design icônico e vitrais impressionantes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-bold text-primary">Ermida Dom Bosco</p>
                      <p className="text-xs text-gray-500">Melhor pôr do sol de Brasília</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contato Section */}
        <section id="contato" className="container pt-24">
          <Card className="bg-primary overflow-hidden border-none shadow-2xl">
            <div className="grid lg:grid-cols-5 h-full">
              <div className="lg:col-span-3 p-12 lg:p-16 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-white">Precisa de Suporte?</h2>
                  <p className="text-white/70 text-lg">
                    Estamos à disposição para ajudar com qualquer dúvida sobre o evento, logística ou programação.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-accent font-bold">
                      <Mail className="w-5 h-5" />
                      E-MAIL
                    </div>
                    <a href="mailto:comprassusp@mj.gov.br" className="text-xl text-white font-medium hover:text-accent transition-all">
                      comprassusp@mj.gov.br
                    </a>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-accent font-bold">
                      <Phone className="w-5 h-5" />
                      TELEFONE
                    </div>
                    <div className="space-y-1 text-xl text-white font-medium">
                      <p>(61) 2025-3008</p>
                      <p>(61) 2025-9796</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button className="btn-gold h-14 px-10 text-lg">
                    <ExternalLink className="w-5 h-5 mr-3" />
                    Abrir Chamado Suporte
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white/5 flex flex-col items-center justify-center p-12 text-center space-y-6">
                <AlertCircle className="w-16 h-16 text-accent animate-pulse" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Emergência</h3>
                  <p className="text-white/60 text-sm">
                    Para situações urgentes fora do horário comercial, entre em contato via canal de segurança do CICB.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h3 className="text-lg font-bold text-primary tracking-tight">ComprasSusp 2026</h3>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                O fortalecimento da Segurança Pública através da governança e inovação em aquisições.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Organização</p>
              <p className="text-sm font-semibold text-primary">SENASP - Ministério da Justiça e Segurança Pública</p>
              <p className="text-xs text-gray-500">Governo Federal do Brasil</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 font-medium">
              © 2026 Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-xs text-gray-500 font-medium">
              <a href="#" className="hover:text-primary">Privacidade</a>
              <a href="#" className="hover:text-primary">Termos de Uso</a>
              <a href="#" className="hover:text-primary">Acessibilidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
