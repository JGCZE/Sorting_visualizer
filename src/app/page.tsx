"use client"
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { useEffect } from "react";

const Home = () => {
  const { arrayToSort, isSorting } = useSortingAlgorithmContext()

  useEffect(() => {
    console.log(arrayToSort)
    console.log(isSorting)
  }, [])
  
  return (
    <div>
      hello
    </div>
  );
}

export default Home;