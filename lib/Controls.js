import React from 'react';
import { TouchableOpacity, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const Controls = ({
  style,
  textStyle,
  label,
  onPressControl,
  hitSlop,
}) => (
  <TouchableOpacity
    onPress={() => onPressControl()}
    style={style}
    hitSlop={hitSlop}
  >
    <Text style={textStyle}>{label}</Text>
  </TouchableOpacity>
);

Controls.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  label: PropTypes.string.isRequired,
  onPressControl: PropTypes.func.isRequired,
  hitSlop: PropTypes.object,
};

export default Controls;
