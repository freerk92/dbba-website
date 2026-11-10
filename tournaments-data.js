/* Tournament list. Add a new entry to the array; the site sorts it into "coming" or "past" by date.
   naf: "approved" | "pending" | omitted.  links: [label, url] pairs.
   squad: true for a squad tournament (shown as a Squad tag; leave out for Solo).  major: true for a major (shown as a Major tag). */
const ABBA = ["Arcane Forge (ABBA)", "https://arcaneforge.nl/pages/abba-arcane-forge-series"];
const LBBL_FALL = ["LBBL: Pumpkin Punchers", "https://sites.google.com/view/leidenbloodbowlleague/tournaments"];
const LBBL_SUMMER = ["LBBL: Sunshine Smashers", "https://sites.google.com/view/leidenbloodbowlleague/tournaments"];
const BLOODSTORM = ["Bloodstorm NL", "http://www.bloodstormevents.nl/"];
const NAF = id => ["NAF tournament page", "https://member.thenaf.net/index.php?module=NAF&type=tournaments&func=view&id=" + id];

const TOURNAMENTS = [
  { name: "LBBL: Sunshine Smashers Tournament V", type: "Blood Bowl Sevens", date: "2027-06-06", where: "Leiden",
    info: "Annual Blood Bowl Sevens summer tournament by the Leiden Blood Bowl League.", links: [LBBL_SUMMER] },
  { name: "Madhobbit Massacre Sevens", type: "Blood Bowl Sevens", date: "2027-05-16", where: "Amersfoort",
    info: "", naf: "approved", links: [NAF(12419)] },
  { name: "Madhobbit Massacre XXIII", type: "Blood Bowl", date: "2027-05-15", dateEnd: "2027-05-16", where: "Amersfoort",
    info: "", naf: "approved", links: [NAF(12338)] },
  { name: "SilverBowl III", type: "Blood Bowl", date: "2027-04-17", where: "Huissen",
    info: "", naf: "approved", links: [NAF(12424)] },
  { name: "Dutch Open 2027", type: "Blood Bowl", major: true, date: "2027-02-13", dateEnd: "2027-02-14", where: "Hoofddorp",
    info: "Both the Dutch championship and an open tournament.", naf: "approved", links: [NAF(12308), ["Dutch Open", "https://sites.google.com/view/dutchopen"]] },
  { name: "Keistad Cup IX", type: "Blood Bowl", date: "2027-01-02", where: "Amersfoort",
    info: "", naf: "approved", links: [NAF(12326)] },
  { name: "Blitzers of the North 4: Pitches Be Crazy", type: "Blood Bowl Sevens", date: "2026-12-20", where: "Leeuwarden",
    info: "Hosted by the Frisian League of Allied Blood Bowl YoBs.", naf: "approved", links: [NAF(12264), ["FLABBY", "https://www.flabby.frl/tournaments"]] },
  { name: "ABBA Arcane Forge Series 3", type: "Blood Bowl Sevens", date: "2026-11-29", where: "Arcane Forge, Amsterdam",
    info: "Hosted by the Amsterdam Blood Bowl Association.", naf: "approved", links: [NAF(12163), ABBA] },
  { name: "ABBA Arcane Forge Tournament 2026", type: "Blood Bowl", date: "2026-11-22", where: "Arcane Forge, Amsterdam",
    info: "Hosted by the Amsterdam Blood Bowl Association.", naf: "approved", links: [NAF(12133), ABBA] },
  { name: "Ramstel Cup 2026", type: "Blood Bowl", squad: true, date: "2026-11-14", where: "Leiden",
    info: "The annual Dutch team tournament during which the Dutch Capital City of Blood Bowl is crowned.", naf: "approved", links: [NAF(11998)] },
  { name: "LBBL: Pumpkin Punchers Tournament IV", type: "Blood Bowl Sevens", date: "2026-11-01", where: "Leiden",
    info: "Annual Blood Bowl Sevens fall tournament by the Leiden Blood Bowl League.", naf: "approved", links: [NAF(12142), LBBL_FALL] },
  { name: "ZBBL - Zaanhammer Sevens Rookie Rumble", type: "Blood Bowl Sevens", date: "2026-10-24", where: "Zaanhammer, Purmerend",
    info: "A rookie friendly Blood Bowl Sevens tournament.", links: [["ZBBL", "https://www.zaanhammer.nl/"]] },
  { name: "Bloodstorm Bowl V: Extreme Weather", type: "Blood Bowl", date: "2026-10-03", where: "Utrecht",
    info: "Annual Blood Bowl autumn tournament with narrative rules.", links: [BLOODSTORM] },
  { name: "ABBA Blood Bowl Tournament", type: "Blood Bowl Sevens", date: "2026-09-20", where: "Arcane Forge, Amsterdam",
    info: "Hosted by the Amsterdam Blood Bowl Association.", naf: "approved", links: [ABBA] },
  { name: "MadHobbit Massacre - Amershof Farewell Tournament", type: "Blood Bowl", date: "2026-09-05", where: "Amersfoort",
    info: "", naf: "approved", links: [NAF(11780)] },
  { name: "ABBA Blood Bowl Tournament", type: "Blood Bowl Sevens", date: "2026-07-12", where: "Amsterdam",
    info: "Hosted by the Amsterdam Blood Bowl Association.", naf: "approved", links: [ABBA] },
  { name: "Keistad Cup VIII", type: "Blood Bowl", date: "2026-07-04", where: "Amersfoort",
    info: "3 games, NAF sanctioned. The winner receives a unique, already legendary custom made Keistad Dice Cup!", naf: "approved", links: [] }
];
