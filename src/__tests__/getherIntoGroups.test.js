const gatherIntoGroups = (array, parentId = undefined) => {
  return array
    .filter((a) => a.parentId === parentId)
    .map((a) => {
      if (a.type === "GROUP") {
        return { ...a, childShapes: gatherIntoGroups(array, a.id) };
      } else {
        return a;
      }
    });
};

const DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4, type: "GROUP" },
  { id: 5, parentId: 4 },
  { id: 6, parentId: 4, type: "GROUP" },
  { id: 7, parentId: 6, type: "GROUP" },
  { id: 8, parentId: 7 },
  { id: 9, parentId: 6 },
  { id: 10, parentId: 4 },
  { id: 11 },
];

console.log(JSON.stringify(gatherIntoGroups(DATA, undefined),null,4))

//@ Works fine