import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import './style.css';

const PickerButton = styled.button`
  border: 1px gray solid;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  position: relative;
  outline: none;
  svg.border-hover {
    stroke: currentColor;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset .25s cubic-bezier(.22,.28,.36,1);
    circle {
      r: calc(50% - .5px);
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      vector-effect: non-scaling-stroke;
    }
  }
  &:hover {
    svg.border-hover {
      stroke-dashoffset: 0;
    }
  }
  .border {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: auto;
  }
  .border-initial {
    border-radius: 50%;
    border: 1px solid;
    opacity: 0.2;
  }
`;

const ColorPicker = (props) => {
  const [color, setColor] = useState(props.color);
  const [colorString, setColorString] = useState(props.color);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    setColorString(props.color);
  }, [color]);

  const handleColorChange = (colorObject) => {
    const rgba = colorObject.rgb;
    const hex = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    setColor(rgba);
    setColorString(hex);
    props.handleChange(props.name, hex);
  };

  const onTogglePicker = () => {
    setPickerVisible((prevState) => !prevState);
  };
  return (
    <div className="color-picker-wrapper">
      <div className="color-picker-label">{props.label}</div>
      <PickerButton
        aria-label="toggle picker"
        className="color-picker-button"
        style={{ backgroundColor: colorString }}
        onClick={onTogglePicker}
        type="button">
        <span className="border border-initial" />
        <svg className="border border-hover" fill="none">
          <circle cx="50%" cy="50%" r="32.5" pathLength="1"/>
        </svg>
      </PickerButton>
      {pickerVisible && (
        <div>
          <button
            aria-label="color picker"
            className="active-picker-background"
            onClick={onTogglePicker}
            type="button"
          />
          <div style={{ position: 'absolute' }}>
            <SketchPicker
              className="inner-picker"
              color={color}
              onChangeComplete={handleColorChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
};

export default ColorPicker;
