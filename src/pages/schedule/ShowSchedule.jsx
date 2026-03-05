import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useSchedules from "../../hooks/useSchedules";


function ShowSchedule() {
    const { id } = useParams();
    const { showSchedule, loading, error } = useSchedules();
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const data = await showSchedule(id);
                setSchedule(data);
                console.log("Data dari backend:", data);
            } catch (err) {
                console.error("Gagal mengambil data:", err);
            }
        };
        getSchedule();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!schedule) return <p>Tidak ada data schedule pada bioskop ini</p>

    return (
        <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-4">
                Jadwal Tayang Bioskop
            </h1>

            {schedule.map((studio, sIndex) => (
                <div key={sIndex} className="space-y-6">

                    {/* Nama Studio */}
                    <h2 className="text-xl font-bold mt-6">{studio.studio_name}</h2>
                    <Link to= {`/schedules/${studio.studio_id}/create`} className="hover:underline">Tambah Data</Link>

                    {/* Kalau tidak ada schedule sama sekali */}
                    {(!studio.schedules || studio.schedules.length === 0) && (
                        <p className="text-gray-500">Tidak ada jadwal di studio ini</p>
                    )}

                    {studio.schedules?.map((sch, schIndex) => (
                        <div key={schIndex} className="rounded-2xl shadow-lg p-4 bg-white">

                            {/* Tanggal */}
                            <div className="text-lg font-semibold mb-3">
                                {new Date(sch.date).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </div>

                            {/* Table tunggal untuk semua film di tanggal ini */}
                            <table className="w-full border-collapse mt-1 mb-1">
                                <tbody>
                                    {sch.films?.map((film, fIndex) => (
                                        <tr key={fIndex} className="align-top">

                                            {/* Kolom Judul Film */}
                                            <td className="p-0 pr-2 w-1/3">
                                                <h3 className="m-0 text-base font-semibold leading-none">
                                                    {film.title}
                                                </h3>
                                            </td>

                                            {/* Kolom Times */}
                                            <td className="p-0 w-2/3">
                                                <div className="flex flex-wrap">
                                                    {film.times?.map((t, tIndex) => (
                                                        <Link
                                                            key={tIndex}
                                                            to={`/schedules/${t.id}/edit`}
                                                        >
                                                            {t.time}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    ))}

                </div>
            ))}
        </div>

    );

}

export default ShowSchedule;
