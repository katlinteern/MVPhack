import { ComposableMap, Geographies, Geography, Sphere } from 'react-simple-maps';

import geoJson from './countries-110m.json';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from "react";
import { CountryData, DataPointType } from "@/app/api/data/types";

const colorScale = scaleLinear()
  .domain([0, 5000])
  // @ts-ignore
  .range(["#ffedea", "#112dba"]);

const WorldMap = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [year, setYear] = useState<string>('2023');
  const [dataKey, setDataKey] = useState<DataPointType>('gdp');

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
      <ComposableMap projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}>
        {/*@ts-ignore */}
        <Sphere stroke="#E4E5E6" strokeWidth={0.5}/>
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = countries[geo.id];
              // @ts-ignore
              const dataPoint: number = countryData && countryData.data && countryData.data[year] && countryData.data[year][dataKey];

              // @ts-ignore
              return (<Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={dataPoint ? colorScale(dataPoint) : "#85868a"}
                />
              )})
          }
        </Geographies>
      </ComposableMap>
  )
}

export default WorldMap;