import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  line-height: 30px;
  margin-right: 5px;
`;
const Button = styled.button`
  background: none;
  border: 1px solid #0059a3;
  border-radius: 0 4px 4px 0;
  color: #0059a3;
  font-size: 1.5rem;
  line-height: 23px;
  height: 30px;
  width: 30px;
  text-decoration: none;
  outline: none;
  ${({ left }) =>
    left &&
    `
    border-radius: 4px 0 0 4px;
  `}
  &:hover {
    background-color: #0059a3;
    color: white;
  }
`;

const NumberDisplay = styled.div`
  border: 1px solid gray;
  font-size: 1.5rem;
  padding: 0 10px;
`;

const NumericInput = props => {
  const [value, setValue] = useState(props.value);

  const inc = () => {
    let val = props.value;
    if (props.maxValue === null || val + props.step < props.maxValue) {
      val = value + props.step;
    } else {
      val = props.maxValue;
    }
    if (val !== props.value) props.onChange(Number(val));
    setValue(val);
  };
  const dec = () => {
    let val = props.value;
    if (props.minValue === null || val - props.step > props.minValue) {
      val = value - props.step;
    } else {
      val = props.minValue;
    }
    if (val !== props.value) props.onChange(Number(val));
    setValue(val);
  };

  return (
    <Container>
      <Label>{props.label}</Label>
      <Button left="true" onClick={dec} type="button">
        -
      </Button>
      <NumberDisplay>{value}</NumberDisplay>
      <Button onClick={inc} type="button">
        +
      </Button>
    </Container>
  );
};

NumericInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  step: PropTypes.number,
};
NumericInput.defaultProps = {
  value: 0,
  minValue: null,
  maxValue: null,
  step: 1,
};

export default NumericInput;
