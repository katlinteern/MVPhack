import React from 'react';
import styled from 'styled-components';

const Slider = styled.input`
  flex: 1;
  width: 50%; 
  margin: 10px;
`;

interface YearSliderProps {
  minYear: number;
  maxYear: number;
  selectedYear: number;
  onYearChange: (newYear: number) => void;
}

const YearSlider: React.FC<YearSliderProps> = ({
  minYear,
  maxYear,
  selectedYear,
  onYearChange,
}) => {
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value);
    onYearChange(newYear);
  };

  return (
    <>
      <div className='YearLabel'>Year:</div>
      <Slider
        type="range"
        min={minYear}
        max={maxYear}
        value={selectedYear}
        onChange={handleYearChange}
      />
      <div className='Year'>{selectedYear}</div>
    </>
  );
};

export default YearSlider;
