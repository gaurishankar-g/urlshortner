import { useState } from "react";
import { ArrowRight, ArrowUpRight, UserPlus } from "lucide-react";
import { login } from "../services/user";

function Login() {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setMessageType("");
        const nextErrors = {};

        if (!email.trim()) {
            nextErrors.email = "Email is required.";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() && !emailPattern.test(email.trim())) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            nextErrors.password = "Password is required.";
        }

        setFieldErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setLoading(true);

        try {
            const response = await login({ email: email.trim().toLowerCase(), password });
            setMessage(response?.message || "Login successful.");
            setMessageType("text-lime-300");
            window.location.replace("/");
        } catch (error) {
            setMessage(error.response?.data?.error || error.response?.data?.message || error.message || "Login failed. Please try again.");
            setMessageType("text-red-300");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_85%_10%,#24304e_0,#0c1222_35rem)] px-6 font-sans text-[#f4f1e9] sm:px-12">
            <nav className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#293248] px-6 py-5 sm:px-12">
                <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between">
                    <a className="text-[22px] font-extrabold tracking-[-.06em]" href="/"><span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-lg bg-[#d3f36b] text-[#101a2d]"><ArrowUpRight size={17} strokeWidth={3} /></span>mylinkly<span className="text-[#d3f36b]">.</span></a>
                    <a className="flex items-center gap-2 text-xs text-[#c6cfdf] hover:text-[#d3f36b]" href="/signup"><UserPlus size={15} /> <span className="hidden sm:inline">Create an account</span></a>
                </div>
            </nav>
            <section className="mx-auto mt-16 w-full max-w-[470px] rounded-2xl border border-[#303b55] bg-[#111a2d] p-7 shadow-2xl shadow-black/30 sm:mt-28 sm:p-10">
                <div className="font-mono text-[11px] uppercase tracking-[.13em] text-[#8d99b2]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d3f36b] shadow-[0_0_16px_#d3f36b]" />Welcome to mylinkly</div>
                <p className="mt-5 text-sm leading-relaxed text-[#9da8bd]">Sign in to manage your links and keep your workspace organized.</p>
                <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                    <label className="flex flex-col gap-2 text-xs text-[#c7cfdf]">Email address
                        <input className="rounded-lg border border-[#3a4660] bg-[#0c1222] px-3.5 py-3 text-[#f4f1e9] outline-none placeholder:text-[#68758f] focus:border-[#d3f36b]" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                        {fieldErrors.email && <span className="text-xs text-red-300">{fieldErrors.email}</span>}
                    </label>
                    <label className="flex flex-col gap-2 text-xs text-[#c7cfdf]">Password
                        <input className="rounded-lg border border-[#3a4660] bg-[#0c1222] px-3.5 py-3 text-[#f4f1e9] outline-none placeholder:text-[#68758f] focus:border-[#d3f36b]" type="password" placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} />
                        {fieldErrors.password && <span className="text-xs text-red-300">{fieldErrors.password}</span>}
                    </label>
                    <button type="submit" className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-[#d3f36b] py-3.5 font-extrabold text-[#101a2d] disabled:cursor-wait disabled:opacity-60">{loading ? "Signing in..." : "Sign in"} {!loading && <ArrowRight size={18} />}</button>
                </form>
                {message && <p role="status" className={`mt-4 text-sm ${messageType}`}>{message}</p>}
                <p className="mt-7 text-center text-xs text-[#8d99b2]">Don&apos;t have an account? <a className="text-[#d3f36b]" href="/signup">Sign up</a></p>
            </section>
        </main>
    );
}

export default Login;
