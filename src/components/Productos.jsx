import React, { useEffect, useState } from "react";
import {
  getDocs,
  setDoc,
  doc,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp";

const Productos = () => {
  //proteger RUTA
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUser(user);
    } else {
      navigate("../", { replace: true });
    }
  }, []);

  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidadDisponibles, setCantidadDisponibles] = useState("");
  const [categoriaProducto, setCategoriaProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [impuestoProducto, setImpuestoProducto] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [ModoEdicion, setModoEdicion] = useState(false);
  //modal alerta
  const [modalAlert, setModalAlert] = useState(false);
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
  //aliminar
  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      const arrayEliminado = productos.filter((producto) => producto.id !== id);
      setProductos(arrayEliminado);
    } catch (error) {}
  };
  //agregar Producto

  const agregarProducto = async (e) => {
    e.preventDefault();

    if (
      nombreProducto === "" ||
      cantidadDisponibles === "" ||
      categoriaProducto === "" ||
      categoriaProducto === "" ||
      impuestoProducto === ""
    ) {
      setError("Todos los espacios son obligatorios");
      return;
    }
    try {
      const nuevoProducto = {
        cantidad: cantidadDisponibles,
        categoria: categoriaProducto,
        impuesto: impuestoProducto,
        nombre: nombreProducto,
        precio: precioProducto,
      };
      const ref = await addDoc(collection(db, "productos"), {
        cantidad: nuevoProducto.cantidad,
        categoria: nuevoProducto.categoria,
        impuesto: nuevoProducto.impuesto,
        nombre: nuevoProducto.nombre,
        precio: nuevoProducto.precio,
      });
      setProductos([...productos, { ...nuevoProducto, id: ref.id }]);
      setNombreProducto("");
      setCategoriaProducto("");
      setCantidadDisponibles("");
      setPrecioProducto("");
      setImpuestoProducto("");
      setPrecioProducto("");
      setModalAlert(true);
      setError("PRODUCTO AÑADIDO EXITOSAMENTE");
    } catch (error) {}
  };

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setNombreProducto(item.nombre);
    setCategoriaProducto(item.categoria);
    setCantidadDisponibles(item.cantidad);
    setImpuestoProducto(item.impuesto);
    setPrecioProducto(item.precio);
    setId(item.id);
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    if (
      nombreProducto === "" ||
      categoriaProducto === "" ||
      cantidadDisponibles === "" ||
      impuestoProducto === "" ||
      precioProducto === ""
    ) {
      setError("Todos los espacios son obligatorios");
      return;
    }

    try {
      await setDoc(doc(db, "productos", id), {
        nombre: nombreProducto,
        categoria: categoriaProducto,
        cantidad: cantidadDisponibles,
        impuesto: impuestoProducto,
        precio: precioProducto,
      });

      const arrayEditado = productos.map((productoEditado) =>
        productoEditado.id === id
          ? {
              id: productoEditado.id,
              nombre: nombreProducto,
              categoria: categoriaProducto,
              cantidad: cantidadDisponibles,
              impuesto: impuestoProducto,
              precio: precioProducto,
            }
          : productoEditado
      );
      setProductos(arrayEditado);
      setModoEdicion(false);

      setNombreProducto("");
      setCategoriaProducto("");
      setCantidadDisponibles("");
      setImpuestoProducto("");
      setPrecioProducto("");
      setId("");
    } catch (error) {}
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
            <div className="w-full md:w-2/3  border bg-gradient-to-r from-gray-500 to-gray-400 shadow-sm px-5 h-full">
              <h3 className=" text-white font-bold">
                {productos.map((products) => (
                  <div key={products.id} className="uppercase border my-5 p-3">
                    <p className="text-teal-500">{products.nombre} </p>
                    {products.cantidad < 10 ? (
                      <li className="text-white md:text-xl">
                        Cantidad Disponibles:{" "}
                        <span className="md:text-2xl text-redO ">
                          {products.cantidad}{" "}
                        </span>
                        <span className=" bg-orange-400 text-white text-sm font-bold rounded-md">
                          ¡Quedan pocos Disponibles!
                        </span>
                      </li>
                    ) : (
                      <li className="text-white text-lg ">
                        Cantidad Disponibles:{" "}
                        <span className="text-xl text-sky-700">
                          {products.cantidad}{" "}
                        </span>
                      </li>
                    )}
                    <button
                      onClick={() => eliminarProducto(products.id)}
                      className="float-right bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => activarEdicion(products)}
                      className="float-right mr-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-2 border-b-4 border-orange-700 hover:border-orange-500 rounded"
                    >
                      Editar
                    </button>
                    <li>categoria: {products.categoria} </li>

                    <li className="text-red-400">
                      precio aiva:<span className="text-teal-500">$</span>{" "}
                      {products.precio}{" "}
                    </li>

                    <li className="text-orange-400">
                      impuesto asignado: {products.impuesto}{" "}
                      <span className="text-teal-500">%</span>
                    </li>
                    <li className="text-green-400">
                      precio venta: <span className="text-teal-500">$</span>{" "}
                      {(Number(products.impuesto) / 100) *
                        Number(products.precio) +
                        Number(products.precio)}
                    </li>
                  </div>
                ))}
              </h3>
              <ul className="list-group"></ul>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h3 className="text-teal-500 font-bold text-2xl py-4">
                AGREGAR PRODUCTOS
              </h3>
              <form
                onSubmit={ModoEdicion ? editarProducto : agregarProducto}
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
                      placeholder="NOMBRE PRODUCTOS"
                      className="border"
                      value={nombreProducto}
                      onChange={(e) => setNombreProducto(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="cantidad"
                      className="bg-teal-500 rounded text-white font-bold px-2"
                    >
                      CANTIDAD DISPONIBLES
                    </label>
                    <hr />
                    <input
                      id="cantidad"
                      type="text"
                      placeholder="CANTIDAD STOCK"
                      className="border"
                      value={cantidadDisponibles}
                      onChange={(e) => setCantidadDisponibles(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="categoria"
                      className="bg-teal-500 rounded text-white font-bold px-2"
                    >
                      CATEGORIA
                    </label>
                    <hr />
                    <input
                      id="categoria"
                      type="text"
                      placeholder="CATEGORIA PRODUCTOS"
                      className="border"
                      value={categoriaProducto}
                      onChange={(e) => setCategoriaProducto(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="precio"
                      className="bg-teal-500 rounded text-white font-bold px-2"
                    >
                      PRECIO ANTES DE IVA
                    </label>
                    <hr />
                    <input
                      id="precio"
                      type="text"
                      placeholder="PRECIO ANTES IVA"
                      className="borde"
                      value={precioProducto}
                      onChange={(e) => setPrecioProducto(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="impuesto"
                      className="bg-teal-500 rounded text-white font-bold px-2"
                    >
                      IMPUESTO %
                    </label>
                    <hr />
                    <input
                      id="impuesto"
                      type="text"
                      placeholder="IMPUESTO EX 1,2,4,12,13"
                      className="border"
                      value={impuestoProducto}
                      onChange={(e) => setImpuestoProducto(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="mb-5">
                  {ModoEdicion ? (
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

export default Productos;
