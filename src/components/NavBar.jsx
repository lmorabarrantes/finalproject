import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
const NavBar = ({ firebaseUser }) => {
  const navigate = useNavigate();
  //cerrar sesion activa
  const auth = getAuth();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigate("../", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <nav className="flex flex-col lg:flex-row items-center justify-between flex-wrap h-30 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 ">
        <div className="  text-white mr-6">
          <Link to="/PanelControl">
            <img
              src="https://i.imgur.com/iMYhMud.png"
              alt="imagen Usuario"
              className="w-40 max-auto ml-5"
            />
          </Link>
        </div>
        <div className=" w-full  flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {firebaseUser !== null && (
              <div>
                <Link
                  to="/PanelControl"
                  className="md:mr-5 mr-1 p-2 font-bold rounded-sm  hover:bg-gradient-to-r from-cyan-500 to-blue-500 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 ... "
                >
                  PANEL
                </Link>
                <Link
                  to="/productos"
                  className="md:mr-5 mr-1 p-2 font-bold rounded-sm  hover:bg-gradient-to-r from-cyan-500 to-blue-500 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 ... "
                >
                  PRODUCTOS
                </Link>
                <Link
                  to="/clientes"
                  className="md:mr-5 mr-1 p-2 font-bold rounded-sm  hover:bg-gradient-to-r from-cyan-500 to-blue-500 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 ..."
                >
                  CLIENTES
                </Link>
                <Link
                  to="/facturaform"
                  className="md:mr-5 mr-1 p-2 font-bold rounded-sm  hover:bg-gradient-to-r from-cyan-500 to-blue-500 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 ... "
                >
                  PROFORMA
                </Link>

                <button
                  className="my-5 lg:my-8 ml-2 float-right font-bold rounded-sm   hover:bg-gradient-to-r from-cyan-500 to-blue-500 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 ... mr-5 text-redO"
                  onClick={logOut}
                >
                  ¡CERRAR SESION!
                </button>

                <div className="float-none mr-2 md text-center md:float-right mt-2  font-bold text-white">
                  <h1 className="uppercase mr-2 border p-1 lg:p-4 flex items-center">
                    BIENVENIDO: {auth.currentUser.email}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      alt="imagen Usuario"
                      className="w-10 max-auto float-right ml-5"
                    />
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
