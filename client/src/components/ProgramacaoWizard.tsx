import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, Bus } from "lucide-react";
import { ScheduleCard } from "@/components/ScheduleCard";
import { ScheduleCardDay2 } from "@/components/ScheduleCardDay2";

export function ProgramacaoWizard() {
    const [currentStep, setCurrentStep] = useState(1);

    const gtiSteps = [
        {
            id: 1,
            label: "CONVÊNIOS",
            description: "REDE INTERFEDERATIVA DE CONVÊNIOS",
            content: (
                <div className="space-y-4">
                    <Card className="card-elevated">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent" />
                                03 de março - Abertura
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="font-semibold">Horário: 19h</p>
                            <p className="text-sm text-muted-foreground">Local: CICB</p>
                        </CardContent>
                    </Card>

                    <ScheduleCard />

                    <ScheduleCardDay2 />


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
                </div>
            )
        },
        {
            id: 2,
            label: "FUNDO A FUNDO",\n            description: "REDE INTERFEDERATIVA DE TRANSFER\u00caNCIAS FUNDO A FUNDO",
            content: (
                <div className="space-y-4">
                    <Card className="card-elevated">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent" />
                                03 de março - Abertura
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="font-semibold">Horário: 19h</p>
                            <p className="text-sm text-muted-foreground">Local: CICB</p>
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
                                <div className="space-y-1"><p className="font-semibold">Visita ao iLab-Seg</p><p className="text-sm text-muted-foreground">14h - 17h</p></div>
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
                </div>
            )
        },
        {
            id: 3,
            label: "LOGÍSTICA",\n            description: "REDE INTERFEDERATIVA DE LOG\u00cdSTICA",
            content: (
                <div className="space-y-4">
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

                                {/* Transport notice */}
                                <div className="mt-3 flex gap-3 rounded-lg border border-accent/20 bg-accent/5 p-3">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                                        <Bus className="w-4 h-4 text-accent" aria-hidden="true" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-semibold text-accent uppercase tracking-wide">Translado</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Saída às <span className="font-semibold text-foreground">9h</span> da Sede do MJSP. Retorno ao CICB previsto para as <span className="font-semibold text-foreground">13h</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="space-y-1"><p className="font-semibold">Visita ao iLab-Seg</p><p className="text-sm text-muted-foreground">14h - 17h</p></div>
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
                </div>
            )
        },
        {
            id: 4,
            label: "TRANSFERÊNCIAS VOLUNTÁRIAS",\n            description: "REDE INTERFEDERATIVA DE TRANSFER\u00caNCIAS VOLUNT\u00c1RIAS",
            content: (
                <div className="space-y-4">
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
                                <div className="space-y-1"><p className="font-semibold">Visita ao iLab-Seg</p><p className="text-sm text-muted-foreground">14h - 17h</p></div>
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
                </div>
            )
        },
        {
            id: 5,
            label: "ORÇAMENTO",\n            description: "C\u00c2MARAS T\u00c9CNICAS DE OR\u00c7AMENTO",
            content: (
                <div className="space-y-4">
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
                                <p className="font-semibold">Visita ao Instituto Nacional de Criminalística - INC</p>
                                <p className="text-sm text-muted-foreground">8h - 12h</p>

                                {/* Transport notice */}
                                <div className="mt-3 flex gap-3 rounded-lg border border-accent/20 bg-accent/5 p-3">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                                        <Bus className="w-4 h-4 text-accent" aria-hidden="true" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-semibold text-accent uppercase tracking-wide">Translado</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Saída às <span className="font-semibold text-foreground">08h</span> da Sede do Ministério da Justiça e Segurança Pública
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="space-y-1"><p className="font-semibold">Visita ao iLab-Seg</p><p className="text-sm text-muted-foreground">14h - 17h</p></div>
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
                            <div>
                                <p className="font-semibold">Mesa Redonda</p>
                                <p className="text-sm text-muted-foreground">17h30 Local: Sede da APCF</p>
                                <p className="text-xs text-primary/70 italic mt-0.5">Protagonismo do ComprasSusp na Modernização da PCI</p>
                                <a
                                    href="https://maps.google.com/?q=APCF+Associação+dos+Delegados+da+Polícia+Federal+Brasília"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-accent hover:underline mt-1"
                                    aria-label="Ver localização da Sede da APCF no Google Maps (abre em nova janela)"
                                >
                                    <MapPin className="w-3 h-3" aria-hidden="true" />
                                    Ver no Maps
                                </a>
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
                </div>
            )
        }
    ];



    return (
        <div className="br-wizard" data-vertical="vertical" data-step={currentStep}>

            {/* Mobile: elegant step indicator — numbered circles + dynamic label */}
            <div className="wizard-mobile-steps md:hidden" aria-label="Grupos de trabalho">
                <div className="wizard-steps-row" role="tablist">
                    {gtiSteps.map((step) => (
                        <button
                            key={step.id}
                            type="button"
                            role="tab"
                            aria-selected={currentStep === step.id}
                            aria-controls={`panel-step-${step.id}`}
                            aria-label={`${step.label} — passo ${step.id} de ${gtiSteps.length}`}
                            onClick={() => setCurrentStep(step.id)}
                            className={`wizard-step-dot ${currentStep === step.id ? "active" : ""}`}
                        >
                            {step.id}
                        </button>
                    ))}
                </div>
                <div className="wizard-step-label" aria-live="polite">
                    <span className="wizard-step-title">
                        {gtiSteps.find((s) => s.id === currentStep)?.label}
                    </span>
                    {gtiSteps.find((s) => s.id === currentStep)?.description && (
                        <span className="wizard-step-desc text-xs text-primary/60 mt-0.5 block">
                            {gtiSteps.find((s) => s.id === currentStep)?.description}
                        </span>
                    )}
                </div>
            </div>

            {/* Desktop: vertical sidebar tabs */}
            <div className="wizard-header hidden md:block">
                <div
                    className="wizard-progress"
                    role="tablist"
                    aria-label="Grupos de trabalho"
                >
                    {gtiSteps.map((step) => (
                        <button
                            key={step.id}
                            className="wizard-progress-btn"
                            type="button"
                            role="tab"
                            data-step={step.id}
                            aria-selected={currentStep === step.id}
                            aria-controls={`panel-step-${step.id}`}
                            id={`tab-step-${step.id}`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            <span className="info">{step.label}</span>
                            {step.description && (
                                <span className="text-[10px] text-primary/50 font-normal mt-0.5 block leading-tight">
                                    {step.description}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content panels */}
            <div className="wizard-form">
                {gtiSteps.map((step) => (
                    <div
                        key={step.id}
                        id={`panel-step-${step.id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-step-${step.id}`}
                        className={`wizard-panel ${currentStep === step.id ? "active" : ""}`}
                        style={{ display: currentStep === step.id ? "block" : "none" }}
                    >
                        <div className="wizard-panel-content">
                            {step.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
