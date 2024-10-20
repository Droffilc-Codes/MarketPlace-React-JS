import React from 'react'


const defaultOptions = {
    weekday: "short", 
    year: "numeric", 
    month: "long", 
    day: "numeric", 
    hour: "numeric", 
    minute: "numeric", 
    second: "numeric"
};
export default function DateTime({date, options = defaultOptions}) {

    const { weekday, year, month, day, hour, minute, second } = options;

    var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale

    const getDate = () => 
        new Intl.DateTimeFormat(currentLocale, {
            year,
            month,
            weekday,
            day,
            hour,
            minute,
            second
        }).format(Date.parse(date))
  return (
    <>
      {getDate()}
    </>
  )
}
