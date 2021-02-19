import React from "react";
import { Link } from "@reach/router";

export default function MainPage() {
  return (
    <div className="main-page">
      <Link to="/servicio" className="button-reporte button">
        <p>Reporte de servicio</p>
      </Link>
      <Link to="/calculo" className="button-calculo button">
        <p>Cálculo de horas</p>
      </Link>
    </div>
  );
}
