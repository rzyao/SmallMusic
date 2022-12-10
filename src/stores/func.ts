export function getIndex(id: string, list: any[]) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.id == id) {
      return index;
    }
  }
  return -1;
}
