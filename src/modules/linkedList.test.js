import Node from "./node.js";
import LinkedList from "./linkedList.js";


const listFrom = (...values) => {
  const list = new LinkedList();

  values.forEach((value) => list.append(value));

  return list;
};

describe("LinkedList", () => {
  describe("append", () => {
    test("makes the first value both the head and the tail", () => {
      const list = new LinkedList();

      list.append("dog");

      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("dog");
    });

    test("adds every later value to the end", () => {
      const list = listFrom("dog", "cat", "parrot");

      expect(list.tail()).toBe("parrot");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
    });

    test("grows size() by one each time", () => {
      const list = new LinkedList();

      expect(list.size()).toBe(0);

      list.append(1);
      list.append(2);

      expect(list.size()).toBe(2);
    });

    test("keeps two lists from sharing nodes", () => {
      const first = listFrom(1);
      const second = listFrom(2);

      first.append(3);

      expect(second.toString()).toBe("( 2 ) -> null");
      expect(first.toString()).toBe("( 1 ) -> ( 3 ) -> null");
    });
  });

  describe("prepend", () => {
    test("fills an empty list the same way append does", () => {
      const list = new LinkedList();

      list.prepend("dog");

      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("dog");
      expect(list.size()).toBe(1);
    });

    test("puts the new value at the front", () => {
      const list = listFrom("cat");

      list.prepend("dog");

      expect(list.head()).toBe("dog");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("reverses the order when it is called repeatedly", () => {
      const list = new LinkedList();

      [1, 2, 3].forEach((value) => list.prepend(value));

      expect(list.toString()).toBe("( 3 ) -> ( 2 ) -> ( 1 ) -> null");
      expect(list.tail()).toBe(1);
    });
  });

  describe("size", () => {
    test("is 0 for a brand new list", () => {
      expect(new LinkedList().size()).toBe(0);
    });

    test("counts appended and prepended nodes alike", () => {
      const list = listFrom(1, 2);

      list.prepend(0);
      list.append(3);

      expect(list.size()).toBe(4);
    });
  });

  describe("head and tail", () => {
    test("hand back values rather than nodes", () => {
      const list = listFrom("dog", "cat");

      expect(list.head()).toBe("dog");
      expect(list.head()).not.toBeInstanceOf(Node);
    });

    test("track the ends of a longer list", () => {
      const list = listFrom("dog", "cat", "parrot");

      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("parrot");
    });

    test("agree with each other while the list holds one node", () => {
      const list = listFrom(42);

      expect(list.head()).toBe(42);
      expect(list.tail()).toBe(42);
    });

    test("return undefined once the list is empty", () => {
      const list = new LinkedList();

      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
    });
  });

  describe("at", () => {
    test("returns the value at each valid index", () => {
      const list = listFrom("dog", "cat", "parrot");

      expect(list.at(0)).toBe("dog");
      expect(list.at(1)).toBe("cat");
      expect(list.at(2)).toBe("parrot");
    });

    test("returns undefined past the end and below zero", () => {
      const list = listFrom(1, 2);

      expect(list.at(2)).toBeUndefined();
      expect(list.at(99)).toBeUndefined();
      expect(list.at(-1)).toBeUndefined();
    });

    test("returns undefined on an empty list", () => {
      expect(new LinkedList().at(0)).toBeUndefined();
    });
  });

  describe("pop", () => {
    test("removes the head and hands back its value", () => {
      const list = listFrom("dog", "cat");

      expect(list.pop()).toBe("dog");
      expect(list.head()).toBe("cat");
      expect(list.size()).toBe(1);
    });

    test("leaves the rest of the list in order", () => {
      const list = listFrom(1, 2, 3);

      list.pop();

      expect(list.toString()).toBe("( 2 ) -> ( 3 ) -> null");
    });

    test("forgets both ends once the last node is gone", () => {
      const list = listFrom("dog");

      expect(list.pop()).toBe("dog");
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.size()).toBe(0);
    });

    test("returns undefined on an empty list", () => {
      const list = new LinkedList();

      expect(list.pop()).toBeUndefined();
      expect(list.size()).toBe(0);
    });
  });

  describe("contains", () => {
    test("finds the first, middle and last values", () => {
      const list = listFrom("dog", "cat", "parrot");

      expect(list.contains("dog")).toBe(true);
      expect(list.contains("cat")).toBe(true);
      expect(list.contains("parrot")).toBe(true);
    });

    test("returns false for a value that was never added", () => {
      expect(listFrom(1, 2, 3).contains(4)).toBe(false);
    });

    test("returns false on an empty list", () => {
      expect(new LinkedList().contains("dog")).toBe(false);
    });

    test("compares values strictly", () => {
      const list = listFrom(10, "20");

      expect(list.contains(10)).toBe(true);
      expect(list.contains("10")).toBe(false);
      expect(list.contains(20)).toBe(false);
    });
  });

  describe("findIndex", () => {
    test("returns 0 for the value held by the head", () => {
      expect(listFrom("dog", "cat").findIndex("dog")).toBe(0);
    });

    test("returns the position of a value further along", () => {
      expect(listFrom("dog", "cat", "parrot").findIndex("parrot")).toBe(2);
    });

    test("settles for the first of several matching nodes", () => {
      expect(listFrom("cat", "dog", "cat").findIndex("cat")).toBe(0);
    });

    test("returns -1 when the value is missing", () => {
      expect(listFrom(1, 2).findIndex(3)).toBe(-1);
      expect(new LinkedList().findIndex(1)).toBe(-1);
    });
  });

  describe("toString", () => {
    test("returns an empty string for an empty list", () => {
      expect(new LinkedList().toString()).toBe("");
    });

    test("wraps a single value", () => {
      expect(listFrom(10).toString()).toBe("( 10 ) -> null");
    });

    test("prints the assignment's example animals", () => {
      const animals = ["dog", "cat", "parrot", "hamster", "snake", "turtle"];

      expect(listFrom(...animals).toString()).toBe(
        "( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null",
      );
    });

    test("leaves the list untouched", () => {
      const list = listFrom(1, 2);

      list.toString();

      expect(list.size()).toBe(2);
      expect(list.head()).toBe(1);
      expect(list.tail()).toBe(2);
    });
  });

  describe("insertAt", () => {
    test("inserts a value in the middle", () => {
      const list = listFrom(1, 2, 3);

      list.insertAt(1, 10);

      expect(list.toString()).toBe("( 1 ) -> ( 10 ) -> ( 2 ) -> ( 3 ) -> null");
    });

    test("keeps several values in the order they were given", () => {
      const list = listFrom(1, 2, 3);

      list.insertAt(1, 10, 11);

      expect(list.toString()).toBe(
        "( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null",
      );
      expect(list.size()).toBe(5);
    });

    test("takes over the head slot at index 0", () => {
      const list = listFrom("cat");

      list.insertAt(0, "dog");

      expect(list.head()).toBe("dog");
      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
    });

    test("appends and moves the tail when the index is size()", () => {
      const list = listFrom(1, 2);

      list.insertAt(2, 3, 4);

      expect(list.tail()).toBe(4);
      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null");
    });

    test("can fill an empty list", () => {
      const list = new LinkedList();

      list.insertAt(0, "dog", "cat");

      expect(list.toString()).toBe("( dog ) -> ( cat ) -> null");
      expect(list.head()).toBe("dog");
      expect(list.tail()).toBe("cat");
      expect(list.size()).toBe(2);
    });

    test("leaves the list alone when no values are given", () => {
      const list = listFrom(1, 2);

      list.insertAt(1);

      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> null");
      expect(list.size()).toBe(2);
    });

    test("throws a RangeError for an index it cannot reach", () => {
      const list = listFrom(1, 2);

      expect(() => list.insertAt(-1, 0)).toThrow(RangeError);
      expect(() => list.insertAt(3, 0)).toThrow(RangeError);
      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> null");
      expect(list.size()).toBe(2);
    });
  });

  describe("removeAt", () => {
    test("removes the head at index 0", () => {
      const list = listFrom("dog", "cat");

      expect(list.removeAt(0)).toBe("dog");
      expect(list.toString()).toBe("( cat ) -> null");
    });

    test("removes from the middle and re-links its neighbours", () => {
      const list = listFrom(1, 2, 3);

      expect(list.removeAt(1)).toBe(2);
      expect(list.toString()).toBe("( 1 ) -> ( 3 ) -> null");
      expect(list.size()).toBe(2);
    });

    test("moves the tail back when the last node goes", () => {
      const list = listFrom(1, 2, 3);

      expect(list.removeAt(2)).toBe(3);
      expect(list.tail()).toBe(2);
      expect(list.size()).toBe(2);
    });

    test("empties a list that holds a single node", () => {
      const list = listFrom("dog");

      expect(list.removeAt(0)).toBe("dog");
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.size()).toBe(0);
    });

    test("throws a RangeError for an index that holds no node", () => {
      const list = listFrom(1, 2);

      expect(() => list.removeAt(-1)).toThrow(RangeError);
      expect(() => list.removeAt(2)).toThrow(RangeError);
      expect(() => new LinkedList().removeAt(0)).toThrow(RangeError);
      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> null");
    });
  });

  test("keeps size() and the printed list in step through mixed edits", () => {
    const list = new LinkedList();

    list.append(2);
    list.prepend(1);
    list.insertAt(2, 3);
    list.removeAt(0);
    list.pop();

    expect(list.toString()).toBe("( 3 ) -> null");
    expect(list.size()).toBe(1);
    expect(list.head()).toBe(3);
    expect(list.tail()).toBe(3);
  });
});
