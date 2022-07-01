import React from "react";

const PopUp = ({ modalAlert, setModalAlert, error }) => {
  return (
    <>
      {modalAlert ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-teal-500 to-teal-500 outline-none focus:outline-none ">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blue-300 rounded-t ">
                <h3 className="text-3xl font=semibold bg-gradient-to-r from-teal-500 to-teal-500 rounded-sm text-white font-bold ">
                  {error}
                </h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setModalAlert(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-teal-700 py-0 rounded-full">
                    X
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PopUp;
