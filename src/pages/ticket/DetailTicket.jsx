import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useTicket from "../../hooks/useTicket";
import "./DetailTicket.css";

function DetailTicket() {
    const { id } = useParams();
    const { detailTicket, loading, error } = useTicket();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const getTicket = async () => {
            try {
                const data = await detailTicket(id);
                setTicket(data.data);
            } catch (err) {
                console.error("Error:", err);
            }
        };
        getTicket();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!ticket) return null;

    const film = ticket.schedule?.film;
    const theater = ticket.schedule?.studio?.theater;
    const studio = ticket.schedule?.studio;
    const detail = ticket.booking_detail;

    return (
        <div className="ticket-container-minimal">
            <div className="ticket-card-minimal">
                
                {/* Header */}
                <div className="ticket-header-minimal">
                    <img src={film.image} alt={film.title} className="poster-minimal" />
                    <div className="header-info-minimal">
                        <h1>{film.title}</h1>
                        <p>{theater.name} - {studio.name}</p>
                        <p className="date-time">{ticket.schedule.date} • {ticket.schedule.time}</p>
                    </div>
                </div>

                <hr />

                {/* Booking Info */}
                <div className="booking-info-minimal">
                    <div>
                        <h3>Booking ID</h3>
                        <p>{ticket.id}</p>
                    </div>
                    <div>
                        <h3>Status</h3>
                        <p className={`status ${ticket.status}`}>{ticket.status}</p>
                    </div>
                    <div>
                        <h3>Total Harga</h3>
                        <p>Rp {Number(ticket.total_price).toLocaleString()}</p>
                    </div>
                    <div>
                        <h3>Pembayaran</h3>
                        <p>{ticket.payment.payment_method}</p>
                    </div>
                </div>

                <hr />

                {/* Seats & Price */}
                <div className="seat-section-minimal">
                    <h2>Kursi & Rincian Harga</h2>
                    <ul className="seat-list-minimal">
                        {detail.map((d) => (
                            <li key={d.id}>
                                <span className="seat-number">{d.seat.seat_number}</span>
                                <span className="seat-price">
                                    Rp {Number(d.price).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr />

                {/* Total */}
                <div className="total-section-minimal">
                    <h3>Total Harga</h3>
                    <p className="total-price">Rp {Number(ticket.total_price).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailTicket;
