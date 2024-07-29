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

    let selectedData: string = "";
    let selectedMonth: string = "";

    if (date.getDate().toString().length === 1) {
      selectedData = "0" + date.getDate().toString();
    } else {
      selectedData = date.getDate().toString();
    }

    if ((date.getMonth() + 1).toString().length === 1) {
      selectedMonth = "0" + (date.getMonth() + 1).toString();
    } else {
      selectedMonth = (date.getMonth() + 1).toString();
    }

    console.info(date.getFullYear() + "-" + selectedMonth + "-" + selectedData);

    const url = `${baseApiUrl}&year=${date.getFullYear()}&month=${selectedMonth}&day=${selectedData}`;

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
