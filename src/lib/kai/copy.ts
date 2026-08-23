export const LANGS = [
  { id: "en", native: "English", locale: "en-US" },
  { id: "de", native: "Deutsch", locale: "de-DE" },
  { id: "es", native: "Español", locale: "es-ES" },
  { id: "fr", native: "Français", locale: "fr-FR" },
  { id: "tr", native: "Türkçe", locale: "tr-TR" },
  { id: "it", native: "Italiano", locale: "it-IT" },
  { id: "pt", native: "Português", locale: "pt-BR" },
  { id: "ru", native: "Русский", locale: "ru-RU" },
] as const;

export type Lang = (typeof LANGS)[number]["id"];

export function localeOf(lang: Lang) {
  return LANGS.find((l) => l.id === lang)?.locale ?? "en-US";
}

export function isLang(v: string): v is Lang {
  return LANGS.some((l) => l.id === v);
}

/** Browser language; unknown → English. Manual pick is stored separately. */
export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const locked = localStorage.getItem("kai-lang-user");
  if (locked && isLang(locked)) return locked;
  const codes = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  for (const code of codes) {
    const short = code.slice(0, 2).toLowerCase();
    if (isLang(short)) return short;
  }
  return "en";
}

type Dict = {
  brand: string;
  kicker: string;
  heroTitle: string;
  heroTagline: string;
  heroBody: string;
  chainBadge: string;
  chainHint: string;
  contrastTitle: string;
  contrastThemT: string;
  contrastThem: string;
  contrastUsT: string;
  contrastUs: string;
  whatHq: string;
  whatHqBody: string;
  whatKai: string;
  whatKaiBody: string;
  whyToken: string;
  whyTokenBody: string;
  futureTitle: string;
  futureLead: string;
  futHealthT: string;
  futHealth: string;
  futCareT: string;
  futCare: string;
  futKaiT: string;
  futKai: string;
  whyJoinTitle: string;
  whyJoinLead: string;
  join1T: string;
  join1: string;
  join2T: string;
  join2: string;
  join3T: string;
  join3: string;
  utilityTitle: string;
  utilityLead: string;
  util1: string;
  util2: string;
  util3: string;
  util4: string;
  proofTitle: string;
  proof1: string;
  proof2: string;
  proof3: string;
  proof4: string;
  roadmap: string;
  rmNow: string;
  rmNowD: string;
  rmNext: string;
  rmNextD: string;
  rmThen: string;
  rmThenD: string;
  rmLater: string;
  rmLaterD: string;
  buyCta: string;
  connect: string;
  amount: string;
  est: string;
  unit: string;
  payWith: string;
  approve: string;
  buy: string;
  buying: string;
  swapBuy: string;
  swapping: string;
  bridging: string;
  swapUniswap: string;
  openUniswap: string;
  saleWait: string;
  saleWaitHint: string;
  saleClosed: string;
  belowMin: string;
  noWallet: string;
  usdgBal: string;
  payBal: string;
  yourBought: string;
  cap: string;
  txOk: string;
  txFail: string;
  needBal: string;
  rounds: string;
  roundsLead: string;
  tokenomics: string;
  supply: string;
  supplyLine: string;
  kpiSupply: string;
  kpiPresale: string;
  kpiRounds: string;
  kpiPrice: string;
  how: string;
  step1: string;
  step1d: string;
  step2: string;
  step2d: string;
  step3: string;
  step3d: string;
  product: string;
  open: string;
  pending: string;
  everyone: string;
  tge: string;
  teamVest: string;
  contracts: string;
  overview: string;
  footerChain: string;
  allocPresale: string;
  allocEco: string;
  allocTreasury: string;
  allocLiquidity: string;
  allocMarketing: string;
  allocTeam: string;
  allocCommunity: string;
  allocAdvisors: string;
};

const buyShared = {
  connect: { tr: "Cüzdan bağla", en: "Connect wallet", de: "Wallet verbinden", es: "Conectar cartera", fr: "Connecter le portefeuille", it: "Collega il wallet", pt: "Conectar carteira", ru: "Подключить кошелёк" },
  amount: { tr: "Kaç KAI almak istiyorsun?", en: "How much KAI do you want?", de: "Wie viel KAI möchtest du?", es: "¿Cuánto KAI quieres?", fr: "Combien de KAI voulez-vous ?", it: "Quanti KAI vuoi?", pt: "Quantos KAI você quer?", ru: "Сколько KAI вы хотите?" },
  est: { tr: "Tahmini ödeme", en: "Estimated payment", de: "Geschätzte Zahlung", es: "Pago estimado", fr: "Paiement estimé", it: "Pagamento stimato", pt: "Pagamento estimado", ru: "Оценка платежа" },
  unit: { tr: "Birim fiyat", en: "Unit price", de: "Stückpreis", es: "Precio unitario", fr: "Prix unitaire", it: "Prezzo unitario", pt: "Preço unitário", ru: "Цена за единицу" },
  payWith: { tr: "Öde", en: "Pay with", de: "Zahlen mit", es: "Pagar con", fr: "Payer avec", it: "Paga con", pt: "Pagar com", ru: "Оплата" },
  approve: { tr: "USDG onayla", en: "Approve USDG", de: "USDG genehmigen", es: "Aprobar USDG", fr: "Approuver l’USDG", it: "Approva USDG", pt: "Aprovar USDG", ru: "Разрешить USDG" },
  buy: { tr: "Satın al", en: "Buy", de: "Kaufen", es: "Comprar", fr: "Acheter", it: "Compra", pt: "Comprar", ru: "Купить" },
  buying: { tr: "Cüzdanda onayla…", en: "Confirm in wallet…", de: "In der Wallet bestätigen…", es: "Confirma en la cartera…", fr: "Confirmez dans le portefeuille…", it: "Conferma nel wallet…", pt: "Confirme na carteira…", ru: "Подтвердите в кошельке…" },
  swapBuy: { tr: "Çevir ve al", en: "Swap and buy", de: "Tauschen und kaufen", es: "Convertir y comprar", fr: "Convertir et acheter", it: "Converti e compra", pt: "Converter e comprar", ru: "Обменять и купить" },
  swapping: { tr: "USDG’ye çevriliyor…", en: "Swapping to USDG…", de: "Wird zu USDG getauscht…", es: "Convirtiendo a USDG…", fr: "Conversion en USDG…", it: "Conversione in USDG…", pt: "Convertendo para USDG…", ru: "Обмен в USDG…" },
  bridging: { tr: "Köprü tamamlanıyor…", en: "Bridge in progress…", de: "Brücke läuft…", es: "Puente en curso…", fr: "Pont en cours…", it: "Bridge in corso…", pt: "Ponte em andamento…", ru: "Мост выполняется…" },
  swapUniswap: {
    tr: "ETH otomatik çeviri zincirde düşüyor. MetaMask Takas veya Uniswap ile ETH→USDG yap, sonra USDG ile al.",
    en: "Automatic ETH swap is reverting on-chain. Use MetaMask Swap or Uniswap (ETH→USDG), then buy with USDG.",
    de: "Automatischer ETH-Tausch schlägt on-chain fehl. ETH→USDG in MetaMask Swap oder Uniswap, dann mit USDG kaufen.",
    es: "El swap automático de ETH revierte en cadena. Usa MetaMask Swap o Uniswap (ETH→USDG) y compra con USDG.",
    fr: "Le swap ETH automatique revert on-chain. Utilisez MetaMask Swap ou Uniswap (ETH→USDG), puis achetez en USDG.",
    it: "Lo swap ETH automatico revert on-chain. Usa MetaMask Swap o Uniswap (ETH→USDG), poi compra con USDG.",
    pt: "O swap automático de ETH reverte on-chain. Use MetaMask Swap ou Uniswap (ETH→USDG) e compre com USDG.",
    ru: "Автообмен ETH падает в сети. Сделайте ETH→USDG в MetaMask Swap или Uniswap, затем купите за USDG.",
  },
  openUniswap: { tr: "Uniswap’te ETH → USDG", en: "ETH → USDG on Uniswap", de: "ETH → USDG auf Uniswap", es: "ETH → USDG en Uniswap", fr: "ETH → USDG sur Uniswap", it: "ETH → USDG su Uniswap", pt: "ETH → USDG no Uniswap", ru: "ETH → USDG на Uniswap" },
  saleWait: { tr: "Zincir onayı bekleniyor", en: "Waiting on-chain", de: "Warte auf die Chain", es: "Esperando la cadena", fr: "En attente de la chaîne", it: "In attesa della chain", pt: "Aguardando a chain", ru: "Ожидание сети" },
  saleWaitHint: { tr: "Satış zincirde açık.", en: "The sale is open on-chain.", de: "Der Verkauf ist on-chain offen.", es: "La venta está abierta en cadena.", fr: "La vente est ouverte on-chain.", it: "La vendita è aperta on-chain.", pt: "A venda está aberta on-chain.", ru: "Продажа открыта в сети." },
  saleClosed: { tr: "Satış kapandı", en: "Sale closed", de: "Verkauf geschlossen", es: "Venta cerrada", fr: "Vente close", it: "Vendita chiusa", pt: "Venda encerrada", ru: "Продажа закрыта" },
  belowMin: { tr: "En az 1 $ karşılığı alım yapılabilir.", en: "Minimum purchase is $1 equivalent.", de: "Mindestkauf entspricht 1 $.", es: "La compra mínima equivale a 1 $.", fr: "Achat minimum équivalent à 1 $.", it: "Acquisto minimo equivalente a 1 $.", pt: "Compra mínima equivalente a 1 $.", ru: "Минимальная покупка — эквивалент 1 $." },
  noWallet: { tr: "Tarayıcıda cüzdan bulunamadı. MetaMask yükle.", en: "No wallet found. Install MetaMask.", de: "Keine Wallet gefunden. MetaMask installieren.", es: "No hay cartera. Instala MetaMask.", fr: "Aucun portefeuille. Installez MetaMask.", it: "Nessun wallet. Installa MetaMask.", pt: "Nenhuma carteira. Instale o MetaMask.", ru: "Кошелёк не найден. Установите MetaMask." },
  usdgBal: { tr: "USDG bakiyen", en: "USDG balance", de: "USDG-Saldo", es: "Saldo USDG", fr: "Solde USDG", it: "Saldo USDG", pt: "Saldo USDG", ru: "Баланс USDG" },
  payBal: { tr: "Seçilen varlık", en: "Selected asset", de: "Gewählter Vermögenswert", es: "Activo elegido", fr: "Actif choisi", it: "Asset selezionato", pt: "Ativo selecionado", ru: "Выбранный актив" },
  yourBought: { tr: "Bu cüzdandan alınan", en: "Bought from this wallet", de: "Von dieser Wallet gekauft", es: "Comprado desde esta cartera", fr: "Acheté depuis ce portefeuille", it: "Acquistato da questo wallet", pt: "Comprado nesta carteira", ru: "Куплено с этого кошелька" },
  cap: { tr: "Cüzdan tavanı", en: "Wallet cap", de: "Wallet-Obergrenze", es: "Tope por cartera", fr: "Plafond par portefeuille", it: "Cap per wallet", pt: "Teto por carteira", ru: "Потолок кошелька" },
  txOk: { tr: "Alım kaydedildi. KAI TGE’de cüzdana gelir.", en: "Purchase recorded. KAI arrives in-wallet at TGE.", de: "Kauf erfasst. KAI kommt zum TGE in die Wallet.", es: "Compra registrada. KAI llega a la cartera en el TGE.", fr: "Achat enregistré. Le KAI arrive au TGE.", it: "Acquisto registrato. KAI arriva nel wallet al TGE.", pt: "Compra registrada. KAI chega na carteira no TGE.", ru: "Покупка записана. KAI придёт в кошелёк на TGE." },
  txFail: { tr: "İşlem başarısız veya reddedildi", en: "Transaction failed or rejected", de: "Transaktion fehlgeschlagen oder abgelehnt", es: "Transacción fallida o rechazada", fr: "Transaction échouée ou refusée", it: "Transazione fallita o rifiutata", pt: "Transação falhou ou foi rejeitada", ru: "Транзакция не удалась или отклонена" },
  needBal: { tr: "Bu varlıkta yeterli bakiye yok", en: "Not enough balance in this asset", de: "Nicht genug Saldo in diesem Asset", es: "Saldo insuficiente en este activo", fr: "Solde insuffisant sur cet actif", it: "Saldo insufficiente su questo asset", pt: "Saldo insuficiente neste ativo", ru: "Недостаточно баланса в этом активе" },
} as const;

function pick(lang: Lang, key: keyof typeof buyShared): string {
  return buyShared[key][lang];
}

function dict(lang: Lang, extra: Omit<Dict, keyof typeof buyShared extends infer K ? K : never> & Partial<Dict>): Dict {
  return {
    connect: pick(lang, "connect"),
    amount: pick(lang, "amount"),
    est: pick(lang, "est"),
    unit: pick(lang, "unit"),
    payWith: pick(lang, "payWith"),
    approve: pick(lang, "approve"),
    buy: pick(lang, "buy"),
    buying: pick(lang, "buying"),
    swapBuy: pick(lang, "swapBuy"),
    swapping: pick(lang, "swapping"),
    bridging: pick(lang, "bridging"),
    swapUniswap: pick(lang, "swapUniswap"),
    openUniswap: pick(lang, "openUniswap"),
    saleWait: pick(lang, "saleWait"),
    saleWaitHint: pick(lang, "saleWaitHint"),
    saleClosed: pick(lang, "saleClosed"),
    belowMin: pick(lang, "belowMin"),
    noWallet: pick(lang, "noWallet"),
    usdgBal: pick(lang, "usdgBal"),
    payBal: pick(lang, "payBal"),
    yourBought: pick(lang, "yourBought"),
    cap: pick(lang, "cap"),
    txOk: pick(lang, "txOk"),
    txFail: pick(lang, "txFail"),
    needBal: pick(lang, "needBal"),
    ...extra,
  } as Dict;
}

export const copy: Record<Lang, Dict> = {
  tr: dict("tr", {
    brand: "KindredHQ",
    kicker: "KAI ön satış",
    heroTitle: "Yüzler değil, ruhlar tanışsın.",
    heroTagline: "Karşındakinin fotoğrafına değil, konuşmasına aşık ol.",
    heroBody:
      "Diğer uygulamalar yüz fotoğrafını kaydırır: yüz kişi, bir bakış, bir karar. KindredHQ’da kimse birbirini görmez. Kai ile sohbet edersin; karakter, dil, mizah ve niyet görünür. Eşleşme ruhtan başlar. Ürün yayında — fotoğrafsız, her seferinde tek kişi.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI, Robinhood Chain üzerindeki kullanım tokenıdır. Gaz ETH, ödeme USDG.",
    contrastTitle: "Neden burası farklı",
    contrastThemT: "Klasik uygulamalar",
    contrastThem:
      "Profil fotoğrafı, kaydırma, 100 yüz. İnsan önce görünüme bakıyor; konuşma en sona kalıyor. Çoğu ilişki bir bakışta bitiyor.",
    contrastUsT: "KindredHQ",
    contrastUs:
      "Önce sohbet. Kai seni tanır, kime neden uyduğunu gerekçesiyle söyler. Yüz sonra gelir — istersen. Aşık olduğun şey konuşma ve karakterdir.",
    whatHq: "KindredHQ nedir?",
    whatHqBody:
      "Yapay zeka katmanlı, fotoğrafsız tanışma ürünü. Liste yok, kaydırma yok. Amaç: insanı görünüşle değil, kim olduğuyla buluşturmak.",
    whatKai: "Kai kim?",
    whatKaiBody:
      "KindredHQ’nun kendi yapay zekası. Anket değil, sohbet. Seni dinler, haritanı çıkarır, doğru kişiye gerekçeyle götürür. Plan: Kai’yi bağımsız bir zeka katmanı olarak büyütmek — eşleşmeden ilişkiye, oradan yaşama.",
    whyToken: "$KAI ne işe yarar?",
    whyTokenBody:
      "Kai’yi ve etrafındaki hizmetleri çalıştıran kullanım tokenı. Krediler, premium katman, ileride sağlık ve danışmanlık erişimi. Hisse değildir; ürünü kullanmanın yakıtıdır.",
    futureTitle: "Burası bir tanışma uygulamasıyla bitmiyor",
    futureLead:
      "Yapay zeka her şeyi dönüştürüyor. KindredHQ’nun yolu eşleşmeden sonra da devam ediyor: ilişki, zihin, beden. Kimse Kai’nin on yıl sonra nerede olacağını kesin söyleyemez — ama yön net: insanı anlayan bir zeka.",
    futHealthT: "Sağlık katmanı",
    futHealth:
      "İlerleyen aşamada profesyonel hekimler ve uzmanlar online muayene ve yönlendirme için bağlanacak. Kai, şikâyeti dinleyip seni doğru uzmana götürmeyi öğrenir. Hafif ön değerlendirme Kai’de; teşhis ve tedavi insanda.",
    futCareT: "İlişki ve zihin",
    futCare:
      "Birçok evli çift yüz yüze terapiye çekiniyor. Online, eşiyle veya yalnız, psikiyatrist ve ilişki danışmanına ulaşmak daha kolay. Kai utancı değil, ihtiyacı okur; doğru kapıyı açar.",
    futKaiT: "Kendi zekası: Kai",
    futKai:
      "Kai bir sohbet botu olarak kalmayacak. KindredHQ kendi modelini — Kai adıyla — ürünün omurgası yapmayı planlıyor. Eşleşme, ilişki, sağlık yönlendirmesi aynı zekâda birikir. İzin senin; veri vitrin değil.",
    whyJoinTitle: "Neden şimdi ön satışa katılmalısın",
    whyJoinLead:
      "Sayılar bir tablo. Asıl mesele: yayındaki bir ürünün, fotoğrafsız eşleşmenin ve büyüyen bir zekânın yakıtına erken girmek.",
    join1T: "Ürün spekülasyon değil, çalışıyor",
    join1:
      "KindredHQ yayında. Kai sohbet ediyor, eşleşme dönüyor. Token, boş bir slayta değil; kullanılan bir katmana bağlanıyor.",
    join2T: "Erken tur, net fiyat",
    join2:
      "İlk tur 0,014 $. Dört tur, her birinin tavanı kontratta. Erken katılan, sonraki turlardan önce aynı yakıta girer.",
    join3T: "Kai büyüdükçe kullanım büyür",
    join3:
      "Krediler, premium, ileride danışmanlık ve sağlık yönlendirmesi. $KAI bu kapıların anahtarı olarak tasarlandı. Getiri vaadi yok — ürün büyürse kullanım büyür.",
    utilityTitle: "Tokenın yeri",
    utilityLead: "Sabit arz. Ürünü döndürmek için var; hayali bir getiri için değil.",
    util1: "Kai Kredileri — sohbet ve eşleşme.",
    util2: "Premium Kai — daha derin uyum.",
    util3: "Ekosistem — davet, katkı, ortaklar.",
    util4: "Yarın: danışmanlık ve sağlık erişimi.",
    proofTitle: "Bugün gerçek olan",
    proof1: "Platform yayında",
    proof2: "Kai sohbeti canlı",
    proof3: "Eşleştirme çalışıyor",
    proof4: "Yüz ve ses kademeli açılır",
    roadmap: "Yol haritası",
    rmNow: "Şimdi — KAI Match",
    rmNowD: "Sohbetle tanıma. Tek eşleşme. Fotoğraf yok.",
    rmNext: "Sırada — krediler ve Kai",
    rmNextD: "Kai Kredileri, mobil, Kai’nin zekâ katmanının derinleşmesi.",
    rmThen: "Ardından — KAI Relationship",
    rmThenD: "İlişki içgörüsü, iletişim, çiftlere online destek.",
    rmLater: "Sonra — sağlık ve yaşam",
    rmLaterD: "Uzman yönlendirme, online danışmanlık, Kai Self / Life.",
    buyCta: "Ön satışa katıl",
    rounds: "Turlar",
    roundsLead: "Dört tur. Fiyat turdan tura yükselir; her dilim kendi fiyatından yazılır.",
    tokenomics: "Dağılım",
    supply: "Toplam arz",
    supplyLine: "Arz sabittir. Ön satış tavanı kontrata kilitlidir.",
    kpiSupply: "Arz",
    kpiPresale: "Ön satış",
    kpiRounds: "Tur",
    kpiPrice: "İlk fiyat",
    how: "Nasıl katılırım",
    step1: "Cüzdanını bağla",
    step1d: "MetaMask. Ağ: Robinhood Chain.",
    step2: "USDG ile al",
    step2d: "Robinhood’da USDG varsa doğrudan al. ETH varsa önce Takas ile USDG yap.",
    step3: "Miktarı yaz, imzala",
    step3d: "Onay ve alım senin cüzdanında. En az 1 $.",
    product: "KindredHQ.io",
    open: "Satış açık",
    pending: "Bekleniyor",
    everyone: "Herkes katılabilir",
    tge: "TGE’de %15 açılır, kalanı 18 ayda doğrusal gelir.",
    teamVest: "Ekip: TGE’de %0, 12 ay bekler, 60 ay doğrusal.",
    contracts: "Kontratlar",
    overview: "Neden Kindred",
    footerChain: "Robinhood Chain üzerinde.",
    allocPresale: "Ön satış",
    allocEco: "Ekosistem ve Kai",
    allocTreasury: "Hazine / ürün",
    allocLiquidity: "Likidite",
    allocMarketing: "Pazarlama",
    allocTeam: "Ekip",
    allocCommunity: "Topluluk",
    allocAdvisors: "Danışmanlar",
  }),
  en: dict("en", {
    brand: "KindredHQ",
    kicker: "KAI presale",
    heroTitle: "Let souls meet, not faces.",
    heroTagline: "Fall for the conversation, not the photograph.",
    heroBody:
      "Other apps swipe faces: a hundred photos, one glance, a verdict. On KindredHQ nobody sees anybody first. You talk with Kai. Character, humour, intent come before a picture. The product is live — photo-free, one person at a time.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI is the utility token on Robinhood Chain. Gas is ETH. Payment is USDG.",
    contrastTitle: "Why this is different",
    contrastThemT: "Typical apps",
    contrastThem:
      "Profile photos, swipe, a hundred faces. Looks come first; talk comes last. Most matches die in a glance.",
    contrastUsT: "KindredHQ",
    contrastUs:
      "Conversation first. Kai learns you and explains why a person fits. The face comes later — if you want it. You fall for speech and character.",
    whatHq: "What is KindredHQ?",
    whatHqBody:
      "An AI-layered, photo-free matching product. No grid, no swipe. The point is to meet who someone is, not how they look.",
    whatKai: "Who is Kai?",
    whatKaiBody:
      "KindredHQ’s own AI. Not a survey — a conversation. It listens, maps you, and takes you to the right person with a reason. The plan is to grow Kai into the intelligence layer of the whole product: match, relationship, life.",
    whyToken: "What is $KAI for?",
    whyTokenBody:
      "The utility token that runs Kai and the services around it. Credits, premium, later access to care and counselling. It is not equity. It is fuel for the product.",
    futureTitle: "This does not end as a dating app",
    futureLead:
      "AI is rewriting everything. KindredHQ continues after the match: relationship, mind, body. Nobody can say where Kai will be in ten years. The direction is clear — an intelligence that understands a person.",
    futHealthT: "Health layer",
    futHealth:
      "Later stages bring licensed doctors and specialists for online consults and routing. Kai learns to hear a complaint and send you to the right human. Light triage in Kai; diagnosis and treatment with people.",
    futCareT: "Relationship and mind",
    futCare:
      "Many couples never walk into a therapy office. Online, together or alone, a psychiatrist or counsellor is easier to reach. Kai reads need, not shame, and opens the right door.",
    futKaiT: "Our own intelligence: Kai",
    futKai:
      "Kai will not stay a chat widget. KindredHQ plans to ship Kai as the spine of the product. Matching, relationship, health routing accumulate in one intelligence. Permission is yours. Data is not a shop window.",
    whyJoinTitle: "Why join the presale now",
    whyJoinLead:
      "Supply figures are a table. The real reason: enter early the fuel of a live product, photo-free matching, and a growing intelligence.",
    join1T: "The product is running",
    join1:
      "KindredHQ is live. Kai talks. Matching turns. The token attaches to a used layer, not an empty slide.",
    join2T: "Early round, fixed price",
    join2:
      "Round one is $0.014. Four rounds, caps in the contract. Early buyers enter the same fuel before later rounds.",
    join3T: "As Kai grows, use grows",
    join3:
      "Credits, premium, later counselling and health routing. $KAI is designed as the key to those doors. No yield is promised — if the product grows, use grows.",
    utilityTitle: "Where the token sits",
    utilityLead: "Fixed supply. It exists to run the product, not to invent a return.",
    util1: "Kai Credits — chat and matching.",
    util2: "Premium Kai — deeper fit.",
    util3: "Ecosystem — invites, contribution, partners.",
    util4: "Tomorrow: counselling and health access.",
    proofTitle: "True today",
    proof1: "Platform live",
    proof2: "Kai chat live",
    proof3: "Matching running",
    proof4: "Face and voice unlock later",
    roadmap: "Roadmap",
    rmNow: "Now — KAI Match",
    rmNowD: "Know someone through talk. One match. No photo.",
    rmNext: "Next — credits and Kai",
    rmNextD: "Kai Credits, mobile, a deeper Kai layer.",
    rmThen: "Then — KAI Relationship",
    rmThenD: "Relationship insight, communication, online support for couples.",
    rmLater: "Later — health and life",
    rmLaterD: "Specialist routing, online counselling, Kai Self / Life.",
    buyCta: "Join the presale",
    rounds: "Rounds",
    roundsLead: "Four rounds. Price steps up. Each tranche is billed at its own round.",
    tokenomics: "Allocation",
    supply: "Total supply",
    supplyLine: "Supply is fixed. The presale cap is locked in the contract.",
    kpiSupply: "Supply",
    kpiPresale: "Presale",
    kpiRounds: "Rounds",
    kpiPrice: "Start",
    how: "How to join",
    step1: "Connect a wallet",
    step1d: "MetaMask. Network: Robinhood Chain.",
    step2: "Pay with USDG",
    step2d: "USDG on Robinhood? Buy directly. If you hold ETH, swap to USDG first.",
    step3: "Enter an amount and sign",
    step3d: "Approve and buy in your wallet. Minimum $1.",
    product: "KindredHQ.io",
    open: "Sale open",
    pending: "Pending",
    everyone: "Open to everyone",
    tge: "15% at TGE, the rest linear over 18 months.",
    teamVest: "Team: 0% at TGE, 12-month cliff, 60 months linear.",
    contracts: "Contracts",
    overview: "Why Kindred",
    footerChain: "On Robinhood Chain.",
    allocPresale: "Presale",
    allocEco: "Ecosystem & Kai",
    allocTreasury: "Treasury / product",
    allocLiquidity: "Liquidity",
    allocMarketing: "Marketing",
    allocTeam: "Team",
    allocCommunity: "Community",
    allocAdvisors: "Advisors",
  }),
  de: dict("de", {
    brand: "KindredHQ",
    kicker: "KAI-Vorverkauf",
    heroTitle: "Seelen begegnen sich, nicht Gesichter.",
    heroTagline: "Verliebe dich ins Gespräch, nicht ins Foto.",
    heroBody:
      "Andere Apps wischen Gesichter: hundert Fotos, ein Blick, ein Urteil. Bei KindredHQ sieht zuerst niemand niemanden. Du sprichst mit Kai. Charakter vor Bild. Das Produkt ist live — ohne Foto, eine Person nach der anderen.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI ist der Utility-Token auf Robinhood Chain. Gas ist ETH, Zahlung USDG.",
    contrastTitle: "Warum das anders ist",
    contrastThemT: "Übliche Apps",
    contrastThem: "Profilfotos, Swipe, hundert Gesichter. Aussehen zuerst, Gespräch zuletzt.",
    contrastUsT: "KindredHQ",
    contrastUs: "Zuerst das Gespräch. Kai erklärt, warum jemand passt. Das Gesicht kommt später — wenn du willst.",
    whatHq: "Was ist KindredHQ?",
    whatHqBody: "KI-geschichtetes Matching ohne Fotos. Kein Raster, kein Swipe. Begegnen, wer jemand ist.",
    whatKai: "Wer ist Kai?",
    whatKaiBody: "KindredHQs eigene KI. Kein Fragebogen — ein Gespräch. Plan: Kai als Intelligenzschicht für Match, Beziehung, Leben.",
    whyToken: "Wofür $KAI?",
    whyTokenBody: "Utility-Token für Kai und die Dienste drumherum. Keine Aktie. Treibstoff für das Produkt.",
    futureTitle: "Das endet nicht als Dating-App",
    futureLead: "KI verändert alles. Nach dem Match kommen Beziehung, Geist, Körper. Die Richtung: eine Intelligenz, die den Menschen versteht.",
    futHealthT: "Gesundheit",
    futHealth: "Später: Ärztinnen und Fachleute für Online-Konsultation. Kai triagiert leicht; Diagnose bleibt beim Menschen.",
    futCareT: "Beziehung und Psyche",
    futCare: "Viele Paare gehen nie in eine Praxis. Online ist der Weg kürzer. Kai liest Bedarf, nicht Scham.",
    futKaiT: "Eigene Intelligenz: Kai",
    futKai: "Kai bleibt kein Chat-Widget. KindredHQ will Kai als Rückgrat des Produkts ausliefern.",
    whyJoinTitle: "Warum jetzt am Vorverkauf teilnehmen",
    whyJoinLead: "Zahlen sind eine Tabelle. Der Grund: früh den Treibstoff eines lebenden Produkts sichern.",
    join1T: "Das Produkt läuft",
    join1: "KindredHQ ist live. Kai spricht. Matching dreht.",
    join2T: "Frühe Runde, fester Preis",
    join2: "Runde eins: 0,014 $. Vier Runden, Caps im Vertrag.",
    join3T: "Wenn Kai wächst, wächst Nutzung",
    join3: "Credits, Premium, später Beratung und Gesundheit. Keine Renditeversprechen.",
    utilityTitle: "Ort des Tokens",
    utilityLead: "Festes Angebot. Für das Produkt, nicht für eine erfundene Rendite.",
    util1: "Kai-Credits — Chat und Matching.",
    util2: "Premium-Kai.",
    util3: "Ökosystem — Einladungen, Partner.",
    util4: "Morgen: Beratung und Gesundheit.",
    proofTitle: "Heute wahr",
    proof1: "Plattform live",
    proof2: "Kai-Chat live",
    proof3: "Matching läuft",
    proof4: "Gesicht und Stimme später",
    roadmap: "Fahrplan",
    rmNow: "Jetzt — KAI Match",
    rmNowD: "Kennenlernen durchs Gespräch. Ein Match. Kein Foto.",
    rmNext: "Als Nächstes — Credits und Kai",
    rmNextD: "Kai-Credits, Mobil, tiefere Schicht.",
    rmThen: "Danach — KAI Relationship",
    rmThenD: "Beziehung, Kommunikation, Online-Unterstützung.",
    rmLater: "Später — Gesundheit und Leben",
    rmLaterD: "Fachrouting, Beratung, Kai Self / Life.",
    buyCta: "Am Vorverkauf teilnehmen",
    rounds: "Runden",
    roundsLead: "Vier Runden. Der Preis steigt. Jede Tranche zum Preis ihrer Runde.",
    tokenomics: "Verteilung",
    supply: "Gesamtangebot",
    supplyLine: "Angebot fest. Vorverkaufscap im Vertrag.",
    kpiSupply: "Angebot",
    kpiPresale: "Vorverkauf",
    kpiRounds: "Runden",
    kpiPrice: "Start",
    how: "So nimmst du teil",
    step1: "Wallet verbinden",
    step1d: "MetaMask. Netz: Robinhood Chain.",
    step2: "Mit USDG zahlen",
    step2d: "USDG auf Robinhood? Direkt kaufen. ETH zuerst tauschen.",
    step3: "Betrag und Signatur",
    step3d: "Genehmigen und kaufen. Minimum 1 $.",
    product: "KindredHQ.io",
    open: "Verkauf offen",
    pending: "Ausstehend",
    everyone: "Für alle offen",
    tge: "15 % beim TGE, Rest 18 Monate linear.",
    teamVest: "Team: 0 % TGE, 12 Monate Cliff, 60 Monate linear.",
    contracts: "Verträge",
    overview: "Warum Kindred",
    footerChain: "Auf Robinhood Chain.",
    allocPresale: "Vorverkauf",
    allocEco: "Ökosystem & Kai",
    allocTreasury: "Treasury / Produkt",
    allocLiquidity: "Liquidität",
    allocMarketing: "Marketing",
    allocTeam: "Team",
    allocCommunity: "Community",
    allocAdvisors: "Berater",
  }),
  es: dict("es", {
    brand: "KindredHQ",
    kicker: "Preventa KAI",
    heroTitle: "Que se encuentren las almas, no las caras.",
    heroTagline: "Enamórate de la conversación, no de la foto.",
    heroBody:
      "Otras apps deslizan caras: cien fotos, una mirada, un veredicto. En KindredHQ nadie se ve primero. Hablas con Kai. El carácter va antes que la imagen. El producto está en vivo: sin foto, una persona cada vez.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI es el token de utilidad en Robinhood Chain. Gas ETH, pago USDG.",
    contrastTitle: "Por qué es distinto",
    contrastThemT: "Apps típicas",
    contrastThem: "Fotos, swipe, cien caras. Primero el aspecto; la charla al final.",
    contrastUsT: "KindredHQ",
    contrastUs: "Primero la conversación. Kai explica por qué encaja alguien. La cara llega después, si quieres.",
    whatHq: "¿Qué es KindredHQ?",
    whatHqBody: "Matching con IA, sin fotos. Sin rejilla ni swipe. Conocer a quien es, no cómo se ve.",
    whatKai: "¿Quién es Kai?",
    whatKaiBody: "La IA propia de KindredHQ. No es una encuesta: es una conversación. El plan: Kai como capa de inteligencia de todo el producto.",
    whyToken: "¿Para qué $KAI?",
    whyTokenBody: "Token de utilidad que hace funcionar Kai y sus servicios. No es capital. Es el combustible del producto.",
    futureTitle: "Esto no termina como una app de citas",
    futureLead: "La IA lo está reescribiendo todo. Después del match: relación, mente, cuerpo.",
    futHealthT: "Capa de salud",
    futHealth: "Más adelante: médicos y especialistas en consulta online. Kai hace un triaje ligero; el diagnóstico es humano.",
    futCareT: "Relación y mente",
    futCare: "Muchas parejas no entran a un consultorio. Online es más fácil. Kai lee la necesidad, no la vergüenza.",
    futKaiT: "Nuestra inteligencia: Kai",
    futKai: "Kai no se queda en un chat. KindredHQ planea lanzar Kai como columna del producto.",
    whyJoinTitle: "Por qué unirte ahora a la preventa",
    whyJoinLead: "Los números son una tabla. El motivo: entrar pronto al combustible de un producto vivo.",
    join1T: "El producto funciona",
    join1: "KindredHQ está en vivo. Kai habla. El matching gira.",
    join2T: "Ronda temprana, precio fijo",
    join2: "Ronda uno: 0,014 $. Cuatro rondas, topes en el contrato.",
    join3T: "Si Kai crece, crece el uso",
    join3: "Créditos, premium, más adelante consejo y salud. No hay promesa de rendimiento.",
    utilityTitle: "Dónde está el token",
    utilityLead: "Oferta fija. Existe para operar el producto, no para inventar un retorno.",
    util1: "Créditos Kai — chat y matching.",
    util2: "Kai premium.",
    util3: "Ecosistema — invitaciones, socios.",
    util4: "Mañana: consejo y salud.",
    proofTitle: "Cierto hoy",
    proof1: "Plataforma en vivo",
    proof2: "Chat Kai en vivo",
    proof3: "Matching activo",
    proof4: "Cara y voz más tarde",
    roadmap: "Hoja de ruta",
    rmNow: "Ahora — KAI Match",
    rmNowD: "Conocer hablando. Un match. Sin foto.",
    rmNext: "Siguiente — créditos y Kai",
    rmNextD: "Créditos Kai, móvil, capa más profunda.",
    rmThen: "Después — KAI Relationship",
    rmThenD: "Relación, comunicación, apoyo online.",
    rmLater: "Luego — salud y vida",
    rmLaterD: "Derivación, consejo, Kai Self / Life.",
    buyCta: "Unirse a la preventa",
    rounds: "Rondas",
    roundsLead: "Cuatro rondas. El precio sube. Cada tramo al precio de su ronda.",
    tokenomics: "Distribución",
    supply: "Oferta total",
    supplyLine: "Oferta fija. Tope de preventa en el contrato.",
    kpiSupply: "Oferta",
    kpiPresale: "Preventa",
    kpiRounds: "Rondas",
    kpiPrice: "Inicio",
    how: "Cómo unirte",
    step1: "Conecta una cartera",
    step1d: "MetaMask. Red: Robinhood Chain.",
    step2: "Paga con USDG",
    step2d: "¿USDG en Robinhood? Compra directo. Si tienes ETH, cambia primero.",
    step3: "Cantidad y firma",
    step3d: "Aprobar y comprar. Mínimo 1 $.",
    product: "KindredHQ.io",
    open: "Venta abierta",
    pending: "Pendiente",
    everyone: "Abierto a todos",
    tge: "15 % en el TGE; el resto lineal en 18 meses.",
    teamVest: "Equipo: 0 % TGE, 12 meses de cliff, 60 lineal.",
    contracts: "Contratos",
    overview: "Por qué Kindred",
    footerChain: "En Robinhood Chain.",
    allocPresale: "Preventa",
    allocEco: "Ecosistema y Kai",
    allocTreasury: "Tesorería / producto",
    allocLiquidity: "Liquidez",
    allocMarketing: "Marketing",
    allocTeam: "Equipo",
    allocCommunity: "Comunidad",
    allocAdvisors: "Asesores",
  }),
  fr: dict("fr", {
    brand: "KindredHQ",
    kicker: "Prévente KAI",
    heroTitle: "Que les âmes se rencontrent, pas les visages.",
    heroTagline: "Tombez pour la conversation, pas pour la photo.",
    heroBody:
      "Les autres apps glissent des visages : cent photos, un regard, un verdict. Sur KindredHQ personne ne se voit d’abord. Vous parlez avec Kai. Le caractère avant l’image. Le produit est en ligne — sans photo, une personne à la fois.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI est le jeton d’utilité sur Robinhood Chain. Gaz ETH, paiement USDG.",
    contrastTitle: "Pourquoi c’est différent",
    contrastThemT: "Apps habituelles",
    contrastThem: "Photos, swipe, cent visages. L’apparence d’abord, la parole ensuite.",
    contrastUsT: "KindredHQ",
    contrastUs: "D’abord la conversation. Kai explique pourquoi quelqu’un correspond. Le visage vient plus tard, si vous le voulez.",
    whatHq: "Qu’est-ce que KindredHQ ?",
    whatHqBody: "Matching IA, sans photos. Pas de grille, pas de swipe. Rencontrer qui quelqu’un est.",
    whatKai: "Qui est Kai ?",
    whatKaiBody: "L’IA de KindredHQ. Pas un questionnaire — une conversation. Le plan : Kai comme couche d’intelligence de tout le produit.",
    whyToken: "À quoi sert $KAI ?",
    whyTokenBody: "Jeton d’utilité qui fait tourner Kai et ses services. Pas une action. Le carburant du produit.",
    futureTitle: "Cela ne s’arrête pas à une app de rencontre",
    futureLead: "L’IA réécrit tout. Après le match : relation, esprit, corps.",
    futHealthT: "Couche santé",
    futHealth: "Plus tard : médecins et spécialistes en consultation en ligne. Kai trie légèrement ; le diagnostic reste humain.",
    futCareT: "Relation et psyché",
    futCare: "Beaucoup de couples n’entrent jamais dans un cabinet. En ligne, c’est plus simple. Kai lit le besoin, pas la honte.",
    futKaiT: "Notre intelligence : Kai",
    futKai: "Kai ne restera pas un widget. KindredHQ prévoit de livrer Kai comme colonne du produit.",
    whyJoinTitle: "Pourquoi rejoindre la prévente maintenant",
    whyJoinLead: "Les chiffres sont un tableau. La raison : entrer tôt dans le carburant d’un produit vivant.",
    join1T: "Le produit tourne",
    join1: "KindredHQ est en ligne. Kai parle. Le matching tourne.",
    join2T: "Tour tôt, prix fixe",
    join2: "Tour un : 0,014 $. Quatre tours, plafonds dans le contrat.",
    join3T: "Si Kai grandit, l’usage grandit",
    join3: "Crédits, premium, plus tard conseil et santé. Aucune promesse de rendement.",
    utilityTitle: "Place du jeton",
    utilityLead: "Offre fixe. Pour faire tourner le produit, pas pour inventer un rendement.",
    util1: "Crédits Kai — chat et matching.",
    util2: "Kai premium.",
    util3: "Écosystème — invitations, partenaires.",
    util4: "Demain : conseil et santé.",
    proofTitle: "Vrai aujourd’hui",
    proof1: "Plateforme en ligne",
    proof2: "Chat Kai en ligne",
    proof3: "Matching actif",
    proof4: "Visage et voix plus tard",
    roadmap: "Feuille de route",
    rmNow: "Maintenant — KAI Match",
    rmNowD: "Connaître par la parole. Un match. Pas de photo.",
    rmNext: "Ensuite — crédits et Kai",
    rmNextD: "Crédits Kai, mobile, couche plus profonde.",
    rmThen: "Puis — KAI Relationship",
    rmThenD: "Relation, communication, soutien en ligne.",
    rmLater: "Plus tard — santé et vie",
    rmLaterD: "Orientation, conseil, Kai Self / Life.",
    buyCta: "Rejoindre la prévente",
    rounds: "Tours",
    roundsLead: "Quatre tours. Le prix monte. Chaque tranche au prix de son tour.",
    tokenomics: "Répartition",
    supply: "Offre totale",
    supplyLine: "Offre fixe. Plafond de prévente dans le contrat.",
    kpiSupply: "Offre",
    kpiPresale: "Prévente",
    kpiRounds: "Tours",
    kpiPrice: "Début",
    how: "Comment rejoindre",
    step1: "Connectez un portefeuille",
    step1d: "MetaMask. Réseau : Robinhood Chain.",
    step2: "Payez en USDG",
    step2d: "USDG sur Robinhood ? Achetez direct. ETH : convertissez d’abord.",
    step3: "Montant et signature",
    step3d: "Approuver et acheter. Minimum 1 $.",
    product: "KindredHQ.io",
    open: "Vente ouverte",
    pending: "En attente",
    everyone: "Ouvert à tous",
    tge: "15 % au TGE, le reste linéaire sur 18 mois.",
    teamVest: "Équipe : 0 % TGE, cliff 12 mois, linéaire 60 mois.",
    contracts: "Contrats",
    overview: "Pourquoi Kindred",
    footerChain: "Sur Robinhood Chain.",
    allocPresale: "Prévente",
    allocEco: "Écosystème et Kai",
    allocTreasury: "Trésorerie / produit",
    allocLiquidity: "Liquidité",
    allocMarketing: "Marketing",
    allocTeam: "Équipe",
    allocCommunity: "Communauté",
    allocAdvisors: "Conseillers",
  }),
  it: dict("it", {
    brand: "KindredHQ",
    kicker: "Prevendita KAI",
    heroTitle: "Si incontrino le anime, non i volti.",
    heroTagline: "Innamorati della conversazione, non della foto.",
    heroBody:
      "Le altre app slittano volti: cento foto, uno sguardo, un verdetto. Su KindredHQ nessuno si vede prima. Parli con Kai. Il carattere prima dell’immagine. Il prodotto è live — senza foto, una persona alla volta.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI è il token di utilità su Robinhood Chain. Gas ETH, pagamento USDG.",
    contrastTitle: "Perché è diverso",
    contrastThemT: "App tipiche",
    contrastThem: "Foto, swipe, cento volti. Prima l’aspetto, poi la chiacchiera.",
    contrastUsT: "KindredHQ",
    contrastUs: "Prima la conversazione. Kai spiega perché una persona sta bene. Il viso arriva dopo, se vuoi.",
    whatHq: "Cos’è KindredHQ?",
    whatHqBody: "Matching con IA, senza foto. Niente griglia, niente swipe. Incontrare chi qualcuno è.",
    whatKai: "Chi è Kai?",
    whatKaiBody: "L’IA di KindredHQ. Non un questionario: una conversazione. Il piano: Kai come strato di intelligenza di tutto il prodotto.",
    whyToken: "A cosa serve $KAI?",
    whyTokenBody: "Token di utilità che fa funzionare Kai e i servizi intorno. Non è equity. È il carburante del prodotto.",
    futureTitle: "Non finisce come un’app di dating",
    futureLead: "L’IA sta riscrivendo tutto. Dopo il match: relazione, mente, corpo.",
    futHealthT: "Strato salute",
    futHealth: "Più avanti: medici e specialisti in consulto online. Kai fa un triage leggero; la diagnosi resta umana.",
    futCareT: "Relazione e psiche",
    futCare: "Molte coppie non entrano in uno studio. Online è più semplice. Kai legge il bisogno, non la vergogna.",
    futKaiT: "La nostra intelligenza: Kai",
    futKai: "Kai non resta un widget. KindredHQ prevede di lanciare Kai come colonna del prodotto.",
    whyJoinTitle: "Perché entrare ora in prevendita",
    whyJoinLead: "I numeri sono una tabella. Il motivo: entrare presto nel carburante di un prodotto vivo.",
    join1T: "Il prodotto gira",
    join1: "KindredHQ è live. Kai parla. Il matching gira.",
    join2T: "Round precoce, prezzo fisso",
    join2: "Round uno: 0,014 $. Quattro round, cap nel contratto.",
    join3T: "Se Kai cresce, cresce l’uso",
    join3: "Crediti, premium, poi counseling e salute. Nessuna promessa di rendimento.",
    utilityTitle: "Dove sta il token",
    utilityLead: "Offerta fissa. Per far girare il prodotto, non per inventare un ritorno.",
    util1: "Crediti Kai — chat e matching.",
    util2: "Kai premium.",
    util3: "Ecosistema — inviti, partner.",
    util4: "Domani: counseling e salute.",
    proofTitle: "Vero oggi",
    proof1: "Piattaforma live",
    proof2: "Chat Kai live",
    proof3: "Matching attivo",
    proof4: "Volto e voce dopo",
    roadmap: "Roadmap",
    rmNow: "Ora — KAI Match",
    rmNowD: "Conoscere parlando. Un match. Niente foto.",
    rmNext: "Dopo — crediti e Kai",
    rmNextD: "Crediti Kai, mobile, strato più profondo.",
    rmThen: "Poi — KAI Relationship",
    rmThenD: "Relazione, comunicazione, supporto online.",
    rmLater: "Più tardi — salute e vita",
    rmLaterD: "Instradamento, counseling, Kai Self / Life.",
    buyCta: "Entra in prevendita",
    rounds: "Round",
    roundsLead: "Quattro round. Il prezzo sale. Ogni trance al prezzo del suo round.",
    tokenomics: "Allocazione",
    supply: "Offerta totale",
    supplyLine: "Offerta fissa. Cap prevendita nel contratto.",
    kpiSupply: "Offerta",
    kpiPresale: "Prevendita",
    kpiRounds: "Round",
    kpiPrice: "Inizio",
    how: "Come entrare",
    step1: "Collega un wallet",
    step1d: "MetaMask. Rete: Robinhood Chain.",
    step2: "Paga con USDG",
    step2d: "USDG su Robinhood? Compra diretto. ETH: scambia prima.",
    step3: "Importo e firma",
    step3d: "Approva e compra. Minimo 1 $.",
    product: "KindredHQ.io",
    open: "Vendita aperta",
    pending: "In attesa",
    everyone: "Aperto a tutti",
    tge: "15 % al TGE, il resto lineare in 18 mesi.",
    teamVest: "Team: 0 % TGE, cliff 12 mesi, lineare 60 mesi.",
    contracts: "Contratti",
    overview: "Perché Kindred",
    footerChain: "Su Robinhood Chain.",
    allocPresale: "Prevendita",
    allocEco: "Ecosistema e Kai",
    allocTreasury: "Tesoreria / prodotto",
    allocLiquidity: "Liquidità",
    allocMarketing: "Marketing",
    allocTeam: "Team",
    allocCommunity: "Community",
    allocAdvisors: "Advisor",
  }),
  pt: dict("pt", {
    brand: "KindredHQ",
    kicker: "Pré-venda KAI",
    heroTitle: "Que as almas se encontrem, não os rostos.",
    heroTagline: "Apaixone-se pela conversa, não pela foto.",
    heroBody:
      "Outros apps deslizam rostos: cem fotos, um olhar, um veredito. Na KindredHQ ninguém se vê primeiro. Você fala com o Kai. Caráter antes da imagem. O produto está no ar — sem foto, uma pessoa de cada vez.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI é o token de utilidade na Robinhood Chain. Gás ETH, pagamento USDG.",
    contrastTitle: "Por que é diferente",
    contrastThemT: "Apps típicos",
    contrastThem: "Fotos, swipe, cem rostos. Primeiro a aparência; a conversa por último.",
    contrastUsT: "KindredHQ",
    contrastUs: "Primeiro a conversa. Kai explica por que alguém combina. O rosto vem depois, se você quiser.",
    whatHq: "O que é a KindredHQ?",
    whatHqBody: "Matching com IA, sem fotos. Sem grade, sem swipe. Encontrar quem alguém é.",
    whatKai: "Quem é o Kai?",
    whatKaiBody: "A IA da KindredHQ. Não é um questionário: é uma conversa. O plano: Kai como camada de inteligência de todo o produto.",
    whyToken: "Para que serve o $KAI?",
    whyTokenBody: "Token de utilidade que faz o Kai e os serviços ao redor funcionarem. Não é equity. É o combustível do produto.",
    futureTitle: "Isso não termina como um app de namoro",
    futureLead: "A IA está reescrevendo tudo. Depois do match: relação, mente, corpo.",
    futHealthT: "Camada de saúde",
    futHealth: "Mais adiante: médicos e especialistas em consulta online. Kai faz triagem leve; o diagnóstico fica com pessoas.",
    futCareT: "Relação e mente",
    futCare: "Muitos casais não entram num consultório. Online é mais fácil. Kai lê a necessidade, não a vergonha.",
    futKaiT: "Nossa inteligência: Kai",
    futKai: "Kai não fica um widget. A KindredHQ planeja lançar o Kai como espinha do produto.",
    whyJoinTitle: "Por que entrar na pré-venda agora",
    whyJoinLead: "Números são uma tabela. O motivo: entrar cedo no combustível de um produto vivo.",
    join1T: "O produto está no ar",
    join1: "KindredHQ está no ar. Kai fala. O matching gira.",
    join2T: "Rodada cedo, preço fixo",
    join2: "Rodada um: 0,014 $. Quatro rodadas, tetos no contrato.",
    join3T: "Se o Kai cresce, o uso cresce",
    join3: "Créditos, premium, depois aconselhamento e saúde. Sem promessa de rendimento.",
    utilityTitle: "Onde o token fica",
    utilityLead: "Oferta fixa. Existe para operar o produto, não para inventar retorno.",
    util1: "Créditos Kai — chat e matching.",
    util2: "Kai premium.",
    util3: "Ecossistema — convites, parceiros.",
    util4: "Amanhã: aconselhamento e saúde.",
    proofTitle: "Verdade hoje",
    proof1: "Plataforma no ar",
    proof2: "Chat Kai no ar",
    proof3: "Matching ativo",
    proof4: "Rosto e voz depois",
    roadmap: "Roteiro",
    rmNow: "Agora — KAI Match",
    rmNowD: "Conhecer pela fala. Um match. Sem foto.",
    rmNext: "Em seguida — créditos e Kai",
    rmNextD: "Créditos Kai, mobile, camada mais profunda.",
    rmThen: "Depois — KAI Relationship",
    rmThenD: "Relação, comunicação, apoio online.",
    rmLater: "Mais tarde — saúde e vida",
    rmLaterD: "Encaminhamento, aconselhamento, Kai Self / Life.",
    buyCta: "Entrar na pré-venda",
    rounds: "Rodadas",
    roundsLead: "Quatro rodadas. O preço sobe. Cada tranche no preço da sua rodada.",
    tokenomics: "Distribuição",
    supply: "Oferta total",
    supplyLine: "Oferta fixa. Teto da pré-venda no contrato.",
    kpiSupply: "Oferta",
    kpiPresale: "Pré-venda",
    kpiRounds: "Rodadas",
    kpiPrice: "Início",
    how: "Como entrar",
    step1: "Conecte uma carteira",
    step1d: "MetaMask. Rede: Robinhood Chain.",
    step2: "Pague com USDG",
    step2d: "USDG na Robinhood? Compre direto. ETH: troque primeiro.",
    step3: "Valor e assinatura",
    step3d: "Aprovar e comprar. Mínimo 1 $.",
    product: "KindredHQ.io",
    open: "Venda aberta",
    pending: "Pendente",
    everyone: "Aberto a todos",
    tge: "15 % no TGE; o restante linear em 18 meses.",
    teamVest: "Equipe: 0 % TGE, cliff 12 meses, linear 60 meses.",
    contracts: "Contratos",
    overview: "Por que Kindred",
    footerChain: "Na Robinhood Chain.",
    allocPresale: "Pré-venda",
    allocEco: "Ecossistema e Kai",
    allocTreasury: "Tesouraria / produto",
    allocLiquidity: "Liquidez",
    allocMarketing: "Marketing",
    allocTeam: "Equipe",
    allocCommunity: "Comunidade",
    allocAdvisors: "Conselheiros",
  }),
  ru: dict("ru", {
    brand: "KindredHQ",
    kicker: "Пресейл KAI",
    heroTitle: "Пусть встречаются души, а не лица.",
    heroTagline: "Влюбляйтесь в разговор, а не в фотографию.",
    heroBody:
      "Другие приложения листают лица: сто фото, один взгляд, приговор. В KindredHQ сначала никто никого не видит. Вы говорите с Kai. Характер раньше картинки. Продукт в эфире — без фото, один человек за раз.",
    chainBadge: "Robinhood Chain · 4663",
    chainHint: "KAI — утилити-токен в сети Robinhood Chain. Газ ETH, оплата USDG.",
    contrastTitle: "Почему здесь иначе",
    contrastThemT: "Обычные приложения",
    contrastThem: "Фото, свайп, сто лиц. Сначала внешность, разговор в конце.",
    contrastUsT: "KindredHQ",
    contrastUs: "Сначала разговор. Kai объясняет, почему человек подходит. Лицо — потом, если захотите.",
    whatHq: "Что такое KindredHQ?",
    whatHqBody: "Матчинг с ИИ, без фото. Без сетки и свайпа. Встретить, кто человек, а не как выглядит.",
    whatKai: "Кто такой Kai?",
    whatKaiBody: "Собственный ИИ KindredHQ. Не анкета — разговор. План: Kai как слой интеллекта всего продукта.",
    whyToken: "Зачем $KAI?",
    whyTokenBody: "Утилити-токен, на котором работают Kai и сервисы вокруг. Это не доля. Это топливо продукта.",
    futureTitle: "Это не заканчивается дейтинг-приложением",
    futureLead: "ИИ переписывает всё. После матча: отношения, разум, тело.",
    futHealthT: "Слой здоровья",
    futHealth: "Позже: врачи и специалисты на онлайн-консультации. Kai делает лёгкую сортировку; диагноз остаётся за человеком.",
    futCareT: "Отношения и психика",
    futCare: "Многие пары не заходят в кабинет. Онлайн проще. Kai читает потребность, не стыд.",
    futKaiT: "Наш интеллект: Kai",
    futKai: "Kai не останется виджетом. KindredHQ планирует выпустить Kai как стержень продукта.",
    whyJoinTitle: "Почему войти в пресейл сейчас",
    whyJoinLead: "Цифры — таблица. Причина: рано войти в топливо живого продукта.",
    join1T: "Продукт работает",
    join1: "KindredHQ в эфире. Kai говорит. Матчинг крутится.",
    join2T: "Ранний раунд, фиксированная цена",
    join2: "Раунд один: 0,014 $. Четыре раунда, потолки в контракте.",
    join3T: "Если Kai растёт, растёт использование",
    join3: "Кредиты, премиум, позже консультации и здоровье. Обещания доходности нет.",
    utilityTitle: "Где стоит токен",
    utilityLead: "Эмиссия фиксирована. Чтобы продукт работал, не чтобы выдумать доход.",
    util1: "Кредиты Kai — чат и матчинг.",
    util2: "Premium Kai.",
    util3: "Экосистема — приглашения, партнёры.",
    util4: "Завтра: консультации и здоровье.",
    proofTitle: "Верно сегодня",
    proof1: "Платформа в эфире",
    proof2: "Чат Kai в эфире",
    proof3: "Матчинг работает",
    proof4: "Лицо и голос позже",
    roadmap: "Дорожная карта",
    rmNow: "Сейчас — KAI Match",
    rmNowD: "Узнать через разговор. Один матч. Без фото.",
    rmNext: "Дальше — кредиты и Kai",
    rmNextD: "Кредиты Kai, мобильное, более глубокий слой.",
    rmThen: "Затем — KAI Relationship",
    rmThenD: "Отношения, общение, онлайн-поддержка.",
    rmLater: "Позже — здоровье и жизнь",
    rmLaterD: "Маршрутизация, консультации, Kai Self / Life.",
    buyCta: "Войти в пресейл",
    rounds: "Раунды",
    roundsLead: "Четыре раунда. Цена растёт. Каждый транш по цене своего раунда.",
    tokenomics: "Распределение",
    supply: "Общая эмиссия",
    supplyLine: "Эмиссия фиксирована. Потолок пресейла в контракте.",
    kpiSupply: "Эмиссия",
    kpiPresale: "Пресейл",
    kpiRounds: "Раунды",
    kpiPrice: "Старт",
    how: "Как войти",
    step1: "Подключите кошелёк",
    step1d: "MetaMask. Сеть: Robinhood Chain.",
    step2: "Платите USDG",
    step2d: "USDG в Robinhood? Покупайте сразу. ETH: сначала обмен.",
    step3: "Сумма и подпись",
    step3d: "Approve и покупка. Минимум 1 $.",
    product: "KindredHQ.io",
    open: "Продажа открыта",
    pending: "Ожидание",
    everyone: "Открыто для всех",
    tge: "15 % на TGE, остальное линейно за 18 месяцев.",
    teamVest: "Команда: 0 % TGE, клифф 12 месяцев, линейно 60 месяцев.",
    contracts: "Контракты",
    overview: "Почему Kindred",
    footerChain: "В сети Robinhood Chain.",
    allocPresale: "Пресейл",
    allocEco: "Экосистема и Kai",
    allocTreasury: "Казначейство / продукт",
    allocLiquidity: "Ликвидность",
    allocMarketing: "Маркетинг",
    allocTeam: "Команда",
    allocCommunity: "Сообщество",
    allocAdvisors: "Советники",
  }),
};

export const ALLOC_KEYS = [
  "allocPresale",
  "allocEco",
  "allocTreasury",
  "allocLiquidity",
  "allocMarketing",
  "allocTeam",
  "allocCommunity",
  "allocAdvisors",
] as const;

export const FUTURE_NAV: Record<Lang, string> = {
  tr: "Gelecek",
  en: "Future",
  de: "Zukunft",
  es: "Futuro",
  fr: "Avenir",
  it: "Futuro",
  pt: "Futuro",
  ru: "Будущее",
};

export const QR_CONNECT: Record<Lang, string> = {
  tr: "QR ile bağla",
  en: "Connect with QR",
  de: "Per QR verbinden",
  es: "Conectar con QR",
  fr: "Connecter par QR",
  it: "Collega con QR",
  pt: "Conectar com QR",
  ru: "Подключить по QR",
};


export const MOBILE_WALLET: Record<Lang, { hint: string; open: string }> = {
  tr: {
    hint: "Safari’de uzantı yok. QR ile bağla — MetaMask, Trust Wallet, Rainbow karekodu okur. Ya da uygulamadaki tarayıcıdan siteyi aç.",
    open: "MetaMask uygulamasında aç",
  },
  en: {
    hint: "Mobile Safari/Chrome has no wallet. Open the MetaMask app, use its built-in browser, paste this site.",
    open: "Open in MetaMask app",
  },
  de: {
    hint: "Im Handy-Browser gibt es keine Wallet. MetaMask-App öffnen, internen Browser nutzen.",
    open: "In der MetaMask-App öffnen",
  },
  es: {
    hint: "El navegador del móvil no tiene cartera. Abre la app MetaMask y usa su navegador interno.",
    open: "Abrir en la app MetaMask",
  },
  fr: {
    hint: "Le navigateur mobile n’a pas de portefeuille. Ouvrez l’app MetaMask et son navigateur intégré.",
    open: "Ouvrir dans l’app MetaMask",
  },
  it: {
    hint: "Il browser del telefono non ha wallet. Apri l’app MetaMask e usa il browser interno.",
    open: "Apri nell’app MetaMask",
  },
  pt: {
    hint: "O navegador do celular não tem carteira. Abra o app MetaMask e use o navegador interno.",
    open: "Abrir no app MetaMask",
  },
  ru: {
    hint: "В мобильном браузере нет кошелька. Откройте приложение MetaMask и его встроенный браузер.",
    open: "Открыть в приложении MetaMask",
  },
};


