import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Calendar, { Constants } from '@letapp/react-native-calendar';

const colors = {
  gray: '#CFCFCF',
  white: '#FFFFFF',
  transparent: 'transparent',
  primary: '#fc7753',
  dark: '#2f3542',
  textPrimary: '#2f3542',
  border: '#d6d6d6',
  textSecondary: '#6B6E79',
  textTitle: '#403d58',
  textTitleSecondary: '#a4b0be',
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    alignItems: 'center',
  },
  calendarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  calendarTop: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarTopText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  close: {
    position: 'absolute',
    right: 0,
  },
  calendarBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 40,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.dark,
    backgroundColor: colors.transparent,
    marginRight: 8,
  },
  filledButton: {
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  outlineButtonText: {
    color: colors.textPrimary,
  },
  filledButtonText: {
    color: colors.white,
  },
  todayDay: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.border,
  },
  todayText: {},
  calendarText: {
    color: colors.textTitle,
  },
  calendarHeaderWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    // paddingVertical: 10,
    height: 40,
  },
  calendarHeaderWrapperText: {
    color: colors.white,
    paddingHorizontal: 12,
  },
  weekdaysText: {
    color: colors.textTitleSecondary,
  },
  weekdaysWrapper: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    paddingTop: 16,
    paddingBottom: 4,
  },
  daysWrapper: {
    justifyContent: 'center',
  },
  prev: {
    position: 'absolute',
    left: 0,
  },
  next: {
    position: 'absolute',
    right: 0,
  },
});

const getHitSlop = (isNext) => ({
  top: 10,
  bottom: 10,
  ...(isNext ? { left: 40, right: 10 } : { right: 40, left: 10 }),
});

// eslint-disable-next-line react/prop-types
const ControlComponent = (isNext) => ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={isNext ? s.next : s.prev}
    hitSlop={getHitSlop(isNext)}
  >
    <MaterialIcons
      name={isNext ? 'chevron-right' : 'chevron-left'}
      size={25}
      color={colors.white}
    />
  </TouchableOpacity>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.today = new Date();
    this.nextDate = new Date(new Date().getTime() + 2000000000);
    this.state = {
      selectedDate: this.today,
      selectedEndDate: this.nextDate,
      // selectedDate: null,
      // selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.selectToday = this.selectToday.bind(this);
    this.selectRange = this.selectRange.bind(this);
    this.resetSelections = this.resetSelections.bind(this);
  }

  onDateChange(date, dateType) {
    this.setState({
      ...((!dateType || dateType === Constants.START_DATE) && {
        selectedDate: date,
        selectedEndDate: null,
      }),
      ...(dateType === Constants.END_DATE && {
        selectedEndDate: date,
      }),
    });
  }

  selectToday() {
    this.onDateChange(new Date());
  }

  selectRange() {
    this.setState({
      selectedDate: this.today,
      selectedEndDate: this.nextDate,
    });
  }

  resetSelections() {
    this.calendarRef.current.resetSelections();
  }

  render() {
    const { selectedDate, selectedEndDate } = this.state;
    return (
      <View style={s.container}>
        <View style={s.calendarContainer}>
          <View style={s.calendarTop}>
            <Text style={s.calendarTopText}>Select Date</Text>
            <TouchableOpacity onPress={() => {}} style={s.close}>
              <MaterialIcons
                name="close"
                size={25}
                color={colors.border}
              />
            </TouchableOpacity>
          </View>

          <Calendar
            ref={this.calendarRef}
            onDateChange={this.onDateChange}
            selectedStartDate={selectedDate}
            selectedEndDate={selectedEndDate}
            initialDate={this.today}
            selectedDayColor={colors.primary}
            selectedDayTextColor={colors.white}
            todayStyle={s.todayDay}
            todayTextStyle={s.todayText}
            minDate={this.today}
            textStyle={s.calendarText}
            headerWrapperStyle={s.calendarHeaderWrapper}
            headerWrapperTextStyle={s.calendarHeaderWrapperText}
            weekdaysTextStyle={s.weekdaysText}
            weekdaysWrapperStyle={s.weekdaysWrapper}
            daysWrapperStyle={s.daysWrapper}
            PreviousComponent={ControlComponent()}
            NextComponent={ControlComponent(true)}
            // cellSize={30}
            // height={300}
            // allowRangeSelection
            // previousTitle="<"s
            // nextTitle=">"
            // startFromMonday
            swipeConfig={{
              velocityThreshold: 0.2,
            }}
          />

          <View style={s.calendarBottom}>
            <TouchableOpacity
              style={[s.button, s.outlineButton]}
              onPress={this.selectToday}
            >
              <Text style={s.outlineButtonText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.button, s.filledButton]}>
              <Text style={s.filledButtonText}>Choose</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
