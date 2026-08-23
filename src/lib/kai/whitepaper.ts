import type { Lang } from "./copy";

export type Wp = {
  title: string;
  kicker: string;
  intro: string;
  utilT: string;
  util: string;
  notT: string;
  not: string;
  useT: string;
  use: string[];
  productT: string;
  product: string;
  chainT: string;
  chain: string;
  tokT: string;
  tok: string;
  futureT: string;
  future: string;
  close: string;
};

const tr: Wp = {
  title: "KAI Whitepaper",
  kicker: "KindredHQ · Utility token",
  intro:
    "Bu metin bir ürün kâğıdıdır. $KAI’nin KindredHQ içinde ne işe yaradığını, neden var olduğunu ve zincirde nasıl durduğunu anlatır. Getiri, listing veya fiyat vaadi yoktur.",
  utilT: "Neden utility token",
  util:
    "$KAI bir kullanım tokenıdır. KindredHQ’nun çalışan ürününde — Kai sohbeti, eşleşme, ileride premium ve hizmet erişimi — harcanmak üzere tasarlandı. Token, ürünün yakıtıdır. Şirket hissesi, borç senedi veya kâr payı hakkı vermez.",
  notT: "Ne değildir",
  not:
    "Yatırım sözleşmesi değildir. Temettü yoktur. Yönetim hakkı yoktur. Fiyatın yükseleceğine dair taahhüt yoktur. Satın alma, Kai ve KindredHQ katmanını kullanma niyetiyle yapılır.",
  useT: "Bugün ve yarın ne işe yarar",
  use: [
    "Kai Kredileri — sohbet ve eşleşme.",
    "Premium Kai — daha derin uyum katmanı.",
    "Ekosistem — davet, katkı, ortak erişimi.",
    "Yol haritası: ilişki danışmanlığı ve sağlık yönlendirmesi erişimi. Teşhis insanda kalır.",
  ],
  productT: "Ürün",
  product:
    "KindredHQ fotoğrafsız tanışma ürünüdür ve yayındadır. Diğer uygulamalar yüz kaydırır. Burada Kai ile sohbet edilir; karakter konuşmadan önce görünür. Plan: Kai’yi eşleşmeden ilişkiye ve yaşama uzanan bir zekâ katmanı yapmak.",
  chainT: "Zincir",
  chain:
    "KAI bir Robinhood Chain (4663) ERC-20’sidir. Ön satış mutabakatı USDG, gaz ETH. Kontrat tavanı ve tur fiyatları zincirde kilitlidir. Allowlist yoktur; cüzdanı olan herkes katılabilir.",
  tokT: "Arz ve dağılım",
  tok:
    "Toplam arz sabittir: 1.618.033.988 KAI. Satılabilir ön satış 242.705.096. Dört tur. TGE’de %15 açılır, kalanı 18 ayda doğrusal gelir. Ekip: TGE’de %0, 12 ay bekler, 60 ay doğrusal. Hazine ve ekosistem dilimleri ürünü döndürmek içindir.",
  futureT: "Yön",
  future:
    "Yapay zeka her katmanı dönüştürüyor. KindredHQ eşleşmeyle bitmez: ilişki, zihin, beden. Kai adlı kendi zekânın ürün omurgası olması planlanır. İzin kullanıcıdadır; veri vitrin değildir.",
  close:
    "Bu kâğıt hukuki bir izahname değildir. Katılmadan önce kontratı ve ürünü kendin oku. $KAI spekülasyon aracı olarak konumlandırılmaz.",
};

const en: Wp = {
  title: "KAI Whitepaper",
  kicker: "KindredHQ · Utility token",
  intro:
    "This is a product paper. It explains what $KAI does inside KindredHQ, why it exists, and how it sits on-chain. There is no promise of yield, listing, or price.",
  utilT: "Why a utility token",
  util:
    "$KAI is a utility token. It is designed to be spent in a live product — Kai chat, matching, later premium and service access. The token is fuel. It is not company equity, not a debt instrument, and it pays no dividend.",
  notT: "What it is not",
  not:
    "It is not an investment contract. No dividend. No governance right. No promise that the price will rise. A purchase is made to use the Kai / KindredHQ layer.",
  useT: "What it is for",
  use: [
    "Kai Credits — chat and matching.",
    "Premium Kai — a deeper fit layer.",
    "Ecosystem — invites, contribution, partner access.",
    "Roadmap: counselling and health routing. Diagnosis stays with humans.",
  ],
  productT: "Product",
  product:
    "KindredHQ is a live, photo-free matching product. Other apps swipe faces. Here you talk with Kai; character shows before a picture. The plan is to grow Kai into the intelligence layer from match to relationship to life.",
  chainT: "Chain",
  chain:
    "KAI is an ERC-20 on Robinhood Chain (4663). Presale settles in USDG. Gas is ETH. Caps and round prices are locked in the contract. No allowlist. Anyone with a wallet can join.",
  tokT: "Supply and allocation",
  tok:
    "Fixed supply: 1,618,033,988 KAI. Sellable presale 242,705,096. Four rounds. 15% at TGE, the rest linear over 18 months. Team: 0% at TGE, 12-month cliff, 60 months linear. Treasury and ecosystem slices run the product.",
  futureT: "Direction",
  future:
    "AI is rewriting every layer. KindredHQ does not end at the match: relationship, mind, body. The plan is Kai as the spine of the product. Permission is the user’s. Data is not a shop window.",
  close:
    "This paper is not a legal prospectus. Read the contract and the product before you join. $KAI is not positioned as a speculation vehicle.",
};

function fromEn(partial: Partial<Wp> & Pick<Wp, "title" | "utilT" | "notT">): Wp {
  return { ...en, ...partial };
}

export const whitepaper: Record<Lang, Wp> = {
  tr,
  en,
  de: fromEn({
    title: "KAI Whitepaper",
    kicker: "KindredHQ · Utility-Token",
    intro:
      "Dies ist ein Produktpapier. Es erklärt, wozu $KAI in KindredHQ dient. Keine Rendite-, Listing- oder Preisversprechen.",
    utilT: "Warum ein Utility-Token",
    util:
      "$KAI ist ein Utility-Token. Er soll in einem lebenden Produkt ausgegeben werden — Kai-Chat, Matching, später Premium. Keine Aktie, keine Schuld, keine Dividende.",
    notT: "Was er nicht ist",
    not:
      "Kein Investitionsvertrag. Keine Dividende, kein Stimmrecht, kein Preisversprechen. Der Kauf dient der Nutzung der Kai-Schicht.",
    useT: "Wofür",
    use: [
      "Kai-Credits — Chat und Matching.",
      "Premium-Kai.",
      "Ökosystem — Einladungen, Beitrag, Partner.",
      "Fahrplan: Beratung und Gesundheitsrouting. Diagnose bleibt beim Menschen.",
    ],
    productT: "Produkt",
    product:
      "KindredHQ ist live, matching ohne Fotos. Andere Apps wischen Gesichter. Hier spricht man mit Kai.",
    chainT: "Chain",
    chain:
      "KAI ist ein ERC-20 auf Robinhood Chain (4663). Vorverkauf in USDG, Gas ETH. Caps im Vertrag. Kein Allowlist.",
    tokT: "Angebot",
    tok:
      "Festes Angebot: 1.618.033.988 KAI. Vorverkauf 242.705.096. Vier Runden. 15 % TGE, Rest 18 Monate linear. Team: 0 % TGE, 12 Monate Cliff, 60 Monate linear.",
    futureT: "Richtung",
    future:
      "KI schreibt jede Schicht um. KindredHQ endet nicht beim Match. Kai soll das Rückgrat werden.",
    close: "Kein Prospekt. Vertrag und Produkt selbst lesen. $KAI ist kein Spekulationsvehikel.",
  }),
  es: fromEn({
    title: "KAI Whitepaper",
    kicker: "KindredHQ · Token de utilidad",
    intro:
      "Este es un documento de producto. Explica para qué sirve $KAI. No hay promesa de rendimiento, listado ni precio.",
    utilT: "Por qué un token de utilidad",
    util:
      "$KAI es un token de utilidad. Se gasta en un producto en vivo: chat Kai, matching, más adelante premium. No es capital ni deuda. No paga dividendo.",
    notT: "Qué no es",
    not:
      "No es un contrato de inversión. Sin dividendo, sin gobierno, sin promesa de precio. Se compra para usar la capa Kai.",
    useT: "Para qué",
    use: [
      "Créditos Kai — chat y matching.",
      "Kai premium.",
      "Ecosistema — invitaciones, contribución, socios.",
      "Hoja de ruta: consejo y salud. El diagnóstico sigue siendo humano.",
    ],
    productT: "Producto",
    product:
      "KindredHQ está en vivo, matching sin fotos. Otras apps deslizan caras. Aquí se habla con Kai.",
    chainT: "Cadena",
    chain:
      "KAI es un ERC-20 en Robinhood Chain (4663). Preventa en USDG, gas ETH. Topes en el contrato. Sin lista blanca.",
    tokT: "Oferta",
    tok:
      "Oferta fija: 1.618.033.988 KAI. Preventa 242.705.096. Cuatro rondas. 15 % TGE, resto lineal 18 meses. Equipo: 0 % TGE, cliff 12 meses, lineal 60.",
    futureT: "Dirección",
    future:
      "La IA reescribe cada capa. KindredHQ no termina en el match. Kai debe ser la columna del producto.",
    close: "No es un folleto legal. Lee el contrato y el producto. $KAI no es un vehículo especulativo.",
  }),
  fr: fromEn({
    title: "KAI Whitepaper",
    kicker: "KindredHQ · Jeton d’utilité",
    intro:
      "Ceci est un papier produit. Il explique à quoi sert $KAI. Aucune promesse de rendement, de listing ou de prix.",
    utilT: "Pourquoi un jeton d’utilité",
    util:
      "$KAI est un jeton d’utilité. Il se dépense dans un produit vivant : chat Kai, matching, plus tard le premium. Pas d’action, pas de dette, pas de dividende.",
    notT: "Ce qu’il n’est pas",
    not:
      "Pas un contrat d’investissement. Pas de dividende, pas de gouvernance, pas de promesse de prix. L’achat sert à utiliser la couche Kai.",
    useT: "À quoi il sert",
    use: [
      "Crédits Kai — chat et matching.",
      "Kai premium.",
      "Écosystème — invitations, contribution, partenaires.",
      "Feuille de route : conseil et santé. Le diagnostic reste humain.",
    ],
    productT: "Produit",
    product:
      "KindredHQ est en ligne, matching sans photos. Les autres apps glissent des visages. Ici l’on parle avec Kai.",
    chainT: "Chaîne",
    chain:
      "KAI est un ERC-20 sur Robinhood Chain (4663). Prévente en USDG, gaz ETH. Plafonds dans le contrat. Pas d’allowlist.",
    tokT: "Offre",
    tok:
      "Offre fixe : 1 618 033 988 KAI. Prévente 242 705 096. Quatre tours. 15 % TGE, reste linéaire 18 mois. Équipe : 0 % TGE, cliff 12 mois, linéaire 60.",
    futureT: "Direction",
    future:
      "L’IA réécrit chaque couche. KindredHQ ne s’arrête pas au match. Kai doit devenir la colonne du produit.",
    close: "Pas un prospectus. Lisez le contrat et le produit. $KAI n’est pas un véhicule de spéculation.",
  }),
  it: fromEn({
    title: "KAI Whitepaper",
    kicker: "KindredHQ · Token di utilità",
    intro:
      "Questo è un documento di prodotto. Spiega a cosa serve $KAI. Nessuna promessa di rendimento, listing o prezzo.",
    utilT: "Perché un token di utilità",
    util:
      "$KAI è un token di utilità. Si spende in un prodotto live: chat Kai, matching, poi premium. Non è equity, non è debito, non paga dividendi.",
    notT: "Cosa non è",
    not:
      "Non è un contratto di investimento. Niente dividendo, niente governance, niente promessa di prezzo. Si compra per usare lo strato Kai.",
    useT: "A cosa serve",
    use: [
      "Crediti Kai — chat e matching.",
      "Kai premium.",
      "Ecosistema — inviti, contributo, partner.",
      "Roadmap: counseling e salute. La diagnosi resta umana.",
    ],
    productT: "Prodotto",
    product:
      "KindredHQ è live, matching senza foto. Le altre app slittano volti. Qui si parla con Kai.",
    chainT: "Chain",
    chain:
      "KAI è un ERC-20 su Robinhood Chain (4663). Prevendita in USDG, gas ETH. Cap nel contratto. Nessuna allowlist.",
    tokT: "Offerta",
    tok:
      "Offerta fissa: 1.618.033.988 KAI. Prevendita 242.705.096. Quattro round. 15 % TGE, resto lineare 18 mesi. Team: 0 % TGE, cliff 12 mesi, lineare 60.",
    futureT: "Direzione",
    future:
      "L’IA riscrive ogni strato. KindredHQ non finisce al match. Kai deve diventare la colonna del prodotto.",
    close: "Non è un prospetto. Leggi contratto e prodotto. $KAI non è un veicolo speculativo.",
  }),
  pt: fromEn({
    title: "KAI Whitepaper",
    kicker: "KindredHQ · Token de utilidade",
    intro:
      "Este é um papel de produto. Explica para que serve o $KAI. Sem promessa de rendimento, listagem ou preço.",
    utilT: "Por que um token de utilidade",
    util:
      "$KAI é um token de utilidade. Gasta-se num produto ao vivo: chat Kai, matching, depois premium. Não é equity, não é dívida, não paga dividendo.",
    notT: "O que não é",
    not:
      "Não é um contrato de investimento. Sem dividendo, sem governança, sem promessa de preço. Compra-se para usar a camada Kai.",
    useT: "Para que serve",
    use: [
      "Créditos Kai — chat e matching.",
      "Kai premium.",
      "Ecossistema — convites, contribuição, parceiros.",
      "Roteiro: aconselhamento e saúde. O diagnóstico continua humano.",
    ],
    productT: "Produto",
    product:
      "A KindredHQ está no ar, matching sem fotos. Outros apps deslizam rostos. Aqui se fala com o Kai.",
    chainT: "Chain",
    chain:
      "KAI é um ERC-20 na Robinhood Chain (4663). Pré-venda em USDG, gás ETH. Tetos no contrato. Sem allowlist.",
    tokT: "Oferta",
    tok:
      "Oferta fixa: 1.618.033.988 KAI. Pré-venda 242.705.096. Quatro rodadas. 15 % TGE, resto linear 18 meses. Equipe: 0 % TGE, cliff 12 meses, linear 60.",
    futureT: "Direção",
    future:
      "A IA reescreve cada camada. A KindredHQ não termina no match. Kai deve ser a espinha do produto.",
    close: "Não é um prospecto. Leia o contrato e o produto. $KAI não é um veículo especulativo.",
  }),
  ru: fromEn({
    title: "KAI Whitepaper",
    kicker: "KindredHQ · Утилити-токен",
    intro:
      "Это продуктовый документ. Он объясняет, зачем $KAI. Нет обещаний доходности, листинга или цены.",
    utilT: "Почему утилити-токен",
    util:
      "$KAI — утилити-токен. Его тратят в живом продукте: чат Kai, матчинг, позже премиум. Это не доля, не долг и не дивиденд.",
    notT: "Чем он не является",
    not:
      "Это не инвестиционный договор. Нет дивиденда, нет управления, нет обещания цены. Покупка — чтобы пользоваться слоем Kai.",
    useT: "Для чего",
    use: [
      "Кредиты Kai — чат и матчинг.",
      "Premium Kai.",
      "Экосистема — приглашения, вклад, партнёры.",
      "Карта: консультации и здоровье. Диагноз остаётся за человеком.",
    ],
    productT: "Продукт",
    product:
      "KindredHQ в эфире, матчинг без фото. Другие приложения листают лица. Здесь говорят с Kai.",
    chainT: "Сеть",
    chain:
      "KAI — ERC-20 в сети Robinhood Chain (4663). Пресейл в USDG, газ ETH. Потолки в контракте. Без allowlist.",
    tokT: "Эмиссия",
    tok:
      "Фиксированная эмиссия: 1 618 033 988 KAI. Пресейл 242 705 096. Четыре раунда. 15 % TGE, остальное линейно 18 месяцев. Команда: 0 % TGE, клифф 12 месяцев, линейно 60.",
    futureT: "Направление",
    future:
      "ИИ переписывает каждый слой. KindredHQ не заканчивается матчем. Kai должен стать стержнем продукта.",
    close: "Это не проспект. Читайте контракт и продукт. $KAI не позиционируется как спекуляция.",
  }),
};
