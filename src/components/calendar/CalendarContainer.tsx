import {Calendar} from "./Calendar";
import {DateView} from "./DateView";
import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {format} from "date-fns";
import '../../styles/calendarContainer.css'
import {GetLunches} from "../../api/queries";

export const CalendarContainer = () => {
    const navigate = useNavigate()
    const {date} = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date(date || '2019-06-26'))


    const {loading, error, data} = GetLunches()
    if (loading) <p>Loading...</p>;
    if (error) <p>Error :(</p>;
    console.log(data)


    function handleDateChange(date: Date) {
        setSelectedDate(date)
        navigate(`/${format(date, 'yyyy-MM-dd')}`)
    }

    return <div className={'calendar-container'}>
        <Calendar selectedDate={selectedDate} changeDate={handleDateChange}/>
        <DateView selectedDate={selectedDate}/>
    </div>
}




