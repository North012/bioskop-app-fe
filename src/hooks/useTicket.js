import { useState } from "react";
import api from "../api/axios";

function useTicket() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url, setState = true) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get(url);

            if (setState) setTickets(res.data.data);

            return res.data.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const activeTicket = () => fetchData("booking/active-ticket");
    const nonActiveTicket = () => fetchData("booking/non-active-ticket");
    const detailTicket = (id) => fetchData(`booking/booking-detail/${id}`, false);

    return {
        tickets,
        loading,
        error,
        activeTicket,
        nonActiveTicket,
        detailTicket,
    };
}

export default useTicket;