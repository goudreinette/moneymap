import request, { RequestPromise } from "request-promise-native";
import { JSDOM } from "jsdom";
import * as _ from "lodash";
import * as querystring from "querystring";

export const ERRORS = {
  notFound: `NOT_FOND`,
  isEmpty: "IS_EMPTY",
  noText: "NO_TEXT",
  NaN: "NAN"
};

type Select = Array<{ text: string }>;

type Table = Array<Array<HTMLTableDataCellElement>>;

export const parseSelect = (selectElement: HTMLSelectElement): Select => {
  const elementsOption = selectElement.querySelectorAll("option");

  return _.map(elementsOption, ({ textContent }) => {
    if (!textContent) throw ERRORS.noText;

    return { text: textContent };
  });
};

export const parseTable = (selectElement: HTMLTableElement): Table => {
  const rows = selectElement.querySelectorAll("tr");

  return _.map(rows, row => {
    const column = row.querySelectorAll("td");
    return _.toArray(column);
  });
};

export const parseCycles = (document: ParentNode): Array<number> => {
  const selectElement = document.querySelector("#rightColumn > form > select");
  if (!selectElement) throw ERRORS.notFound;
  const options = parseSelect(selectElement as HTMLSelectElement);

  return options
    .map(({ text }) => parseInt(text, 10))
    .filter(text => !_.isNaN(text));
};
