import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useOrder from "../../hooks/useOrder";
import "./PaymentDetail.css"; // <── Tambahkan CSS

function PaymentDetail() {
    const { state } = useLocation();
    const { showPayment, createBooking } = useOrder();
    const [detail, setDetail] = useState(null);
    const [payment, setPayment] = useState("");

    useEffect(() => {
        if (state?.schedule_id) {
            showPayment(state.schedule_id)
                .then((res) => setDetail(res.data))
                .catch((err) => console.log("error:", err));
        }
    }, [state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            schedule_id: state.schedule_id,
            seat_detail_id: state.seat_detail_id,
            payment_method: payment,
        };

        try {
            console.log("DATA DIKIRIM:", data);

            const res = await createBooking(data);  // <── PENTING
            alert("Berhasil dipesan!");
        } catch (err) {
            console.log("ERR BOOKING:", err.response?.data || err);
            alert("Gagal membuat pesanan!");
        }
    };


    return (
        <form className="payment-container" onSubmit={handleSubmit}>

            {/* BAGIAN ATAS FILM */}
            <div className="film-header">
                {detail?.film?.image && (
                    <img
                        src={detail.film.image}
                        alt={detail.film.title}
                        className="film-image"
                    />
                )}

                <div className="film-info">
                    <h1 className="film-title">{detail?.film?.title}</h1>
                    <p className="film-studio">
                        {detail?.studio?.theater?.name} — {detail?.studio?.name}
                    </p>
                    <p className="film-date">
                        {detail?.date} • {detail?.time}
                    </p>
                </div>
            </div>

            {/* METODE PEMBAYARAN */}
            <div className="card">
                <h2 className="card-title">Metode Pembayaran</h2>

                <select
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className="select-input"
                >
                    <option value="">Pilih Metode Pembayaran</option>
                    <option value="cash">Cash</option>
                    <option value="transfer">Transfer Bank</option>
                    <option value="qris">QRIS</option>
                </select>
            </div>

            {/* DETAIL PEMBAYARAN */}
            <div className="card">
                <h2 className="card-title">Detail Pembayaran</h2>

                <div className="detail-row">
                    <span>Jumlah Tiket</span>
                    <span>{state.seat_ids.length}</span>
                </div>

                <div className="detail-row">
                    <span>Kursi</span>
                    <span>{state.seat_ids.join(", ")}</span>
                </div>

                {/* TAMPILKAN SEAT DETAIL ID */}
                <div className="detail-row">
                    <span>ID Seat Detail</span>
                    <span>{state.seat_detail_id.join(", ")}</span>
                </div>

                <div className="detail-row">
                    <span>Harga 1 Tiket</span>
                    <span>
                        Rp{" "}
                        {Number(
                            state.total_price / state.seat_ids.length
                        ).toLocaleString("id-ID")}
                    </span>
                </div>

                <div className="detail-row">
                    <span>Biaya Layanan</span>
                    <span>Rp {5000 .toLocaleString("id-ID")}</span>
                </div>

                <hr className="divider" />

                <div className="detail-total">
                    <span>Total Bayar</span>
                    <span>
                        Rp {Number(state.total_price + 5000).toLocaleString("id-ID")}
                    </span>
                </div>
            </div>

            <button className="btn-submit">Bayar Sekarang</button>
        </form>
    );
}

export default PaymentDetail;
