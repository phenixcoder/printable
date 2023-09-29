/**
 * Calendar Page component
 */

import { useEffect, useState } from "react";
import { BasePage } from "./BasePage";
import './Calendar.scss';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", 'Dec'];

const events: { date: Date, label: string }[] = []

function Now() {
  const d = (new Date())
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

/**
 * 
 * @param d Input Date
 * @returns Formatted Date in the format yyy-MM-dd
 */
function GetFormatDate(d: Date) {
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
}

export function Calendar() {
  const sd = new Date()
  if (sd.getDay() !== 0) {
    sd.setTime(sd.getTime() - sd.getDay() * 24 * 60 * 60 * 1000)
  }
  const [startDate, setStartDate] = useState(sd)

  const ed = new Date(sd.getTime() + 4 * 7 * 24 * 60 * 60 * 1000)
  if (ed.getDay() !== 6) {
    ed.setTime(ed.getTime() + (6 - ed.getDay()) * 24 * 60 * 60 * 1000)
  }
  const [endDate, setEndtDate] = useState(new Date(ed))
  const [currentTime, setCurrentTime] = useState((new Date()).toLocaleTimeString())
  let currentDate = startDate;
  let currentWeek = [];
  const weeks: Date[][] = []

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  while (currentDate.getTime() <= endDate.getTime()) {
    currentWeek.push(currentDate)
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
    if (currentDate.getDay() === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }
  return (<>
    <BasePage className="no-print">
      <h1 >Calendar</h1>
      <a href="/" className="back-link">Back to Home</a>
      <p>
        Current : {currentTime}
      </p>
      <p>
        Dates: <input type="date" value={GetFormatDate(startDate)} onChange={(e) => {
          // If selected Date is not a sunday, then set it to the previous sunday
          const d = new Date(e.target.value)
          if (d.getDay() !== 0) {
            d.setTime(d.getTime() - d.getDay() * 24 * 60 * 60 * 1000)
          }
          setStartDate(d)
        }} /> - <input type="date" value={GetFormatDate(endDate)} onChange={(e) => {
          // If selected Date is not a saturaday, then set it to the next saturaday
          const d = new Date(e.target.value)
          if (d.getDay() !== 6) {
            d.setTime(d.getTime() + (6 - d.getDay()) * 24 * 60 * 60 * 1000)
          }
          setEndtDate(d)
        }} />
        ({weeks.length} Weeks)
      </p>
    </BasePage>
    <BasePage size="A4-landscape">
      <div className="calendar">
        {weeks.map((week, index) => {
          return <div className="row-container">
            {index === 0 && <div className="before"></div>}
            <div className={`row ${index}`}>
              {week.map((date) => {
                return <div className="col">
                  <header>
                    <div className="date">{date.getDate()}   {MONTHS[date.getMonth()]}</div>
                    <div className="day">{DAYS[date.getDay()]}</div>
                  </header>
                  <section className="content">
                    <div className="event">&nbsp;</div>
                    <div className="event">&nbsp;</div>
                    <div className="event">&nbsp;</div>
                    <div className="event">&nbsp;</div>
                  </section>
                </div>
              })}
            </div>
            <div className="after"></div>
          </div>
        })}
      </div>
    </BasePage>
  </>
  );
}