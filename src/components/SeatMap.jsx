import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SeatMap.css";

function SeatMap({ id }) {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/studio/${id}`)
            .then(res => {
                console.log("API Result:", res.data.data);   // cek isi
                setSeats(res.data.data);
            })
            .catch(err => console.error(err));
    }, [id]);


    // grupkan kursi per baris
    const groupedSeats = seats.reduce((acc, seat) => {
        acc[seat.row] = acc[seat.row] || [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    return (
        <div className="seat-map">
            <h2>Studio {id}</h2>
            <div className="screen">LAYAR</div>

            {Object.keys(groupedSeats).map(row => (
                <div key={row} className="row">
                    {groupedSeats[row].map(seat => (
                        <div
                            key={seat.id}
                            className={`seat ${seat.status}`}
                        >
                            {seat.seat_number}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default SeatMap;
