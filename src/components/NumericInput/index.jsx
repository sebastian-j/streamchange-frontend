import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import messages from './messages';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  color: ${(props) => props.theme.staticTextColor};
  font-family: inherit;
  line-height: 30px;
  margin-right: 5px;
`;
const Button = styled.button`
  background: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 0 4px 4px 0;
  color: ${(props) => props.theme.buttonTextColor};
  font-size: 1.5rem;
  line-height: 23px;
  height: 30px;
  width: 30px;
  text-decoration: none;
  outline: none;
  ${({ $left }) =>
    $left &&
    `
    border-radius: 4px 0 0 4px;
  `}
  &:focus-visible {
    background-color: ${(props) => props.theme.color};
  }
  &:hover {
    background-color: ${(props) => props.theme.buttonBackgroundHover};
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

const NumberDisplay = styled.input`
  background: transparent;
  border: 1px solid gray;
  color: ${(props) => props.theme.staticTextColor};
  font-size: 1.5rem;
  height: 100%;
  max-width: 70px;
  padding: 0 10px;
`;

const NumericInput = ({
  label,
  onChange,
  value = 0,
  minValue = null,
  maxValue = null,
  step = 1,
}) => {
  const intl = useIntl();

  const checkValue = (newValue) => {
    let val = newValue;
    if (val < minValue && val !== '') val = minValue;
    if (val > maxValue) val = maxValue;
    if (Number.isNaN(Number(val)) && val !== '') val = value;
    onChange(val);
  };
  const inc = () => {
    let val = value;
    if (maxValue === null || val + step < maxValue) {
      val = value + step;
    } else {
      val = maxValue;
    }
    if (val !== value) checkValue(Number(val));
  };
  const dec = () => {
    let val = value;
    if (minValue === null || val - step > minValue) {
      val = value - step;
    } else {
      val = minValue;
    }
    if (val !== value) checkValue(Number(val));
  };
  return (
    <Container>
      <Label htmlFor="number-display">{label}</Label>
      <Button
        aria-label={intl.formatMessage({ ...messages.decreaseButton })}
        $left="true"
        onClick={dec}
        type="button"
      >
        -
      </Button>
      <NumberDisplay
        id="number-display"
        value={value}
        onChange={(event) => checkValue(event.target.value)}
      />
      <Button
        aria-label={intl.formatMessage({ ...messages.increaseButton })}
        onClick={inc}
        type="button"
      >
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
export default NumericInput;
