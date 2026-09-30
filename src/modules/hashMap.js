const DEFAULT_LOAD_FACTOR = 0.75;
const DEFAULT_CAPACITY = 16;

class HashMap {
  #loadFactor;
  #capacity;
  #buckets;
  #count;

  constructor(loadFactor = DEFAULT_LOAD_FACTOR, capacity = DEFAULT_CAPACITY) {
    if (!Number.isFinite(loadFactor) || loadFactor <= 0) {
      throw new RangeError(
        `Load factor must be a positive number, got ${loadFactor}.`,
      );
    }

    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError(
        `Capacity must be a positive integer, got ${capacity}.`,
      );
    }

    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#buckets = Array.from({ length: capacity }, () => []);
    this.#count = 0;
  }

  get loadFactor() {
    return this.#loadFactor;
  }

  get capacity() {
    return this.#capacity;
  }

  hash(key) {
    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    this.#insert(key, value);

    if (this.#count > this.#capacity * this.#loadFactor) {
      this.#grow();
    }
  }

  get(key) {
    return this.#entryFor(key)?.[1];
  }

  has(key) {
    return this.#entryFor(key) !== undefined;
  }

  remove(key) {
    const bucket = this.#bucketAt(this.hash(key));
    const index = bucket.findIndex(([entryKey]) => entryKey === key);

    if (index === -1) return false;

    bucket.splice(index, 1);
    this.#count -= 1;

    return true;
  }

  length() {
    return this.#count;
  }

  clear() {
    this.#buckets = Array.from({ length: this.#capacity }, () => []);
    this.#count = 0;
  }

  keys() {
    return this.entries().map(([key]) => key);
  }

  values() {
    return this.entries().map(([, value]) => value);
  }

  entries() {
    // fresh pairs
    return this.#buckets.flatMap((bucket) =>
      bucket.map(([key, value]) => [key, value]),
    );
  }

  #insert(key, value) {
    const bucket = this.#bucketAt(this.hash(key));
    const entry = bucket.find(([entryKey]) => entryKey === key);

    if (entry === undefined) {
      bucket.push([key, value]);
      this.#count += 1;

      return;
    }

    entry[1] = value;
  }

  #entryFor(key) {
    return this.#bucketAt(this.hash(key)).find(
      ([entryKey]) => entryKey === key,
    );
  }

  #grow() {
    const entries = this.entries();

    this.#capacity *= 2;
    this.#buckets = Array.from({ length: this.#capacity }, () => []);
    this.#count = 0;

    
    for (const [key, value] of entries) {
      this.#insert(key, value);
    }
  }

  #bucketAt(index) {
    
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.#buckets[index];
  }
}

export default HashMap;
