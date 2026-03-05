import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStudios from "../../hooks/useStudios";
import "./SeatMapStudio.css";

function ShowStudio() {
    const { id } = useParams();
    const { showStudio, loading, error } = useStudios();
    const [studio, setStudio] = useState(null);

    useEffect(() => {
        const getStudio = async () => {
            try {
                const data = await showStudio(id);
                setStudio(data);
                console.log("Data dari backend:", data);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            }
        };
        getStudio();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!studio) return <p>Tidak ada data studio</p>;

    // Kelompokkan kursi per row
    const groupedSeats = studio.seat.reduce((acc, seat) => {
        acc[seat.row] = acc[seat.row] || [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    // Urutkan seat per row
    Object.keys(groupedSeats).forEach((row) => {
        groupedSeats[row].sort((a, b) => {
            const numA = a.seat_number ? parseInt(a.seat_number.replace(/[^\d]/g, ""), 10) : 0;
            const numB = b.seat_number ? parseInt(b.seat_number.replace(/[^\d]/g, ""), 10) : 0;
            return numA - numB;
        });
    });

    return (
        <div className="seat-map">
            <h2>{studio.name}</h2>

            {Object.keys(groupedSeats).map((row) => (
                <div key={row} className="row">
                    {groupedSeats[row].map((seat) => {
                        let seatClass = "seat";

                        if (seat.status === "empty") seatClass += " empty-seat";
                        else if (seat.status === "unavailable") seatClass += " unavailable-seat";
                        else if (seat.status === "available") seatClass += " available-seat";

                        return (
                            <div key={seat.id} className={seatClass}>
                                {seat.seat_number}
                            </div>
                        );
                    })}
                </div>
            ))}

            <div className="screen">LAYAR</div>
        </div>
    );
}

export default ShowStudio;
