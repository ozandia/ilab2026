import { useState } from "react";
import { Clock, ChevronDown, ChevronUp, CheckCircle2, MapPin } from "lucide-react";

interface TimelineEvent {
    time: string;
    title: string;
    bullets?: string[];
    isLast?: boolean;
}

interface DayCardProps {
    date: string;
    summaryTitle: string;
    summaryDetail: string;
    isOpen: boolean;
    onToggle: () => void;
    events: TimelineEvent[];
}

function DayCard({ date, summaryTitle, summaryDetail, isOpen, onToggle, events }: DayCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Standardized Header */}
            <div className="bg-slate-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <h2 className="text-sm font-semibold text-slate-700">{date}</h2>
            </div>

            {/* Expandable Row Summary */}
            <div
                className="px-6 py-5 flex justify-between items-center cursor-pointer group hover:bg-slate-50/30 transition-colors"
                onClick={onToggle}
            >
                <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {summaryTitle}
                    </h3>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="hidden sm:inline">{summaryDetail}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
            </div>

            {/* Expanded State: Vertical Timeline */}
            {isOpen && (
                <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="relative border-l-2 border-slate-100 ml-3 pl-8 space-y-8 py-2">
                        {events.map((event, idx) => (
                            <div key={idx} className="relative">
                                {/* Timeline Node */}
                                <div className="absolute -left-[41px] top-1">
                                    {event.isLast ? (
                                        <div className="bg-white rounded-full p-0.5">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />
                                    )}
                                </div>

                                {/* Event Content */}
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit uppercase tracking-wider">
                                            {event.time}
                                        </span>
                                        <h4 className="text-sm font-bold text-gray-900 leading-snug">
                                            {event.title}
                                        </h4>
                                    </div>

                                    {event.bullets && event.bullets.length > 0 && (
                                        <ul className="space-y-2">
                                            {event.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                                                    <span className="text-blue-400 font-bold">›</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function ScheduleFundoAFundo() {
    const [isOpenDay4, setIsOpenDay4] = useState(false);
    const [isOpenDay5, setIsOpenDay5] = useState(false);
    const [isOpenDay6, setIsOpenDay6] = useState(false);

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            {/* Day 04 */}
            <DayCard
                date="04 de março"
                summaryTitle="Reunião da Rede Interfederativa"
                summaryDetail="14h – 17h30 | Sala 4, ILAB"
                isOpen={isOpenDay4}
                onToggle={() => setIsOpenDay4(!isOpenDay4)}
                events={[
                    {
                        time: "14h00 – 17h30",
                        title: "Reunião da Rede Interfederativa da Transferência Fundo a Fundo",
                        bullets: [
                            "Execução dos recursos do FNSP",
                            "Compartilhamento de boas práticas entre Entes Federados",
                            "Pactuação 2026",
                        ]
                    }
                ]}
            />

            {/* Day 05 */}
            <DayCard
                date="05 de março"
                summaryTitle="Oficina Técnica Gestão Segura"
                summaryDetail="09h – 17h30 | Salas Modulares, MJSP"
                isOpen={isOpenDay5}
                onToggle={() => setIsOpenDay5(!isOpenDay5)}
                events={[
                    {
                        time: "09h00 – 12h00",
                        title: "Oficina Técnica – Gestão Segura (Manhã)",
                        bullets: [
                            "Apresentação do Módulo do Plano de Aplicação no Sistema Gestão Segura",
                            "Fluxos operacionais e funcionalidades",
                            "Demonstração prática orientada",
                        ]
                    },
                    {
                        time: "14h00 – 17h30",
                        title: "Oficina Técnica – Gestão Segura (Tarde)",
                        bullets: [
                            "Apresentação do Módulo do Relatório de Gestão (análise financeira) no Sistema Gestão Segura",
                            "Demonstração prática orientada",
                        ]
                    }
                ]}
            />

            {/* Day 06 */}
            <DayCard
                date="06 de março"
                summaryTitle="Lançamento dos Módulos do Plano de Aplicação e de Gestão"
                summaryDetail="09h – 11h30 | Auditório, ILAB"
                isOpen={isOpenDay6}
                onToggle={() => setIsOpenDay6(!isOpenDay6)}
                events={[
                    {
                        time: "09h00 – 10h00",
                        title: "Cerimônia de Lançamento dos Módulos de Gestão – Gestão Segura",
                        bullets: [
                            "Apresentação dos novos módulos do sistema",
                            "Demonstração das funcionalidades estratégicas",
                        ]
                    },
                    {
                        time: "10h30 – 11h30",
                        title: "Ferramenta Transferegov.",
                        isLast: true
                    }
                ]}
            />
        </div>
    );
}
