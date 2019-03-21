import React from 'react';
import { View, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Constants from './Constants';
import DefaultControls from './Controls';
import s from './styles';

export default function HeaderControls(props) {
  const {
    style,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    months,
    previousTitle,
    nextTitle,
    textStyle,
    controlsHitSlop,
    PreviousComponent,
    NextComponent,
    CustomComponent,
  } = props;
  const MONTHS = months || Constants.MONTHS; // English Month Array
  const previous = previousTitle || 'Previous';
  const next = nextTitle || 'Next';
  const month = MONTHS[currentMonth];
  const year = currentYear;

  if (CustomComponent) {
    return (
      <CustomComponent
        onPressNext={onPressNext}
        onPressPrevious={onPressPrevious}
        month={month}
        monthIndex={currentMonth}
        year={year}
      />
    );
  }

  // eslint-disable-next-line react/prop-types
  const Controls = ({ isNext }) => {
    if (NextComponent && isNext) {
      return <NextComponent onPress={onPressNext} />;
    } else if (PreviousComponent && !isNext) {
      return <PreviousComponent onPress={onPressPrevious} />;
    }

    const hitSlop = {
      top: 10,
      bottom: 10,
      ...(isNext ? { left: 40, right: 10 } : { right: 40, left: 10 }),
    };

    return (
      <DefaultControls
        label={isNext ? next : previous}
        onPressControl={isNext ? onPressNext : onPressPrevious}
        style={[
          s.monthSelectorWrapper,
          isNext ? s.next : s.prev,
        ]}
        textStyle={[
          s.monthSelector,
          textStyle,
          isNext ? s.nextText : s.prevText,
        ]}
        hitSlop={controlsHitSlop || hitSlop}
      />
    );
  };

  return (
    <View style={style}>
      <Controls />
      <View>
        <Text style={textStyle}>
          {month} {year}
        </Text>
      </View>
      <Controls isNext />
    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  style: ViewPropTypes.style,
  months: PropTypes.array,
  previousTitle: PropTypes.string,
  nextTitle: PropTypes.string,
  textStyle: Text.propTypes.style,
  controlsHitSlop: PropTypes.object,
  CustomComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  PreviousComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  NextComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};
