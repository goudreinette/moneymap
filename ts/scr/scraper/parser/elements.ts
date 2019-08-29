import * as _ from "lodash";

type Select = Array<{ text: string }>;

type Table = Array<Array<HTMLTableDataCellElement>>;

type Link = { href: string; content: HTMLLinkElement };

export const parseSelect = (
  parentNode: ParentNode,
  refinement: string = ""
): Select => {
  const selectElement = parentNode.querySelector(`select${refinement}`);
  if (!selectElement) throw new Error("Element not found: select");
  const elementsOption = selectElement.querySelectorAll("option");

  return _.map(elementsOption, ({ textContent }) => {
    if (!textContent) throw new Error("text empty");

    return { text: textContent };
  });
};

export const parseTable = (
  parentNode: ParentNode,
  refinement: string = ""
): Table => {
  const table = parentNode.querySelector(`table${refinement}`);
  if (!table) throw new Error("Element not found: table");
  const rows = _.toArray(table.querySelectorAll("tr"));

  if (rows[0] && rows[0].querySelector("th")) {
    rows.shift();
  }

  return _.map(rows, row => {
    const column = row.querySelectorAll("td");
    return _.toArray(column);
  });
};

export const parseLink = (
  parentNode: ParentNode,
  refinement: string = ""
): Link => {
  const link = parentNode.querySelector(`a${refinement}`) as HTMLLinkElement;
  if (!link) throw new Error("Element not found: a");

  return { href: link.href, content: link };
};
