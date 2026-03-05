import { useEffect, useState } from "react";
import api from "../api/axios";

function useOrder() {
    const [film, setFilm] = useState([]);
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nowPlayingFilm = async() => {
        setLoading(true);
        try {
            const res = await api.get(`film/now-playing`);
            setFilm(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const showScheduleFilm = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get(`film/film-schedule/${id}`);
            setBooking(res.data);
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.data);
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    const showSeat = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`booking/seat-detail/${id}`);
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const showPayment = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`booking/payment-detail/${id}`);
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const chooseSeat = async (payload) => {
        setLoading(true);
        try {
            const res = await api.post("/booking/seat-detail", payload);
            return res.data;
        } catch (err) {
            setError("Gagal mengirim data seat");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const createBooking = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const res = await api.post(`booking/store`, data);
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { film, booking, loading, error, showScheduleFilm, nowPlayingFilm, showSeat, chooseSeat, showPayment, createBooking };
}

export default useOrder;