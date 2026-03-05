import { useEffect, useState } from "react";
import api from "../api/axios";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ambil user
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("users");
      setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // tambah user
  const createUser = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("users/store", formData);
      fetchUsers();
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // update users
  const updateUser = async (id, formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post(`users/update/${id}`,formData);
      await fetchUsers();
      return res.data;
    } catch (err) {
      console.error("Update User Error:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(`users/destroy/${id}`);
      await fetchUsers();
    } catch (err) {
      console.error("Delete User Error", err.response?.data ||err.message);
      setError(err.response?.data || "Terjadi kesalahan");
      throw err;
    } finally {
      setLoading(false);
    }
 };

  return { users, loading, error, fetchUsers, createUser, updateUser, deleteUser, };
}

export default useUsers;
