import { useState } from "react";
import { Clock, MapPin, Bus } from "lucide-react";
import { ScheduleCard } from "@/components/ScheduleCard";
import { ScheduleCardDay2 } from "@/components/ScheduleCardDay2";
import { ScheduleFundoAFundo } from "@/components/ScheduleFundoAFundo";

// Reusable day card components
function Day03Card() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/30">
                <Clock className="w-4 h-4 text-blue-500" />
                <h2 className="text-sm font-semibold text-slate-700">03 de março - Abertura</h2>
            </div>
            <div className="px-6 py-5">
                <h3 className="text-base font-bold text-gray-900">Horário: 19h</h3>
                <p className="text-sm text-gray-500 mt-1">Local: CICB</p>
            </div>
        </div>
    );
}

function Day06Card() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/30">
                <Clock className="w-4 h-4 text-blue-500" />
                <h2 className="text-sm font-semibold text-slate-700">06 de março - Palestras SENASP</h2>
            </div>
            <div className="px-6 py-5 flex items-center">
                <p className="text-sm text-gray-500">9h - 17h | CICB</p>
            </div>
        </div>
    );
}

// Simple card for other days
function SimpleCard({ title, items }: { title: string; items: { label: string; detail?: string }[] }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/30">
                <Clock className="w-4 h-4 text-blue-500" />
                <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
            </div>
            <div className="px-6 py-5 space-y-3">
                {items.map((item, i) => (
                    <div key={i}>
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        {item.detail && <p className="text-sm text-gray-500">{item.detail}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ProgramacaoWizard() {
    const [currentStep, setCurrentStep] = useState(1);

    const gtiSteps = [
        {
            id: 1,
            label: "CONVÊNIOS",
            description: "REDE INTERFEDERATIVA DE CONVÊNIOS",
            content: (
                <div className="space-y-4">
                    <Day03Card />
                    <ScheduleCard />
                    <ScheduleCardDay2 />
                    <Day06Card />
                </div>
            )
        },
        {
            id: 2,
            label: "FUNDO A FUNDO",
            description: "REDE INTERFEDERATIVA DE TRANSFERÊNCIAS FUNDO A FUNDO",
            content: (
                <div className="space-y-4">
                    <Day03Card />
                    <ScheduleFundoAFundo />
                </div>
            )
        },
        {
            id: 3,
            label: "LOGÍSTICA",
            description: "REDE INTERFEDERATIVA DE LOGÍSTICA",
            content: (
                <div className="space-y-4">
                    <Day03Card />
                    <SimpleCard title="04 de março" items={[
                        { label: "Plenária", detail: "9h - 12h" },
                        { label: "Reunião Técnica", detail: "14h - 17h" },
                    ]} />
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/30">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <h2 className="text-sm font-semibold text-slate-700">05 de março</h2>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <div>
                                <p className="font-semibold text-gray-900">Visita Técnica Canil CBMDF</p>
                                <p className="text-sm text-gray-500">9h - 12h | Academia CBMDF</p>
                                <div className="mt-3 flex gap-3 rounded-lg border border-blue-100 bg-blue-50/40 p-3">
                                    <Bus className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Translado</p>
                                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                                            Saída às <span className="font-semibold text-gray-700">9h</span> da Sede do MJSP. Retorno ao CICB previsto para as <span className="font-semibold text-gray-700">13h</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Visita ao iLab-Seg</p>
                                <p className="text-sm text-gray-500">14h - 17h</p>
                            </div>
                        </div>
                    </div>
                    <Day06Card />
                </div>
            )
        },
        {
            id: 4,
            label: "TRANSFERÊNCIAS VOLUNTÁRIAS",
            description: "REDE INTERFEDERATIVA DE TRANSFERÊNCIAS VOLUNTÁRIAS",
            content: (
                <div className="space-y-4">
                    <Day03Card />
                    <SimpleCard title="04 de março" items={[
                        { label: "Plenária", detail: "9h - 12h" },
                        { label: "Visita ao iLab-Seg", detail: "14h - 17h" },
                    ]} />
                    <SimpleCard title="05 de março" items={[
                        { label: "Security Day", detail: "9h - 12h" },
                        { label: "Reunião Técnica", detail: "14h - 17h" },
                    ]} />
                    <Day06Card />
                </div>
            )
        },
        {
            id: 5,
            label: "ORÇAMENTO",
            description: "CÂMARAS TÉCNICAS DE ORÇAMENTO",
            content: (
                <div className="space-y-4">
                    <Day03Card />
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/30">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <h2 className="text-sm font-semibold text-slate-700">04 de março</h2>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <div>
                                <p className="font-semibold text-gray-900">Visita ao Instituto Nacional de Criminalística - INC</p>
                                <p className="text-sm text-gray-500">8h - 12h</p>
                                <div className="mt-3 flex gap-3 rounded-lg border border-blue-100 bg-blue-50/40 p-3">
                                    <Bus className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Translado</p>
                                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                                            Saída às <span className="font-semibold text-gray-700">08h</span> da Sede do Ministério da Justiça e Segurança Pública
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Visita ao iLab-Seg</p>
                                <p className="text-sm text-gray-500">14h - 17h</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/30">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <h2 className="text-sm font-semibold text-slate-700">05 de março</h2>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <div>
                                <p className="font-semibold text-gray-900">Security Day</p>
                                <p className="text-sm text-gray-500">9h - 12h</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Reunião Técnica</p>
                                <p className="text-sm text-gray-500">14h - 17h</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Mesa Redonda</p>
                                <p className="text-sm text-gray-500">17h30 | Sede da APCF</p>
                                <p className="text-xs text-blue-500 italic mt-0.5">Protagonismo do ComprasSusp na Modernização da PCI</p>
                                <a
                                    href="https://maps.google.com/?q=APCF+Associação+dos+Delegados+da+Polícia+Federal+Brasília"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline mt-1"
                                    aria-label="Ver localização da Sede da APCF no Google Maps"
                                >
                                    <MapPin className="w-3 h-3" aria-hidden="true" />
                                    Ver no Maps
                                </a>
                            </div>
                        </div>
                    </div>
                    <Day06Card />
                </div>
            )
        }
    ];

    return (
        <div className="br-wizard" data-vertical="vertical" data-step={currentStep}>

            {/* Mobile: numbered dots + dynamic label */}
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
                <div className="wizard-step-label flex flex-col items-center" aria-live="polite">
                    <span className="wizard-step-title text-center">
                        {gtiSteps.find((s) => s.id === currentStep)?.label}
                    </span>
                    {gtiSteps.find((s) => s.id === currentStep)?.description && (
                        <span className="wizard-step-desc text-xs text-primary/60 mt-0.5 block text-center">
                            {gtiSteps.find((s) => s.id === currentStep)?.description}
                        </span>
                    )}
                </div>
            </div>

            {/* Desktop: vertical sidebar tabs */}
            <div className="wizard-header hidden md:block">
                <div className="wizard-progress" role="tablist" aria-label="Grupos de trabalho">
                    {gtiSteps.map((step) => (
                        <button
                            key={step.id}
                            className="wizard-progress-btn flex flex-col items-start text-left py-3 px-4"
                            type="button"
                            role="tab"
                            data-step={step.id}
                            aria-selected={currentStep === step.id}
                            aria-controls={`panel-step-${step.id}`}
                            id={`tab-step-${step.id}`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            <span className="info font-bold">{step.label}</span>
                            {step.description && (
                                <span className="text-[10px] text-primary/50 font-medium mt-1 block leading-tight">
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
