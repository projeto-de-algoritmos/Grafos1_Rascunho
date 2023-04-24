/**
 * An Edge of a Graph.
 */
export class Edge {
  /**
   * Creates an Edge between two nodes.
   * @param {*} node1 The first node.
   * @param {*} node2 The node that `node1` points to.
   * @param {*} weight The Edge's weight.
   */
  constructor(node1, node2, weight = 1) {
    this.id1 = node1.id;
    this.id2 = node2.id;
    this.weight = weight;
  }
}
