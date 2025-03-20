import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import Modal from "react-modal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "./store/slices/calenderSlice";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import data from "./calenderData.json";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function App() {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.calendar);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const events = Object.keys(data).map((date) => ({
    title: "Event",
    start: new Date(date.split("-").reverse().join("-")),
    end: new Date(date.split("-").reverse().join("-")),
    dateKey: date,
  }));

  const handleSelectSlot = (slotInfo) => {
    const clickedDate = format(slotInfo.start, "dd-MM-yyyy");

    if (data[clickedDate]) {
      dispatch(setSelectedDate(clickedDate));
      setSelectedData(mapEventData(clickedDate));
    }
    setModalIsOpen(true);
  };

  const mapEventData = (dateKey) => {
    // console.log("dateKey ::: ", dateKey);
    const eventData = data[dateKey] || [];

    return eventData.map((item) => {
      const key = Object.keys(item)[0];
      const value = item[key];

      return {
        user: key,
        value: !isNaN(Number(value)) ? Number(value) : 0, // Handle mixed types
      };
    });
  };

  const handleSelectEvent = (event) => {
    const clickedDate = event.dateKey; // Use dateKey from event
    dispatch(setSelectedDate(clickedDate));
    setSelectedData(mapEventData(clickedDate));
    setModalIsOpen(true);
  };

  // useEffect(() => {
  //   console.log("selectedData ::: ", selectedData);
  // }, [selectedData]);

  const formatedDate = (inputDate) => {
    // console.log("inputDate", inputDate);

    const parsedDate = parse(inputDate, "dd-MM-yyyy", new Date());

    return format(parsedDate, "dd MMMM yyyy");
  };

  return (
    <div className="app-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "#ffffff",
            zIndex: 1001,
          },
        }}
      >
        <div>
          <h2>Date : {selectedDate && formatedDate(selectedDate)}</h2>
          {selectedData?.length > 0 ? (
            <ResponsiveContainer width="80%" height={200}>
              <BarChart data={selectedData}>
                <XAxis dataKey="user" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />

                <Bar
                  dataKey="value"
                  barSize={40}
                  isAnimationActive={false}
                  shape={(props) => {
                    const { x, y, width, height, payload } = props;

                    // Dynamically color based on value
                    const color = payload.value >= 0 ? "#4caf50" : "#f44336"; // Green for positive, Red for negative

                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={Math.abs(height)}
                        fill={color}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No data found for this date</p>
          )}
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
