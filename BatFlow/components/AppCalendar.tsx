import React from 'react';
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors } from '../pages/Styles';
import CustomText from './CustomText.tsx';
import { Calendar, CalendarProps, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

const dayComponent = ({ date, state, marking, onPress }: any) => {
  if (state === 'disabled') onPress = () => null;

  let dayStyle: ViewStyle = {
    width: 50,
    height: 50,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.grey,
    marginVertical: -7,
  };

  let textStyle: Text = {
    textAlign: 'center',
    lineHeight: 45,
    color: state === 'today' ? colors.primary : state === 'disabled' && !marking?.onPress ? 'gray' : colors.black,
  };

  if (marking?.startPeriod) {
    dayStyle = {
      ...dayStyle,
      backgroundColor: colors.pink,
    };
    textStyle = {
      ...textStyle,
      color: colors.white,
    };
  }

  if (marking?.selected) {
    dayStyle = {
      ...dayStyle,
      backgroundColor: colors.primary,
    };
    textStyle = {
      ...textStyle,
      color: colors.white,
    };
  }

  const handlePress = () => {
    if (marking?.onPress) {
      return marking.onPress();
    }
    return onPress(date);
  };

  return (
    <TouchableOpacity style={dayStyle} onPress={handlePress}>
      <CustomText style={textStyle}>{date.day}</CustomText>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          gap: 3,
          bottom: 2,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {marking?.period && <Image source={require('./../assets/blood.png')} style={{ width: 10, height: 15 }} />}
        {marking?.ovulation && (
          <Image source={require('./../assets/fertility.png')} style={{ width: 15, height: 15 }} />
        )}
        {marking?.optimalOvulation && (
          <Image source={require('./../assets/super-fertility.png')} style={{ width: 13, height: 13 }} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const AppCalendar = (props: {
  markedDates?: MarkedDates;
  selectedDate?: string;
  setSelectedDate?: (date: string) => any;
  options?: CalendarProps;
}) => {
  let markedDates: MarkedDates = {};
  let onDayPress = (_: DateData) => null;

  if (props.selectedDate) {
    markedDates[props.selectedDate] = {
      selected: true,
    };
  }

  if (props.markedDates) {
    markedDates = { ...markedDates, ...props.markedDates };
  }

  if (props.setSelectedDate) {
    onDayPress = (day: DateData) => props.setSelectedDate!(day.dateString);
  }

  return (
    <View style={{ width: 350 }}>
      <Calendar
        value={props.selectedDate}
        onDayPress={onDayPress}
        dayComponent={dayComponent}
        markedDates={markedDates}
        {...props?.options}
        theme={{
          backgroundColor: colors.white,
          calendarBackground: colors.white,
          textSectionTitleColor: colors.primary,
          arrowColor: colors.primary,
          disabledArrowColor: 'gray',
          monthTextColor: colors.primary,
          indicatorColor: colors.primary,
        }}
      />
    </View>
  );
};

export default AppCalendar;
