import { useState, useEffect } from "react";

// ── CONFIG ────────────────────────────────────────────────
const SUPABASE_URL = "https://rbwluolctwcyqxixisfb.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZkfyWoc2f-ZMFC7ByX0ANg_OTe5yLP8";
const ADMIN_PASSWORD = "shine@admin2025";

let _sb = null;
async function sb() {
  if (_sb) return _sb;
  const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm");
  _sb = createClient(SUPABASE_URL, SUPABASE_KEY);
  return _sb;
}

// ── SHINE LOGO ────────────────────────────────────────────
const ShineLogo = ({ height = 28 }) => (
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

// ── STYLES ────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:#0a0d14;color:#e2e8f0;min-height:100vh;-webkit-font-smoothing:antialiased}
:root{
  --bg:#0a0d14;--bg2:#0f1320;--card:#131929;--card2:#1a2236;
  --border:rgba(255,255,255,.08);--border2:rgba(255,255,255,.12);
  --muted:#8892a4;--accent:#1a56ff;--accent2:#faca22;
  --green:#00d68f;--red:#ff4d6d;--r:12px;
  --sh:0 4px 24px rgba(0,0,0,.4);
}
/* HEADER */
.hdr{background:rgba(10,13,20,.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.hdr-left{display:flex;align-items:center;gap:20px}
.hdr-div{width:1px;height:28px;background:var(--border2)}
.hdr-tag{font-size:12px;color:var(--muted)}.hdr-tag span{color:var(--accent2);font-weight:600}
.hdr-right{display:flex;align-items:center;gap:10px}
.hdr-count{background:rgba(26,86,255,.15);border:1px solid rgba(26,86,255,.3);color:#7aa2ff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px}
.hdr-adm{background:rgba(255,255,255,.06);border:1px solid var(--border2);color:rgba(255,255,255,.5);font-size:12px;font-weight:600;padding:6px 14px;border-radius:7px;cursor:pointer;font-family:inherit;transition:all .2s}
.hdr-adm:hover{background:rgba(255,255,255,.1);color:#fff}
/* HERO */
.hero{padding:64px 24px 56px;text-align:center;background:radial-gradient(ellipse at 50% 0%,rgba(26,86,255,.18) 0%,transparent 65%);border-bottom:1px solid var(--border)}
.hero-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(26,86,255,.12);border:1px solid rgba(26,86,255,.25);color:#7aa2ff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:20px;margin-bottom:22px}
.blink{width:6px;height:6px;border-radius:50%;background:var(--green);display:inline-block;animation:blink 1.8s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
.hero h1{font-size:clamp(28px,5vw,52px);font-weight:800;color:#fff;line-height:1.1;margin-bottom:16px;letter-spacing:-1px}
.hero h1 .hi{color:var(--accent2)}
.hero-sub{font-size:16px;color:var(--muted);max-width:520px;margin:0 auto 36px;line-height:1.65}
.hero-stats{display:flex;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:14px;max-width:500px;margin:0 auto;overflow:hidden}
.hs{flex:1;padding:16px 10px;text-align:center;border-right:1px solid var(--border)}
.hs:last-child{border:none}
.hs-n{font-size:20px;font-weight:800;color:#fff}
.hs-l{font-size:11px;color:var(--muted);margin-top:2px}
/* JOBS */
.wrap{max-width:860px;margin:0 auto;padding:44px 20px 60px}
.jh{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap;gap:10px}
.jh-t{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px}
.jh-b{background:rgba(0,214,143,.1);border:1px solid rgba(0,214,143,.25);color:var(--green);font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px}
.jcard{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin-bottom:12px;transition:all .22s;position:relative;overflow:hidden}
.jcard::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--accent),#7aa2ff);transform:scaleY(0);transform-origin:bottom;transition:transform .22s}
.jcard:hover{border-color:rgba(26,86,255,.4);background:var(--card2);box-shadow:var(--sh);transform:translateY(-2px)}
.jcard:hover::before{transform:scaleY(1)}
.jcard-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
.jcard-body{flex:1;min-width:0}
.jco{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.8px;text-transform:uppercase;margin-bottom:4px}
.jti{font-size:19px;font-weight:700;color:#fff;margin-bottom:11px;line-height:1.25}
.jmeta{display:flex;flex-wrap:wrap;gap:13px;margin-bottom:11px}
.mi{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted)}
.mi svg{color:#7aa2ff}
.jtags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
.jtag{background:rgba(26,86,255,.1);border:1px solid rgba(26,86,255,.2);color:#7aa2ff;font-size:11px;font-weight:600;padding:3px 9px;border-radius:6px}
.jsumm{font-size:13px;color:var(--muted);line-height:1.65}
.jcard-right{display:flex;flex-direction:column;align-items:flex-end;gap:10px;flex-shrink:0}
.sal{background:rgba(250,202,34,.1);border:1px solid rgba(250,202,34,.25);color:var(--accent2);font-size:13px;font-weight:700;padding:6px 14px;border-radius:8px;white-space:nowrap}
.abtn{background:linear-gradient(135deg,var(--accent),#4d7fff);color:#fff;border:none;cursor:pointer;font-size:13px;font-weight:700;padding:10px 22px;border-radius:8px;font-family:inherit;white-space:nowrap;transition:all .2s}
.abtn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(26,86,255,.5)}
.empty-jobs{text-align:center;padding:60px 20px;color:var(--muted)}
.empty-ic{font-size:44px;margin-bottom:12px}
.loading{text-align:center;padding:60px;color:var(--muted);font-size:15px}
/* MODAL */
.ov{position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;animation:fi .2s ease}
@keyframes fi{from{opacity:0}to{opacity:1}}
.modal{background:var(--bg2);border:1px solid var(--border2);border-radius:16px;padding:34px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.7);animation:su .22s ease;position:relative}
@keyframes su{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
.mcl{position:absolute;top:14px;right:16px;background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--muted);width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .18s}
.mcl:hover{background:rgba(255,255,255,.12);color:#fff}
.mpill{display:flex;align-items:center;gap:10px;background:rgba(26,86,255,.1);border:1px solid rgba(26,86,255,.2);border-radius:10px;padding:12px 16px;margin-bottom:24px}
.mph{font-size:14px;font-weight:700;color:#fff}
.mps{font-size:12px;color:var(--muted)}
.mh{font-size:24px;font-weight:800;color:#fff;margin-bottom:5px;letter-spacing:-.5px}
.ms{font-size:14px;color:var(--muted);margin-bottom:24px}
.dv{height:1px;background:var(--border);margin:20px 0}
.fl{font-size:10px;font-weight:700;color:#7aa2ff;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:500px){.r2{grid-template-columns:1fr}.jcard-top{flex-direction:column}.jcard-right{align-items:flex-start}}
.fg{margin-bottom:13px}
.lb{font-size:12px;font-weight:600;color:rgba(255,255,255,.7);margin-bottom:5px;display:block}
.op{font-weight:400;color:var(--muted)}
.inp{width:100%;background:rgba(255,255,255,.05);border:1.5px solid var(--border2);border-radius:8px;padding:10px 13px;font-family:inherit;font-size:14px;color:#fff;transition:all .18s;outline:none}
.inp:focus{border-color:rgba(26,86,255,.6);background:rgba(26,86,255,.08);box-shadow:0 0 0 3px rgba(26,86,255,.15)}
.inp::placeholder{color:rgba(255,255,255,.2)}
.inp.er{border-color:var(--red)}
.inp option{background:#1a2236;color:#fff}
.et{font-size:12px;color:var(--red);margin-top:3px}
.upz{border:2px dashed rgba(255,255,255,.1);border-radius:10px;padding:22px;text-align:center;cursor:pointer;transition:all .2s;background:rgba(255,255,255,.02)}
.upz:hover,.upz.dg{border-color:rgba(26,86,255,.5);background:rgba(26,86,255,.07)}
.upz.dn{border-color:rgba(0,214,143,.4);background:rgba(0,214,143,.05)}
.upt{font-size:13px;color:var(--muted)}.upt strong{color:#7aa2ff}
.uph{font-size:11px;color:rgba(255,255,255,.2);margin-top:3px}
.upok{font-size:13px;color:var(--green);font-weight:600;margin-top:5px}
.sbtn{width:100%;background:linear-gradient(135deg,var(--accent),#4d7fff);color:#fff;border:none;cursor:pointer;font-size:15px;font-weight:700;padding:14px;border-radius:10px;font-family:inherit;margin-top:10px;transition:all .2s}
.sbtn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 28px rgba(26,86,255,.5)}
.sbtn:disabled{opacity:.5;cursor:not-allowed}
/* SUCCESS */
.suc{text-align:center;padding:10px 0}
.sic{font-size:62px;display:block;margin-bottom:14px;animation:pop .4s ease}
@keyframes pop{0%{transform:scale(.3);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
.sh{font-size:26px;font-weight:800;color:#fff;margin-bottom:7px;letter-spacing:-.5px}
.sp{font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:22px}
.sbox{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:20px;text-align:left}
.sr{display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:1px solid var(--border)}
.sr:last-child{border:none}
.sk{color:var(--muted)}.sv{font-weight:600;color:#fff}
.idp{background:linear-gradient(135deg,var(--accent),#4d7fff);color:#fff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:6px}
.cbtn{background:rgba(255,255,255,.08);border:1px solid var(--border2);color:#fff;cursor:pointer;font-size:14px;font-weight:600;padding:11px 26px;border-radius:9px;font-family:inherit;transition:all .2s}
.cbtn:hover{background:rgba(255,255,255,.14)}
/* ADMIN */
.adm-login{max-width:360px;margin:70px auto;padding:0 20px}
.adm-card{background:var(--card2);border:1px solid var(--border2);border-radius:16px;padding:36px;text-align:center}
.adm-ico{font-size:40px;margin-bottom:14px}
.adm-h{font-size:24px;font-weight:800;color:#fff;margin-bottom:6px}
.adm-s{font-size:14px;color:var(--muted);margin-bottom:24px}
.adm-wrap{max-width:900px;margin:0 auto;padding:32px 20px 60px}
.adm-top{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:28px}
.adm-title{font-size:24px;font-weight:800;color:#fff}
.adm-sub{font-size:13px;color:var(--muted);margin-top:3px}
.btns{display:flex;gap:9px;flex-wrap:wrap}
.btn-p{background:linear-gradient(135deg,var(--accent),#4d7fff);color:#fff;border:none;cursor:pointer;font-size:13px;font-weight:700;padding:9px 16px;border-radius:8px;font-family:inherit;display:flex;align-items:center;gap:6px;transition:all .2s}
.btn-p:hover{filter:brightness(1.1);transform:translateY(-1px)}
.btn-g{background:rgba(0,214,143,.15);border:1px solid rgba(0,214,143,.3);color:var(--green);cursor:pointer;font-size:13px;font-weight:700;padding:9px 16px;border-radius:8px;font-family:inherit;display:flex;align-items:center;gap:6px;transition:all .2s}
.btn-g:hover{background:rgba(0,214,143,.25)}
.btn-gh{background:rgba(255,255,255,.06);border:1px solid var(--border2);color:rgba(255,255,255,.7);cursor:pointer;font-size:13px;font-weight:600;padding:9px 14px;border-radius:8px;font-family:inherit;transition:all .2s}
.btn-gh:hover{background:rgba(255,255,255,.1);color:#fff}
.btn-sm{background:rgba(26,86,255,.12);border:1px solid rgba(26,86,255,.25);color:#7aa2ff;cursor:pointer;font-size:12px;font-weight:600;padding:5px 11px;border-radius:7px;font-family:inherit;transition:all .2s}
.btn-sm:hover{background:rgba(26,86,255,.22)}
.btn-d{background:rgba(255,77,109,.1);border:1px solid rgba(255,77,109,.25);color:var(--red);cursor:pointer;font-size:12px;font-weight:600;padding:5px 11px;border-radius:7px;font-family:inherit;transition:all .2s}
.btn-d:hover{background:rgba(255,77,109,.2)}
.stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:11px;margin-bottom:24px}
.sc{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:16px 18px}
.scn{font-size:24px;font-weight:800;color:#fff}
.scl{font-size:12px;color:var(--muted);margin-top:3px}
.seg{display:inline-flex;background:rgba(255,255,255,.05);border-radius:10px;padding:3px;gap:2px;margin-bottom:18px}
.seg-b{padding:7px 16px;border-radius:8px;border:none;background:none;font-family:inherit;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;transition:all .2s}
.seg-b.act{background:rgba(26,86,255,.2);color:#7aa2ff}
.jrow{background:var(--card2);border:1px solid var(--border);border-radius:11px;padding:16px 18px;margin-bottom:9px;display:flex;align-items:center;gap:14px}
.jrb{flex:1;min-width:0}
.jrt{font-size:15px;font-weight:700;color:#fff;margin-bottom:4px}
.jrm{display:flex;flex-wrap:wrap;gap:8px}
.jrmi{font-size:12px;color:var(--muted)}
.jra{display:flex;gap:7px;flex-shrink:0;flex-wrap:wrap;align-items:center}
.pon{background:rgba(0,214,143,.1);border:1px solid rgba(0,214,143,.25);color:var(--green);font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px}
.poff{background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--muted);font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px}
.frow{display:flex;gap:9px;margin-bottom:14px;flex-wrap:wrap}
.fi{background:rgba(255,255,255,.05);border:1.5px solid var(--border2);border-radius:8px;padding:8px 12px;font-family:inherit;font-size:13px;color:#fff;outline:none;transition:border-color .18s;flex:1;min-width:150px}
.fi:focus{border-color:rgba(26,86,255,.5)}
.fi::placeholder{color:rgba(255,255,255,.2)}
.tbl-wrap{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{background:rgba(26,86,255,.15)}
th{padding:10px 13px;text-align:left;color:#7aa2ff;font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;white-space:nowrap}
td{padding:10px 13px;border-bottom:1px solid var(--border);color:#e2e8f0;vertical-align:middle}
tr:last-child td{border:none}
tr:hover td{background:rgba(255,255,255,.02)}
.ta{width:100%;background:rgba(255,255,255,.05);border:1.5px solid var(--border2);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:13px;color:#fff;resize:vertical;min-height:72px;outline:none;transition:all .18s;line-height:1.6}
.ta:focus{border-color:rgba(26,86,255,.6);background:rgba(26,86,255,.08)}
.ta::placeholder{color:rgba(255,255,255,.2)}
.hint{font-size:11px;color:var(--muted);margin-bottom:5px}
.tags-list{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px}
.tag-x{display:flex;align-items:center;gap:4px;background:rgba(26,86,255,.15);border:1px solid rgba(26,86,255,.3);color:#7aa2ff;font-size:12px;font-weight:600;padding:3px 9px;border-radius:20px;cursor:pointer}
.tag-x:hover{background:rgba(255,77,109,.15);color:var(--red);border-color:rgba(255,77,109,.3)}
.tags-row{display:flex;gap:7px;margin-bottom:5px}
/* FOOTER */
.footer{border-top:1px solid var(--border);padding:26px 24px;display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}
.ft{font-size:12px;color:rgba(255,255,255,.2)}
`;

// ── ICONS ─────────────────────────────────────────────────
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
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p[n]}</svg>;
};

// ── APPLY MODAL ───────────────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [f, setF] = useState({ name:"", phone:"", email:"", years_exp:"", notice_period:"", current_salary:"", expected_salary:"" });
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
    else if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s+/g,""))) e.phone = "Enter valid 10-digit Indian mobile";
    if (f.email && !/\S+@\S+\.\S+/.test(f.email)) e.email = "Enter a valid email";
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
      <div className="modal">
        <button className="mcl" onClick={onClose}>×</button>
        <div className="suc">
          <span className="sic">🎉</span>
          <div className="sh">You're Registered!</div>
          <p className="sp">Our team will reach out within 2 business days.</p>
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
      <div className="modal">
        <button className="mcl" onClick={onClose}>×</button>
        <div className="mpill">
          <span style={{fontSize:20}}>💼</span>
          <div><div className="mph">{job.title}</div><div className="mps">{job.company} · {job.location}</div></div>
        </div>
        <div className="mh">Apply Now</div>
        <div className="ms">We'll be in touch within 2 business days.</div>
        <div className="fl">Personal Details</div>
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
          <label className="lb">Email <span className="op">(optional)</span></label>
          <input className={`inp${errs.email?" er":""}`} placeholder="you@email.com" value={f.email} onChange={e=>{set("email",e.target.value);clr("email")}} />
          {errs.email&&<div className="et">{errs.email}</div>}
        </div>
        <div className="dv"/>
        <div className="fl">Experience <span style={{color:"rgba(255,255,255,.18)",fontWeight:400,textTransform:"none",letterSpacing:0}}>— optional</span></div>
        <div className="r2">
          <div className="fg">
            <label className="lb">Total Experience <span className="op">(yrs)</span></label>
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
            <label className="lb">Current CTC <span className="op">(LPA)</span></label>
            <input className="inp" placeholder="e.g. 12" value={f.current_salary} onChange={e=>set("current_salary",e.target.value)} />
          </div>
          <div className="fg">
            <label className="lb">Expected CTC <span className="op">(LPA)</span></label>
            <input className="inp" placeholder="e.g. 18" value={f.expected_salary} onChange={e=>set("expected_salary",e.target.value)} />
          </div>
        </div>
        <div className="dv"/>
        <div className="fl">Resume / CV <span style={{color:"rgba(255,255,255,.18)",fontWeight:400,textTransform:"none",letterSpacing:0}}>— optional</span></div>
        <div className={`upz${drag?" dg":""}${cv?" dn":""}`}
          onDragOver={e=>{e.preventDefault();setDrag(true)}}
          onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}}
          onClick={()=>document.getElementById("cv-up").click()}>
          <div style={{color:"#7aa2ff",marginBottom:6}}><Ic n="up" s={22}/></div>
          {cv?<div className="upok">✓ {cv.name}</div>:<><div className="upt"><strong>Click to upload</strong> or drag & drop</div><div className="uph">PDF or Word · max 5 MB</div></>}
          <input id="cv-up" type="file" style={{display:"none"}} accept=".pdf,.doc,.docx" onChange={e=>handleFile(e.target.files[0])} />
        </div>
        <button className="sbtn" onClick={submit} disabled={busy}>{busy?"Submitting…":"Submit Application →"}</button>
      </div>
    </div>
  );
}

// ── JOB FORM MODAL (Admin) ────────────────────────────────
function JobFormModal({ editJob, onSave, onClose }) {
  const blank = { title:"", company:"", location:"", type:"Full-time", experience:"", salary:"", tags:[], summary:"" };
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
      if (editJob) {
        await s.from("shine_jobs").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editJob.id);
      } else {
        await s.from("shine_jobs").insert([{ ...form, active: true }]);
      }
      onSave();
    } catch(err) { alert("Save failed: " + err.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <button className="mcl" onClick={onClose}>×</button>
        <div className="mh">{editJob?"Edit Job":"Post New Job"}</div>
        <div className="ms" style={{marginBottom:20}}>Fill in the details below.</div>
        <div className="fg"><label className="lb">Job Title</label><input className="inp" placeholder="e.g. Senior Software Engineer" value={form.title} onChange={e=>set("title",e.target.value)} /></div>
        <div className="r2">
          <div className="fg"><label className="lb">Company</label><input className="inp" placeholder="e.g. Leading MNC" value={form.company} onChange={e=>set("company",e.target.value)} /></div>
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
            <input className="inp" placeholder="Type a skill, press Add" value={ti} onChange={e=>setTi(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addTag())} style={{flex:1}} />
            <button className="btn-sm" onClick={addTag}>Add</button>
          </div>
        </div>
        <div className="fg">
          <label className="lb">Job Summary</label>
          <div className="hint">2–3 sentences shown on the card.</div>
          <textarea className="ta" rows={3} placeholder="Describe the role and team..." value={form.summary} onChange={e=>set("summary",e.target.value)} />
        </div>
        <div style={{display:"flex",gap:9,marginTop:8}}>
          <button className="sbtn" style={{margin:0}} onClick={save} disabled={busy}>{busy?"Saving…":editJob?"Save Changes →":"Post Job →"}</button>
          <button className="btn-gh" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────
function AdminPanel({ onExit }) {
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

  const toggleActive = async (job) => {
    const s = await sb();
    await s.from("shine_jobs").update({ active: !job.active }).eq("id", job.id);
    load();
  };

  const deleteJob = async (job) => {
    if (!window.confirm(`Delete "${job.title}"?`)) return;
    const s = await sb();
    await s.from("shine_jobs").delete().eq("id", job.id);
    load();
  };

  const downloadCSV = () => {
    const cols = ["id","job_title","name","phone","email","years_exp","notice_period","current_salary","expected_salary","cv_filename","created_at"];
    const hdr = cols.join(",");
    const rows = filteredApps.map(r => cols.map(c=>`"${(r[c]??"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([hdr+"\n"+rows],{type:"text/csv"}));
    a.download = `shine-applications-${new Date().toISOString().slice(0,10)}.csv`; a.click();
  };

  const filteredApps = apps.filter(a => {
    const q = search.toLowerCase();
    return !q || a.name?.toLowerCase().includes(q) || a.phone?.includes(q) || a.email?.toLowerCase().includes(q);
  });

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
          <button onClick={onExit} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back to portal</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {(showForm||editJob) && (
        <JobFormModal editJob={editJob} onSave={()=>{setShowForm(false);setEditJob(null);load();}} onClose={()=>{setShowForm(false);setEditJob(null);}} />
      )}
      <div className="adm-wrap">
        <div className="adm-top">
          <div>
            <div className="adm-title">Admin Dashboard</div>
            <div className="adm-sub">{jobs.filter(j=>j.active).length} live jobs · {apps.length} applications</div>
          </div>
          <div className="btns">
            {view==="jobs" && <button className="btn-p" onClick={()=>{setEditJob(null);setShowForm(true)}}><Ic n="plus" s={13}/> Post Job</button>}
            {view==="apps" && <button className="btn-g" onClick={downloadCSV}><Ic n="dl" s={13}/> Download CSV</button>}
            <button className="btn-gh" onClick={onExit}>← Portal</button>
          </div>
        </div>

        <div className="stats">
          <div className="sc"><div className="scn">{jobs.length}</div><div className="scl">Total Jobs</div></div>
          <div className="sc"><div className="scn">{jobs.filter(j=>j.active).length}</div><div className="scl">Live Now</div></div>
          <div className="sc"><div className="scn">{apps.length}</div><div className="scl">Applications</div></div>
          <div className="sc"><div className="scn">{apps.filter(a=>a.cv_filename).length}</div><div className="scl">With CV</div></div>
        </div>

        <div className="seg">
          <button className={`seg-b${view==="jobs"?" act":""}`} onClick={()=>setView("jobs")}>Jobs ({jobs.length})</button>
          <button className={`seg-b${view==="apps"?" act":""}`} onClick={()=>setView("apps")}>Applications ({apps.length})</button>
        </div>

        {loading ? <div className="loading">Loading…</div> : view==="jobs" ? (
          jobs.length===0
            ? <div className="empty-jobs"><div className="empty-ic">📋</div><p>No jobs yet. Post your first role above.</p></div>
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
            <div className="frow">
              <input className="fi" placeholder="🔍  Search by name, phone, or email…" value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            {filteredApps.length===0
              ? <div className="empty-jobs"><div className="empty-ic">📭</div><p>No applications yet.</p></div>
              : <div className="tbl-wrap"><table>
                <thead><tr>{["ID","Role","Name","Phone","Email","Exp","Notice","Curr","Exp CTC","CV","Date"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>{filteredApps.map(r=>(
                  <tr key={r.id}>
                    <td style={{fontFamily:"monospace",fontSize:11,color:"var(--muted)"}}>{r.id}</td>
                    <td style={{fontWeight:600,maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.job_title}</td>
                    <td style={{fontWeight:600}}>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.email||<span style={{color:"var(--muted)"}}>—</span>}</td>
                    <td>{r.years_exp||"—"}</td>
                    <td>{r.notice_period||"—"}</td>
                    <td>{r.current_salary?r.current_salary+"L":"—"}</td>
                    <td>{r.expected_salary?r.expected_salary+"L":"—"}</td>
                    <td>{r.cv_filename?<span style={{color:"#7aa2ff",fontSize:12,fontWeight:600}}>📎</span>:<span style={{color:"var(--muted)"}}>—</span>}</td>
                    <td style={{whiteSpace:"nowrap",color:"var(--muted)"}}>{new Date(r.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</td>
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

// ── ROOT APP ──────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("portal");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => {
    if (page !== "portal") return;
    (async () => {
      setLoading(true);
      const s = await sb();
      const { data } = await s.from("shine_jobs").select("*").eq("active", true).order("created_at", { ascending: false });
      setJobs(data || []);
      setLoading(false);
    })();
  }, [page]);

  if (page === "admin") return (
    <>
      <style>{CSS}</style>
      <header className="hdr">
        <div className="hdr-left">
          <ShineLogo height={28} />
          <div className="hdr-div" />
          <div className="hdr-tag">Admin Panel</div>
        </div>
      </header>
      <AdminPanel onExit={() => setPage("portal")} />
      <footer className="footer"><div className="ft">© 2025 Shine.com</div></footer>
    </>
  );

  return (
    <>
      <style>{CSS}</style>

      <header className="hdr">
        <div className="hdr-left">
          <ShineLogo height={28} />
          <div className="hdr-div" />
          <div className="hdr-tag">Exclusive <span>Premium Roles</span></div>
        </div>
        <div className="hdr-right">
          <div className="hdr-count">{jobs.length} OPENINGS</div>
          <button className="hdr-adm" onClick={() => setPage("admin")}>Admin →</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-pill"><span className="blink" />Actively Hiring · June 2025</div>
        <h1>Find Your Next<br /><span className="hi">Dream Role</span></h1>
        <p className="hero-sub">Handpicked opportunities from top companies — vetted, high-growth, and ready to interview you.</p>
        <div className="hero-stats">
          <div className="hs"><div className="hs-n">{jobs.length}</div><div className="hs-l">Open Roles</div></div>
          <div className="hs"><div className="hs-n">2 Days</div><div className="hs-l">Response Time</div></div>
          <div className="hs"><div className="hs-n">Top Co.</div><div className="hs-l">Only MNCs</div></div>
          <div className="hs"><div className="hs-n">Direct</div><div className="hs-l">No Agency</div></div>
        </div>
      </section>

      <div className="wrap">
        <div className="jh">
          <div className="jh-t">Current Openings</div>
          <div className="jh-b">● Updated Today</div>
        </div>

        {loading ? <div className="loading">Loading jobs…</div> :
          jobs.length === 0 ? (
            <div className="empty-jobs"><div className="empty-ic">📭</div><p>No openings right now. Check back soon.</p></div>
          ) : jobs.map(job => (
            <div key={job.id} className="jcard">
              <div className="jcard-top">
                <div className="jcard-body">
                  <div className="jco">{job.company}</div>
                  <div className="jti">{job.title}</div>
                  <div className="jmeta">
                    <span className="mi"><Ic n="loc" />{job.location}</span>
                    <span className="mi"><Ic n="bag" />{job.experience}</span>
                    <span className="mi"><Ic n="globe" />{job.type}</span>
                  </div>
                  <div className="jtags">{(job.tags||[]).map(t=><span key={t} className="jtag">{t}</span>)}</div>
                  <div className="jsumm">{job.summary}</div>
                </div>
                <div className="jcard-right">
                  <div className="sal">{job.salary}</div>
                  <button className="abtn" onClick={() => setActiveJob(job)}>Apply Now →</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      <footer className="footer">
        <ShineLogo height={20} />
        <div className="ft">© 2025 Shine.com · All Rights Reserved · Premium Talent Platform</div>
      </footer>

      {activeJob && <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  );
}
