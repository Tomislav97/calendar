// @ts-ignore
import calendarFakeData from '../../calendar-fake-data.json'
import {format, isSameDay} from "date-fns";
import '../../styles/dateView.css'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import {useState} from "react";

type DateViewProps = {
    selectedDate: Date
}

export const DateView = (props: DateViewProps) => {
    const date = props.selectedDate
    const [selectedMeetingList, setSelectedMeetingList] = useState([])
    const meetingList = calendarFakeData.filter((d: any) => isSameDay(new Date(d.start.dateTime), date))

    const handleMeetingExpand = (id: string) => {
        setSelectedMeetingList(selectedMeetingList.includes(id) ? selectedMeetingList.filter(meetingId => meetingId !== id) : [...selectedMeetingList, id])
    }

    return <div className={'date-view-container'}>
        <p style={{marginBottom: '2rem'}} className={'primary-data'}>Schedule for {format(date, 'MMM dd, yyyy')}</p>
        {meetingList.length ? meetingList.map(m => {
            return (<div className={'meeting-container'} key={m.id} onClick={() => handleMeetingExpand(m.id)}>
                {selectedMeetingList.includes(m.id) ? <KeyboardArrowUpRoundedIcon/> : <KeyboardArrowDownRoundedIcon/>}
                <div>
                    <p style={{margin: 0}} className={'primary-data'}>Organizer: {m.organizer.email}</p>
                    <p className={'primary-data'}>Start: {format(new Date(m.start.dateTime), 'HH:mm ')},
                        End: {format(new Date(m.end.dateTime), 'HH:mm ')}</p>
                    {selectedMeetingList.includes(m.id) && <div style={{marginBottom: '1rem'}}>
                        <p>Summary: {m.summary}</p>
                        <p>Attendees:
                            {m.attendees?.map((a, index) => {
                                return <p key={index}>{a.email}</p>
                            }) || ' No attendees'}</p>
                        <p></p>
                        <a href={m.htmlLink} target={'_blank'} rel="noreferrer"> Meeting link </a>
                    </div>}
                </div>
            </div>)
        }) : <p>No meetings for selected date.</p>}
    </div>
}