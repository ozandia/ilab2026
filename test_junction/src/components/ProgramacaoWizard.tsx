import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, ChevronRight, ChevronLeft } from "lucide-react";

export function ProgramacaoWizard() {
    const [currentStep, setCurrentStep] = useState(1);

    const gtiSteps = [
        {
            id: 1,
            label: "GTI CONSESPD / CNCG",
            content: (
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>
            )
        },
        {
            id: 2,
            label: "GTI LIGABOM",
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
            id: 3,
            label: "GTI CONCPC / CONDPCI",
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

    const handleNext = () => {
        if (currentStep < gtiSteps.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

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
                        <div className="wizard-panel-btn flex justify-between mt-8">
                            <Button
                                variant="outline"
                                onClick={handlePrev}
                                disabled={currentStep === 1}
                                className="br-button secondary"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={currentStep === gtiSteps.length}
                                className="br-button primary"
                            >
                                Próximo <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
