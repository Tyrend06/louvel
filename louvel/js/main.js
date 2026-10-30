/* ==========================================================
   Louvel — alle logica van de website in één bestand.

   1. Toolbar en footer (staan hier één keer, verschijnen op elke pagina)
   2. Landingspagina, krant, artikel, events (met agenda), contact

   Welke pagina het is, lees je uit <body data-page="...">.
   ========================================================== */

(function () {
  "use strict";

  var SITE = window.LOUVEL_SITE;
  var PAGE = document.body.getAttribute("data-page");

  var MONTHS = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  var MONTHS_SHORT = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  var WEEKDAYS = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
  var DOW_SHORT = ["ma", "di", "wo", "do", "vr", "za", "zo"];

  /* ---------- Hulpfuncties ---------- */

  function $(sel, root) { return (root || document).querySelector(sel); }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function parseDate(iso) {
    var p = iso.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }

  function longDate(iso) {
    var d = parseDate(iso);
    return WEEKDAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }

  function shortDate(iso) {
    var d = parseDate(iso);
    return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }

  function todayISO() {
    var n = new Date();
    return n.getFullYear() + "-" + pad(n.getMonth() + 1) + "-" + pad(n.getDate());
  }

  function timeRange(ev) {
    if (!ev.start) return "";
    return ev.end ? ev.start + " tot " + ev.end + " uur" : "vanaf " + ev.start + " uur";
  }

  function sortedArticles() {
    return (window.LOUVEL_ARTICLES || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
  }

  function sortedEvents() {
    return (window.LOUVEL_EVENTS || []).slice().sort(function (a, b) {
      return (a.date + (a.start || "")) < (b.date + (b.start || "")) ? -1 : 1;
    });
  }

  function articleText(article) {
    for (var i = 0; i < article.body.length; i++) {
      if (typeof article.body[i] === "string") return article.body[i];
    }
    return "";
  }

  // Het begin van een artikel: eigen 'excerpt' of de eerste alinea, netjes afgekapt.
  function excerptOf(article, max) {
    var text = article.excerpt || articleText(article);
    if (text.length <= max) return text;
    var cut = text.slice(0, max);
    return cut.slice(0, cut.lastIndexOf(" ")) + "…";
  }

  function articleLink(article) { return "artikel.html?id=" + encodeURIComponent(article.id); }

  /* ---------- Toolbar en footer ---------- */

  function renderChrome() {
    var links = [
      { page: "home", href: "index.html", label: "Home" },
      { page: "krant", href: "krant.html", label: "De Krant" },
      { page: "events", href: "events.html", label: "Events" },
      { page: "contact", href: "contact.html", label: "Contact" }
    ];
    var current = PAGE === "artikel" ? "krant" : PAGE;

    var navItems = links.map(function (l) {
      return '<li><a class="nav__link" href="' + l.href + '"' +
        (l.page === current ? ' aria-current="page"' : "") + ">" + l.label + "</a></li>";
    }).join("");

    var header = $("#site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML =
        '<div class="wrap site-header__inner">' +
          '<a class="brand" href="index.html"><span class="brand__mark" aria-hidden="true"></span>Louvel</a>' +
          '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
          '<nav class="nav" id="site-nav" aria-label="Hoofdmenu"><ul class="nav__list">' + navItems + "</ul></nav>" +
        "</div>";

      var toggle = $(".nav-toggle", header);
      var nav = $("#site-nav", header);
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    var footer = $("#site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML =
        '<div class="wrap">' +
          '<div class="footer-grid">' +
            "<div>" +
              '<p class="footer-brand">Louvel</p>' +
              "<p>Filosofische vragen om te lezen, en avonden om ze samen te bespreken.</p>" +
            "</div>" +
            "<div>" +
              "<h2>Op de site</h2>" +
              "<ul>" + links.map(function (l) { return '<li><a href="' + l.href + '">' + l.label + "</a></li>"; }).join("") + "</ul>" +
            "</div>" +
            "<div>" +
              "<h2>Contact</h2>" +
              '<p><a href="' + esc(SITE.instagram) + '" target="_blank" rel="noopener">Instagram ' + esc(SITE.instagramHandle) + "</a></p>" +
              '<p><a href="tel:' + esc(SITE.phone) + '">' + esc(SITE.phoneDisplay) + "</a></p>" +
            "</div>" +
          "</div>" +
          '<p class="footer-bottom">© ' + new Date().getFullYear() + " Louvel. Alle rechten voorbehouden.</p>" +
        "</div>";
    }
  }

  /* ---------- Landingspagina ---------- */

  function renderHome() {
    var articles = sortedArticles();
    var front = $("#home-articles");
    if (front && articles.length) {
      var lead = articles[0];
      var rest = articles.slice(1, 3);

      var html =
        '<article class="lead">' +
          '<img class="lead__img" src="' + esc(lead.image) + '" alt="' + esc(lead.imageAlt || "") + '">' +
          '<p class="story__meta"><span class="pill">' + esc(lead.category) + "</span><span>" + esc(shortDate(lead.date)) + "</span></p>" +
          '<h3 class="lead__title"><a href="' + articleLink(lead) + '">' + esc(lead.title) + "</a></h3>" +
          '<p class="lead__excerpt">' + esc(excerptOf(lead, 230)) + "</p>" +
        "</article>" +
        '<div class="mini-list">' +
          rest.map(function (a) {
            return '<article class="mini">' +
              '<img class="mini__img" src="' + esc(a.image) + '" alt="' + esc(a.imageAlt || "") + '">' +
              "<div>" +
                '<p class="story__meta"><span class="pill">' + esc(a.category) + "</span><span>" + esc(shortDate(a.date)) + "</span></p>" +
                '<h3 class="mini__title"><a href="' + articleLink(a) + '">' + esc(a.title) + "</a></h3>" +
              "</div>" +
            "</article>";
          }).join("") +
        "</div>";
      front.innerHTML = html;
    }

    var box = $("#home-event");
    if (box) {
      var upcoming = sortedEvents().filter(function (e) { return e.date >= todayISO(); });
      if (!upcoming.length) {
        box.innerHTML = '<p class="empty">Er staan nog geen events gepland. Kom snel terug, of volg ons op Instagram voor het laatste nieuws.</p>';
        return;
      }
      var ev = upcoming[0];
      var d = parseDate(ev.date);
      box.innerHTML =
        '<div class="next-event">' +
          '<div class="date-block"><span class="date-block__day">' + d.getDate() + '</span><span class="date-block__month">' + MONTHS_SHORT[d.getMonth()] + "</span></div>" +
          "<div>" +
            '<h3 class="next-event__title">' + esc(ev.title) + "</h3>" +
            '<p class="next-event__info">' + esc(longDate(ev.date)) + ", " + esc(timeRange(ev)) + "<br>" + esc(ev.location) + "</p>" +
          "</div>" +
          '<a class="btn btn--primary" href="events.html#' + esc(ev.id) + '">Alle events bekijken</a>' +
        "</div>";
    }
  }

  /* ---------- De Krant ---------- */

  function renderKrant() {
    var dateLine = $("#krant-date");
    if (dateLine) dateLine.textContent = longDate(todayISO());

    var list = $("#article-list");
    if (!list) return;
    var articles = sortedArticles();
    if (!articles.length) {
      list.innerHTML = '<p class="empty">Er staan nog geen artikelen in de krant. Het eerste stuk komt eraan.</p>';
      return;
    }
    list.innerHTML = articles.map(function (a) {
      return '<article class="story">' +
        '<img class="story__img" src="' + esc(a.image) + '" alt="' + esc(a.imageAlt || "") + '" loading="lazy">' +
        "<div>" +
          '<p class="story__meta"><span class="pill">' + esc(a.category) + "</span><span>" + esc(shortDate(a.date)) + "</span></p>" +
          '<h2 class="story__title"><a href="' + articleLink(a) + '">' + esc(a.title) + "</a></h2>" +
          '<p class="story__excerpt">' + esc(excerptOf(a, 340)) + "</p>" +
          '<span class="story__more" aria-hidden="true">Lees verder</span>' +
        "</div>" +
      "</article>";
    }).join("");
  }

  /* ---------- Artikelpagina ---------- */

  function renderArticle() {
    var root = $("#article-root");
    if (!root) return;

    var id = new URLSearchParams(window.location.search).get("id");
    var articles = sortedArticles();
    var index = -1;
    for (var i = 0; i < articles.length; i++) { if (articles[i].id === id) index = i; }

    if (index === -1) {
      document.title = "Artikel niet gevonden | Louvel";
      root.innerHTML =
        '<div class="notice"><h1>Dit artikel bestaat niet (meer)</h1>' +
        '<p>De link klopt niet, of het artikel is verwijderd. Bekijk alle artikelen in de krant.</p>' +
        '<a class="btn btn--primary" href="krant.html">Naar de krant</a></div>';
      return;
    }

    var a = articles[index];
    document.title = a.title + " | Louvel";

    var body = a.body.map(function (block) {
      if (typeof block === "string") return "<p>" + esc(block) + "</p>";
      if (block.type === "heading") return "<h2>" + esc(block.text) + "</h2>";
      if (block.type === "quote") return "<blockquote>" + esc(block.text) + "</blockquote>";
      if (block.type === "image") {
        return '<figure class="article__figure"><img src="' + esc(block.src) + '" alt="' + esc(block.alt || "") + '">' +
          (block.caption ? '<figcaption class="article__caption">' + esc(block.caption) + "</figcaption>" : "") + "</figure>";
      }
      return "";
    }).join("");

    var newer = articles[index - 1];
    var older = articles[index + 1];

    root.innerHTML =
      '<a class="article__back" href="krant.html">Terug naar de krant</a>' +
      '<header class="article__head">' +
        '<h1 class="article__title">' + esc(a.title) + "</h1>" +
        '<p class="article__meta"><span class="pill">' + esc(a.category) + "</span><span>" + esc(longDate(a.date)) + "</span></p>" +
      "</header>" +
      '<figure class="article__hero"><img src="' + esc(a.image) + '" alt="' + esc(a.imageAlt || "") + '">' +
        (a.caption ? '<figcaption class="article__caption">' + esc(a.caption) + "</figcaption>" : "") + "</figure>" +
      '<div class="article__body">' + body + "</div>" +
      '<nav class="article__nav" aria-label="Andere artikelen">' +
        (older ? '<a href="' + articleLink(older) + '"><span class="article__nav-label">Eerder</span><span class="article__nav-title">' + esc(older.title) + "</span></a>" : "<span></span>") +
        (newer ? '<a class="article__nav-next" href="' + articleLink(newer) + '"><span class="article__nav-label">Nieuwer</span><span class="article__nav-title">' + esc(newer.title) + "</span></a>" : "<span></span>") +
      "</nav>";
  }

  /* ---------- Events en agenda ---------- */

  function eventHTML(ev) {
    var d = parseDate(ev.date);
    var facts =
      "<li><strong>" + esc(longDate(ev.date)) + "</strong></li>" +
      (ev.start ? "<li>" + esc(timeRange(ev)) + "</li>" : "") +
      "<li>" + esc(ev.location) + (ev.address ? ", " + esc(ev.address) : "") + "</li>" +
      (ev.price ? "<li>" + esc(ev.price) + "</li>" : "");

    return '<article class="event" id="' + esc(ev.id) + '" data-date="' + esc(ev.date) + '">' +
      '<div><div class="date-block"><span class="date-block__day">' + d.getDate() + '</span><span class="date-block__month">' + MONTHS_SHORT[d.getMonth()] + "</span></div></div>" +
      "<div>" +
        '<h3 class="event__title">' + esc(ev.title) + "</h3>" +
        '<ul class="event__facts">' + facts + "</ul>" +
        '<p class="event__desc">' + esc(ev.description) + "</p>" +
        '<button class="btn btn--ghost btn--small" type="button" data-ics="' + esc(ev.id) + '">Zet in je agenda</button>' +
      "</div>" +
    "</article>";
  }

  function icsText(s) {
    return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  }

  function downloadICS(ev) {
    var day = ev.date.replace(/-/g, "");
    var st = (ev.start || "00:00").replace(":", "") + "00";
    var en = (ev.end || ev.start || "00:00").replace(":", "") + "00";
    var stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Louvel//Events//NL",
      "BEGIN:VEVENT",
      "UID:" + ev.id + "@louvel",
      "DTSTAMP:" + stamp,
      "DTSTART:" + day + "T" + st,
      "DTEND:" + day + "T" + en,
      "SUMMARY:" + icsText(ev.title),
      "LOCATION:" + icsText(ev.location + (ev.address ? ", " + ev.address : "")),
      "DESCRIPTION:" + icsText(ev.description),
      "END:VEVENT", "END:VCALENDAR"
    ];
    var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = ev.id + ".ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function renderEvents() {
    var all = sortedEvents();
    var today = todayISO();
    var upcoming = all.filter(function (e) { return e.date >= today; });
    var past = all.filter(function (e) { return e.date < today; }).reverse();

    var list = $("#event-list");
    if (list) {
      list.innerHTML = upcoming.length
        ? upcoming.map(eventHTML).join("")
        : '<p class="empty">Er staan nu geen events gepland. Volg ons op Instagram, dan zie je als eerste wanneer het volgende event er is.</p>';
    }

    var pastBox = $("#past-events");
    if (pastBox) {
      if (past.length) {
        pastBox.innerHTML = "<details class=\"past\"><summary>Eerdere events (" + past.length + ")</summary>" + past.map(eventHTML).join("") + "</details>";
      } else {
        pastBox.innerHTML = "";
      }
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-ics]");
      if (!btn) return;
      var id = btn.getAttribute("data-ics");
      var ev = all.filter(function (x) { return x.id === id; })[0];
      if (ev) downloadICS(ev);
    });

    initCalendar(upcoming);
  }

  function initCalendar(upcoming) {
    var root = $("#calendar");
    if (!root) return;

    var byDate = {};
    upcoming.forEach(function (e) { (byDate[e.date] = byDate[e.date] || []).push(e); });

    var start = upcoming.length ? parseDate(upcoming[0].date) : new Date();
    var state = { year: start.getFullYear(), month: start.getMonth(), selected: upcoming.length ? upcoming[0].date : null };
    var today = todayISO();

    root.innerHTML =
      '<div class="calendar__bar">' +
        '<button class="calendar__nav" type="button" data-step="-1" aria-label="Vorige maand">&#8249;</button>' +
        '<h2 class="calendar__title" id="cal-title" aria-live="polite"></h2>' +
        '<button class="calendar__nav" type="button" data-step="1" aria-label="Volgende maand">&#8250;</button>' +
      "</div>" +
      '<div class="calendar__grid" id="cal-grid"></div>' +
      '<div class="calendar__panel" id="cal-panel" aria-live="polite"></div>';

    var title = $("#cal-title", root);
    var grid = $("#cal-grid", root);
    var panel = $("#cal-panel", root);

    function draw() {
      title.textContent = MONTHS[state.month] + " " + state.year;
      var offset = (new Date(state.year, state.month, 1).getDay() + 6) % 7;
      var days = new Date(state.year, state.month + 1, 0).getDate();

      var html = DOW_SHORT.map(function (d) { return '<div class="calendar__dow" aria-hidden="true">' + d + "</div>"; }).join("");
      for (var i = 0; i < offset; i++) html += '<span class="calendar__day calendar__day--empty"></span>';

      for (var day = 1; day <= days; day++) {
        var iso = state.year + "-" + pad(state.month + 1) + "-" + pad(day);
        var has = !!byDate[iso];
        var cls = "calendar__day" +
          (has ? " calendar__day--has" : "") +
          (iso === today ? " calendar__day--today" : "") +
          (iso === state.selected ? " calendar__day--selected" : "");
        if (has) {
          var n = byDate[iso].length;
          html += '<button type="button" class="' + cls + '" data-date="' + iso + '" aria-label="' +
            day + " " + MONTHS[state.month] + ", " + n + (n === 1 ? " event" : " events") + '">' + day + "</button>";
        } else {
          html += '<span class="' + cls + '">' + day + "</span>";
        }
      }
      grid.innerHTML = html;
      drawPanel();
    }

    function drawPanel() {
      var evs = state.selected ? byDate[state.selected] : null;
      if (!evs) {
        panel.innerHTML = "<p>Kies een gemarkeerde dag om te zien wat er die dag gebeurt.</p>";
        return;
      }
      panel.innerHTML = "<p>" + esc(longDate(state.selected)) + "</p>" + evs.map(function (e) {
        return '<p class="calendar__panel-title">' + esc(e.title) + "</p>" +
          "<p>" + esc(timeRange(e)) + ", " + esc(e.location) + '. <a href="#' + esc(e.id) + '">Lees meer</a></p>';
      }).join("");
    }

    root.addEventListener("click", function (e) {
      var step = e.target.closest("[data-step]");
      if (step) {
        state.month += Number(step.getAttribute("data-step"));
        if (state.month < 0) { state.month = 11; state.year--; }
        if (state.month > 11) { state.month = 0; state.year++; }
        draw();
        return;
      }
      var dayBtn = e.target.closest("[data-date]");
      if (dayBtn) {
        state.selected = dayBtn.getAttribute("data-date");
        draw();
        var focusTarget = root.querySelector('[data-date="' + state.selected + '"]');
        if (focusTarget) focusTarget.focus();
      }
    });

    draw();
  }

  /* ---------- Contact ---------- */

  function initContact() {
    var form = $("#contact-form");
    if (!form) return;
    var status = $("#form-status");

    function show(kind, message) {
      status.className = "form-status form-status--" + kind;
      status.textContent = message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.website && form.website.value) return; // spamval: bots vullen dit verborgen veld in

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!SITE.contactFormEndpoint) {
        show("error", "Dit formulier is nog niet gekoppeld, dus je bericht is niet verstuurd. Stuur ons een bericht via Instagram (" + SITE.instagramHandle + ") of bel " + SITE.phoneDisplay + ".");
        return;
      }

      var button = form.querySelector("button[type=submit]");
      button.disabled = true;
      show("ok", "Bericht wordt verstuurd…");

      fetch(SITE.contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error("status " + res.status);
        form.reset();
        show("ok", "Bedankt, je bericht is verstuurd. We reageren zo snel mogelijk.");
      }).catch(function () {
        show("error", "Het versturen is niet gelukt. Probeer het later opnieuw, of stuur ons een bericht via Instagram of bel " + SITE.phoneDisplay + ".");
      }).then(function () {
        button.disabled = false;
      });
    });
  }

  /* ---------- Start ---------- */

  renderChrome();
  if (PAGE === "home") renderHome();
  if (PAGE === "krant") renderKrant();
  if (PAGE === "artikel") renderArticle();
  if (PAGE === "events") renderEvents();
  if (PAGE === "contact") initContact();
})();
