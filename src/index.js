import { fileURLToPath } from "node:url";
import HashMap from "./modules/hashMap.js";
import HashSet from "./modules/hashSet.js";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const test = new HashMap();

  const report = (label) => {
    const load = (test.length() / test.capacity).toFixed(2);

    console.log(
      `${label}: length ${test.length()}, capacity ${test.capacity}, load ${load}`,
    );
  };

  test.set("apple", "red");
  test.set("banana", "yellow");
  test.set("carrot", "orange");
  test.set("dog", "brown");
  test.set("elephant", "gray");
  test.set("frog", "green");
  test.set("grape", "purple");
  test.set("hat", "black");
  test.set("ice cream", "white");
  test.set("jacket", "blue");
  test.set("kite", "pink");
  test.set("lion", "golden");

  report("after the assignment's 12 entries");
  console.log(
    "get('grape'):",
    test.get("grape"),
    "| get('lion'):",
    test.get("lion"),
  );

  test.set("apple", "green");
  test.set("banana", "brown");

  report("after overwriting apple and banana");

  test.set("moon", "silver");

  report("after adding moon");

  test.set("lion", "tawny");

  report("after overwriting lion");

  console.log(
    "get('moon'):",
    test.get("moon"),
    "| get('apple'):",
    test.get("apple"),
  );
  console.log(
    "get('missing'):",
    test.get("missing"),
    "| has('moon'):",
    test.has("moon"),
  );
  console.log("has('missing'):", test.has("missing"));
  console.log("keys():", test.keys());
  console.log("values():", test.values());
  console.log("entries():", test.entries());
  console.log(
    "remove('moon'):",
    test.remove("moon"),
    "| remove('moon') again:",
    test.remove("moon"),
  );
  console.log("length():", test.length());

  test.clear();

  report("after clear()");

  const set = new HashSet();

  set.add("apple");
  set.add("banana");
  set.add("apple");
  set.add("Rama");
  set.add("Sita");

  console.log(
    "hash set length:",
    set.length(),
    "| has('apple'):",
    set.has("apple"),
  );
  console.log(
    "hash set keys():",
    set.keys(),
    "| get is not part of the set:",
    typeof set.get,
  );
  console.log(
    "hash set remove('apple'):",
    set.remove("apple"),
    "| length:",
    set.length(),
  );
}
