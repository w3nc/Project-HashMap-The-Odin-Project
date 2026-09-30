# Project-HashMap-The-Odin-Project

Hash map project for The Odin Project: a HashMap class that hashes keys into its
own bucket array, grows and rehashes once the load factor passes 0.75.

Additional Feature:

- HashSet built on top of it.

## Modules

The source files use ES module syntax (`import` / `export default`).

## Scripts

`npm test`

`npm run lint`

`npm run lint:fix`

`npm run format`

`npm run format:check`

`npm run demo`

## API

`HashMap`

Starts with a 0.75 load factor and 16 buckets; `new HashMap(loadFactor, capacity)` overrides either.

`loadFactor` = the load the map grows past, 0.75 by default.

`capacity` = number of buckets, doubled and rehashed once that load is passed.

`hash(key)` = folds the key's hash code into the current capacity and returns the bucket index.

`set(key, value)` = stores the pair, overwriting the value when the key exists, and doubles the buckets once the load factor is passed.

`get(key)` = stored value, undefined when the key is missing.

`has(key)` = true when the key is stored, false otherwise.

`remove(key)` = true when the entry is removed, false when the key is missing.

`length()` = number of stored entries.

`clear()` = removes every entry, keeping the current capacity.

`keys()` = array of the stored keys.

`values()` = array of the stored values.

`entries()` = array of [ key, value ] pairs.

`HashSet`

Built on a HashMap, so it grows the same way but holds keys only.

`add(key)` = stores the key, ignoring duplicates.

`has(key)` = true when the key is stored, false otherwise.

`remove(key)` = true when the key is removed, false when the key is missing.

`length()` = number of stored keys.

`clear()` = removes every key.

`keys()` = array of the stored keys.
