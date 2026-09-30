import HashMap from "./hashMap.js";

class HashSet {
  #map;

  constructor(loadFactor, capacity) {
    this.#map = new HashMap(loadFactor, capacity);
  }

  get loadFactor() {
    return this.#map.loadFactor;
  }

  get capacity() {
    return this.#map.capacity;
  }

  add(key) {
    this.#map.set(key, true);
  }

  has(key) {
    return this.#map.has(key);
  }

  remove(key) {
    return this.#map.remove(key);
  }

  length() {
    return this.#map.length();
  }

  clear() {
    this.#map.clear();
  }

  keys() {
    return this.#map.keys();
  }
}

export default HashSet;
