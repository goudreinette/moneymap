import * as parser from "../../scr/scraper/parser";

import * as assert from "assert";
import { JSDOM } from "jsdom";

describe("parser", () => {
  describe("parseSelect", () => {
    it("parses the element", () => {
      const html = `
        <select>
            <option>Aaa</option>
            <option>Bbb</option>
        </select>
      `;
      const selectElement = new JSDOM(html).window.document.querySelector(
        "select"
      );
      if (!selectElement) return;
      const actual = parser.parseSelect(selectElement);
      const expected = [{ text: "Aaa" }, { text: "Bbb" }];

      assert.deepEqual(actual, expected);
    });
  });

  describe("parseTable", () => {
    it("parses the element", () => {
      const html = `
        <table>
          <tr>
            <td>1-1</td>
            <td>1-2</td>
          </tr>
          <tr>
            <td>2-1</td>
            <td>2-2</td>
          </tr>
        </table>
      `;
      const tableElement = new JSDOM(html).window.document.querySelector(
        "table"
      );
      if (!tableElement) return;
      const actual = parser
        .parseTable(tableElement)
        .map(row => row.map(col => col.textContent));
      const expected = [["1-1", "1-2"], ["2-1", "2-2"]];

      assert.deepEqual(actual, expected);
    });
  });

  describe("parseCycles", () => {
    it("parses the element", () => {
      const html = `
        <div id="rightColumn">
            <form>
                <select>
                    <option>1999</option>
                    <option>2000</option>
                    <option>2001</option>
                </select>
            </form>
        </div>
      `;
      const document = new JSDOM(html).window.document;
      const actual = parser.parseCycles(document);
      const expected = [1999, 2000, 2001];

      assert.deepEqual(actual, expected);
    });
  });
});
