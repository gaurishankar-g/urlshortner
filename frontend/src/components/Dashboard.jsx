import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Clipboard, ExternalLink, Link2, LogOut, RefreshCw, X } from "lucide-react";
import { API_URL } from "../services/axiosInstace";
import { logout } from "../services/user";
import { createUrl, getAllUrls, getAnalytics } from "../services/urls";

const getShortUrl = (shortId) => `${API_URL}/url/${shortId}`;
const inputClass = "w-full bg-transparent text-[#f4f1e9] outline-none placeholder:text-[#68758f]";

function Dashboard() {
    const [url, setUrl] = useState("");
    const [urls, setUrls] = useState([]);
    const [selected, setSelected] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadUrls = useCallback(async () => {
        try {
            const result = await getAllUrls();
            if (!result.success) throw new Error(result.error || "Unable to load links.");
            setUrls(result.data);
        } catch {
            setError("Could not load your links. Is the API server running?");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadUrls(); }, [loadUrls]);

    const totalClicks = useMemo(() => urls.reduce((total, item) => total + item.visitHistory.length, 0), [urls]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setMessage("");
        setSubmitting(true);
        try {
            const result = await createUrl(url.trim());
            if (!result.success) throw new Error(result.error || "Unable to create a short link.");
            setUrl("");
            setMessage(`Your short link is ready: ${result.message.replace("Short id ", "")}`);
            await loadUrls();
        } catch (submitError) {
            setError(submitError.message || "Unable to create a short link.");
        } finally {
            setSubmitting(false);
        }
    }

    async function showAnalytics(item) {
        setSelected(item);
        setAnalytics(null);
        try {
            const result = await getAnalytics(item.shortId);
            if (!result.success) throw new Error(result.error || "Analytics are unavailable.");
            setAnalytics(result.data);
        } catch {
            setError("Analytics are temporarily unavailable.");
        }
    }

    async function copyLink(shortId) {
        await navigator.clipboard.writeText(getShortUrl(shortId));
        setMessage("Short link copied to your clipboard.");
    }

    async function handleLogout() {
        try {
            await logout();
        } catch {
            setError("Unable to log out. Please try again.");
            return;
        }

        window.location.replace("/login");
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_85%_10%,#24304e_0,#0c1222_35rem)] px-6 pb-20 font-sans text-[#f4f1e9] sm:px-12">
            <nav className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#293248] px-6 py-5 sm:px-12">
                <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between">
                    <a className="text-[22px] font-extrabold tracking-[-.06em]" href="/"><span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-lg bg-[#d3f36b] text-[#101a2d]"><ArrowUpRight size={17} strokeWidth={3} /></span>mylinkly<span className="text-[#d3f36b]">.</span></a>
                    <div className="flex items-center gap-3 sm:gap-5"><span className="hidden font-mono text-[11px] text-[#8d99b2] sm:inline">Simple links. Better reach.</span><button className="flex items-center gap-2 rounded-md border border-[#3a4660] px-3.5 py-2 text-xs text-[#c6cfdf] hover:border-[#d3f36b] hover:text-[#d3f36b]" onClick={handleLogout}><LogOut size={14} /> <span className="hidden sm:inline">Log out</span></button></div>
                </div>
            </nav>
            <section className="mx-auto max-w-[1100px] py-20 sm:py-24">
                <div className="font-mono text-[11px] uppercase tracking-[.13em] text-[#8d99b2]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d3f36b] shadow-[0_0_16px_#d3f36b]" />Your link command center</div>
                <h1 className="mt-5 max-w-3xl text-6xl font-extrabold leading-[.94] tracking-[-.08em] sm:text-[100px]">Make every link<br /><em className="text-[#d3f36b] not-italic">count.</em></h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#9da8bd]">Turn long, forgettable URLs into links people can actually remember. Share faster, track smarter.</p>
                <form className="mt-10 flex max-w-3xl flex-col gap-2 rounded-xl border border-[#39435a] bg-[#141d32] p-2 shadow-2xl shadow-black/30 sm:flex-row" onSubmit={handleSubmit}>
                    <div className="flex min-h-11 flex-1 items-center gap-3 px-3"><Link2 className="shrink-0 text-[#d3f36b]" size={20} /><input className={inputClass} type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Paste your long URL here..." required aria-label="Long URL" /></div>
                    <button type="submit" disabled={submitting} className="flex items-center justify-center gap-3 rounded-lg bg-[#d3f36b] px-6 py-3.5 font-extrabold text-[#101a2d] disabled:cursor-wait disabled:opacity-60">{submitting ? "Creating..." : "Shorten link"} <ArrowRight size={18} /></button>
                </form>
                {message && <p className="mt-4 text-sm text-[#d3f36b]">{message}</p>}
                {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
            </section>
            <section className="mx-auto flex max-w-[1100px] gap-7 border-y border-[#293248] py-7 sm:gap-20"><div><strong className="text-3xl">{urls.length}</strong><span className="ml-2 font-mono text-[11px] uppercase text-[#8d99b2]">Links created</span></div><div><strong className="text-3xl">{totalClicks}</strong><span className="ml-2 font-mono text-[11px] uppercase text-[#8d99b2]">Total clicks</span></div><div><strong className="text-3xl">∞</strong><span className="ml-2 font-mono text-[11px] uppercase text-[#8d99b2]">Possibilities</span></div></section>
            <section className="mx-auto grid max-w-[1100px] gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#293248] bg-[#111a2d]/70 p-5">
                    <span className="font-mono text-xs text-[#d3f36b]">01 / CREATE</span>
                    <h3 className="mt-3 font-bold">Paste a long URL</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#8d99b2]">The API generates a unique short ID and stores the original destination.</p>
                </div>
                <div className="rounded-xl border border-[#293248] bg-[#111a2d]/70 p-5">
                    <span className="font-mono text-xs text-[#d3f36b]">02 / SHARE</span>
                    <h3 className="mt-3 font-bold">Share the short link</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#8d99b2]">Anyone can use the short URL. The server redirects them to the original page.</p>
                </div>
                <div className="rounded-xl border border-[#293248] bg-[#111a2d]/70 p-5">
                    <span className="font-mono text-xs text-[#d3f36b]">03 / LEARN</span>
                    <h3 className="mt-3 font-bold">Inspect analytics</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#8d99b2]">Every redirect records a visit, which you can inspect from the analytics button.</p>
                </div>
            </section>
            <section className="mx-auto max-w-[1100px] pt-20">
                <div className="mb-6 flex items-end justify-between"><div><p className="font-mono text-[11px] uppercase tracking-[.13em] text-[#8d99b2]">Your workspace</p><h2 className="mt-2 text-3xl font-bold tracking-[-.05em]">Recent links</h2></div><button className="flex items-center gap-2 font-mono text-[11px] text-[#aab4ca] hover:text-[#d3f36b]" onClick={loadUrls}><RefreshCw size={14} /> Refresh</button></div>
                <div className="overflow-hidden rounded-xl border border-[#293248] bg-[#111a2d]">
                    {loading ? <div className="flex min-h-48 items-center justify-center text-sm text-[#8490a8]">Loading your links...</div> : urls.length === 0 ? <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-sm text-[#8490a8]"><Link2 size={28} className="text-[#d3f36b]" /><strong className="text-[#f4f1e9]">Your first short link is waiting.</strong><span>Paste a URL above to get started.</span></div> : urls.map((item) => <article className="flex items-center gap-3 border-b border-[#293248] p-4 last:border-0 sm:gap-4 sm:p-5" key={item._id}><div className="hidden h-10 w-10 place-items-center rounded-lg bg-[#253052] text-[#d3f36b] sm:grid"><Link2 size={19} /></div><div className="min-w-0 flex-1"><a className="flex items-center gap-2 truncate font-mono text-xs text-[#d3f36b]" href={getShortUrl(item.shortId)} target="_blank" rel="noreferrer">{window.location.host}/url/{item.shortId} <ExternalLink size={13} className="shrink-0" /></a><span className="block truncate text-xs text-[#8d99b2]">{item.redirectUrl}</span></div><div className="flex min-w-10 flex-col text-right"><b>{item.visitHistory.length}</b><span className="font-mono text-[10px] text-[#8d99b2]">clicks</span></div><button className="h-8 w-9 rounded-md border border-[#3a4660] text-xs text-[#aeb8cc] hover:border-[#d3f36b] hover:text-[#d3f36b]" onClick={() => copyLink(item.shortId)} aria-label="Copy link"><Clipboard size={14} className="mx-auto" /></button><button className="flex items-center gap-1.5 rounded-md border border-[#3a4660] px-2 py-2 text-[11px] text-[#aeb8cc] hover:border-[#d3f36b] hover:text-[#d3f36b]" onClick={() => showAnalytics(item)}><BarChart3 size={14} /> <span className="hidden sm:inline">Analytics</span></button></article>)}
                </div>
            </section>
            {selected && <div className="fixed inset-0 grid place-items-center bg-[#060a14bb] p-5" onClick={() => setSelected(null)}><section className="relative w-full max-w-sm rounded-2xl border border-[#3e4b69] bg-[#141d32] p-9" onClick={(event) => event.stopPropagation()}><button className="absolute right-4 top-3 text-[#aab4ca]" onClick={() => setSelected(null)} aria-label="Close analytics"><X size={20} /></button><p className="font-mono text-[11px] uppercase tracking-[.13em] text-[#8d99b2]">Link analytics</p><h2 className="mt-2 text-3xl font-bold">{selected.shortId}</h2>{analytics ? <div className="mt-6 flex items-baseline gap-2"><strong className="text-6xl text-[#d3f36b]">{analytics.totalClicks}</strong><span className="text-[#8d99b2]">total clicks</span></div> : <p className="mt-5 text-[#8d99b2]">Loading analytics...</p>}</section></div>}
        </main>
    );
}

export default Dashboard;
