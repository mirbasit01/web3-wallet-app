import React, { useState } from "react";

function Loader({ text }) {

  return (
    <>
      <div className="">
        <div
          className="position-fixed w-100 mainLoader"
          style={{
            zIndex: 1100000000000,
            // marginTop: -200,
            height: '100%',
            marginLeft: 0,
            background: "rgba(0, 0, 0, 0.80)",
            backdropFilter: "blur(5px)",
            top: '0px',
            left: '0px',
            backgroundColor: 'black'
          }}
        >
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center" style={{ flexDirection: 'column' }}>
              <img width={120} className="mt-n4 hide-in-light-theme" src="\assets\loader.gif" alt="" />
              {/* <img width={120} className="mt-n4 d-none show-in-light-theme" src="\mainloader-light.svg" alt="" /> */}
              {/* <p
                className="text-center noora"
              >
                {text}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loader;