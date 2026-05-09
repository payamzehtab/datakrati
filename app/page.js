"use client";

import React, { useMemo, useState } from "react";
const Search = () => <span>🔎</span>;
const BarChart3 = () => <span>📊</span>;
const Users = () => <span>👥</span>;
const Vote = () => <span>🗳️</span>;
const Landmark = () => <span>🏛️</span>;
const Filter = () => <span>⚙️</span>;
const MessageSquareText = () => <span>💬</span>;
const ExternalLink = () => <span>↗️</span>;
const AlertCircle = () => <span>⚠️</span>;
const CheckCircle2 = () => <span>✅</span>;
const MinusCircle = () => <span>➖</span>;
const HelpCircle = () => <span>❓</span>;


const Card = (props) => {
  return <div className={props.className || ""}>{props.children}</div>;
};

const CardContent = (props) => {
  return <div className={props.className || ""}>{props.children}</div>;
};

const Button = (props) => {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors";

  const styles = props.variant === "outline"
    ? "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
    : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <button className={`${base} ${styles} ${props.className || ""}`}>
      {props.children}
    </button>
  );
};

const mockVotes = [
  { party: "S", yes: 84, no: 0, abstain: 2, absent: 21 },
  { party: "M", yes: 0, no: 66, abstain: 1, absent: 2 },
  { party: "SD", yes: 0, no: 69, abstain: 0, absent: 3 },
  { party: "V", yes: 23, no: 0, abstain: 0, absent: 1 },
  { party: "C", yes: 0, no: 21, abstain: 0, absent: 3 },
  { party: "KD", yes: 0, no: 18, abstain: 0, absent: 1 },
  { party: "MP", yes: 16, no: 0, abstain: 0, absent: 2 },
  { party: "L", yes: 0, no: 15, abstain: 0, absent: 1 },
];

const mainTabs = [
  { label: "Översikt", active: true },
  { label: "Senaste mandatperioden" },
  { label: "Löfteskollen" },
  { label: "Dokument" },
  { label: "Voteringar" },
  { label: "Anföranden" },
  { label: "Ledamöter" },
  { label: "Partianalys" },
  { label: "Språkanalys" },
];

const pledgeChecks = [
  { party: "Exempelparti A", issue: "Klimatet", promise: "Uttryckt linje inför valet 2022", outcome: "Samma linje", evidence: "Röstningar och dokument ligger nära tidigare formulerad hållning." },
  { party: "Exempelparti B", issue: "Skola", promise: "Uttryckt linje inför valet 2022", outcome: "Delvis förändrad", evidence: "Grundlinjen kvarstår, men vissa voteringar eller formuleringar pekar på justering." },
  { party: "Exempelparti C", issue: "Migration", promise: "Uttryckt linje inför valet 2022", outcome: "Tydligt ändrad", evidence: "Nuvarande röstning/dokument skiljer sig tydligt från tidigare uttalad linje." },
];

const aiSourceRules = [
  { title: "Voteringsdata", text: "Svar får beskriva hur partier och ledamöter faktiskt har röstat i riksdagen." },
  { title: "Riksdagsdokument", text: "Svar får hänvisa till betänkanden, motioner, propositioner och protokoll." },
  { title: "Oberoende nyhetskällor", text: "Vid behov kan svaret kompletteras med partipolitiskt obundna nyhetskällor med tydlig källhänvisning." },
  { title: "Partiprogram för fördjupning", text: "För djupare förståelse av partiets ideologi och mål hänvisas användaren till respektive partis partiprogram." },
  { title: "Vallöften 2022", text: "I en fördjupad analys kan tidigare vallöften och valmanifest jämföras med röstningar och dokument under mandatperioden." },
];

const featureCards = [
  { title: "Senaste mandatperioden", text: "En snabbvy som bara söker i 2022–2026 och uppdateras löpande med nya voteringar, dokument och anföranden." },
  { title: "Dokumentanalys", text: "Sök motioner, betänkanden och protokoll. Sammanfatta vad dokumentet handlar om och vilka frågor som berörs." },
  { title: "Voteringar", text: "Visa hur partier och ledamöter röstat i enskilda frågor, över tid eller inom ett sakområde." },
  { title: "Anföranden", text: "Analysera vilka ledamöter som talat i olika ämnen och koppla tal till dokument och beslut." },
  { title: "Partianalys", text: "Jämför partiers röstningsmönster, samsyn och avvikelser i olika politiska områden." },
  { title: "Löfteskollen", text: "Jämför partiernas vallöften och program inför valet 2022 med hur de röstat och uttryckt sig under mandatperioden." },
  { title: "Språkanalys", text: "Undersök ord, begrepp och formuleringar i riksdagens dokument och debatter över tid." },
];

const electionIssues = [
  { name: "Sjukvården", share: "65%", description: "Vård, köer, regionernas ansvar och tillgång till behandling.", examples: "vårdplatser, primärvård, psykisk ohälsa" },
  { name: "Skola och utbildning", share: "56%", description: "Skolresultat, likvärdighet, lärare, ordning och styrning.", examples: "betyg, friskolor, lärarbrist" },
  { name: "Lag och ordning", share: "51%", description: "Brott, straff, polis, trygghet och rättsväsende.", examples: "gängkriminalitet, straffskalor, polisresurser" },
  { name: "Invandring/integration", share: "45%", description: "Migration, asyl, etablering, medborgarskap och integration.", examples: "asylpolitik, arbetsmarknad, språkkrav" },
  { name: "Äldreomsorg", share: "40%", description: "Omsorg, personal, kvalitet, boenden och stöd till äldre.", examples: "äldreboenden, hemtjänst, bemanning" },
  { name: "Jobb och arbetslöshet", share: "38%", description: "Sysselsättning, arbetsmarknad, arbetslöshet och kompetensförsörjning.", examples: "a-kassa, arbetsmarknadsåtgärder, utbildning" },
  { name: "Landets ekonomi", share: "37%", description: "Statsfinanser, inflation, hushållens ekonomi och tillväxt.", examples: "budget, räntor, skatter, stöd" },
  { name: "Försvaret", share: "35%", description: "Militärt försvar, totalförsvar, Nato och säkerhetspolitik.", examples: "beredskap, försvarsanslag, civilförsvar" },
  { name: "Klimatet", share: "35%", description: "Klimatpolitik, utsläpp, energiomställning och styrmedel.", examples: "utsläppsmål, drivmedel, energi" },
];

const topics = electionIssues.map((issue) => ({
  name: issue.name,
  count: issue.share,
  trend: "Följ 2022–2026 och jämför bakåt",
  agreement: "Valfråga 2026",
}));

const democracyLevels = [
  {
    name: "Riksdag",
    description: "Nationell politik, voteringar, partier och ledamöter i Sveriges riksdag.",
    examples: "lagstiftning, statsbudget, nationella reformer",
    active: true,
  },
  {
    name: "Region",
    description: "Regional politik med fokus på sjukvård, kollektivtrafik och regional utveckling.",
    examples: "vårdköer, regionbudget, kollektivtrafik",
  },
  {
    name: "Kommun",
    description: "Kommunal politik med beslut kring skola, äldreomsorg, stadsplanering och lokala frågor.",
    examples: "grundskola, äldreomsorg, bostadsplanering",
  },
];

const periods = [
  { label: "2022–2026", description: "Senaste mandatperioden", active: true },
  { label: "2018–2022", description: "Föregående mandatperiod" },
  { label: "2014–2018", description: "Historisk jämförelse" },
  { label: "2000–idag", description: "Maxläge för djupare analys" },
];

const members = [
  { name: "Anna Andersson", party: "S", district: "Stockholms län", alignment: "96%", absence: "4%" },
  { name: "Erik Eriksson", party: "M", district: "Västra Götaland", alignment: "98%", absence: "2%" },
  { name: "Sara Nilsson", party: "MP", district: "Skåne län", alignment: "91%", absence: "7%" },
];

function StatCard({ icon: Icon, title, value, sub }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200 bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{sub}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function VoteBar({ label, value, total, type }) {
  const width = `${Math.max(2, (value / total) * 100)}%`;
  const color = type === "yes" ? "bg-emerald-600" : type === "no" ? "bg-rose-600" : type === "abstain" ? "bg-amber-500" : "bg-slate-300";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width }} />
      </div>
    </div>
  );
}

function PartyRow({ row }) {
  const total = row.yes + row.no + row.abstain + row.absent;
  return (
    <div className="grid grid-cols-12 gap-3 items-center border-b border-slate-100 py-4 last:border-b-0">
      <div className="col-span-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{row.party}</div>
        </div>
      </div>
      <div className="col-span-10 grid grid-cols-4 gap-3">
        <VoteBar label="Ja" value={row.yes} total={total} type="yes" />
        <VoteBar label="Nej" value={row.no} total={total} type="no" />
        <VoteBar label="Avstår" value={row.abstain} total={total} type="abstain" />
        <VoteBar label="Frånvarande" value={row.absent} total={total} type="absent" />
      </div>
    </div>
  );
}

export default function DatakratiPrototype() {
  const [query, setQuery] = useState("Hur har partierna röstat i frågor om kärnkraft sedan 2022?");
  const totals = useMemo(() => {
    return mockVotes.reduce(
      (acc, row) => {
        acc.yes += row.yes;
        acc.no += row.no;
        acc.abstain += row.abstain;
        acc.absent += row.absent;
        return acc;
      },
      { yes: 0, no: 0, abstain: 0, absent: 0 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-900 p-2 text-white">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Datakrati</h1>
                  <p className="text-sm text-slate-500">Politisk data och transparens i Sverige.</p>
                </div>
              </div>
            </div>
            <nav className="flex flex-wrap gap-2">
              {mainTabs.map((tab) => (
                <Button
                  key={tab.label}
                  variant={tab.active ? "default" : "outline"}
                  className={`rounded-full ${tab.active ? "bg-slate-900" : ""}`}
                >
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8">
          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Första val</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">Välj politisk nivå först</h2>
                  <p className="mt-2 max-w-3xl text-sm text-slate-600">Användaren börjar med att välja mellan riksdag, region eller kommun. Därefter används samma upplägg med voteringar, dokument, ledamöter, analyser och AI-sammanfattningar för respektive nivå. Standardläget är aktuell mandatperiod.</p>
                </div>
                <Button className="rounded-full bg-slate-900">Utforska vald nivå</Button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {democracyLevels.map((level) => (
                  <div key={level.name} className={`rounded-3xl border p-5 ${level.active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xl font-semibold">{level.name}</p>
                      {level.active && (
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs">Aktiv</span>
                      )}
                    </div>
                    <p className={`mt-3 text-sm ${level.active ? "text-slate-200" : "text-slate-600"}`}>
                      {level.description}
                    </p>
                    <p className={`mt-3 text-xs ${level.active ? "text-slate-300" : "text-slate-500"}`}>
                      Exempel: {level.examples}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {periods.map((period) => (
                  <div key={period.label} className={`rounded-2xl border p-4 ${period.active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`}>
                    <p className="font-semibold">{period.label}</p>
                    <p className={`mt-1 text-sm ${period.active ? "text-slate-200" : "text-slate-500"}`}>{period.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Huvudområden</p>
                    <h3 className="text-xl font-semibold text-slate-900">Välj en av de viktigaste valfrågorna 2026</h3>
                    <p className="mt-1 text-sm text-slate-600">Varje område kan användas som filter för voteringar, dokument, anföranden, partier och ledamöter.</p>
                  </div>
                  <Button variant="outline" className="rounded-full gap-2"><Filter className="h-4 w-4" /> Ändra område</Button>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {electionIssues.map((issue, index) => (
                    <div key={issue.name} className={`rounded-2xl border p-4 ${index === 0 ? "border-slate-900 bg-white" : "border-slate-200 bg-white"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-slate-900">{issue.name}</p>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{issue.share}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{issue.description}</p>
                      <p className="mt-2 text-xs text-slate-500">Exempel: {issue.examples}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {featureCards.map((feature) => (
                  <div key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{feature.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-500">Exempelvy</p>
                    <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">Hur röstade riksdagen i en enskild fråga?</h2>
                    <p className="mt-3 max-w-2xl text-slate-600">Här visas en sammanfattning av en vald votering med partiernas röster, frånvaro och koppling till beslutsunderlaget.</p>
                  </div>
                  <Button variant="outline" className="rounded-full gap-2"><ExternalLink className="h-4 w-4" /> Källa</Button>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Betänkande: Energipolitikens inriktning</h3>
                      <p className="mt-1 text-sm text-slate-500">Riksmöte 2025/26 · Votering 124 · Område: Klimat & energi</p>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">Ja {totals.yes}</span>
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-800">Nej {totals.no}</span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Avstår {totals.abstain}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {mockVotes.map((row) => <PartyRow key={row.party} row={row} />)}
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-slate-700" />
                  <h2 className="text-lg font-semibold">Fråga datan</h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">Svaren ska beskriva vad som framgår av röstningar och dokument – inte avgöra vad partier “egentligen tycker”.</p>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <textarea value={query} onChange={(e) => setQuery(e.target.value)} className="h-28 w-full resize-none bg-transparent text-sm outline-none" />
                </div>
                <Button className="mt-3 w-full rounded-2xl bg-slate-900">Sammanfatta sakligt</Button>
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-700" />
                    <div>
                      <p className="font-medium text-slate-900">Viktig begränsning</p>
                      <p className="mt-1">AI-svaret redovisar endast vad som går att utläsa ur valda röstningar, dokument och eventuella källor. För djupare förståelse av partiernas egna motiv, ideologi och mål bör användaren läsa respektive partis partiprogram.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">Exempel på sakligt svar</p>
                  <p className="mt-2">I de voteringar som klassats som kärnkraftsrelaterade under perioden röstade M, KD, L och SD oftast för förslag som ökade eller underlättade kärnkraftsutbyggnad. S, V och MP röstade oftare emot sådana förslag. C varierade beroende på formulering.</p>
                  <p className="mt-2 text-xs text-slate-500">Källor som bör visas: voteringar, riksdagsdokument och vid behov partipolitiskt obundna nyhetskällor. Osäkerhet: ämnesklassificeringen bör granskas eftersom vissa voteringar gäller bredare energipolitiska paket.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertCircle className="h-5 w-5" />
                  <h2 className="font-semibold">Saklighetsprincip</h2>
                </div>
                <p className="mt-3 text-sm text-slate-600">Sidan bör inte säga vad ett parti “egentligen tycker”. Den bör visa hur partiet röstade, i vilka frågor och med vilka reservationer. AI-svar ska därför aldrig märkas som bekräftade slutsatser, utan som sammanfattningar av tillgänglig data.</p>
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-4">
          <StatCard icon={Vote} title="Standardperiod" value="2022–2026" sub="Uppdateras löpande med ny data" />
          <StatCard icon={Users} title="Ledamöter" value="349" sub="Aktiva mandat i riksdagen" />
          <StatCard icon={BarChart3} title="Jämförelser" value="2–3" sub="Mandatperioder bakåt som standard" />
          <StatCard icon={Search} title="Datagräns" value="2000+" sub="Äldre data kan väljas bort för snabbare sida" />
        </section>

        <section className="mt-8">
          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Fördjupad analys</p>
                  <h2 className="text-xl font-semibold">Löfteskollen: vallöften 2022 jämfört med faktisk linje 2022–2026</h2>
                  <p className="mt-2 max-w-3xl text-sm text-slate-600">Den här modulen skulle jämföra partiernas valmanifest, partiprogram och tydliga vallöften inför valet 2022 med röstningar, motioner, anföranden och senare dokument under mandatperioden.</p>
                </div>
                <Button variant="outline" className="rounded-full gap-2"><ExternalLink className="h-4 w-4" /> Visa källor</Button>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-700" />
                  <div>
                    <p className="font-medium text-slate-900">Tydlig tolkningsvarning</p>
                    <p className="mt-1">Bedömningen “samma linje”, “delvis förändrad” eller “tydligt ändrad” är en AI-stödd jämförelse, inte ett objektivt facit. Varje bedömning måste visa vilka vallöften, partiprogram, riksdagsdokument, voteringar och eventuella oberoende nyhetskällor som använts.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pledgeChecks.map((item) => (
                  <div key={`${item.party}-${item.issue}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{item.party}</p>
                        <p className="text-sm text-slate-500">Område: {item.issue}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-700">{item.outcome}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600"><span className="font-medium text-slate-800">2022:</span> {item.promise}</p>
                    <p className="mt-2 text-sm text-slate-600"><span className="font-medium text-slate-800">Jämförelse:</span> {item.evidence}</p>
                    <p className="mt-3 text-xs text-slate-500">Källor: valmanifest/partiprogram 2022, voteringar 2022–2026, riksdagsdokument och vid behov oberoende nyhetskällor.</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="font-medium text-slate-900">Samma linje</p>
                  <p className="mt-1 text-sm text-slate-600">Nuvarande agerande ligger nära tidigare vallöfte eller programformulering.</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="font-medium text-slate-900">Delvis förändrad</p>
                  <p className="mt-1 text-sm text-slate-600">Grundlinjen finns kvar, men konkreta förslag eller prioriteringar har ändrats.</p>
                </div>
                <div className="rounded-2xl bg-rose-50 p-4">
                  <p className="font-medium text-slate-900">Tydligt ändrad</p>
                  <p className="mt-1 text-sm text-slate-600">Nuvarande röstning eller formulering avviker tydligt från tidigare uttalad linje.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Politiska huvudområden</h2>
                  <p className="mt-1 text-sm text-slate-500">Sök och jämför riksdagsdata utifrån de viktigaste valfrågorna 2026.</p>
                </div>
                <Button variant="outline" className="rounded-full gap-2"><Filter className="h-4 w-4" /> Filtrera</Button>
              </div>
              <div className="mt-5 space-y-3">
                {topics.map((topic) => (
                  <div key={topic.name} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{topic.name}</p>
                        <p className="text-sm text-slate-500">Väljarandel: {topic.count} · {topic.trend}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{topic.agreement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Ledamotsvy</h2>
              <p className="mt-1 text-sm text-slate-500">Visa rösthistorik, närvaro och avvikelser från partilinjen.</p>
              <div className="mt-5 space-y-3">
                {members.map((member) => (
                  <div key={member.name} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{member.name} <span className="text-slate-400">({member.party})</span></p>
                        <p className="text-sm text-slate-500">{member.district}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p><span className="text-slate-500">Partilinje:</span> {member.alignment}</p>
                        <p><span className="text-slate-500">Frånvaro:</span> {member.absence}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Så bör varje AI-svar märkas upp</h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">AI-svaren bör aldrig presenteras som bekräftade politiska slutsatser. De ska visas som källbaserade sammanfattningar med tydlig begränsning.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-amber-50 p-4">
                  <AlertCircle className="h-5 w-5 text-amber-700" />
                  <p className="mt-2 font-medium">Varningstext</p>
                  <p className="mt-1 text-sm text-slate-600">Svaret redovisar endast vad som framgår av valda källor.</p>
                </div>
                <div className="rounded-2xl bg-blue-50 p-4">
                  <ExternalLink className="h-5 w-5 text-blue-700" />
                  <p className="mt-2 font-medium">Källhänvisning</p>
                  <p className="mt-1 text-sm text-slate-600">Länka till voteringar, dokument och nyhetskällor när sådana används.</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <MinusCircle className="h-5 w-5 text-slate-700" />
                  <p className="mt-2 font-medium">Ingen motivtolkning</p>
                  <p className="mt-1 text-sm text-slate-600">Sidan ska inte påstå varför ett parti röstade på ett visst sätt.</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <HelpCircle className="h-5 w-5 text-emerald-700" />
                  <p className="mt-2 font-medium">Fördjupning</p>
                  <p className="mt-1 text-sm text-slate-600">Hänvisa till partiprogram eller oberoende nyhetskällor.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                {aiSourceRules.map((rule) => (
                  <div key={rule.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{rule.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{rule.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
