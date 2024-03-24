export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const tomb: Item[] = [];
  for (const item of array) {
    let exists = false;
    for (const vizsgaltelem of tomb) {
      if (vizsgaltelem.id === item.id) { //&& vizsgaltelem.name === item.name) { gondolom nincs 2 azonos id
        exists = true;
        break;
      }
    }
    if (!exists) {
      tomb.push(item);
    }
  }
  return tomb;
};
