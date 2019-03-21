import React from 'react';
import { View, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Constants from './Constants';

export default function Weekdays({
  style,
  startFromMonday,
  weekdays,
  textStyle,
  CustomComponent,
}) {
  let wd = weekdays;
  if (!wd) {
    wd = startFromMonday
      ? Constants.WEEKDAYS_MON
      : Constants.WEEKDAYS; // English Week days Array
  }

  if (CustomComponent) {
    return (
      <CustomComponent
        startFromMonday={startFromMonday}
        weekdays={wd}
      />
    );
  }

  return (
    <View style={style}>
      {wd.map((day, key) => (
        // eslint-disable-next-line  react/no-array-index-key
        <Text key={key} style={textStyle}>
          {day}
        </Text>
      ))}
    </View>
  );
}

Weekdays.propTypes = {
  style: ViewPropTypes.style,
  startFromMonday: PropTypes.bool,
  weekdays: PropTypes.array,
  textStyle: Text.propTypes.style,
  CustomComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};
