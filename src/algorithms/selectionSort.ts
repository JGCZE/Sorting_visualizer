import { AnimationArrayType } from "@/lib/types";

function runSelectionSort(array: Array<number>, animations: AnimationArrayType) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = 0; j < array.length; j++) {
      animations.push([[j, minIndex], false])
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }      
    }
    animations.push([[i, array[minIndex]], true]);
    animations.push([[minIndex, array[i]], true]);
    [array[i], array[minIndex]] = [array[minIndex], array[i]]
  }
}

export function generateSelectionSortAnimationArray (
  isSorting: boolean,
  array: Array<number>,
  runAnimation: (animations: AnimationArrayType) => void,
) {
  if (isSorting) return

  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice()
  runSelectionSort(auxiliaryArray, animations)
  runAnimation(animations)
}