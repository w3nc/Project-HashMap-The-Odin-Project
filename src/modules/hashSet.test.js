import HashSet from "./hashSet.js";

const FRUITS = [
  "apple",
  "banana",
  "carrot",
  "dog",
  "elephant",
  "frog",
  "grape",
  "hat",
  "ice cream",
  "jacket",
  "kite",
  "lion",
];

const MORE_KEYS = [
  "milk",
  "nut",
  "orange",
  "pear",
  "quince",
  "raspberry",
  "strawberry",
  "tomato",
  "ugli fruit",
  "vanilla",
  "watermelon",
  "yam",
];

const setOf = (keys) => {
  const set = new HashSet();

  keys.forEach((key) => set.add(key));

  return set;
};

describe("HashSet", () => {
  test("starts empty with a 0.75 load factor and 16 buckets", () => {
    const set = new HashSet();

    expect(set.length()).toBe(0);
    expect(set.loadFactor).toBe(0.75);
    expect(set.capacity).toBe(16);
    expect(set.keys()).toEqual([]);
  });

  test("takes a custom load factor and capacity", () => {
    const set = new HashSet(0.5, 4);

    expect(set.loadFactor).toBe(0.5);
    expect(set.capacity).toBe(4);
  });

  test("stores a key once no matter how often it is added", () => {
    const set = new HashSet();

    set.add("apple");
    set.add("apple");
    set.add("apple");

    expect(set.length()).toBe(1);
    expect(set.has("apple")).toBe(true);
  });

  test("holds the lesson's colliding keys side by side", () => {
    const set = setOf(["Rama", "Sita"]);

    expect(set.length()).toBe(2);
    expect(set.has("Rama")).toBe(true);
    expect(set.has("Sita")).toBe(true);
  });

  test("keeps the colliding grape and hat keys apart", () => {
    const set = setOf(["grape", "hat"]);

    expect(set.length()).toBe(2);
    expect(set.keys().slice().sort()).toEqual(["grape", "hat"]);
  });

  test("reports membership with has", () => {
    const set = setOf(FRUITS);

    expect(set.has("kite")).toBe(true);
    expect(set.has("mango")).toBe(false);
    expect(set.has("pink")).toBe(false);
  });

  test("stores no values, only keys", () => {
    const set = setOf(FRUITS);

    expect(typeof set.get).toBe("undefined");
    expect(typeof set.set).toBe("undefined");
    expect(typeof set.entries).toBe("undefined");
    expect(set.keys()).toEqual(expect.arrayContaining(["apple", "lion"]));
  });

  test("removes a key and reports it", () => {
    const set = setOf(FRUITS);

    expect(set.remove("apple")).toBe(true);
    expect(set.has("apple")).toBe(false);
    expect(set.length()).toBe(11);
  });

  test("returns false when removing a key it never held", () => {
    const set = setOf(FRUITS);

    expect(set.remove("mango")).toBe(false);
    expect(set.length()).toBe(12);
  });

  test("empties itself with clear but keeps its capacity", () => {
    const set = setOf(FRUITS);

    set.clear();

    expect(set.length()).toBe(0);
    expect(set.keys()).toEqual([]);
    expect(set.has("apple")).toBe(false);
    expect(set.capacity).toBe(16);
  });

  test("doubles the capacity once the load factor is passed", () => {
    const set = setOf(FRUITS);

    expect(set.capacity).toBe(16);

    set.add("moon");

    expect(set.length()).toBe(13);
    expect(set.capacity).toBe(32);
    expect(set.length() / set.capacity).toBeLessThan(set.loadFactor);
  });

  test("keeps every key reachable after growing", () => {
    const set = setOf([...FRUITS, "moon"]);

    FRUITS.forEach((key) => expect(set.has(key)).toBe(true));
    expect(set.keys().slice().sort()).toEqual([...FRUITS, "moon"].sort());
  });

  test("doubles again when the next limit is passed", () => {
    const set = setOf([...FRUITS, "moon"]);

    MORE_KEYS.forEach((key) => set.add(key));

    expect(set.length()).toBe(25);
    expect(set.capacity).toBe(64);
    MORE_KEYS.forEach((key) => expect(set.has(key)).toBe(true));
  });

  test("hands out a keys array that cannot reach into the set", () => {
    const set = setOf(["apple"]);
    const keys = set.keys();

    keys.push("ghost");

    expect(set.has("ghost")).toBe(false);
    expect(set.length()).toBe(1);
  });
});
