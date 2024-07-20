import { AnimationArrayType } from "@/lib/types";

function runBubbleSort(array: any, animations: AnimationArrayType) {
  
}

export function generateBubbleSortAnimationArray (
  isSorting: boolean,
  array: Array<number>,
  runAnimation: (animations: AnimationArrayType) => void,
) {
  if (isSorting) return;
  if (array.length <= 1) return []

  const auxiliaryArray = array.slice();

  runBubbleSort(auxiliaryArray, animations)
  runAnimation(animations)
}