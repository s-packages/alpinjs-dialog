import Collection from "../dist/index";

const data = new Collection([
  { id: 1, name: "John" },
  { id: 2, name: "Jane", abc: true },
  { id: 3, name: "Joe", range: [1, 10], abc: true },
  { id: 4, name: "Jack" },
  { id: 5, name: "Jill", range: [1, 5] },
  { id: 6, name: "Jim" },
  { id: 7, name: "Jem" },
  { id: 8, name: "Jenny", range: [4, 8] },
  { id: 9, name: "Juan" },
  { id: 10, name: "Jenny" },
]);

let test = data
  .hasField("range")
  .hasNotField("abc")
  .if("id", ">", 1)
  .if("id", "<", 10)
  .ifNot("name", "Jill")
  .inArray("id", [8, 1])
  .arrayInArray("range", [1, 4, 10])
  .arrayNotInArray("range", [7])
  .orderBy("id", "asc")
  .groupBy("name");

console.log(test);
