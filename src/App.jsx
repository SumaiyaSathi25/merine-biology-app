import React, { useState, useEffect } from "react";
import {
  Waves,
  Compass,
  Activity,
  BookOpen,
  Search,
  ShieldAlert,
  Radio,
  Zap,
  ChevronRight,
  Thermometer,
  Gauge,
  Navigation,
  Eye,
  ExternalLink,
  Mail,
  Sparkles,
  Info,
  X,
  Volume2,
  VolumeX,
  ArrowDown,
} from "lucide-react";

// Sample Deep Sea Species Data
const SPECIES_DATA = [
  {
    id: 1,
    name: "Anglerfish",
    scientificName: "Melanocetus johnsonii",
    category: "Bioluminescent",
    depth: "2,000m",
    zone: "Midnight Zone",
    bioluminescent: true,
    endangered: false,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    description:
      "Famous for its glowing esca (lure) populated with symbiotic bacteria, used to attract unsuspecting prey in pitch-black abyssal waters.",
    stats: { pressure: "200 atm", temp: "1.5°C", size: "18 cm" },
  },
  {
    id: 2,
    name: "Giant Isopod",
    scientificName: "Bathynomus giganteus",
    category: "Extreme Depth",
    depth: "700m - 2,100m",
    zone: "Midnight Zone",
    bioluminescent: false,
    endangered: false,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800",
    description:
      "A deep-sea crustacean related to pillbugs, growing up to 50 cm long due to deep-sea gigantism in nutrient-scarce seabed environments.",
    stats: { pressure: "180 atm", temp: "2.0°C", size: "50 cm" },
  },
  {
    id: 3,
    name: "Barreleye Fish",
    scientificName: "Macropinna microstoma",
    category: "Bioluminescent",
    depth: "600m - 800m",
    zone: "Twilight Zone",
    bioluminescent: true,
    endangered: false,
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    description:
      "Features a completely transparent fluid-filled dome head housing green tubular eyes that can rotate upward to spot prey silhouetted overhead.",
    stats: { pressure: "70 atm", temp: "4.0°C", size: "15 cm" },
  },
  {
    id: 4,
    name: "Vampire Squid",
    scientificName: "Vampyroteuthis infernalis",
    category: "Extreme Depth",
    depth: "3,000m",
    zone: "Abyssal Zone",
    bioluminescent: true,
    endangered: false,
    image:
      "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&q=80&w=800",
    description:
      "Neither squid nor octopus, this living fossil feeds on marine snow using sticky velar filaments and turns inside-out when threatened.",
    stats: { pressure: "300 atm", temp: "2.5°C", size: "30 cm" },
  },
  {
    id: 5,
    name: "Comb Jelly (Ctenophore)",
    scientificName: "Beroe cucumis",
    category: "Bioluminescent",
    depth: "1,500m",
    zone: "Midnight Zone",
    bioluminescent: true,
    endangered: false,
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800",
    description:
      "Reflects light through rows of rhythmic beating cilia, producing rainbow diffraction patterns while secreting bright blue bioluminescence.",
    stats: { pressure: "150 atm", temp: "3.2°C", size: "12 cm" },
  },
  {
    id: 6,
    name: "Deep-Sea Dragonfish",
    scientificName: "Stomias boa",
    category: "Endangered",
    depth: "1,800m",
    zone: "Midnight Zone",
    bioluminescent: true,
    endangered: true,
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800",
    description:
      "Produces far-red bioluminescent light invisible to most marine creatures, enabling it to illuminate prey with an undetectable searchlight.",
    stats: { pressure: "180 atm", temp: "2.1°C", size: "40 cm" },
  },
];

// Ocean Depth Zones Metadata
const DEPTH_ZONES = [
  {
    id: "sunlight",
    name: "Sunlight Zone",
    subName: "Epipelagic",
    range: "0m - 200m",
    pressure: "1 - 20 atm",
    temp: "15°C - 30°C",
    light: "100% - 1%",
    color: "from-blue-600 via-cyan-500 to-teal-900",
    desc: "Home to 90% of all ocean life. Photosynthesis thrives here with rich sunlight penetration supporting coral reefs and massive fish shoals.",
  },
  {
    id: "twilight",
    name: "Twilight Zone",
    subName: "Mesopelagic",
    range: "200m - 1,000m",
    pressure: "20 - 100 atm",
    temp: "4°C - 15°C",
    light: "< 1%",
    color: "from-teal-900 via-indigo-950 to-slate-950",
    desc: "Dim, blue-tinted light fades rapidly. Creatures here rely on counter-illumination bioluminescence to blend in with faint sunlight.",
  },
  {
    id: "midnight",
    name: "Midnight Zone",
    subName: "Bathypelagic",
    range: "1,000m - 4,000m",
    pressure: "100 - 400 atm",
    temp: "2°C - 4°C",
    light: "0%",
    color: "from-indigo-950 via-slate-950 to-black",
    desc: "Complete pitch-black darkness, except for living bioluminescence. Immense pressure demands soft-bodied or specialized physiological adaptations.",
  },
  {
    id: "abyssal",
    name: "Abyssal Zone",
    subName: "Abyssopelagic",
    range: "4,000m - 6,000m",
    pressure: "400 - 600 atm",
    temp: "0°C - 2°C",
    light: "0%",
    color: "from-slate-950 via-black to-blue-950",
    desc: "Freezing oceanic plains covering over 60% of the Earth's surface. Organisms rely heavily on organic debris ('marine snow') falling from above.",
  },
  {
    id: "hadal",
    name: "Hadal Zone",
    subName: "Hadalpelagic",
    range: "6,000m - 11,000m+",
    pressure: "600 - 1,100 atm",
    temp: "1°C - 4°C",
    light: "0%",
    color: "from-black via-blue-950 to-purple-950",
    desc: "Deep ocean trenches like the Mariana Trench. Crushing pressures, hydrothermal vents, and endemic extremophile organisms thrive in deep isolation.",
  },
];

// Research & Field Logs Data
const RESEARCH_LOGS = [
  {
    id: 1,
    title: "Discovery of Hydrothermal Vent Fauna in Mariana Trench",
    date: "October 14, 2026",
    author: "Dr. Elena Rostova",
    tag: "Expedition Log",
    readTime: "6 min read",
    summary:
      "ROV 'DeepQuest V' deployed high-definition sensors at 8,400m depth, uncovering chemosynthetic bacterial mats and unclassified amphipod species.",
  },
  {
    id: 2,
    title: "Bioluminescent Wavelength Shift at 3,000 meters",
    date: "September 28, 2026",
    author: "Prof. Marcus Thorne",
    tag: "Scientific Paper",
    readTime: "12 min read",
    summary:
      "New photometer analyses reveal deep-sea dragonfish shifting emission spectrum toward 700nm red wavelengths to navigate unseen by predators.",
  },
  {
    id: 3,
    title: "Mapping Hadal Acoustic Echoes with Multibeam Sonar",
    date: "August 19, 2026",
    author: "Ocean Census Team",
    tag: "Field Note",
    readTime: "4 min read",
    summary:
      "Comprehensive bathymetric mapping of subduction fault lines reveals uncharted bathyal ridges and potential hydrothermal smokers.",
  },
];

export default function App() {
  const [activeZone, setActiveZone] = useState(DEPTH_ZONES[0]);
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [depthMeter, setDepthMeter] = useState(4250);
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Live telemetry depth oscillation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDepthMeter((prev) => {
        const variation = (Math.random() - 0.5) * 8;
        return Math.min(10990, Math.max(4000, Math.round(prev + variation)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Toast message trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const filteredSpecies = SPECIES_DATA.filter((item) => {
    if (speciesFilter === "All") return true;
    if (speciesFilter === "Bioluminescent") return item.bioluminescent;
    if (speciesFilter === "Extreme Depth")
      return item.category === "Extreme Depth";
    if (speciesFilter === "Endangered") return item.endangered;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Toast Notification Modal */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-slate-950 px-5 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Sticky Glassmorphism Header */}
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-12 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Waves className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-amber-300 uppercase">
                ASTRAL DEEP
              </span>
              <span className="block text-[10px] tracking-widest text-cyan-400/70 font-mono uppercase">
                Marine Research Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#depth-zones"
              className="hover:text-cyan-400 transition-colors"
            >
              Depth Zones
            </a>
            <a
              href="#species-grid"
              className="hover:text-cyan-400 transition-colors"
            >
              Species Library
            </a>
            <a
              href="#live-rov"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live ROV
            </a>
            <a
              href="#research"
              className="hover:text-cyan-400 transition-colors"
            >
              Research Logs
            </a>
          </nav>

          {/* Glowing Header CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-label="Toggle Ocean Ambient Audio"
              className="p-2.5 rounded-xl border border-cyan-500/20 bg-slate-900/60 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-400 transition"
              title={
                soundEnabled ? "Mute Ambient Sound" : "Enable Ambient Sound"
              }
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <a
              href="#depth-zones"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] hover:bg-cyan-300 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Explore Abyss</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden border-b border-cyan-500/10">
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>OCEAN CENSUS & DEEP SEA TELEMETRY ONLINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Unveil the Mysteries of the <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-200 to-amber-300">
              Ocean Depths
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg mb-10 leading-relaxed">
            Journey beyond sunlight into Earth's final frontier. Monitor
            real-time submersible telemetry, discover extremophile biology, and
            analyze deep trench ecosystems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#depth-zones"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <span>Descend to 11,000m</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#live-rov"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 hover:border-cyan-500/40 bg-slate-900/80 text-slate-200 font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Watch Live Telemetry</span>
            </a>
          </div>

          {/* Dynamic Live Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                label: "Target Species",
                val: "100,000+",
                icon: Compass,
                color: "text-cyan-400",
              },
              {
                label: "Max Bathyal Depth",
                val: "11,000m",
                icon: Gauge,
                color: "text-amber-400",
              },
              {
                label: "Active Expeditions",
                val: "1,420",
                icon: Activity,
                color: "text-teal-400",
              },
              {
                label: "Water Pressure",
                val: "1,100 atm",
                icon: ShieldAlert,
                color: "text-blue-400",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left"
              >
                <stat.icon className={`w-5 h-5 mb-2 ${stat.color}`} />
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {stat.val}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Ocean Depth Zones Explorer */}
      <section
        id="depth-zones"
        className="py-24 px-4 relative max-w-7xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block">
            Bathymetric Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Interactive Ocean Depth Zones
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Explore environmental shifts in light, pressure, and temperature
            down the water column.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Depth Zone Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {DEPTH_ZONES.map((zone) => {
              const isActive = activeZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.15)] translate-x-2"
                      : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-12 rounded-full bg-gradient-to-b ${zone.color}`}
                    />
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {zone.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {zone.subName} • {zone.range}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${isActive ? "text-cyan-400 translate-x-1" : "text-slate-600"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Dynamic Interactive Zone Card Display */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 rounded-3xl bg-gradient-to-b ${activeZone.color} border border-cyan-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-500`}
            >
              {/* Environmental Metrics Grid */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-300 tracking-wider">
                    Current Zone
                  </span>
                  <h3 className="text-3xl font-black text-white">
                    {activeZone.name}
                  </h3>
                  <p className="text-sm text-cyan-200/80 font-mono">
                    {activeZone.subName} ({activeZone.range})
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-950/60 border border-white/20 text-xs font-mono text-cyan-300">
                  Depth Metric
                </div>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8">
                {activeZone.desc}
              </p>

              {/* Real-time Environmental Conditions */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md text-center">
                  <ShieldAlert className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 font-medium">
                    Pressure
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                    {activeZone.pressure}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md text-center">
                  <Thermometer className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 font-medium">
                    Temperature
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                    {activeZone.temp}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md text-center">
                  <Sparkles className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 font-medium">
                    Solar Light
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                    {activeZone.light}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 font-mono pt-4 border-t border-white/10">
                <span>Adaptive Hydrostatic Equilibrium</span>
                <span className="text-cyan-300 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Environmental Data Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Species Encyclopedia Grid */}
      <section
        id="species-grid"
        className="py-24 px-4 bg-slate-900/30 border-y border-cyan-500/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block">
                Marine Taxonomy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Abyssal Species Library
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Cataloged fauna equipped with extreme biological adaptations.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Bioluminescent", "Extreme Depth", "Endangered"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setSpeciesFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      speciesFilter === filter
                        ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecies.map((species) => (
              <div
                key={species.id}
                className="group rounded-2xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,229,255,0.1)] flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={species.image}
                    alt={species.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                    {species.depth}
                  </div>
                  {species.bioluminescent && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Bioluminescent
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {species.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 italic mb-3">
                      {species.scientificName}
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {species.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSpecies(species)}
                    className="w-full py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <span>Inspect Taxonomic Card</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Live ROV Telemetry & Map Tracker Widget */}
      <section id="live-rov" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block">
            Deep-Sea Operations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ROV Telemetry & Feeds
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time stream and diagnostic overlay from submersible ROV
            'Nautilus-X'.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/80 rounded-3xl border border-cyan-500/20 p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
          {/* Simulated Video Placeholder Feed */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative aspect-video flex items-center justify-center group">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200"
              alt="Live Submersible Stream"
              className="w-full h-full object-cover opacity-60"
            />

            {/* Camera Overlay HUD */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between font-mono text-xs text-cyan-400 pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="font-bold text-white">
                    ROV CAM 01 [LIVE]
                  </span>
                </div>
                <div className="text-right bg-slate-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/30 text-slate-300">
                  LAT: 11°21'N | LONG: 142°12'E
                </div>
              </div>

              {/* Crosshair HUD in center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-400/30 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              </div>

              <div className="flex justify-between items-end bg-slate-950/80 px-4 py-2 rounded-lg border border-cyan-500/30 text-slate-300">
                <div>HD SUB-SURFACE OPTICS</div>
                <div className="text-amber-400 font-bold">
                  DEPTH: {depthMeter}m
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Dashboard Stats */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-cyan-400" />
                Vessel Diagnostics
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Submersible R/V Falkor (Mariana Trench Sector 4)
              </p>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-xs flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-cyan-400" /> Current Depth
                  </span>
                  <span className="text-cyan-300 font-bold text-sm">
                    {depthMeter} m
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-xs flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-400" /> Ambient
                    Temp
                  </span>
                  <span className="text-amber-300 font-bold text-sm">
                    1.8 °C
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-teal-400" /> Hull
                    Pressure
                  </span>
                  <span className="text-teal-300 font-bold text-sm">
                    425.4 atm
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast("Live Submersible Feed Synchronized!")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-cyan-500/20"
            >
              Request Camera Control
            </button>
          </div>
        </div>
      </section>

      {/* 6. Research & Field Logs Section */}
      <section
        id="research"
        className="py-24 px-4 bg-slate-900/30 border-t border-cyan-500/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block">
              Academic Publications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Research & Field Logs
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Peer-reviewed findings from deep-sea marine biology expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH_LOGS.map((log) => (
              <div
                key={log.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30">
                      {log.tag}
                    </span>
                    <span className="text-slate-500">{log.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                    {log.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {log.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{log.author}</span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Modern Footer */}
      <footer className="bg-slate-950 border-t border-cyan-500/20 pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Mission */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <Waves className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                ASTRAL DEEP
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Advancing global marine conservation and ocean depth exploration
              through open-access bathymetric telemetry and biological taxonomy.
            </p>
            <div className="text-[11px] font-mono text-cyan-400/80">
              © 2026 Ocean Exploration Portal. All rights reserved.
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="#depth-zones"
                  className="hover:text-cyan-300 transition"
                >
                  Depth Zones (Epipelagic to Hadal)
                </a>
              </li>
              <li>
                <a
                  href="#species-grid"
                  className="hover:text-cyan-300 transition"
                >
                  Taxonomic Library
                </a>
              </li>
              <li>
                <a href="#live-rov" className="hover:text-cyan-300 transition">
                  ROV Submersible Telemetry
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-cyan-300 transition">
                  Expedition Field Publications
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Partners */}
          <div>
            <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-4">
              Research Alliance
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>• Ocean Census Initiative</li>
              <li>• MBARI Exploration Trust</li>
              <li>• Schmidt Ocean Institute</li>
              <li>• Woods Hole Oceanographic (WHOI)</li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup */}
          <div>
            <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-4">
              Expedition Dispatch
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive weekly deep-sea species logs and bathymetric research
              alerts.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (emailInput) {
                  showToast("Subscribed to Expedition Dispatches!");
                  setEmailInput("");
                }
              }}
              className="flex flex-col gap-2"
            >
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter researcher email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition"
              >
                Join Expedition Network
              </button>
            </form>
          </div>
        </div>
      </footer>

      {/* Taxonomic Card Detail Modal */}
      {selectedSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedSpecies(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={selectedSpecies.image}
              alt={selectedSpecies.name}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />

            <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 inline-block mb-2">
              {selectedSpecies.zone} ({selectedSpecies.depth})
            </span>

            <h3 className="text-2xl font-bold text-white">
              {selectedSpecies.name}
            </h3>
            <p className="text-xs font-mono text-slate-400 italic mb-4">
              {selectedSpecies.scientificName}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {selectedSpecies.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950 font-mono text-center text-xs">
              <div>
                <div className="text-slate-500 text-[10px]">Pressure</div>
                <div className="text-cyan-300 font-bold">
                  {selectedSpecies.stats.pressure}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">Water Temp</div>
                <div className="text-amber-300 font-bold">
                  {selectedSpecies.stats.temp}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">Avg Size</div>
                <div className="text-teal-300 font-bold">
                  {selectedSpecies.stats.size}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
