/* ==========================================================
   De artikelen van De Louvel Krant.

   Een nieuw artikel toevoegen? Kopieer een blok hieronder, plak het
   bovenaan de lijst en pas de tekst aan. Zie de README voor het sjabloon.

   - id        : korte naam zonder spaties of hoofdletters (komt in de link)
   - date      : JJJJ-MM-DD
   - image     : pad naar een plaatje in de map images/
   - body      : de tekst. Elke regel is een alinea. Je kunt ook gebruiken:
                 { type: "heading", text: "Tussenkopje" }
                 { type: "quote",   text: "Een citaat" }
                 { type: "image",   src: "images/x.jpg", alt: "...", caption: "..." }
   De volgorde in de krant bepaalt de datum, niet de volgorde in dit bestand.
   ========================================================== */

window.LOUVEL_ARTICLES = [
  {
    id: "vrije-wil",
    title: "Is vrije wil een illusie?",
    date: "2026-10-28",
    category: "Vrije wil",
    image: "images/vrije-wil.svg",
    imageAlt: "Een pad dat zich splitst in drie paden, in een mistig landschap",
    caption: "Elk pad lijkt open. De vraag is of je het echt zelf kiest.",
    body: [
      "Je staat in de keuken en pakt een glas. Niemand dwingt je, het voelt als jouw beslissing. Maar in de jaren tachtig deed de neurowetenschapper Benjamin Libet een experiment dat dat gevoel onderuit leek te halen: de hersenen bleken zich al voor te bereiden op een handeling voordat proefpersonen zeiden dat ze besloten hadden te bewegen.",
      "Betekent dat dat je beslissing er al was voordat jij hem nam? Zo simpel ligt het niet. Het signaal dat Libet mat is een voorbereiding, geen onherroepelijk besluit, en de manier waarop proefpersonen hun eigen 'besluit' moesten timen is lastig te vertrouwen. Wetenschappers en filosofen discussiëren er nog steeds over.",
      { type: "heading", text: "Drie antwoorden" },
      "De harde determinist zegt: alles wat je doet is het gevolg van wat eraan voorafging, dus vrije wil bestaat niet. De libertariër zegt: er is echt ruimte voor keuzes die niet vastliggen. En de compatibilist probeert te redden wat te redden valt: vrijheid betekent niet dat je buiten de natuurwetten staat, maar dat je handelt vanuit je eigen redenen en verlangens, zonder dwang van buitenaf.",
      { type: "quote", text: "Misschien is de vraag niet of je vrij bent, maar vrij waartoe." },
      "Dat laatste maakt de discussie praktisch. Ook als je keuzes een oorzaak hebben, is er verschil tussen iemand die handelt onder bedreiging en iemand die doet wat hij werkelijk wil. We houden elkaar nog altijd verantwoordelijk, en dat doen we met reden. Wat zou het voor jou veranderen als je zeker wist dat vrije wil niet bestaat?"
    ]
  },
  {
    id: "schip-van-theseus",
    title: "Het schip van Theseus: ben jij nog dezelfde?",
    date: "2026-10-21",
    category: "Identiteit",
    image: "images/schip-van-theseus.svg",
    imageAlt: "Een houten schip dat langzaam oplost in zachte mist",
    caption: "Plank voor plank vervangen, tot er niets origineels meer over is.",
    body: [
      "De Grieken vertelden over het schip waarmee Theseus uit Kreta terugkeerde. Het werd bewaard als monument, en telkens als een plank verrotte, werd die vervangen. Na honderd jaar was elke plank nieuw. Is het dan nog hetzelfde schip?",
      "Het raadsel wordt lastiger als je bedenkt dat iemand de oude planken bewaard heeft en daar een tweede schip van bouwt. Nu liggen er twee schepen in de haven. Welk van de twee is het schip van Theseus? Het schip dat altijd gebruikt is, of het schip van het oorspronkelijke hout?",
      { type: "heading", text: "En wij dan?" },
      "Het raadsel gaat niet echt over schepen. Je lichaam vernieuwt zich voortdurend, je overtuigingen veranderen, en veel van wat je op je twaalfde belangrijk vond, interesseert je nu niet meer. Toch zeg je 'ik' en bedoel je dezelfde persoon.",
      "Sommigen zoeken de identiteit in het verhaal dat je over jezelf vertelt, anderen in de ononderbroken keten van herinneringen, weer anderen in het lichaam. Elk antwoord laat een eigen vreemd geval over. Wat heb je het meest nodig om jezelf te blijven?"
    ]
  },
  {
    id: "goed-leven",
    title: "Wat maakt een leven goed?",
    date: "2026-10-14",
    category: "Ethiek",
    image: "images/goed-leven.svg",
    imageAlt: "Een zon die opkomt boven zachte groene heuvels",
    caption: "Rust, werk, mensen. Waar zit het goede precies?",
    body: [
      "Stel dat je een machine kon aansluiten waarin je de rest van je leven alleen maar prettige ervaringen had: succes, liefde, schoonheid, allemaal overtuigend echt. Je zou niet weten dat je erin zat. Stap je erin? De filosoof Robert Nozick bedacht deze 'ervaringsmachine' om te laten zien dat de meeste mensen nee zeggen.",
      "Als plezier het enige was dat telde, zou er geen reden zijn om te weigeren. Toch voelt het alsof er iets ontbreekt: dat de dingen echt gebeurd zijn, dat je zelf iets gedaan hebt, dat de mensen om je heen echt zijn.",
      { type: "heading", text: "Een oud gesprek" },
      "Aristoteles noemde het goede leven eudaimonia: bloei. Dat is geen gevoel maar een manier van leven, waarin je je vermogens gebruikt en je deugden oefent. Epicurus legde de nadruk op rust en vriendschap, met weinig verlangens die je niet kunt vervullen. De stoïcijnen zochten het in een kalme houding tegenover wat je niet kunt veranderen.",
      "Ze verschillen, maar delen iets: het goede leven is iets wat je doet, niet alleen iets wat je overkomt. Als je vandaag één ding zou veranderen om dichter bij zo'n leven te komen, wat zou het zijn?"
    ]
  },
  {
    id: "grot-van-plato",
    title: "De grot van Plato, nu met schermen",
    date: "2026-10-07",
    category: "Kennis",
    image: "images/grot-van-plato.svg",
    imageAlt: "De opening van een grot met licht dat naar binnen valt en schaduwen op de wand",
    caption: "Schaduwen op de wand. Wat is het echte ding erachter?",
    body: [
      "Plato beschrijft mensen die van jongs af vastgeketend in een grot zitten. Achter hen brandt een vuur, daartussen worden voorwerpen langsgedragen, en op de wand voor hen zien ze alleen de schaduwen. Voor hen zijn die schaduwen de werkelijkheid.",
      "Wie loskomt en naar buiten loopt, wordt eerst verblind door het zonlicht. Als hij terugkeert om de anderen te vertellen wat hij gezien heeft, gelooft niemand hem. Ze vinden zijn verhaal maar vreemd en liever blijven ze bij wat ze kennen.",
      { type: "heading", text: "Wat is onze wand?" },
      "Het is verleidelijk om de wand te vergelijken met een scherm. We zien een bewerkte selectie van de wereld, aangepast aan wat ons vasthoudt. Maar Plato's punt is breder: ieder van ons kijkt vanuit een bepaald punt, met gewoontes en aannames die we zelden onderzoeken.",
      "De vraag is dan niet alleen hoe we de schaduwen herkennen, maar ook hoe we iemand kunnen helpen die nog binnen zit zonder hem te beledigen. Wat heeft jou ooit doen twijfelen aan iets waarvan je dacht dat het vaststond?"
    ]
  },
  {
    id: "de-ander",
    title: "Hoe weet je dat een ander iets voelt?",
    date: "2026-09-30",
    category: "Geest",
    image: "images/de-ander.svg",
    imageAlt: "Twee lichtende bollen die elkaar bijna raken in een lila lucht",
    caption: "We zien elkaars gedrag, nooit elkaars binnenwereld.",
    body: [
      "Jij weet dat jij pijn voelt. Maar wat je van een ander ziet, is een gezicht dat vertrekt en een stem die iets zegt. Je hebt nooit directe toegang tot wat er in een ander omgaat. Hoe kun je dan zeker zijn dat er überhaupt iets is?",
      "Dit heet het probleem van de andere geesten. Het klassieke antwoord is een redenering naar analogie: ik gedraag me zo als ik pijn heb, die ander gedraagt zich net zo, dus zal hij ook pijn hebben. Critici vinden dat een magere basis, omdat ik maar één geval ken, mijn eigen.",
      { type: "heading", text: "Zekerheid of vertrouwen?" },
      "Een andere benadering zegt dat de vraag verkeerd gesteld is. We leren woorden als 'pijn' en 'verdriet' in gesprek met elkaar, en gebruiken ze al voordat we er ooit over twijfelden. Twijfel aan de ander komt dan pas later en lijkt meer op een filosofisch spel dan op een echte onzekerheid.",
      "Toch blijft het een bijzonder idee: alles wat we samen delen, delen we via de buitenkant. Wat doet voor jou het meeste om iemand echt te leren kennen?"
    ]
  }
];
