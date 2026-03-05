import { Link } from "react-router-dom";
import useSchedule from "../../hooks/useSchedules";
import "./ScheduleList.css"; // import CSS manual

function ScheduleList() {
    const { schedules, loading, error } = useSchedule();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="schedule-container">
            <h2 className="title">Schedule List</h2>

            <div className="list-wrapper">
                {schedules.map((theater) => (
                    <div key={theater.id} className="list-item">

                        <Link
                            to={`/schedules/${theater.id}/show`}
                            className="list-show"
                        >
                            <span className="list-name">{theater.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScheduleList;
