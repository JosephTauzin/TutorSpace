import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WheelContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #333;
  overflow: hidden;
`;

const Wheel = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: rotate(${props => props.rotation}deg);
  transition: transform 0.3s ease-out;
`;

const Number = styled.li`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${props => props.angle}deg) translate(0, -50%);
`;

const WheelNumberSelector = ({ value, onChange }) => {
  const [rotation, setRotation] = useState(0);
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const angleStep = 360 / numbers.length;

  useEffect(() => {
    setRotation(-value * angleStep);
  }, [value, angleStep]);

  const selectNumber = (number) => {
    setRotation(-number * angleStep);
    onChange(number);
  };

  return (
    <WheelContainer>
      <Wheel rotation={rotation}>
        {numbers.map((number, index) => (
          <Number key={number} angle={index * angleStep} onClick={() => selectNumber(number)}>
            {number}
          </Number>
        ))}
      </Wheel>
    </WheelContainer>
  );
};


export default WheelNumberSelector;