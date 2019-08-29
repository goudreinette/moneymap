import * as api from "./api";

const graph = {
  nodes: new Map(),
  edges: []
};

api.getCycles().then(x => console.log(x));

api.getOrganisationIds({ cycle: 2000 }).then(x => console.log(x));
