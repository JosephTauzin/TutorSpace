import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function CustomDropdown({ options, placeholder, onChange }) {
  const [value, setValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current.offsetHeight*1.2);
    }
  }, [isCustom]);

  const handleDropdownChange = (selectedOption) => {
    if (selectedOption.value === 'custom') {
      setIsCustom(true);
      setValue('');
    } else {
      setIsCustom(false);
      setValue(selectedOption.value);
      if (onChange) onChange(selectedOption.value);
    }
  };

  const handleCustomInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div style={{ marginBottom: isCustom ? `-${inputHeight}px` : '0px' }}>
      <Dropdown
        options={[...options, { value: 'custom', label: 'Custom...' }]}
        onChange={handleDropdownChange}
        placeholder={placeholder}
        value={isCustom ? { value: 'custom', label: 'Custom...' } : value}
      />
      {isCustom && (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleCustomInputChange}
          placeholder="Enter custom value"
          style={{ marginTop: 10, padding: 4, width: '100%' }}
        />
      )}
    </div>
  );
}

export default CustomDropdown;
