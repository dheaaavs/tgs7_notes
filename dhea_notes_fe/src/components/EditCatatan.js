import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCatatan = () => {
  const [penulis, setPenulis] = useState("");
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCatatanById();
  }, []);

  const updateCatatan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://notes-be-dhea-103949415038.us-central1.run.app/catatan/${id}`, {
        penulis,
        judul,
        isi,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getCatatanById = async () => {
    const response = await axios.get(`https://notes-be-dhea-103949415038.us-central1.run.app/catatan/${id}`);
    setPenulis(response.data.penulis);
    setJudul(response.data.judul);
    setIsi(response.data.isi);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title has-text-centered">Update Catatan</h1>
          <form onSubmit={updateCatatan}>
            <div className="field">
              <label className="label">Penulis</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={penulis}
                  onChange={(e) => setPenulis(e.target.value)}
                  placeholder="Nama penulis"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Judul</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Judul Catatan"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Isi</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  placeholder="Isi Catatan"
                ></textarea>
              </div>
            </div>
            <div className="field has-text-centered">
              <button type="submit" className="button is-success is-fullwidth">
                Update Catatan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCatatan;
