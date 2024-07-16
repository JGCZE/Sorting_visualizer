"use client"
import { SortingAlgorithmType } from "@/lib/types";
import { generateRandomNumberFromInterval, MAX_ANIMATION_SPEED } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface SortingAlgorithmContextType {
  animationSpeed: number,
  arrayToSort: Array<number>,
  isAnimationComplete: boolean,
  isSorting: boolean,
  resetArrayAndAnimation: () => void,
  runAnimation: () => void,
  selectedAlgorithm: SortingAlgorithmType,
  setAnimationSpeed: (speed: number) => void,
  setIsAnimationComplete: (isComplete: boolean) => void,
  setIsSorting: (isSorting: boolean) => void,
  setSetselectedAlgorithm: (algorithm: SortingAlgorithmType) => void,
  setArrayToSort: (array: Array<number>) => void,
}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined)

export const SortingAlgorithmProvider = ({ children }: {children: React.ReactNode }) => {
  const [arrayToSort, setArrayToSort] = useState<Array<number>>([])
  const [selectedAlgorithm, setSetselectedAlgorithm] = useState<SortingAlgorithmType>("bubble")
  const [isSorting, setIsSorting] = useState<boolean>(false)
  const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED)
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false)

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
  }

  const runAnimation = () => {}

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
