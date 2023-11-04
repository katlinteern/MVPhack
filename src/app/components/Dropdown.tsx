import React, { useState } from 'react';

// Define a type for the options
interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    options: Option[]; // Use the Option[] type for options
    selectedOption: string;
    onOptionChange: (newOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onOptionChange }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        onOptionChange(selectedValue);
    };

    return (
        <select
            className='Dropdown'
            value={selectedOption}
            onChange={handleSelectChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
