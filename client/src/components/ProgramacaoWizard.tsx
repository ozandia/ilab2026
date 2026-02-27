import { useState } from "react";
import { Clock, MapPin, Bus } from "lucide-react";
import { ScheduleCard } from "@/components/ScheduleCard";
import { ScheduleCardDay2 } from "@/components/ScheduleCardDay2";
import { ScheduleFundoAFundo } from "@/components/ScheduleFundoAFundo";
import { ScheduleLogistica } from "@/components/ScheduleLogistica";
import { ScheduleOrcamento } from "@/components/ScheduleOrcamento";

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
            label: "Obrigatórias",
            description: "Rede Interfederativa de Transferências Fundo a Fundo",
            content: (
                <div className="space-y-4">
                    <Day03Card />
                    <ScheduleFundoAFundo />
                </div>
            )
        },
        {
            id: 2,
            label: "Voluntárias",
            description: "Rede Interfederativa de Convênios",
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
            id: 3,
            label: "Orçamento",
            description: "Câmaras Técnicas de Orçamento",
            content: (
                <div className="space-y-4">
                    <ScheduleOrcamento />
                </div>
            )
        },
        {
            id: 4,
            label: "Logística",
            description: "Rede Interfederativa de Logística",
            content: (
                <div className="space-y-4">
                    <ScheduleLogistica />
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
                        <span className="wizard-step-desc text-[10px] text-primary/60 mt-0.5 block text-center italic">
                            {gtiSteps.find((s) => s.id === currentStep)?.description}
                        </span>
                    )}
                </div>
            </div>

            {/* Desktop: vertical sidebar tabs */}
            <div className="wizard-header hidden md:block">
                <div className="wizard-progress space-y-3" role="tablist" aria-label="Grupos de trabalho">
                    {gtiSteps.map((step) => (
                        <button
                            key={step.id}
                            className={`w-full flex flex-row items-center gap-[20px] px-[25px] py-[20px] rounded-xl transition-all duration-200 text-left border-none shadow-sm
                                ${currentStep === step.id
                                    ? "bg-[#0E4DA4] shadow-md scale-[1.02]"
                                    : "bg-[#F4F8FF] border border-[#E6EFFF] hover:bg-[#E0EAFF] shadow-sm hover:scale-[1.01]"
                                }`}
                            type="button"
                            role="tab"
                            data-step={step.id}
                            aria-selected={currentStep === step.id}
                            aria-controls={`panel-step-${step.id}`}
                            id={`tab-step-${step.id}`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            <div className={`flex-shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-[22px] transition-colors
                                ${currentStep === step.id ? "bg-white text-[#0E4DA4]" : "bg-[#0E4DA4] text-white"}`}>
                                {step.id}
                            </div>
                            <div className="flex flex-col justify-center min-w-0 flex-1">
                                <span className={`text-[20px] font-bold leading-[1.1] truncate transition-colors
                                    ${currentStep === step.id ? "text-white" : "text-[#0E4DA4]"}`}>
                                    {step.label}
                                </span>
                                {step.description && (
                                    <span className={`text-[13px] font-normal italic leading-[1.2] truncate transition-colors mt-1
                                        ${currentStep === step.id ? "text-[#E0E0E0]" : "text-[#333333]"}`}>
                                        {step.description}
                                    </span>
                                )}
                            </div>
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
