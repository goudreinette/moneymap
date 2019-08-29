import * as Api from "./api";
import { Graph, Organisation } from "../types";
import * as _ from "lodash";

const graph = {
  nodes: new Map(),
  edges: []
};

Api.getCycles().then(x => console.log(x));

Api.getOrganisations({ cycle: 2000 }).then(x => console.log(x));

const maybeTake: <T>(xs: Array<T>, size?: number) => Array<T> = (xs, size) => {
  return size ? _.take(xs, size) : xs;
};

const getGraph = (size?: number): Promise<Graph> => {
  const graph = { nodes: new Map(), edges: [] };

  return Api.getCycles().then(cycles =>
    allInSeq(
      maybeTake(cycles, size).map(cycle => setOrganisations(graph, cycle, size))
    )
  );
};

const setOrganisations = (
  graph: Graph,
  cycle: number,
  size?: number
): Promise<Graph> => {
  return Api.getOrganisations({ cycle }).then(orgs =>
    allInSeq(
      maybeTake(orgs, size).map(organisation => {
        graph.nodes.set(organisation.id, {
          tag: "Organisation",
          ...organisation
        });

        return setRecipients(graph, cycle, organisation, size);
      })
    )
  );
};

const setRecipients = (
  graph: Graph,
  cycle: number,
  organisation: Organisation,
  size?: number
): Promise<Graph> => {
  return Api.getRecipients({ id: organisation.id, cycle }).then(recipients => {
    maybeTake(recipients, size).forEach(recipient => {
      const { individual, money } = recipient;

      graph.nodes.set(individual.id, individual);
    });
    return Promise.resolve(graph);
  });
};

const allInSeq: <T>(promises: Array<Promise<T>>) => Promise<T> = promises => {
  return promises.reduce((promise1, promise2) => promise1.then(_ => promise2));
};
