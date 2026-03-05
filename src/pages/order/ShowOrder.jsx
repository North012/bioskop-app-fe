import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useOrder from "../../hooks/useOrder";
import "./ShowOrder.css";

function ShowOrder() {
    const { id } = useParams();
    const { showSeat, loading, error, chooseSeat } = useOrder();
    const [seat, setSeat] = useState(null);
    const navigate = useNavigate();

    // FORM UTAMA (seat_ids masuk ke sini)
    const [form, setForm] = useState({
        seat_ids: [],
    });

    useEffect(() => {
        const getSeat = async () => {
            try {
                const data = await showSeat(id);
                setSeat(data);
            } catch (err) {
                console.error("Gagal ambil data", err);
            }
        };
        getSeat();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!seat) return <p>Tidak ada data seat</p>;

    const studio = seat.theater.studio[0];

    // GROUP BY ROW
    const groupedSeats = studio.seats.reduce((acc, seat) => {
        acc[seat.row] = acc[seat.row] || [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    // SORT kursi
    Object.keys(groupedSeats).forEach((row) => {
        groupedSeats[row].sort((a, b) => {
            const numA = parseInt(a.seat_number.replace(/[^\d]/g, ""), 10);
            const numB = parseInt(b.seat_number.replace(/[^\d]/g, ""), 10);
            return numA - numB;
        });
    });

    // CEK sudah dipilih
    const isSelected = (seatId) => form.seat_ids.includes(seatId);

    // TOGGLE SEAT
    const toggleSeat = (item) => {
        if (item.status !== "available") return;

        let updatedSeatIds;

        if (isSelected(item.seat_id)) {
            // remove
            updatedSeatIds = form.seat_ids.filter((id) => id !== item.seat_id);
        } else {
            // add
            updatedSeatIds = [...form.seat_ids, item.seat_id];
        }

        setForm({
            ...form,
            seat_ids: updatedSeatIds,
        });
    };

    // KLIK SUBMIT FORM
    const handleSubmit = async () => {
        if (form.seat_ids.length === 0) return;

        try {
            const payload = {
                schedule_id: seat.schedule_id,
                seat_ids: form.seat_ids,
            };

            const response = await chooseSeat(payload);
            const seatDetailIds = response.data.map((item) => item.id);

            navigate("/order/detail", {
                state: {
                    ...payload,
                    seat_detail_id: seatDetailIds,
                    total_price: form.seat_ids.length * seat.price,
                },
            });
        } catch (err) {
            console.error("Gagal submit kursi", err);
        }
    };

    return (
        <div className="seat-map">
            <h2 className="mb-3 font-bold text-lg">{seat.theater.name}</h2>

            {Object.keys(groupedSeats).map((row) => (
                <div key={row} className="row">
                    {groupedSeats[row].map((item) => {
                        let seatClass = "seat";

                        if (item.status === "empty") seatClass += " empty-seat";
                        else if (item.status === "unavailable") seatClass += " unavailable-seat";
                        else if (item.status === "available") seatClass += " available-seat";

                        if (isSelected(item.seat_id)) seatClass += " selected-seat";

                        return (
                            <div
                                key={item.seat_id}
                                className={seatClass}
                                onClick={() => toggleSeat(item)}
                            >
                                {item.seat_number}
                            </div>
                        );
                    })}
                </div>
            ))}

            <div className="screen">LAYAR</div>

            <div className="mt-4 p-3 border rounded bg-gray-50 flex justify-between items-start gap-4">

                {/* KIRI */}
                <div className="w-1/2">
                    <h3 className="font-semibold mb-1">Total Harga:</h3>
                    <p className="text-lg font-bold">
                        Rp {(form.seat_ids.length * seat.price).toLocaleString("id-ID")}
                    </p>
                </div>

                {/* KANAN */}
                <div className="w-1/2 text-right">
                    <h3 className="font-semibold mb-1">Kursi Terpilih:</h3>
                    {form.seat_ids.length === 0 ? (
                        <p>Tidak ada kursi yang dipilih</p>
                    ) : (
                        <p>
                            {studio.seats
                                .filter((s) => form.seat_ids.includes(s.seat_id))
                                .map((s) => s.seat_number)
                                .join(", ")
                            }
                        </p>
                    )}
                </div>

            </div>


            {/* SUBMIT BUTTON */}
            <button
                onClick={handleSubmit}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
                disabled={form.seat_ids.length === 0}
            >
                Konfirmasi Kursi
            </button>
        </div>
    );
}

export default ShowOrder;
