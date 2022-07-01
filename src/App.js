import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Clientes from "./components/Clientes";
import Productos from "./components/Productos";
import PanelControl from "./components/PanelControl";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FormularioFactura from "./components/FormularioFactura";
function App() {
  const auth = getAuth();
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);
  return firebaseUser !== false ? (
    <BrowserRouter>
      <NavBar firebaseUser={firebaseUser} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/panelcontrol" element={<PanelControl />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/facturaForm" element={<FormularioFactura />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <p>Cargando.....</p>
  );
}

export default App;
