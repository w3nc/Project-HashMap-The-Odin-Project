# Project-HashMap-The-Odin-Project

Hash map project for The Odin Project: a HashMap class that hashes keys into its
own bucket array, grows and rehashes once the load factor passes 0.75, plus the
Additional Feature: 
*HashSet built on top of it.



## Modules

The source files use ES module syntax (`import` / `export default`).




## Scripts

 `npm test`

 `npm run demo`



## API

`HashMap`

`hash(key)` = hashes the key and folds it into the bucket range.

`set(key, value)` = stores the pair, overwriting the value when the key exists.

`get(key)` = stored value, null when the key is missing.

`has(key)` = true when the key is stored, false otherwise.

`remove(key)` = true when the entry is removed, false when the key is missing.

`length()` = number of stored entries.

`clear()` = removes every entry.

`keys()` = array of the stored keys.

`values()` = array of the stored values.

`entries()` = array of [ key, value ] pairs.


`HashSet`

`add(key)` = stores the key, ignoring duplicates.

`has(key)` = true when the key is stored, false otherwise.

`remove(key)` = true when the key is removed, false when the key is missing.

`length()` = number of stored keys.

`clear()` = removes every key.

`keys()` = array of the stored keys.
