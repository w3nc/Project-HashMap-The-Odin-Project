# Project-Linked-Lists-The-Odin-Project

Linked list project for The Odin Project: a Node class and a LinkedList
class covering the assignment's required methods plus the insertAt /
removeAt extra credit.



## Modules

The source files use ES module syntax (`import` / `export default`).


## Scripts

 npm test          
 npm run test:watch 
 npm run demo     



## API

append(value) = adds a node holding value to the end.  

prepend(value) = adds a node holding value to the start.

size() = number of nodes in the list.

head() = value of the first node, undefined when empty.

tail() = value of the last node, undefined when empty.

at(index) = value at index, undefined when out of range.

pop() = removes the head and returns its value, undefined when empty.

contains(value) = true when the value is in the list.
findIndex(value) = index of the first match, or -1.
                             
toString() = "( dog ) -> ( cat ) -> null", empty string when empty.

insertAt(index, ...values)` = inserts the values at index, RangeError out of bounds.

removeAt(index) = removes the node at index and returns its value, RangeError out of bounds.




