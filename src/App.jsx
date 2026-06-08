import { useState, useEffect } from "react";

const SUPABASE_URL = "https://rbwluolctwcyqxixisfb.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZkfyWoc2f-ZMFC7ByX0ANg_OTe5yLP8";
const ADMIN_PASSWORD = "shine@admin2026";

let _sb = null;
async function sb() {
  if (_sb) return _sb;
  const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm");
  _sb = createClient(SUPABASE_URL, SUPABASE_KEY);
  return _sb;
}

// Generate URL-friendly slug from title + company
function toSlug(title, company) {
  return [title, company]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getRoute() {
  const path = window.location.pathname;
  if (path === "/admin" || path === "/admin/") return "admin";
  if (path.startsWith("/jobs/")) return "job";
  return "portal";
}

function getJobSlug() {
  return window.location.pathname.replace("/jobs/", "").replace(/\/$/, "");
}

// ── SHINE LOGO ─────────────────────────────────────────────
const ShineLogo = ({ height = 28, light = false }) => (
  <svg height={height} viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M38.8164 104.079C43.392 104.079 47.3954 105.167 50.8271 107.341C54.3162 109.458 56.7761 112.462 58.2061 116.353L48.6826 120.815C47.9963 118.87 46.7375 117.325 44.9072 116.181C43.1343 114.979 41.104 114.378 38.8164 114.378C37.1577 114.378 35.8415 114.722 34.8691 115.408C33.9542 116.095 33.4972 117.039 33.4971 118.24C33.4971 118.87 33.6685 119.442 34.0117 119.957C34.3549 120.472 34.8981 120.93 35.6416 121.33C36.4424 121.731 37.4147 122.103 38.5586 122.446L46.0225 124.678C49.9118 125.822 52.8862 127.567 54.9453 129.913C57.0043 132.202 58.0341 135.034 58.0342 138.409C58.0342 141.327 57.262 143.874 55.7178 146.048C54.2307 148.222 52.1431 149.939 49.4551 151.197C46.7669 152.399 43.5922 153 39.9316 153C34.7841 153 30.294 151.798 26.4619 149.396C22.6869 146.935 20.113 143.645 18.7402 139.525L28.1777 135.062C29.3788 137.58 31.0085 139.554 33.0674 140.984C35.1265 142.415 37.415 143.13 39.9316 143.13C41.7618 143.13 43.1634 142.758 44.1357 142.015C45.108 141.271 45.5937 140.241 45.5938 138.925C45.5938 138.238 45.4223 137.666 45.0791 137.208C44.736 136.693 44.2213 136.235 43.5352 135.835C42.8488 135.434 41.9905 135.091 40.9609 134.805L32.9824 132.573C29.1503 131.486 26.2046 129.741 24.1455 127.338C22.0865 124.878 21.0567 121.988 21.0566 118.67C21.0566 115.752 21.8 113.206 23.2871 111.031C24.7742 108.857 26.8617 107.169 29.5498 105.968C32.2381 104.709 35.3274 104.079 38.8164 104.079Z" fill={light ? "#0D1117" : "white"}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M201.976 104.079C205.693 104.079 208.982 104.68 211.842 105.882C214.702 107.026 217.104 108.656 219.049 110.773C221.051 112.89 222.566 115.351 223.596 118.154C224.625 120.901 225.14 123.905 225.14 127.166C225.14 128.081 225.083 128.998 224.969 129.913C224.912 130.771 224.768 131.515 224.539 132.145H191.731C191.885 133.344 192.181 134.459 192.623 135.491C193.481 137.494 194.797 139.068 196.57 140.212C198.343 141.299 200.488 141.843 203.005 141.843C205.293 141.843 207.237 141.385 208.839 140.47C210.497 139.554 211.784 138.295 212.699 136.693L222.995 141.585C222.08 143.874 220.621 145.876 218.619 147.593C216.674 149.309 214.358 150.654 211.67 151.627C208.982 152.542 206.036 153 202.833 153C197.857 153 193.539 151.913 189.878 149.738C186.217 147.507 183.386 144.532 181.384 140.812C179.382 137.094 178.381 132.974 178.381 128.454C178.381 123.762 179.411 119.585 181.47 115.923C183.586 112.261 186.418 109.372 189.964 107.255C193.51 105.138 197.514 104.079 201.976 104.079ZM201.976 114.378C199.745 114.378 197.828 114.922 196.227 116.009C194.625 117.096 193.424 118.698 192.623 120.815C192.399 121.409 192.214 122.038 192.066 122.703H211.505C211.431 121.983 211.287 121.296 211.069 120.644C210.44 118.698 209.325 117.182 207.724 116.095C206.179 114.95 204.263 114.378 201.976 114.378Z" fill={light ? "#0D1117" : "white"}/>
    <path d="M75.6787 109.418C76.6593 108.043 77.8885 106.949 79.3682 106.139C81.8276 104.765 84.688 104.079 87.9482 104.079C91.4943 104.079 94.5829 104.823 97.2139 106.311C99.9021 107.798 101.989 109.887 103.477 112.576C104.964 115.208 105.708 118.298 105.708 121.846V151.97H92.8379V124.592C92.8379 122.761 92.4662 121.187 91.7227 119.871C91.0363 118.555 90.0352 117.525 88.7197 116.781C87.4615 116.038 85.9745 115.666 84.2588 115.666C82.6001 115.666 81.1124 116.037 79.7969 116.781C78.4815 117.525 77.4525 118.555 76.709 119.871C76.0226 121.187 75.6787 122.761 75.6787 124.592V151.97H62.8096V87H75.6787V109.418Z" fill={light ? "#0D1117" : "white"}/>
    <path d="M124.123 151.97H111.254V105.109H124.123V151.97Z" fill={light ? "#0D1117" : "white"}/>
    <path d="M155.763 104.079C159.309 104.079 162.397 104.823 165.028 106.311C167.717 107.798 169.805 109.887 171.292 112.576C172.779 115.208 173.522 118.298 173.522 121.846V151.97H160.653V124.592C160.653 122.761 160.282 121.187 159.538 119.871C158.852 118.555 157.851 117.525 156.535 116.781C155.277 116.037 153.789 115.666 152.073 115.666C150.415 115.666 148.928 116.038 147.612 116.781C146.297 117.525 145.267 118.555 144.523 119.871C143.837 121.187 143.494 122.761 143.494 124.592V151.97H130.625V105.109H142.636V110.811C143.719 108.764 145.235 107.206 147.184 106.139C149.643 104.766 152.503 104.079 155.763 104.079Z" fill={light ? "#0D1117" : "white"}/>
    <path d="M117.353 88C120.936 88.0002 123.84 90.8936 123.84 94.4883C123.84 98.0791 120.936 100.972 117.353 100.973C113.767 100.973 110.867 98.0793 110.867 94.4883C110.867 90.8934 113.767 88 117.353 88Z" fill={light ? "#0D1117" : "white"}/>
    <path d="M111.367 38C151.563 38 186.076 62.3239 200.993 97.0547C196.523 97.1799 192.397 98.1007 188.614 99.8174C174.186 68.2516 142.335 46.3175 105.36 46.3174C61.9889 46.3174 25.6667 76.4962 16.2451 117H15.6201C24.2635 71.9991 63.8449 38 111.367 38Z" fill="#FACA22"/>
    <path d="M119.367 27C167.02 27 207.291 58.5937 220.382 101.977C218.896 101.024 217.289 100.2 215.559 99.5078C212.244 98.1144 208.508 97.3131 204.352 97.0996C189.475 61.2298 154.118 36 112.867 36C64.338 36 23.9658 70.918 15.501 117H15C22.497 66.0825 66.3669 27 119.367 27Z" fill="#1A56FF"/>
  </svg>
);

// ── DESIGN TOKENS (Shine Design System) ──────────────────
// Colors: Plus Jakarta Sans, Shine primitives
// Theme: Light surface, black/dark text, gold accent, brand blue
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Plus Jakarta Sans',sans-serif;
  background:#F7F9FB;
  color:#0D1117;
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

/* ── DESIGN TOKENS ── */
:root{
  /* Brand */
  --brand-500:#1A56FF;
  --brand-100:#EBF0FF;
  --brand-50:#F0F5FF;
  /* Neutral */
  --neutral-black:#0D1117;
  --neutral-900:#161B22;
  --neutral-800:#232A38;
  --neutral-700:#344054;
  --neutral-600:#4A5260;
  --neutral-500:#667085;
  --neutral-400:#98A2B3;
  --neutral-300:#C8CED7;
  --neutral-200:#E4E7EC;
  --neutral-100:#EEF1F5;
  --neutral-50:#F7F9FB;
  /* Gold — premium accent */
  --gold-500:#B8860B;
  --gold-400:#C9970D;
  --gold-300:#E4B422;
  --gold-200:#F5D06A;
  --gold-100:#FBF0C4;
  --gold-50:#FFFDF0;
  /* Semantic */
  --surface-base:#FFFFFF;
  --surface-subtle:#F7F9FB;
  --surface-overlay:rgba(13,17,23,.55);
  --content-base:#0D1117;
  --content-subtle:#344054;
  --content-muted:#667085;
  --content-disabled:#98A2B3;
  --stroke-default:#E4E7EC;
  --stroke-strong:#C8CED7;
  --stroke-brand:rgba(26,86,255,.25);
  /* Elevation */
  --el-raised:0 1px 3px rgba(13,17,23,.08),0 1px 2px rgba(13,17,23,.04);
  --el-lifted:0 4px 12px rgba(13,17,23,.08),0 2px 4px rgba(13,17,23,.04);
  --el-overlay:0 16px 36px -10px rgba(13,17,23,.18),0 4px 10px -2px rgba(13,17,23,.08);
  --el-modal:0 24px 60px -12px rgba(13,17,23,.18),0 6px 16px -6px rgba(13,17,23,.08);
  --el-brand:0 6px 14px -4px rgba(26,86,255,.45);
  --el-brand-hover:0 16px 40px -12px rgba(26,86,255,.40);
  /* Radius */
  --r-sm:4px;--r-md:8px;--r-lg:12px;--r-xl:16px;--r-2xl:24px;--r-full:1024px;
}

/* ── HEADER ── */
.hdr{
  background:#FFFFFF;
  border-bottom:1px solid var(--stroke-default);
  padding:0 32px;height:60px;
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:100;
  box-shadow:var(--el-raised);
}
.hdr-left{display:flex;align-items:center;gap:20px}
.hdr-divider{width:1px;height:24px;background:var(--stroke-default)}
.hdr-tagline{font-size:13px;font-weight:500;color:var(--content-muted)}
.hdr-tagline strong{color:var(--content-base);font-weight:700}
.hdr-right{display:flex;align-items:center;gap:10px}
.hdr-pill{
  background:var(--gold-50);
  border:1px solid var(--gold-200);
  color:var(--gold-500);
  font-size:11px;font-weight:700;letter-spacing:.6px;
  padding:4px 12px;border-radius:var(--r-full);
}

/* ── HERO ── */
.hero{
  background:var(--neutral-black);
  padding:72px 24px 60px;
  text-align:center;
  position:relative;overflow:hidden;
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse at 30% 0%,rgba(26,86,255,.12) 0%,transparent 55%),
    radial-gradient(ellipse at 80% 100%,rgba(184,134,11,.08) 0%,transparent 50%);
  pointer-events:none;
}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.7);
  font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
  padding:5px 14px;border-radius:var(--r-full);margin-bottom:24px;
}
.hero-dot{width:6px;height:6px;border-radius:50%;background:#12B76A;display:inline-block;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
.hero h1{
  font-size:clamp(32px,5vw,56px);
  font-weight:800;color:#FFFFFF;
  line-height:1.08;letter-spacing:-1.5px;
  margin-bottom:18px;
}
.hero h1 em{
  font-style:normal;
  background:linear-gradient(135deg,#C9970D 0%,#F5D06A 50%,#C9970D 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.hero-sub{
  font-size:16px;font-weight:400;
  color:rgba(255,255,255,.5);
  max-width:480px;margin:0 auto 44px;line-height:1.7;
}
.hero-stats{
  display:inline-flex;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  border-radius:var(--r-xl);
  overflow:hidden;
}
.hstat{
  padding:18px 28px;text-align:center;
  border-right:1px solid rgba(255,255,255,.08);
}
.hstat:last-child{border:none}
.hstat-n{font-size:22px;font-weight:800;color:#FFFFFF;line-height:1;letter-spacing:-.5px}
.hstat-l{font-size:11px;font-weight:500;color:rgba(255,255,255,.4);margin-top:3px;letter-spacing:.3px;text-transform:uppercase}

/* ── JOBS SECTION ── */
.section{max-width:820px;margin:0 auto;padding:48px 24px 80px}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:10px}
.section-title{font-size:13px;font-weight:700;color:var(--content-muted);text-transform:uppercase;letter-spacing:1.5px}
.section-badge{
  display:flex;align-items:center;gap:6px;
  background:#EAFAF0;border:1px solid #A8F5C8;
  color:#027A48;font-size:11px;font-weight:700;
  padding:3px 10px;border-radius:var(--r-full);
}
.section-badge-dot{width:5px;height:5px;border-radius:50%;background:#12B76A}


/* ── COMPANY MARQUEE ── */
.marquee-wrap{
  background:#0D1117;
  border-top:1px solid rgba(255,255,255,.07);
  border-bottom:1px solid rgba(255,255,255,.07);
  padding:20px 0;
  overflow:hidden;
  position:relative;
}
.marquee-wrap::before,.marquee-wrap::after{
  content:'';position:absolute;top:0;bottom:0;width:100px;z-index:2;pointer-events:none;
}
.marquee-wrap::before{left:0;background:linear-gradient(90deg,#0D1117 0%,transparent 100%)}
.marquee-wrap::after{right:0;background:linear-gradient(270deg,#0D1117 0%,transparent 100%)}
.marquee-track{
  display:flex;align-items:center;gap:48px;
  width:max-content;
  animation:marquee 28s linear infinite;
}
.marquee-track:hover{animation-play-state:paused}
@keyframes marquee{
  0%{transform:translateX(0)}
  100%{transform:translateX(-50%)}
}
.co-badge{
  display:flex;align-items:center;gap:9px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.1);
  border-radius:var(--r-full);
  padding:10px 20px;
  white-space:nowrap;flex-shrink:0;
  transition:background .2s;
}
.co-badge:hover{background:rgba(255,255,255,.1)}
.co-badge-logo{display:none}
.co-badge-name{font-size:13px;font-weight:600;color:rgba(255,255,255,.85);letter-spacing:.2px}

/* ── JOB CARD ── */
.jcard{
  background:var(--surface-base);
  border:1px solid var(--stroke-default);
  border-radius:var(--r-xl);
  padding:22px 24px;
  margin-bottom:12px;
  cursor:pointer;
  transition:box-shadow .18s ease,transform .18s ease,border-color .18s ease;
  box-shadow:var(--el-raised);
  display:flex;align-items:center;gap:16px;
}
.jcard:hover{
  box-shadow:var(--el-lifted);
  border-color:var(--stroke-strong);
  transform:translateY(-1px);
}

/* Company logo */
.co-logo{
  width:48px;height:48px;flex-shrink:0;
  border-radius:var(--r-md);
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:800;color:#FFFFFF;
  letter-spacing:-.5px;
  border:1px solid rgba(0,0,0,.06);
}

.jcard-body{flex:1;min-width:0}
.jcard-co{
  font-size:12px;font-weight:600;color:var(--content-muted);
  margin-bottom:3px;letter-spacing:.1px;
}
.jcard-title{
  font-size:17px;font-weight:700;color:var(--content-base);
  line-height:1.3;margin-bottom:12px;letter-spacing:-.2px;
}
.jcard-meta{display:flex;flex-wrap:wrap;align-items:center;gap:0}
.jcard-meta-item{
  display:flex;align-items:center;gap:4px;
  font-size:13px;font-weight:500;color:var(--content-muted);
}
.jcard-meta-dot{
  width:3px;height:3px;border-radius:50%;
  background:var(--neutral-300);margin:0 10px;flex-shrink:0;
}

.jcard-right{
  display:flex;flex-direction:column;
  align-items:flex-end;gap:10px;flex-shrink:0;
}
.jcard-badges{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.badge-hiring{
  background:#EBF0FF;border:1px solid rgba(26,86,255,.2);
  color:var(--brand-500);font-size:11px;font-weight:700;
  padding:3px 9px;border-radius:var(--r-full);white-space:nowrap;
}
.badge-early{
  background:#FFF1F7;border:1px solid rgba(227,27,143,.2);
  color:#E31B8F;font-size:11px;font-weight:700;
  padding:3px 9px;border-radius:var(--r-full);white-space:nowrap;
}
.jcard-sal{
  font-size:13px;font-weight:700;color:var(--content-subtle);
  white-space:nowrap;
}
.jcard-apply{
  background:var(--neutral-black);color:#FFFFFF;
  border:none;cursor:pointer;
  font-family:inherit;font-size:14px;font-weight:700;
  padding:10px 20px;border-radius:var(--r-lg);
  white-space:nowrap;transition:all .18s;
  display:flex;align-items:center;gap:6px;
  box-shadow:var(--el-raised);
}
.jcard-apply:hover{background:var(--neutral-900);box-shadow:var(--el-lifted);transform:translateY(-1px)}

/* Required skills row */
.jcard-skills{
  display:flex;align-items:center;gap:0;
  margin-top:12px;padding-top:12px;
  border-top:1px solid var(--stroke-default);
  flex-wrap:wrap;gap:6px;
}
.skills-label{font-size:12px;font-weight:500;color:var(--content-muted);margin-right:2px;white-space:nowrap}
.skill-chip{
  font-size:12px;font-weight:600;color:var(--content-subtle);
  display:flex;align-items:center;
}
.skill-chip::after{content:'·';margin:0 6px;color:var(--neutral-300);font-weight:400}
.skill-chip:last-child::after{display:none}

@media(max-width:640px){
  .jcard{flex-direction:column;align-items:flex-start}
  .jcard-right{align-items:flex-start;flex-direction:row;flex-wrap:wrap}
  .hstat{padding:14px 18px}
}

/* ── JD MODAL ── */
.ov{
  position:fixed;inset:0;
  background:var(--surface-overlay);
  backdrop-filter:blur(6px);
  z-index:200;
  display:flex;align-items:flex-start;justify-content:center;
  padding:24px 16px;overflow-y:auto;
  animation:fadeIn .2s ease;
}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

.jd-modal{
  background:var(--surface-base);
  border:1px solid var(--stroke-default);
  border-radius:var(--r-2xl);
  width:100%;max-width:660px;
  box-shadow:var(--el-modal);
  animation:slideUp .2s ease;
  margin:auto;
  overflow:hidden;
  display:flex;flex-direction:column;
  max-height:90vh;
}
@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}

.jd-hdr{
  padding:28px 28px 24px;
  border-bottom:1px solid var(--stroke-default);
  position:relative;
}
.jd-close{
  position:absolute;top:20px;right:20px;
  width:32px;height:32px;border-radius:var(--r-md);
  background:var(--surface-subtle);
  border:1px solid var(--stroke-default);
  color:var(--content-muted);
  cursor:pointer;font-size:16px;
  display:flex;align-items:center;justify-content:center;
  transition:all .15s;
}
.jd-close:hover{background:var(--neutral-100);color:var(--content-base)}
.jd-co-row{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.jd-co-logo{
  width:52px;height:52px;flex-shrink:0;
  border-radius:var(--r-md);
  display:flex;align-items:center;justify-content:center;
  font-size:16px;font-weight:800;color:#FFFFFF;
  border:1px solid rgba(0,0,0,.06);
}
.jd-co-name{font-size:12px;font-weight:600;color:var(--content-muted);letter-spacing:.2px;margin-bottom:4px}
.jd-title{font-size:22px;font-weight:800;color:var(--content-base);letter-spacing:-.5px;line-height:1.2}
.jd-meta-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:14px}
.jd-meta-chip{
  display:flex;align-items:center;gap:5px;
  background:var(--surface-subtle);
  border:1px solid var(--stroke-default);
  color:var(--content-subtle);
  font-size:12px;font-weight:600;
  padding:5px 12px;border-radius:var(--r-full);
}
.jd-meta-chip svg{color:var(--brand-500)}
.jd-sal-chip{
  background:var(--gold-50);
  border-color:var(--gold-200);
  color:var(--gold-500);font-weight:700;
}
.jd-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.jd-tag{
  background:var(--brand-50);border:1px solid rgba(26,86,255,.15);
  color:var(--brand-500);font-size:11px;font-weight:700;
  padding:3px 10px;border-radius:var(--r-full);
}

.jd-body{padding:24px 28px;overflow-y:auto;flex:1}
.jd-sec{margin-bottom:24px}
.jd-sec-title{
  font-size:11px;font-weight:700;color:var(--content-muted);
  text-transform:uppercase;letter-spacing:1.5px;
  margin-bottom:10px;
}
.jd-sec-text{
  font-size:14px;font-weight:400;color:var(--content-subtle);
  line-height:1.8;white-space:pre-wrap;
}

.jd-footer{
  padding:20px 28px 24px;
  border-top:1px solid var(--stroke-default);
  display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;
  background:var(--surface-subtle);
  flex-shrink:0;
}
.jd-apply-btn{
  background:var(--neutral-black);color:#FFFFFF;
  border:none;cursor:pointer;
  font-family:inherit;font-size:15px;font-weight:700;
  padding:13px 32px;border-radius:var(--r-lg);
  transition:all .18s;display:flex;align-items:center;gap:7px;
  box-shadow:var(--el-raised);
}
.jd-apply-btn:hover{background:var(--neutral-900);box-shadow:var(--el-lifted);transform:translateY(-1px)}
.jd-posted{font-size:12px;font-weight:500;color:var(--content-muted)}

/* ── APPLY MODAL ── */
.apply-modal{
  background:var(--surface-base);
  border:1px solid var(--stroke-default);
  border-radius:var(--r-2xl);
  padding:32px;width:100%;max-width:520px;
  box-shadow:var(--el-modal);
  animation:slideUp .2s ease;
  position:relative;margin:auto;
}
.modal-close{
  position:absolute;top:18px;right:18px;
  width:32px;height:32px;border-radius:var(--r-md);
  background:var(--surface-subtle);border:1px solid var(--stroke-default);
  color:var(--content-muted);cursor:pointer;font-size:16px;
  display:flex;align-items:center;justify-content:center;transition:all .15s;
}
.modal-close:hover{background:var(--neutral-100);color:var(--content-base)}
.modal-job-pill{
  display:flex;align-items:center;gap:12px;
  background:var(--surface-subtle);
  border:1px solid var(--stroke-default);
  border-radius:var(--r-lg);
  padding:12px 16px;margin-bottom:24px;
}
.mjp-logo{width:36px;height:36px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
.mjp-title{font-size:14px;font-weight:700;color:var(--content-base)}
.mjp-sub{font-size:12px;font-weight:500;color:var(--content-muted)}
.modal-h{font-size:22px;font-weight:800;color:var(--content-base);margin-bottom:5px;letter-spacing:-.4px}
.modal-s{font-size:14px;font-weight:400;color:var(--content-muted);margin-bottom:24px;line-height:1.5}
.divider{height:1px;background:var(--stroke-default);margin:20px 0}
.form-section-label{font-size:11px;font-weight:700;color:var(--brand-500);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:480px){.r2{grid-template-columns:1fr}}
.fg{margin-bottom:14px}
.lb{font-size:12px;font-weight:600;color:var(--content-subtle);margin-bottom:5px;display:block}
.opt{font-weight:400;color:var(--content-disabled)}
.inp{
  width:100%;
  background:#FFFFFF;
  border:1.5px solid var(--stroke-default);
  border-radius:var(--r-md);
  padding:10px 13px;
  font-family:inherit;font-size:14px;font-weight:400;
  color:var(--content-base);
  transition:all .15s;outline:none;
  box-shadow:inset 0 1px 2px rgba(13,17,23,.04);
}
.inp:focus{
  border-color:var(--brand-500);
  box-shadow:0 0 0 4px rgba(26,86,255,.1),inset 0 1px 2px rgba(13,17,23,.04);
}
.inp::placeholder{color:var(--content-disabled)}
.inp.er{border-color:#DC2626;box-shadow:0 0 0 4px rgba(220,38,38,.08)}
.inp option{background:#fff;color:var(--content-base)}
.et{font-size:12px;font-weight:500;color:#DC2626;margin-top:4px}
.upz{
  border:1.5px dashed var(--stroke-strong);
  border-radius:var(--r-lg);padding:24px;
  text-align:center;cursor:pointer;transition:all .15s;
  background:var(--surface-subtle);
}
.upz:hover,.upz.dg{border-color:var(--brand-500);background:var(--brand-50)}
.upz.dn{border-color:#12B76A;background:#EAFAF0}
.upt{font-size:13px;font-weight:500;color:var(--content-muted)}
.upt strong{color:var(--brand-500);font-weight:700}
.uph{font-size:11px;color:var(--content-disabled);margin-top:3px}
.upok{font-size:13px;font-weight:700;color:#027A48;margin-top:5px}
.sbtn{
  width:100%;
  background:var(--neutral-black);color:#FFFFFF;
  border:none;cursor:pointer;
  font-family:inherit;font-size:15px;font-weight:700;
  padding:14px;border-radius:var(--r-lg);
  margin-top:10px;transition:all .18s;
  box-shadow:var(--el-raised);
}
.sbtn:hover:not(:disabled){background:var(--neutral-900);box-shadow:var(--el-lifted);transform:translateY(-1px)}
.sbtn:disabled{opacity:.45;cursor:not-allowed}

/* SUCCESS */
.suc{text-align:center;padding:8px 0}
.sic{font-size:56px;display:block;margin-bottom:16px;animation:pop .4s ease}
@keyframes pop{0%{transform:scale(.3);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
.sh2{font-size:22px;font-weight:800;color:var(--content-base);margin-bottom:7px;letter-spacing:-.4px}
.sp{font-size:14px;color:var(--content-muted);line-height:1.65;margin-bottom:22px}
.sbox{
  background:var(--surface-subtle);border:1px solid var(--stroke-default);
  border-radius:var(--r-lg);padding:16px;margin-bottom:20px;text-align:left;
}
.sr{display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:7px 0;border-bottom:1px solid var(--stroke-default)}
.sr:last-child{border:none}
.sk{font-weight:500;color:var(--content-muted)}
.sv{font-weight:700;color:var(--content-base)}
.idp{
  background:var(--neutral-black);color:#FFFFFF;
  font-size:11px;font-weight:800;padding:3px 10px;border-radius:var(--r-md);
  letter-spacing:.3px;
}
.cbtn{
  background:var(--surface-subtle);border:1px solid var(--stroke-default);
  color:var(--content-subtle);cursor:pointer;
  font-family:inherit;font-size:14px;font-weight:600;
  padding:11px 26px;border-radius:var(--r-lg);transition:all .15s;
}
.cbtn:hover{background:var(--neutral-100);color:var(--content-base)}

/* ── ADMIN ── */
.adm-login{max-width:380px;margin:72px auto;padding:0 20px}
.adm-card{
  background:var(--surface-base);border:1px solid var(--stroke-default);
  border-radius:var(--r-2xl);padding:36px;text-align:center;
  box-shadow:var(--el-raised);
}
.adm-ico{font-size:40px;margin-bottom:16px}
.adm-h{font-size:22px;font-weight:800;color:var(--content-base);margin-bottom:6px;letter-spacing:-.4px}
.adm-s{font-size:14px;font-weight:400;color:var(--content-muted);margin-bottom:24px}
.adm-wrap{max-width:960px;margin:0 auto;padding:36px 24px 80px}
.adm-top{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:28px}
.adm-title{font-size:22px;font-weight:800;color:var(--content-base);letter-spacing:-.4px}
.adm-sub2{font-size:13px;font-weight:400;color:var(--content-muted);margin-top:3px}
.btns{display:flex;gap:8px;flex-wrap:wrap}
.btn-p{
  background:var(--neutral-black);color:#FFFFFF;
  border:none;cursor:pointer;
  font-family:inherit;font-size:13px;font-weight:700;
  padding:9px 16px;border-radius:var(--r-lg);
  display:flex;align-items:center;gap:6px;transition:all .18s;
  box-shadow:var(--el-raised);
}
.btn-p:hover{background:var(--neutral-900);box-shadow:var(--el-lifted);transform:translateY(-1px)}
.btn-g{
  background:#EAFAF0;border:1px solid #A8F5C8;color:#027A48;
  cursor:pointer;font-family:inherit;font-size:13px;font-weight:700;
  padding:9px 16px;border-radius:var(--r-lg);
  display:flex;align-items:center;gap:6px;transition:all .18s;
}
.btn-g:hover{background:#DEF7E5}
.btn-gh{
  background:var(--surface-subtle);border:1px solid var(--stroke-default);
  color:var(--content-subtle);cursor:pointer;
  font-family:inherit;font-size:13px;font-weight:600;
  padding:9px 14px;border-radius:var(--r-lg);transition:all .15s;
  text-decoration:none;display:flex;align-items:center;gap:6px;
}
.btn-gh:hover{background:var(--neutral-100);color:var(--content-base)}
.btn-sm{
  background:var(--brand-50);border:1px solid rgba(26,86,255,.15);color:var(--brand-500);
  cursor:pointer;font-family:inherit;font-size:12px;font-weight:600;
  padding:5px 11px;border-radius:var(--r-md);transition:all .15s;
}
.btn-sm:hover{background:#C9DBFF}
.btn-d{
  background:#FEF2F2;border:1px solid #FECDCA;color:#DC2626;
  cursor:pointer;font-family:inherit;font-size:12px;font-weight:600;
  padding:5px 11px;border-radius:var(--r-md);transition:all .15s;
}
.btn-d:hover{background:#FEE4E4}
.stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-bottom:24px}
.sc{
  background:var(--surface-base);border:1px solid var(--stroke-default);
  border-radius:var(--r-xl);padding:18px 20px;
  box-shadow:var(--el-raised);
}
.scn{font-size:24px;font-weight:800;color:var(--content-base);letter-spacing:-.5px}
.scl{font-size:12px;font-weight:500;color:var(--content-muted);margin-top:3px}
.seg{display:inline-flex;background:var(--surface-subtle);border:1px solid var(--stroke-default);border-radius:var(--r-lg);padding:3px;gap:2px;margin-bottom:18px}
.seg-b{padding:7px 16px;border-radius:var(--r-md);border:none;background:none;font-family:inherit;font-size:13px;font-weight:600;color:var(--content-muted);cursor:pointer;transition:all .15s}
.seg-b.act{background:var(--surface-base);color:var(--content-base);box-shadow:var(--el-raised)}
.jrow{
  background:var(--surface-base);border:1px solid var(--stroke-default);
  border-radius:var(--r-xl);padding:16px 18px;margin-bottom:8px;
  display:flex;align-items:center;gap:14px;
  box-shadow:var(--el-raised);
}
.jrb{flex:1;min-width:0}
.jrt{font-size:15px;font-weight:700;color:var(--content-base);margin-bottom:4px;letter-spacing:-.2px}
.jrm{display:flex;flex-wrap:wrap;gap:8px}
.jrmi{font-size:12px;font-weight:500;color:var(--content-muted)}
.jra{display:flex;gap:7px;flex-shrink:0;flex-wrap:wrap;align-items:center}
.pon{background:#EAFAF0;border:1px solid #A8F5C8;color:#027A48;font-size:11px;font-weight:700;padding:3px 9px;border-radius:var(--r-full)}
.poff{background:var(--surface-subtle);border:1px solid var(--stroke-default);color:var(--content-disabled);font-size:11px;font-weight:600;padding:3px 9px;border-radius:var(--r-full)}
.frow{display:flex;gap:9px;margin-bottom:16px;flex-wrap:wrap}
.fi{
  background:var(--surface-base);border:1.5px solid var(--stroke-default);
  border-radius:var(--r-md);padding:9px 13px;
  font-family:inherit;font-size:13px;font-weight:400;
  color:var(--content-base);outline:none;
  transition:border-color .15s;flex:1;min-width:150px;
}
.fi:focus{border-color:var(--brand-500)}
.fi::placeholder{color:var(--content-disabled)}
.tbl-wrap{
  background:var(--surface-base);border:1px solid var(--stroke-default);
  border-radius:var(--r-xl);overflow:hidden;overflow-x:auto;
  box-shadow:var(--el-raised);
}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{background:var(--surface-subtle);border-bottom:1px solid var(--stroke-default)}
th{padding:11px 14px;text-align:left;color:var(--content-muted);font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;white-space:nowrap}
td{padding:11px 14px;border-bottom:1px solid var(--stroke-default);color:var(--content-subtle);vertical-align:middle;font-weight:500}
tr:last-child td{border:none}
tr:hover td{background:var(--surface-subtle)}
.ta{
  width:100%;background:var(--surface-base);
  border:1.5px solid var(--stroke-default);border-radius:var(--r-md);
  padding:10px 13px;font-family:inherit;font-size:13px;font-weight:400;
  color:var(--content-base);resize:vertical;min-height:76px;outline:none;
  transition:border-color .15s;line-height:1.65;
}
.ta:focus{border-color:var(--brand-500);box-shadow:0 0 0 4px rgba(26,86,255,.1)}
.ta::placeholder{color:var(--content-disabled)}
.hint{font-size:11px;font-weight:500;color:var(--content-muted);margin-bottom:5px}
.tags-list{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px}
.tag-x{
  display:flex;align-items:center;gap:4px;
  background:var(--brand-50);border:1px solid rgba(26,86,255,.15);
  color:var(--brand-500);font-size:12px;font-weight:600;
  padding:3px 9px;border-radius:var(--r-full);cursor:pointer;transition:all .15s;
}
.tag-x:hover{background:#FEF2F2;color:#DC2626;border-color:#FECDCA}
.tags-row{display:flex;gap:7px;margin-bottom:5px}
.empty-state{text-align:center;padding:60px 20px;color:var(--content-muted)}
.empty-ic{font-size:44px;margin-bottom:12px}
.loading{text-align:center;padding:60px;color:var(--content-muted);font-size:15px;font-weight:500}

/* ── FOOTER ── */
.footer{
  background:var(--neutral-black);
  padding:32px 24px;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:16px;
}
.footer-right{font-size:12px;font-weight:500;color:rgba(255,255,255,.3)}
`;

// ── HELPERS ───────────────────────────────────────────────
const Ic = ({ n, s = 13 }) => {
  const p = {
    loc: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>,
    bag: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    up: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></>,
    dl: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></>,
    rupee: <><path d="M6 3h12M6 8h12M6 21l7-13"/><path d="M6 8a5 5 0 0010 0"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{p[n]}</svg>;
};

const LOGO_COLORS = ["#1A56FF","#7C3AED","#059669","#DC2626","#D97706","#0891B2","#BE185D","#2563EB"];
function logoColor(name) {
  let h = 0;
  for (let i = 0; i < (name||"").length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return LOGO_COLORS[Math.abs(h) % LOGO_COLORS.length];
}
function logoInitials(name) {
  if (!name) return "?";
  const w = name.trim().split(/\s+/);
  return w.length === 1 ? w[0].slice(0,2).toUpperCase() : (w[0][0]+w[1][0]).toUpperCase();
}

// ── APPLY MODAL ───────────────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [f, setF] = useState({ name:"",phone:"",email:"",years_exp:"",notice_period:"",current_salary:"",expected_salary:"" });
  const [cv, setCv] = useState(null);
  const [drag, setDrag] = useState(false);
  const [errs, setErrs] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const clr = k => setErrs(p=>({...p,[k]:""}));

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Full name is required";
    if (!f.phone.trim()) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s+/g,""))) e.phone = "Enter valid 10-digit Indian mobile number";
    if (f.email && !/\S+@\S+\.\S+/.test(f.email)) e.email = "Enter a valid email address";
    return e;
  };

  const handleFile = file => {
    if (!file) return;
    if (!["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) return alert("PDF or Word only.");
    if (file.size > 5*1024*1024) return alert("Max 5 MB.");
    setCv(file);
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setBusy(true);
    try {
      const s = await sb();
      const id = "SHN-" + Math.random().toString(36).slice(2,8).toUpperCase();
      const { error } = await s.from("applications").insert([{
        id, job_id: String(job.id), job_title: job.title,
        job_location: job.location, company_id: "shine",
        name: f.name, phone: f.phone, email: f.email||null,
        years_exp: f.years_exp||null, notice_period: f.notice_period||null,
        current_salary: f.current_salary||null, expected_salary: f.expected_salary||null,
        cv_filename: cv ? cv.name : null,
      }]);
      if (error) throw error;
      setDone({ ...f, id, job_title: job.title });
    } catch(err) { alert("Failed to submit. Please try again."); console.error(err); }
    finally { setBusy(false); }
  };

  if (done) return (
    <div className="ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="apply-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="suc">
          <span className="sic">🎉</span>
          <div className="sh2">Application Received!</div>
          <p className="sp">Our team will review your profile and reach out within 2 business days.</p>
          <div className="sbox">
            {[["Application ID",<span className="idp">{done.id}</span>],["Name",done.name],["Phone",done.phone],done.email&&["Email",done.email],["Applied For",done.job_title]].filter(Boolean).map(([k,v])=>(
              <div key={k} className="sr"><span className="sk">{k}</span><span className="sv">{v}</span></div>
            ))}
          </div>
          <button className="cbtn" onClick={onClose}>Back to Jobs</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="apply-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-job-pill">
          <div className="mjp-logo" style={{background:logoColor(job.company)}}>{logoInitials(job.company)}</div>
          <div>
            <div className="mjp-title">{job.title}</div>
            <div className="mjp-sub">{job.company} · {job.location}</div>
          </div>
        </div>
        <div className="modal-h">Apply for this Role</div>
        <div className="modal-s">Fill in your details and we'll reach out within 2 business days.</div>

        <div className="form-section-label">Personal Details</div>
        <div className="r2">
          <div className="fg">
            <label className="lb">Full Name</label>
            <input className={`inp${errs.name?" er":""}`} placeholder="Ravi Kumar" value={f.name} onChange={e=>{set("name",e.target.value);clr("name")}} />
            {errs.name&&<div className="et">{errs.name}</div>}
          </div>
          <div className="fg">
            <label className="lb">Mobile Number</label>
            <input className={`inp${errs.phone?" er":""}`} placeholder="10-digit mobile" value={f.phone} onChange={e=>{set("phone",e.target.value);clr("phone")}} />
            {errs.phone&&<div className="et">{errs.phone}</div>}
          </div>
        </div>
        <div className="fg">
          <label className="lb">Email Address <span className="opt">(optional)</span></label>
          <input className={`inp${errs.email?" er":""}`} placeholder="you@company.com" value={f.email} onChange={e=>{set("email",e.target.value);clr("email")}} />
          {errs.email&&<div className="et">{errs.email}</div>}
        </div>

        <div className="divider"/>
        <div className="form-section-label">Experience <span style={{color:"var(--content-disabled)",fontWeight:400,textTransform:"none",letterSpacing:0}}>— optional</span></div>
        <div className="r2">
          <div className="fg">
            <label className="lb">Total Experience <span className="opt">(yrs)</span></label>
            <input className="inp" placeholder="e.g. 5" value={f.years_exp} onChange={e=>set("years_exp",e.target.value)} />
          </div>
          <div className="fg">
            <label className="lb">Notice Period</label>
            <select className="inp" value={f.notice_period} onChange={e=>set("notice_period",e.target.value)}>
              <option value="">Select</option>
              {["Immediate","15 days","30 days","45 days","60 days","90 days"].map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="r2">
          <div className="fg">
            <label className="lb">Current CTC <span className="opt">(LPA)</span></label>
            <input className="inp" placeholder="e.g. 12" value={f.current_salary} onChange={e=>set("current_salary",e.target.value)} />
          </div>
          <div className="fg">
            <label className="lb">Expected CTC <span className="opt">(LPA)</span></label>
            <input className="inp" placeholder="e.g. 18" value={f.expected_salary} onChange={e=>set("expected_salary",e.target.value)} />
          </div>
        </div>

        <div className="divider"/>
        <div className="form-section-label">Resume / CV <span style={{color:"var(--content-disabled)",fontWeight:400,textTransform:"none",letterSpacing:0}}>— optional</span></div>
        <div className={`upz${drag?" dg":""}${cv?" dn":""}`}
          onDragOver={e=>{e.preventDefault();setDrag(true)}}
          onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}}
          onClick={()=>document.getElementById("cv-up").click()}>
          <div style={{color:"var(--brand-500)",marginBottom:6}}><Ic n="up" s={20}/></div>
          {cv
            ? <div className="upok">✓ {cv.name}</div>
            : <><div className="upt"><strong>Click to upload</strong> or drag & drop</div><div className="uph">PDF or Word · max 5 MB</div></>
          }
          <input id="cv-up" type="file" style={{display:"none"}} accept=".pdf,.doc,.docx" onChange={e=>handleFile(e.target.files[0])} />
        </div>
        <button className="sbtn" onClick={submit} disabled={busy}>{busy?"Submitting…":"Submit Application →"}</button>
      </div>
    </div>
  );
}

// ── JD MODAL ─────────────────────────────────────────────
function JDModal({ job, onApply, onClose }) {
  return (
    <div className="ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="jd-modal">
        <div className="jd-hdr">
          <button className="jd-close" onClick={onClose}>×</button>
          <div className="jd-co-row">
            <div className="jd-co-logo" style={{background:logoColor(job.company)}}>{logoInitials(job.company)}</div>
            <div>
              <div className="jd-co-name">{job.company}</div>
              <div className="jd-title">{job.title}</div>
            </div>
          </div>
          <div className="jd-meta-row">
            {job.location && <span className="jd-meta-chip"><Ic n="loc" s={11}/>{job.location}</span>}
            {job.experience && <span className="jd-meta-chip"><Ic n="bag" s={11}/>{job.experience}</span>}
            {job.type && <span className="jd-meta-chip"><Ic n="globe" s={11}/>{job.type}</span>}
            {job.salary && <span className="jd-meta-chip jd-sal-chip">{job.salary}</span>}
          </div>
          {(job.tags||[]).length > 0 && (
            <div className="jd-tags">
              {job.tags.map(t=><span key={t} className="jd-tag">{t}</span>)}
            </div>
          )}
        </div>

        <div className="jd-body">
          {job.about && <div className="jd-sec"><div className="jd-sec-title">About This Role</div><div className="jd-sec-text">{job.about}</div></div>}
          {job.responsibilities && <div className="jd-sec"><div className="jd-sec-title">Responsibilities</div><div className="jd-sec-text">{job.responsibilities}</div></div>}
          {job.requirements && <div className="jd-sec"><div className="jd-sec-title">Requirements</div><div className="jd-sec-text">{job.requirements}</div></div>}
          {job.perks && <div className="jd-sec"><div className="jd-sec-title">Perks & Benefits</div><div className="jd-sec-text">{job.perks}</div></div>}
          {!job.about && !job.responsibilities && !job.requirements && (
            <div style={{color:"var(--content-muted)",fontSize:14,textAlign:"center",padding:"20px 0"}}>No detailed JD added yet.</div>
          )}
        </div>

        <div className="jd-footer">
          <button className="jd-apply-btn" onClick={onApply}>Apply for this Role <Ic n="arrow" s={14}/></button>
          <div className="jd-posted">Posted on Shine.com</div>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN JOB FORM ────────────────────────────────────────
function JobFormModal({ editJob, onSave, onClose }) {
  const blank = { title:"",company:"",location:"",type:"Full-time",experience:"",salary:"",tags:[],about:"",responsibilities:"",requirements:"",perks:"" };
  const [form, setForm] = useState(editJob ? { ...editJob, tags:[...(editJob.tags||[])] } : blank);
  const [ti, setTi] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const addTag = () => { const t=ti.trim(); if(t&&!form.tags.includes(t)) set("tags",[...form.tags,t]); setTi(""); };

  const save = async () => {
    if (!form.title.trim()) return alert("Job title is required.");
    setBusy(true);
    try {
      const s = await sb();
      if (editJob) await s.from("shine_jobs").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editJob.id);
      else await s.from("shine_jobs").insert([{ ...form, active: true }]);
      onSave();
    } catch(err) { alert("Save failed: " + err.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="apply-modal" style={{maxWidth:620}}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-h" style={{marginBottom:4}}>{editJob?"Edit Job":"Post New Job"}</div>
        <div className="modal-s">Full JD is revealed when a candidate opens the card.</div>

        <div className="form-section-label">Basic Info</div>
        <div className="fg"><label className="lb">Job Title</label><input className="inp" placeholder="e.g. Senior Software Engineer" value={form.title} onChange={e=>set("title",e.target.value)} /></div>
        <div className="r2">
          <div className="fg"><label className="lb">Company Name</label><input className="inp" placeholder="e.g. HCL Technologies" value={form.company} onChange={e=>set("company",e.target.value)} /></div>
          <div className="fg"><label className="lb">Location</label><input className="inp" placeholder="e.g. Bengaluru" value={form.location} onChange={e=>set("location",e.target.value)} /></div>
        </div>
        <div className="r2">
          <div className="fg">
            <label className="lb">Job Type</label>
            <select className="inp" value={form.type} onChange={e=>set("type",e.target.value)}>
              {["Full-time","Remote","Hybrid","Contract"].map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lb">Experience</label><input className="inp" placeholder="e.g. 4–8 yrs" value={form.experience} onChange={e=>set("experience",e.target.value)} /></div>
        </div>
        <div className="fg"><label className="lb">Salary Range</label><input className="inp" placeholder="e.g. ₹18–28 LPA" value={form.salary} onChange={e=>set("salary",e.target.value)} /></div>
        <div className="fg">
          <label className="lb">Skills / Tags</label>
          <div className="tags-list">{form.tags.map(t=><span key={t} className="tag-x" onClick={()=>set("tags",form.tags.filter(x=>x!==t))}>{t} ×</span>)}</div>
          <div className="tags-row">
            <input className="inp" placeholder="Type a skill and press Add" value={ti} onChange={e=>setTi(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addTag())} style={{flex:1}} />
            <button className="btn-sm" onClick={addTag}>Add</button>
          </div>
        </div>

        <div className="divider"/>
        <div className="form-section-label">Full Job Description</div>
        <div className="fg"><label className="lb">About This Role</label><textarea className="ta" rows={3} placeholder="Overview of the role and team..." value={form.about} onChange={e=>set("about",e.target.value)} /></div>
        <div className="fg">
          <label className="lb">Responsibilities</label>
          <div className="hint">Paste directly from your JD — line breaks are preserved.</div>
          <textarea className="ta" rows={5} placeholder={"• Design and build microservices\n• Own performance and reliability"} value={form.responsibilities} onChange={e=>set("responsibilities",e.target.value)} />
        </div>
        <div className="fg"><label className="lb">Requirements</label><textarea className="ta" rows={5} placeholder={"• 4+ years Java experience\n• Distributed systems knowledge"} value={form.requirements} onChange={e=>set("requirements",e.target.value)} /></div>
        <div className="fg"><label className="lb">Perks & Benefits <span className="opt">(optional)</span></label><textarea className="ta" rows={3} placeholder={"• ESOPs after 2 yrs\n• Health insurance"} value={form.perks} onChange={e=>set("perks",e.target.value)} /></div>

        <div style={{display:"flex",gap:9,marginTop:8}}>
          <button className="sbtn" style={{margin:0}} onClick={save} disabled={busy}>{busy?"Saving…":editJob?"Save Changes →":"Post Job →"}</button>
          <button className="btn-gh" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────
function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState(""); const [pwErr, setPwErr] = useState("");
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [view, setView] = useState("jobs");
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const s = await sb();
    const [{ data: j }, { data: a }] = await Promise.all([
      s.from("shine_jobs").select("*").order("created_at", { ascending: false }),
      s.from("applications").select("*").eq("company_id","shine").order("created_at", { ascending: false }),
    ]);
    setJobs(j||[]); setApps(a||[]);
    setLoading(false);
  };

  const login = () => { if (pw===ADMIN_PASSWORD) { setAuthed(true); load(); } else setPwErr("Incorrect password."); };
  const toggleActive = async (job) => { const s=await sb(); await s.from("shine_jobs").update({active:!job.active}).eq("id",job.id); load(); };
  const deleteJob = async (job) => { if (!window.confirm(`Delete "${job.title}"?`)) return; const s=await sb(); await s.from("shine_jobs").delete().eq("id",job.id); load(); };

  const filteredApps = apps.filter(a => {
    const q = search.toLowerCase();
    return !q || a.name?.toLowerCase().includes(q) || a.phone?.includes(q) || a.email?.toLowerCase().includes(q);
  });

  const downloadCSV = () => {
    const cols = ["id","job_title","name","phone","email","years_exp","notice_period","current_salary","expected_salary","cv_filename","created_at"];
    const hdr = cols.join(",");
    const rows = filteredApps.map(r=>cols.map(c=>`"${(r[c]??"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href=URL.createObjectURL(new Blob([hdr+"\n"+rows],{type:"text/csv"}));
    a.download=`shine-apps-${new Date().toISOString().slice(0,10)}.csv`; a.click();
  };

  if (!authed) return (
    <div className="adm-login">
      <div className="adm-card">
        <div className="adm-ico">🔐</div>
        <div className="adm-h">Admin Access</div>
        <div className="adm-s">Enter password to manage jobs and view applications.</div>
        <div className="fg">
          <input className={`inp${pwErr?" er":""}`} type="password" placeholder="Password" value={pw} onChange={e=>{setPw(e.target.value);setPwErr("")}} onKeyDown={e=>e.key==="Enter"&&login()} />
          {pwErr&&<div className="et">{pwErr}</div>}
        </div>
        <button className="sbtn" onClick={login}>Login →</button>
        <div style={{marginTop:16,textAlign:"center"}}>
          <a href="/" style={{color:"var(--content-muted)",fontSize:13,fontWeight:500,textDecoration:"none"}}>← Back to portal</a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {(showForm||editJob) && (
        <JobFormModal editJob={editJob}
          onSave={()=>{setShowForm(false);setEditJob(null);load();}}
          onClose={()=>{setShowForm(false);setEditJob(null);}} />
      )}
      <div className="adm-wrap">
        <div className="adm-top">
          <div>
            <div className="adm-title">Admin Dashboard</div>
            <div className="adm-sub2">{jobs.filter(j=>j.active).length} live jobs · {apps.length} total applications</div>
          </div>
          <div className="btns">
            {view==="jobs" && <button className="btn-p" onClick={()=>{setEditJob(null);setShowForm(true)}}><Ic n="plus" s={13}/> Post Job</button>}
            {view==="apps" && <button className="btn-g" onClick={downloadCSV}><Ic n="dl" s={13}/> Download CSV</button>}
            <a href="/" className="btn-gh">← View Portal</a>
          </div>
        </div>
        <div className="stats">
          {[["Total Jobs",jobs.length],["Live Now",jobs.filter(j=>j.active).length],["Applications",apps.length],["With CV",apps.filter(a=>a.cv_filename).length]].map(([l,n])=>(
            <div key={l} className="sc"><div className="scn">{n}</div><div className="scl">{l}</div></div>
          ))}
        </div>
        <div className="seg">
          <button className={`seg-b${view==="jobs"?" act":""}`} onClick={()=>setView("jobs")}>Jobs ({jobs.length})</button>
          <button className={`seg-b${view==="apps"?" act":""}`} onClick={()=>setView("apps")}>Applications ({apps.length})</button>
        </div>
        {loading ? <div className="loading">Loading…</div> : view==="jobs" ? (
          jobs.length===0
            ? <div className="empty-state"><div className="empty-ic">📋</div><p>No jobs yet. Click "Post Job" above.</p></div>
            : jobs.map(job=>(
              <div key={job.id} className="jrow">
                <div className="jrb">
                  <div className="jrt">{job.title}</div>
                  <div className="jrm">
                    <span className="jrmi">{job.company}</span><span className="jrmi">·</span>
                    <span className="jrmi">{job.location}</span><span className="jrmi">·</span>
                    <span className="jrmi">{job.salary}</span><span className="jrmi">·</span>
                    <span className="jrmi">{apps.filter(a=>a.job_id===String(job.id)).length} applicants</span>
                  </div>
                </div>
                <div className="jra">
                  <span className={job.active?"pon":"poff"}>{job.active?"● Live":"Paused"}</span>
                  <button className="btn-sm" onClick={()=>toggleActive(job)}>{job.active?"Pause":"Activate"}</button>
                  <button className="btn-sm" onClick={()=>{setEditJob(job);setShowForm(false)}}><Ic n="edit" s={12}/></button>
                  <button className="btn-d" onClick={()=>deleteJob(job)}><Ic n="trash" s={12}/></button>
                </div>
              </div>
            ))
        ) : (
          <>
            <div className="frow"><input className="fi" placeholder="Search by name, phone, or email…" value={search} onChange={e=>setSearch(e.target.value)} /></div>
            {filteredApps.length===0
              ? <div className="empty-state"><div className="empty-ic">📭</div><p>No applications yet.</p></div>
              : <div className="tbl-wrap"><table>
                <thead><tr>{["ID","Role","Name","Phone","Email","Exp","Notice","Curr CTC","Exp CTC","CV","Date"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>{filteredApps.map(r=>(
                  <tr key={r.id}>
                    <td style={{fontFamily:"monospace",fontSize:11,color:"var(--content-muted)"}}>{r.id}</td>
                    <td style={{fontWeight:700,color:"var(--content-base)",maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.job_title}</td>
                    <td style={{fontWeight:700,color:"var(--content-base)"}}>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.email||<span style={{color:"var(--content-disabled)"}}>—</span>}</td>
                    <td>{r.years_exp||"—"}</td>
                    <td>{r.notice_period||"—"}</td>
                    <td>{r.current_salary?r.current_salary+"L":"—"}</td>
                    <td>{r.expected_salary?r.expected_salary+"L":"—"}</td>
                    <td>{r.cv_filename?<span style={{color:"var(--brand-500)",fontSize:12,fontWeight:700}}>📎</span>:<span style={{color:"var(--content-disabled)"}}>—</span>}</td>
                    <td style={{whiteSpace:"nowrap",color:"var(--content-muted)"}}>{new Date(r.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</td>
                  </tr>
                ))}</tbody>
              </table></div>
            }
          </>
        )}
      </div>
    </>
  );
}


// ── COMPANY MARQUEE ──────────────────────────────────────
const MARQUEE_COS = [
  { name:"HCL Technologies", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/HCL_Technologies_logo.svg/320px-HCL_Technologies_logo.svg.png" },
  { name:"Amazon",           logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png" },
  { name:"Genpact",          logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Genpact_logo.svg/320px-Genpact_logo.svg.png" },
  { name:"Cvent",            logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cvent_logo.svg/320px-Cvent_logo.svg.png" },
  { name:"Infosys",          logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/320px-Infosys_logo.svg.png" },
  { name:"Wipro",            logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/320px-Wipro_Primary_Logo_Color_RGB.svg.png" },
  { name:"TCS",              logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/320px-Tata_Consultancy_Services_Logo.svg.png" },
  { name:"Accenture",        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/320px-Accenture.svg.png" },
  { name:"Capgemini",        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Capgemini_201x_logo.svg/320px-Capgemini_201x_logo.svg.png" },
  { name:"Cognizant",        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cognizant_logo_2022.svg/320px-Cognizant_logo_2022.svg.png" },
  { name:"IBM",              logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/320px-IBM_logo.svg.png" },
  { name:"Microsoft",        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/320px-Microsoft_logo_%282012%29.svg.png" },
];

function CompanyMarquee() {
  const doubled = [...MARQUEE_COS, ...MARQUEE_COS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((co, i) => (
          <div key={i} className="co-badge">
            <img
              src={co.logo}
              alt={co.name}
              style={{height:22,width:"auto",maxWidth:90,objectFit:"contain",filter:"brightness(0) invert(1)",opacity:.85}}
              onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="inline"; }}
            />
            <span style={{display:"none",fontSize:12,fontWeight:700,color:"rgba(255,255,255,.8)"}}>{co.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PORTAL ────────────────────────────────────────────────
function Portal() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openJD, setOpenJD] = useState(null);
  const [applyJob, setApplyJob] = useState(null);

  useEffect(() => {
    (async () => {
      const s = await sb();
      const { data } = await s.from("shine_jobs").select("*").eq("active",true).order("created_at",{ascending:false});
      setJobs(data||[]);
      setLoading(false);
    })();
  }, []);

  const openJobBySlug = (jobList, slug) => {
    const match = jobList.find(j => toSlug(j.title, j.company) === slug);
    if (match) setOpenJD(match);
  };

  return (
    <>
      <header className="hdr">
        <div className="hdr-left">
          <ShineLogo height={26} light />
          <div className="hdr-divider"/>
          <div className="hdr-tagline">Exclusive <strong>Premium Roles</strong></div>
        </div>
        <div className="hdr-right">
          <div className="hdr-pill">{jobs.length} OPENINGS</div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-eyebrow"><span className="hero-dot"/>Actively Hiring · 2026</div>
        <h1>Find Your Next<br /><em>Dream Role</em></h1>
        <p className="hero-sub">Handpicked opportunities from India's top companies — vetted, high-growth, and ready to move fast.</p>
        <div className="hero-stats">
          <div className="hstat"><div className="hstat-n">{jobs.length}</div><div className="hstat-l">Open Roles</div></div>
          
          <div className="hstat"><div className="hstat-n">Top Roles</div><div className="hstat-l">Leading Companies</div></div>
          <div className="hstat"><div className="hstat-n">Direct Calls</div><div className="hstat-l">From HR Managers</div></div>
        </div>
      </section>

      <CompanyMarquee />

      <div className="section">
        <div className="section-header">
          <div className="section-title">Current Openings</div>
          <div className="section-badge"><span className="section-badge-dot"/>Updated Today</div>
        </div>

        {loading ? <div className="loading">Loading jobs…</div> :
          jobs.length===0
            ? <div className="empty-state"><div className="empty-ic">📭</div><p>No openings right now. Check back soon.</p></div>
            : jobs.map((job, idx) => (
              <div key={job.id} className="jcard" onClick={()=>{ setOpenJD(job); window.history.pushState({}, '', '/jobs/'+toSlug(job.title, job.company)); }}>
                <div className="co-logo" style={{background:logoColor(job.company)}}>{logoInitials(job.company)}</div>
                <div className="jcard-body">
                  <div className="jcard-co">{job.company}</div>
                  <div className="jcard-title">{job.title}</div>
                  <div className="jcard-meta">
                    {job.experience && <><span className="jcard-meta-item"><Ic n="bag" s={12}/>{job.experience}</span><span className="jcard-meta-dot"/></>}
                    {job.salary && <><span className="jcard-meta-item"><Ic n="rupee" s={12}/>{job.salary}</span><span className="jcard-meta-dot"/></>}
                    {job.location && <span className="jcard-meta-item"><Ic n="loc" s={12}/>{job.location}</span>}
                  </div>
                  {(job.tags||[]).length > 0 && (
                    <div className="jcard-skills">
                      <span className="skills-label">Required:</span>
                      {job.tags.slice(0,5).map(t=>(
                        <span key={t} className="skill-chip">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="jcard-right">
                  <div className="jcard-badges">
                    <span className="badge-hiring">Actively Hiring</span>
                    {idx < 2 && <span className="badge-early">Be An Early Applicant</span>}
                  </div>
                  <button className="jcard-apply" onClick={e=>{ e.stopPropagation(); setOpenJD(job); window.history.pushState({}, '', '/jobs/'+toSlug(job.title, job.company)); }}>
                    Apply <Ic n="arrow" s={13}/>
                  </button>
                </div>
              </div>
            ))
        }
      </div>

      <footer className="footer">
        <ShineLogo height={24} />
        <div className="footer-right">© 2026 Shine.com · All Rights Reserved</div>
      </footer>

      {openJD && !applyJob && (
        <JDModal job={openJD} onApply={()=>{setApplyJob(openJD);setOpenJD(null);}} onClose={()=>{ setOpenJD(null); window.history.pushState({}, '', '/'); }} />
      )}
      {applyJob && (
        <ApplyModal job={applyJob} onClose={()=>setApplyJob(null)} />
      )}
    </>
  );
}


// ── JOB PAGE — direct URL e.g. /jobs/senior-engineer-hcl ─
function JobPage() {
  const slug = getJobSlug();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState(null);

  useEffect(() => {
    (async () => {
      const s = await sb();
      const { data } = await s.from("shine_jobs").select("*").eq("active", true);
      const match = (data||[]).find(j => toSlug(j.title, j.company) === slug);
      setJob(match || null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return (
    <>
      <header className="hdr">
        <div className="hdr-left">
          <ShineLogo height={26} light />
          <div className="hdr-divider"/>
          <div className="hdr-tagline">Exclusive <strong>Premium Roles</strong></div>
        </div>
      </header>
      <div className="loading" style={{paddingTop:80}}>Loading…</div>
    </>
  );

  if (!job) return (
    <>
      <header className="hdr">
        <div className="hdr-left">
          <ShineLogo height={26} light />
          <div className="hdr-divider"/>
          <div className="hdr-tagline">Exclusive <strong>Premium Roles</strong></div>
        </div>
      </header>
      <div className="empty-state" style={{paddingTop:80}}>
        <div className="empty-ic">🔍</div>
        <p style={{marginBottom:16}}>This job is no longer available.</p>
        <a href="/" style={{color:"var(--brand-500)",fontWeight:600,fontSize:14}}>← View all openings</a>
      </div>
    </>
  );

  return (
    <>
      <header className="hdr">
        <div className="hdr-left">
          <ShineLogo height={26} light />
          <div className="hdr-divider"/>
          <div className="hdr-tagline">Exclusive <strong>Premium Roles</strong></div>
        </div>
        <div className="hdr-right">
          <a href="/" style={{color:"var(--content-muted)",fontSize:13,fontWeight:600,textDecoration:"none"}}>← All Jobs</a>
        </div>
      </header>

      {/* Full JD laid out as a page, not modal */}
      <div style={{maxWidth:720,margin:"0 auto",padding:"40px 24px 80px"}}>
        {/* Header card */}
        <div style={{background:"var(--surface-base)",border:"1px solid var(--stroke-default)",borderRadius:"var(--r-2xl)",padding:"32px",marginBottom:16,boxShadow:"var(--el-raised)"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
            <div className="co-logo" style={{background:logoColor(job.company),width:56,height:56,fontSize:18,borderRadius:12}}>
              {logoInitials(job.company)}
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"var(--content-muted)",marginBottom:4,letterSpacing:".2px"}}>{job.company}</div>
              <div style={{fontSize:24,fontWeight:800,color:"var(--content-base)",letterSpacing:"-.5px",lineHeight:1.2}}>{job.title}</div>
            </div>
          </div>
          <div className="jd-meta-row">
            {job.location && <span className="jd-meta-chip"><Ic n="loc" s={11}/>{job.location}</span>}
            {job.experience && <span className="jd-meta-chip"><Ic n="bag" s={11}/>{job.experience}</span>}
            {job.type && <span className="jd-meta-chip"><Ic n="globe" s={11}/>{job.type}</span>}
            {job.salary && <span className="jd-meta-chip jd-sal-chip">{job.salary}</span>}
          </div>
          {(job.tags||[]).length > 0 && (
            <div className="jd-tags" style={{marginTop:12}}>
              {job.tags.map(t=><span key={t} className="jd-tag">{t}</span>)}
            </div>
          )}
        </div>

        {/* JD sections */}
        {[["About This Role",job.about],["Responsibilities",job.responsibilities],["Requirements",job.requirements],["Perks & Benefits",job.perks]].filter(([,v])=>v).map(([title,text])=>(
          <div key={title} style={{background:"var(--surface-base)",border:"1px solid var(--stroke-default)",borderRadius:"var(--r-xl)",padding:"24px 28px",marginBottom:12,boxShadow:"var(--el-raised)"}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--content-muted)",textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:10}}>{title}</div>
            <div style={{fontSize:14,fontWeight:400,color:"var(--content-subtle)",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{text}</div>
          </div>
        ))}

        {/* Sticky apply bar */}
        <div style={{
          position:"sticky",bottom:20,
          background:"var(--surface-base)",
          border:"1px solid var(--stroke-default)",
          borderRadius:"var(--r-xl)",
          padding:"16px 22px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          boxShadow:"var(--el-overlay)",
          marginTop:16,flexWrap:"wrap",gap:12,
        }}>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:"var(--content-base)"}}>{job.title}</div>
            <div style={{fontSize:13,fontWeight:500,color:"var(--content-muted)"}}>{job.company} · {job.location}</div>
          </div>
          <button className="jd-apply-btn" onClick={()=>setApplyJob(job)}>
            Apply for this Role <Ic n="arrow" s={14}/>
          </button>
        </div>
      </div>

      <footer className="footer">
        <ShineLogo height={24} />
        <div className="footer-right">© 2026 Shine.com · All Rights Reserved</div>
      </footer>

      {applyJob && <ApplyModal job={applyJob} onClose={()=>setApplyJob(null)} />}
    </>
  );
}

// ── ROOT ──────────────────────────────────────────────────
export default function App() {
  const route = getRoute();
  return (
    <>
      <style>{CSS}</style>
      {route === "admin" ? (
        <>
          <header className="hdr">
            <div className="hdr-left">
              <ShineLogo height={26} light />
              <div className="hdr-divider"/>
              <div className="hdr-tagline">Admin Panel</div>
            </div>
          </header>
          <AdminPanel />
          <footer className="footer" style={{justifyContent:"center"}}>
            <div className="footer-right">© 2026 Shine.com · Admin</div>
          </footer>
        </>
      ) : route === "job" ? <JobPage /> : <Portal /> }
    </>
  );
}
