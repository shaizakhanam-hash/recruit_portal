import { useState, useEffect, useCallback } from "react";

const ADMIN_PASSWORD = "recruit@admin2025";

// ── MOCK DB ──────────────────────────────────────────────────
const db = (() => {
  let companies = [
    { id: "hcl", name: "HCL Technologies", slug: "hcl", logo: "H", color: "#0057ff", tagline: "Build the future of enterprise technology." },
  ];
  let jobs = [
    { id: "j1", company_id: "hcl", active: true, title: "Senior Software Engineer – Java", department: "Product Engineering", location: "Noida, UP", type: "Full-time · Hybrid", experience: "4–8 Years", salary: "₹18–28 LPA", skills: ["Java", "Spring Boot", "Microservices", "Kafka"], about: "Join our product engineering group to design and scale mission-critical enterprise software used by Fortune 500 clients.", responsibilities: ["Architect Java microservices on Spring Boot", "Own performance and observability", "Drive technical design reviews", "Mentor junior engineers"], requirements: ["4+ years Java / Spring Boot", "Distributed systems knowledge", "MySQL/PostgreSQL experience"], perks: ["ESOPs after 2 yrs", "Health + Life insurance", "Remote Fridays"], created_at: new Date().toISOString() },
    { id: "j2", company_id: "hcl", active: true, title: "Lead Frontend Engineer – React", department: "UI Platform", location: "Bengaluru, KA", type: "Full-time · Hybrid", experience: "5–9 Years", salary: "₹22–35 LPA", skills: ["React", "TypeScript", "Next.js", "GraphQL"], about: "Own the front-end architecture for HCL's next-generation SaaS platform reaching 2M+ users globally.", responsibilities: ["Define frontend engineering roadmap", "Build shared component library", "Mentor frontend team of 6"], requirements: ["5+ years React/TypeScript", "Led a frontend team of 3+", "Strong design sensibility"], perks: ["ESOPs after 2 yrs", "MacBook Pro", "Quarterly offsites"], created_at: new Date().toISOString() },
  ];
  let applications = [];
  let _jid = 100;

  return {
    getCompanies: () => [...companies],
    getCompany: (id) => companies.find(c => c.id === id) || null,
    addCompany: (data) => { const c = { ...data, id: data.slug, logo: data.name.charAt(0).toUpperCase(), created_at: new Date().toISOString() }; companies = [...companies, c]; return c; },
    updateCompany: (id, data) => { companies = companies.map(c => c.id === id ? { ...c, ...data } : c); return companies.find(c => c.id === id); },
    deleteCompany: (id) => { companies = companies.filter(c => c.id !== id); },
    getJobs: (company_id) => jobs.filter(j => j.company_id === company_id),
    addJob: (data) => { const j = { ...data, id: "j" + (++_jid), active: true, created_at: new Date().toISOString() }; jobs = [j, ...jobs]; return j; },
    updateJob: (id, data) => { jobs = jobs.map(j => j.id === id ? { ...j, ...data } : j); },
    deleteJob: (id) => { jobs = jobs.filter(j => j.id !== id); },
    saveApplication: (data) => { const a = { ...data, id: "APP-" + Math.random().toString(36).slice(2, 8).toUpperCase(), created_at: new Date().toISOString() }; applications = [a, ...applications]; return a; },
    getApplications: (company_id) => applications.filter(a => a.company_id === company_id),
  };
})();

// ── STYLES ───────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Outfit',sans-serif;background:#f2f4f8;color:#111827}
:root{--navy:#0b1f3a;--blue:#1a3a6b;--accent:#0057ff;--a2:#00c2ff;--green:#00c896;--red:#e53e3e;--muted:#6b7280;--border:#dde3ef;--bg:#f2f4f8;--card:#fff;--r:14px;--sh:0 2px 12px rgba(0,0,0,.07);--sh2:0 8px 40px rgba(0,0,0,.13)}

.nav{background:var(--navy);height:62px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid rgba(0,87,255,.4)}
.nav-brand{display:flex;align-items:center;gap:11px;cursor:pointer;border:none;background:none;font-family:inherit}
.nav-logo{width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif',serif;font-size:20px;color:#fff;flex-shrink:0}
.nav-name{color:#fff;font-size:15px;font-weight:700;text-align:left}
.nav-sub{color:rgba(255,255,255,.4);font-size:11px;letter-spacing:.8px;text-transform:uppercase}
.nav-live{background:rgba(0,200,150,.12);border:1px solid rgba(0,200,150,.3);color:var(--green);font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px}
.nav-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.65);font-size:12px;font-weight:600;padding:6px 14px;border-radius:7px;cursor:pointer;font-family:inherit;transition:all .2s}
.nav-btn:hover{background:rgba(255,255,255,.16);color:#fff}

.hero{padding:56px 24px 48px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 75% 20%,rgba(255,255,255,.1) 0%,transparent 55%)}
.hero-pill{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.9);font-size:12px;font-weight:600;letter-spacing:.8px;padding:5px 14px;border-radius:20px;text-transform:uppercase;margin-bottom:18px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:blink 1.8s infinite;display:inline-block}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
.hero h1{font-family:'Instrument Serif',serif;font-size:clamp(28px,5vw,50px);color:#fff;line-height:1.12;margin-bottom:14px}
.hero h1 em{font-style:italic;background:linear-gradient(90deg,#7dd3fc,#bfdbfe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-p{color:rgba(255,255,255,.6);font-size:15px;max-width:460px;margin:0 auto 32px;line-height:1.65}
.hero-stats{display:flex;gap:32px;justify-content:center;flex-wrap:wrap}
.sn{font-size:26px;font-weight:800;color:#fff;line-height:1}
.sl{font-size:11px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px;margin-top:2px}

.wrap{max-width:900px;margin:0 auto;padding:40px 20px}
.sec-lbl{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:18px}

.jcard{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:22px 24px;margin-bottom:12px;cursor:pointer;box-shadow:var(--sh);transition:all .2s;display:flex;justify-content:space-between;align-items:flex-start;gap:14px;position:relative;overflow:hidden}
.jcard-left{width:4px;position:absolute;left:0;top:0;bottom:0;border-radius:4px 0 0 4px;transform:scaleY(0);transform-origin:bottom;transition:transform .2s}
.jcard:hover .jcard-left{transform:scaleY(1)}
.jcard:hover{box-shadow:var(--sh2);transform:translateY(-2px)}
.jd-dept{font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;margin-bottom:5px}
.jd-title{font-size:18px;font-weight:700;color:var(--navy);margin-bottom:10px;line-height:1.25}
.jcard-meta{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:11px}
.m{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);font-weight:500}
.tags{display:flex;flex-wrap:wrap;gap:5px}
.tag{background:#eff3ff;color:#2a4cc4;font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px}
.sal{background:linear-gradient(135deg,#e8f5e9,#ccf7e8);color:#0a7a50;font-size:12px;font-weight:700;padding:4px 11px;border-radius:20px;white-space:nowrap;border:1px solid rgba(0,200,150,.25);align-self:flex-start;flex-shrink:0}
.view-btn{color:#fff;border:none;cursor:pointer;font-size:13px;font-weight:700;padding:10px 18px;border-radius:9px;white-space:nowrap;font-family:inherit;transition:all .2s;flex-shrink:0;align-self:center}
.view-btn:hover{transform:translateY(-1px);filter:brightness(1.1)}

.back{display:inline-flex;align-items:center;gap:7px;color:var(--blue);font-size:13px;font-weight:600;cursor:pointer;background:none;border:none;font-family:inherit;margin-bottom:20px;padding:6px 0;transition:gap .18s}
.back:hover{gap:11px}
.jd-hero{border-radius:var(--r);padding:32px;margin-bottom:14px;color:#fff}
.jd-title2{font-family:'Instrument Serif',serif;font-size:clamp(22px,4vw,34px);margin-bottom:16px;line-height:1.15}
.jd-meta2{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
.jdm{display:flex;align-items:center;gap:5px;font-size:13px;color:rgba(255,255,255,.7);font-weight:500}
.jd-sal{display:inline-flex;align-items:center;gap:7px;background:rgba(0,200,150,.15);border:1px solid rgba(0,200,150,.3);color:var(--green);font-size:14px;font-weight:700;padding:7px 15px;border-radius:8px}
.sec{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin-bottom:12px;box-shadow:var(--sh)}
.sec-h{font-size:14px;font-weight:700;color:var(--navy);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)}
.sec-p{font-size:14px;color:#4b5563;line-height:1.75}
.ul{list-style:none}
.ul li{font-size:14px;color:#4b5563;line-height:1.65;padding:4px 0 4px 20px;position:relative}
.ul li::before{content:'→';position:absolute;left:0;top:6px;color:var(--accent);font-size:11px}
.perks-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px}
.perk{background:#f0f4ff;border:1px solid #d4e0ff;border-radius:9px;padding:9px 12px;font-size:13px;color:#1a3a6b;font-weight:500}
.cta-box{border-radius:var(--r);padding:32px;text-align:center;color:#fff;margin-top:4px}
.cta-box h3{font-family:'Instrument Serif',serif;font-size:24px;margin-bottom:7px}
.cta-box p{color:rgba(255,255,255,.6);font-size:14px;margin-bottom:20px}
.cta-btn{background:rgba(255,255,255,.18);border:1.5px solid rgba(255,255,255,.4);color:#fff;cursor:pointer;font-size:15px;font-weight:700;padding:13px 34px;border-radius:10px;font-family:inherit;transition:all .2s}
.cta-btn:hover{background:rgba(255,255,255,.28);transform:translateY(-2px)}

.form-wrap{max-width:640px;margin:0 auto;padding:36px 20px}
.form-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:36px;box-shadow:var(--sh)}
.job-pill{border-radius:10px;padding:12px 16px;margin-bottom:26px;display:flex;align-items:center;gap:10px}
.jp-r{font-size:14px;font-weight:700;color:var(--navy)}
.jp-l{font-size:12px;color:var(--muted)}
.fh{font-family:'Instrument Serif',serif;font-size:28px;color:var(--navy);margin-bottom:5px}
.fs{font-size:14px;color:var(--muted);margin-bottom:26px}
.div{height:1px;background:var(--border);margin:22px 0}
.fl{font-size:11px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:13px}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:13px}
@media(max-width:540px){.r2{grid-template-columns:1fr}.jcard{flex-direction:column}}
.fg{margin-bottom:15px}
.lbl{font-size:13px;font-weight:600;color:#374151;margin-bottom:5px;display:block}
.opt{font-weight:400;color:var(--muted);font-size:11px}
.inp{width:100%;background:#f9fafc;border:1.5px solid var(--border);border-radius:8px;padding:10px 13px;font-family:inherit;font-size:14px;color:#111;transition:all .18s;outline:none}
.inp:focus{border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px rgba(0,87,255,.1)}
.inp::placeholder{color:#c0c8d8}
.inp.e{border-color:var(--red)}
.et{font-size:12px;color:var(--red);margin-top:3px}
.upz{border:2px dashed var(--border);border-radius:10px;padding:24px;text-align:center;cursor:pointer;transition:all .2s;background:#f9fafc}
.upz:hover,.upz.drag{border-color:var(--accent);background:#f0f4ff}
.upz.done{border-color:var(--green);background:rgba(0,200,150,.04)}
.ut{font-size:13px;color:var(--muted)}
.ut strong{color:var(--blue)}
.uh{font-size:11px;color:#bcc5d4;margin-top:3px}
.fok{font-size:13px;color:var(--green);font-weight:600;margin-top:5px}
.sub-btn{width:100%;color:#fff;border:none;cursor:pointer;font-size:16px;font-weight:700;padding:14px;border-radius:10px;font-family:inherit;margin-top:10px;transition:all .2s}
.sub-btn:hover:not(:disabled){transform:translateY(-2px);filter:brightness(1.1)}
.sub-btn:disabled{opacity:.55;cursor:not-allowed}

.success{text-align:center;padding:56px 20px;max-width:480px;margin:0 auto}
.s-ic{font-size:66px;margin-bottom:16px;display:block;animation:pop .4s ease}
@keyframes pop{0%{transform:scale(.4);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
.s-h{font-family:'Instrument Serif',serif;font-size:32px;color:var(--navy);margin-bottom:8px}
.s-p{font-size:15px;color:var(--muted);line-height:1.65;margin-bottom:24px}
.s-box{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:18px 22px;margin-bottom:24px;text-align:left;box-shadow:var(--sh)}
.sr{display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:6px 0;border-bottom:1px solid var(--border)}
.sr:last-child{border:none}
.sr-k{color:var(--muted)}.sr-v{font-weight:600;color:var(--navy)}
.id-b{background:linear-gradient(135deg,var(--accent),var(--a2));color:#fff;font-size:12px;font-weight:800;padding:3px 10px;border-radius:6px}
.home-btn{background:var(--navy);color:#fff;border:none;cursor:pointer;font-size:14px;font-weight:600;padding:11px 24px;border-radius:8px;font-family:inherit;transition:background .2s}
.home-btn:hover{background:var(--blue)}

/* ADMIN */
.adm-login{max-width:360px;margin:70px auto;padding:0 20px}
.adm-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:36px;box-shadow:var(--sh);text-align:center}
.adm-h{font-family:'Instrument Serif',serif;font-size:26px;color:var(--navy);margin-bottom:6px}
.adm-sub{font-size:14px;color:var(--muted);margin-bottom:24px}
.adm-shell{display:flex;height:calc(100vh - 62px)}
.adm-side{width:210px;flex-shrink:0;background:var(--navy);display:flex;flex-direction:column;overflow-y:auto}
.adm-side-lbl{font-size:10px;font-weight:700;color:rgba(255,255,255,.3);letter-spacing:2px;text-transform:uppercase;padding:20px 18px 8px}
.co-tab{display:flex;align-items:center;gap:9px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;color:rgba(255,255,255,.5);border:none;background:none;font-family:inherit;width:100%;text-align:left;transition:all .18s;border-left:3px solid transparent}
.co-tab:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.06)}
.co-tab.active{color:#fff;background:rgba(255,255,255,.1);border-left-color:var(--accent)}
.co-logo{width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif',serif;font-size:14px;color:#fff;flex-shrink:0}
.co-cnt{margin-left:auto;background:rgba(255,255,255,.15);color:rgba(255,255,255,.7);font-size:10px;font-weight:700;padding:2px 7px;border-radius:10px}
.sep{height:1px;background:rgba(255,255,255,.08);margin:10px 18px}
.side-action{display:flex;align-items:center;gap:8px;padding:10px 18px;cursor:pointer;font-size:12px;font-weight:600;color:rgba(255,255,255,.4);border:none;background:none;font-family:inherit;width:100%;text-align:left;transition:color .18s}
.side-action:hover{color:rgba(255,255,255,.75)}
.side-logout{color:rgba(255,59,85,.5)}
.side-logout:hover{color:rgba(255,59,85,.85)}
.adm-main{flex:1;padding:28px;overflow-y:auto;min-width:0}
.adm-top{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:24px}
.adm-title{font-family:'Instrument Serif',serif;font-size:24px;color:var(--navy)}
.adm-sub2{font-size:13px;color:var(--muted);margin-top:2px}
.btns{display:flex;gap:8px;flex-wrap:wrap}
.btn-p{background:linear-gradient(135deg,var(--accent),var(--a2));color:#fff;border:none;cursor:pointer;font-size:13px;font-weight:700;padding:9px 16px;border-radius:8px;font-family:inherit;display:flex;align-items:center;gap:6px;transition:all .2s}
.btn-p:hover{transform:translateY(-1px);filter:brightness(1.08)}
.btn-g{background:var(--green);color:#fff;border:none;cursor:pointer;font-size:13px;font-weight:700;padding:9px 16px;border-radius:8px;font-family:inherit;display:flex;align-items:center;gap:6px;transition:all .2s}
.btn-g:hover{background:#00a87e}
.btn-gh{background:#f3f4f6;color:#374151;border:1px solid var(--border);cursor:pointer;font-size:13px;font-weight:600;padding:9px 14px;border-radius:8px;font-family:inherit;transition:all .2s}
.btn-gh:hover{background:#e5e7eb}
.btn-sm{background:#f0f4ff;color:var(--accent);border:1px solid #d4e0ff;cursor:pointer;font-size:12px;font-weight:600;padding:5px 11px;border-radius:7px;font-family:inherit;transition:all .2s}
.btn-sm:hover{background:#e0ebff}
.btn-d{background:#fff0f0;color:var(--red);border:1px solid #ffd0d0;cursor:pointer;font-size:12px;font-weight:600;padding:5px 11px;border-radius:7px;font-family:inherit;transition:all .2s}
.btn-d:hover{background:#ffe0e0}
.stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:11px;margin-bottom:22px}
.sc{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;box-shadow:var(--sh)}
.sc-n{font-size:24px;font-weight:800;color:var(--navy);line-height:1}
.sc-l{font-size:12px;color:var(--muted);margin-top:3px}
.seg{display:inline-flex;background:#e8ecf5;border-radius:10px;padding:3px;gap:2px;margin-bottom:18px}
.seg-b{padding:7px 16px;border-radius:8px;border:none;background:none;font-family:inherit;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;transition:all .2s}
.seg-b.active{background:var(--card);color:var(--navy);box-shadow:0 1px 4px rgba(0,0,0,.1)}
.jrow{background:var(--card);border:1px solid var(--border);border-radius:11px;padding:16px 18px;margin-bottom:9px;display:flex;align-items:center;gap:14px;box-shadow:var(--sh)}
.jrow-body{flex:1;min-width:0}
.jrow-title{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:4px}
.jrow-meta{display:flex;flex-wrap:wrap;gap:9px}
.jrow-m{font-size:12px;color:var(--muted)}
.jrow-acts{display:flex;gap:7px;flex-shrink:0;flex-wrap:wrap;align-items:center}
.pill-on{background:rgba(0,200,150,.1);border:1px solid rgba(0,200,150,.3);color:var(--green);font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px}
.pill-off{background:#f3f4f6;border:1px solid var(--border);color:var(--muted);font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px}
.frow{display:flex;gap:9px;margin-bottom:14px;flex-wrap:wrap}
.fi{background:var(--card);border:1.5px solid var(--border);border-radius:8px;padding:8px 12px;font-family:inherit;font-size:13px;outline:none;transition:border-color .18s;flex:1;min-width:150px}
.fi:focus{border-color:var(--accent)}
.tbl{background:var(--card);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--sh);overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{background:var(--navy)}
th{padding:10px 13px;text-align:left;color:rgba(255,255,255,.75);font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;white-space:nowrap}
td{padding:10px 13px;border-bottom:1px solid var(--border);color:#374151;vertical-align:middle}
tr:last-child td{border:none}
tr:hover td{background:#f8f9ff}
.empty{text-align:center;padding:44px 20px;color:var(--muted)}
.empty-ic{font-size:40px;margin-bottom:10px}

/* MODAL */
.mbg{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px}
.modal{background:var(--card);border-radius:var(--r);padding:32px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:0 20px 70px rgba(0,0,0,.25);position:relative}
.mc{position:absolute;top:14px;right:16px;background:none;border:none;cursor:pointer;font-size:22px;color:var(--muted);line-height:1}
.mc:hover{color:var(--navy)}
.mh{font-family:'Instrument Serif',serif;font-size:22px;color:var(--navy);margin-bottom:5px}
.ms{font-size:13px;color:var(--muted);margin-bottom:22px}
.tags-row{display:flex;gap:7px;margin-bottom:7px}
.tags-list{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:5px}
.tag-x{display:flex;align-items:center;gap:4px;background:#eff3ff;border:1px solid #d4e0ff;color:#2a4cc4;font-size:12px;font-weight:600;padding:3px 9px;border-radius:20px;cursor:pointer}
.tag-x:hover{background:#fde8e8;color:var(--red);border-color:#ffd0d0}
.ta{width:100%;background:#f9fafc;border:1.5px solid var(--border);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:13px;color:#111;resize:vertical;min-height:75px;outline:none;transition:all .18s;line-height:1.6}
.ta:focus{border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px rgba(0,87,255,.1)}
.hint{font-size:11px;color:var(--muted);margin-bottom:5px}

.footer{background:var(--navy);color:rgba(255,255,255,.35);text-align:center;font-size:12px;padding:18px;letter-spacing:.3px}
.footer strong{color:rgba(255,255,255,.6)}

/* Home directory */
.dir-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:13px;margin-top:32px}
.dir-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;cursor:pointer;box-shadow:var(--sh);transition:all .2s;display:flex;flex-direction:column;gap:10px}
.dir-card:hover{box-shadow:var(--sh2);transform:translateY(-3px)}
.dir-logo{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif',serif;font-size:22px;color:#fff}
.dir-name{font-size:15px;font-weight:700;color:var(--navy)}
.dir-slug{font-size:12px;color:var(--muted)}
.dir-link{font-size:12px;font-weight:600;margin-top:auto}
`;

// ── ICONS ──────────────────────────────────────────────────
const Ic = ({ n, s = 14 }) => {
  const paths = {
    loc: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>,
    bag: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    money: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></>,
    type: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,
    up: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
    dl: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    arr: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[n]}</svg>;
};

// ── CANDIDATE PAGES ────────────────────────────────────────
function Landing({ company, jobs, onJob }) {
  const bg = `linear-gradient(150deg,${company.color}ee 0%,${company.color}99 60%,${company.color}66 100%)`;
  const activeJobs = jobs.filter(j => j.active);
  return (
    <>
      <div className="hero" style={{ background: bg }}>
        <div className="hero-pill"><span className="dot" />{activeJobs.length} Open Role{activeJobs.length !== 1 ? "s" : ""}</div>
        <h1>Careers at<br /><em>{company.name}</em></h1>
        <p className="hero-p">{company.tagline || "We're hiring experienced professionals. Apply directly — no middlemen."}</p>
        <div className="hero-stats">
          <div><div className="sn">{activeJobs.length}</div><div className="sl">Open Roles</div></div>
          <div><div className="sn">Direct</div><div className="sl">Apply Process</div></div>
          <div><div className="sn">2 Days</div><div className="sl">Response Time</div></div>
        </div>
      </div>
      <div className="wrap">
        <div className="sec-lbl">Current Openings</div>
        {activeJobs.length === 0 && <div className="empty"><div className="empty-ic">📭</div><p>No active openings right now.</p></div>}
        {activeJobs.map(job => (
          <div key={job.id} className="jcard" onClick={() => onJob(job)}>
            <div className="jcard-left" style={{ background: `linear-gradient(180deg,${company.color},${company.color}88)` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="jd-dept" style={{ color: company.color }}>{job.department}</div>
              <div className="jd-title">{job.title}</div>
              <div className="jcard-meta">
                <span className="m"><Ic n="loc" />{job.location}</span>
                <span className="m"><Ic n="bag" />{job.experience}</span>
                <span className="m"><Ic n="type" />{job.type}</span>
              </div>
              <div className="tags">{(job.skills || []).map(s => <span key={s} className="tag">{s}</span>)}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
              <span className="sal">{job.salary}</span>
              <button className="view-btn" style={{ background: `linear-gradient(135deg,${company.color},${company.color}bb)` }}>View Role →</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function JDPage({ company, job, onApply, onBack }) {
  const bg = `linear-gradient(135deg,${company.color}ee,${company.color}99)`;
  return (
    <div className="wrap">
      <button className="back" onClick={onBack}><Ic n="arr" /> All openings</button>
      <div className="jd-hero" style={{ background: bg }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.65)", letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 6 }}>{job.department}</div>
        <div className="jd-title2">{job.title}</div>
        <div className="jd-meta2">
          <span className="jdm"><Ic n="loc" s={13} />{job.location}</span>
          <span className="jdm"><Ic n="bag" s={13} />{job.experience}</span>
          <span className="jdm"><Ic n="type" s={13} />{job.type}</span>
        </div>
        <div className="jd-sal"><Ic n="money" s={14} />{job.salary}</div>
      </div>
      <div className="sec"><div className="sec-h">About This Role</div><p className="sec-p">{job.about}</p></div>
      {(job.responsibilities || []).length > 0 && <div className="sec"><div className="sec-h">Responsibilities</div><ul className="ul">{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
      {(job.requirements || []).length > 0 && <div className="sec"><div className="sec-h">Requirements</div><ul className="ul">{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
      {(job.perks || []).length > 0 && <div className="sec"><div className="sec-h">Perks & Benefits</div><div className="perks-g">{job.perks.map((p, i) => <div key={i} className="perk">✦ {p}</div>)}</div></div>}
      <div className="cta-box" style={{ background: bg }}>
        <h3>Excited about this role?</h3>
        <p>Takes 2 minutes. No login required.</p>
        <button className="cta-btn" onClick={onApply}>Apply Now →</button>
      </div>
    </div>
  );
}

function RegForm({ company, job, onSuccess, onBack }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", years_exp: "", notice_period: "", current_salary: "", expected_salary: "" });
  const [cv, setCv] = useState(null);
  const [drag, setDrag] = useState(false);
  const [errs, setErrs] = useState({});
  const [busy, setBusy] = useState(false);
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
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) return alert("PDF or Word only.");
    if (file.size > 5 * 1024 * 1024) return alert("Max 5 MB.");
    setCv(file);
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setBusy(true);
    await new Promise(r => setTimeout(r, 900));
    try {
      const rec = db.saveApplication({ company_id: company.id, job_id: job.id, job_title: job.title, job_location: job.location, ...f, cv_filename: cv ? cv.name : null });
      onSuccess({ ...f, job_title: job.title, job_location: job.location, id: rec.id });
    } finally { setBusy(false); }
  };

  const pillBg = company.color + "14";
  const pillBorder = company.color + "30";
  const btnBg = `linear-gradient(135deg,${company.color},${company.color}bb)`;

  return (
    <div className="form-wrap">
      <button className="back" onClick={onBack}><Ic n="arr" /> Back to job details</button>
      <div className="form-card">
        <div className="job-pill" style={{ background: pillBg, border: `1px solid ${pillBorder}` }}>
          <span style={{ fontSize: 20 }}>💼</span>
          <div><div className="jp-r">{job.title}</div><div className="jp-l">{company.name} · {job.location}</div></div>
        </div>
        <div className="fh">Apply for this Role</div>
        <div className="fs">Our talent team will reach out within 2 business days.</div>

        <div className="fl">Personal Details</div>
        <div className="r2">
          <div className="fg">
            <label className="lbl">Full Name</label>
            <input className={`inp${errs.name ? " e" : ""}`} placeholder="Ravi Kumar" value={f.name} onChange={e => { set("name", e.target.value); clr("name"); }} />
            {errs.name && <div className="et">{errs.name}</div>}
          </div>
          <div className="fg">
            <label className="lbl">Mobile Number</label>
            <input className={`inp${errs.phone ? " e" : ""}`} placeholder="10-digit mobile" value={f.phone} onChange={e => { set("phone", e.target.value); clr("phone"); }} />
            {errs.phone && <div className="et">{errs.phone}</div>}
          </div>
        </div>
        <div className="fg">
          <label className="lbl">Email Address <span className="opt">(optional)</span></label>
          <input className={`inp${errs.email ? " e" : ""}`} placeholder="you@company.com" value={f.email} onChange={e => { set("email", e.target.value); clr("email"); }} />
          {errs.email && <div className="et">{errs.email}</div>}
        </div>

        <div className="div" />
        <div className="fl">Experience & Availability <span style={{ color: "#c0c8d8", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optional</span></div>
        <div className="r2">
          <div className="fg">
            <label className="lbl">Total Experience <span className="opt">(yrs)</span></label>
            <input className="inp" placeholder="e.g. 5.5" value={f.years_exp} onChange={e => set("years_exp", e.target.value)} />
          </div>
          <div className="fg">
            <label className="lbl">Notice Period</label>
            <select className="inp" style={{ cursor: "pointer" }} value={f.notice_period} onChange={e => set("notice_period", e.target.value)}>
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

        <div className="div" />
        <div className="fl">Resume / CV <span style={{ color: "#c0c8d8", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— optional</span></div>
        <div className={`upz${drag ? " drag" : ""}${cv ? " done" : ""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById("cv-inp").click()}>
          <div style={{ color: company.color, marginBottom: 6 }}><Ic n="up" s={20} /></div>
          {cv ? <div className="fok">✓ {cv.name}</div> : <><div className="ut"><strong>Click to upload</strong> or drag & drop</div><div className="uh">PDF or Word · max 5 MB</div></>}
          <input id="cv-inp" type="file" style={{ display: "none" }} accept=".pdf,.doc,.docx" onChange={e => handleFile(e.target.files[0])} />
        </div>
        <button className="sub-btn" style={{ background: btnBg }} onClick={submit} disabled={busy}>
          {busy ? "Submitting…" : "Submit Application →"}
        </button>
      </div>
    </div>
  );
}

function Success({ data, company, onHome }) {
  return (
    <div className="wrap"><div className="success">
      <span className="s-ic">🎉</span>
      <div className="s-h">Application Received!</div>
      <p className="s-p">Thanks <strong>{data.name}</strong>! Your application for <strong>{data.job_title}</strong> has been submitted. We'll be in touch within 2 business days.</p>
      <div className="s-box">
        {[["Application ID", <span className="id-b">{data.id}</span>], ["Name", data.name], ["Phone", data.phone], data.email && ["Email", data.email], ["Role", data.job_title], ["Location", data.job_location]].filter(Boolean).map(([k, v]) => (
          <div key={k} className="sr"><span className="sr-k">{k}</span><span className="sr-v">{v}</span></div>
        ))}
      </div>
      <button className="home-btn" onClick={onHome}>← View All Openings</button>
    </div></div>
  );
}

// ── JOB MODAL ──────────────────────────────────────────────
function JobModal({ companies, editJob, defaultCompanyId, onSave, onClose }) {
  const blank = { company_id: defaultCompanyId || "", title: "", department: "", location: "", type: "Full-time · Hybrid", experience: "", salary: "", skills: [], about: "", responsibilities: [], requirements: [], perks: [] };
  const [form, setForm] = useState(editJob ? { ...editJob, skills: [...(editJob.skills || [])], responsibilities: [...(editJob.responsibilities || [])], requirements: [...(editJob.requirements || [])], perks: [...(editJob.perks || [])] } : blank);
  const [ti, setTi] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const addTag = () => { const t = ti.trim(); if (t && !form.skills.includes(t)) set("skills", [...form.skills, t]); setTi(""); };
  const parseList = txt => txt.split("\n").map(s => s.replace(/^[-•→]\s*/, "").trim()).filter(Boolean);

  const save = () => {
    if (!form.title.trim() || !form.company_id) return alert("Company and title are required.");
    setBusy(true);
    if (editJob) db.updateJob(editJob.id, form);
    else db.addJob(form);
    setBusy(false);
    onSave();
  };

  return (
    <div className="mbg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="mc" onClick={onClose}>×</button>
        <div className="mh">{editJob ? "Edit Job" : "Post a New Job"}</div>
        <div className="ms">Fill in the role details. Skills and bullet fields are optional but help candidates.</div>
        <div className="fg">
          <label className="lbl">Company</label>
          <select className="inp" value={form.company_id} onChange={e => set("company_id", e.target.value)}>
            <option value="">Select company</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="fg"><label className="lbl">Job Title</label><input className="inp" placeholder="e.g. Senior Software Engineer – Java" value={form.title} onChange={e => set("title", e.target.value)} /></div>
        <div className="r2">
          <div className="fg"><label className="lbl">Department</label><input className="inp" placeholder="Product Engineering" value={form.department} onChange={e => set("department", e.target.value)} /></div>
          <div className="fg"><label className="lbl">Location</label><input className="inp" placeholder="Noida, UP" value={form.location} onChange={e => set("location", e.target.value)} /></div>
        </div>
        <div className="r2">
          <div className="fg">
            <label className="lbl">Job Type</label>
            <select className="inp" value={form.type} onChange={e => set("type", e.target.value)}>
              {["Full-time · Hybrid", "Full-time · Remote", "Full-time · On-site", "Contract · Remote", "Contract · On-site"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Experience</label><input className="inp" placeholder="4–8 Years" value={form.experience} onChange={e => set("experience", e.target.value)} /></div>
        </div>
        <div className="fg"><label className="lbl">Salary Range</label><input className="inp" placeholder="₹18–28 LPA" value={form.salary} onChange={e => set("salary", e.target.value)} /></div>
        <div className="fg">
          <label className="lbl">Skills / Tags</label>
          <div className="tags-list">{form.skills.map(s => <span key={s} className="tag-x" onClick={() => set("skills", form.skills.filter(x => x !== s))}>{s} ×</span>)}</div>
          <div className="tags-row">
            <input className="inp" placeholder="Type a skill, press Add" value={ti} onChange={e => setTi(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} style={{ flex: 1 }} />
            <button className="btn-sm" onClick={addTag}>Add</button>
          </div>
        </div>
        <div className="fg"><label className="lbl">About This Role</label><textarea className="ta" rows={3} placeholder="2–3 sentences about the role." value={form.about} onChange={e => set("about", e.target.value)} /></div>
        <div className="fg">
          <label className="lbl">Responsibilities <span className="opt">(one per line)</span></label>
          <div className="hint">Each line becomes a bullet point on the job page.</div>
          <textarea className="ta" rows={4} placeholder={"Design and build Java microservices\nOwn performance and observability"} value={form.responsibilities.join("\n")} onChange={e => set("responsibilities", parseList(e.target.value))} />
        </div>
        <div className="fg">
          <label className="lbl">Requirements <span className="opt">(one per line)</span></label>
          <textarea className="ta" rows={4} placeholder={"4+ years Java\nDistributed systems knowledge"} value={form.requirements.join("\n")} onChange={e => set("requirements", parseList(e.target.value))} />
        </div>
        <div className="fg">
          <label className="lbl">Perks <span className="opt">(one per line)</span></label>
          <textarea className="ta" rows={3} placeholder={"ESOPs after 2 yrs\nHealth insurance"} value={form.perks.join("\n")} onChange={e => set("perks", parseList(e.target.value))} />
        </div>
        <div style={{ display: "flex", gap: 9, marginTop: 8 }}>
          <button className="btn-p" style={{ flex: 1, justifyContent: "center" }} onClick={save} disabled={busy}>{busy ? "Saving…" : editJob ? "Save Changes" : "Post Job →"}</button>
          <button className="btn-gh" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── COMPANY MODAL ──────────────────────────────────────────
function CompanyModal({ editCo, onSave, onClose }) {
  const blank = { name: "", slug: "", color: "#0057ff", tagline: "" };
  const [form, setForm] = useState(editCo || blank);
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (!form.name.trim() || !form.slug.trim()) return alert("Name and slug are required.");
    if (!/^[a-z0-9-]+$/.test(form.slug)) return alert("Slug: lowercase letters, numbers, hyphens only.");
    setBusy(true);
    if (editCo) db.updateCompany(editCo.id, form);
    else db.addCompany(form);
    setBusy(false);
    onSave();
  };

  return (
    <div className="mbg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <button className="mc" onClick={onClose}>×</button>
        <div className="mh">{editCo ? "Edit Company" : "Add Company"}</div>
        <div className="ms">Each company gets its own branded careers page.</div>
        <div className="fg"><label className="lbl">Company Name</label><input className="inp" placeholder="e.g. Tata Consultancy Services" value={form.name} onChange={e => set("name", e.target.value)} /></div>
        <div className="fg">
          <label className="lbl">URL Slug</label>
          <input className="inp" placeholder="e.g. tcs" value={form.slug} onChange={e => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} />
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>Candidates visit <strong>/careers/{form.slug || "slug"}</strong></div>
        </div>
        <div className="fg"><label className="lbl">Tagline</label><input className="inp" placeholder="e.g. Build the future with us." value={form.tagline} onChange={e => set("tagline", e.target.value)} /></div>
        <div className="fg">
          <label className="lbl">Brand Colour</label>
          <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
            <input type="color" value={form.color} onChange={e => set("color", e.target.value)} style={{ width: 40, height: 36, border: "1.5px solid var(--border)", borderRadius: 7, cursor: "pointer", padding: 2 }} />
            <input className="inp" value={form.color} onChange={e => set("color", e.target.value)} style={{ flex: 1 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 9, marginTop: 8 }}>
          <button className="btn-p" style={{ flex: 1, justifyContent: "center" }} onClick={save} disabled={busy}>{busy ? "Saving…" : editCo ? "Save Changes" : "Add Company →"}</button>
          <button className="btn-gh" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN COMPANY VIEW ────────────────────────────────────
function AdminCoView({ company, allCompanies, onRefresh }) {
  const [jobs, setJobs] = useState(() => db.getJobs(company.id));
  const [apps, setApps] = useState(() => db.getApplications(company.id));
  const [view, setView] = useState("jobs");
  const [showJobModal, setShowJobModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [search, setSearch] = useState("");

  const refresh = () => { setJobs(db.getJobs(company.id)); setApps(db.getApplications(company.id)); onRefresh(); };

  const toggleActive = (job) => { db.updateJob(job.id, { active: !job.active }); refresh(); };
  const delJob = (job) => { if (!window.confirm(`Delete "${job.title}"?`)) return; db.deleteJob(job.id); refresh(); };

  const filteredApps = apps.filter(a => {
    const q = search.toLowerCase();
    return !q || a.name?.toLowerCase().includes(q) || a.phone?.includes(q) || a.email?.toLowerCase().includes(q);
  });

  const downloadCSV = () => {
    const cols = ["id", "job_title", "name", "phone", "email", "years_exp", "notice_period", "current_salary", "expected_salary", "cv_filename", "created_at"];
    const hdr = cols.join(",");
    const body = filteredApps.map(r => cols.map(c => `"${(r[c] ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([hdr + "\n" + body], { type: "text/csv" }));
    a.download = `${company.slug}-apps-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  };

  return (
    <>
      {(showJobModal || editJob) && (
        <JobModal companies={allCompanies} editJob={editJob} defaultCompanyId={company.id}
          onSave={() => { setShowJobModal(false); setEditJob(null); refresh(); }}
          onClose={() => { setShowJobModal(false); setEditJob(null); }} />
      )}
      <div className="adm-top">
        <div>
          <div className="adm-title">{company.name}</div>
          <div className="adm-sub2">{jobs.filter(j => j.active).length} active role{jobs.filter(j => j.active).length !== 1 ? "s" : ""} · {apps.length} application{apps.length !== 1 ? "s" : ""}</div>
        </div>
        <div className="btns">
          {view === "jobs" && <button className="btn-p" onClick={() => { setEditJob(null); setShowJobModal(true); }}><Ic n="plus" s={13} /> Post Job</button>}
          {view === "apps" && <button className="btn-g" onClick={downloadCSV}><Ic n="dl" s={13} /> Download CSV</button>}
        </div>
      </div>
      <div className="stats">
        <div className="sc"><div className="sc-n">{jobs.length}</div><div className="sc-l">Total Jobs</div></div>
        <div className="sc"><div className="sc-n">{jobs.filter(j => j.active).length}</div><div className="sc-l">Active</div></div>
        <div className="sc"><div className="sc-n">{apps.length}</div><div className="sc-l">Applications</div></div>
        <div className="sc"><div className="sc-n">{apps.filter(a => a.cv_filename).length}</div><div className="sc-l">With CV</div></div>
      </div>
      <div className="seg">
        <button className={`seg-b${view === "jobs" ? " active" : ""}`} onClick={() => setView("jobs")}>Jobs ({jobs.length})</button>
        <button className={`seg-b${view === "apps" ? " active" : ""}`} onClick={() => setView("apps")}>Applications ({apps.length})</button>
      </div>

      {view === "jobs" ? (
        jobs.length === 0
          ? <div className="empty"><div className="empty-ic">📋</div><p>No jobs yet. Post your first role.</p></div>
          : jobs.map(job => (
            <div key={job.id} className="jrow">
              <div className="jrow-body">
                <div className="jrow-title">{job.title}</div>
                <div className="jrow-meta">
                  <span className="jrow-m">{job.location}</span>
                  <span className="jrow-m">·</span>
                  <span className="jrow-m">{job.experience}</span>
                  <span className="jrow-m">·</span>
                  <span className="jrow-m">{job.salary}</span>
                  <span className="jrow-m">·</span>
                  <span className="jrow-m">{apps.filter(a => a.job_id === job.id).length} applicant{apps.filter(a => a.job_id === job.id).length !== 1 ? "s" : ""}</span>
                </div>
              </div>
              <div className="jrow-acts">
                <span className={job.active ? "pill-on" : "pill-off"}>{job.active ? "● Active" : "Paused"}</span>
                <button className="btn-sm" onClick={() => toggleActive(job)}>{job.active ? "Pause" : "Activate"}</button>
                <button className="btn-sm" onClick={() => { setEditJob(job); setShowJobModal(false); }}><Ic n="edit" s={12} /></button>
                <button className="btn-d" onClick={() => delJob(job)}><Ic n="trash" s={12} /></button>
              </div>
            </div>
          ))
      ) : (
        <>
          <div className="frow">
            <input className="fi" placeholder="🔍  Search by name, phone, or email…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {filteredApps.length === 0
            ? <div className="empty"><div className="empty-ic">📭</div><p>No applications yet.</p></div>
            : <div className="tbl"><table>
              <thead><tr>{["ID", "Role", "Name", "Phone", "Email", "Exp", "Notice", "Curr", "Exp CTC", "CV", "Date"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{filteredApps.map(r => (
                <tr key={r.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)" }}>{r.id}</td>
                  <td style={{ fontWeight: 600, color: "var(--navy)", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.job_title}</td>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td>{r.phone}</td>
                  <td>{r.email || <span style={{ color: "#c0c8d8" }}>—</span>}</td>
                  <td>{r.years_exp || "—"}</td>
                  <td>{r.notice_period || "—"}</td>
                  <td>{r.current_salary ? r.current_salary + "L" : "—"}</td>
                  <td>{r.expected_salary ? r.expected_salary + "L" : "—"}</td>
                  <td>{r.cv_filename ? <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 600 }}>📎</span> : <span style={{ color: "#c0c8d8" }}>—</span>}</td>
                  <td style={{ whiteSpace: "nowrap", color: "var(--muted)" }}>{new Date(r.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                </tr>
              ))}</tbody>
            </table></div>
          }
        </>
      )}
    </>
  );
}

// ── ADMIN SHELL ────────────────────────────────────────────
function AdminShell({ onExit }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState(""); const [pwErr, setPwErr] = useState("");
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [showCoModal, setShowCoModal] = useState(false);
  const [editCo, setEditCo] = useState(null);
  const [appCounts, setAppCounts] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(() => {
    const cos = db.getCompanies();
    setCompanies(cos);
    if (cos.length && !activeTab) setActiveTab(cos[0].id);
    const counts = {};
    cos.forEach(c => { counts[c.id] = db.getApplications(c.id).length; });
    setAppCounts(counts);
  }, [activeTab]);

  useEffect(() => { if (authed) load(); }, [authed, load, refreshKey]);

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); }
    else setPwErr("Incorrect password.");
  };

  if (!authed) return (
    <div className="adm-login">
      <div className="adm-card">
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
        <div className="adm-h">Admin Panel</div>
        <div className="adm-sub">Enter password to access the dashboard.</div>
        <div className="fg">
          <input className={`inp${pwErr ? " e" : ""}`} type="password" placeholder="Password" value={pw} onChange={e => { setPw(e.target.value); setPwErr(""); }} onKeyDown={e => e.key === "Enter" && login()} />
          {pwErr && <div className="et">{pwErr}</div>}
        </div>
        <button className="sub-btn" style={{ background: "linear-gradient(135deg,var(--accent),var(--a2))" }} onClick={login}>Login →</button>
        <div style={{ marginTop: 14, textAlign: "center" }}>
          <button className="back" style={{ display: "inline-flex" }} onClick={onExit}><Ic n="arr" /> Back to portal</button>
        </div>
      </div>
    </div>
  );

  const activeCo = companies.find(c => c.id === activeTab);

  return (
    <>
      {(showCoModal || editCo) && (
        <CompanyModal editCo={editCo}
          onSave={() => { setShowCoModal(false); setEditCo(null); setRefreshKey(k => k + 1); }}
          onClose={() => { setShowCoModal(false); setEditCo(null); }} />
      )}
      <div className="adm-shell">
        <aside className="adm-side">
          <div className="adm-side-lbl">Companies</div>
          {companies.map(c => (
            <button key={c.id} className={`co-tab${activeTab === c.id ? " active" : ""}`} onClick={() => setActiveTab(c.id)}>
              <span className="co-logo" style={{ background: c.color + "cc" }}>{c.logo || c.name.charAt(0)}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
              {appCounts[c.id] > 0 && <span className="co-cnt">{appCounts[c.id]}</span>}
            </button>
          ))}
          <div className="sep" />
          <button className="side-action" onClick={() => { setEditCo(null); setShowCoModal(true); }}><Ic n="plus" s={12} /> Add Company</button>
          {activeCo && <button className="side-action" onClick={() => { setEditCo(activeCo); setShowCoModal(false); }}><Ic n="edit" s={12} /> Edit Company</button>}
          <button className="side-action side-logout" onClick={() => setAuthed(false)}>↩ Logout</button>
        </aside>
        <main className="adm-main">
          {activeCo
            ? <AdminCoView key={activeCo.id + refreshKey} company={activeCo} allCompanies={companies} onRefresh={() => setRefreshKey(k => k + 1)} />
            : <div className="empty"><div className="empty-ic">🏢</div><p>Add a company to get started.</p></div>
          }
        </main>
      </div>
    </>
  );
}

// ── ROOT ───────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home"); // home | company | admin
  const [company, setCompany] = useState(null);
  const [subPage, setSubPage] = useState("landing"); // landing | jd | form | success
  const [jobs, setJobs] = useState([]);
  const [selJob, setSelJob] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const goCompany = (co) => {
    const js = db.getJobs(co.id);
    setCompany(co); setJobs(js); setSubPage("landing"); setSelJob(null); setSuccessData(null);
    setPage("company");
  };

  const companies = db.getCompanies();

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <button className="nav-brand" onClick={() => setPage("home")}>
          <div className="nav-logo" style={{ background: page === "company" && company ? `linear-gradient(135deg,${company.color},${company.color}99)` : "linear-gradient(135deg,#0057ff,#00c2ff)" }}>
            {page === "company" && company ? company.logo : "R"}
          </div>
          <div>
            <div className="nav-name">{page === "company" && company ? company.name : "Recruit Portal"}</div>
            <div className="nav-sub">{page === "company" ? "Careers" : "Multi-company hiring"}</div>
          </div>
        </button>
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          {page === "company" && <div className="nav-live">● HIRING</div>}
          <button className="nav-btn" onClick={() => setPage("admin")}>Admin →</button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <>
          <div style={{ maxWidth: 760, margin: "56px auto", padding: "0 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(30px,5vw,50px)", color: "var(--navy)", marginBottom: 12, lineHeight: 1.12 }}>
              One Portal,{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,var(--accent),var(--a2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Many Companies</em>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 40, lineHeight: 1.65 }}>
              Each company has its own branded careers page. Add companies and post jobs from the admin panel.
            </p>
            {companies.length === 0
              ? <div className="empty"><div className="empty-ic">🏢</div><p>No companies yet. <button onClick={() => setPage("admin")} style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Go to admin →</button></p></div>
              : <div className="dir-grid">
                {companies.map(c => (
                  <div key={c.id} className="dir-card" onClick={() => goCompany(c)}>
                    <div className="dir-logo" style={{ background: `linear-gradient(135deg,${c.color},${c.color}99)` }}>{c.logo}</div>
                    <div><div className="dir-name">{c.name}</div><div className="dir-slug">/{c.slug}</div></div>
                    <div className="dir-link" style={{ color: c.color }}>View openings →</div>
                  </div>
                ))}
              </div>
            }
          </div>
          <footer className="footer">© 2025 <strong>Recruit Portal</strong> · All Rights Reserved</footer>
        </>
      )}

      {/* COMPANY FLOW */}
      {page === "company" && company && (
        <>
          {subPage === "landing" && <Landing company={company} jobs={jobs} onJob={j => { setSelJob(j); setSubPage("jd"); }} />}
          {subPage === "jd" && selJob && <JDPage company={company} job={selJob} onApply={() => setSubPage("form")} onBack={() => setSubPage("landing")} />}
          {subPage === "form" && selJob && <RegForm company={company} job={selJob} onSuccess={d => { setSuccessData(d); setSubPage("success"); }} onBack={() => setSubPage("jd")} />}
          {subPage === "success" && successData && <Success data={successData} company={company} onHome={() => { setSubPage("landing"); setSelJob(null); setSuccessData(null); }} />}
          <footer className="footer">© 2025 <strong>{company.name}</strong> · Powered by Recruit Portal</footer>
        </>
      )}

      {/* ADMIN */}
      {page === "admin" && (
        <>
          <AdminShell onExit={() => setPage("home")} />
          <footer className="footer">© 2025 <strong>Recruit Portal</strong></footer>
        </>
      )}
    </>
  );
}
