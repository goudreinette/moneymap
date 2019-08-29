export type Organisation = { name: string; id: string };

export type Individual = {
  prename: string;
  surname: string;
  chamber: string;
  state: string;
  party: string;
  id: string;
};

type Node =
  | { tag: "Organisation" } & Organisation
  | { tag: "Individual" } & Individual;

type Edge = { cycle: number; money: number };

type NodeId = string;

export type Graph = {
  nodes: Map<NodeId, Node>;
  edges: Array<{ from: NodeId; to: NodeId; label: Edge }>;
};

export type Recipient = { individual: Individual; money: number };
