'use client'

import WorldMap from "@/modules/WorldMap";
import YearSlider from "./components/YearSlider";
import { useState } from "react";

export default function Home() {
  const [year, setYear] = useState<number>(2023);
  
  const minYear = 2000;
  const maxYear = 2030;

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  return (
    <main className="flex">
      <YearSlider
        minYear={minYear}
        maxYear={maxYear}
        selectedYear={year}
        onYearChange={handleYearChange}
      />
   
      <WorldMap year={year}/>
    </main>
  )
}
