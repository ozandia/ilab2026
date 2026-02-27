import { useState } from "react";
import { Clock, ChevronDown, ChevronUp, User, Users, Coffee, Utensils, CheckCircle2 } from "lucide-react";

interface TimelineItem {
    time: string;
    title: string;
    speaker?: string;
    description?: string;
    bullets?: string[];
    isBreak?: boolean;
    breakIcon?: "coffee" | "utensils";
    isEnd?: boolean;
}

const timeline: TimelineItem[] = [
    {
        time: "09h00–09h30",
        title: "Abertura e Alinhamento dos Objetivos",
        speaker: "Keila Silveira Vasconcelos",
        bullets: [
            "Boas-vindas aos participantes.",
            "Apresentação da programação do dia.",
            "Reflexão sobre a pesquisa de preço para execução de convênios no âmbito da SENASP.",
        ],
    },
    {
        time: "09h30–12h00",
        title: "Pesquisa de Preço no âmbito dos Convênios da Senasp",
        speaker: "Diego Felipe de Sousa Maria / Raylon Felipe de Sousa Maria",
        bullets: [
            "Normativos vigentes aplicáveis.",
            "Apontamentos de órgãos de controle interno e externo.",
            "Análise da pesquisa de preço no âmbito da Senasp.",
        ],
    },
    {
        time: "12h15–14h00",
        title: "Intervalo para almoço",
        isBreak: true,
        breakIcon: "utensils",
    },
    {
        time: "14h00–15h15",
        title: "Apresentação: Pesquisa de preço nas instituições estaduais",
        speaker: "Entes estaduais — Coordenação da CGCR",
        description:
            "Como é realizada a pesquisa, caminhos para boa formação e Material Auxiliar (Anexo I).",
        bullets: [
            "Diferenças e especificidades nos estados.",
            "Boas práticas implementadas.",
            "Dificuldades recorrentes.",
            "Integração entre a instância federal e estadual.",
        ],
    },
    {
        time: "15h15–15h30",
        title: "Intervalo",
        isBreak: true,
        breakIcon: "coffee",
    },
    {
        time: "15h30–16h45",
        title: "Formação de Grupos de Estudo — Pesquisa de Preço Nacional",
        speaker: "Entes estaduais — Coordenação da CGCR",
        bullets: [
            "Divisão dos participantes em grupos temáticos.",
            "Identificação de gargalos no fluxo atual.",
            "Proposição de melhorias e soluções aplicáveis.",
            "Consolidação de sugestões.",
        ],
    },
    {
        time: "16h45–17h30",
        title: "Apresentação das Propostas dos Grupos",
        speaker: "Entes estaduais — Coordenação da CGCR",
        bullets: [
            "Exposição das sugestões de cada equipe.",
            "Debate coletivo entre os participantes.",
            "Identificação de medidas prioritárias.",
            "Encaminhamentos práticos e próximos passos.",
        ],
    },
    {
        time: "17h30",
        title: "Encerramento",
        isEnd: true,
    },
];

export function ScheduleCardDay2() {
    const [open, setOpen] = useState(true);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-gray-200">
                <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-700">05 de março</span>
            </div>

            {/* Accordion: Programação do Dia */}
            <div>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="w-full px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-left hover:bg-slate-50 transition-colors"
                    aria-expanded={open}
                >
                    <span className="font-semibold text-slate-800">Programação do Dia</span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm text-slate-500">
                            09h – 17h30 &nbsp;|&nbsp; Procedimentos Licitatórios
                        </span>
                        {open ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                    </div>
                </button>

                {open && (
                    <div className="px-5 pb-6 pt-2">
                        <ol className="relative">
                            {timeline.map((item, idx) => {
                                const isLast = idx === timeline.length - 1;

                                return (
                                    <li key={idx} className="flex gap-4">
                                        {/* Dot + vertical line */}
                                        <div className="flex flex-col items-center flex-shrink-0">
                                            {item.isEnd ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 z-10" />
                                            ) : (
                                                <div
                                                    className={`w-3 h-3 rounded-full mt-1 z-10 flex-shrink-0 ${item.isBreak ? "bg-gray-300" : "bg-blue-500"
                                                        }`}
                                                />
                                            )}
                                            {!isLast && (
                                                <div className="w-px flex-1 bg-gray-200 mt-1" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={`pb-6 flex-1 min-w-0 ${isLast ? "pb-0" : ""}`}>
                                            {/* Time badge */}
                                            <span className="inline-block text-xs font-mono font-semibold text-blue-600 bg-blue-50 rounded px-2 py-0.5 mb-1">
                                                {item.time}
                                            </span>

                                            {item.isBreak ? (
                                                <div
                                                    className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${item.breakIcon === "utensils"
                                                            ? "bg-gray-50 border-slate-100"
                                                            : "bg-gray-50 border-gray-100"
                                                        }`}
                                                >
                                                    {item.breakIcon === "utensils" ? (
                                                        <Utensils className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                                    ) : (
                                                        <Coffee className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                                    )}
                                                    <span className="text-sm font-medium text-slate-600">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="font-semibold text-gray-900 leading-snug">
                                                        {item.title}
                                                    </p>

                                                    {item.speaker && (
                                                        <div className="flex items-center gap-1.5 mt-1 mb-1">
                                                            {item.speaker.includes("/") ? (
                                                                <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                            ) : (
                                                                <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                            )}
                                                            <span className="text-xs text-gray-500 italic">
                                                                {item.speaker}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {item.description && (
                                                        <p className="text-xs text-gray-500 mt-1 mb-1 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    )}

                                                    {item.bullets && item.bullets.length > 0 && (
                                                        <ul className="mt-1 space-y-1">
                                                            {item.bullets.map((b, bi) => (
                                                                <li
                                                                    key={bi}
                                                                    className="flex gap-2 text-sm text-slate-600"
                                                                >
                                                                    <span className="text-blue-400 mt-0.5 flex-shrink-0">›</span>
                                                                    <span>{b}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
}
