import { Edge } from "./edge.js";
import { Queue } from "./queue.js";
import { getSquareById, colorsAreEqual, offsetsMedium, offsetsBig } from "./utils.js";
import { getMode } from './main.js';
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
   * @param id The identifier of the starting node.
   * @param visitedNodes A set of ids of nodes that have already been visited.
   * @returns A set of the visited nodes in the order they were visited.
   */
  depthFirstSearch(id, visitedNodes = new Set()) {
    visitedNodes.add(id);
    for (const adjacentNode of this.adjacencyList[id]) {
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
      if (!visitedNodes.has(+id)) {
        this.depthFirstSearch(this.nodes[id], visitedNodes);
        numberOfConnectedComponents++;
      }
    }

    return numberOfConnectedComponents;
  }
  /**
   * Implementation of a BFS.
   * @param id Id of the starting node.
   * @param newColor The color that the node shall be filled with.
   * @param startingColor The color of the starting node. This is the color that should be painted.
   * @param visitedNodes A set of ids of nodes that have already been visited.
   * @param {boolean} timeout Controls if there is the filling effect. 
   * @returns A set of the visited nodes in the order they were visited.
   */
  async breadthFirstSearch(
    id,
    startingColor,
    newColor,
    visitedNodes = new Set(),
    timeout = false
  ) {
    const queue = new Queue();
    queue.enqueue(this.nodes[id]);

    visitedNodes.add(+id);
    while (!queue.isEmpty() && getMode() !== "eraseAll") {
      const node = queue.dequeue();
      if(timeout) await new Promise((r) => setTimeout(r, 2));
      if (getMode() !== "eraseAll")
        this.updateNodeColor(node.id, newColor);

      for (const adjacentNode of this.adjacencyList[node.id]) {
        if (
          !visitedNodes.has(+adjacentNode.id) &&
          colorsAreEqual(this.nodes[adjacentNode.id].color, startingColor)
        ) {
          queue.enqueue(adjacentNode);
          visitedNodes.add(+adjacentNode.id);
        }
      }
    }
    return visitedNodes;
  }
  /**
   * Update the color of a node.
   * @param id The id of the node of interest.
   * @param {Color}newColor The new color of the node.
   * @param {String}brushSize The size of brush.
   */
  updateNodeColor(id, newColor, brushSize) {
    this.nodes[id].color = newColor;
    const squares = [getSquareById(id)];
    /** 
     * if this method is called from the click event at showGridButton,
     * then the following "switch" is ignored (since brushSize is undefined).
     */
    switch (brushSize) {
      case "small":
        break;
      case "medium":
        offsetsMedium.forEach(offset => {
          this.nodes[id + offset].color = newColor;
          squares.push(getSquareById(id + offset));
        });
        break;
      case "big":
        offsetsMedium.forEach(offset => {
            this.nodes[id + offset].color = newColor;
            this.nodes[id + 2 * offset].color = newColor;
            squares.push(getSquareById(id + offset));
            squares.push(getSquareById(id + 2 * offset));
        });
        offsetsBig.forEach(offset => {
          this.nodes[id + offset].color = newColor;
          squares.push(getSquareById(id + offset));
        });
        break;
    }

    squares.forEach(square => {
      square.style.backgroundColor = newColor.getRGB();
    });
  }
}
