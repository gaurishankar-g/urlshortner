import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getCurrentUser } from "./services/user";

function App() {
    const page = window.location.pathname;
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        if (page !== "/") return;

        getCurrentUser()
            .then(() => setAuthenticated(true))
            .catch(() => window.location.replace("/login"));
    }, [page]);

    if (page === "/login") return <Login />;
    if (page === "/signup") return <Signup />;
    if (authenticated !== true) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#0c1222] text-[#f4f1e9]">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-3 w-3 animate-pulse rounded-full bg-[#d3f36b] shadow-[0_0_18px_#d3f36b]" />
                    <p className="font-mono text-xs uppercase tracking-[.14em] text-[#8d99b2]">Checking your session...</p>
                </div>
            </main>
        );
    }

    return <Dashboard />;
}

export default App;
