import * as _ from "lodash";
import * as querystring from "querystring";
import * as elements from "./elements";
import * as url from "url";
import { Recipient, Individual, Organisation } from "../../types";

export const ERRORS = {
  notFound: `NOT_FOND`,
  isEmpty: "IS_EMPTY",
  noText: "NO_TEXT",
  NaN: "NAN"
};

// MAIN

export const parseCycles = (document: ParentNode): Array<number> => {
  const formElement = document.querySelector("#rightColumn > form");
  if (!formElement) throw ERRORS.notFound;
  const options = elements.parseSelect(formElement as HTMLSelectElement);

  return options
    .map(({ text }) => parseInt(text, 10))
    .filter(text => !_.isNaN(text));
};

export const parseOrganisations = (node: ParentNode): Array<Organisation> => {
  const table = elements.parseTable(node, "#contribs");
  return table.map(([_, org]) => {
    const link = elements.parseLink(org);
    const url_ = url.parse(link.href, true);
    const name = link.content.textContent;
    if (!name) throw new Error("Empty name");

    return { id: parseIdLink(url_), name: name.trim() };
  });
};

export const parseIndividual = (
  row: Array<HTMLTableDataCellElement>
): Individual => {
  const regexMember = /([^,]+), ([^(]+)\(([RD])-([A-Z]+)\)/;
  const [chamber, member] = row;
  const result = (member.textContent || "").match(regexMember);
  if (!result) throw new Error(`no match: ${result}`);
  const [_, surname, prename, party, state] = result;

  return {
    prename: prename.trim(),
    surname: surname.trim(),
    chamber: chamber.textContent || "",
    state,
    party,
    id
  };
};

export const parseRecipients = (node: ParentNode): Array<Recipient> => {
  const elem = node.querySelector("#profileLeftColumn");
  if (!elem) throw new Error("not found");
  const table = elements.parseTable(elem, ".datadisplay");

  return table.map(row => {
    return {
      individual: parseIndividual(row),
      money: parseMoney(row[2].textContent || "")
    };
  });
};

export const parseMoney = (value: string): number => {
  const regex = /\$([0-9,]+)/;
  const result = value.match(regex);
  if (!result) throw new Error("no match");
  const [_, digit] = result;

  return parseInt(digit.replace(/,/g, ""), 10);
};

export const parseIdLink = ({ query }: url.UrlWithParsedQuery): string => {
  if (!query.id || typeof query.id !== "string") throw "id not found";

  return query.id;
};
