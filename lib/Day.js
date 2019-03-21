import React from 'react';
import { View, Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import s from './styles';

export default function Day(props) {
  const {
    day,
    month,
    year,
    styles,
    customDatesStyles,
    onPressDay,
    selectedStartDate,
    selectedEndDate,
    allowRangeSelection,
    selectedDayStyle,
    selectedRangeStartStyle,
    selectedRangeStyle,
    selectedRangeEndStyle,
    textStyle,
    todayTextStyle,
    minDate,
    maxDate,
    disabledDates,
    minRangeDuration,
    maxRangeDuration,
    enableDateChange,
  } = props;

  const thisDay = moment({ year, month, day });
  const today = moment();

  let daySelectedStyle = styles.day; // may be overridden depending on state
  let selectedDayColorStyle = {};
  let propSelectedDayStyle;
  let dateIsBeforeMin = false;
  let dateIsAfterMax = false;
  let dateIsDisabled = false;
  let dateIsBeforeMinDuration = false;
  let dateIsAfterMaxDuration = false;
  let customContainerStyle;
  let customDateStyle;
  let customTextStyle;

  // First let's check if date is out of range
  // Check whether props maxDate / minDate are defined. If not supplied,
  // don't restrict dates.
  if (maxDate) {
    dateIsAfterMax = thisDay.isAfter(maxDate, 'day');
  }
  if (minDate) {
    dateIsBeforeMin = thisDay.isBefore(minDate, 'day');
  }

  if (
    disabledDates &&
    disabledDates.indexOf(thisDay.valueOf()) >= 0
  ) {
    dateIsDisabled = true;
  }

  if (
    allowRangeSelection &&
    minRangeDuration &&
    selectedStartDate &&
    thisDay.isAfter(moment(selectedStartDate), 'day')
  ) {
    if (Array.isArray(minRangeDuration)) {
      const index = minRangeDuration.findIndex((i) =>
        moment(i.date).isSame(moment(selectedStartDate, 'day')),
      );
      if (
        index >= 0 &&
        moment(selectedStartDate)
          .add(minRangeDuration[index].minDuration, 'day')
          .isAfter(thisDay, 'day')
      ) {
        dateIsBeforeMinDuration = true;
      }
    } else if (
      moment(selectedStartDate)
        .add(minRangeDuration, 'day')
        .isAfter(thisDay, 'day')
    ) {
      dateIsBeforeMinDuration = true;
    }
  }

  if (
    allowRangeSelection &&
    maxRangeDuration &&
    selectedStartDate &&
    thisDay.isAfter(moment(selectedStartDate), 'day')
  ) {
    if (Array.isArray(maxRangeDuration)) {
      const index = maxRangeDuration.findIndex((i) =>
        moment(i.date).isSame(moment(selectedStartDate, 'day')),
      );
      if (
        index >= 0 &&
        moment(selectedStartDate)
          .add(maxRangeDuration[index].maxDuration, 'day')
          .isBefore(thisDay, 'day')
      ) {
        dateIsAfterMaxDuration = true;
      }
    } else if (
      moment(selectedStartDate)
        .add(maxRangeDuration, 'day')
        .isBefore(thisDay, 'day')
    ) {
      dateIsAfterMaxDuration = true;
    }
  }

  const dateOutOfRange =
    dateIsAfterMax ||
    dateIsBeforeMin ||
    dateIsDisabled ||
    dateIsBeforeMinDuration ||
    dateIsAfterMaxDuration;

  // If date is in range let's apply styles
  if (!dateOutOfRange) {
    // set today's style
    const isToday = thisDay.isSame(today, 'day');
    if (isToday) {
      daySelectedStyle = styles.todaySelected;
      // todayTextStyle prop overrides selectedDayTextColor (created via makeStyles)
      selectedDayColorStyle =
        todayTextStyle || styles.todaySelectedText;
    }

    for (let i = 0; i < customDatesStyles.length; i += 1) {
      const cds = customDatesStyles[i];
      if (thisDay.isSame(moment(cds.date), 'day')) {
        customContainerStyle = cds.containerStyle;
        customDateStyle = cds.style;
        customTextStyle = cds.textStyle;
        if (isToday && customDateStyle) {
          // Custom date style overrides 'today' style. It may be reset below
          // by date selection styling.
          daySelectedStyle = [daySelectedStyle, customDateStyle];
        }
        break;
      }
    }

    const isThisDaySameAsSelectedStart = thisDay.isSame(
      selectedStartDate,
      'day',
    );
    const isThisDaySameAsSelectedEnd = thisDay.isSame(
      selectedEndDate,
      'day',
    );

    // set selected day style
    if (
      !allowRangeSelection &&
      selectedStartDate &&
      isThisDaySameAsSelectedStart
    ) {
      daySelectedStyle = styles.selectedDay;
      selectedDayColorStyle = [
        styles.selectedDayLabel,
        isToday && todayTextStyle,
      ];
      // selectedDayStyle prop overrides selectedDayColor (created via makeStyles)
      propSelectedDayStyle =
        selectedDayStyle || styles.selectedDayBackground;
    }

    // Set selected ranges styles
    if (allowRangeSelection) {
      if (selectedStartDate && selectedEndDate) {
        // Apply style for start date
        if (isThisDaySameAsSelectedStart) {
          daySelectedStyle = [
            styles.startDayWrapper,
            selectedRangeStyle,
            selectedRangeStartStyle,
          ];
          selectedDayColorStyle = styles.selectedDayLabel;
        }
        // Apply style for end date
        if (isThisDaySameAsSelectedEnd) {
          daySelectedStyle = [
            styles.endDayWrapper,
            selectedRangeStyle,
            selectedRangeEndStyle,
          ];
          selectedDayColorStyle = styles.selectedDayLabel;
        }
        // Apply style if start date is the same as end date
        if (
          isThisDaySameAsSelectedEnd &&
          isThisDaySameAsSelectedStart &&
          selectedEndDate.isSame(selectedStartDate, 'day')
        ) {
          daySelectedStyle = [
            styles.selectedDay,
            styles.selectedDayBackground,
            selectedRangeStyle,
          ];
          selectedDayColorStyle = styles.selectedDayLabel;
        }
        // Apply style if this day is in range
        if (
          thisDay.isBetween(selectedStartDate, selectedEndDate, 'day')
        ) {
          daySelectedStyle = [styles.inRangeDay, selectedRangeStyle];
          selectedDayColorStyle = styles.selectedDayLabel;
        }
      }
      // Apply style if start date has been selected but end date has not
      if (
        selectedStartDate &&
        !selectedEndDate &&
        isThisDaySameAsSelectedStart
      ) {
        daySelectedStyle = [
          styles.startDayWrapper,
          selectedRangeStyle,
          selectedRangeStartStyle,
        ];
        selectedDayColorStyle = styles.selectedDayLabel;
      }
    }

    return (
      <TouchableOpacity
        style={[styles.wrapper, customContainerStyle]}
        disabled={!enableDateChange}
        onPress={() => onPressDay(day)}
      >
        <View
          disabled={!enableDateChange}
          style={[
            customDateStyle,
            daySelectedStyle,
            propSelectedDayStyle,
          ]}
          onPress={() => onPressDay(day)}
        >
          <Text
            style={[
              styles.dayLabel,
              s.dayLabel,
              textStyle,
              customTextStyle,
              selectedDayColorStyle,
            ]}
          >
            {day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  // dateOutOfRange = true
  return (
    <View style={styles.wrapper}>
      <Text style={[textStyle, s.disabledText, styles.disabledText]}>{day}</Text>
    </View>
  );
}

Day.defaultProps = {
  customDatesStyles: [],
};

Day.propTypes = {
  customDatesStyles: PropTypes.array,
  styles: PropTypes.object,
  day: PropTypes.number,
  onPressDay: PropTypes.func,
  disabledDates: PropTypes.array,
  minRangeDuration: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
  ]),
  maxRangeDuration: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
  ]),
  month: PropTypes.number,
  year: PropTypes.number,
  selectedStartDate: PropTypes.object,
  selectedEndDate: PropTypes.object,
  allowRangeSelection: PropTypes.bool,
  selectedDayStyle: ViewPropTypes.style,
  selectedRangeStartStyle: ViewPropTypes.style,
  selectedRangeStyle: ViewPropTypes.style,
  selectedRangeEndStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  todayTextStyle: Text.propTypes.style,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  enableDateChange: PropTypes.bool,
};
