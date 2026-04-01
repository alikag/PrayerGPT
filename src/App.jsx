import { useState, useEffect, useRef } from "react";

const DEITIES = [
  { id: "catholic", name: "God (Catholic)", icon: "\u271D\uFE0F", protocol: "Latin Rite v3.2", greeting: "Heavenly Father", ping: "42ms", uptime: "99.97%" },
  { id: "protestant", name: "God (Protestant)", icon: "\u26EA", protocol: "KJV Syntax", greeting: "Dear Lord", ping: "38ms", uptime: "99.95%" },
  { id: "orthodox", name: "God (Orthodox)", icon: "\u2626\uFE0F", protocol: "Byzantine TLS", greeting: "O Lord our God", ping: "61ms", uptime: "99.99%" },
  { id: "allah", name: "Allah", icon: "\u262A\uFE0F", protocol: "Arabic Invocation", greeting: "Bismillah", ping: "33ms", uptime: "99.98%" },
  { id: "vishnu", name: "Vishnu", icon: "\uD83D\uDE4F", protocol: "Sanskrit Mantra", greeting: "Om Namo Narayanaya", ping: "44ms", uptime: "99.96%" },
  { id: "shiva", name: "Shiva", icon: "\uD83D\uDD31", protocol: "Vedic Channel", greeting: "Om Namah Shivaya", ping: "47ms", uptime: "99.94%" },
  { id: "zeus", name: "Zeus", icon: "\u26A1", protocol: "Olympian v0.1 (EOL)", greeting: "O mighty Zeus", ping: "3200ms", uptime: "12.4%", deprecated: true },
  { id: "odin", name: "Odin", icon: "\uD83E\uDE93", protocol: "Runic UDP", greeting: "Allfather", ping: "88ms", uptime: "99.1%" },
  { id: "fsm", name: "Flying Spaghetti Monster", icon: "\uD83C\uDF5D", protocol: "Pastafarian", greeting: "O Great Noodly One", ping: "al dente", uptime: "100%" },
  { id: "universe", name: "The Universe", icon: "\uD83C\uDF0C", protocol: "Quantum Multicast", greeting: "Dear Cosmos", ping: "\u221E", uptime: "13.8B yrs" },
  { id: "custom", name: "Custom Endpoint", icon: "\uD83D\uDD0C", protocol: "REST API", greeting: "To Whom It May Concern", ping: "???", uptime: "N/A" },
];

const PRIORITIES = [
  { id: "low", label: "Standard", desc: "Normal celestial routing", color: "#4a9eff", icon: "\uD83D\uDCE8" },
  { id: "medium", label: "Urgent", desc: "Skips purgatory queue", color: "#f59e0b", icon: "\uD83D\uDCE9" },
  { id: "high", label: "Emergency", desc: "Interrupts God's nap", color: "#ef4444", icon: "\uD83D\uDEA8" },
];

const STATUS_STEPS = [
  "Tokenizing prayer into spiritual packets...",
  "Checking recipient's do-not-disturb settings...",
  "Formatting per deity protocol...",
  "Opening Spiritual Socket Layer (SSL)...",
  "Routing through celestial CDN...",
  "Bypassing free will firewall...",
  "Transmitting to divine endpoint...",
  "Awaiting acknowledgment...",
];

const FINAL_STATUSES = [
  { label: "Delivered", color: "#22c55e", icon: "\u2713" },
  { label: "Pending Divine Review", color: "#f59e0b", icon: "\u23F3" },
  { label: "Read", color: "#8878a8", icon: "\uD83D\uDC40" },
  { label: "Mysterious Ways\u2122", color: "#a855f7", icon: "?" },
  { label: "Queued Behind 4.2 Billion Others", color: "#f59e0b", icon: "\uD83D\uDCCB" },
  { label: "Acknowledged (Non-Binding)", color: "#22c55e", icon: "\uD83E\uDD37" },
];

const TAGLINES = [
  "Because shouting into the void should at least have a nice UI",
  "Now with 40% fewer unanswered prayers (statistically unverified)",
  "Putting the 'AI' in 'faith' since 2026",
  "For when thoughts and prayers need an API layer",
  "Finally, prayer with version control",
  "Enterprise-grade salvation, startup pricing",
  "Disrupting the prayer-industrial complex",
  "Same prayers, better infrastructure",
  "We can't guarantee results. Then again, neither can they.",
  "The middleman between you and whoever's up there, if anyone",
];

const PLACEHOLDER_TOPICS = [
  "Please make my code compile\nI mass-replied-all again\nMy crypto portfolio\nGeneral existential dread",
  "Need a mass miracle (bulk discount?)\nWifi won't reach the bathroom\nStudent loans from 2009",
  "Make my landlord chill\nI googled my symptoms again\nPlease don't let the check engine light be serious",
  "Career guidance (LinkedIn isn't cutting it)\nMy houseplant is dying (again)\nHelp me parallel park",
  "Please let there be leftovers\nMy in-laws are visiting\nThe audacity of Mondays",
];

const ERROR_MESSAGES = [
  "Divine endpoint unreachable. Please verify your faith and try again.",
  "Server returned 403: Forbidden Fruit.",
  "Prayer timed out. Even miracles have rate limits.",
  "Spiritual bandwidth exceeded. Try again during off-peak worship hours.",
  "Connection refused. The deity you are trying to reach has not accepted your terms of service.",
];

const labelStyle = {
  display: "block",
  fontSize: 12,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "#8878a8",
  marginBottom: 8,
};

function Stars() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const stars = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3, speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.5 + 0.1, flicker: Math.random() * 0.02,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.opacity += s.flicker;
        if (s.opacity > 0.7 || s.opacity < 0.05) s.flicker = -s.flicker;
        s.y -= s.speed;
        if (s.y < -5) { s.y = canvas.height + 5; s.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 180, 255, " + s.opacity + ")";
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

export default function PrayerGPT() {
  const [screen, setScreen] = useState("home");
  const [deity, setDeity] = useState(null);
  const [priority, setPriority] = useState("low");
  const [topics, setTopics] = useState("");
  const [customDeity, setCustomDeity] = useState("");
  const [transmitting, setTransmitting] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const [prayerText, setPrayerText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [finalStatus, setFinalStatus] = useState(null);
  const [prayerLog, setPrayerLog] = useState([]);
  const [error, setError] = useState(null);
  const [tagline] = useState(() => TAGLINES[Math.floor(Math.random() * TAGLINES.length)]);
  const [placeholder] = useState(() => PLACEHOLDER_TOPICS[Math.floor(Math.random() * PLACEHOLDER_TOPICS.length)]);
  const [prayerCount, setPrayerCount] = useState(() => Math.floor(Math.random() * 900000) + 100000);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllDeities, setShowAllDeities] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 520);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPrayerCount(c => c + Math.floor(Math.random() * 3) + 1), 4000);
    return () => clearInterval(t);
  }, []);

  const visibleDeities = (isMobile && !showAllDeities) ? DEITIES.slice(0, 6) : DEITIES;
  const hiddenCount = DEITIES.length - 6;

  const transmit = async () => {
    if (!deity || !topics.trim()) return;
    setTransmitting(true);
    setStatusIdx(0);
    setPrayerText("");
    setDisplayText("");
    setFinalStatus(null);
    setError(null);
    setScreen("transmit");

    const interval = setInterval(() => {
      setStatusIdx(function (prev) {
        if (prev < STATUS_STEPS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1000);

    const selectedDeity = DEITIES.find(function (d) { return d.id === deity; });
    const deityName = deity === "custom" ? (customDeity || "Unknown Entity") : selectedDeity.name;

    try {
      var response = await fetch("/api/pray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deity: deityName,
          greeting: selectedDeity.greeting,
          protocol: selectedDeity.protocol,
          priority: priority,
          topics: topics,
        }),
      });

      var data = await response.json();
      clearInterval(interval);
      setStatusIdx(STATUS_STEPS.length - 1);

      if (data.prayer) {
        var text = data.prayer;
        setPrayerText(text);
        var idx = 0;
        var streamInterval = setInterval(function () {
          idx += 3;
          if (idx >= text.length) {
            setDisplayText(text);
            clearInterval(streamInterval);
            var fs = FINAL_STATUSES[Math.floor(Math.random() * FINAL_STATUSES.length)];
            setFinalStatus(fs);
            setTransmitting(false);
            setPrayerLog(function (prev) {
              return [{
                id: Date.now(), deity: deityName, icon: selectedDeity.icon,
                topics: topics, priority: priority, prayer: text, status: fs,
                time: new Date().toLocaleTimeString(),
              }].concat(prev);
            });
          } else {
            setDisplayText(text.slice(0, idx));
          }
        }, 15);
      } else {
        throw new Error(data.error || "No response");
      }
    } catch (err) {
      clearInterval(interval);
      setError(ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)] + " (" + (err.message || "") + ")");
      setTransmitting(false);
    }
  };

  var reset = function () {
    setScreen("home");
    setTopics("");
    setPrayerText("");
    setDisplayText("");
    setFinalStatus(null);
    setError(null);
    setTransmitting(false);
    setStatusIdx(0);
  };

  const selectedDeity = deity ? DEITIES.find(d => d.id === deity) : null;
  const canTransmit = deity && topics.trim();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #1a1040 0%, #0d0820 30%, #0c0a18 60%)",
      color: "#e8e0f8",
      fontFamily: "Georgia, 'Times New Roman', serif",
      padding: isMobile ? "16px 12px 100px" : "24px 16px 60px",
      position: "relative",
    }}>
      <Stars />
      <style>{`
        * { box-sizing: border-box; }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(168,130,255,.3)} 50%{box-shadow:0 0 40px rgba(168,130,255,.6)} }
        @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes halo { 0%,100%{text-shadow:0 0 30px rgba(168,130,255,0.4)} 50%{text-shadow:0 0 60px rgba(168,130,255,0.7), 0 0 90px rgba(168,130,255,0.3)} }
        textarea:focus,input:focus{outline:none;border-color:#a882ff !important}
        .deity-btn{transition:all 0.2s}
        .deity-btn:hover{transform:translateY(-2px)}
        .deity-btn.selected{border-color:#a855f7 !important;background:rgba(168,130,255,0.15) !important;color:#e0d0ff !important;box-shadow:0 0 16px rgba(168,130,255,0.2)}
        .priority-btn{transition:all 0.2s}
        .priority-btn:hover{transform:scale(1.03)}
        .nav-btn:hover{background:rgba(168,130,255,0.1) !important}
        .transmit-btn{transition:all 0.2s}
        .transmit-btn:hover:not(:disabled){transform:translateY(-1px);filter:brightness(1.1)}
        details summary::-webkit-details-marker { color: #a855f7; }
        .show-more-btn{transition:all 0.2s}
        .show-more-btn:hover{background:rgba(168,130,255,0.12) !important;color:#c8b0ff !important}
      `}</style>

      <div style={{ maxWidth: 580, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32, animation: "fadeIn 0.6s ease-out", cursor: "pointer" }} onClick={() => { if (!transmitting) reset(); }}>
          <div style={{ fontSize: isMobile ? 44 : 52, marginBottom: 8, lineHeight: 1 }}>🙏</div>
          <h1 style={{
            fontSize: isMobile ? 28 : 34, fontWeight: 400, letterSpacing: 8, textTransform: "uppercase",
            color: "#fff", margin: "0 0 6px",
            animation: "halo 4s ease-in-out infinite",
          }}>PrayerGPT</h1>
          <div style={{
            fontSize: isMobile ? 10 : 11, letterSpacing: 4, textTransform: "uppercase",
            color: "#a088c8", marginBottom: 12,
          }}>
            Divine Communication as a Service
          </div>
          <div style={{
            fontSize: isMobile ? 13 : 14, color: "#7868a0", fontStyle: "italic",
            maxWidth: 380, margin: "0 auto 12px", lineHeight: 1.5,
            padding: "0 10px",
          }}>
            "{tagline}"
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 20, padding: "5px 14px", fontSize: 11, color: "#4ade80",
            letterSpacing: 1,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
            {prayerCount.toLocaleString()} prayers transmitted
          </div>
        </div>

        {/* NAV */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {[["home", "Transmit"], ["log", "Log (" + prayerLog.length + ")"]].map(function (item) {
            var key = item[0];
            var label = item[1];
            var active = screen === key || (key === "home" && screen === "transmit");
            return (
              <button key={key} className="nav-btn" onClick={function () { if (!transmitting) setScreen(key); }} style={{
                background: active ? "rgba(168,130,255,0.15)" : "transparent",
                border: "1px solid " + (active ? "rgba(168,130,255,0.3)" : "rgba(255,255,255,0.08)"),
                color: active ? "#c8b0ff" : "#555",
                padding: isMobile ? "10px 18px" : "8px 20px", borderRadius: 6,
                cursor: transmitting ? "not-allowed" : "pointer",
                fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontFamily: "inherit",
                transition: "all 0.2s",
              }}>{label}</button>
            );
          })}
        </div>

        {/* HOME */}
        {screen === "home" && (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            <span style={labelStyle}>Select Divine Endpoint</span>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr",
              gap: 8,
              marginBottom: 0,
            }}>
              {visibleDeities.map(function (d) {
                var isSelected = deity === d.id;
                return (
                  <button key={d.id} className={"deity-btn" + (isSelected ? " selected" : "")} onClick={function () { setDeity(d.id); }} style={{
                    background: isSelected ? "rgba(168,130,255,0.15)" : "rgba(255,255,255,0.03)",
                    border: "1px solid " + (isSelected ? "#a855f7" : "rgba(255,255,255,0.06)"),
                    borderRadius: 10, padding: isMobile ? "10px" : "12px 14px", textAlign: "left", cursor: "pointer",
                    color: isSelected ? "#e0d0ff" : "#888", fontFamily: "inherit",
                    position: "relative",
                    opacity: d.deprecated ? 0.5 : 1,
                  }}>
                    {isSelected && (
                      <div style={{
                        position: "absolute", top: 6, right: 6,
                        width: 18, height: 18, borderRadius: "50%",
                        background: "#a855f7", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 10, color: "#fff",
                      }}>{"\u2713"}</div>
                    )}
                    <div style={{ fontSize: isMobile ? 22 : 24, marginBottom: 4 }}>{d.icon}</div>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      {d.name}
                      {d.deprecated && (
                        <span style={{ fontSize: 8, background: "rgba(239,68,68,0.2)", color: "#f87171", padding: "2px 5px", borderRadius: 3, textTransform: "uppercase", letterSpacing: 1 }}>EOL</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{d.protocol}</div>
                    <div style={{ fontSize: 10, color: "#444", marginTop: 3, display: "flex", gap: 8 }}>
                      <span>{d.ping}</span>
                      <span>{d.uptime}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Show more / less toggle on mobile */}
            {isMobile && (
              <button className="show-more-btn" onClick={() => setShowAllDeities(!showAllDeities)} style={{
                width: "100%", marginTop: 8, marginBottom: 14, padding: "10px",
                background: "rgba(168,130,255,0.06)", border: "1px solid rgba(168,130,255,0.12)",
                borderRadius: 8, color: "#8878a8", fontSize: 12, letterSpacing: 2,
                textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit",
              }}>
                {showAllDeities ? "\u25B2 Show less" : "\u25BC " + hiddenCount + " more deities (incl. Zeus, somehow)"}
              </button>
            )}

            {!isMobile && <div style={{ marginBottom: 22 }} />}

            {/* Selected deity info bar */}
            {selectedDeity && (
              <div style={{
                background: "rgba(168,130,255,0.06)", border: "1px solid rgba(168,130,255,0.12)",
                borderRadius: 8, padding: "10px 14px", marginBottom: 18,
                fontSize: 12, color: "#8878a8", animation: "fadeIn 0.3s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                  <span>Connected to <strong style={{ color: "#c8b0ff" }}>{selectedDeity.name}</strong></span>
                  <span style={{ fontSize: 11 }}>
                    {selectedDeity.deprecated
                      ? "\u26A0\uFE0F Deprecated. Prayers may go to /dev/null."
                      : "\u2713 " + selectedDeity.protocol}
                  </span>
                </div>
                {selectedDeity.deprecated && (
                  <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 6, fontStyle: "italic" }}>
                    Last known activity: ~400 BCE. Community support only. No SLA.
                  </div>
                )}
              </div>
            )}

            {deity === "custom" && (
              <input value={customDeity} onChange={function (e) { setCustomDeity(e.target.value); }}
                placeholder="Enter deity name, divine API endpoint, or ex's name..."
                style={{
                  width: "100%", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
                  padding: "14px", color: "#e8e0f8", fontSize: isMobile ? 16 : 14,
                  fontFamily: "inherit", marginBottom: 18,
                }} />
            )}

            <span style={labelStyle}>Priority Level</span>
            <div style={{ display: "flex", gap: 8, marginBottom: 22, flexDirection: isMobile ? "column" : "row" }}>
              {PRIORITIES.map(function (p) {
                var isActive = priority === p.id;
                return (
                  <button key={p.id} className="priority-btn" onClick={function () { setPriority(p.id); }} style={{
                    flex: 1, background: isActive ? p.color + "22" : "rgba(255,255,255,0.03)",
                    border: "1px solid " + (isActive ? p.color : "rgba(255,255,255,0.06)"),
                    borderRadius: 10, padding: isMobile ? "10px 14px" : "12px 10px", cursor: "pointer",
                    fontFamily: "inherit", color: isActive ? p.color : "#555",
                    display: isMobile ? "flex" : "block", alignItems: "center", gap: 12,
                    textAlign: isMobile ? "left" : "center",
                  }}>
                    <div style={{ fontSize: 18, marginBottom: isMobile ? 0 : 4, flexShrink: 0 }}>{p.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                      <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7, lineHeight: 1.3 }}>{p.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <span style={labelStyle}>Prayer Topics</span>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 6, fontStyle: "italic" }}>
              One topic per line. Be specific — even omniscience appreciates good documentation.
            </div>
            <textarea value={topics} onChange={function (e) { setTopics(e.target.value); }}
              rows={isMobile ? 4 : 5}
              placeholder={placeholder}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10,
                padding: "14px", color: "#e8e0f8", fontSize: isMobile ? 16 : 14,
                fontFamily: "inherit", lineHeight: 1.6, resize: "vertical",
              }} />

            {/* Desktop transmit button */}
            {!isMobile && (
              <button className="transmit-btn" onClick={transmit} disabled={!canTransmit} style={{
                width: "100%", marginTop: 22, padding: "16px",
                background: !canTransmit ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg, #6b3fa0, #a855f7)",
                border: "none", borderRadius: 12,
                color: !canTransmit ? "#555" : "#fff",
                fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
                cursor: !canTransmit ? "not-allowed" : "pointer", fontFamily: "inherit",
                animation: canTransmit ? "glow 3s ease-in-out infinite" : "none",
              }}>
                {!deity ? "\uD83D\uDC46 Pick a deity first" : !topics.trim() ? "\u270D\uFE0F Enter your prayer topics" : "\u26A1 Transmit Prayer"}
              </button>
            )}

            {!deity && topics.trim() && (
              <div style={{ textAlign: "center", fontSize: 11, color: "#f59e0b", marginTop: 8, animation: "fadeIn 0.3s" }}>
                You've written a prayer with no recipient. That's either nihilism or a rough draft.
              </div>
            )}
          </div>
        )}

        {/* TRANSMIT */}
        {screen === "transmit" && (
          <div style={{ animation: "slideUp 0.5s ease-out" }}>
            {transmitting && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24, gap: 12 }}>
                <div style={{
                  width: 50, height: 50,
                  border: "2px solid rgba(168,130,255,0.15)",
                  borderTopColor: "#a855f7",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }} />
                <div style={{ fontSize: 10, color: "#555", letterSpacing: 2 }}>
                  ESTABLISHING DIVINE CONNECTION
                </div>
              </div>
            )}

            <div style={{
              background: "rgba(255,255,255,0.02)", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.05)",
              padding: isMobile ? "14px" : "18px", marginBottom: 24,
            }}>
              {STATUS_STEPS.map(function (s, i) {
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "8px 0",
                    opacity: i <= statusIdx ? 1 : 0.15, transition: "opacity 0.5s ease",
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                      background: i < statusIdx ? "#22c55e" : i === statusIdx ? "#a855f7" : "#222",
                      animation: (i === statusIdx && transmitting) ? "pulse 1.2s ease-in-out infinite" : "none",
                      transition: "background 0.3s",
                    }} />
                    <div style={{
                      fontSize: isMobile ? 12 : 13,
                      color: i < statusIdx ? "#6bc97a" : i === statusIdx ? "#c8b0ff" : "#333",
                      transition: "color 0.3s",
                    }}>{s}</div>
                  </div>
                );
              })}
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 10, padding: 16, marginBottom: 20, color: "#f87171",
                fontSize: 13, lineHeight: 1.6, animation: "fadeIn 0.3s",
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Transmission Error</div>
                {error}
              </div>
            )}

            {displayText && (
              <div style={{
                background: "rgba(168,130,255,0.05)", border: "1px solid rgba(168,130,255,0.12)",
                borderRadius: 14, padding: isMobile ? "16px 14px" : "20px 18px", marginBottom: 20,
                animation: "fadeIn 0.5s",
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                  color: "#8878a8", marginBottom: 12,
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span>Generated Prayer</span>
                  {!transmitting && <span style={{ color: "#555" }}>
                    {prayerText.split(/\s+/).length} words
                  </span>}
                </div>
                <div style={{
                  fontSize: isMobile ? 14 : 15, lineHeight: 1.9, color: "#d4c8ee",
                  whiteSpace: "pre-wrap",
                }}>
                  {displayText}
                  {transmitting && <span style={{ animation: "pulse 0.8s infinite", color: "#a855f7" }}> |</span>}
                </div>
              </div>
            )}

            {finalStatus && (
              <div style={{ textAlign: "center", marginBottom: 20, animation: "slideUp 0.4s ease-out" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: finalStatus.color + "15",
                  border: "1px solid " + finalStatus.color + "33",
                  borderRadius: 20, padding: "10px 22px", fontSize: 13,
                  color: finalStatus.color, fontWeight: 600, letterSpacing: 1,
                }}>
                  {finalStatus.icon} {finalStatus.label}
                </span>
                <div style={{ fontSize: 10, color: "#555", marginTop: 8, fontStyle: "italic" }}>
                  Response times may vary. Historically, they have.
                </div>
              </div>
            )}

            {!transmitting && (prayerText || error) && (
              <div style={{ textAlign: "center", animation: "fadeIn 0.5s" }}>
                <button className="transmit-btn" onClick={reset} style={{
                  background: "rgba(168,130,255,0.1)", border: "1px solid rgba(168,130,255,0.25)",
                  borderRadius: 10, padding: isMobile ? "14px 36px" : "12px 32px", color: "#c8b0ff",
                  fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "inherit",
                }}>New Prayer</button>
              </div>
            )}
          </div>
        )}

        {/* LOG */}
        {screen === "log" && (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            {prayerLog.length === 0 ? (
              <div style={{ textAlign: "center", padding: isMobile ? 30 : 40, color: "#555" }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>📡</div>
                <div style={{ fontSize: 15, color: "#777", marginBottom: 4 }}>No transmissions yet</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>
                  Your prayer history will appear here.<br />
                  For your records. And possibly His.
                </div>
              </div>
            ) : (
              <>
                <div style={{
                  fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase",
                  marginBottom: 14, textAlign: "center",
                }}>
                  {prayerLog.length} prayer{prayerLog.length !== 1 ? "s" : ""} transmitted — {prayerLog.filter(l => l.status.label === "Delivered" || l.status.label === "Acknowledged").length} confirmed received
                </div>
                {prayerLog.map(function (log) {
                  return (
                    <div key={log.id} style={{
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 12, padding: isMobile ? 14 : 16, marginBottom: 10,
                      animation: "fadeIn 0.3s",
                    }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10,
                        flexWrap: "wrap", gap: 8,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 22 }}>{log.icon}</span>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#d4c8ee" }}>{log.deity}</div>
                            <div style={{ fontSize: 10, color: "#555" }}>{log.time}</div>
                          </div>
                        </div>
                        <div style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          background: log.status.color + "12",
                          border: "1px solid " + log.status.color + "28",
                          borderRadius: 14, padding: "4px 12px", fontSize: 11, color: log.status.color,
                        }}>{log.status.icon} {log.status.label}</div>
                      </div>
                      <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Topics</div>
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 10, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{log.topics}</div>
                      <details>
                        <summary style={{ fontSize: 11, color: "#8878a8", letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", padding: "4px 0" }}>
                          View Full Prayer
                        </summary>
                        <div style={{
                          fontSize: 13, lineHeight: 1.8, color: "#b8a8d8", marginTop: 10,
                          whiteSpace: "pre-wrap", padding: "12px", background: "rgba(168,130,255,0.04)",
                          borderRadius: 8,
                        }}>
                          {log.prayer}
                        </div>
                      </details>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div style={{
          textAlign: "center", marginTop: 44, fontSize: 11, color: "#6b5f80",
          letterSpacing: 2, lineHeight: 2.4,
        }}>
          PRAYERGPT v0.1 — DIVINE COMMUNICATION AS A SERVICE<br />
          99.9% SPIRITUAL UPTIME GUARANTEED*<br />
          NOT RESPONSIBLE FOR ANSWERS DELIVERED VIA "MYSTERIOUS WAYS"<br />
          <span style={{ color: "#584d6e", fontStyle: "italic" }}>
            *uptime refers to server, not deity. results may vary across denominations.<br />
            no refunds. no returns. no proof of delivery.
          </span>
        </div>
      </div>

      {/* MOBILE STICKY TRANSMIT BUTTON */}
      {isMobile && screen === "home" && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10,
          padding: "12px 16px", paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          background: "linear-gradient(transparent, #0c0a18 30%)",
        }}>
          <button className="transmit-btn" onClick={transmit} disabled={!canTransmit} style={{
            width: "100%", padding: "16px",
            background: !canTransmit ? "rgba(40,30,60,0.95)" : "linear-gradient(135deg, #6b3fa0, #a855f7)",
            border: !canTransmit ? "1px solid rgba(255,255,255,0.08)" : "none",
            borderRadius: 12,
            color: !canTransmit ? "#555" : "#fff",
            fontSize: 15, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
            cursor: !canTransmit ? "not-allowed" : "pointer", fontFamily: "inherit",
            animation: canTransmit ? "glow 3s ease-in-out infinite" : "none",
          }}>
            {!deity ? "\uD83D\uDC46 Pick a deity" : !topics.trim() ? "\u270D\uFE0F Enter topics" : "\u26A1 Transmit Prayer"}
          </button>
        </div>
      )}
    </div>
  );
}
