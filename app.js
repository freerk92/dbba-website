(function () {
  "use strict";

  /* ---------- e-mail links (kept out of the plain HTML source) ---------- */
  document.querySelectorAll("a.mail").forEach(function (a) {
    var addr = a.dataset.u + "@" + a.dataset.d;
    a.href = "mailto:" + addr;
    a.textContent = addr;
  });

  /* ---------- league logos (from league-logos.js) ---------- */
  if (typeof LEAGUE_LOGOS !== "undefined") {
    document.querySelectorAll("[data-logo]").forEach(function (c) {
      var url = LEAGUE_LOGOS[c.dataset.logo];
      if (!url) return;
      var img = document.createElement("img");
      img.className = "logo";
      img.loading = "lazy";
      img.alt = c.querySelector(".idx").textContent + " logo";
      img.onerror = function () { img.remove(); };
      img.src = url;
      c.insertBefore(img, c.firstChild);
    });
  }

  /* ---------- league filter ---------- */
  var q = document.getElementById("q");
  var leagues = document.getElementById("leagues") || document.getElementById("shops");
  if (q && leagues) {
    var cards = Array.prototype.slice.call(leagues.children);
    var count = document.getElementById("count");
    var none = document.getElementById("none");
    var text = cards.map(function (c) { return c.textContent.toLowerCase(); });
    var apply = function () {
      var term = q.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c, i) {
        var hit = !term || text[i].indexOf(term) !== -1;
        c.hidden = !hit;
        if (hit) shown++;
      });
      count.textContent = shown + " of " + cards.length;
      none.classList.toggle("show", shown === 0);
    };
    q.addEventListener("input", apply);
    apply();

    var clear = document.getElementById("clear");
    var syncClear = function () { if (clear) clear.hidden = !q.value.trim(); };
    q.addEventListener("input", syncClear);
    if (clear) clear.addEventListener("click", function () {
      q.value = "";
      q.dispatchEvent(new Event("input"));
      q.focus();
    });
    syncClear();

    /* ---------- homemade map (from nl-map.js; data-pins on the svg picks leagues or shops) ---------- */
    var mapEl = document.getElementById("league-map");
    var cityList = document.getElementById("city-list");
    if (mapEl && typeof NL_MAP !== "undefined") {
      var NS = "http://www.w3.org/2000/svg";
      var M = NL_MAP;
      var pins = MAP_PINS[mapEl.dataset.pins] || [];
      var nameOf = function (c) { return (c.querySelector(".idx") || c.querySelector("h3")).textContent; };
      var svgEl = function (tag, attrs, txt) {
        var e = document.createElementNS(NS, tag);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        if (txt != null) e.textContent = txt;
        return e;
      };
      mapEl.setAttribute("viewBox", "0 0 " + M.width + " " + M.height);

      var land = svgEl("g", { "aria-hidden": "true" });
      M.provinces.forEach(function (p) {
        land.appendChild(svgEl("path", { d: p.d, class: "prov", "fill-rule": "evenodd" }));
      });
      mapEl.appendChild(land);

      var pinEls = [];
      var cityItems = [];
      pins.forEach(function (pin) {
        var term = pin.city.toLowerCase();
        var names = [];
        cards.forEach(function (c, i) {
          if (text[i].indexOf(term) !== -1) names.push(nameOf(c));
        });
        if (!names.length) return;

        var x = (pin.lon - M.lon0) * M.cos * M.k + M.pad;
        var y = (M.lat0 - pin.lat) * M.k + M.pad;
        var label = pin.label || pin.city;
        var g = svgEl("g", {
          class: "pin", tabindex: "0", role: "button",
          "aria-label": pin.city + ": " + names.join(", ")
        });
        g.appendChild(svgEl("rect", { x: -7, y: -7, width: 14, height: 14, transform: "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(45)" }));
        if (names.length > 1) g.appendChild(svgEl("text", { class: "pin-n", x: x.toFixed(1), y: (y + 4).toFixed(1), "text-anchor": "middle" }, names.length));
        var side = { r: [13, 4, "start"], l: [-13, 4, "end"], t: [0, -13, "middle"], b: [0, 21, "middle"] }[pin.side || "r"];
        g.appendChild(svgEl("text", { class: "pin-label", x: (x + side[0]).toFixed(1), y: (y + side[1]).toFixed(1), "text-anchor": side[2] }, label));
        mapEl.appendChild(g);

        var pick = function () {
          var on = q.value.trim().toLowerCase() === term;
          q.value = on ? "" : pin.city;
          q.dispatchEvent(new Event("input"));
          if (!on) document.querySelector(".filter").scrollIntoView({ behavior: "smooth", block: "start" });
        };
        g.addEventListener("click", pick);
        g.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); }
        });
        pinEls.push({ term: term, el: g });

        if (cityList) {
          var li = document.createElement("li");
          var b = document.createElement("button");
          b.type = "button";
          b.className = "city-btn";
          var strong = document.createElement("strong");
          strong.textContent = pin.city;
          var span = document.createElement("span");
          span.textContent = names.join(", ");
          b.appendChild(strong);
          b.appendChild(span);
          b.addEventListener("click", pick);
          li.appendChild(b);
          cityItems.push({ city: pin.city, li: li });
          pinEls.push({ term: term, el: b });
        }
      });

      if (cityList) {
        cityItems.sort(function (a, b) { return a.city.localeCompare(b.city); });
        cityItems.forEach(function (it) { cityList.appendChild(it.li); });
      }

      var mark = function () {
        var cur = q.value.trim().toLowerCase();
        pinEls.forEach(function (p) { p.el.classList.toggle("active", p.term === cur); });
      };
      q.addEventListener("input", mark);
      mark();
    }
  }

  /* ---------- tournaments ---------- */
  if (typeof TOURNAMENTS === "undefined") return;

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var today = new Date();
  var todayIso = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  function card(t, past) {
    var parts = t.date.split("-");
    var art = el("article", "t" + (past ? " past" : ""));
    art.dataset.type = t.type;

    var d = el("div", "t-date");
    var day = String(+parts[2]);
    if (t.dateEnd) day += "-" + (+t.dateEnd.split("-")[2]);
    d.appendChild(el("span", "d", day));
    d.appendChild(el("span", "m", MONTHS[+parts[1] - 1]));
    d.appendChild(el("span", "y", parts[0]));
    art.appendChild(d);

    var body = el("div");
    var h = el("h3", null, t.name);
    if (t.naf) {
      h.appendChild(el("span", "naf" + (t.naf === "pending" ? " pending" : ""), t.naf === "pending" ? "NAF pending" : "NAF approved"));
    }
    if (t.major) h.appendChild(el("span", "t-tag major", "Major"));
    h.appendChild(el("span", "t-tag " + (t.squad ? "squad" : "solo"), t.squad ? "Squad" : "Solo"));
    body.appendChild(h);
    body.appendChild(el("div", "t-meta", t.type + " · " + t.where));
    if (t.info) body.appendChild(el("p", null, t.info));
    if (t.links && t.links.length) {
      var l = el("div", "links");
      t.links.forEach(function (pair) {
        var a = el("a", null, pair[0]);
        a.href = pair[1];
        a.target = "_blank";
        a.rel = "noopener";
        l.appendChild(a);
      });
      body.appendChild(l);
    }
    art.appendChild(body);

    return art;
  }

  var endOf = function (t) { return t.dateEnd || t.date; };
  var coming = TOURNAMENTS.filter(function (t) { return endOf(t) >= todayIso; })
    .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var past = TOURNAMENTS.filter(function (t) { return endOf(t) < todayIso; })
    .sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  function fill(container, list, isPast, emptyMsg) {
    container.textContent = "";
    if (!list.length) { container.appendChild(el("p", "plain", emptyMsg)); return; }
    list.forEach(function (t) { container.appendChild(card(t, isPast)); });
  }

  /* home page */
  var next = document.getElementById("next-list");
  if (next) {
    fill(next, coming.slice(0, +next.dataset.limit || 3), false, "No tournaments are announced right now. Know of one? Let us know via the contact page.");
    var n = document.getElementById("stat-next");
    if (n) n.textContent = coming.length;
  }

  /* tournaments page */
  var cl = document.getElementById("coming-list");
  var pl = document.getElementById("past-list");
  if (cl && pl) {
    var type = "";
    var draw = function () {
      var list = coming.filter(function (t) { return !type || t.type === type; });
      fill(cl, list, false, "No tournaments announced for this format right now.");
    };
    draw();
    fill(pl, past, true, "No past tournaments.");
    document.querySelectorAll("[data-type]").forEach(function (b) {
      if (b.tagName !== "BUTTON") return;
      b.addEventListener("click", function () {
        type = b.dataset.type;
        document.querySelectorAll("button[data-type]").forEach(function (o) { o.classList.toggle("on", o === b); });
        draw();
      });
    });
  }
})();
