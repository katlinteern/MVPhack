import { ComposableMap, Geographies, Geography, Sphere } from 'react-simple-maps';

import geoJson from './countries-110m.json';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from "react";
import { CountryData, DataPointType } from "@/app/api/data/types";
import YearSlider from '@/app/components/YearSlider';
import Dropdown from '@/app/components/Dropdown';
import Modal from '@/app/components/Modal';
import somalia from '@/app/somalia.png';


const WorldMap = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [year, setYear] = useState<number>(2020);
  const [dataKey, setDataKey] = useState<DataPointType>('gdp');
  const [maxScale, setMaxScale] = useState<number>(10000);
  const [geoId, setGeoId] = useState<number>(1);
  const minYear = 1998;
  const maxYear = 2023;

  // @ts-ignore
  const colorScale: (datapoint: number) => string = scaleLinear()
    .domain([0, maxScale])
    // @ts-ignore
    .range(["#86CEFA", "#003396"]);

  //TODO find out what options are really needed
  const options = [
    { value: 'gdp', label: 'GDP' },
    { value: 'crop', label: 'Crop' },
    { value: 'ara', label: 'Arable area' },
    { value: 'emigrants', label: 'Number of emigrants' },
  ];
  const maxValues = {
    gdp: 10000,
    crop: 8.25,
    ara: 9.1,
    emigrants: 1100000,
  }

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  const handleOptionChange = (dataKey: string) => {
    setDataKey(dataKey as DataPointType);
    // @ts-ignore
    setMaxScale(maxValues[dataKey])
  };

  const handleMapClick = (geoId: number) => {
    setGeoId(geoId);
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
                onClick={() => handleMapClick(geo.id)}
              />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={geoId && countries[geoId] && countries[geoId].name ? countries[geoId].name : 'Data'}>
        {
          // @ts-ignore
          (geoId && countries[geoId]) ? (<CountryModalData data={countries[geoId].data[year]} />) : (geoId == 706 ? <Somalia /> : <></>)
        }
      </Modal>
    </>
  )
}

const CountryModalData = (data: CountryData) => {
  const d = data.data as any ?? {};

  return (<div>
    <p>GDP: {d.gdp || ''}</p>
    <p>ARA: {d.ara || ''}</p>
    <p>CROP: {d.crop || ''}</p>
    <p>Emigrants: {d.emigrants || ''}</p>
    <p>Emigration by country:{JSON.stringify(d.immigrationTo)}</p>
  </div>);
}

const Somalia = () => {

  return (<div>
    <div>
      <img src={somalia.src} alt="Somalia data" />
    </div>
  </div>);
}

export default WorldMap;