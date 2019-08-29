const graph = {
  nodes: new Map(),
  edges: []
};

/*
const getOrganisationIds = (cycle: number): Promise<Array<NodeId>> =>
    request({ uri: "https://www.opensecrets.org/orgs/list.php", qs: { cycle } })
        .then(parseDocument)
        .then(document => document.querySelector("table.#contribs"))
        .then(passOrThrow)
        .then(table => parser.parseTable(table))
        .then(rows => rows.map(([_, org]) => parseOrg(org)).filter(x => x !== null))



const parseOrg = (col: HTMLTableDataCellElement): NodeId | null => {
    const link = col.querySelector("a")
    if (!link) return null

    const x = foo(link.href)
    if (!x.id || typeof x.id !== 'string') return null

    return x.id
}

const foo = (url: string): querystring.ParsedUrlQuery => {
    const [_, right] = url.split("?")
    return querystring.parse(right)
}
*/

getCycles().then(x => console.log(x));
