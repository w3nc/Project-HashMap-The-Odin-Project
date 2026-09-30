import HashMap from "./hashMap.js";

const FRUITS = [
  ["apple", "red"],
  ["banana", "yellow"],
  ["carrot", "orange"],
  ["dog", "brown"],
  ["elephant", "gray"],
  ["frog", "green"],
  ["grape", "purple"],
  ["hat", "black"],
  ["ice cream", "white"],
  ["jacket", "blue"],
  ["kite", "pink"],
  ["lion", "golden"],
];

const MORE_KEYS = [
  ["milk", "white"],
  ["nut", "brown"],
  ["orange", "orange"],
  ["pear", "green"],
  ["quince", "yellow"],
  ["raspberry", "red"],
  ["strawberry", "red"],
  ["tomato", "red"],
  ["ugli fruit", "green"],
  ["vanilla", "white"],
  ["watermelon", "green"],
  ["yam", "brown"],
];

const mapOf = (pairs) => {
  const map = new HashMap();

  pairs.forEach(([key, value]) => map.set(key, value));

  return map;
};

describe("HashMap", () => {
  test("starts empty with a 0.75 load factor and 16 buckets", () => {
    const map = new HashMap();

    expect(map.length()).toBe(0);
    expect(map.loadFactor).toBe(0.75);
    expect(map.capacity).toBe(16);
    expect(map.keys()).toEqual([]);
  });

  test("takes a custom load factor and capacity", () => {
    const map = new HashMap(0.5, 4);

    expect(map.loadFactor).toBe(0.5);
    expect(map.capacity).toBe(4);
  });

  test("refuses a load factor that is not a positive number", () => {
    expect(() => new HashMap(0, 16)).toThrow(RangeError);
    expect(() => new HashMap(-0.5, 16)).toThrow(RangeError);
  });

  test("refuses a capacity that is not a positive integer", () => {
    expect(() => new HashMap(0.75, 0)).toThrow(RangeError);
    expect(() => new HashMap(0.75, 1.5)).toThrow(RangeError);
  });

  describe("hash", () => {
    test("returns a bucket index rather than the raw hash code", () => {
      const map = new HashMap();

      expect(map.hash("apple")).toBe(10);
      expect(map.hash("banana")).toBe(5);
      expect(map.hash("ice cream")).toBe(13);
    });

    test("folds the hash code into whatever the current capacity is", () => {
      const map = new HashMap(0.75, 32);

      expect(map.hash("apple")).toBe(26);
      expect(map.hash("banana")).toBe(5);
    });

    test("gives the lesson's Rama and Sita the same index", () => {
      const map = new HashMap();

      expect(map.hash("Rama")).toBe(3);
      expect(map.hash("Sita")).toBe(3);
    });

    test("hashes an empty key to the first bucket", () => {
      expect(new HashMap().hash("")).toBe(0);
    });

    test("stays a whole number inside the buckets for a very long key", () => {
      const map = new HashMap();
      const index = map.hash("a".repeat(5000));

      expect(Number.isInteger(index)).toBe(true);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(map.capacity);
    });

    test("keeps every one of the assignment's keys inside the buckets", () => {
      const map = new HashMap();

      FRUITS.forEach(([key]) => {
        const index = map.hash(key);

        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(map.capacity);
      });
    });

    test("is stable for the same key", () => {
      const map = new HashMap();

      expect(map.hash("apple")).toBe(map.hash("apple"));
    });
  });
  describe("set and get", () => {
    test("stores a value under its key", () => {
      const map = new HashMap();

      map.set("apple", "red");

      expect(map.get("apple")).toBe("red");
      expect(map.length()).toBe(1);
    });

    test("returns undefined for a key that was never stored", () => {
      expect(mapOf(FRUITS).get("mango")).toBeUndefined();
    });

    test("overwrites the value of an existing key without adding an entry", () => {
      const map = mapOf(FRUITS);

      map.set("apple", "green");

      expect(map.get("apple")).toBe("green");
      expect(map.length()).toBe(12);
      expect(map.capacity).toBe(16);
    });

    test("keeps a stored undefined apart from a missing key", () => {
      const map = new HashMap();

      map.set("ghost", undefined);

      expect(map.get("ghost")).toBeUndefined();
      expect(map.get("ghost")).not.toBeNull();
      expect(map.has("ghost")).toBe(true);
      expect(map.length()).toBe(1);
    });

    test("holds keys that collide in one bucket side by side", () => {
      const map = new HashMap();

      map.set("Rama", "blue");
      map.set("Sita", "gold");

      expect(map.hash("Rama")).toBe(map.hash("Sita"));
      expect(map.get("Rama")).toBe("blue");
      expect(map.get("Sita")).toBe("gold");
      expect(map.length()).toBe(2);
    });

    test("treats a repeated key as an update even when it shares a bucket", () => {
      const map = new HashMap();

      map.set("Rama", "blue");
      map.set("Sita", "gold");
      map.set("Rama", "red");

      expect(map.get("Rama")).toBe("red");
      expect(map.get("Sita")).toBe("gold");
      expect(map.length()).toBe(2);
    });

    test("keeps the colliding grape and hat entries apart", () => {
      const map = mapOf(FRUITS);

      expect(map.hash("grape")).toBe(11);
      expect(map.hash("hat")).toBe(11);
      expect(map.get("grape")).toBe("purple");
      expect(map.get("hat")).toBe("black");
    });
  });

  describe("has", () => {
    test("reports whether a key is stored", () => {
      const map = mapOf(FRUITS);

      expect(map.has("kite")).toBe(true);
      expect(map.has("pink")).toBe(false);
    });

    test("reports a key that only looks similar", () => {
      const map = mapOf(FRUITS);

      expect(map.has("ice")).toBe(false);
      expect(map.has("ice cream")).toBe(true);
    });

    test("reports an empty map as empty", () => {
      expect(new HashMap().has("apple")).toBe(false);
    });
  });

  describe("remove", () => {
    test("removes the entry and returns true", () => {
      const map = mapOf(FRUITS);

      expect(map.remove("apple")).toBe(true);
      expect(map.has("apple")).toBe(false);
      expect(map.get("apple")).toBeUndefined();
      expect(map.length()).toBe(11);
    });

    test("returns false and changes nothing for a missing key", () => {
      const map = mapOf(FRUITS);

      expect(map.remove("mango")).toBe(false);
      expect(map.length()).toBe(12);
      expect(map.capacity).toBe(16);
    });

    test("leaves the other key in a shared bucket behind", () => {
      const map = mapOf(FRUITS);

      map.remove("grape");

      expect(map.has("hat")).toBe(true);
      expect(map.get("hat")).toBe("black");
      expect(map.length()).toBe(11);
    });

    test("lets a removed key be stored again", () => {
      const map = mapOf(FRUITS);

      map.remove("dog");
      map.set("dog", "black");

      expect(map.get("dog")).toBe("black");
      expect(map.length()).toBe(12);
    });

    test("returns false the second time a key is removed", () => {
      const map = mapOf(FRUITS);

      expect(map.remove("lion")).toBe(true);
      expect(map.remove("lion")).toBe(false);
      expect(map.length()).toBe(11);
    });
  });
  describe("growing", () => {
    test("stays at 16 buckets while the load factor is only reached", () => {
      const map = mapOf(FRUITS);

      expect(map.length() / map.capacity).toBe(0.75);
      expect(map.capacity).toBe(16);
    });

    test("doubles the capacity once the load factor is passed", () => {
      const map = mapOf(FRUITS);

      map.set("moon", "silver");

      expect(map.length()).toBe(13);
      expect(map.capacity).toBe(32);
    });

    test("drops the load well below the factor after growing", () => {
      const map = mapOf(FRUITS);

      map.set("moon", "silver");

      expect(map.loadFactor).toBe(0.75);
      expect(map.length() / map.capacity).toBeLessThan(map.loadFactor);
      expect(map.length() / map.capacity).toBeCloseTo(13 / 32);
    });

    test("rehashes every entry so none is left behind", () => {
      const map = mapOf(FRUITS);

      map.set("moon", "silver");

      FRUITS.forEach(([key, value]) => expect(map.get(key)).toBe(value));
      expect(map.get("moon")).toBe("silver");
    });

    test("sends an entry to a new bucket once the capacity doubles", () => {
      const map = mapOf(FRUITS);

      expect(map.hash("apple")).toBe(10);

      map.set("moon", "silver");

      expect(map.hash("apple")).toBe(26);
    });

    test("keeps a collision colliding after growing", () => {
      const map = new HashMap();

      map.set("Rama", "blue");
      map.set("Sita", "gold");
      map.set("moon", "silver");

      expect(map.hash("Rama")).toBe(map.hash("Sita"));
      expect(map.get("Rama")).toBe("blue");
      expect(map.get("Sita")).toBe("gold");
    });

    test("only updates when a key is overwritten after growing", () => {
      const map = mapOf(FRUITS);

      map.set("moon", "silver");
      map.set("lion", "tawny");
      map.set("moon", "gray");

      expect(map.get("lion")).toBe("tawny");
      expect(map.get("moon")).toBe("gray");
      expect(map.length()).toBe(13);
      expect(map.capacity).toBe(32);
    });

    test("doubles again when the next limit is passed", () => {
      const map = mapOf([...FRUITS, ["moon", "silver"]]);

      MORE_KEYS.forEach(([key, value]) => map.set(key, value));

      expect(map.length()).toBe(25);
      expect(map.capacity).toBe(64);
      MORE_KEYS.forEach(([key, value]) => expect(map.get(key)).toBe(value));
    });
  });

  describe("length", () => {
    test("counts the stored keys", () => {
      expect(new HashMap().length()).toBe(0);
      expect(mapOf(FRUITS).length()).toBe(12);
    });

    test("counts a key once no matter how often it is overwritten", () => {
      const map = mapOf(FRUITS);

      map.set("apple", "green");
      map.set("apple", "yellow");

      expect(map.length()).toBe(12);
    });

    test("drops by one for every removed key", () => {
      const map = mapOf(FRUITS);

      map.remove("apple");
      map.remove("banana");
      map.remove("mango");

      expect(map.length()).toBe(10);
    });
  });

  describe("clear", () => {
    test("removes every key and value", () => {
      const map = mapOf(FRUITS);

      map.clear();

      expect(map.length()).toBe(0);
      expect(map.keys()).toEqual([]);
      expect(map.values()).toEqual([]);
      expect(map.entries()).toEqual([]);
      expect(map.get("apple")).toBeUndefined();
      expect(map.has("apple")).toBe(false);
    });

    test("keeps the capacity the map had grown to", () => {
      const map = mapOf([...FRUITS, ["moon", "silver"]]);

      map.clear();

      expect(map.capacity).toBe(32);
    });

    test("leaves a map that can be filled again", () => {
      const map = mapOf(FRUITS);

      map.clear();
      map.set("apple", "red");

      expect(map.get("apple")).toBe("red");
      expect(map.length()).toBe(1);
      expect(map.capacity).toBe(16);
    });
  });

  describe("keys, values and entries", () => {
    test("returns every key, value and pair", () => {
      const map = mapOf(FRUITS);

      expect(map.keys().slice().sort()).toEqual(
        FRUITS.map(([key]) => key).sort(),
      );
      expect(map.values().slice().sort()).toEqual(
        FRUITS.map(([, value]) => value).sort(),
      );
      expect(
        map
          .entries()
          .map(([key]) => key)
          .sort(),
      ).toEqual(map.keys().sort());
    });

    test("pairs every entry with the value get returns", () => {
      const map = mapOf(FRUITS);

      map.entries().forEach(([key, value]) => expect(map.get(key)).toBe(value));
    });

    test("lines values up with keys", () => {
      const map = mapOf(FRUITS);

      expect(map.values()).toEqual(map.keys().map((key) => map.get(key)));
    });

    test("does not preserve insertion order", () => {
      const map = mapOf(FRUITS);

      expect(map.keys()).not.toEqual(FRUITS.map(([key]) => key));
      expect(map.keys()).toEqual([
        "elephant",
        "carrot",
        "frog",
        "banana",
        "apple",
        "grape",
        "hat",
        "dog",
        "lion",
        "ice cream",
        "jacket",
        "kite",
      ]);
    });

    test("returns copies that cannot reach into the buckets", () => {
      const map = mapOf(FRUITS);
      const entries = map.entries();
      const keys = map.keys();

      entries[0][1] = "corrupted";
      entries.push(["ghost", "corrupted"]);
      keys.push("corrupted");

      expect(map.get(entries[0][0])).toBe("gray");
      expect(map.get("ghost")).toBeUndefined();
      expect(map.keys()).not.toContain("corrupted");
      expect(map.length()).toBe(12);
    });
  });
});
