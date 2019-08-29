import request, { RequestPromise } from "request-promise-native";
import { JSDOM } from "jsdom";
import * as _ from "lodash";
import * as parser from "./parser";
import * as querystring from "querystring";

type Node = { tag: "Organisation" } | { tag: "Individual" };

type Edge = { cycle: number; money: number };

type NodeId = string;

type Graph = {
  nodes: Map<NodeId, Node>;
  edges: Array<{ from: NodeId; to: NodeId; label: Edge }>;
};

const parseDocument = (body: string): Document =>
  new JSDOM(body).window.document;

const passOrThrow = (x: any) => {
  if (!x) throw "";
  return x;
};

const api = {
  openSecrets: {
    orgs: {
      list: ({ cycle }: { cycle?: number }) => ({
        method: "get",
        uri: "https://www.opensecrets.org/orgs/list.php"
      })
    }
  }
};

export const getCycles = (): Promise<Array<number>> =>
  request(api.openSecrets.orgs.list({}))
    .then(parseDocument)
    .then(parser.parseCycles);

export const getOrganisationIds = ({
  cycle
}: {
  cycle: number;
}): Promise<Array<string>> =>
  request(api.openSecrets.orgs.list({ cycle }))
    .then(parseDocument)
    .then(parser.parseOrganisationIds);
