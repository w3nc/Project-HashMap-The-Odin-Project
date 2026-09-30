import Node from "./node.js";

class LinkedList {
  #head = null;
  #tail = null;
  #length = 0;

  append(value) {
    const node = new Node(value);

    if (this.#head === null) {
      this.#head = node;
    } else {
      this.#tail.nextNode = node;
    }

    this.#tail = node;
    this.#length += 1;
  }

  prepend(value) {
    this.#head = new Node(value, this.#head);

    if (this.#tail === null) {
      this.#tail = this.#head;
    }

    this.#length += 1;
  }

  size() {
    return this.#length;
  }

  head() {
    return this.#head?.value;
  }

  tail() {
    return this.#tail?.value;
  }

  at(index) {
    return this.#nodeAt(index)?.value;
  }

  pop() {
    if (this.#head === null) return undefined;

    const { value } = this.#head;

    this.#head = this.#head.nextNode;
    this.#length -= 1;

    if (this.#head === null) {
      this.#tail = null;
    }

    return value;
  }

  contains(value) {
    return this.findIndex(value) !== -1;
  }

  findIndex(value) {
    let node = this.#head;
    let index = 0;

    while (node !== null) {
      if (node.value === value) return index;

      node = node.nextNode;
      index += 1;
    }

    return -1;
  }

  toString() {
    const parts = [];

    for (let node = this.#head; node !== null; node = node.nextNode) {
      parts.push(`( ${node.value} )`);
    }

    return parts.length === 0 ? "" : `${parts.join(" -> ")} -> null`;
  }

  insertAt(index, ...values) {
    this.#assertInRange(index, this.#length, "insert");
    if (values.length === 0) return;

    const before = index === 0 ? null : this.#nodeAt(index - 1);
    const after = before === null ? this.#head : before.nextNode;
    let previous = before;

    for (const value of values) {
      const node = new Node(value);

      if (previous === null) {
        this.#head = node;
      } else {
        previous.nextNode = node;
      }

      previous = node;
    }

    previous.nextNode = after;
    this.#length += values.length;

    // Inserting past the old tail makes the last new node the new tail
    if (after === null) {
      this.#tail = previous;
    }
  }

  removeAt(index) {
    this.#assertInRange(index, this.#length - 1, "remove");
    if (index === 0) return this.pop();

    const before = this.#nodeAt(index - 1);
    const removed = before.nextNode;

    before.nextNode = removed.nextNode;
    this.#length -= 1;

    if (removed === this.#tail) {
      this.#tail = before;
    }

    return removed.value;
  }

  #nodeAt(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#length) {
      return null;
    }

    let node = this.#head;

    for (let step = 0; step < index; step += 1) {
      node = node.nextNode;
    }

    return node;
  }

  #assertInRange(index, max, action) {
    if (!Number.isInteger(index) || index < 0 || index > max) {
      throw new RangeError(
        `Cannot ${action} at index ${index}: the list holds ${this.#length} node(s).`,
      );
    }
  }
}

export default LinkedList;
