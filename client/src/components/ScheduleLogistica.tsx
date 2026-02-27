import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, CheckCircle2, User, Users, Coffee, Utensils } from 'lucide-react';

export function ScheduleLogistica() {
    const [isOpenDay4, setIsOpenDay4] = useState(false);
    const [isOpenDay5, setIsOpenDay5] = useState(false);

    return (
        <div className="w-full space-y-4 font-sans text-gray-800 pb-8">

            {/* ================= CARD DIA 04 ================= */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm font-semibold text-slate-700">04 de março</h2>
                </div>

                <div className="px-6 py-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => setIsOpenDay4(!isOpenDay4)}
                    >
                        <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Programação Setor de Logística
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="hidden md:inline">09h00 – 17h00</span>
                            {isOpenDay4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </div>
                    <p className="md:hidden text-xs text-gray-500 mt-1">09h00 – 17h00</p>

                    {isOpenDay4 && (
                        <div className="mt-5 pt-6 border-t border-gray-100 relative">
                            <div className="absolute left-2.5 md:left-3 top-8 bottom-0 w-0.5 bg-gray-100"></div>

                            <div className="relative pl-8 md:pl-10 space-y-8 pb-4">

                                {/* 09:00 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-blue-600 md:w-28 shrink-0">09h00 - 09h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Apresentação Geral</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Tc Dantas e Tc Guimarães</span>
                                    </div>
                                </div>

                                {/* 09:30 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">09h30 - 10h10</span>
                                        <h4 className="text-base font-bold text-gray-900">Fluxo de Doações</h4>
                                    </div>
                                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 md:ml-32 mt-1">
                                        <li>Naiana (programas, legado e emendas parlamentares)</li>
                                        <li>Gélvica (extralegado)</li>
                                    </ul>
                                </div>

                                {/* 10:10 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">10h10 - 10h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Transferência de propriedade de veículos</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Arrais e J Neto</span>
                                    </div>
                                </div>

                                {/* Intervalo Manhã */}
                                <div className="relative">
                                    <div className="absolute -left-8 md:-left-9 top-0 bg-white p-1">
                                        <Coffee className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col md:flex-row md:gap-4 md:items-center">
                                        <span className="text-sm font-bold text-gray-500 md:w-28 shrink-0">10h30 - 11h00</span>
                                        <h4 className="text-sm font-bold text-gray-700">Intervalo (30 min)</h4>
                                    </div>
                                </div>

                                {/* 11:00 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">11h00 - 11h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Registro e controle de bens doados</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Fabrício e Paulo</span>
                                    </div>
                                </div>

                                {/* 11:30 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">11h30 - 12h00</span>
                                        <h4 className="text-base font-bold text-gray-900">Dúvidas e sugestões</h4>
                                    </div>
                                </div>

                                {/* Intervalo Almoço */}
                                <div className="relative">
                                    <div className="absolute -left-8 md:-left-9 top-0 bg-white p-1">
                                        <Utensils className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col md:flex-row md:gap-4 md:items-center">
                                        <span className="text-sm font-bold text-gray-500 md:w-28 shrink-0">12h00 - 14h00</span>
                                        <h4 className="text-sm font-bold text-gray-700">Intervalo Almoço</h4>
                                    </div>
                                </div>

                                {/* 14:00 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">14h00 - 14h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Baixa contábil e patrimonial de bens doados pela Senasp</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <User className="w-4 h-4" />
                                        <span>Bastos</span>
                                    </div>
                                </div>

                                {/* 14:30 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">14h30 - 15h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Regularização de passivos</h4>
                                    </div>
                                </div>

                                {/* Intervalo Tarde */}
                                <div className="relative">
                                    <div className="absolute -left-8 md:-left-9 top-0 bg-white p-1">
                                        <Coffee className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col md:flex-row md:gap-4 md:items-center">
                                        <span className="text-sm font-bold text-gray-500 md:w-28 shrink-0">15h30 - 16h00</span>
                                        <h4 className="text-sm font-bold text-gray-700">Intervalo (30 min)</h4>
                                    </div>
                                </div>

                                {/* 16:00 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">16h00 - 16h40</span>
                                        <h4 className="text-base font-bold text-gray-900">Gestão patrimonial</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Júlio, Vagner e Magno</span>
                                    </div>
                                </div>

                                {/* Encerramento */}
                                <div className="relative">
                                    <div className="absolute -left-7.5 md:-left-8.5 bg-white p-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-green-600 md:w-28 shrink-0">16h40 - 17h00</span>
                                        <h4 className="text-base font-bold text-gray-900">Encerramento</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= CARD DIA 05 ================= */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm font-semibold text-slate-700">05 de março</h2>
                </div>

                <div className="px-6 py-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => setIsOpenDay5(!isOpenDay5)}
                    >
                        <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Programação Setor de Logística
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="hidden md:inline">09h00 – 18h00</span>
                            {isOpenDay5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </div>
                    <p className="md:hidden text-xs text-gray-500 mt-1">09h00 – 18h00</p>

                    {isOpenDay5 && (
                        <div className="mt-5 pt-6 border-t border-gray-100 relative">
                            <div className="absolute left-2.5 md:left-3 top-8 bottom-0 w-0.5 bg-gray-100"></div>

                            <div className="relative pl-8 md:pl-10 space-y-8 pb-4">

                                {/* 09:00 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-blue-600 md:w-28 shrink-0">09h00 - 09h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Abertura</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Tc Dantas e Tc Guimarães</span>
                                    </div>
                                </div>

                                {/* 09:30 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">09h30 - 10h10</span>
                                        <h4 className="text-base font-bold text-gray-900">SISGE, uma ferramenta para a gestão processual</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Leandro Theotonio e Brunno</span>
                                    </div>
                                </div>

                                {/* 10:10 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">10h10 - 12h00</span>
                                        <h4 className="text-base font-bold text-gray-900">Processo de pagamento de diárias e emissão de passagens aéreas (Recursos FNSP)</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Marckeson Noronha e Alessandro Ribeiro</span>
                                    </div>
                                </div>

                                {/* Intervalo Almoço */}
                                <div className="relative">
                                    <div className="absolute -left-8 md:-left-9 top-0 bg-white p-1">
                                        <Utensils className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col md:flex-row md:gap-4 md:items-center">
                                        <span className="text-sm font-bold text-gray-500 md:w-28 shrink-0">12h00 - 14h00</span>
                                        <h4 className="text-sm font-bold text-gray-700">Intervalo Almoço</h4>
                                    </div>
                                </div>

                                {/* 14:00 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">14h00 - 14h30</span>
                                        <h4 className="text-base font-bold text-gray-900">Abertura da Tarde</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Tc Dantas e Tc Guimarães</span>
                                    </div>
                                </div>

                                {/* 14:30 */}
                                <div className="relative">
                                    <div className="absolute -left-7 md:-left-8 top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-gray-700 md:w-28 shrink-0">14h30 - 15h10</span>
                                        <h4 className="text-base font-bold text-gray-900">SISGE, uma ferramenta para a gestão processual</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Leandro Theotonio e Brunno</span>
                                    </div>
                                </div>

                                {/* Encerramento */}
                                <div className="relative">
                                    <div className="absolute -left-7.5 md:-left-8.5 bg-white p-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-1">
                                        <span className="text-sm font-bold text-green-600 md:w-28 shrink-0">15h10 - 18h00</span>
                                        <h4 className="text-base font-bold text-gray-900">Processo de pagamento de diárias e emissão de passagens aéreas (Recursos FNSP)</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 md:ml-32">
                                        <Users className="w-4 h-4" />
                                        <span>Marckeson Noronha e Alessandro Ribeiro</span>
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
