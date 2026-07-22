/* G3 Architects — shared header/footer + interactions across all pages. */
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var page = document.body.dataset.page || "home";

  var LOGO =
    '<svg viewBox="0 0 32 32" class="h-9 w-9"><rect x="2" y="2" width="28" height="28" rx="6" fill="#23486B"/><g stroke="#EEEAE3" stroke-width="2" stroke-linecap="round"><path d="M9 23V13l7-4 7 4v10"/><path d="M9 18h14M9 23h14"/></g></svg>';

  var NAV = [
    { key: "studio", label: "Studio", href: "studio.html" },
    { key: "services", label: "Services", href: "services.html" },
    { key: "projects", label: "Projects", href: "projects.html" },
    { key: "team", label: "Team", href: "team.html" },
    { key: "journal", label: "Journal", href: "journal.html" },
    { key: "contact", label: "Contact", href: "contact.html" },
  ];

  function navLinks(mobile) {
    return NAV.map(function (n) {
      var active = n.key === page;
      if (mobile) {
        return '<a href="' + n.href + '" class="rounded px-3 py-3 font-medium ' + (active ? "text-blueprint" : "text-ink/80 hover:bg-concrete") + '">' + n.label + "</a>";
      }
      return '<a href="' + n.href + '" class="nav-link relative text-sm font-medium ' + (active ? "active text-ink" : "text-ink/70 hover:text-ink") + '">' + n.label + "</a>";
    }).join("");
  }

  var header =
    '<header id="hd" class="fixed inset-x-0 top-0 z-50 transition-all duration-300">' +
    '<div class="mx-auto flex max-w-shell items-center justify-between px-5 sm:px-8 h-[72px]">' +
    '<a href="index.html" class="flex items-center gap-2.5" aria-label="G3 Architects home">' + LOGO +
    '<span class="text-lg font-extrabold uppercase tracking-tight font-display">G3 <span class="text-blueprint">Architects</span></span></a>' +
    '<nav class="hidden lg:flex items-center gap-7">' + navLinks(false) + "</nav>" +
    '<div class="flex items-center gap-2">' +
    '<a href="contact.html" class="hidden sm:inline-flex items-center gap-2 rounded-full bg-blueprint px-5 py-2.5 text-sm font-semibold text-concrete hover:bg-blueprint-800">Start a project <i class="fa-solid fa-arrow-right -rotate-45 text-[11px]"></i></a>' +
    '<button id="mb" class="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-ink/15" aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>' +
    "</div></div>" +
    '<div id="mm" class="hidden lg:hidden border-t border-line bg-paper"><nav class="mx-auto flex max-w-shell flex-col px-5 py-3 sm:px-8">' +
    '<a href="index.html" class="rounded px-3 py-3 font-medium ' + (page === "home" ? "text-blueprint" : "text-ink/80 hover:bg-concrete") + '">Home</a>' +
    navLinks(true) +
    '<a href="contact.html" class="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blueprint px-5 py-3 font-semibold text-concrete">Start a project <i class="fa-solid fa-arrow-right -rotate-45 text-[11px]"></i></a>' +
    "</nav></div></header>";

  var year = new Date().getFullYear();
  var footer =
    '<footer class="bg-blueprint-800 text-concrete"><div class="mx-auto max-w-shell px-5 py-14 sm:px-8">' +
    '<div class="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">' +
    '<div class="max-w-xs"><a href="index.html" class="flex items-center gap-2.5">' + LOGO +
    '<span class="text-lg font-extrabold uppercase tracking-tight font-display">G3 Architects</span></a>' +
    '<p class="mt-4 text-sm leading-relaxed text-concrete/50">Architecture, interiors and urban design — from the first blueprint to the finished landmark.</p>' +
    '<div class="mt-5 flex gap-3">' +
    ['instagram', 'linkedin', 'behance'].map(function (s) { return '<a href="#" onclick="return false" aria-label="' + s + '" class="grid h-9 w-9 place-items-center rounded-full border border-concrete/20 text-concrete/70 hover:border-rust hover:text-rust"><i class="fa-brands fa-' + s + '"></i></a>'; }).join("") +
    "</div></div>" +
    '<div><h3 class="anno mb-4 text-concrete/40">Explore</h3><ul class="space-y-2.5 text-sm text-concrete/70">' +
    '<li><a href="studio.html" class="hover:text-concrete">Studio</a></li><li><a href="services.html" class="hover:text-concrete">Services</a></li><li><a href="projects.html" class="hover:text-concrete">Projects</a></li><li><a href="team.html" class="hover:text-concrete">Team</a></li><li><a href="journal.html" class="hover:text-concrete">Journal</a></li></ul></div>' +
    '<div><h3 class="anno mb-4 text-concrete/40">Studio</h3><p class="text-sm text-concrete/60">House 3, Road 27<br>Gulshan, Dhaka 1212</p><p class="mt-3 text-sm text-concrete/60">studio@g3architects.com<br>+880 1700-000000</p></div>' +
    '<div><h3 class="anno mb-4 text-concrete/40">Newsletter</h3><p class="mb-3 text-sm text-concrete/50">New projects and studio notes, a few times a year.</p>' +
    '<form id="nf" class="flex gap-2"><input type="email" required placeholder="you@email.com" class="min-w-0 flex-1 rounded-full border border-concrete/20 bg-concrete/5 px-4 py-2.5 text-sm text-concrete placeholder:text-concrete/40 focus:border-rust focus:outline-none"><button class="shrink-0 rounded-full bg-rust px-4 py-2.5 text-sm font-semibold text-white" type="submit">Join</button></form>' +
    '<p id="ns" class="mt-2 hidden text-xs text-rust"></p></div>' +
    "</div>" +
    '<div class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-concrete/10 pt-6 text-sm text-concrete/40 sm:flex-row"><p>© ' + year + ' G3 Architects. A portfolio demo.</p><p class="anno">Est. 2013 · Dhaka, Bangladesh</p></div>' +
    "</div></footer>";

  var hh = document.querySelector("[data-site-header]");
  if (hh) hh.outerHTML = header;
  var ff = document.querySelector("[data-site-footer]");
  if (ff) ff.outerHTML = footer;

  // back-to-top
  var tt = document.createElement("button");
  tt.id = "tt";
  tt.setAttribute("aria-label", "Back to top");
  tt.className = "fixed bottom-6 right-6 z-40 grid h-11 w-11 translate-y-4 place-items-center rounded-full bg-blueprint text-concrete opacity-0 shadow-lg transition-all hover:bg-blueprint-800";
  tt.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(tt);
  tt.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  // header scroll state
  var hd = document.getElementById("hd");
  var darkHero = document.body.dataset.hero === "dark";
  function onScroll() {
    var s = scrollY > 20;
    if (hd) {
      hd.classList.toggle("bg-paper/90", s); hd.classList.toggle("backdrop-blur-md", s); hd.classList.toggle("shadow-sm", s); hd.classList.toggle("border-b", s); hd.classList.toggle("border-line", s);
      hd.classList.toggle("over-dark", darkHero && !s);
    }
    tt.classList.toggle("opacity-0", scrollY < 400);
    tt.classList.toggle("translate-y-4", scrollY < 400);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // mobile menu
  var mb = document.getElementById("mb"), mm = document.getElementById("mm");
  if (mb) {
    mb.addEventListener("click", function () {
      var open = mm.classList.toggle("hidden") === false;
      mb.setAttribute("aria-expanded", open);
      mb.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // reveals via Motion (Framer Motion's vanilla engine), with fallback
  if (reduce) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  } else {
    window.__mo = false;
    import("https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm")
      .then(function (m) {
        window.__mo = true;
        m.inView(".reveal", function (info) {
          var el = info && info.target ? info.target : info;
          var d = (+((el.dataset && el.dataset.d) || 0)) * 0.09;
          m.animate(el, { opacity: [0, 1], transform: ["translateY(30px)", "translateY(0px)"] }, { duration: 0.7, delay: d, easing: [0.16, 1, 0.3, 1] });
        }, { amount: 0.15 });
      })
      .catch(function () {});
    setTimeout(function () { if (!window.__mo) document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); }); }, 1800);
  }

  // count-up
  var counters = document.querySelectorAll("[data-count]");
  function run(el) {
    var t = +el.dataset.count, d = 1500, t0 = null;
    if (reduce) { el.textContent = t.toLocaleString(); return; }
    function s(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / d, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(e * t).toLocaleString(); if (p < 1) requestAnimationFrame(s); }
    requestAnimationFrame(s);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } }); }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else counters.forEach(run);

  // project filter (projects.html)
  var fbs = document.querySelectorAll(".fb");
  if (fbs.length) {
    var pjs = document.querySelectorAll(".pj"), pe = document.getElementById("pe");
    fbs.forEach(function (b) {
      b.addEventListener("click", function () {
        fbs.forEach(function (x) { x.classList.remove("is-active", "bg-blueprint", "text-concrete", "border-blueprint"); x.classList.add("border-line", "text-ink/70"); });
        b.classList.add("is-active", "bg-blueprint", "text-concrete", "border-blueprint"); b.classList.remove("border-line", "text-ink/70");
        var f = b.dataset.filter, v = 0;
        pjs.forEach(function (p) { var show = f === "all" || p.dataset.cat === f; p.classList.toggle("hidden", !show); if (show) v++; });
        if (pe) pe.classList.toggle("hidden", v > 0);
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q"), a = item.querySelector(".faq-a"), ic = item.querySelector(".faq-icon");
    if (!q) return;
    q.addEventListener("click", function () {
      var open = a.style.gridTemplateRows === "1fr";
      document.querySelectorAll(".faq-a").forEach(function (x) { x.style.gridTemplateRows = "0fr"; });
      document.querySelectorAll(".faq-icon").forEach(function (x) { x.classList.remove("rotate-45"); });
      if (!open) { a.style.gridTemplateRows = "1fr"; ic.classList.add("rotate-45"); }
    });
  });

  // contact form
  var cf = document.getElementById("cf"), cs = document.getElementById("cs");
  if (cf) {
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!cf.checkValidity()) { cf.reportValidity(); cs.textContent = "Please fill in every required field."; cs.className = "mt-4 text-center font-medium text-rust"; return; }
      cs.textContent = "Thank you — your enquiry is on its way. We'll reply within one business day."; cs.className = "mt-4 text-center font-medium text-blueprint"; cf.reset();
    });
  }

  // newsletter
  var nf = document.getElementById("nf"), ns = document.getElementById("ns");
  if (nf) { nf.addEventListener("submit", function (e) { e.preventDefault(); ns.textContent = "Subscribed — welcome. (Demo: no email sent.)"; ns.classList.remove("hidden"); nf.reset(); }); }
})();
