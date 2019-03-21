/* eslint-disable radix */
import React, { Component } from 'react';
import { View, Dimensions, ViewPropTypes, Text } from 'react-native';
import T from 'prop-types';
import moment from 'moment';
import { makeStyles } from './makeStyles';
import Constants from './Constants';
import HeaderControls from './HeaderControls';
import Weekdays from './Weekdays';
import DaysGridView from './DaysGridView';
import Swiper from './Swiper';
import { safeFuncCall } from './Utils';

const SWIPE_LEFT = 'SWIPE_LEFT';
const SWIPE_RIGHT = 'SWIPE_RIGHT';

const _swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

export default class CalendarPicker extends Component {
  static defaultProps = {
    initialDate: moment(),
    scaleFactor: 375,
    enableSwipe: true,
    onDateChange: () => {
      console.log('onDateChange() not provided');
    },
    enableDateChange: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentMonth: null,
      currentYear: null,
      selectedStartDate: props.selectedStartDate || null,
      selectedEndDate: props.selectedEndDate || null,
      styles: {},
      ...this.updateScaledStyles(props),
      ...this.updateMonthYear(props.initialDate),
    };
    this.updateScaledStyles = this.updateScaledStyles.bind(this);
    this.updateMonthYear = this.updateMonthYear.bind(this);
    this.handleOnPressPrevious = this.handleOnPressPrevious.bind(
      this,
    );
    this.handleOnPressNext = this.handleOnPressNext.bind(this);
    this.handleOnPressDay = this.handleOnPressDay.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
    this.resetSelections = this.resetSelections.bind(this);
  }

  componentDidUpdate(prevProps) {
    let newStyles = {};
    let doStateUpdate = false;

    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      newStyles = this.updateScaledStyles(this.props);
      doStateUpdate = true;
    }

    let newMonthYear = {};
    if (
      !moment(prevProps.initialDate).isSame(
        this.props.initialDate,
        'day',
      )
    ) {
      newMonthYear = this.updateMonthYear(this.props.initialDate);
      doStateUpdate = true;
    }

    let selectedDateRanges = {};
    if (
      this.props.selectedStartDate !== prevProps.selectedStartDate ||
      this.props.selectedEndDate !== prevProps.selectedEndDate
    ) {
      const {
        selectedStartDate = null,
        selectedEndDate = null,
      } = this.props;
      selectedDateRanges = {
        selectedStartDate,
        selectedEndDate,
      };
      newMonthYear = this.updateMonthYear(
        selectedEndDate
          ? this.props.selectedEndDate
          : this.props.selectedStartDate,
      );
      doStateUpdate = true;
    }

    if (doStateUpdate) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        ...newStyles,
        ...newMonthYear,
        ...selectedDateRanges,
      });
    }
  }

  onSwipe(gestureName) {
    if (safeFuncCall(this.props.onSwipe, gestureName)) {
      return;
    }

    switch (gestureName) {
      case SWIPE_LEFT:
        this.handleOnPressNext();
        break;
      case SWIPE_RIGHT:
        this.handleOnPressPrevious();
        break;
      default:
        break;
    }
  }

  updateScaledStyles() {
    const {
      scaleFactor,
      selectedDayColor,
      selectedDayTextColor,
      todayBackgroundColor,
      width,
      height,
      cellSize,
    } = this.props;

    // The styles in makeStyles are intially scaled to this width
    const containerWidth = width || Dimensions.get('window').width;
    const containerHeight = height || Dimensions.get('window').height;
    const initialScale =
      Math.min(containerWidth, containerHeight) / scaleFactor;
    return {
      styles: makeStyles(
        initialScale,
        selectedDayColor,
        selectedDayTextColor,
        todayBackgroundColor,
        cellSize,
      ),
    };
  }

  updateMonthYear(initialDate = this.props.initialDate) {
    return {
      currentMonth: parseInt(moment(initialDate).month()),
      currentYear: parseInt(moment(initialDate).year()),
    };
  }

  handleOnPressDay(day) {
    const {
      currentYear,
      currentMonth,
      selectedStartDate,
      selectedEndDate,
    } = this.state;

    const {
      allowRangeSelection,
      onDateChange,
      enableDateChange,
    } = this.props;

    if (!enableDateChange) {
      return;
    }

    const date = moment({
      year: currentYear,
      month: currentMonth,
      day,
    });

    if (
      allowRangeSelection &&
      selectedStartDate &&
      date.isSameOrAfter(selectedStartDate) &&
      !selectedEndDate
    ) {
      this.setState({
        selectedEndDate: date,
      });
      // propagate to parent date has changed
      onDateChange(date, Constants.END_DATE);
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
      // propagate to parent date has changed
      onDateChange(date, Constants.START_DATE);
    }
  }

  handleOnPressPrevious() {
    const { currentMonth, currentYear } = this.state;
    let month = currentMonth - 1;
    let year = currentYear;
    // if month is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December
    if (month < 0) {
      month = 11;
      year -= 1; // decrement year
      this.setState({
        currentMonth: parseInt(month), // setting month to December
        currentYear: parseInt(year),
      });
    } else {
      this.setState({
        currentMonth: parseInt(month),
        currentYear: parseInt(year),
      });
    }

    safeFuncCall(this.props.onMonthChange, moment({ year, month }));
  }

  handleOnPressNext() {
    const { currentMonth, currentYear } = this.state;
    let month = currentMonth + 1;
    let year = currentYear;
    // if month is greater than 11 it means the current month is December,
    // so we have to go forward to the next year and set the current month to January
    if (month > 11) {
      month = 0;
      year += 1; // increment year

      this.setState({
        currentMonth: parseInt(month), // setting month to January
        currentYear: parseInt(year),
      });
    } else {
      this.setState({
        currentMonth: parseInt(month),
        currentYear: parseInt(year),
      });
    }

    safeFuncCall(this.props.onMonthChange, moment({ year, month }));
  }

  resetSelections() {
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null,
    });
  }

  render() {
    const {
      currentMonth,
      currentYear,
      selectedStartDate,
      selectedEndDate,
      styles,
    } = this.state;

    const {
      allowRangeSelection,
      startFromMonday,
      initialDate,
      minDate,
      maxDate,
      weekdays,
      months,
      previousTitle,
      nextTitle,
      textStyle,
      todayTextStyle,
      selectedDayStyle,
      selectedRangeStartStyle,
      selectedRangeStyle,
      selectedRangeEndStyle,
      disabledDates,
      minRangeDuration,
      maxRangeDuration,
      swipeConfig,
      customDatesStyles,
      enableDateChange,
      headerWrapperTextStyle,
      weekdaysTextStyle,
      PreviousComponent,
      NextComponent,
      calendarStyle,
      todayStyle,
      dayStyle,
      dayWrapperStyle,
      weekRowStyle,
      headerWrapperStyle,
      weekdaysWrapperStyle,
      daysWrapperStyle,
      HeaderControlsComponent,
      WeekdaysComponent,
    } = this.props;

    let disabledDatesTime = [];

    // Convert input date into timestamp
    if (disabledDates && Array.isArray(disabledDates)) {
      disabledDatesTime = disabledDates.map((date) => {
        const thisDate = moment(date);
        thisDate.set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        });
        return thisDate.valueOf();
      });
    }

    let minRangeDurationTime = [];

    if (allowRangeSelection && minRangeDuration) {
      if (Array.isArray(minRangeDuration)) {
        minRangeDurationTime = minRangeDuration.map((minDuration) => {
          const thisDate = moment(minDuration.date);
          thisDate.set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          });
          return {
            date: thisDate.valueOf(),
            minDuration: minDuration.minDuration,
          };
        });
      } else {
        minRangeDurationTime = minRangeDuration;
      }
    }

    let maxRangeDurationTime = [];

    if (allowRangeSelection && maxRangeDuration) {
      if (Array.isArray(maxRangeDuration)) {
        maxRangeDurationTime = maxRangeDuration.map((maxDuration) => {
          const thisDate = moment(maxDuration.date);
          thisDate.set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          });
          return {
            date: thisDate.valueOf(),
            maxDuration: maxDuration.maxDuration,
          };
        });
      } else {
        maxRangeDurationTime = maxRangeDuration;
      }
    }

    const dayStyles = {
      wrapper: [styles.dayWrapper, dayWrapperStyle],
      day: [styles.dayInner, dayStyle],
      selectedDay: [styles.selectedDay],
      selectedDayBackground: [styles.selectedDayBackground],
      today: [styles.todayStyle, todayStyle],
      todaySelected: [styles.selectedToday],
      todaySelectedText: [styles.selectedDayLabel],
      dayLabel: [styles.dayLabel],
      disabledText: [],
      startDayWrapper: [styles.startDayWrapper],
      selectedDayLabel: [styles.selectedDayLabel],
      inRangeDay: [styles.inRangeDay],
    };

    return (
      <Swiper
        onSwipe={(direction) =>
          this.props.enableSwipe && this.onSwipe(direction)
        }
        config={{ ..._swipeConfig, ...swipeConfig }}
      >
        <View style={[styles.calendar, calendarStyle]}>
          <HeaderControls
            style={[styles.headerWrapper, headerWrapperStyle]}
            currentMonth={currentMonth}
            currentYear={currentYear}
            initialDate={moment(initialDate)}
            onPressPrevious={this.handleOnPressPrevious}
            onPressNext={this.handleOnPressNext}
            months={months}
            previousTitle={previousTitle}
            nextTitle={nextTitle}
            textStyle={[
              styles.monthLabel,
              textStyle,
              headerWrapperTextStyle,
            ]}
            PreviousComponent={PreviousComponent}
            NextComponent={NextComponent}
            CustomComponent={HeaderControlsComponent}
          />
          <Weekdays
            style={[styles.weekdaysWrapper, weekdaysWrapperStyle]}
            startFromMonday={startFromMonday}
            weekdays={weekdays}
            textStyle={[
              styles.dayLabels,
              textStyle,
              weekdaysTextStyle,
            ]}
            CustomComponent={WeekdaysComponent}
          />
          <DaysGridView
            enableDateChange={enableDateChange}
            month={currentMonth}
            year={currentYear}
            style={[
              styles.daysWrapper,
              daysWrapperStyle,
            ]}
            dayStyles={dayStyles}
            weekRowStyle={weekRowStyle}
            onPressDay={this.handleOnPressDay}
            disabledDates={disabledDatesTime}
            minRangeDuration={minRangeDurationTime}
            maxRangeDuration={maxRangeDurationTime}
            startFromMonday={startFromMonday}
            allowRangeSelection={allowRangeSelection}
            selectedStartDate={
              selectedStartDate && moment(selectedStartDate)
            }
            selectedEndDate={
              selectedEndDate && moment(selectedEndDate)
            }
            minDate={minDate && moment(minDate)}
            maxDate={maxDate && moment(maxDate)}
            textStyle={textStyle}
            todayTextStyle={todayTextStyle}
            selectedDayStyle={selectedDayStyle}
            selectedRangeStartStyle={selectedRangeStartStyle}
            selectedRangeStyle={selectedRangeStyle}
            selectedRangeEndStyle={selectedRangeEndStyle}
            customDatesStyles={customDatesStyles}
          />
        </View>
      </Swiper>
    );
  }
}

CalendarPicker.propTypes = {
  scaleFactor: T.number,
  enableSwipe: T.bool,
  allowRangeSelection: T.bool,
  startFromMonday: T.bool,
  initialDate: T.any,
  minDate: T.any,
  maxDate: T.any,
  selectedStartDate: T.any,
  selectedEndDate: T.any,
  weekdays: T.array,
  months: T.array,
  previousTitle: T.string,
  nextTitle: T.string,
  textStyle: Text.propTypes.style,
  todayTextStyle: Text.propTypes.style,
  selectedDayStyle: ViewPropTypes.style,
  selectedRangeStartStyle: ViewPropTypes.style,
  selectedRangeStyle: ViewPropTypes.style,
  selectedRangeEndStyle: ViewPropTypes.style,
  disabledDates: T.array,
  minRangeDuration: T.number,
  maxRangeDuration: T.number,
  swipeConfig: T.object,
  customDatesStyles: ViewPropTypes.style,
  enableDateChange: T.bool,
  headerWrapperTextStyle: Text.propTypes.style,
  weekdaysTextStyle: Text.propTypes.style,
  PreviousComponent: T.oneOfType([T.func, T.element]),
  NextComponent: T.oneOfType([T.func, T.element]),
  onMonthChange: T.func,
  onDateChange: T.func,
  onSwipe: T.func,
  selectedDayColor: T.string,
  selectedDayTextColor: T.string,
  todayBackgroundColor: T.string,
  width: T.number,
  height: T.number,
  todayStyle: ViewPropTypes.style,
  headerWrapperStyle: ViewPropTypes.style,
  weekdaysWrapperStyle: ViewPropTypes.style,
  daysWrapperStyle: ViewPropTypes.style,
  cellSize: T.number,
};
