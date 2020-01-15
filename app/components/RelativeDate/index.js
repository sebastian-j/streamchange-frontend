import React from 'react';
import PropTypes from 'prop-types';

function RelativeDate(props) {
  const dt = new Date(props.ISO8601Date);
  const now = new Date();
  let convertedDate = '';
  if (
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() + 2 === now.getDate()
  ) {
    convertedDate = `Przedwczoraj ${dt.getHours()}:${
      dt.getMinutes() < 10 ? '0' : ''
    }${dt.getMinutes()}`;
  } else if (
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() + 1 === now.getDate()
  ) {
    convertedDate = `Wczoraj ${dt.getHours()}:${
      dt.getMinutes() < 10 ? '0' : ''
    }${dt.getMinutes()}`;
  } else if (now.getTime() - dt.getTime() < 10000) {
    convertedDate = `Przed chwilą`;
  } else if (now.getTime() - dt.getTime() < 60000) {
    convertedDate = `${Math.round(
      (now.getTime() - dt.getTime()) / 1000,
    )} sekund temu`;
  } else if (now.getTime() - dt.getTime() < 120000) {
    convertedDate = `Minutę temu`;
  } else if (now.getTime() - dt.getTime() < 270000) {
    convertedDate = `${Math.round(
      (now.getTime() - dt.getTime()) / 60000,
    )} minuty temu`;
  } else if (now.getTime() - dt.getTime() < 3600000) {
    convertedDate = `${Math.round(
      (now.getTime() - dt.getTime()) / 60000,
    )} minut temu`;
  } else if (
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() === now.getDate()
  ) {
    convertedDate = `Dzisiaj ${dt.getHours()}:${
      dt.getMinutes() < 10 ? '0' : ''
    }${dt.getMinutes()}`;
  } else if (props.ISO8601Date === null) {
    convertedDate = `Nigdy`;
  } else {
    const months = [
      'sty',
      'lut',
      'mar',
      'kwi',
      'maj',
      'cze',
      'lip',
      'sie',
      'wrz',
      'paź',
      'lis',
      'gru',
    ];
    convertedDate = `${dt.getDate()} ${
      months[dt.getMonth()]
    } ${dt.getFullYear()} ${dt.getHours()}:${
      dt.getMinutes() < 10 ? '0' : ''
    }${dt.getMinutes()}`;
  }
  if (props.className)
    return <span className={props.className}>{convertedDate}</span>;
  return <span>{convertedDate}</span>;
}

RelativeDate.propTypes = {
  className: PropTypes.string,
  ISO8601Date: PropTypes.string.isRequired,
};

export default RelativeDate;
