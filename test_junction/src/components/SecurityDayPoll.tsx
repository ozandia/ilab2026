import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { CheckCircle2, Trophy, TrendingUp, Building2, Loader2, Users, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CompanyData {
    name: string;
    votes: number;
    disabled: boolean;
}

type Phase = "group-select" | "loading" | "voting" | "submitting" | "done";
type Group = 1 | 2;

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_SELECTIONS = 8;
const API_BASE = "/api/poll";

const GROUPS = {
    1: { label: "Grupo 1", gtis: ["CONSESP", "CNCG"], color: "#e1ad31" },
    2: { label: "Grupo 2", gtis: ["CONCPC", "CONDPCI"], color: "#2b7fff" },
} as const;

// ── ProgressBar ───────────────────────────────────────────────────────────────
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

// ── CompanyCard ───────────────────────────────────────────────────────────────
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
            aria-label={`${company.name}${company.disabled ? " — vagas esgotadas" : ""}`}
            className={`poll-card${selected ? " poll-card--selected" : ""}${isDisabled ? " poll-card--disabled" : ""}`}
        >
            <Building2 className="poll-card-icon" aria-hidden="true" />
            <span className="poll-card-name">{company.name}</span>
            {selected && <CheckCircle2 className="poll-card-check" aria-hidden="true" />}
            {company.disabled && <span className="poll-card-full-badge">Esgotado</span>}
        </button>
    );
});

// ── RankingBar ────────────────────────────────────────────────────────────────
interface RankingBarProps {
    company: CompanyData;
    rank: number;
    maxVotes: number;
}

const RankingBar = memo(function RankingBar({ company, rank, maxVotes }: RankingBarProps) {
    const pct = maxVotes > 0 ? Math.round((company.votes / maxVotes) * 100) : 0;
    const medals = ["🥇", "🥈", "🥉"];

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

// ── GroupSelector ─────────────────────────────────────────────────────────────
interface GroupSelectorProps {
    onSelect: (group: Group) => void;
}

const GroupSelector = memo(function GroupSelector({ onSelect }: GroupSelectorProps) {
    return (
        <div className="poll-group-selector">
            <div className="poll-group-header">
                <Users className="poll-group-icon" aria-hidden="true" />
                <div>
                    <h3 className="poll-group-title">A qual grupo você pertence?</h3>
                    <p className="poll-group-subtitle">Selecione seu GTI antes de votar</p>
                </div>
            </div>

            <div className="poll-group-cards">
                {([1, 2] as Group[]).map((g) => {
                    const group = GROUPS[g];
                    return (
                        <button
                            key={g}
                            type="button"
                            onClick={() => onSelect(g)}
                            className="poll-group-card"
                            aria-label={`Selecionar ${group.label}: ${group.gtis.join(" e ")}`}
                            style={{ "--group-color": group.color } as React.CSSProperties}
                        >
                            <div className="poll-group-card-accent" />
                            <div className="poll-group-card-body">
                                <div className="poll-group-card-label">{group.label}</div>
                                <div className="poll-group-card-gtis">
                                    {group.gtis.map((gti) => (
                                        <span key={gti} className="poll-group-tag">{gti}</span>
                                    ))}
                                </div>
                            </div>
                            <ChevronRight className="poll-group-chevron" aria-hidden="true" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

// ── SecurityDayPoll ───────────────────────────────────────────────────────────
export function SecurityDayPoll() {
    const [group, setGroup] = useState<Group | null>(null);
    const [companies, setCompanies] = useState<CompanyData[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [phase, setPhase] = useState<Phase>("group-select");
    const [error, setError] = useState<string | null>(null);
    const [topEight, setTopEight] = useState<CompanyData[]>([]);

    const apiUrl = useCallback((g: Group) => `${API_BASE}?group=${g}`, []);

    // Load companies after group is selected
    useEffect(() => {
        if (!group) return;
        setPhase("loading");
        fetch(apiUrl(group))
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data: { companies: CompanyData[] }) => {
                setCompanies(data.companies);
                setPhase("voting");
            })
            .catch(() => {
                setError("Não foi possível carregar a enquete. Tente recarregar a página.");
                setPhase("voting");
            });
    }, [group, apiUrl]);

    const isMaxReached = useMemo(() => selected.length >= MAX_SELECTIONS, [selected.length]);
    const maxVotes = useMemo(() => topEight[0]?.votes ?? 0, [topEight]);

    const toggle = useCallback((name: string) => {
        setSelected((prev) => {
            if (prev.includes(name)) return prev.filter((n) => n !== name);
            if (prev.length >= MAX_SELECTIONS) return prev;
            return [...prev, name];
        });
    }, []);

    // Auto-submit when 8 selected
    useEffect(() => {
        if (selected.length !== MAX_SELECTIONS || phase !== "voting" || !group) return;

        setPhase("submitting");
        setError(null);

        fetch(apiUrl(group), {
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
                const sorted = [...all].sort((a, b) => b.votes - a.votes).slice(0, MAX_SELECTIONS);
                setTopEight(sorted);
                setPhase("done");
            })
            .catch(() => {
                setError("Erro ao enviar votos. Verifique sua conexão e tente novamente.");
                setPhase("voting");
                setSelected([]);
            });
    }, [selected, phase, group, apiUrl]);

    // ── Group select ──────────────────────────────────────────────────────────
    if (phase === "group-select") {
        return <GroupSelector onSelect={(g) => { setGroup(g); }} />;
    }

    // ── Loading ───────────────────────────────────────────────────────────────
    if (phase === "loading") {
        return (
            <div className="poll-loading">
                <Loader2 className="poll-loading-icon" aria-hidden="true" />
                <span>Carregando enquete…</span>
            </div>
        );
    }

    // ── Dashboard ─────────────────────────────────────────────────────────────
    if (phase === "done") {
        const groupInfo = GROUPS[group!];
        return (
            <div className="poll-dashboard">
                <div className="poll-dashboard-header">
                    <div className="poll-dashboard-trophy" aria-hidden="true">
                        <Trophy className="poll-dashboard-trophy-icon" />
                    </div>
                    <div>
                        <h3 className="poll-dashboard-title">Obrigado pelo seu voto!</h3>
                        <p className="poll-dashboard-subtitle">
                            As 8 empresas mais votadas — <strong>{groupInfo.label}</strong> ({groupInfo.gtis.join(" · ")})
                        </p>
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

    // ── Voting ────────────────────────────────────────────────────────────────
    const isSubmitting = phase === "submitting";
    const groupInfo = GROUPS[group!];

    return (
        <div className="poll-container" aria-busy={isSubmitting}>
            {/* Group badge */}
            <div className="poll-group-badge" style={{ "--group-color": groupInfo.color } as React.CSSProperties}>
                <span className="poll-group-badge-label">{groupInfo.label}</span>
                {groupInfo.gtis.map((gti) => (
                    <span key={gti} className="poll-group-tag poll-group-tag--sm">{gti}</span>
                ))}
                <button
                    type="button"
                    className="poll-group-badge-change"
                    onClick={() => { setGroup(null); setSelected([]); setCompanies([]); setPhase("group-select"); }}
                >
                    Trocar grupo
                </button>
            </div>

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
                        <span>Registrando…</span>
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
                    ? "✅ Seleção completa! Registrando seus votos…"
                    : `Selecione mais ${MAX_SELECTIONS - selected.length} empresa${MAX_SELECTIONS - selected.length !== 1 ? "s" : ""}`}
            </p>
        </div>
    );
}
