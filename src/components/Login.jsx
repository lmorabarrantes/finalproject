import { useCallback, useState } from "react";
import "../styles/login.css";
import PopUp from "./PopUp";
import { useNavigate, Link } from "react-router-dom";
import db from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [nombreLogin, setNombreLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [esRegistro, setesRegistro] = useState(false);
  const [loginJoin, setLoginJoin] = useState(false);

  const navigate = useNavigate();
  //PROCESAR DATOS verify if in register or login
  const procesarDatos = (e) => {
    e.preventDefault();
    if (email === "") {
      setErrorMessage("Email Vacio");
      return;
    }
    if (pass === "") {
      setErrorMessage("Password Vacio");
      return;
    }
    if (pass.length < 6) {
      setErrorMessage("Password inferior a 6 caracteres");
      return;
    }
    if (esRegistro) {
      register();
    } else {
      login();
    }
  };
  //LOGEAR USUARIOS
  const login = useCallback(async () => {
    try {
      const auth = getAuth();
      const respuesta = await signInWithEmailAndPassword(auth, email, pass);
      console.log(respuesta);
      setEmail(null);
      setPass(null);
      setErrorMessage(null);
      setNombreLogin(null);
      setLoginJoin(true);
      navigate("../panelcontrol", { replace: true });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("USUARIO INVALIDO");
      }
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Email no valido");
      }
    }
  }, [email, pass]);

  //REGISTRAR USUARIOS
  const register = useCallback(async () => {
    try {
      const auth = getAuth();
      const respuesta = await createUserWithEmailAndPassword(auth, email, pass);
      console.log(respuesta);
      await setDoc(doc(db, "usuarios", respuesta.user.email), {
        nombre: nombreLogin,
        email: respuesta.user.email,
        uid: respuesta.user.uid,
      });

      setEmail(null);
      setPass(null);
      setErrorMessage(null);
      setNombreLogin(null);
      setLoginJoin(true);

      navigate("../panelcontrol", { replace: true });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Email no valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Usuario ya Registrado");
      }
    }
  }, [email, pass, nombreLogin]);

  return (
    <>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div>
        <div className="mt-5">
          <h3 className="text-center">
            {esRegistro ? <p>REGISTER</p> : <p>LOGIN</p>}
          </h3>
          <hr />

          <div className="grid grid-cols-1 md:grid-cols-3 items-center m-5">
            {errorMessage ? (
              <p className="text-center border mb-5 bg-red-400 border-red-800 font-bold text-white col-start-2 text-2xl bg-red p-5 rounded-md uppercase">
                {errorMessage}{" "}
              </p>
            ) : null}
            <div className="border p-8 col-start-1 md:col-start-2">
              <h3 className="text-center">Inicia sesión para empezar</h3>
              <form onSubmit={procesarDatos}>
                {esRegistro ? (
                  <div className="flex w-full">
                    <input
                      type="text"
                      className="border mb-5 mt-5"
                      placeholder="Nombre"
                      onChange={(e) => setNombreLogin(e.target.value)}
                    />
                  </div>
                ) : null}
                <input
                  type="email"
                  className="w-full text-center border mb-5 mt-5"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className=" w-full text-center border block"
                  placeholder="Contraseña"
                  onChange={(e) => setPass(e.target.value)}
                />
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className=" text-white font-bold py-5 px-4 rounded mt-2 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 "
                  >
                    {esRegistro ? <p>REGISTER</p> : <p>LOGIN</p>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setesRegistro(true)}
                    className=" text-white font-bold py-2 px-2 rounded mt-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 "
                  >
                    {esRegistro ? (
                      <p>¿Posees una Cuenta?</p>
                    ) : (
                      <p>¿CREAR CUENTA?</p>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
