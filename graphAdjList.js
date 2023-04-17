import { Edge } from "./edge";
import { Queue } from "./queue";
/**
 * `Adjacency List` implementation of a `Graph`.
 * There are two rules of usage:
 *
 * 1 - Every node must be an object.
 *
 * 2 - Every node must have an `id` attribute.
 */
export class GraphAdjList {
  /**
   * Creates a Graph.
   * @param nodes An array of nodes.
   * @param isDigraph {boolean} Boolean that determines if the graph is or isn't directed.
   */
  constructor(nodes = [], isDigraph = false) {
    this.isDigraph = isDigraph;
    this.edges = [];
    this.adjacencyList = {};
    this.nodes = {};
    nodes.forEach((node) => this.addNode(node));
  }
  /**
   * Adds a node to the graph.
   * If there is a node with that id, it won't be added to the graph.
   * @param node The new node.
   */
  addNode(node) {
    if (this.nodeExists(node.id)) return;
    this.nodes[node.id] = node;
    this.adjacencyList[node.id] = [];
  }
  /**
   * Checks if a node exists.
   * @param id Identifier of the node of interest.
   * @returns {boolean} `true` if the node exists, `false` otherwise.
   */
  nodeExists(id) {
    return !!this.nodes[id];
  }
  /**
   * Checks if two nodes already have an adjacency.
   * The first node must exist in the graph, or the 
   * function will return false.
   * @param node1 First node of interest.
   * @param node2 Second node of interest.
   * @returns {boolean} `true` if the nodes already have an adjacency, `false` otherwise.
   */
  adjacencyAlreadyExists(node1, node2) {
    return this.nodeExists(node1.id)
      ? this.adjacencyList[node1.id].filter((item) => item.id === node2.id)
          .length > 0
      : false;
  }
  /**
   * Create an edge from node1 to node2.
   * If they are already adjacent or have the same id,
   * the edge won't be created.
   * @param node1 First node.
   * @param node2 Node that node1 points to.
   * @param weight Weight of the edge.
   */
  addEdge(node1, node2, weight = 1) {
    if (node1.id === node2.id || this.adjacencyAlreadyExists(node1, node2))
      return;
    this.addNode(node1);
    this.addNode(node2);
    this.adjacencyList[node1.id].push(node2);
    this.edges.push(new Edge(node1, node2, weight));
  }
  /**
   * Creates an adjacency, from node1 to node2.
   * If the graph is undirected, this function
   * will also create an adjacency from node2
   * to node1.
   * @param node1 The first node.
   * @param node2 The node that node1 points to.
   * @param weight The weight between the nodes.
   */
  createAdjacency(node1, node2, weight = 1) {
    this.addEdge(node1, node2, weight);
    if (!this.isDigraph) {
      this.addEdge(node2, node1, weight);
    }
  }
  /**
   * Recursive implementation of a DFS.
   * @param rootNode The starting node.
   * @param visitedNodes A set of ids of nodes that have already been visited.
   * @returns A set of the visited nodes in the order they were visited.
   */
  depthFirstSearch(rootNode, visitedNodes = new Set()) {
    visitedNodes.add(rootNode.id);
    for (const adjacentNode of this.adjacencyList[rootNode.id]) {
      if (!visitedNodes.has(adjacentNode.id)) {
        this.depthFirstSearch(adjacentNode, visitedNodes);
      }
    }
    return visitedNodes;
  }
  /**
   * @returns The number of connected components.
   */
  getNumberOfConnectedComponents() {
    let numberOfConnectedComponents = 0;
    const visitedNodes = new Set();
    for (const id in this.nodes) {
      if (!visitedNodes.has(parseInt(id))) {
        this.depthFirstSearch(this.nodes[id], visitedNodes);
        numberOfConnectedComponents++;
      }
    }

    return numberOfConnectedComponents;
  }
  /**
   * Implementation of a BFS.
   * @param rootNode The starting node.
   * @param visitedNodes A set of ids of nodes that have already been visited.
   * @returns A set of the visited nodes in the order they were visited.
   */
  breadthFirstSearch(rootNode, visitedNodes = new Set()) {
    const queue = new Queue();
    queue.enqueue(rootNode);
    visitedNodes.add(parseInt(rootNode.id));

    while(!queue.isEmpty()){
      const node = queue.dequeue();
      for(const adjacentNode of this.adjacencyList[node.id]){
        if(!visitedNodes.has(parseInt(adjacentNode.id))){
          queue.enqueue(adjacentNode);
          visitedNodes.add(parseInt(adjacentNode.id));
        }
      }
    }
    return visitedNodes;
  }
}
