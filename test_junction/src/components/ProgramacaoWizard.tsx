import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin } from "lucide-react";

export function ProgramacaoWizard() {
    const [currentStep, setCurrentStep] = useState(1);

    const gtiSteps = [
        {
            id: 1,
            label: "CONSESP",
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
                </div>
            )
        },
        {
            id: 2,
            label: "CNCG",
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
                </div>
            )
        },
        {
            id: 3,
            label: "LIGABOM",
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
                </div>
            )
        },
        {
            id: 4,
            label: "CONCPC",
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
                </div>
            )
        },
        {
            id: 5,
            label: "CONDPCI",
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
                </div>
            )
        }
    ];



    return (
        <div className="br-wizard" data-vertical="vertical" data-step={currentStep}>
            <div className="wizard-header">
                <div className="wizard-progress" role="tablist">
                    {gtiSteps.map((step) => (
                        <button
                            key={step.id}
                            className="wizard-progress-btn"
                            type="button"
                            data-step={step.id}
                            aria-selected={currentStep === step.id}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            <span className="info">{step.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="wizard-form">
                {gtiSteps.map((step) => (
                    <div
                        key={step.id}
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
