import * as parser from "../../../scr/scraper/parser";

import * as assert from "assert";
import { JSDOM } from "jsdom";
import * as url from "url";

describe("parser", () => {
  describe("parseCycles", () => {
    it("succeeds", () => {
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

  describe("parseOrganisationIds", () => {
    it("succeeds", () => {
      const html = `
        <table id="contribs">
          <tr>
            <td></td>
            <td>
              <a href="summary.php?id=D000031992&amp;cycle=2018">Bloomberg LP</a>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
            <a href="summary.php?id=D000067344&amp;cycle=2018">Fahr LLC</a>
            </td>
          </tr>
        </table>
      `;
      const document = new JSDOM(html).window.document;
      const actual = parser.parseOrganisationIds(document);
      const expected = ["D000031992", "D000067344"];

      assert.deepEqual(actual, expected);
    });
  });

  describe("parseIdLink", () => {
    it("succeeds", () => {
      const url_ = url.parse("summary.php?id=D000031992&amp;cycle=2018", true);
      const actual = parser.parseIdLink(url_);
      const expected = "D000031992";

      assert.deepEqual(actual, expected);
    });
  });
});
