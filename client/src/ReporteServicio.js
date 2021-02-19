import React, { useState } from "react";
import $ from "jquery";

const ReporteServicio = () => {
  let date = new Date();
  let isoDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  const [idTecnico, setIdTecnico] = useState("");
  const [idServicio, setIdServicio] = useState("");
  const [initialDateTime, setInitialDate] = useState(isoDateTime.slice(0, 16));
  const [finalDateTime, setFinalDate] = useState(isoDateTime.slice(0, 16));
  const [sended, setSended] = useState("true");

  function sendData(jsonMessage) {
    $.ajax({
      url: "/api/v1/servicios",
      type: "POST",
      data: jsonMessage,
      //dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function () {
        console.log("Ok");
        alert("Reporte enviado con éxito");
        setSended("ture");
      },
      error: function (error) {
        console.log("Error:");
        console.log(error);
        alert("Error, no se pudo enviar reporte");
        setSended("false");
      },
    });
    if (sended === "true") {
      let date = new Date();
      let isoDateTime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString();
      setIdTecnico("");
      setIdServicio("");
      setInitialDate(isoDateTime.slice(0, 16));
      setFinalDate(isoDateTime.slice(0, 16));
    }
  }

  function divideDateTime(datetime) {
    const day = datetime.getDate();
    const month = datetime.getMonth() + 1; //month: 0-11
    const year = datetime.getFullYear();
    const date = year + "-" + month + "-" + day;
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const time = hours + ":" + minutes;
    return [date, time];
  }

  async function sendReport() {
    console.log(idTecnico, idServicio, initialDateTime, finalDateTime);

    let initialDateTimeFormat = new Date(initialDateTime);
    let finalDateTimeFormat = new Date(finalDateTime);

    let timeDiference =
      finalDateTimeFormat.getTime() - initialDateTimeFormat.getTime();
    console.log(timeDiference);

    if (timeDiference > 0 && timeDiference < 60 * 60 * 24 * 1000) {
      let dateTime = divideDateTime(initialDateTimeFormat);
      let initialDate = dateTime[0];
      let initialTime = dateTime[1];
      dateTime = divideDateTime(finalDateTimeFormat);
      let finalDate = dateTime[0];
      let finalTime = dateTime[1];
      if (idTecnico && idServicio) {
        let jsonMessage = JSON.stringify({
          id_servicio: idServicio,
          id_tecnico: idTecnico,
          fecha_inicio: initialDate,
          hora_inicio: initialTime,
          fecha_fin: finalDate,
          hora_fin: finalTime,
        });
        console.log(jsonMessage);
        await sendData(jsonMessage);
      } else {
        alert("ERROR, No puede haber campos vacios");
      }
    } else if (timeDiference <= 0) {
      alert("ERROR, Fecha de inicio debe ser menor que fecha de fin");
    } else {
      alert(
        "ERROR, Fecha de fin no debe exceder 24 horas de diferencia con fecha de inicia"
      );
    }
  }

  return (
    <div className="reporte-servicio">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendReport();
        }}
      >
        <ul className="sercicio-ul">
          <li className="id-tecnico">
            <label htmlFor="id-tecnico">Identificación del técnico: </label>
            <input
              className="input-text"
              type="text"
              value={idTecnico}
              onChange={(e) => setIdTecnico(e.target.value)}
            />
          </li>
          <li className="id-servicio">
            <label htmlFor="id-servicio">Identificación del servicio: </label>
            <input
              className="input-text"
              type="text"
              value={idServicio}
              onChange={(e) => setIdServicio(e.target.value)}
            />
          </li>
          <li className="initial-date">
            <label htmlFor="initial-date">Fecha y hora de inicio: </label>
            <input
              type="datetime-local"
              name="initial-date"
              value={initialDateTime}
              min="2020-01-01T00:00"
              max="2031-01-01T00:00"
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </li>
          <li className="final-date">
            <label htmlFor="final-date">Fecha y hora de fin: </label>
            <input
              type="datetime-local"
              name="final-date"
              value={finalDateTime}
              min="2020-01-01T00:00"
              max="2031-01-01T00:00"
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </li>
        </ul>
        <button type="submit" className="send-report">
          Enviar reporte
        </button>
      </form>
    </div>
  );
};

export default ReporteServicio;
