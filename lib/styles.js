import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  calendar: {},

  dayButton: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  dayLabel: {
    color: '#000',
    alignSelf: 'center',
  },

  selectedDayLabel: {},

  weekdaysWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    borderColor: 'rgba(0,0,0,0.2)',
  },

  daysWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  dayLabels: {
    color: '#000',
    textAlign: 'center',
  },

  selectedDay: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  selectedDayBackground: {},

  selectedToday: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  dayWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },

  startDayWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  endDayWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  inRangeDay: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  monthLabel: {
    color: '#000',
  },

  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },

  monthSelectorWrapper: {
    position: 'absolute',
  },

  prev: {
    left: 0,
  },

  next: {
    right: 0,
  },

  monthSelector: {},

  prevText: {
    textAlign: 'left',
  },

  nextText: {
    textAlign: 'right',
  },

  yearLabel: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },

  weeks: {
    flexDirection: 'column',
  },

  weekRow: {
    flexDirection: 'row',
  },

  weekRowWithEmptyDays: {
    justifyContent: 'flex-end',
  },

  disabledText: {
    color: '#BBBBBB',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
