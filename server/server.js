var calculateHours = require('./calculateHours');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "reporte_servicio",
    password: "Mateolara-15M",
    port: 5432
});

//We tell the server to send static files first so that not just html is serve
app.use("/", express.static(path.join(__dirname, "/../client/dist")));

//Redirect all of your server requests to /index.html so that undefined server-side routing
//do not break your site -> routing handle by CSR (Reach router)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});

app.post("/api/v1/servicios", (req, res) => {
    const { id_servicio, id_tecnico, fecha_inicio, hora_inicio, fecha_fin, hora_fin } = req.body;

    pool.query(
        `INSERT INTO servicios (id_servicio, id_tecnico, fecha_inicio, hora_inicio, fecha_fin, hora_fin)\
        VALUES('${id_servicio}','${id_tecnico}','${fecha_inicio}','${hora_inicio}','${fecha_fin}','${hora_fin}')`,
        (error, results) => {
            if (error) {
                console.log(error)
                res.sendStatus(400);
            }
            else{
                res.sendStatus(201);
            }     
        }
    );
});

function ISO8601_week_no(dt) 
  {
     var tdt = new Date(dt.valueOf());
     var dayn = (dt.getDay() + 6) % 7;
     tdt.setDate(tdt.getDate() - dayn + 3);
     var firstThursday = tdt.valueOf();
     tdt.setMonth(0, 1);
     if (tdt.getDay() !== 4) 
    {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
     return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

app.post("/api/v1/calculo", (req, res) => {
    const { id_tecnico, selectedDate } = req.body;
    console.log(id_tecnico);
    console.log(selectedDate);
    let dateTimeFormat = new Date(selectedDate);
    year = dateTimeFormat.getFullYear()
    console.log(year);
    const week = ISO8601_week_no(dateTimeFormat);
    console.log(week);
    pool.query(
       `select * from servicios where id_tecnico = '${id_tecnico}' and \
       fecha_fin>='${year}-01-01' and fecha_fin<='${year}-12-31' order by fecha_fin, hora_fin`,
       (error, results) => {
           if (error) {
            res.status(400).send('Error in database operation');
           }
           else{
                //console.log(results.rows);
                [horasNormales, horasNocturnas, horasDominicales, horasNormalesExtra, horasNocturnasExtra,
                horasDominicalesExtra, total] = calculateHours(results.rows, week);
                result = {
                    'horasNormales': horasNormales.toFixed(3), 
                    'horasNocturnas': horasNocturnas.toFixed(3),
                    'horasDominicales': horasDominicales.toFixed(3), 
                    'horasNormalesExtra': horasNormalesExtra.toFixed(3), 
                    'horasNocturnasExtra': horasNocturnasExtra.toFixed(3),
                    'horasDominicalesExtra': horasDominicalesExtra.toFixed(3), 
                    'total': total.toFixed(3)
                }
                let jsonResponse = JSON.stringify(result);
                res.status(201).send(jsonResponse);
           }    
       }
    );
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`listening on http://localhost:8000`);
});

