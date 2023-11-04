'use client'

import { ComposableMap, Geographies, Geography, Sphere } from 'react-simple-maps';

import geoJson from './countries-110m.json';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from "react";

const colorScale = scaleLinear()
  .domain([0, 5000])
  // @ts-ignore
  .range(["#ffedea", "#ff5233"]);

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (
      async () => {
        const apiResponse = await fetch('./api/data');
        const jsonData = await apiResponse.json();
        setData(jsonData);
      }
    )()
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex">
      <ComposableMap projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}>
        {/*@ts-ignore */}
        <Sphere stroke="#E4E5E6" strokeWidth={0.5}/>
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // @ts-ignore
              const d = data.find((s) => s.iso3a == geo.id);

              return (<Geography
                  key={geo.rsmKey}
                  geography={geo}
                  {/*@ts-ignore */}
                  fill={d ? colorScale(d['gdp']) : "#F5F4F6"}
                />
              )})
          }
        </Geographies>
      </ComposableMap>
    </main>
  )
}
