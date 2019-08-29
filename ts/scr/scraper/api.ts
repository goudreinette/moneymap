import request, { RequestPromise } from "request-promise-native";
import { JSDOM } from "jsdom";
import * as _ from "lodash";
import * as parser from "./parser";
import * as querystring from "querystring";
import * as types from "../types";

const parseDocument = (body: string): Document =>
  new JSDOM(body).window.document;

export const getCycles = (): Promise<Array<number>> =>
  request
    .get({ url: "https://www.opensecrets.org/orgs/list.php" })
    .then(parseDocument)
    .then(parser.parseCycles);

export const getOrganisations = ({
  cycle
}: {
  cycle: number;
}): Promise<Array<types.Organisation>> =>
  request
    .get({ url: "https://www.opensecrets.org/orgs/list.php", qs: { cycle } })
    .then(parseDocument)
    .then(parser.parseOrganisations);

export const getRecipients = ({
  id,
  cycle
}: {
  id: string;
  cycle: number;
}): Promise<Array<types.Recipient>> =>
  request
    .get({
      url: "https://www.opensecrets.org/orgs/summary.php",
      qs: { id, cycle }
    })
    .then(parseDocument)
    .then(parser.parseRecipients);
