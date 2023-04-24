import { GraphAdjList } from "./graphAdjList.js";

const testNodes = [
  { id: 1, name: 'Caio' },
  { id: 2, name: 'Lucas' },
];

const graph = new GraphAdjList(testNodes);
graph.createAdjacency(testNodes[0], testNodes[1]);
console.log(graph);

