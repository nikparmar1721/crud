import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";

export default function Crud() {
  const [api, setApi] = useState([]);

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();

  const [deleteId, setDeleteId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const show = async () => {
    await axios
      .get(`https://63be7b18585bedcb36ae3316.mockapi.io/myapi`)
      .then((response) => {
        setApi(response.data);
        console.log(api);
      });
  };

  const additem = async () => {
    const data1 = {
      name: name,
      email: email,
      address: address,
      contact: contact,
    };
    await axios
      .post(`https://63be7b18585bedcb36ae3316.mockapi.io/myapi`, data1)
      .then((response) => {
        setId("");
        setName("");
        setEmail("");
        setAddress("");
        setContact("");
        show();
      });
  };

  const delet = async (id) => {
    setDeleteId(id);
    await axios
      .delete(`https://63be7b18585bedcb36ae3316.mockapi.io/myapi/${id}`)
      .then((response) => {
        show();
        setDeleteId(null);
      });
  };

  const edit = async () => {
    const data2 = {
      name: name,
      email: email,
      address: address,
      contact: contact,
    };
    await axios
      .put(`https://63be7b18585bedcb36ae3316.mockapi.io/myapi/${id}`, data2)
      .then((response) => {
        setId("");
        setName("");
        setEmail("");
        setAddress("");
        setContact("");
        show();
      });
  };

  const enableEditMode = () => {
    setIsEditMode(true);
  };

  useEffect(() => {
    show();
  });

  return (
    <div className="container">
      <div className="databox">
        <form className="form">
          <input
            type="text"
            className="input"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <input
            type="text"
            className="input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="text"
            className="input"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />

          <input
            type="text"
            className="input"
            placeholder="Enter Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </form>
        <br />
        {
          <button
            onClick={() => {
              if (isEditMode) {
                edit();
              } else {
                additem();
              }
              setIsEditMode(false);
            }}
          >
            {isEditMode ? "Edit" : "Add"}
          </button>
        }
      </div>
      <br />
      <div className="tablediv">
        <table className="table" border={2}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">CONTACT</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          {api.map((val, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.address}</td>
                  <td>{val.contact}</td>
                  <td>
                    <button
                      onClick={() => {
                        enableEditMode();
                        setId(val?.id);
                        setName(val?.name);
                        setEmail(val?.email);
                        setAddress(val?.address);
                        setContact(val?.contact);
                      }}
                    >
                      Edit
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => {
                        delet(val.id);
                      }}
                    >
                      {deleteId === val?.id}
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
