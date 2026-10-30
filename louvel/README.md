# Louvel website

Een website voor Louvel: een platform met filosofische vraagstukken in de vorm van een krant, plus events met een agenda en een contactpagina.

De site is bewust simpel gehouden: gewone HTML, CSS en JavaScript, zonder database en zonder installatie. Je past hem aan in VS Code en zet hem met Git op GitHub.

---

## 1. Wat zit erin?

```
louvel/
├── index.html        Landingspagina (Home)
├── krant.html        Alle artikelen onder elkaar
├── artikel.html      Eén artikel (wordt gevuld op basis van de link)
├── events.html       Events + agenda
├── contact.html      Contactpagina
├── css/
│   └── style.css     Alle kleuren, lettertypes en opmaak
├── js/
│   └── main.js       Toolbar, footer, krant, artikelpagina, agenda, formulier
├── data/
│   ├── site.js       Instagram, telefoonnummer, formulier-instelling
│   ├── articles.js   ← HIER staan je artikelen
│   └── events.js     ← HIER staan je events
└── images/           Plaatjes bij artikelen + het icoon van de site
```

**Het belangrijkste om te onthouden:** de inhoud (artikelen en events) staat in de map `data/`. De opmaak staat in `css/`. Je hoeft bijna nooit in de HTML-bestanden te zijn.

De toolbar bovenaan en de footer onderaan staan één keer in `js/main.js` en verschijnen automatisch op elke pagina. Wil je een menu-item toevoegen of de footertekst aanpassen, dan doe je dat op één plek.

---

## 2. De website op localhost bekijken

Open de map `louvel` in VS Code (**File → Open Folder**). Kies dan één van deze manieren.

### Optie A: Live Server (aanbevolen)

1. Open in VS Code het Extensions-paneel (`Ctrl+Shift+X`, op Mac `Cmd+Shift+X`).
2. Zoek **Live Server** (van Ritwick Dey) en klik op **Install**.
3. Klik met de rechtermuisknop op `index.html` en kies **Open with Live Server**.
4. Je browser opent op `http://127.0.0.1:5500`. Elke keer dat je een bestand opslaat, ververst de pagina vanzelf.

### Optie B: Python (als je Python hebt)

Open in VS Code een terminal (**Terminal → New Terminal**) en typ:

```bash
python3 -m http.server 5500
```

(Op Windows werkt vaak `python -m http.server 5500`.) Ga daarna in je browser naar `http://localhost:5500`. Stoppen doe je met `Ctrl+C`.

### Optie C: Node.js (als je Node hebt)

```bash
npx serve .
```

Je ziet in de terminal op welk adres de site draait, meestal `http://localhost:3000`.

> Je kunt `index.html` ook gewoon dubbelklikken, dat werkt ook. Voor het beste beeld en voor het testen van alles gebruik je liever één van de opties hierboven.

> De lettertypes (Young Serif en Newsreader) komen van Google Fonts, dus daarvoor heb je internet nodig. Zonder internet laat de site een nette standaardletter zien.

---

## 3. Een nieuw artikel toevoegen

Alleen jij kunt artikelen toevoegen, want ze staan in een bestand op jouw computer (en in jouw GitHub-repository). Bezoekers kunnen niets aanpassen. Zie ook onderdeel 8.

**Stap 1. Zet je plaatje in de map `images/`.**
Gebruik bij voorkeur een `.jpg` of `.webp`. Een breedte van ongeveer 1600 pixels is genoeg. Geef het een korte naam zonder spaties, bijvoorbeeld `vriendschap.jpg`. Houd plaatjes onder de ~500 KB, dan laadt de site snel.

**Stap 2. Open `data/articles.js`** en plak onder de regel `window.LOUVEL_ARTICLES = [` een nieuw blok (en vergeet de komma aan het einde niet):

```js
  {
    id: "vriendschap",
    title: "Kun je vrienden zijn met iemand die je niet begrijpt?",
    date: "2026-11-04",
    category: "Relaties",
    image: "images/vriendschap.jpg",
    imageAlt: "Twee stoelen aan een tafel bij het raam",
    caption: "Een bijschrift onder het plaatje (mag je weglaten).",
    body: [
      "Dit is de eerste alinea. Deze wordt ook als voorproefje getoond in de krant.",
      "Dit is de tweede alinea.",
      { type: "heading", text: "Een tussenkopje" },
      "Nog een alinea.",
      { type: "quote", text: "Een citaat dat uitspringt." },
      { type: "image", src: "images/extra-plaatje.jpg", alt: "Beschrijving van het plaatje", caption: "Bijschrift" },
      "Laatste alinea."
    ]
  },
```

**Wat betekent wat?**

| Veld | Uitleg |
|------|--------|
| `id` | Korte naam voor in de link. Alleen kleine letters, cijfers en streepjes. Moet uniek zijn. |
| `title` | De titel van het artikel. |
| `date` | Datum als `JJJJ-MM-DD`. Op basis hiervan staat het nieuwste artikel bovenaan. |
| `category` | Het label bij het artikel, bijvoorbeeld "Ethiek". |
| `image` | Pad naar het hoofdplaatje. |
| `imageAlt` | Beschrijving van het plaatje voor mensen die het niet kunnen zien. |
| `caption` | Bijschrift onder het plaatje (optioneel). |
| `body` | De tekst. Elke tekst tussen aanhalingstekens is een alinea. |
| `excerpt` | Optioneel: een eigen voorproefje. Zonder dit gebruikt de krant het begin van de eerste alinea. |

**Let op de schrijfregels:**
- Tekst staat tussen aanhalingstekens `"..."` en elke regel eindigt met een komma.
- Wil je een aanhalingsteken in je tekst, gebruik dan een enkel teken (`'`) of schrijf `\"`.
- Een artikel zonder tekst of met een ontbrekende komma zorgt ervoor dat de pagina leeg blijft. Kijk dan in de browser: druk op `F12` en open het tabblad **Console**. Daar staat welke regel fout is.

**Stap 3. Sla op en kijk in je browser.** Het artikel staat bovenaan de krant en op de landingspagina bij "Nieuw in de krant".

### Een artikel aanpassen of verwijderen

- **Aanpassen:** zoek het blok in `data/articles.js` en wijzig de tekst.
- **Verwijderen:** verwijder het hele blok, van `{` tot en met `},`.

---

## 4. Events toevoegen of aanpassen

De voorbeeld-events in `data/events.js` zijn verzonnen. Vervang ze door je eigen events.

Plak een nieuw blok in de lijst:

```js
  {
    id: "filosofisch-cafe-december",
    title: "Filosofisch café: kun je jezelf kennen?",
    date: "2026-12-19",
    start: "19:30",
    end: "22:00",
    location: "Naam van de locatie",
    address: "Straat 1, Plaats",
    price: "Gratis",
    description: "Korte beschrijving van wat er gebeurt."
  },
```

Wat de website zelf doet:
- Events worden op datum gesorteerd, je hoeft ze niet op volgorde te zetten.
- Events in het verleden verdwijnen uit de agenda en de lijst met aankomende events en komen onder "Eerdere events".
- Dagen met een event kleuren in de agenda. Klik je op zo'n dag, dan zie je het event.
- Bij elk event staat een knop "Zet in je agenda", waarmee bezoekers het event in hun eigen agenda zetten.
- Het eerstvolgende event verschijnt ook automatisch op de landingspagina.

---

## 5. Contactgegevens, teksten en kleuren aanpassen

**Instagram en telefoonnummer:** open `data/site.js`. Wat je daar wijzigt, verandert automatisch in de footer en op de contactpagina.

**Teksten op de landingspagina** (de kop, de subtekst, "Wat is Louvel?"): staan in `index.html`.

**Menu en footer:** staan bovenin `js/main.js`, in de functie `renderChrome`.

**Kleuren en lettertypes:** staan bovenin `css/style.css`, onder `:root`. Bijvoorbeeld:

```css
--moss: #56704f;     /* de groene hoofdkleur */
--lilac: #cbc3ec;    /* de lila sfeerkleur */
--dawn: #f3e4c4;     /* het zachte goud */
```

Verander een kleur daar en hij verandert overal.

---

## 6. Het contactformulier laten werken

Een website zonder server kan zelf geen berichten ontvangen. Het formulier is daarom klaar voor een gratis dienst zoals [Formspree](https://formspree.io). Zolang je dat niet koppelt, krijgt een bezoeker die op "Verstuur bericht" klikt een melding met je Instagram en telefoonnummer, zodat er geen bericht verloren gaat zonder dat de bezoeker het weet.

Koppelen:

1. Maak een gratis account op formspree.io en maak een nieuw formulier aan.
2. Je krijgt een adres dat eruitziet als `https://formspree.io/f/abcdwxyz`.
3. Plak dat in `data/site.js`:

```js
contactFormEndpoint: "https://formspree.io/f/abcdwxyz"
```

4. Test het formulier. De berichten komen in je mailbox.

---

## 7. Hoe het in elkaar zit (kort)

- Elke pagina laadt dezelfde vier scriptbestanden: `data/site.js`, `data/articles.js`, `data/events.js` en `js/main.js`.
- `js/main.js` kijkt naar `<body data-page="...">` om te weten op welke pagina hij zit en bouwt de juiste inhoud op: de krant uit `articles.js`, de events en de agenda uit `events.js`.
- `artikel.html` is één sjabloon voor alle artikelen. De link `artikel.html?id=vrije-wil` laat het artikel met dat `id` zien.
- De opmaak staat helemaal in `css/style.css`.

---

## 8. Wie kan dingen aanpassen? Alleen jij

Dit is een statische website. Bezoekers kunnen alleen lezen. Er is geen inlogscherm en geen formulier waarmee iemand een artikel kan plaatsen.

Artikelen en events veranderen alleen als jij de bestanden in `data/` aanpast en de nieuwe versie op GitHub zet. Alleen mensen die toegang hebben tot jouw GitHub-repository (jij, en iedereen die je er zelf aan toevoegt) kunnen dat doen. Bewaar je GitHub-wachtwoord dus veilig en zet tweestapsverificatie aan.

Een nadeel van deze opzet: je plaatst geen artikelen via de website zelf, maar via VS Code. Wil je later artikelen kunnen plaatsen via een inlogscherm, dan heb je een CMS of een backend nodig. Dat kan, maar is een volgende stap.

---

## 9. In een Git-repository en op GitHub zetten

### Eenmalig instellen

Is Git nog niet geïnstalleerd? Download het van [git-scm.com](https://git-scm.com). Zeg daarna eenmalig wie je bent:

```bash
git config --global user.name "Jouw naam"
git config --global user.email "jouw-email@voorbeeld.nl"
```

### Stap 1: een lokale repository maken

Open in VS Code een terminal in de map `louvel` (**Terminal → New Terminal**) en typ:

```bash
git init
git branch -M main
git add .
git commit -m "Eerste versie van de Louvel website"
```

Wat gebeurt hier? `git init` maakt van de map een repository. `git add .` kiest alle bestanden. `git commit` slaat een momentopname op met een korte beschrijving.

### Stap 2: een repository op GitHub maken

1. Log in op github.com en klik rechtsboven op **+ → New repository**.
2. Geef hem de naam `louvel`.
3. Laat **Add a README file** en **.gitignore** uit, want die heb je al.
4. Klik op **Create repository**.

### Stap 3: je map koppelen en uploaden

GitHub laat nu een adres zien. Typ in je terminal (vervang `JOUWNAAM` door je GitHub-gebruikersnaam):

```bash
git remote add origin https://github.com/JOUWNAAM/louvel.git
git push -u origin main
```

Bij de eerste keer vraagt GitHub om in te loggen. Daarna staat de site online op GitHub.

> Je kunt dit ook zonder terminal doen: klik in VS Code links op het **Source Control**-icoon (het takje), vul een bericht in, klik op **Commit** en daarna op **Publish Branch**.

### Daarna: elke keer als je iets hebt aangepast

```bash
git add .
git commit -m "Nieuw artikel: kun je vrienden zijn met iemand die je niet begrijpt?"
git push
```

Schrijf bij het bericht kort wat je hebt gedaan, dan zie je later in GitHub precies wat er wanneer veranderd is.

### De website online zetten met GitHub Pages (gratis)

1. Ga op GitHub naar je repository, dan **Settings → Pages**.
2. Kies bij **Source** de optie **Deploy from a branch**, kies de branch `main` en de map `/ (root)`, en klik op **Save**.
3. Na een minuut staat je site op `https://JOUWNAAM.github.io/louvel/`.

Vanaf dat moment staat elke `git push` na ongeveer een minuut ook live. Een eigen domeinnaam (bijvoorbeeld louvel.nl) kun je later koppelen via dezelfde Pages-instellingen.

---

## 10. Problemen oplossen

| Probleem | Oplossing |
|----------|-----------|
| De krant of events zijn leeg | Er staat waarschijnlijk een komma of aanhalingsteken te weinig in `data/articles.js` of `data/events.js`. Druk op `F12` en kijk in de **Console** welke regel een fout geeft. |
| Een plaatje verschijnt niet | Controleer of de bestandsnaam in `image:` precies klopt, inclusief hoofdletters en `.jpg`/`.png`. |
| Mijn wijziging zie ik niet | Ververs met `Ctrl+Shift+R` (Mac: `Cmd+Shift+R`), dan laadt de browser de nieuwste versie. |
| De pagina's zien er anders uit na `git push` | Op GitHub Pages kan het een minuut duren voor een wijziging zichtbaar is. |
| Het formulier zegt dat het niet gekoppeld is | Vul `contactFormEndpoint` in `data/site.js` in, zie onderdeel 6. |
