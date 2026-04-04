import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useOrder from "../../hooks/useOrder";

function OrderList() {
    const { id } = useParams();
    const { searchDate, loading, error } = useOrder();
    const [booking, setBooking] = useState(null);
    const [date, setDate] = useState("");

    // Function untuk ambil ID YouTube dari berbagai format URL
    const getYoutubeId = (url) => {
        if (!url) return null;

        if (url.includes("youtu.be")) {
            return url.split("youtu.be/")[1]. split("?")[0];
        }

        if (url.includes("v=")) {
            return url.split("v=")[1].split("&")[0];
        }

        return null;
    };

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate[today];
    }, []);

    useEffect(() => {
        const getBooking = async () => {
            try {
                let data;

                if (date) {
                    data = await searchDate(id, date);
                } else {
                    data = await searchDate(id); // tanpa date
                }

                setBooking(data);
            } catch (err) {
                console.error(err);
            }
        };

        getBooking();
    }, [id, date]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!booking) return <p>Tidak ada data schedule untuk film ini</p>;

    const youtubeId = getYoutubeId(booking.trailer);

    return (
        <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-4">
                Jadwal Tayang
            </h1>

            {/* Trailer Preview */}
            {youtubeId && (
                <div className="w-full flex justify-center mb-6">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="Trailer Film"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                    ></iframe>
                </div>
            )}

            <div className="flex justify-center mb-4">
                <input
                    type="date"
                    value={date} 
                    onChange={(e) =>setDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
            </div>

            {/* Schedules */}
            {booking?.schedules?.length === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                    <p className="text-lg font-semibold">
                        Jadwal film pada hari ini kosong 🎬
                    </p>
                </div>
            ) : (
                /* Schedules */
                booking.schedules.map((schedule, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white shadow rounded-lg space-y-4"
                    >
                        {/* Tanggal */}
                        <h2 className="text-xl font-semibold border-b pb-2">
                            {new Date(schedule.date).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            })}
                        </h2>

                        {/* Theater */}
                        {schedule.theaters.map((theater, tIndex) => (
                            <div key={tIndex} className="space-y-2">
                                <p className="font-medium text-gray-700">
                                    🎥 {theater.theater_name}
                                </p>

                                {/* Times */}
                                <div className="flex flex-wrap gap-2">
                                    {theater.times.map((time) => (
                                        <Link
                                            key={time.id}
                                            to={`/order/detail/seat/${time.id}`}
                                            className="px-3 py-1 border rounded hover:bg-gray-100 text-sm inline-block"
                                        >
                                            {time.time}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderList;
