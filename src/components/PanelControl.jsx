import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getAuth } from "firebase/auth";

const PanelControl = () => {
  
  const [cantidadClientesRegistrados, setCantidadClientesRegistrados] =
    useState([]);
  const [cantidadProductosRegistrados, setcantidadProductosRegistrados] =
    useState([]);
  const [cantidadFacturasRegistrados, setcantidadFacturasRegistrados] =
    useState([]);
  //PROTEGER LA RUTA VERIFICA SI HAY USUARIOS Y SINO REDIRIGE AL LOGIN
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
  //obtener datos facturas
  useEffect(() => {
    const obtenerDatosFacturas = async () => {
      const data = await getDocs(collection(db, "facturas"));
      const arrayFacturas = data.docs.map((facturas) => ({
        id: facturas.id,
        ...facturas.data(),
      }));
      setcantidadFacturasRegistrados(arrayFacturas.length);
    };

    obtenerDatosFacturas();
  }, []);
  //OBTENER DATOS CLIENTES
  useEffect(() => {
    const obtenerDatosCliente = async () => {
      const data = await getDocs(collection(db, "clientes"));

      const arrayData = data.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setCantidadClientesRegistrados(arrayData.length);
    };
    obtenerDatosCliente();
  }, []);
  //OBTENER DATOS CLIENTES
  useEffect(() => {
    const obtenerDatosProductos = async () => {
      const data = await getDocs(collection(db, "productos"));

      const arrayData = data.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setcantidadProductosRegistrados(arrayData.length);
    };
    obtenerDatosProductos();
  }, []);
  return (
    <>
      <div>
        <div className="w-full p-2 text-center bg-blue-600 mt-5 ">
          Hola Mundo
        </div>
      </div>
      <div className=" mb-4 mt-5 md:flex md:gap-8 m-5 h-50">
        <div className="md:w-1/3 p-2 text-center bg-red rounded-2xl">
          <h3>CLIENTES</h3>
          <div className="text-left">
            <p className=" font-bold"> INFORMACION CLIENTES:</p>
          </div>
          <div className="uppercase rounded-xl border my-5 p-3 text-left">
            <p className="text-teal-500"> </p>
            <li>
              Cantidad Clientes Registrados:{" "}
              <span className="font-bold text-2xl">
                {cantidadClientesRegistrados}
              </span>{" "}
            </li>
          </div>
          <div className="bg-redO text-2xl  font-semibold p-2 w-full  rounded-full hover:bg-redO focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
            {" "}
            <Link to="../clientes"> CREAR CLIENTE</Link>{" "}
          </div>
        </div>

        <div className="md:w-1/3 p-2 text-center bg-yellow rounded-2xl ">
          <h3>PRODUCTOS</h3>

          <div className="text-left">
            <p className=" font-bold"> INFORMACION PRDUCTOS:</p>
          </div>
          <div className="uppercase border rounded-xl my-5 p-3 text-left">
            <li className="">
              Cantidad productos Registrados:{" "}
              <span className="font-bold text-red-600 text-2xl">
                {cantidadProductosRegistrados}{" "}
              </span>
            </li>
          </div>
          <div className="bg-yellowfuerte text-2xl font-semibold p-2 w-full  rounded-full hover:bg-yellowfuerte focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
            {" "}
            <Link to="../productos"> CREAR PRODUCTOS</Link>{" "}
          </div>
        </div>
        <div className="md:w-1/3 p-2  text-center bg-green rounded-2xl ">
          <h3>CONTROL DE FACTURAS</h3>
          <div className="text-left">
            <p className=" font-bold"> INFORMACION PROFORMAS:</p>
          </div>
          <div className="uppercase border rounded-xl my-5 p-3 text-left">
            <p className="text-teal-500"> </p>
            <li>
              Cantidad GENERADAS{" "}
              <span className="font-bold text-red-600 text-2xl">
                {cantidadFacturasRegistrados}
              </span>{" "}
            </li>
          </div>
          <div className="bg-greenO text-2xl  font-semibold p-2 w-full  rounded-full hover:bg-greenO focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
            {" "}
            <Link to="../facturaform"> CREAR FACTURA PROFORMA</Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelControl;
