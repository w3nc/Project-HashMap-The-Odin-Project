import { fileURLToPath } from "node:url";
import LinkedList from "./modules/linkedList.js";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const animals = ["dog", "cat", "parrot", "hamster", "snake", "turtle"];
  const list = new LinkedList();

  animals.forEach((animal) => list.append(animal));
  console.log(list.toString());
}
