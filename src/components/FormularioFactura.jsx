import { addDoc, collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase";
import Select from "react-select";
import Modal from "./Modal";
import PopUp from "./PopUp";

import { Link } from "react-router-dom";
const FormularioFactura = () => {
  //obetener datos y mostarr en MODAL
  const [datosCliente, setDatosCliente] = useState([]);
  const [datosProductos, setDatosProductos] = useState([]);
  console.log(datosProductos);
  //guardar datos de select
  const [nombreSelect, setNombreSelect] = useState([]);
  const [nombreClienteFactura, setNombreClienteFactura] = useState("");
  const [productoSelect, setProductoSelect] = useState([]);
  const [nombreProductoFactura, setNombreProductoFactura] = useState("");

  //   ARREGLOS GUARDADOS DE PRODUCTOS CLIENTES Y FACTURAS
  const [cantidadActual, setCantidadActual] = useState("");
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  //modal VENTANA FACTURA Y MODAL ALERTA
  const [showModal, setShowModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  //INPUTS SOLICITANDO NOMBRE AL USUARIO
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [id, setId] = useState(null);
  console.log(id);

  const [idInventario, setIdInventario] = useState(null);

  //MENSAJE DE ERROR
  const [error, setError] = useState(null);
  //OBTENER TODOS LOS CLIENTES
  useEffect(() => {
    const obtenerDatosCliente = async () => {
      const data = await getDocs(collection(db, "clientes"));

      const arrayClientes = data.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setClientes(arrayClientes);
    };
    obtenerDatosCliente();
  }, []);

  //OBTENER TODOS LOS PRODUCTOS
  useEffect(() => {
    const obtenerDatosProductos = async () => {
      const data = await getDocs(collection(db, "productos"));
      const arrayProductos = data.docs.map((productos) => ({
        id: productos.id,
        ...productos.data(),
      }));
      setProductos(arrayProductos);
    };

    obtenerDatosProductos();
  }, []);
  //OBTENER DATOS FACTURA
  useEffect(() => {
    const obtenerDatosProductos = async () => {
      const data = await getDocs(collection(db, "facturas"));
      const arrayFacturas = data.docs.map((facturas) => ({
        id: facturas.id,
        ...facturas.data(),
      }));
      setFacturas(arrayFacturas);
    };

    obtenerDatosProductos();
  }, []);
  //CREAR FACTURAS
  const agregarProducto = async (e) => {
    e.preventDefault();

    if (nombreClienteFactura === "" || cantidadProductos === "") {
      setError("Todos los espacios son obligatorios");
      return;
    }
    if (cantidadProductos >= Number(datosProductos.cantidad)) {
      setError(<h1 className="text-red">EXEDE LOS PRODUCTOS DE INVENTARIO</h1>);
      setModalAlert(true);
      return;
    }
    try {
      const nuevaFactura = {
        facha: Date.now(),
        nombre: nombreClienteFactura,
        email: datosCliente.email,
        direccion: datosCliente.direccion,
        telefono: datosCliente.telefono,
        productos: nombreProductoFactura,
        cantidad: cantidadProductos,
        cantidadDisponibles: datosProductos.cantidad,
        impuesto: datosProductos.impuesto,
        precio: datosProductos.precio,
      };
      const ref = await addDoc(collection(db, "facturas"), {
        facha: Date.now(),
        nombre: nuevaFactura.nombre,
        email: nuevaFactura.email,
        direccion: nuevaFactura.email,
        telefono: nuevaFactura.telefono,
        productos: nuevaFactura.productos,
        cantidad: nuevaFactura.cantidad,
        cantidadDisponibles: nuevaFactura.cantidadDisponibles,
        impuesto: nuevaFactura.impuesto,
        precio: nuevaFactura.precio,
      });
      setFacturas([...facturas, { ...nuevaFactura, id: ref.id }]);
      setError("FACTURA CREADA CORRECTAMENTE");
      setModalAlert(true);
      editarProducto();
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarFactura = (item) => {
    setId(item.id);
    setShowModal(true);
  };
  useEffect(() => {
    const arrayCliente = clientes.map((cliente) => ({
      value: cliente.nombre,
      label: cliente.nombre,
      direccion: cliente.direccion,
      email: cliente.email,
      telefono: cliente.telefono,
      id: cliente.id,
    }));
    const arrayProductos = productos.map((producto) => ({
      value: producto.nombre,
      label: producto.nombre,
      precio: producto.precio,
      impuesto: producto.impuesto,
      cantidad: producto.cantidad,
      categoria: producto.categoria,
      id: producto.id,
    }));
    setNombreSelect(arrayCliente);
    setProductoSelect(arrayProductos);
  }, [facturas]);

  const handleNameSelectName = (event) => {
    setNombreClienteFactura(event.value);
    setDatosCliente({
      direccion: event.direccion,
      email: event.email,
      telefono: event.telefono,
    });
  };
  const handleProductSelectName = (event) => {
    setNombreProductoFactura(event.value);
    setIdInventario(event.id);
    setCantidadActual(event.cantidad);
    setDatosProductos({
      id: event.id,
      nombre: event.value,
      categoria: event.categoria,
      precio: event.precio,
      impuesto: event.impuesto,
      cantidad: event.cantidad,
    });
  };
  //ELIMINAR PRODUCTOS DE INVENTARIO --------------------------------------------
  const editarProducto = async (e) => {
    try {
      await setDoc(doc(db, "productos", idInventario), {
        cantidad: Number(cantidadActual) - Number(cantidadProductos),
        categoria: datosProductos.categoria,
        impuesto: datosProductos.impuesto,
        nombre: datosProductos.nombre,
        precio: datosProductos.precio,
      });
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <PopUp
        modalAlert={modalAlert}
        setModalAlert={setModalAlert}
        error={error}
      />
      <div className="">
        <form onSubmit={agregarProducto}>
          <h1 className="text-center text-teal-500 text-3xl font-bold">
            CREAR FACTURA{" "}
          </h1>
          <div className="border text-center font-bold w-full shadow-xl px-5 py-10 ">
            {error && (
              <p className="border bg-red-200 text-center font-bold">
                {error}{" "}
              </p>
            )}
            <div>
              <label className="text-red-600 float-left  bg-teal-500 rounded text-white font-bold px-2 mr-5">
                Nombre fatura:
              </label>
              <Select
                options={nombreSelect}
                onChange={handleNameSelectName}
                placeholder="SELECCIONE CLIENTE"
                className="m-10"
              />
              <label className="text-red-600 float-left  bg-teal-500 rounded text-white font-bold px-2 mr-5">
                Productos Factura:
              </label>
              <Select
                options={productoSelect}
                onChange={handleProductSelectName}
                placeholder="SELECCIONE PRODUCTOS"
                className="m-10"
              />
              <h2 className="text-teal-500">
                STOCK DISPONIBLE:{" "}
                <span className="text-2xl">{datosProductos.cantidad} </span>
              </h2>
            </div>

            <div>
              <label className="text-red-600 float-left bg-teal-500 rounded text-white font-bold px-2">
                Cantidad a Facturar :
              </label>
              <input
                type="number"
                className="border"
                onChange={(e) => setCantidadProductos(e.target.value)}
                value={cantidadProductos}
                placeholder="CANTIDADES"
              />
            </div>
          </div>
          <div className="flex justify-center mt-5 text-lg">
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Crear Factura
            </button>
          </div>
        </form>
      </div>
      <div>
        <div>
          <p className="text-center bg-yellow-200">Listado Facturas</p>
          {facturas.map((item) => (
            <div
              key={item.id}
              className="border bg-slate-400 block md:flex gap-6 text-center p-4 uppercase justify-evenly "
            >
              <div className="">
                <div>
                  Nombre:{" "}
                  <h2 className="font-bold text-red-500">{item.nombre}</h2>{" "}
                </div>{" "}
              </div>

              <div className="">
                {" "}
                <div>
                  Numero Factura:
                  <h2 className="font-bold text-red-500">{item.id}</h2>{" "}
                </div>
              </div>

              <div className="">
                {" "}
                <Modal
                  showModal={showModal}
                  facturas={facturas}
                  id={id}
                  setShowModal={setShowModal}
                  datosCliente={datosCliente}
                />
                <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => mostrarFactura(item)}
                >
                  ABRIR
                </button>
                <button
                  className="bg-orange-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => mostrarFactura(item)}
                >
                  Anular
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormularioFactura;
