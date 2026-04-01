import { useState } from "react";

const DEITIES = [
  { id: "catholic", name: "God (Catholic)", icon: "\u271D\uFE0F", protocol: "Latin Rite", greeting: "Heavenly Father" },
  { id: "protestant", name: "God (Protestant)", icon: "\u26EA", protocol: "KJV Syntax", greeting: "Dear Lord" },
  { id: "orthodox", name: "God (Orthodox)", icon: "\u2626\uFE0F", protocol: "Byzantine", greeting: "O Lord our God" },
  { id: "allah", name: "Allah", icon: "\u262A\uFE0F", protocol: "Arabic Invocation", greeting: "Bismillah" },
  { id: "vishnu", name: "Vishnu", icon: "\uD83D\uDE4F", protocol: "Sanskrit Mantra", greeting: "Om Namo Narayanaya" },
  { id: "shiva", name: "Shiva", icon: "\uD83D\uDD31", protocol: "Vedic Channel", greeting: "Om Namah Shivaya" },
  { id: "zeus", name: "Zeus (Legacy/Deprecated)", icon: "\u26A1", protocol: "Olympian v0.1", greeting: "O mighty Zeus" },
  { id: "odin", name: "Odin", icon: "\uD83E\uDE93", protocol: "Runic Broadcast", greeting: "Allfather" },
  { id: "fsm", name: "Flying Spaghetti Monster", icon: "\uD83C\uDF5D", protocol: "Pastafarian", greeting: "O Great Noodly One" },
  { id: "universe", name: "The Universe", icon: "\uD83C\uDF0C", protocol: "Quantum Broadcast", greeting: "Dear Cosmos" },
  { id: "custom", name: "Custom Endpoint", icon: "\uD83D\uDD0C", protocol: "REST API", greeting: "To Whom It May Concern" },
];

const PRIORITIES = [
  { id: "low", label: "Standard", desc: "Normal celestial routing", color: "#4a9eff" },
  { id: "medium", label: "Urgent", desc: "Priority queue", color: "#f59e0b" },
  { id: "high", label: "Emergency", desc: "Direct line", color: "#ef4444" },
];

const STATUS_STEPS = [
  "Tokenizing...",
  "Formatting per deity protocol...",
  "Opening Spiritual Socket Layer...",
  "Transmitting to divine endpoint...",
  "Awaiting acknowledgment...",
];

const FINAL_STATUSES = [
  { label: "Transmitted", color: "#22c55e", icon: "\u2713" },
  { label: "Pending Divine Review", color: "#f59e0b", icon: "\u23F3" },
  { label: "Acknowledged", color: "#22c55e", icon: "\u2726" },
  { label: "Mysterious Ways", color: "#a855f7", icon: "?" },
];

const labelStyle = {
  display: "block",
  fontSize: 10,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "#8878a8",
  marginBottom: 8,
};

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
    }, 1200);

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
      setError("Transmission failed. Divine endpoint unreachable. " + (err.message || ""));
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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #1a1040 0%, #0c0a18 40%)",
      color: "#e8e0f8",
      fontFamily: "Georgia, 'Times New Roman', serif",
      padding: "24px 16px 60px",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(168,130,255,.3)} 50%{box-shadow:0 0 40px rgba(168,130,255,.6)} }
        @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        textarea:focus,input:focus{outline:none;border-color:#a882ff !important}
      `}</style>

      <div style={{ maxWidth: 580, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🙏</div>
          <h1 style={{
            fontSize: 26, fontWeight: 400, letterSpacing: 6, textTransform: "uppercase",
            color: "#fff", margin: "0 0 4px",
            textShadow: "0 0 30px rgba(168,130,255,0.4)",
          }}>PrayerGPT</h1>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#8878a8" }}>
            Divine Communication as a Service
          </div>
        </div>

        {/* NAV */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {[["home", "Transmit"], ["log", "Log (" + prayerLog.length + ")"]].map(function (item) {
            var key = item[0];
            var label = item[1];
            var active = screen === key || (key === "home" && screen === "transmit");
            return (
              <button key={key} onClick={function () { if (!transmitting) setScreen(key); }} style={{
                background: active ? "rgba(168,130,255,0.15)" : "transparent",
                border: "1px solid " + (active ? "rgba(168,130,255,0.3)" : "rgba(255,255,255,0.08)"),
                color: active ? "#c8b0ff" : "#555",
                padding: "8px 20px", borderRadius: 6,
                cursor: transmitting ? "not-allowed" : "pointer",
                fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "inherit",
              }}>{label}</button>
            );
          })}
        </div>

        {/* HOME */}
        {screen === "home" && (
          <div>
            <span style={labelStyle}>Select Divine Endpoint</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
              {DEITIES.map(function (d) {
                return (
                  <button key={d.id} onClick={function () { setDeity(d.id); }} style={{
                    background: deity === d.id ? "rgba(168,130,255,0.15)" : "rgba(255,255,255,0.04)",
                    border: "1px solid " + (deity === d.id ? "#a855f7" : "rgba(255,255,255,0.08)"),
                    borderRadius: 8, padding: "10px 12px", textAlign: "left", cursor: "pointer",
                    color: deity === d.id ? "#e0d0ff" : "#888", fontFamily: "inherit",
                  }}>
                    <div style={{ fontSize: 18, marginBottom: 2 }}>{d.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{d.protocol}</div>
                  </button>
                );
              })}
            </div>

            {deity === "custom" && (
              <input value={customDeity} onChange={function (e) { setCustomDeity(e.target.value); }}
                placeholder="Enter deity name or divine API endpoint..."
                style={{
                  width: "100%", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
                  padding: "12px 14px", color: "#e8e0f8", fontSize: 14,
                  fontFamily: "inherit", marginBottom: 18,
                }} />
            )}

            <span style={labelStyle}>Priority Level</span>
            <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
              {PRIORITIES.map(function (p) {
                return (
                  <button key={p.id} onClick={function () { setPriority(p.id); }} style={{
                    flex: 1, background: priority === p.id ? p.color + "22" : "rgba(255,255,255,0.04)",
                    border: "1px solid " + (priority === p.id ? p.color : "rgba(255,255,255,0.08)"),
                    borderRadius: 8, padding: "10px", cursor: "pointer", textAlign: "center",
                    fontFamily: "inherit", color: priority === p.id ? p.color : "#555",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                    <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7 }}>{p.desc}</div>
                  </button>
                );
              })}
            </div>

            <span style={labelStyle}>Prayer Topics</span>
            <textarea value={topics} onChange={function (e) { setTopics(e.target.value); }} rows={5}
              placeholder={"Need money\nCar broke down\nDog is sick\nGeneral existential dread\nThat one thing I said in 2014"}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
                padding: "14px", color: "#e8e0f8", fontSize: 14,
                fontFamily: "inherit", lineHeight: 1.6, resize: "vertical",
              }} />

            <button onClick={transmit} disabled={!deity || !topics.trim()} style={{
              width: "100%", marginTop: 22, padding: "16px",
              background: (!deity || !topics.trim()) ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #6b3fa0, #a855f7)",
              border: "none", borderRadius: 10,
              color: (!deity || !topics.trim()) ? "#555" : "#fff",
              fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
              cursor: (!deity || !topics.trim()) ? "not-allowed" : "pointer", fontFamily: "inherit",
              animation: (deity && topics.trim()) ? "glow 3s ease-in-out infinite" : "none",
            }}>
              ⚡ Transmit Prayer
            </button>
          </div>
        )}

        {/* TRANSMIT */}
        {screen === "transmit" && (
          <div>
            {transmitting && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <div style={{
                  width: 44, height: 44,
                  border: "2px solid rgba(168,130,255,0.2)",
                  borderTopColor: "#a855f7",
                  borderRadius: "50%",
                  animation: "spin 1.2s linear infinite",
                }} />
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              {STATUS_STEPS.map(function (s, i) {
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "7px 0",
                    opacity: i <= statusIdx ? 1 : 0.2, transition: "opacity 0.4s",
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: i < statusIdx ? "#22c55e" : i === statusIdx ? "#a855f7" : "#333",
                      animation: (i === statusIdx && transmitting) ? "pulse 1.2s ease-in-out infinite" : "none",
                    }} />
                    <div style={{ fontSize: 13, color: i <= statusIdx ? "#c8b0ff" : "#444" }}>{s}</div>
                  </div>
                );
              })}
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 8, padding: 16, marginBottom: 20, color: "#f87171", fontSize: 13,
              }}>{error}</div>
            )}

            {displayText && (
              <div style={{
                background: "rgba(168,130,255,0.06)", border: "1px solid rgba(168,130,255,0.15)",
                borderRadius: 12, padding: "18px 16px", marginBottom: 20,
              }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#8878a8", marginBottom: 10 }}>
                  Generated Prayer
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.8, color: "#d4c8ee", whiteSpace: "pre-wrap" }}>
                  {displayText}
                  {transmitting && <span style={{ animation: "pulse 0.8s infinite" }}> |</span>}
                </div>
              </div>
            )}

            {finalStatus && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: finalStatus.color + "18",
                  border: "1px solid " + finalStatus.color + "44",
                  borderRadius: 20, padding: "10px 20px", fontSize: 13,
                  color: finalStatus.color, fontWeight: 600, letterSpacing: 1,
                }}>
                  {finalStatus.icon} {finalStatus.label}
                </span>
              </div>
            )}

            {!transmitting && (prayerText || error) && (
              <div style={{ textAlign: "center" }}>
                <button onClick={reset} style={{
                  background: "rgba(168,130,255,0.1)", border: "1px solid rgba(168,130,255,0.3)",
                  borderRadius: 8, padding: "12px 32px", color: "#c8b0ff",
                  fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "inherit",
                }}>New Prayer</button>
              </div>
            )}
          </div>
        )}

        {/* LOG */}
        {screen === "log" && (
          <div>
            {prayerLog.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#555" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📡</div>
                <div style={{ fontSize: 14 }}>No transmissions yet</div>
                <div style={{ fontSize: 12, marginTop: 4, color: "#444" }}>Your prayer log will appear here</div>
              </div>
            ) : prayerLog.map(function (log) {
              return (
                <div key={log.id} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10, padding: 16, marginBottom: 12,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{log.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#d4c8ee" }}>{log.deity}</div>
                        <div style={{ fontSize: 10, color: "#555" }}>{log.time}</div>
                      </div>
                    </div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: log.status.color + "15",
                      border: "1px solid " + log.status.color + "33",
                      borderRadius: 12, padding: "4px 10px", fontSize: 11, color: log.status.color,
                    }}>{log.status.icon} {log.status.label}</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#777", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Topics</div>
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 10, whiteSpace: "pre-wrap" }}>{log.topics}</div>
                  <details>
                    <summary style={{ fontSize: 11, color: "#8878a8", letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}>
                      View Full Prayer
                    </summary>
                    <div style={{ fontSize: 13, lineHeight: 1.7, color: "#b8a8d8", marginTop: 10, whiteSpace: "pre-wrap" }}>
                      {log.prayer}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        )}

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: 40, fontSize: 9, color: "#333", letterSpacing: 2, lineHeight: 1.8 }}>
          PRAYERGPT v0.1 — DIVINE COMMUNICATION AS A SERVICE<br />
          99.9% SPIRITUAL UPTIME GUARANTEED*<br />
          *guarantee not spiritually binding
        </div>
      </div>
    </div>
  );
}
