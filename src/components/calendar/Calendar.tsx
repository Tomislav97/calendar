// @ts-ignore
import calendarFakeData from '../../calendar-fake-data.json'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    parse,
    startOfDay,
    startOfToday,
} from 'date-fns'
import {useState} from "react";
import '../../styles/calendar.css'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';

type CalendarProps = {
    changeDate: Function
    selectedDate: Date
}

export const Calendar = (props: CalendarProps) => {
    const weekDays: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    const preselectedDate = startOfDay(props.selectedDate)
    const [selectedDay, setSelectedDay] = useState(preselectedDate)
    const [currentMonth, setCurrentMonth] = useState(format(preselectedDate, 'MMM yyyy'))
    const firstDayCurrentMonth: Date = parse(currentMonth, 'MMM yyyy', new Date())

    let days: Date[] = eachDayOfInterval({
        start: firstDayCurrentMonth, end: endOfMonth(firstDayCurrentMonth),
    })

    function changeMonth(months: number) {
        const firstDayNextMonth = add(firstDayCurrentMonth, {months})
        setCurrentMonth(format(firstDayNextMonth, 'MMM yyyy'))
    }

    function resetCalendarToCurrDay() {
        setCurrentMonth(format(startOfToday(), 'MMM yyyy'))
        setSelectedDay(startOfToday())
        props.changeDate(startOfToday())
    }

    function changeSelectedDay(day: Date) {
        setSelectedDay(day)
        props.changeDate(day)
    }

    return <div className={'container'}>
        <div className={'header-container'}>
            <p className={'month'}>{currentMonth}</p>
            <div className={'action-buttons'}>
                <ArrowBackIosRounded onClick={() => changeMonth(-1)} className={'cursor'}/>
                <TodayRoundedIcon onClick={() => resetCalendarToCurrDay()} className={'cursor'}/>
                <ArrowForwardIosRoundedIcon onClick={() => changeMonth(1)} className={'cursor'}/>
            </div>
        </div>
        <div className={'week-days'}>
            {weekDays.map((day: string) => <p key={Math.random()}>{day}</p>)}
        </div>
        <div className={'calendar-dates'}>
            {days.map((day: Date, index: number) => <div key={index}
                                                         className={'calendar-date'}>
                <button type={"button"} style={{gridColumnStart: index === 0 && getDay(day)}}
                        className={`date-button ${isSameDay(day, selectedDay) && 'selected-date'}`}
                        onClick={() => changeSelectedDay(day)}>
                    <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                </button>
                <div style={{
                    background: calendarFakeData.some(d => isSameDay(new Date(d.start.dateTime), day)) ? 'black' : 'white',
                }} className={'meeting-indicator'}/>
            </div>)}
        </div>
    </div>
}