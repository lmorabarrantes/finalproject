import React from "react";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import db from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import PopUp from "./PopUp";

const Clientes = () => {
  //PROTEGER LA RUTA VERIFICA SI HAY USUARIOS Y SINO REDIRIGE AL LOGIN
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      console.log("existe usuario");
      setUser(user);
    } else {
      console.log("no existe el usuario");
      navigate("../", { replace: true });
    }
  }, []);
  const [clientes, setClientes] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [cedulaCliente, setCedulaCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [error, setError] = useState("");
  const [modoEdicion, setmMdoEdicion] = useState(false);
  const [id, setId] = useState("");

  //modal alerta
  const [modalAlert, setModalAlert] = useState(false);
  useEffect(() => {
    const obtenerDatosCliente = async () => {
      const data = await getDocs(collection(db, "clientes"));
      console.log(data.docs);

      const arrayData = data.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setClientes(arrayData);
    };
    obtenerDatosCliente();
  }, []);
  const eliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "clientes", id));
      const arrayEliminado = clientes.filter((cliente) => cliente.id !== id);
      setClientes(arrayEliminado);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarCliente = async (e) => {
    e.preventDefault();
    if (
      nombreCliente === "" ||
      cedulaCliente === "" ||
      emailCliente === "" ||
      telefonoCliente === "" ||
      direccionCliente === ""
    ) {
      setError("Todos los espacios son obligatorios");
      return;
    }
    try {
      const nuevoCliente = {
        nombre: nombreCliente,
        cedula: cedulaCliente,
        email: emailCliente,
        direccion: direccionCliente,
        telefono: telefonoCliente,
      };

      const ref = await addDoc(collection(db, "clientes"), {
        nombre: nuevoCliente.nombre,
        cedula: nuevoCliente.cedula,
        email: nuevoCliente.email,
        direccion: nuevoCliente.direccion,
        telefono: nuevoCliente.telefono,
      });
      setClientes([...clientes, { ...nuevoCliente, id: ref.id }]);
      console.log(ref);
      setError("");
      setNombreCliente("");
      setCedulaCliente("");
      setDireccionCliente("");
      setTelefonoCliente("");
      setEmailCliente("");
      setId("");
      setModalAlert(true);
      setError("CLIENTE AÑADIDO EXITOSAMENTE");
    } catch (error) {
      console.log(error);
    }
  };
  const activarEdicion = (item) => {
    setmMdoEdicion(true);
    setNombreCliente(item.nombre);
    setCedulaCliente(item.cedula);
    setDireccionCliente(item.direccion);
    setTelefonoCliente(item.telefono);
    setEmailCliente(item.email);
    setId(item.id);
  };
  const editarCliente = async (e) => {
    e.preventDefault();
    if (
      nombreCliente === "" ||
      cedulaCliente === "" ||
      emailCliente === "" ||
      telefonoCliente === "" ||
      direccionCliente === ""
    ) {
      setError("Todos los espacios son obligatorios");
      return;
    }

    try {
      await setDoc(doc(db, "clientes", id), {
        nombre: nombreCliente,
        cedula: cedulaCliente,
        email: emailCliente,
        direccion: direccionCliente,
        telefono: telefonoCliente,
      });
      console.log(id);

      const arrayEditado = clientes.map((clienteEditado) =>
        clienteEditado.id === id
          ? {
              id: clienteEditado.id,
              nombre: nombreCliente,
              cedula: cedulaCliente,
              email: emailCliente,
              direccion: direccionCliente,
              telefono: telefonoCliente,
            }
          : clienteEditado
      );
      setClientes(arrayEditado);
      setmMdoEdicion(false);

      setNombreCliente("");
      setCedulaCliente("");
      setDireccionCliente("");
      setTelefonoCliente("");
      setEmailCliente("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-w-screen h-screen bg-white">
        <PopUp
          modalAlert={modalAlert}
          setModalAlert={setModalAlert}
          error={error}
        />
        <div className="">
          <div className="flex mb-4 flex-col md:flex-row">
            {clientes > "" ? (
              <div className="w-full md:w-2/3  border bg-gradient-to-r from-gray-500 to-gray-400 shadow-sm px-5 h-full">
                <h3 className=" text-white font-bold">
                  {clientes.map((item) => (
                    <div key={item.id} className="uppercase border my-5 p-3">
                      <p className="text-teal-500">{item.nombre}</p>
                      <li>cedula: {item.cedula}</li>
                      <button
                        onClick={() => eliminar(item.id)}
                        className="float-right bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      >
                        Eliminar
                      </button>
                      <button
                        className="float-right mr-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-2 border-b-4 border-orange-700 hover:border-orange-500 rounded"
                        onClick={() => activarEdicion(item)}
                      >
                        Editar
                      </button>
                      <li>email: {item.email}</li>
                      <li>direccion: {item.direccion}</li>
                      <li>telefono: {item.telefono}</li>
                    </div>
                  ))}
                </h3>
              </div>
            ) : (
              <div className="w-full md:w-2/3 sm:text-sm border bg-slate-600 shadow-sm px-5 h-16">
                <h3 className=" text-white font-bold text-center  pt-3 ">
                  AGREGA UN CLIENTE
                </h3>
              </div>
            )}

            <div className="w-full md:w-1/3 text-center">
              {error ? (
                <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5 text-lg font-bold">
                  {error}{" "}
                </p>
              ) : (
                ""
              )}
              <h3 className=" text-2xl  py-4 text-teal-500 font-bold px-2 ">
                {modoEdicion ? <p>EDITAR CLIENTE</p> : <p>AGREGAR CLIENTE</p>}
              </h3>
              <form
                onSubmit={modoEdicion ? editarCliente : agregarCliente}
                className="m-5 r border border-cyan-900 "
              >
                <div className="">
                  <div className="py-2 ">
                    <label
                      htmlFor="nombre"
                      className="bg-teal-500 rounded text-white font-bold px-2 "
                    >
                      NOMBRE
                    </label>
                    <hr />
                    <input
                      id="nombre"
                      type="text"
                      placeholder="INGRESA NOMBRE"
                      className="border"
                      value={nombreCliente}
                      onChange={(e) => setNombreCliente(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="cedula"
                      className="bg-teal-500 rounded text-white font-bold px-2"
                    >
                      CEDULA
                    </label>
                    <hr />
                    <input
                      id="cedula"
                      type="text"
                      placeholder="INGRESA CEDULA"
                      className="border"
                      value={cedulaCliente}
                      onChange={(e) => setCedulaCliente(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="email"
                      className="bg-teal-500 rounded text-white font-bold px-2"
                    >
                      EMAIL
                    </label>
                    <hr />
                    <input
                      id="email"
                      type="email"
                      placeholder="INGRESA EMAIL"
                      className="border"
                      value={emailCliente}
                      onChange={(e) => setEmailCliente(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="direccion"
                      className="bg-teal-500 rounded text-white font-bold px-2"
                    >
                      DIRECCION
                    </label>
                    <hr />
                    <input
                      id="direccion"
                      type="text"
                      placeholder="DIRECCION GEOGRAFICA"
                      className="border"
                      value={direccionCliente}
                      onChange={(e) => setDireccionCliente(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      className="bg-teal-500 rounded text-white font-bold px-2"
                      htmlFor="telefono"
                    >
                      TELEFONO
                    </label>
                    <hr />
                    <input
                      id="telefono"
                      type="text"
                      placeholder="TELEFONO MOVIL"
                      className="border"
                      value={telefonoCliente}
                      onChange={(e) => setTelefonoCliente(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="mb-5">
                  {modoEdicion ? (
                    <p className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-2 border-b-4 border-orange-700 hover:orange-blue-500 rounded">
                      EDITAR CLIENTE
                    </p>
                  ) : (
                    <p className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                      AGREGAR CLIENTE
                    </p>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientes;
