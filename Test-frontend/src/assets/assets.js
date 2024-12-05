import logo from "./logo.jpeg";
import subjectImage from "./subject.png";
import flag from "./flag.jpeg";
import studyImg from "./studyImg.png";
import userImg from "./userImg.jpg";

const questions = [
  {
    question: "What is the time complexity of binary search?",
    answers: [
      { text: "O(n)", correct: false },
      { text: "O(log n)", correct: true },
      { text: "O(n^2)", correct: false },
      { text: "O(n log n)", correct: false },
    ],
  },
  {
    question: "Which data structure uses LIFO order?",
    answers: [
      { text: "Queue", correct: false },
      { text: "Stack", correct: true },
      { text: "Heap", correct: false },
      { text: "Graph", correct: false },
    ],
  },
  {
    question: "What is the best case time complexity of bubble sort?",
    answers: [
      { text: "O(n^2)", correct: false },
      { text: "O(n log n)", correct: false },
      { text: "O(n)", correct: true },
      { text: "O(log n)", correct: false },
    ],
  },
  {
    question: "Which of the following is a self-balancing binary search tree?",
    answers: [
      { text: "Binary Search Tree", correct: false },
      { text: "Red-Black Tree", correct: true },
      { text: "Linked List", correct: false },
      { text: "Hash Table", correct: false },
    ],
  },
  {
    question:
      "What is the maximum number of nodes in a binary tree of height h?",
    answers: [
      { text: "2^h - 1", correct: true },
      { text: "h", correct: false },
      { text: "2h", correct: false },
      { text: "h^2", correct: false },
    ],
  },
  {
    question:
      "Which algorithm is used for finding the shortest path in a graph?",
    answers: [
      { text: "Kruskal's algorithm", correct: false },
      { text: "Dijkstra's algorithm", correct: true },
      { text: "Prim's algorithm", correct: false },
      { text: "Bellman-Ford algorithm", correct: false },
    ],
  },
  {
    question: "What is the time complexity of merging two sorted arrays?",
    answers: [
      { text: "O(n log n)", correct: false },
      { text: "O(n)", correct: true },
      { text: "O(n^2)", correct: false },
      { text: "O(log n)", correct: false },
    ],
  },
  {
    question: "Which data structure is used for BFS traversal of a graph?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Array", correct: false },
      { text: "Heap", correct: false },
    ],
  },
  {
    question: "What is the time complexity of inserting an element in a heap?",
    answers: [
      { text: "O(log n)", correct: true },
      { text: "O(n)", correct: false },
      { text: "O(n log n)", correct: false },
      { text: "O(1)", correct: false },
    ],
  },
  {
    question: "Which algorithm is used to find a minimum spanning tree?",
    answers: [
      { text: "Kruskal's algorithm", correct: true },
      { text: "Dijkstra's algorithm", correct: false },
      { text: "Floyd-Warshall algorithm", correct: false },
      { text: "Ford-Fulkerson algorithm", correct: false },
    ],
  },
  {
    question: "What is the worst-case time complexity of quicksort?",
    answers: [
      { text: "O(n^2)", correct: true },
      { text: "O(n log n)", correct: false },
      { text: "O(n)", correct: false },
      { text: "O(log n)", correct: false },
    ],
  },
  {
    question: "Which data structure is used for DFS traversal of a graph?",
    answers: [
      { text: "Queue", correct: false },
      { text: "Stack", correct: true },
      { text: "Array", correct: false },
      { text: "Heap", correct: false },
    ],
  },
  {
    question:
      "What is the space complexity of an adjacency matrix representation of a graph?",
    answers: [
      { text: "O(V^2)", correct: true },
      { text: "O(V + E)", correct: false },
      { text: "O(V)", correct: false },
      { text: "O(E)", correct: false },
    ],
  },
  {
    question: "What is the time complexity of searching in a hash table?",
    answers: [
      { text: "O(1)", correct: true },
      { text: "O(log n)", correct: false },
      { text: "O(n)", correct: false },
      { text: "O(n log n)", correct: false },
    ],
  },
  {
    question:
      "Which sorting algorithm is based on the divide and conquer paradigm?",
    answers: [
      { text: "Merge sort", correct: true },
      { text: "Bubble sort", correct: false },
      { text: "Insertion sort", correct: false },
      { text: "Selection sort", correct: false },
    ],
  },
];

const assets = {
  logo,
  subjectImage,
  flag,
  studyImg,
  userImg,
  questions,
};
export default assets;
