import './App.css';
import {Route, Routes} from 'react-router-dom';
import {CalendarContainer} from "./components/calendar/CalendarContainer.tsx";


function App() {
    return (
        <Routes>
            <Route path="/:date" element={<CalendarContainer/>}/>
        </Routes>
    );
}

export default App;
