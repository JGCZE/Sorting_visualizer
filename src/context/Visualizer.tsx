"use client"
import { AnimationArrayType, SortingAlgorithmType } from "@/lib/types";
import { generateRandomNumberFromInterval, MAX_ANIMATION_SPEED } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface SortingAlgorithmContextType {
  animationSpeed: number,
  arrayToSort: Array<number>,
  isAnimationComplete: boolean,
  isSorting: boolean,
  resetArrayAndAnimation: () => void,
  selectedAlgorithm: SortingAlgorithmType,
  setAnimationSpeed: (speed: number) => void,
  setIsAnimationComplete: (isComplete: boolean) => void,
  setIsSorting: (isSorting: boolean) => void,
  setSetselectedAlgorithm: (algorithm: SortingAlgorithmType) => void,
  setArrayToSort: (array: Array<number>) => void,
  runAnimation: (animations: AnimationArrayType) => void;
  requiresReset: boolean,
}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined)

export const SortingAlgorithmProvider = ({ children }: {children: React.ReactNode }) => {
  const [arrayToSort, setArrayToSort] = useState<Array<number>>([])
  const [selectedAlgorithm, setSetselectedAlgorithm] = useState<SortingAlgorithmType>("bubble")
  const [isSorting, setIsSorting] = useState<boolean>(false)
  const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED)
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false)

  const requiresReset = isAnimationComplete || isSorting;

  useEffect(() => {
    resetArrayAndAnimation()
    window.addEventListener("resize", resetArrayAndAnimation)

    return () => {
      window.addEventListener("resize", resetArrayAndAnimation)
    }
  }, [])

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: Array<number> = [];
    const numLines = contentContainerWidth / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100)

    for (let i = 0; i < numLines; i++){
      tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
    }

    setArrayToSort(tempArray)
    setIsAnimationComplete(false)
    setIsSorting(false)

    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >=  0; i--) {
        window.clearTimeout(i)
      }
    }, 0)

    setTimeout(() => {
      const arrayLines = document.getElementsByClassName(
        "array-lines"
      )
      for (let i = 0; i < arrayLines.length; i++) {
        arrayLines[i].classList.add("change-line-color");
        arrayLines[i].classList.remove("default-line-color")
      }
    })
  }

  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true)

    const invertSpeed = (1 / animationSpeed) * 200;
    const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>

    const updateClassList = (
      indexes: Array<number>,
      addClassName: string,
      removeClassName: string,
    ) => (
      indexes.forEach((index) => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName)
      })
    )

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined,
    ) => {
      if (newHeight === undefined) return 
      arrayLines[lineIndex].style.height = `${newHeight}px`
    }

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap] = animation;

        if (!isSwap) {
          updateClassList(values, "change-line-color", "default-line-color")
          setTimeout(() => {
            updateClassList(values, "default-line-color", "change-line-color")
          }, invertSpeed)
        } else {
          const [lineIndex, newHeight] = values
          updateHeightValue(lineIndex, newHeight)
        }
      }, index * invertSpeed )
    })

    const finalTimeout = animations.length * invertSpeed;

    setTimeout(() => {
      Array.from(arrayLines).forEach((line) => {
        line.classList.add("pulse-animation", "change-line-color");
        line.classList.remove("default-line-color")
      })

      setTimeout(() => {
        Array.from(arrayLines).forEach((line) => {
          line.classList.add("pulse-animation", "change-line-color");
          line.classList.remove("default-line-color")
        })
        setIsSorting(false)
        setIsAnimationComplete(true)
      }, 1000)
    }, finalTimeout)
  }

  const value = {
    animationSpeed,
    arrayToSort,
    isAnimationComplete,
    isSorting,
    resetArrayAndAnimation,
    runAnimation,
    selectedAlgorithm,
    setAnimationSpeed,
    setIsAnimationComplete,
    setIsSorting,
    setSetselectedAlgorithm,
    setArrayToSort,
    requiresReset,
  };
  

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  )
}

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext)

  if (!context){
    throw new Error("useSorting Context must be used withing a SortingAlgorithmProvider")
  }

  return context;
}
