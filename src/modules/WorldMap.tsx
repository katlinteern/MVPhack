import { ComposableMap, Geographies, Geography, Sphere } from 'react-simple-maps';

import geoJson from './countries-110m.json';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from "react";
import { CountryData, DataPointType } from "@/app/api/data/types";
import YearSlider from '@/app/components/YearSlider';
import Dropdown from '@/app/components/Dropdown';
import Modal from '@/app/components/Modal';

// @ts-ignore
const colorScale: (datapoint: number) => string = scaleLinear()
  .domain([0, 5000])
  // @ts-ignore
  .range(["#86CEFA", "#003396"]);

const WorldMap = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [year, setYear] = useState<number>(2020);
  const [dataKey, setDataKey] = useState<DataPointType>('gdp');

  const minYear = 1998;
  const maxYear = 2023;

  //TODO find out what options are really needed
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  //TODO solve together with real option values
  const handleOptionChange = () => {
    //setDataKey(dataKey);
  };

  //TODO onclick function
  const handleMapClick = (event: React.MouseEvent<SVGPathElement>) => {
    // const geography = event.currentTarget;
    // console.log('Clicked:', geography);
    closeModal();
    openModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    <>
      <div className="SearchContainer">
        <YearSlider
          minYear={minYear}
          maxYear={maxYear}
          selectedYear={year}
          onYearChange={handleYearChange}
        />
        <Dropdown
          options={options}
          selectedOption={dataKey}
          onOptionChange={handleOptionChange}
        />
      </div>
      <ComposableMap projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}>
        {/*@ts-ignore */}
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = countries[geo.id];
              console.log(countryData);
              // @ts-ignore
              const dataPoint: number = countryData && countryData.data && countryData.data[year] && countryData.data[year][dataKey];

              return (<Geography
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
                key={geo.rsmKey}
                geography={geo}
                className="Geography"
                fill={dataPoint ? colorScale(dataPoint) : "#85868a"}
                onClick={handleMapClick}
              />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Country name">
        <p>Country data</p>
      </Modal>
    </>
  )
}

export default WorldMap;