import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const CatatanList = () => {
  const [catatan, setCatatan] = useState([]);

  useEffect(() => {
    getcatatan();
  }, []);

  const getcatatan = async () => {
    const response = await axios.get(`${BASE_URL}/catatan`);
    setCatatan(response.data);
  };

  const deleteCatatan = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/catatan/${id}`);
      getcatatan();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to="/add-catatan" className="button is-success mb-3">
          Add New
        </Link>
        <button onClick={logout} className="button is-danger ml-2">
          Logout
        </button>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Penulis</th>
              <th>Judul Catatan</th>
              <th>Isi Catatan</th>
              <th style={{ width: "180px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {catatan.map((catatan, index) => (
              <tr key={catatan.id}>
                <td>{index + 1}</td>
                <td>{catatan.penulis}</td>
                <td>{catatan.judul}</td>
                <td>{catatan.isi}</td>
                <td>
                  <div className="buttons">
                    <Link
                      to={`/edit/${catatan.id}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCatatan(catatan.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CatatanList;
