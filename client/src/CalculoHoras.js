import React, { useState } from "react";
import $ from "jquery";

const CalculoHoras = () => {
  let date = new Date();
  let isoDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  const [idTecnico, setIdTecnico] = useState("");
  const [dateTime, setDay] = useState(isoDateTime.slice(0, 16));
  const [hnor, setHnor] = useState("Horas normales:   ");
  const [hnoc, setHnoc] = useState("Horas nocturnas:   ");
  const [hd, setHd] = useState("Horas Dominicales:   ");
  const [hnore, setHnore] = useState("Horas normales Extra:   ");
  const [hnoce, setHnoce] = useState("Horas nocturnas Extra:   ");
  const [hde, setHde] = useState("Horas Dominicales Extra:   ");

  function sendData(jsonMessage) {
    $.ajax({
      url: "/api/v1/calculo",
      type: "POST",
      data: jsonMessage,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log(data);
        setHnor("Horas normales:   " + data.horasNormales);
        setHnoc("Horas nocturnas:   " + data.horasNocturnas);
        setHd("Horas Dominicales:   " + data.horasDominicales);
        setHnore("Horas normales Extra   " + data.horasNormalesExtra);
        setHnoce("Horas nocturnas Extra:   " + data.horasNocturnasExtra);
        setHde("Horas Dominicales Extra:   " + data.horasDominicalesExtra);
      },
      error: function (error) {
        console.log("Error:");
        console.log(error);
        alert("ERROR, error en la consulta");
      },
    });
  }

  async function calculate() {
    if (idTecnico) {
      let jsonMessage = JSON.stringify({
        id_tecnico: idTecnico,
        selectedDate: dateTime,
      });
      console.log(jsonMessage);
      await sendData(jsonMessage);
    } else {
      alert("ERROR, No puede haber campos vacios");
    }
  }

  return (
    <div className="calculo-horas">
      <form
        className="calculo"
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        <ul className="calculo-ul">
          <li className="id-tecnico">
            <label htmlFor="id-tecnico">Identificación del técnico: </label>
            <input
              className="input-text"
              type="text"
              value={idTecnico}
              onChange={(e) => setIdTecnico(e.target.value)}
            />
          </li>
          <li className="day">
            <label htmlFor="day">Semana: </label>
            <input
              type="datetime-local"
              name="initial-date"
              value={dateTime}
              min="2020-01-01T00:00"
              max="2031-01-01T00:00"
              onChange={(e) => setDay(e.target.value)}
            />
          </li>
        </ul>
        <button type="submit" className="send-query">
          Consultar
        </button>
      </form>
      <ul className="result">
        <li className="hnor">
          <label htmlFor="hnor">{hnor}</label>
        </li>
        <li className="hnoc">
          <label htmlFor="hnoc">{hnoc}</label>
        </li>
        <li className="hd">
          <label htmlFor="hd">{hd}</label>
        </li>
        <li className="hnore">
          <label htmlFor="hnore">{hnore}</label>
        </li>
        <li className="hnoce">
          <label htmlFor="hnoce">{hnoce}</label>
        </li>
        <li className="hde">
          <label htmlFor="hde">{hde}</label>
        </li>
      </ul>
    </div>
  );
};

export default CalculoHoras;
