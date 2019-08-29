import * as _ from "lodash";
import * as querystring from "querystring";
import * as elements from "./elements";
import * as url from "url";

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

export const parseOrganisationIds = (node: ParentNode): Array<string> => {
  const table = elements.parseTable(node, "#contribs");
  return table.map(([_, org]) => {
    const link = elements.parseLink(org);
    const url_ = url.parse(link.href, true);
    return parseIdLink(url_);
  });
};

// UTIL

export const parseIdLink = ({ query }: url.UrlWithParsedQuery): string => {
  if (!query.id || typeof query.id !== "string") throw "id not found";

  return query.id;
};
