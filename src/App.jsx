import { useState } from "react";

const ShineLogo = ({ height = 32 }) => (
  <svg height={height} viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M38.8164 104.079C43.392 104.079 47.3954 105.167 50.8271 107.341C54.3162 109.458 56.7761 112.462 58.2061 116.353L48.6826 120.815C47.9963 118.87 46.7375 117.325 44.9072 116.181C43.1343 114.979 41.104 114.378 38.8164 114.378C37.1577 114.378 35.8415 114.722 34.8691 115.408C33.9542 116.095 33.4972 117.039 33.4971 118.24C33.4971 118.87 33.6685 119.442 34.0117 119.957C34.3549 120.472 34.8981 120.93 35.6416 121.33C36.4424 121.731 37.4147 122.103 38.5586 122.446L46.0225 124.678C49.9118 125.822 52.8862 127.567 54.9453 129.913C57.0043 132.202 58.0341 135.034 58.0342 138.409C58.0342 141.327 57.262 143.874 55.7178 146.048C54.2307 148.222 52.1431 149.939 49.4551 151.197C46.7669 152.399 43.5922 153 39.9316 153C34.7841 153 30.294 151.798 26.4619 149.396C22.6869 146.935 20.113 143.645 18.7402 139.525L28.1777 135.062C29.3788 137.58 31.0085 139.554 33.0674 140.984C35.1265 142.415 37.415 143.13 39.9316 143.13C41.7618 143.13 43.1634 142.758 44.1357 142.015C45.108 141.271 45.5937 140.241 45.5938 138.925C45.5938 138.238 45.4223 137.666 45.0791 137.208C44.736 136.693 44.2213 136.235 43.5352 135.835C42.8488 135.434 41.9905 135.091 40.9609 134.805L32.9824 132.573C29.1503 131.486 26.2046 129.741 24.1455 127.338C22.0865 124.878 21.0567 121.988 21.0566 118.67C21.0566 115.752 21.8 113.206 23.2871 111.031C24.7742 108.857 26.8617 107.169 29.5498 105.968C32.2381 104.709 35.3274 104.079 38.8164 104.079Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M201.976 104.079C205.693 104.079 208.982 104.68 211.842 105.882C214.702 107.026 217.104 108.656 219.049 110.773C221.051 112.89 222.566 115.351 223.596 118.154C224.625 120.901 225.14 123.905 225.14 127.166C225.14 128.081 225.083 128.998 224.969 129.913C224.912 130.771 224.768 131.515 224.539 132.145H191.731C191.885 133.344 192.181 134.459 192.623 135.491C193.481 137.494 194.797 139.068 196.57 140.212C198.343 141.299 200.488 141.843 203.005 141.843C205.293 141.843 207.237 141.385 208.839 140.47C210.497 139.554 211.784 138.295 212.699 136.693L222.995 141.585C222.08 143.874 220.621 145.876 218.619 147.593C216.674 149.309 214.358 150.654 211.67 151.627C208.982 152.542 206.036 153 202.833 153C197.857 153 193.539 151.913 189.878 149.738C186.217 147.507 183.386 144.532 181.384 140.812C179.382 137.094 178.381 132.974 178.381 128.454C178.381 123.762 179.411 119.585 181.47 115.923C183.586 112.261 186.418 109.372 189.964 107.255C193.51 105.138 197.514 104.079 201.976 104.079ZM201.976 114.378C199.745 114.378 197.828 114.922 196.227 116.009C194.625 117.096 193.424 118.698 192.623 120.815C192.399 121.409 192.214 122.038 192.066 122.703H211.505C211.431 121.983 211.287 121.296 211.069 120.644C210.44 118.698 209.325 117.182 207.724 116.095C206.179 114.95 204.263 114.378 201.976 114.378Z" fill="white"/>
    <path d="M75.6787 109.418C76.6593 108.043 77.8885 106.949 79.3682 106.139C81.8276 104.765 84.688 104.079 87.9482 104.079C91.4943 104.079 94.5829 104.823 97.2139 106.311C99.9021 107.798 101.989 109.887 103.477 112.576C104.964 115.208 105.708 118.298 105.708 121.846V151.97H92.8379V124.592C92.8379 122.761 92.4662 121.187 91.7227 119.871C91.0363 118.555 90.0352 117.525 88.7197 116.781C87.4615 116.038 85.9745 115.666 84.2588 115.666C82.6001 115.666 81.1124 116.037 79.7969 116.781C78.4815 117.525 77.4525 118.555 76.709 119.871C76.0226 121.187 75.6787 122.761 75.6787 124.592V151.97H62.8096V87H75.6787V109.418Z" fill="white"/>
    <path d="M124.123 151.97H111.254V105.109H124.123V151.97Z" fill="white"/>
    <path d="M155.763 104.079C159.309 104.079 162.397 104.823 165.028 106.311C167.717 107.798 169.805 109.887 171.292 112.576C172.779 115.208 173.522 118.298 173.522 121.846V151.97H160.653V124.592C160.653 122.761 160.282 121.187 159.538 119.871C158.852 118.555 157.851 117.525 156.535 116.781C155.277 116.037 153.789 115.666 152.073 115.666C150.415 115.666 148.928 116.038 147.612 116.781C146.297 117.525 145.267 118.555 144.523 119.871C143.837 121.187 143.494 122.761 143.494 124.592V151.97H130.625V105.109H142.636V110.811C143.719 108.764 145.235 107.206 147.184 106.139C149.643 104.766 152.503 104.079 155.763 104.079Z" fill="white"/>
    <path d="M117.353 88C120.936 88.0002 123.84 90.8936 123.84 94.4883C123.84 98.0791 120.936 100.972 117.353 100.973C113.767 100.973 110.867 98.0793 110.867 94.4883C110.867 90.8934 113.767 88 117.353 88Z" fill="white"/>
    <path d="M111.367 38C151.563 38 186.076 62.3239 200.993 97.0547C196.523 97.1799 192.397 98.1007 188.614 99.8174C174.186 68.2516 142.335 46.3175 105.36 46.3174C61.9889 46.3174 25.6667 76.4962 16.2451 117H15.6201C24.2635 71.9991 63.8449 38 111.367 38Z" fill="#FACA22"/>
    <path d="M119.367 27C167.02 27 207.291 58.5937 220.382 101.977C218.896 101.024 217.289 100.2 215.559 99.5078C212.244 98.1144 208.508 97.3131 204.352 97.0996C189.475 61.2298 154.118 36 112.867 36C64.338 36 23.9658 70.918 15.501 117H15C22.497 66.0825 66.3669 27 119.367 27Z" fill="#1A56FF"/>
  </svg>
);

const JOBS = [
  { id: 1, title: "Senior Software Engineer", company: "Leading MNC", location: "Bengaluru", experience: "4–8 yrs", salary: "₹18–28 LPA", type: "Full-time", tags: ["Java", "Spring Boot", "Microservices"], summary: "Work on high-scale backend systems for a Fortune 500 product company. You'll own microservices, drive design reviews, and mentor a team of 3–4 engineers." },
  { id: 2, title: "Product Manager – Growth", company: "Series B Startup", location: "Gurugram", experience: "3–6 yrs", salary: "₹20–32 LPA", type: "Full-time", tags: ["Product Strategy", "Growth", "Analytics"], summary: "Own the growth loop for a 5M+ user consumer app. Drive experimentation, work cross-functionally with design and engineering, and report directly to the CEO." },
  { id: 3, title: "Data Engineer – Lakehouse", company: "Global FinTech", location: "Hyderabad · Hybrid", experience: "3–7 yrs", salary: "₹16–26 LPA", type: "Full-time", tags: ["PySpark", "Databricks", "Delta Lake", "AWS"], summary: "Build and maintain petabyte-scale data pipelines that power real-time analytics and ML platforms for financial services clients across 12 countries." },
  { id: 4, title: "Lead Frontend Engineer", company: "SaaS Unicorn", location: "Remote (India)", experience: "5–9 yrs", salary: "₹22–36 LPA", type: "Remote", tags: ["React", "TypeScript", "Next.js"], summary: "Lead a team of 6 frontend engineers building a B2B SaaS platform used by 800+ enterprises. Own the design system, set technical direction, and ship great UX." },
  { id: 5, title: "DevOps / Platform Engineer", company: "Product Company", location: "Pune · Hybrid", experience: "4–8 yrs", salary: "₹20–30 LPA", type: "Hybrid", tags: ["Kubernetes", "Terraform", "AWS", "GitHub Actions"], summary: "Own cloud infrastructure and CI/CD for a global SaaS platform. Build internal developer tooling, manage EKS clusters, and ensure 99.9% uptime across regions." },
];

const SUPABASE_URL = "https://rbwluolctwcyqxixisfb.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZkfyWoc2f-ZMFC7ByX0ANg_OTe5yLP8";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:#0a0d14;color:#e2e8f0;min-height:100vh;-webkit-font-smoothing:antialiased}
:root{
  --bg:#0a0d14;--bg2:#0f1320;--bg3:#141929;
  --card:#131929;--card2:#1a2236;
  --border:rgba(255,255,255,.08);--border2:rgba(255,255,255,.12);
  --text:#e2e8f0;--muted:#8892a4;
  --accent:#1a56ff;--accent2:#faca22;--green:#00d68f;--red:#ff4d6d;
  --r:12px;--sh:0 4px 24px rgba(0,0,0,.4);--sh2:0 12px 48px rgba(0,0,0,.6);
}
.hdr{background:rgba(10,13,20,.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.hdr-left{display:flex;align-items:center;gap:20px}
.hdr-divider{width:1px;height:28px;background:var(--border2)}
.hdr-tagline{font-size:12px;color:var(--muted);letter-spacing:.3px}
.hdr-tagline span{color:var(--accent2);font-weight:600}
.hdr-count{background:rgba(26,86,255,.15);border:1px solid rgba(26,86,255,.3);color:#7aa2ff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:.5px}
.hero{padding:64px 24px 56px;text-align:center;background:radial-gradient(ellipse at 50% 0%,rgba(26,86,255,.18) 0%,transparent 65%),radial-gradient(ellipse at 80% 80%,rgba(250,202,34,.06) 0%,transparent 50%);border-bottom:1px solid var(--border);position:relative;overflow:hidden}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(26,86,255,.12);border:1px solid rgba(26,86,255,.25);color:#7aa2ff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:20px;margin-bottom:22px}
.blink{width:6px;height:6px;border-radius:50%;background:var(--green);display:inline-block;animation:blink 1.8s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
.hero h1{font-size:clamp(28px,5vw,52px);font-weight:800;color:#fff;line-height:1.1;margin-bottom:16px;letter-spacing:-1px}
.hero h1 .hi{color:var(--accent2)}
.hero-sub{font-size:16px;color:var(--muted);max-width:520px;margin:0 auto 36px;line-height:1.65}
.hero-stats{display:flex;gap:0;justify-content:center;flex-wrap:wrap;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:14px;max-width:520px;margin:0 auto;overflow:hidden}
.hero-stat{flex:1;min-width:120px;padding:18px 20px;text-align:center;border-right:1px solid var(--border)}
.hero-stat:last-child{border-right:none}
.hs-n{font-size:22px;font-weight:800;color:#fff;line-height:1}
.hs-l{font-size:11px;color:var(--muted);margin-top:3px;letter-spacing:.5px}
.wrap{max-width:860px;margin:0 auto;padding:48px 20px 60px}
.jobs-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px}
.jobs-title{font-size:13px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px}
.jobs-badge{background:rgba(0,214,143,.1);border:1px solid rgba(0,214,143,.25);color:var(--green);font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px}
.jcard{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin-bottom:12px;transition:all .22s ease;position:relative;overflow:hidden}
.jcard::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--accent),#7aa2ff);transform:scaleY(0);transform-origin:bottom;transition:transform .22s ease}
.jcard:hover{border-color:rgba(26,86,255,.4);background:var(--card2);box-shadow:var(--sh);transform:translateY(-2px)}
.jcard:hover::before{transform:scaleY(1)}
.jcard-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
.jcard-main{flex:1;min-width:0}
.jcard-company{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.8px;text-transform:uppercase;margin-bottom:5px}
.jcard-title{font-size:19px;font-weight:700;color:#fff;margin-bottom:12px;line-height:1.25}
.jcard-meta{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:12px}
.meta-item{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);font-weight:500}
.meta-item svg{color:#7aa2ff;flex-shrink:0}
.jcard-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.jtag{background:rgba(26,86,255,.1);border:1px solid rgba(26,86,255,.2);color:#7aa2ff;font-size:11px;font-weight:600;padding:3px 9px;border-radius:6px}
.jcard-summary{font-size:13px;color:var(--muted);line-height:1.65}
.jcard-right{display:flex;flex-direction:column;align-items:flex-end;gap:10px;flex-shrink:0}
.salary-tag{background:rgba(250,202,34,.1);border:1px solid rgba(250,202,34,.25);color:var(--accent2);font-size:13px;font-weight:700;padding:6px 14px;border-radius:8px;white-space:nowrap}
.apply-btn{background:linear-gradient(135deg,var(--accent),#4d7fff);color:#fff;border:none;cursor:pointer;font-size:13px;font-weight:700;padding:10px 22px;border-radius:8px;font-family:inherit;white-space:nowrap;transition:all .2s}
.apply-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(26,86,255,.5);filter:brightness(1.1)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:var(--bg2);border:1px solid var(--border2);border-radius:16px;padding:36px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.7);animation:slideUp .22s ease;position:relative}
@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-close{position:absolute;top:16px;right:18px;background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--muted);width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .18s}
.modal-close:hover{background:rgba(255,255,255,.12);color:#fff}
.modal-job-pill{display:flex;align-items:center;gap:10px;background:rgba(26,86,255,.1);border:1px solid rgba(26,86,255,.2);border-radius:10px;padding:12px 16px;margin-bottom:26px}
.mjp-title{font-size:14px;font-weight:700;color:#fff}
.mjp-sub{font-size:12px;color:var(--muted)}
.modal-h{font-size:24px;font-weight:800;color:#fff;margin-bottom:5px;letter-spacing:-.5px}
.modal-sub{font-size:14px;color:var(--muted);margin-bottom:26px}
.divider{height:1px;background:var(--border);margin:22px 0}
.fl{font-size:10px;font-weight:700;color:#7aa2ff;text-transform:uppercase;letter-spacing:2px;margin-bottom:13px}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:13px}
@media(max-width:500px){.r2{grid-template-columns:1fr}.jcard-top{flex-direction:column}.jcard-right{align-items:flex-start}}
.fg{margin-bottom:14px}
.lbl{font-size:12px;font-weight:600;color:rgba(255,255,255,.7);margin-bottom:5px;display:block}
.opt{font-weight:400;color:var(--muted)}
.inp{width:100%;background:rgba(255,255,255,.05);border:1.5px solid var(--border2);border-radius:8px;padding:10px 13px;font-family:inherit;font-size:14px;color:#fff;transition:all .18s;outline:none}
.inp:focus{border-color:rgba(26,86,255,.6);background:rgba(26,86,255,.08);box-shadow:0 0 0 3px rgba(26,86,255,.15)}
.inp::placeholder{color:rgba(255,255,255,.2)}
.inp.err{border-color:var(--red)}
.inp option{background:#1a2236;color:#fff}
.err-t{font-size:12px;color:var(--red);margin-top:3px}
.upzone{border:2px dashed rgba(255,255,255,.1);border-radius:10px;padding:24px;text-align:center;cursor:pointer;transition:all .2s;background:rgba(255,255,255,.02)}
.upzone:hover,.upzone.drag{border-color:rgba(26,86,255,.5);background:rgba(26,86,255,.07)}
.upzone.done{border-color:rgba(0,214,143,.4);background:rgba(0,214,143,.05)}
.up-t{font-size:13px;color:var(--muted)}
.up-t strong{color:#7aa2ff}
.up-hint{font-size:11px;color:rgba(255,255,255,.2);margin-top:3px}
.up-ok{font-size:13px;color:var(--green);font-weight:600;margin-top:5px}
.submit-btn{width:100%;background:linear-gradient(135deg,var(--accent),#4d7fff);color:#fff;border:none;cursor:pointer;font-size:15px;font-weight:700;padding:14px;border-radius:10px;font-family:inherit;margin-top:12px;transition:all .2s;letter-spacing:.3px}
.submit-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 28px rgba(26,86,255,.5)}
.submit-btn:disabled{opacity:.5;cursor:not-allowed}
.success-modal{text-align:center;padding:12px 0}
.s-ic{font-size:64px;display:block;margin-bottom:16px;animation:pop .4s ease}
@keyframes pop{0%{transform:scale(.3);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
.s-h{font-size:26px;font-weight:800;color:#fff;margin-bottom:8px;letter-spacing:-.5px}
.s-p{font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:24px}
.s-box{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:18px;margin-bottom:22px;text-align:left}
.s-row{display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:1px solid var(--border)}
.s-row:last-child{border:none}
.s-k{color:var(--muted)}.s-v{font-weight:600;color:#fff}
.id-pill{background:linear-gradient(135deg,var(--accent),#4d7fff);color:#fff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:6px}
.close-btn{background:rgba(255,255,255,.08);border:1px solid var(--border2);color:#fff;cursor:pointer;font-size:14px;font-weight:600;padding:11px 28px;border-radius:9px;font-family:inherit;transition:all .2s}
.close-btn:hover{background:rgba(255,255,255,.14)}
.footer{border-top:1px solid var(--border);padding:28px 24px;display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap}
.footer-text{font-size:12px;color:rgba(255,255,255,.25);letter-spacing:.3px}
`;

const Ic = ({ n, s = 13 }) => {
  const p = {
    loc: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>,
    bag: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    remote: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    up: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p[n]}</svg>;
};

function RegModal({ job, onClose }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", years_exp: "", notice_period: "", current_salary: "", expected_salary: "" });
  const [cv, setCv] = useState(null);
  const [drag, setDrag] = useState(false);
  const [errs, setErrs] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const clr = k => setErrs(p => ({ ...p, [k]: "" }));

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Full name is required";
    if (!f.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s+/g, ""))) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (f.email && !/\S+@\S+\.\S+/.test(f.email)) e.email = "Enter a valid email";
    return e;
  };

  const handleFile = file => {
    if (!file) return;
    const ok = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!ok.includes(file.type)) return alert("PDF or Word only.");
    if (file.size > 5 * 1024 * 1024) return alert("Max 5 MB.");
    setCv(file);
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setBusy(true);
    try {
      const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm");
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const id = "SHN-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      const { error } = await supabase.from("applications").insert([{
        id,
        job_id: String(job.id),
        job_title: job.title,
        job_location: job.location,
        company_id: "shine",
        name: f.name,
        phone: f.phone,
        email: f.email || null,
        years_exp: f.years_exp || null,
        notice_period: f.notice_period || null,
        current_salary: f.current_salary || null,
        expected_salary: f.expected_salary || null,
        cv_filename: cv ? cv.name : null,
      }]);
      if (error) throw error;
      setDone({ ...f, id, job_title: job.title });
    } catch (err) {
      alert("Submission failed. Please try again.");
      console.error(err);
    } finally { setBusy(false); }
  };

  if (done) return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="success-modal">
          <span className="s-ic">🎉</span>
          <div className="s-h">You're Registered!</div>
          <p className="s-p">Our talent team will review your profile and reach out within 2 business days.</p>
          <div className="s-box">
            {[["Application ID", <span className="id-pill">{done.id}</span>], ["Name", done.name], ["Phone", done.phone], done.email && ["Email", done.email], ["Applied For", done.job_title]].filter(Boolean).map(([k, v]) => (
              <div key={k} className="s-row"><span className="s-k">{k}</span><span className="s-v">{v}</span></div>
            ))}
          </div>
          <button className="close-btn" onClick={onClose}>Back to Jobs</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-job-pill">
          <span style={{ fontSize: 20 }}>💼</span>
          <div>
            <div className="mjp-title">{job.title}</div>
            <div className="mjp-sub">{job.company} · {job.location}</div>
          </div>
        </div>
        <div className="modal-h">Apply Now</div>
        <div className="modal-sub">Fill in your details and we'll be in touch within 2 days.</div>

        <div className="fl">Personal Details</div>
        <div className="r2">
          <div className="fg">
            <label className="lbl">Full Name</label>
            <input className={`inp${errs.name ? " err" : ""}`} placeholder="Ravi Kumar" value={f.name} onChange={e => { set("name", e.target.value); clr("name"); }} />
            {errs.name && <div className="err-t">{errs.name}</div>}
          </div>
          <div className="fg">
            <label className="lbl">Mobile Number</label>
            <input className={`inp${errs.phone ? " err" : ""}`} placeholder="10-digit mobile" value={f.phone} onChange={e => { set("phone", e.target.value); clr("phone"); }} />
            {errs.phone && <div className="err-t">{errs.phone}</div>}
          </div>
        </div>
        <div className="fg">
          <label className="lbl">Email Address <span className="opt">(optional)</span></label>
          <input className={`inp${errs.email ? " err" : ""}`} placeholder="you@email.com" value={f.email} onChange={e => { set("email", e.target.value); clr("email"); }} />
          {errs.email && <div className="err-t">{errs.email}</div>}
        </div>

        <div className="divider" />
        <div className="fl">Experience <span style={{ color: "rgba(255,255,255,.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optional</span></div>
        <div className="r2">
          <div className="fg">
            <label className="lbl">Total Experience <span className="opt">(years)</span></label>
            <input className="inp" placeholder="e.g. 5" value={f.years_exp} onChange={e => set("years_exp", e.target.value)} />
          </div>
          <div className="fg">
            <label className="lbl">Notice Period</label>
            <select className="inp" value={f.notice_period} onChange={e => set("notice_period", e.target.value)}>
              <option value="">Select</option>
              {["Immediate", "15 days", "30 days", "45 days", "60 days", "90 days"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="r2">
          <div className="fg">
            <label className="lbl">Current CTC <span className="opt">(LPA)</span></label>
            <input className="inp" placeholder="e.g. 12" value={f.current_salary} onChange={e => set("current_salary", e.target.value)} />
          </div>
          <div className="fg">
            <label className="lbl">Expected CTC <span className="opt">(LPA)</span></label>
            <input className="inp" placeholder="e.g. 18" value={f.expected_salary} onChange={e => set("expected_salary", e.target.value)} />
          </div>
        </div>

        <div className="divider" />
        <div className="fl">Resume / CV <span style={{ color: "rgba(255,255,255,.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optional</span></div>
        <div
          className={`upzone${drag ? " drag" : ""}${cv ? " done" : ""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById("cv-file-inp").click()}
        >
          <div style={{ color: "#7aa2ff", marginBottom: 6 }}><Ic n="up" s={22} /></div>
          {cv
            ? <div className="up-ok">✓ {cv.name}</div>
            : <><div className="up-t"><strong>Click to upload</strong> or drag & drop</div><div className="up-hint">PDF or Word · max 5 MB</div></>
          }
          <input id="cv-file-inp" type="file" style={{ display: "none" }} accept=".pdf,.doc,.docx" onChange={e => handleFile(e.target.files[0])} />
        </div>

        <button className="submit-btn" onClick={submit} disabled={busy}>
          {busy ? "Submitting…" : "Submit Application →"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <>
      <style>{CSS}</style>

      <header className="hdr">
        <div className="hdr-left">
          <ShineLogo height={28} />
          <div className="hdr-divider" />
          <div className="hdr-tagline">Exclusive <span>Premium Roles</span></div>
        </div>
        <div className="hdr-count">{JOBS.length} OPENINGS</div>
      </header>

      <section className="hero">
        <div className="hero-eyebrow"><span className="blink" />Actively Hiring · June 2025</div>
        <h1>Find Your Next<br /><span className="hi">Dream Role</span></h1>
        <p className="hero-sub">Handpicked opportunities from top companies — vetted, high-growth, and ready to interview you.</p>
        <div className="hero-stats">
          <div className="hero-stat"><div className="hs-n">{JOBS.length}</div><div className="hs-l">Open Roles</div></div>
          <div className="hero-stat"><div className="hs-n">₹16–36L</div><div className="hs-l">Salary Range</div></div>
          <div className="hero-stat"><div className="hs-n">2 Days</div><div className="hs-l">Response Time</div></div>
          <div className="hero-stat"><div className="hs-n">Top Co.</div><div className="hs-l">Only MNCs</div></div>
        </div>
      </section>

      <div className="wrap">
        <div className="jobs-header">
          <div className="jobs-title">Current Openings</div>
          <div className="jobs-badge">● Updated Today</div>
        </div>
        {JOBS.map(job => (
          <div key={job.id} className="jcard">
            <div className="jcard-top">
              <div className="jcard-main">
                <div className="jcard-company">{job.company}</div>
                <div className="jcard-title">{job.title}</div>
                <div className="jcard-meta">
                  <span className="meta-item"><Ic n="loc" />{job.location}</span>
                  <span className="meta-item"><Ic n="bag" />{job.experience}</span>
                  <span className="meta-item"><Ic n="remote" />{job.type}</span>
                </div>
                <div className="jcard-tags">{job.tags.map(t => <span key={t} className="jtag">{t}</span>)}</div>
                <div className="jcard-summary">{job.summary}</div>
              </div>
              <div className="jcard-right">
                <div className="salary-tag">{job.salary}</div>
                <button className="apply-btn" onClick={() => setActiveJob(job)}>Apply Now →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <ShineLogo height={22} />
        <div className="footer-text">© 2025 Shine.com · All Rights Reserved · Premium Talent Platform</div>
      </footer>

      {activeJob && <RegModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  );
}
