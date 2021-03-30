import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  color: ${props => props.theme.staticTextColor};
  line-height: 30px;
  margin-right: 5px;
`;
const Button = styled.button`
  background: ${props => props.theme.buttonBackground};
  border: 1px solid ${props => props.theme.color};
  border-radius: 0 4px 4px 0;
  color: ${props => props.theme.buttonTextColor};
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
    background-color: ${props => props.theme.buttonBackgroundHover};
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const NumberDisplay = styled.input`
  background: transparent;
  border: 1px solid gray;
  color: ${props => props.theme.staticTextColor};
  font-size: 1.5rem;
  height: 100%;
  max-width: 70px;
  padding: 0 10px;
`;

const NumericInput = props => {
  const inc = () => {
    let val = props.value;
    if (props.maxValue === null || val + props.step < props.maxValue) {
      val = props.value + props.step;
    } else {
      val = props.maxValue;
    }
    if (val !== props.value) props.onChange(Number(val));
  };
  const dec = () => {
    let val = props.value;
    if (props.minValue === null || val - props.step > props.minValue) {
      val = props.value - props.step;
    } else {
      val = props.minValue;
    }
    if (val !== props.value) props.onChange(Number(val));
  };
  const checkValue = () => {
    let val = props.value;
    if (val < props.minValue) val = props.minValue;
    if (val > props.maxValue) val = props.maxValue;
    if (Number.isNaN(Number(val))) val = props.value;
    props.onChange(Number(val));
  };
  return (
    <Container>
      <Label>{props.label}</Label>
      <Button left="true" onClick={dec} type="button">
        -
      </Button>
      <NumberDisplay
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
        onBlur={checkValue}
      />
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
