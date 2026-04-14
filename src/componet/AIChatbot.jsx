import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are a friendly and helpful assistant for a Tuition Management Platform. You specialize in three main areas:

1. TUITION সম্পর্কে:
- Student রা Dashboard > "Post New Tuition" থেকে tuition post করতে পারে
- Subject, level (SSC/HSC/University etc.), salary, location, mode (online/offline), days per week, preferred time দিতে হয়
- Tuition status: Pending → Approved → Rejected
- Dashboard > "My Tuitions" এ নিজের সব tuition দেখা যায়
- Admin থেকে approve হলে tutor assign হয়

2. TUTOR খোঁজা:
- /tutors পেজে সব available tutors দেখা যায়
- Student রা tutor profile দেখে apply করতে পারে
- Dashboard > "Applied Tutors" এ application status track করা যায়
- Approved tutors এর সাথে payment করলে tuition confirm হয়

3. PAYMENT সংক্রান্ত:
- Payment Stripe দিয়ে হয় (credit/debit card, USD)
- Tutor profile page থেকে payment করা যায়
- Dashboard > "Payment History" তে সব payment দেখা যায়
- Tutor রা "Revenue History" তে income দেখতে পারে
- Payment করলে automatically tuition ও tutor status "Approved" হয়

Dashboard routes:
- /dashboard/overview, /dashboard/post-tuition, /dashboard/my-tuitions
- /dashboard/applied-tutors, /dashboard/my-applications, /dashboard/ongoing-tuition
- /dashboard/revenue-history, /dashboard/payment-history, /dashboard/profile
- /tutors, /tuitions

Always respond in the SAME LANGUAGE the user uses. Be concise, warm, and helpful.`;

const suggestedQuestions = [
  "কিভাবে tuition post করবো?",
  "কিভাবে টিউটর খুঁজবো?",
  "Payment কিভাবে করবো?",
  "Tuition status কোথায় দেখবো?",
  "How do I apply for a tutor?",
  "What payment methods are accepted?",
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "আসসালামুয়ালাইকুম! 👋 আমি আপনার Tuition Platform Assistant। tuition, tutor, বা payment সম্পর্কে যেকোনো প্রশ্ন করুন!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const updatedMessages = [...messages, { role: "user", content: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.reply || "উত্তর পাওয়া যায়নি।" }]);
    } catch (err) {
      setMessages([...updatedMessages, {
        role: "assistant",
        content: `⚠️ সংযোগে সমস্যা হয়েছে।\nBackend চালু আছে কিনা দেখুন। (${err.message})`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 10000,
          width: "62px", height: "62px", borderRadius: "50%",
          background: open
            ? "linear-gradient(135deg, #f43f5e, #e11d48)"
            : "linear-gradient(135deg, #6366f1, #4338ca)",
          border: "none", cursor: "pointer",
          boxShadow: open
            ? "0 8px 32px rgba(244,63,94,0.5)"
            : "0 8px 32px rgba(99,102,241,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: open ? "rotate(90deg) scale(1.08)" : "scale(1)",
        }}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
            <circle cx="9" cy="10" r="1.2" fill="#818cf8"/>
            <circle cx="12" cy="10" r="1.2" fill="#818cf8"/>
            <circle cx="15" cy="10" r="1.2" fill="#818cf8"/>
          </svg>
        )}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
          width: "62px", height: "62px", borderRadius: "50%",
          border: "2px solid rgba(99,102,241,0.45)",
          animation: "chatPulse 2.2s ease-out infinite", pointerEvents: "none",
        }} />
      )}

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 9990,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Chat Modal ── */}
      <div style={{
        position: "fixed",
        bottom: "108px", right: "28px",
        zIndex: 9995,
        width: "min(580px, calc(100vw - 40px))",
        height: "min(700px, calc(100vh - 150px))",
        borderRadius: "24px",
        background: "#0d0d12",
        boxShadow: "0 32px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transformOrigin: "bottom right",
        fontFamily: "'Segoe UI', 'Noto Sans Bengali', system-ui, sans-serif",
      }}>

        {/* Header */}
        <div style={{
          padding: "20px 24px",
          background: "linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #7c3aed 100%)",
          display: "flex", alignItems: "center", gap: "14px",
          flexShrink: 0, position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-30px", right: "80px",
            width: "130px", height: "130px", borderRadius: "50%",
            background: "rgba(255,255,255,0.05)", pointerEvents: "none",
          }}/>
          <div style={{
            position: "absolute", bottom: "-40px", right: "10px",
            width: "100px", height: "100px", borderRadius: "50%",
            background: "rgba(255,255,255,0.04)", pointerEvents: "none",
          }}/>

          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px", flexShrink: 0, zIndex: 1,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}>🎓</div>

          <div style={{ zIndex: 1, flex: 1 }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: "17px", marginBottom: "4px" }}>
              Tuition Assistant
            </div>
            <div style={{
              color: "rgba(255,255,255,0.72)", fontSize: "12.5px",
              display: "flex", alignItems: "center", gap: "7px",
            }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#4ade80", display: "inline-block",
                boxShadow: "0 0 10px #4ade80",
                animation: "statusPulse 2s ease-in-out infinite",
              }}/>
              AI-powered · সবসময় অনলাইন
            </div>
          </div>

          <button
            onClick={() => setMessages([{ role: "assistant", content: "চ্যাট রিসেট! 😊 নতুন প্রশ্ন করুন।" }])}
            style={{
              zIndex: 1,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "10px", color: "rgba(255,255,255,0.9)",
              padding: "7px 16px", fontSize: "13px", cursor: "pointer",
              fontFamily: "inherit", fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
          >
            🗑 Clear
          </button>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div style={{ padding: "16px 20px 0", flexShrink: 0 }}>
            <p style={{
              color: "rgba(165,180,252,0.6)", fontSize: "11px",
              margin: "0 0 10px", letterSpacing: "0.6px",
              textTransform: "uppercase", fontWeight: 600,
            }}>
              💡 জনপ্রিয় প্রশ্ন
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: "8px 14px", borderRadius: "22px",
                    border: "1px solid rgba(99,102,241,0.3)",
                    background: "rgba(99,102,241,0.07)",
                    color: "#a5b4fc", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "inherit", lineHeight: 1.3,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.2)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.65)";
                    e.currentTarget.style.color = "#c7d2fe";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.07)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                    e.currentTarget.style.color = "#a5b4fc";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >{q}</button>
              ))}
            </div>
            <div style={{ height: "1px", background: "rgba(99,102,241,0.1)", marginTop: "16px" }} />
          </div>
        )}

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "20px 22px",
          display: "flex", flexDirection: "column", gap: "16px",
          scrollbarWidth: "thin", scrollbarColor: "#2d2d3a transparent",
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-end", gap: "10px",
              animation: "msgIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", flexShrink: 0,
                  boxShadow: "0 3px 14px rgba(99,102,241,0.45)",
                }}>🎓</div>
              )}

              <div style={{
                maxWidth: "70%",
                padding: "12px 18px",
                borderRadius: msg.role === "user"
                  ? "22px 22px 5px 22px"
                  : "22px 22px 22px 5px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #6366f1, #4338ca)"
                  : "#181824",
                color: msg.role === "user" ? "white" : "#dde1f5",
                fontSize: "14.5px",
                lineHeight: "1.65",
                border: msg.role === "assistant"
                  ? "1px solid rgba(99,102,241,0.2)"
                  : "none",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
                boxShadow: msg.role === "user"
                  ? "0 6px 24px rgba(99,102,241,0.4)"
                  : "0 3px 14px rgba(0,0,0,0.35)",
              }}>
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "15px", flexShrink: 0,
                  boxShadow: "0 3px 14px rgba(99,102,241,0.4)",
                }}>👤</div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", animation: "msgIn 0.2s ease" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
              }}>🎓</div>
              <div style={{
                padding: "14px 20px", borderRadius: "22px 22px 22px 5px",
                background: "#181824", border: "1px solid rgba(99,102,241,0.2)",
                display: "flex", gap: "6px", alignItems: "center",
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "#6366f1", display: "inline-block",
                    animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "16px 20px 18px",
          borderTop: "1px solid rgba(99,102,241,0.12)",
          background: "#0f0f18", flexShrink: 0,
        }}>
          <div style={{
            display: "flex", gap: "10px", alignItems: "flex-end",
            background: "#181824", borderRadius: "18px",
            border: "1px solid rgba(99,102,241,0.2)",
            padding: "8px 8px 8px 18px",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
            onFocusCapture={e => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
            }}
            onBlurCapture={e => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="প্রশ্ন করুন... (Enter = send, Shift+Enter = নতুন লাইন)"
              disabled={loading}
              rows={1}
              style={{
                flex: 1, background: "transparent", border: "none",
                color: "#e2e2f0", padding: "8px 0",
                fontSize: "14.5px", outline: "none", resize: "none",
                maxHeight: "130px", lineHeight: "1.55",
                fontFamily: "inherit", scrollbarWidth: "none",
              }}
              onInput={e => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 130) + "px";
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: "46px", height: "46px", borderRadius: "13px",
                background: loading || !input.trim()
                  ? "rgba(99,102,241,0.18)"
                  : "linear-gradient(135deg, #6366f1, #4338ca)",
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
                boxShadow: loading || !input.trim() ? "none" : "0 4px 18px rgba(99,102,241,0.45)",
              }}
              onMouseEnter={e => {
                if (!loading && input.trim())
                  e.currentTarget.style.transform = "scale(1.08) translateY(-1px)";
              }}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                  stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p style={{
            textAlign: "center", color: "rgba(99,102,241,0.35)",
            fontSize: "11.5px", margin: "10px 0 0", letterSpacing: "0.2px",
          }}>
            ✨ Powered by Claude AI · Tuition Platform Assistant
          </p>
        </div>
      </div>

      <style>{`
        @keyframes chatPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-7px); opacity: 1; }
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #4ade80; }
          50% { opacity: 0.6; box-shadow: 0 0 4px #4ade80; }
        }
      `}</style>
    </>
  );
}