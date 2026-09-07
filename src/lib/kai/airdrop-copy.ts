import type { Lang } from "./copy";
import type { QuestId } from "./airdrop-quests";

export type DropCopy = {
  nav: string;
  title: string;
  lead: string;
  wait: string;
  none: string;
  eligible: string;
  claimed: string;
  claim: string;
  connect: string;
  ok: string;
  cap: string;
  quests: string;
  questLead: string;
  points: string;
  open: string;
  done: string;
  mark: string;
  chainOk: string;
  task: Record<QuestId, { t: string; b: string }>;
};

const en: DropCopy = {
  nav: "Airdrop",
  title: "Community airdrop",
  lead: "Points now, KAI at snapshot. Community allocation 5%. Not a sale. Not a return.",
  wait: "Claim opens after the snapshot. Complete tasks below — higher points, larger share.",
  none: "This wallet is not on the current claim list.",
  eligible: "Eligible",
  claimed: "Already claimed",
  claim: "Claim KAI",
  connect: "Connect wallet",
  ok: "Claim confirmed",
  cap: "Community allocation: 80,901,699 KAI.",
  quests: "Tasks",
  questLead: "Kindred app users and buyers rank higher. Follow and read to add points. Snapshot converts points to KAI.",
  points: "Points",
  open: "Open",
  done: "Done",
  mark: "I did this",
  chainOk: "Verified on-chain",
  task: {
    x: { t: "Follow on X", b: "@KindredHQ_io" },
    app: { t: "Use KindredHQ", b: "Create an account. App users receive the largest task weight." },
    paper: { t: "Read the whitepaper", b: "Product paper — what $KAI is for." },
    buy: { t: "Join the presale", b: "A recorded purchase on this wallet. Verified on-chain." },
  },
};

export const dropCopy: Record<Lang, DropCopy> = {
  en,
  de: {
    ...en,
    title: "Community-Airdrop",
    lead: "Jetzt Punkte, KAI beim Snapshot. 5 % Community. Kein Verkauf, keine Rendite.",
    wait: "Claim nach dem Snapshot. Aufgaben unten — mehr Punkte, größerer Anteil.",
    quests: "Aufgaben",
    questLead: "App-Nutzer und Käufer stehen höher. Snapshot macht aus Punkten KAI.",
    points: "Punkte",
    open: "Öffnen",
    done: "Erledigt",
    mark: "Erledigt",
    chainOk: "On-chain geprüft",
    task: {
      x: { t: "Auf X folgen", b: "@KindredHQ_io" },
      app: { t: "KindredHQ nutzen", b: "Konto anlegen. App-Nutzer haben das höchste Gewicht." },
      paper: { t: "Whitepaper lesen", b: "Was $KAI im Produkt tut." },
      buy: { t: "Am Presale teilnehmen", b: "Kauf on-chain geprüft." },
    },
  },
  es: {
    ...en,
    title: "Airdrop de comunidad",
    lead: "Puntos ahora, KAI en el snapshot. 5 % comunidad. No es venta ni retorno.",
    wait: "El claim abre tras el snapshot. Más puntos, mayor parte.",
    quests: "Tareas",
    open: "Abrir",
    done: "Hecho",
    mark: "Lo hice",
    chainOk: "Verificado on-chain",
    task: {
      x: { t: "Seguir en X", b: "@KindredHQ_io" },
      app: { t: "Usar KindredHQ", b: "Crea cuenta. Quien usa la app pesa más." },
      paper: { t: "Leer el whitepaper", b: "Para qué sirve $KAI." },
      buy: { t: "Entrar en la preventa", b: "Compra verificada on-chain." },
    },
  },
  fr: {
    ...en,
    title: "Airdrop communautaire",
    lead: "Des points maintenant, du KAI au snapshot. 5 % communauté. Pas une vente.",
    wait: "Le claim ouvre après le snapshot. Plus de points, plus grande part.",
    quests: "Tâches",
    open: "Ouvrir",
    done: "Fait",
    mark: "C’est fait",
    chainOk: "Vérifié on-chain",
    task: {
      x: { t: "Suivre sur X", b: "@KindredHQ_io" },
      app: { t: "Utiliser KindredHQ", b: "Créer un compte. Les utilisateurs pèsent plus." },
      paper: { t: "Lire le whitepaper", b: "À quoi sert $KAI." },
      buy: { t: "Participer à la presale", b: "Achat vérifié on-chain." },
    },
  },
  it: {
    ...en,
    title: "Airdrop community",
    lead: "Punti ora, KAI allo snapshot. 5 % community. Non è una vendita.",
    wait: "Il claim apre dopo lo snapshot. Più punti, quota più alta.",
    quests: "Obiettivi",
    open: "Apri",
    done: "Fatto",
    mark: "Fatto",
    chainOk: "Verificato on-chain",
    task: {
      x: { t: "Segui su X", b: "@KindredHQ_io" },
      app: { t: "Usa KindredHQ", b: "Crea un account. Chi usa l’app pesa di più." },
      paper: { t: "Leggi il whitepaper", b: "A cosa serve $KAI." },
      buy: { t: "Entra in presale", b: "Acquisto verificato on-chain." },
    },
  },
  pt: {
    ...en,
    title: "Airdrop da comunidade",
    lead: "Pontos agora, KAI no snapshot. 5 % comunidade. Não é venda.",
    wait: "O resgate abre após o snapshot. Mais pontos, maior parte.",
    quests: "Tarefas",
    open: "Abrir",
    done: "Feito",
    mark: "Fiz isso",
    chainOk: "Verificado on-chain",
    task: {
      x: { t: "Seguir no X", b: "@KindredHQ_io" },
      app: { t: "Usar o KindredHQ", b: "Crie conta. Quem usa o app pesa mais." },
      paper: { t: "Ler o whitepaper", b: "Para que serve o $KAI." },
      buy: { t: "Entrar na preventa", b: "Compra verificada on-chain." },
    },
  },
  ru: {
    ...en,
    title: "Community airdrop",
    lead: "Очки сейчас, KAI на снимке. 5 % community. Это не продажа.",
    wait: "Клейм после снимка. Больше очков — больше доля.",
    quests: "Задания",
    open: "Открыть",
    done: "Готово",
    mark: "Сделано",
    chainOk: "Проверено в сети",
    task: {
      x: { t: "Подписка в X", b: "@KindredHQ_io" },
      app: { t: "KindredHQ", b: "Аккаунт в приложении весит больше всего." },
      paper: { t: "Whitepaper", b: "Зачем нужен $KAI." },
      buy: { t: "Участие в пресейле", b: "Покупка проверяется в сети." },
    },
  },
};
