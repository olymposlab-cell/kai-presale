import type { Lang } from "./copy";

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
};

const en: DropCopy = {
  nav: "Airdrop",
  title: "Community airdrop",
  lead: "From the community allocation (5% of supply). One claim per wallet. Not a sale. Not a return.",
  wait: "The claim contract is not live yet. Recipients will claim here after the treasury funds the distributor.",
  none: "This wallet is not on the current list.",
  eligible: "Eligible",
  claimed: "Already claimed",
  claim: "Claim KAI",
  connect: "Connect wallet",
  ok: "Claim confirmed",
  cap: "Community allocation: 80,901,699 KAI.",
};

export const dropCopy: Record<Lang, DropCopy> = {
  en,
  de: {
    ...en,
    nav: "Airdrop",
    title: "Community-Airdrop",
    lead: "Aus der Community-Zuteilung (5 %). Ein Claim pro Wallet. Kein Verkauf, keine Rendite.",
    wait: "Der Claim-Vertrag ist noch nicht live.",
    none: "Diese Wallet steht nicht auf der Liste.",
    eligible: "Berechtigt",
    claimed: "Bereits abgerufen",
    claim: "KAI abrufen",
  },
  es: {
    ...en,
    title: "Airdrop de comunidad",
    lead: "De la asignación comunitaria (5 %). Un claim por cartera. No es una venta ni un retorno.",
    wait: "El contrato de claim aún no está activo.",
    none: "Esta cartera no está en la lista.",
    eligible: "Elegible",
    claimed: "Ya reclamado",
    claim: "Reclamar KAI",
  },
  fr: {
    ...en,
    title: "Airdrop communautaire",
    lead: "Allocation communautaire (5 %). Un claim par portefeuille. Pas une vente, pas un rendement.",
    wait: "Le contrat de claim n’est pas encore en ligne.",
    none: "Ce portefeuille n’est pas sur la liste.",
    eligible: "Éligible",
    claimed: "Déjà réclamé",
    claim: "Réclamer KAI",
  },
  it: {
    ...en,
    title: "Airdrop community",
    lead: "Dall’allocazione community (5 %). Un claim per wallet. Non è una vendita.",
    wait: "Il contratto di claim non è ancora live.",
    none: "Questo wallet non è in lista.",
    eligible: "Idoneo",
    claimed: "Già riscattato",
    claim: "Riscuoti KAI",
  },
  pt: {
    ...en,
    title: "Airdrop da comunidade",
    lead: "Da alocação da comunidade (5 %). Um resgate por carteira. Não é venda nem retorno.",
    wait: "O contrato de resgate ainda não está no ar.",
    none: "Esta carteira não está na lista.",
    eligible: "Elegível",
    claimed: "Já resgatado",
    claim: "Resgatar KAI",
  },
  ru: {
    ...en,
    nav: "Airdrop",
    title: "Community airdrop",
    lead: "Из community-доли (5 %). Один claim на кошелёк. Это не продажа и не доход.",
    wait: "Контракт клейма ещё не запущен.",
    none: "Этого кошелька нет в списке.",
    eligible: "Есть право",
    claimed: "Уже получено",
    claim: "Забрать KAI",
  },
};
