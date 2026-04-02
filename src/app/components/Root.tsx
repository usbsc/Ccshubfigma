import { Outlet, Link, useLocation } from "react-router";
import { Bell, Trophy, Calendar, Users, BarChart3, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export function Root() {
  const location = useLocation();
  const [homeTeam, setHomeTeam] = useState<string | null>(
    localStorage.getItem("homeTeam")
  );
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    if (homeTeam) {
      localStorage.setItem("homeTeam", homeTeam);
    } else {
      localStorage.removeItem("homeTeam");
    }
  }, [homeTeam]);

  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 font-sans">
      {/* Header */}
      <header className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all active:scale-95 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-3 transition-transform">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-tight">CIF CCS</h1>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Football Portal</p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2.5 rounded-xl transition-all relative border ${
                  showSettings 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Settings className="w-5 h-5" />
                {homeTeam && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="mt-4 hidden md:flex items-center gap-1">
            {[
              { path: "/", label: "Live Feed", icon: Trophy },
              { path: "/rankings", label: "Rankings", icon: BarChart3 },
              { path: "/schedule", label: "Schedule", icon: Calendar },
              { path: "/scores", label: "Scores", icon: Trophy },
              { path: "/players", label: "Players", icon: Users },
            ].map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isActive(path)
                    ? "bg-zinc-100 text-zinc-950 shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Bar (Scrollable) */}
        <div className="md:hidden border-t border-zinc-900 px-2 py-2 flex gap-1 overflow-x-auto no-scrollbar">
          {[
            { path: "/", label: "Home", icon: Trophy },
            { path: "/rankings", label: "Rankings", icon: BarChart3 },
            { path: "/schedule", label: "Schedule", icon: Calendar },
            { path: "/scores", label: "Scores", icon: Trophy },
            { path: "/players", label: "Players", icon: Users },
          ].map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${
                isActive(path)
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-zinc-900 text-zinc-400"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          ))}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-zinc-900 border-t border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="max-w-2xl mx-auto px-4 py-6">
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2 text-white">
                <Bell className="w-5 h-5 text-blue-400" />
                Personalize Your Experience
              </h3>
              <p className="text-zinc-400 text-sm mb-4">Select your home team to prioritize their games and news.</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={homeTeam || ""}
                  onChange={(e) => setHomeTeam(e.target.value || null)}
                  className="flex-1 bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
                >
                  <option value="">No team selected</option>
                  <optgroup label="WCAL">
                    <option value="bellarmine">Bellarmine College Prep</option>
                    <option value="st-francis">St. Francis High School</option>
                    <option value="valley-christian">Valley Christian</option>
                    <option value="mitty">Archbishop Mitty</option>
                    <option value="serra">Serra High School</option>
                    <option value="sacred-heart">Sacred Heart Cathedral</option>
                  </optgroup>
                  <optgroup label="Other Leagues">
                    <option value="los-gatos">Los Gatos High School</option>
                    <option value="wilcox">Adrian C. Wilcox</option>
                  </optgroup>
                </select>

                {homeTeam && (
                  <button 
                    onClick={() => setHomeTeam(null)}
                    className="px-4 py-2 text-sm text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Alert Banner for Home Team */}
      {homeTeam && (
        <div className="bg-blue-600/10 border-b border-blue-500/20 py-2">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-[11px] font-bold text-blue-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Priority alerts enabled for your home team
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="font-bold text-xl text-white">CIF CCS Football</h3>
              </div>
              <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                The ultimate digital destination for Central Coast Section high school football. Real-time scores, in-depth rankings, and player spotlights.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-200 mb-4 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="text-zinc-500 text-sm space-y-3 font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">MaxPreps CCS</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">CIF Official Stats</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Hudl Highlights</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">CalPreps Rankings</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-200 mb-4 text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="text-zinc-500 text-sm space-y-3 font-medium">
                <li><Link to="/rankings" className="hover:text-white transition-colors">Rankings</Link></li>
                <li><Link to="/schedule" className="hover:text-white transition-colors">Schedule</Link></li>
                <li><Link to="/scores" className="hover:text-white transition-colors">Scores</Link></li>
                <li><Link to="/players" className="hover:text-white transition-colors">Players</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-zinc-600 uppercase tracking-widest">
            <div>© 2026 CIF Central Coast Section Football</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-400">Privacy</a>
              <a href="#" className="hover:text-zinc-400">Terms</a>
              <a href="#" className="hover:text-zinc-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}