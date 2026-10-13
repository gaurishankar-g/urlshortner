import { ArrowUpRight, LogIn, UserPlus, Zap } from "lucide-react";

function Navbar({ authAction }) {
    return (
        <nav className="relative left-1/2 w-screen -translate-x-1/2 border-b border-white/10 bg-[#0c1222]/75 px-5 py-4 backdrop-blur-xl sm:px-10">
            <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between">
                <a className="group flex items-center gap-2.5 text-[21px] font-extrabold tracking-[-.06em]" href="/">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d3f36b] text-[#101a2d] shadow-[0_0_24px_#d3f36b33] transition-transform group-hover:-rotate-6">
                        <ArrowUpRight size={19} strokeWidth={3} />
                    </span>
                    mylinkly<span className="text-[#d3f36b]">.</span>
                </a>

                {authAction ? (
                    <a
                        className="flex items-center gap-2 rounded-full border border-[#3a4660] px-3.5 py-2 text-xs text-[#c6cfdf] transition hover:border-[#d3f36b] hover:text-[#d3f36b]"
                        href={authAction.href}
                    >
                        {authAction.type === "login" ? <LogIn size={14} /> : <UserPlus size={14} />}
                        <span className="hidden sm:inline">{authAction.label}</span>
                    </a>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-2 rounded-full border border-[#293248] bg-[#111a2d]/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[.08em] text-[#8d99b2] sm:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d3f36b] shadow-[0_0_10px_#d3f36b]" />
                            Private workspace
                        </div>
                        <a className="flex items-center gap-2 rounded-full bg-[#d3f36b] px-4 py-2.5 text-xs font-bold text-[#101a2d] transition hover:bg-[#e0ff83]" href="#create-link">
                            <Zap size={14} fill="currentColor" />
                            <span className="hidden sm:inline">Create link</span>
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
