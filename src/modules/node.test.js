import Node from "./node.js";

describe("Node", () => {
  test("keeps the value it was created with", () => {
    expect(new Node("dog").value).toBe("dog");
  });

  test("defaults value and nextNode to null", () => {
    const node = new Node();

    expect(node.value).toBeNull();
    expect(node.nextNode).toBeNull();
  });

  test("points at the node handed to the constructor", () => {
    const tail = new Node("cat");
    const head = new Node("dog", tail);

    expect(head.nextNode).toBe(tail);
    expect(head.nextNode.value).toBe("cat");
  });

  test("can be re-pointed at another node", () => {
    const node = new Node("dog");
    const next = new Node("cat");

    node.nextNode = next;

    expect(node.nextNode).toBe(next);
  });

  test("walks a chain until it runs into null", () => {
    const seen = [];
    const head = new Node(1, new Node(2, new Node(3)));

    for (let node = head; node !== null; node = node.nextNode) {
      seen.push(node.value);
    }

    expect(seen).toEqual([1, 2, 3]);
  });
});
