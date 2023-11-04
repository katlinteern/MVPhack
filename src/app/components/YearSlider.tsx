import React, { useState } from 'react';
import styled from 'styled-components';

const YearSliderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: -150px;
`;

const Slider = styled.input`
  width: 25%;
  margin: 0 10px;  
`;

const YearLabel = styled.span`
  font-size: 18px;
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
    <YearSliderContainer>
      <YearLabel>Year:</YearLabel>
      <Slider
        type="range"
        min={minYear}
        max={maxYear}
        value={selectedYear}
        onChange={handleYearChange}
      />
      <YearLabel>{selectedYear}</YearLabel>
    </YearSliderContainer>
  );
};

export default YearSlider;
