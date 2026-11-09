// ============================================================
//  GESLAAGDE LEERLINGEN
//  Nieuwe leerling toevoegen:
//  1. Zet de foto in de map "fotos" (bijv. fotos/sara.jpg)
//  2. Voeg hieronder bovenaan een regel toe. De bovenste leerling
//     verschijnt ook groot bovenaan de pagina.
//  eersteKeer: true  toont het labeltje "In één keer".
// ============================================================
const geslaagden = [
  { naam: "Sara", datum: "oktober 2026", foto: "fotos/sara.jpg", quote: "Ik was zo zenuwachtig, maar het ging precies zoals in de lessen.", eersteKeer: true },
  { naam: "Youssef", datum: "oktober 2026", foto: "fotos/youssef.jpg", quote: "Fijn dat ik steeds dezelfde instructeur had.", eersteKeer: true },
  { naam: "Lisa", datum: "september 2026", foto: "fotos/lisa.jpg", quote: "Tweede keer gelukt, en nu met een goed gevoel." },
  { naam: "Mohamed", datum: "september 2026", foto: "fotos/mohamed.jpg", quote: "Duidelijke uitleg, nooit gestrest.", eersteKeer: true },
  { naam: "Emma", datum: "augustus 2026", foto: "fotos/emma.jpg", quote: "Snelwegles was echt de beste les.", eersteKeer: true },
  { naam: "Daan", datum: "juli 2026", foto: "fotos/daan.jpg", quote: "Na mijn 20 uur les meteen klaar voor het examen." },
];

// ============================================================
//  LESPAKKETTEN
//  Eén lijst voor de pakketlijst én de vergelijkingstabel.
//  uren: aantal uren rijles (null = geen rijles, zoals bij theorie)
//  examen: true = lesauto en instructeur op je examen
//  alleen: true = daarna zonder begeleider rijden
// ============================================================
const whatsappNummer = "31645322903";

const pakketten = [
  { naam: "2 uur rijles", uren: 2, examen: false, alleen: false,
    uitleg: "Om kennis te maken, of om één onderdeel extra te oefenen.",
    voorWie: "wil kennismaken of één onderdeel wil oefenen" },
  { naam: "6 uur rijles", uren: 6, examen: false, alleen: false,
    uitleg: "Verplicht als je 2 keer niet geslaagd bent voor het praktijkexamen. Ook handig om bij te schaven naast begeleid rijden.",
    voorWie: "2 keer gezakt bent, of wil bijschaven naast begeleid rijden" },
  { naam: "10 uur rijles", uren: 10, examen: false, alleen: false,
    uitleg: "Voor wie al met een begeleider rijdt en gericht wil bijleren.",
    voorWie: "al met een begeleider rijdt en gericht wil bijleren" },
  { naam: "20 uur rijles", uren: 20, examen: false, alleen: true,
    uitleg: "Vanaf 18 jaar. Na 20 uur les krijg je het bekwaamheidsattest, waarmee je met een voorlopig rijbewijs zonder begeleider mag rijden.",
    voorWie: "18 bent en zonder begeleider wil oefenen" },
  { naam: "Examenbegeleiding", uren: 0, examen: true, alleen: false,
    uitleg: "Je doet je praktijkexamen met onze lesauto en de instructeur gaat mee naar het examencentrum.",
    voorWie: "klaar bent voor je examen en geen eigen auto hebt" },
  { naam: "2 uur rijles + examenbegeleiding", uren: 2, examen: true, alleen: false,
    uitleg: "Twee uur les vlak voor je examen om alles op te frissen. Daarna meteen naar het examen, met onze lesauto en instructeur.",
    voorWie: "vlak voor je examen nog wil opfrissen" },
  { naam: "Theorie", uren: null, examen: false, alleen: false,
    uitleg: "Voorbereiding op het theorie-examen, zodat je goed weet wat je kan verwachten.",
    voorWie: "je klaarmaakt voor het theorie-examen" },
];

// WhatsApp-link met het gekozen pakket al ingevuld
function whatsappLink(pakket) {
  const tekst = `Hoi, ik heb interesse in het pakket "${pakket.naam}". Kan je me meer info geven?`;
  return `https://wa.me/${whatsappNummer}?text=${encodeURIComponent(tekst)}`;
}

const ja = '<span class="ja" aria-label="Ja">✓</span>';
const nee = '<span class="nee" aria-label="Nee">–</span>';

// Pakketlijst
document.getElementById("pakketlijst").innerHTML = pakketten.map((p) => `
  <li>
    <div>
      <h3>${p.naam}</h3>
      <p>${p.uitleg}</p>
    </div>
    <a href="${whatsappLink(p)}" class="vraag" target="_blank" rel="noopener">Vraag naar dit pakket</a>
  </li>`).join("");

// Vergelijkingstabel
document.getElementById("tabel-rijen").innerHTML = pakketten.map((p) => `
  <tr>
    <th scope="row">${p.naam}</th>
    <td class="getal" data-label="Uren rijles">${p.uren === null ? nee : p.uren}</td>
    <td data-label="Lesauto en instructeur op je examen">${p.examen ? ja : nee}</td>
    <td data-label="Daarna zonder begeleider rijden">${p.alleen ? `<span class="met">${ja} met bekwaamheidsattest</span>` : nee}</td>
    <td class="voorwie" data-label="Past bij jou als je">${p.voorWie}</td>
    <td class="kies"><a href="${whatsappLink(p)}" class="vraag vraag--klein" target="_blank" rel="noopener">Kies</a></td>
  </tr>`).join("");


const stuur = `
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
    <circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="6"/>
    <path d="M8 28c8-2 16-2 18 2M56 28c-8-2-16-2-18 2M32 38v20"/>
  </svg>`;

// Maakt een foto, of een nette lege plek als de foto (nog) ontbreekt
function maakFoto(leerling) {
  const vak = document.createElement("div");
  vak.className = "foto";
  const leeg = () => {
    vak.classList.add("foto--leeg");
    vak.innerHTML = `${stuur}<span>Foto van ${leerling.naam} volgt</span>`;
    leerling.foto = null;
  };
  if (!leerling.foto) { leeg(); return vak; }
  const img = document.createElement("img");
  img.src = leerling.foto;
  img.alt = `${leerling.naam} na het slagen`;
  img.loading = "lazy";
  img.onerror = leeg;
  vak.appendChild(img);
  return vak;
}

// Grote foto bovenaan: de meest recente geslaagde
const laatste = document.getElementById("laatste");
if (geslaagden.length) {
  const eerste = geslaagden[0];
  laatste.appendChild(maakFoto(eerste));
  const onderschrift = document.createElement("figcaption");
  onderschrift.innerHTML = `<small>Laatst geslaagd</small><strong>${eerste.naam}, ${eerste.datum}</strong>`;
  laatste.appendChild(onderschrift);
}

// Fotomuur
const muur = document.getElementById("muur");
const groot = document.getElementById("groot");
const grootImg = document.getElementById("groot-img");
const grootTekst = document.getElementById("groot-tekst");

geslaagden.forEach((leerling) => {
  const kaart = document.createElement("button");
  kaart.type = "button";
  kaart.className = "leerling";
  kaart.appendChild(maakFoto(leerling));

  const tekst = document.createElement("div");
  tekst.className = "leerling__tekst";
  tekst.innerHTML = `
    <div class="leerling__naam">
      <span class="vinkje" aria-hidden="true">✓</span>${leerling.naam}
      ${leerling.eersteKeer ? '<span class="label">In één keer</span>' : ""}
    </div>
    <div class="leerling__datum">Geslaagd in ${leerling.datum}</div>
    <p class="leerling__quote">“${leerling.quote}”</p>`;
  kaart.appendChild(tekst);

  kaart.addEventListener("click", () => {
    if (!leerling.foto) return;
    grootImg.src = leerling.foto;
    grootImg.alt = `${leerling.naam} na het slagen`;
    grootTekst.textContent = `${leerling.naam}, geslaagd in ${leerling.datum}`;
    groot.showModal();
  });

  muur.appendChild(kaart);
});

// Grote foto sluiten met kruisje of klik ernaast (Escape werkt vanzelf)
groot.addEventListener("click", (e) => {
  if (e.target !== grootImg) groot.close();
});

