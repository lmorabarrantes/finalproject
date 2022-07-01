import React from "react";

const Modal = ({ showModal, setShowModal, id, facturas }) => {
  const arrayEditado = facturas.filter((itemid) => itemid.id === id);
  return (
    <>
      {showModal && id ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  justify-between p-5 border-b border-solid border-slate-200 rounded-t items-center flex-col ">
                  <div className="text-3xl font-semibold">
                    PROFORMA <span className="text-redO">#{id}</span>{" "}
                  </div>
                  <img
                    src="https://i.imgur.com/iMYhMud.png"
                    alt="imagen Usuario"
                    className="w-40 max-auto ml-5"
                  />
                  <div className="block">
                    <h3>Wilberth Mora Piedra</h3>
                    <div className="flex flex-row">
                      <img
                        src="http://assets.stickpng.com/thumbs/5a4525cd546ddca7e1fcbc84.png"
                        alt="imagen ubi"
                        className="w-5 max-auto ml-1"
                      />
                      <h3>2472/2811 - 8865/6842</h3>
                    </div>
                    <div className="flex flex-row">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/0/619.png"
                        alt="imagen ubi"
                        className="w-5 max-auto ml-1"
                      />
                      <h3>venecia, San Carlos</h3>
                    </div>
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                    {arrayEditado.map((item) => (
                      <div key={item.id}>
                        <h3>{item.nombre} </h3>
                        <h3>{item.email} </h3>
                        <h3>+506 {item.telefono} </h3>
                        <h3>{item.direccion} </h3>
                        <h3>{item.fecha} </h3>
                        <div className="border font-bold grid grid-cols-3 text-center ">
                          <div className="border">
                            <p>nombre: </p>
                          </div>
                          <div className="border">
                            <p>Cantidad: </p>
                          </div>
                          <div className="border">
                            <p>Precio Final</p>
                          </div>
                        </div>
                        <div className="border font-bold grid grid-cols-3 text-center mt-5 mb-10 ">
                          <div className="">
                            <p>{item.productos}</p>
                          </div>
                          <div className="">
                            <p>{item.cantidad}</p>
                          </div>
                          <div className="">
                            <p>{item.precio}</p>
                          </div>
                        </div>
                        <div className="border font-bold grid grid-cols-2 text-center ">
                          <div className="border">
                            <div>
                              <p> BN 100-01-050-000287-2 Colones (¢)</p>
                              <p> BCR 001-272476-6 Colones (¢)</p>
                              <p>
                                {" "}
                                IBAN BCR CR67015201001027247665 Colones (¢)
                              </p>
                              <p>BN IBAN CR17015105010010002870 Colones (¢)</p>
                            </div>
                          </div>
                          <div className="border">
                            <p>Precio AIV: {item.precio * item.cantidad} </p>
                            <p>EXENTO: NO </p>
                            <p>IMPUESTO: {item.impuesto}%</p>
                            <p>
                              PRECIO IVI :{" "}
                              {((Number(item.impuesto) / 100) *
                                Number(item.precio) +
                                Number(item.precio)) *
                                Number(item.cantidad)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    Especialistas en LLantas y baterias
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    CERRAR FACTURA
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
