import React from 'react';
import moment from 'moment';
import { Text } from 'react-native';
const dateFormatting = ({ date }) => {
  let formatDate = moment(date).format('dddd, MMMM Do YYYY, h:mm a');
  let timeAgo = moment(date).fromNow();

  return <Text> {(formatDate, timeAgo)}</Text>;
};

export default dateFormatting;
