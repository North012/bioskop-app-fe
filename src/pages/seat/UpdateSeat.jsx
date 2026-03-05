import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useStudios from "../../hooks/useStudios";
import useSeats from "../../hooks/useSeats";
import "./Update.css";

function UpdateSeat() {
    const { id } = useParams();
    const { showStudio, loading: loadingStudio, error: errorStudio } = useStudios();
    const { updateSeats } = useSeats();
    const [studio, setStudio] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    // Ambil data studio
    useEffect(() => {
        const getStudio = async () => {
            try {
                const data = await showStudio(id);
                console.log("backend:", data);
                setStudio(data);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            }
        };
        getStudio();
    }, [id]);

    // Toggle kursi (semua status bisa diklik)
    const toggleSeat = (seat) => {
        setSelectedSeats(prev =>
            prev.includes(seat.id)
                ? prev.filter(s => s !== seat.id)
                : [...prev, seat.id]
        );
    };

    // Update status seat ke backend
    const updateSeatStatus = async (newStatus) => {
        if (selectedSeats.length === 0) return;

        const seatNumbers = selectedSeats.map(id => {
            const seat = studio.seat.find(s => s.id === id);
            return seat ? seat.seat_number : null;
        }).filter(Boolean);

        const payload = {
            studio_id: studio.id,
            status: newStatus,
            seat: seatNumbers
        };

        console.log("Data yang dikirim ke backend:", payload);

        try {
            await updateSeats(payload);
            console.log("Berhasil update seat:", payload);

            // Reset selectedSeats dan refresh studio
            setSelectedSeats([]);
            const data = await showStudio(id);
            setStudio(data);
        } catch (err) {
            console.error("Gagal update seat:", err);
        }
    };

    if (loadingStudio) return <p>Loading...</p>;
    if (errorStudio) return <p className="text-red-500">{errorStudio}</p>;
    if (!studio) return <p>Tidak ada data studio</p>;

    // Kelompokkan kursi per row
    const groupedSeats = studio.seat.reduce((acc, seat) => {
        acc[seat.row] = acc[seat.row] || [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    // Urutkan kursi per row
    Object.keys(groupedSeats).forEach(row => {
        groupedSeats[row].sort((a, b) => {
            const numA = parseInt(a.seat_number.replace(/[^\d]/g, ""), 10);
            const numB = parseInt(b.seat_number.replace(/[^\d]/g, ""), 10);
            return numA - numB;
        });
    });

    return (
        <div className="seat-map">
            <h2>{studio.name}</h2>

            {Object.keys(groupedSeats).map(row => (
                <div key={row} className="row">
                    {groupedSeats[row].map(seat => {
                        const isSelected = selectedSeats.includes(seat.id);
                        let seatClass = "seat";

                        if (isSelected) seatClass += " selected";
                        else if (seat.status === "empty") seatClass += " empty-seat";
                        else if (seat.status === "unavailable") seatClass += " unavailable-seat";
                        else if (seat.status === "available") seatClass += " available-seat";


                        return (
                            <div
                                key={seat.id}
                                className={seatClass}
                                onClick={() => toggleSeat(seat)}
                            >
                                {seat.seat_number}
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Tombol update status */}
            <div className="seat-buttons">
                <button
                    type="button"
                    className="btn-empty"
                    onClick={() => updateSeatStatus("empty")}
                >
                    Empty
                </button>

                <button
                    type="button"
                    className="btn-unavailable"
                    onClick={() => updateSeatStatus("unavailable")}
                >
                    Unavailable
                </button>

                <button
                    type="button"
                    className="btn-available"
                    onClick={() => updateSeatStatus("available")}
                >
                    Available
                </button>
            </div>
        </div>
    );
}

export default UpdateSeat;
