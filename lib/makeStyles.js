/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
const DEFAULT_SELECTED_BACKGROUND_COLOR = '#5ce600';
const DEFAULT_SELECTED_TEXT_COLOR = '#000000';
const DEFAULT_TODAY_BACKGROUD_COLOR = '#CCCCCC';
const DEFAULT_CELL_SIZE = 35;

export function makeStyles(
  scaler,
  backgroundColor,
  textColor,
  todayBackgroundColor,
  cellSize,
) {
  const SELECTED_BG_COLOR = backgroundColor || DEFAULT_SELECTED_BACKGROUND_COLOR;
  const SELECTED_TEXT_COLOR = textColor || DEFAULT_SELECTED_TEXT_COLOR;
  const TODAY_BG_COLOR = todayBackgroundColor || DEFAULT_TODAY_BACKGROUD_COLOR;
  const CELL_SIZE = cellSize || DEFAULT_CELL_SIZE;
  const CELL_WRAPPER_WIDTH = 50;
  const CELL_WRAPPER_HEIGHT = 40;
  const DAYS_HEIGHT = CELL_WRAPPER_HEIGHT * 6;
  
  return {
    calendar: {},

    dayInner: {
      width: CELL_SIZE * scaler,
      height: CELL_SIZE * scaler,
      borderRadius: CELL_SIZE * scaler,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    dayLabel: {
      fontSize: 14 * scaler,
      color: '#000',
      alignSelf: 'center',
    },

    selectedDayLabel: {
      color: SELECTED_TEXT_COLOR,
    },

    weekdaysWrapper: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      paddingTop: 10 * scaler,
      paddingBottom: 10 * scaler,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: 'rgba(0,0,0,0.2)',
    },

    daysWrapper: {
      alignSelf: 'center',
      justifyContent: 'center',
      height: DAYS_HEIGHT * scaler,
    },

    dayLabels: {
      width: CELL_WRAPPER_WIDTH * scaler,
      fontSize: 12 * scaler,
      color: '#000',
      textAlign: 'center',
    },

    selectedDay: {
      width: CELL_SIZE * scaler,
      height: CELL_SIZE * scaler,
      borderRadius: CELL_SIZE * scaler,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    selectedDayBackground: {
      backgroundColor: SELECTED_BG_COLOR,
    },

    selectedToday: {
      width: CELL_SIZE * scaler,
      height: CELL_SIZE * scaler,
      backgroundColor: TODAY_BG_COLOR,
      borderRadius: CELL_SIZE * scaler,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    dayWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: CELL_WRAPPER_WIDTH * scaler,
      height: CELL_WRAPPER_HEIGHT * scaler,
      backgroundColor: 'rgba(0,0,0,0.0)',
    },

    startDayWrapper: {
      width: CELL_WRAPPER_WIDTH * scaler,
      height: CELL_SIZE * scaler,
      borderTopLeftRadius: (CELL_SIZE / 2) * scaler,
      borderBottomLeftRadius: (CELL_SIZE / 2) * scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    endDayWrapper: {
      width: CELL_WRAPPER_WIDTH * scaler,
      height: CELL_SIZE * scaler,
      borderTopRightRadius: (CELL_SIZE / 2) * scaler,
      borderBottomRightRadius: (CELL_SIZE / 2) * scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    inRangeDay: {
      width: CELL_WRAPPER_WIDTH * scaler,
      height: CELL_SIZE * scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    monthLabel: {
      fontSize: 16 * scaler,
      color: '#000',
    },

    headerWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 5 * scaler,
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

    monthSelector: {
      fontSize: 14 * scaler,
    },

    prevText: {
      textAlign: 'left',
    },

    nextText: {
      textAlign: 'right',
    },

    yearLabel: {
      fontSize: 14 * scaler,
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
      fontSize: 14 * scaler,
      color: '#BBBBBB',
      alignSelf: 'center',
      justifyContent: 'center',
    },
  };
}
