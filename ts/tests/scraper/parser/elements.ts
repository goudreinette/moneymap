import * as elementsParser from "../../../scr/scraper/parser/elements";

import * as assert from "assert";
import { JSDOM } from "jsdom";
import * as _ from "lodash";

describe("parser", () => {
  describe("parseSelect", () => {
    it("succeeds", () => {
      const html = `
        <select>
          <option>Aaa</option>
          <option>Bbb</option>
        </select>
      `;
      const document = new JSDOM(html).window.document;
      const actual = elementsParser.parseSelect(document);
      const expected = [{ text: "Aaa" }, { text: "Bbb" }];

      assert.deepEqual(actual, expected);
    });
  });

  describe("parseTable", () => {
    it("succeeds", () => {
      const html = `
        <table id="id">
          <tr>
            <th>A<th>
            <th>B<th>
          </tr>
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
      const document = new JSDOM(html).window.document;
      const actual = elementsParser
        .parseTable(document, "#id")
        .map(row => row.map(col => col.textContent));
      const expected = [["1-1", "1-2"], ["2-1", "2-2"]];

      assert.deepEqual(actual, expected);
    });
  });

  describe("parseLink", () => {
    it("succeeds", () => {
      const html = `
        <a id="id" href="ddg.gg">Link</a>
      `;
      const document = new JSDOM(html).window.document;
      const actual = _.update(
        elementsParser.parseLink(document, "#id"),
        "content",
        x => x.textContent || ""
      );
      const expected = { href: "ddg.gg", content: "Link" };

      assert.deepEqual(actual, expected);
    });
  });
});
