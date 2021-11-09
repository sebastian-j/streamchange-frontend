import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import './style.css';

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
      <button
        aria-label="toggle picker"
        className="color-picker-button"
        style={{ backgroundColor: colorString }}
        onClick={onTogglePicker}
        type="button"
      />
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
