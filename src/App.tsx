import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "react-calendar";

function App() {
  const [holidayData, setHolidayData] = useState([]);

  useEffect(() => {
    handleDateChange(new Date());
  }, []);

  const handleDateChange = (date: any): void => {
    const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

    const url = `${baseApiUrl}&year=${date.getFullYear()}&month=
    ${date.getMonth() + 1}&day=${date.getDate()}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHolidayData(data);
      });
  };

  return (
    <div className="container">
      <h2>Select the date to see the holiday</h2>
      <Calendar onChange={handleDateChange} />

      <div className="holiday-data">
        {holidayData.length ? (
          holidayData.map((data: any, index: number) => (
            <p className="holiday">
              {index + 1}. {data.name}
            </p>
          ))
        ) : (
          <p className="no-holiday">No holiday found</p>
        )}
      </div>
    </div>
  );
}

export default App;
