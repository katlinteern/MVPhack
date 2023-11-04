import { ComposableMap, Geographies, Geography, Sphere } from 'react-simple-maps';

import geoJson from './countries-110m.json';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from "react";
import { CountryData, DataPointType } from "@/app/api/data/types";
import YearSlider from '@/app/components/YearSlider';

// @ts-ignore
const colorScale: (datapoint: number) => string = scaleLinear()
  .domain([0, 5000])
  // @ts-ignore
  .range(["#86CEFA", "#003396"]);

const WorldMap = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [year, setYear] = useState<number>(2023);
  const [dataKey, setDataKey] = useState<DataPointType>('gdp');

  const minYear = 2000;
  const maxYear = 2030;

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  useEffect(() => {
    (
      async () => {
        const apiResponse = await fetch('./api/data');
        const jsonData = await apiResponse.json();
        setCountries(jsonData);
      }
    )()
  }, [])

  if (!countries) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
        <YearSlider
          minYear={minYear}
          maxYear={maxYear}
          selectedYear={year}
          onYearChange={handleYearChange}
        />
   
        <ComposableMap projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}>
          {/*@ts-ignore */}
          <Geographies geography={geoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryData = countries[geo.id];
                // @ts-ignore
                const dataPoint: number = countryData && countryData.data && countryData.data[year] && countryData.data[year][dataKey];

                return (<Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="Geography"
                    fill={dataPoint ? colorScale(dataPoint) : "#85868a"}
                  />
                )})
            }
          </Geographies>
        </ComposableMap>
      </div>
  )
}

export default WorldMap;