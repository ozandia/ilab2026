import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { CheckCircle2, Trophy, TrendingUp, Loader2 } from "lucide-react";

// ÔöÇÔöÇ Types ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
interface CompanyData {
    name: string;
    description?: string;
    votes: number;
    disabled: boolean;
}

type Phase = "loading" | "voting" | "submitting" | "done";

// ÔöÇÔöÇ Constants ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const MAX_SELECTIONS = 8;
const API_BASE = "/api/poll";

// ÔöÇÔöÇ ProgressBar ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const ProgressBar = memo(function ProgressBar({ value, max }: { value: number; max: number }) {
    const pct = Math.round((value / max) * 100);
    return (
        <div
            className="poll-progress-track"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`${value} de ${max} empresas selecionadas`}
        >
            <div className="poll-progress-fill" style={{ width: `${pct}%` }} />
        </div>
    );
});

// ÔöÇÔöÇ CompanyCard ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
interface CompanyCardProps {
    company: CompanyData;
    selected: boolean;
    blocked: boolean;
    onToggle: (name: string) => void;
}

const CompanyCard = memo(function CompanyCard({ company, selected, blocked, onToggle }: CompanyCardProps) {
    const isDisabled = company.disabled || (blocked && !selected);

    const handleClick = useCallback(() => {
        if (!isDisabled) onToggle(company.name);
    }, [isDisabled, onToggle, company.name]);

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isDisabled}
            aria-pressed={selected}
            aria-label={`${company.name}${company.disabled ? " ÔÇö vagas esgotadas" : ""}`}
            className={`poll-card${selected ? " poll-card--selected" : ""}${isDisabled ? " poll-card--disabled" : ""}`}
        >
            <span className="poll-card-name">{company.name}</span>
            {company.description && <span className="poll-card-desc">{company.description}</span>}
            {selected && <CheckCircle2 className="poll-card-check" aria-hidden="true" />}
            {company.disabled && <span className="poll-card-full-badge">Esgotado</span>}
        </button>
    );
});

// ÔöÇÔöÇ RankingBar ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
interface RankingBarProps {
    company: CompanyData;
    rank: number;
    maxVotes: number;
}

const RankingBar = memo(function RankingBar({ company, rank, maxVotes }: RankingBarProps) {
    const pct = maxVotes > 0 ? Math.round((company.votes / maxVotes) * 100) : 0;
    const medals = ["­ƒÑç", "­ƒÑê", "­ƒÑë"];

    return (
        <div className="poll-rank-row">
            <span className="poll-rank-num" aria-hidden="true">{medals[rank] ?? `#${rank + 1}`}</span>
            <div className="poll-rank-info">
                <div className="poll-rank-header">
                    <span className="poll-rank-name">{company.name}</span>
                    <span className="poll-rank-votes">{company.votes} votos</span>
                </div>
                <div className="poll-rank-track">
                    <div
                        className="poll-rank-fill"
                        style={{ width: `${pct}%`, animationDelay: `${rank * 80}ms` }}
                    />
                </div>
            </div>
        </div>
    );
});

// ÔöÇÔöÇ SecurityDayPoll ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
export function SecurityDayPoll() {
    const [companies, setCompanies] = useState<CompanyData[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [phase, setPhase] = useState<Phase>("loading");
    const [error, setError] = useState<string | null>(null);
    const [topEight, setTopEight] = useState<CompanyData[]>([]);

    // Fetch vote state on mount
    useEffect(() => {
        fetch(API_BASE)
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data: { companies: CompanyData[] }) => {
                setCompanies(data.companies);
                setPhase("voting");
            })
            .catch(() => {
                setError("N├úo foi poss├¡vel carregar a enquete. Tente recarregar a p├ígina.");
                setPhase("voting");
            });
    }, []);

    // Memoized computed values
    const isMaxReached = useMemo(() => selected.length >= MAX_SELECTIONS, [selected.length]);
    const maxVotes = useMemo(() => topEight[0]?.votes ?? 0, [topEight]);

    const toggle = useCallback((name: string) => {
        setSelected((prev) => {
            if (prev.includes(name)) return prev.filter((n) => n !== name);
            if (prev.length >= MAX_SELECTIONS) return prev; // hard front-end guard
            return [...prev, name];
        });
    }, []);

    // Auto-submit exactly when 8 are selected (only once, guarded by phase)
    useEffect(() => {
        if (selected.length !== MAX_SELECTIONS || phase !== "voting") return;

        setPhase("submitting");
        setError(null);

        fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companies: selected }),
        })
            .then((r) => r.json())
            .then((data: { error?: string; companies?: CompanyData[] }) => {
                if (data.error) {
                    setError(data.error);
                    setPhase("voting");
                    setSelected([]);
                    return;
                }
                const all = data.companies ?? [];
                setCompanies(all);

                // O(n log n) sort is fast for 31 items ÔÇö no further optimization needed
                const sorted = [...all].sort((a, b) => b.votes - a.votes).slice(0, MAX_SELECTIONS);
                setTopEight(sorted);
                setPhase("done");
            })
            .catch(() => {
                setError("Erro ao enviar votos. Verifique sua conex├úo e tente novamente.");
                setPhase("voting");
                setSelected([]);
            });
    }, [selected, phase]);

    // ÔöÇÔöÇ Loading ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    if (phase === "loading") {
        return (
            <div className="poll-loading">
                <Loader2 className="poll-loading-icon" aria-hidden="true" />
                <span>Carregando enqueteÔÇª</span>
            </div>
        );
    }

    // ÔöÇÔöÇ Dashboard ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    if (phase === "done") {
        return (
            <div className="poll-dashboard">
                <div className="poll-dashboard-header">
                    <div className="poll-dashboard-trophy" aria-hidden="true">
                        <Trophy className="poll-dashboard-trophy-icon" />
                    </div>
                    <div>
                        <h3 className="poll-dashboard-title">Obrigado pelo seu voto!</h3>
                        <p className="poll-dashboard-subtitle">As 8 empresas mais votadas para o Security Day</p>
                    </div>
                </div>

                <ol className="poll-ranking" aria-label="Ranking das empresas">
                    {topEight.map((company, i) => (
                        <li key={company.name}>
                            <RankingBar company={company} rank={i} maxVotes={maxVotes} />
                        </li>
                    ))}
                </ol>

                <div className="poll-dashboard-note">
                    <TrendingUp className="poll-note-icon" aria-hidden="true" />
                    <span>Ranking atualizado em tempo real com os votos de todos os participantes</span>
                </div>
            </div>
        );
    }

    // ÔöÇÔöÇ Voting ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    const isSubmitting = phase === "submitting";

    return (
        <div className="poll-container" aria-busy={isSubmitting}>
            <div className="poll-counter-bar">
                <div className="poll-counter-text" aria-atomic="true">
                    <span className="poll-counter-num">{selected.length}</span>
                    <span className="poll-counter-sep" aria-hidden="true">/</span>
                    <span className="poll-counter-max">{MAX_SELECTIONS}</span>
                    <span className="poll-counter-label">empresas selecionadas</span>
                </div>
                {isSubmitting && (
                    <div className="poll-submitting" role="status">
                        <Loader2 className="poll-submitting-icon" aria-hidden="true" />
                        <span>RegistrandoÔÇª</span>
                    </div>
                )}
            </div>

            <ProgressBar value={selected.length} max={MAX_SELECTIONS} />

            {error && (
                <div className="poll-error" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}

            <div
                className="poll-grid"
                role="group"
                aria-label={`Selecione ${MAX_SELECTIONS} empresas para o Security Day`}
            >
                {companies.map((company) => (
                    <CompanyCard
                        key={company.name}
                        company={company}
                        selected={selected.includes(company.name)}
                        blocked={isMaxReached || isSubmitting}
                        onToggle={toggle}
                    />
                ))}
            </div>

            <p className="poll-hint" aria-live="polite">
                {isMaxReached
                    ? "Ô£à Sele├º├úo completa! Registrando seus votosÔÇª"
                    : `Selecione mais ${MAX_SELECTIONS - selected.length} empresa${MAX_SELECTIONS - selected.length !== 1 ? "s" : ""}`}
            </p>
        </div>
    );
}
