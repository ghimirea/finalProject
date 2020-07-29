import React from 'react';
import moment from 'moment';
const dateFormatting = ({ date }) => {
  let formatDate = moment(date).format('dddd, MMMM Do YYYY, h:mm a');
  let timeAgo = moment(date).fromNow();

  return <p> {(formatDate, timeAgo)}</p>;
};

export default dateFormatting;