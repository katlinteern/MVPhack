import React from 'react';
import styled from 'styled-components';

const YearSliderContainer = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #f2f2f2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 30px;
`;

const Slider = styled.input`
  flex: 1;
  width: 100%;
  margin: 10px;
`;

const YearLabel = styled.span`
  font-size: 16px;
  margin: 0px, 50px, 0px, 50px;
  margin-left: 50px;
  margin-right: 50px;
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
