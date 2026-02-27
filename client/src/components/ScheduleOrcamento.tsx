import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, CheckCircle2, User, Users, Coffee, Info } from 'lucide-react';

export function ScheduleOrcamento() {
    const [isOpenDays45, setIsOpenDays45] = useState(false);
    const [isOpenDay6, setIsOpenDay6] = useState(false);

    return (
        <div className="w-full space-y-4 font-sans text-gray-800 pb-8">

            {/* ================= CARD DIAS 04 E 05 ================= */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm font-semibold text-slate-700">04 e 05 de março</h2>
                </div>

                <div className="px-6 py-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => setIsOpenDays45(!isOpenDays45)}
                    >
                        <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Participação no ILAB e Oficinas Temáticas
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="hidden md:inline">Horário Flexível | ILAB</span>
                            {isOpenDays45 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </div>
                    <p className="md:hidden text-xs text-gray-500 mt-1">Horário Flexível | ILAB</p>

                    {/* Aviso Expandido */}
                    {isOpenDays45 && (
                        <div className="mt-5 pt-6 border-t border-gray-100">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                                <span className="shrink-0 mt-0.5">
                                    <Info className="w-5 h-5 text-blue-500" />
                                </span>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Agenda a organizar, de acordo com a data de chegada, a quantidade de pontos focais e a disponibilidade de lugares nas salas.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= CARD DIA 06 ================= */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm font-semibold text-slate-700">06 de março</h2>
                </div>

                <div className="px-6 py-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => setIsOpenDay6(!isOpenDay6)}
                    >
                        <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Reunião das Câmaras Técnicas de Orçamento
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="hidden md:inline">08h30 – 12h30 | Salão modular, MJSP</span>
                            {isOpenDay6 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </div>
                    <p className="md:hidden text-xs text-gray-500 mt-1">08h30 – 12h30 | Salão modular, MJSP</p>

                    {/* Timeline Expandida */}
                    {isOpenDay6 && (
                        <div className="mt-5 pt-6 border-t border-gray-100 relative">
                            <div className="absolute left-2.5 md:left-3 top-8 bottom-0 w-0.5 bg-gray-100"></div>

                            <div className="relative pl-8 md:pl-10 space-y-8 pb-4">

                                {/* 08:30 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline">
                                        <span className="text-sm font-bold text-blue-600 md:w-28 shrink-0">08h30 - 08h40</span>
                                        <h4 className="text-base font-bold text-gray-900">Abertura</h4>
                                    </div>
                                </div>

                                {/* 08:40 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">08h40 - 09h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Captação e Execução de emendas parlamentares e cases de sucesso da SESP Paraná</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <User className="w-4 h-4" />
                                        <span>Major Squena</span>
                                    </div>
                                </div>

                                {/* 09:30 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">09h30 - 10h20</span>
                                        <h4 className="text-base font-bold text-gray-900">Captação de recursos do FUNAD e apresentação de projetos financiados</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>João Ambrósio e Nathália</span>
                                    </div>
                                </div>

                                {/* Intervalo */}
                                <div className="relative">
                                    <div className="absolute -left-8 md:-left-9 top-0 bg-white p-1">
                                        <Coffee className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col md:flex-row md:gap-4 md:items-center">
                                        <span className="text-sm font-bold text-gray-500 md:w-28 shrink-0">10h20 - 10h35</span>
                                        <h4 className="text-sm font-bold text-gray-700">Intervalo</h4>
                                    </div>
                                </div>

                                {/* 10:35 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">10h35 - 11h25</span>
                                        <h4 className="text-base font-bold text-gray-900 leading-snug">
                                            Captação e Execução de Emendas Parlamentares em outras pastas pelo Corpo de Bombeiros Militar de Minas Gerais e cases de sucesso
                                        </h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32 mt-1">
                                        <User className="w-4 h-4" />
                                        <span>Tenente-Coronel Douglas</span>
                                    </div>
                                </div>

                                {/* 11:25 (Encerramento) */}
                                <div className="relative">
                                    <div className="absolute -left-8 top-0.5 bg-white p-0.5">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-emerald-600 md:w-28 shrink-0">11h25 - 12h25</span>
                                        <h4 className="text-base font-bold text-gray-900 leading-snug">
                                            Apresentação e Execução de projetos no Fundo de Defesa dos Direitos Difusos - FDD
                                        </h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32 mt-1">
                                        <User className="w-4 h-4" />
                                        <span>PRF Alisson</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
