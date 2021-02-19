function ISO8601_week_no(dt){
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

function calculateNormalExtra(diference, total){
    let extras = 0;
    let normales = 0;
    if (diference + total > 48){
        horasNormalesRestantes = 48-total;
        if (horasNormalesRestantes > 0){
            normales = horasNormalesRestantes;
            extras = diference-horasNormalesRestantes;
        }
        else{
            extras += diference;   
        }
    }
    else{
        normales += diference;
    }
    return [normales, extras];
}

module.exports = function calculateHours(arrayWorkDone, week){
    const oneDay = 24 * 60 * 60 * 1000;
    let normalB = new Date("01-01-2011 07:00:00");
    let normalA = new Date("01-01-2011 20:00:00");
    let horasNormales = 0;
    let horasNocturnas = 0;
    let horasDominicales = 0;
    let horasNormalesExtra = 0;
    let horasNocturnasExtra= 0;
    let horasDominicalesExtra= 0;
    let total = 0;
    for (const work of arrayWorkDone){
        let fechaFin = new Date(work.fecha_fin);
        let horaFin = new Date("01-01-2011 " + work.hora_fin);
        let fechaInicio = new Date(work.fecha_inicio);
        let horaInicio = new Date("01-01-2011 " + work.hora_inicio);
        thisWeek = ISO8601_week_no(fechaFin);
        const diffDays = Math.round(Math.abs((fechaFin - fechaInicio) / oneDay));
        if (thisWeek === week){
            let daysOfWork;
            if(fechaInicio.getTime() !== fechaFin.getTime()){
                let fechaBeforeMidNight = new Date(`${fechaInicio.getMonth()+1}-${fechaInicio.getDate()}-${fechaInicio.getFullYear()} 23:59:59`);
                let fechaMidNight = new Date(`${fechaFin.getMonth()+1}-${fechaFin.getDate()}-${fechaFin.getFullYear()} 00:00:00`);
                let horaBeforeMidNight = new Date("01-01-2011 23:59:59");
                let horaMidNight = new Date("01-01-2011 00:00:00");
                daysOfWork = [
                    [fechaBeforeMidNight, horaBeforeMidNight, fechaInicio, horaInicio],
                    [fechaFin, horaFin, fechaMidNight, horaMidNight]
                ];
            }
            else{
                daysOfWork = [[fechaFin, horaFin, fechaInicio, horaInicio]]
            }
            for (const oneDayOfWork of daysOfWork){
                [fechaFin, horaFin, fechaInicio, horaInicio] = oneDayOfWork;

                if (fechaInicio.getDay() !== 0){
                    if(horaInicio >= normalB && horaInicio <= normalA){
                        if(horaFin >= normalB && horaFin <= normalA){
                            let diference =  (horaFin-horaInicio)*(0.001/3600);
                            [normal, extra] = calculateNormalExtra(diference, total)
                            total += diference;
                            horasNormalesExtra += extra;  
                            horasNormales += normal;
                        } 
                        else{
                            let diference1 =  (normalA-horaInicio)*(0.001/3600);
                            let diference2 = (horaFin-normalA)*(0.001/3600);
                            [normal1, extra1] = calculateNormalExtra(diference1, total)
                            total += diference1;
                            horasNormalesExtra += extra1;  
                            horasNormales += normal1;
                            [normal2, extra2] = calculateNormalExtra(diference2, total)
                            total += diference2;
                            horasNocturnasExtra += extra2;  
                            horasNocturnas += normal2;
                        }      
                    } else if(horaInicio < normalB){
                        if(horaFin < normalB){
                            let diference =  (horaFin-horaInicio)*(0.001/3600);
                            [normal, extra] = calculateNormalExtra(diference, total)
                            total += diference;
                            horasNocturnasExtra += extra;  
                            horasNocturnas += normal;
                        }
                        else if(horaFin > normalA){
                            let diference1 =  (normalB-horaInicio)*(0.001/3600);
                            let diference2 = (normalA-normalB)*(0.001/3600);
                            let diference3 =  (horaFin-normalA)*(0.001/3600);
                            [normal1, extra1] = calculateNormalExtra(diference1, total)
                            total += diference1;
                            horasNocturnasExtra += extra1;  
                            horasNocturnas += normal1;
                            [normal2, extra2] = calculateNormalExtra(diference2, total)
                            total += diference2;
                            horasNormalesExtra += extra2;  
                            horasNormales += normal2;
                            [normal3, extra3] = calculateNormalExtra(diference3, total)
                            total += diference3;
                            horasNocturnasExtra += extra3;  
                            horasNocturnas += normal3;
                        }
                        else{
                            let diference1 =  (normalB-horaInicio)*(0.001/3600);
                            let diference2 = (horaFin-normalB)*(0.001/3600);
                            [normal1, extra1] = calculateNormalExtra(diference1, total)
                            total += diference1;
                            horasNocturnasExtra += extra1;  
                            horasNocturnas += normal1;
                            [normal2, extra2] = calculateNormalExtra(diference2, total)
                            total += diference2;
                            horasNormalesExtra += extra2;  
                            horasNormales += normal2;
                        }
                    } else if(horaInicio > normalA){
                        //This means that horaFin is also greater than normalA
                        let diference =  (horaFin-horaInicio)*(0.001/3600);
                        [normal, extra] = calculateNormalExtra(diference, total)
                        total += diference;
                        horasNocturnasExtra += extra;  
                        horasNocturnas += normal;
                    }
                } else if (fechaInicio.getDay() === 0){
                    let diference =  (horaFin-horaInicio)*(0.001/3600);
                    [normal, extra] = calculateNormalExtra(diference, total)
                    total += diference;
                    horasDominicalesExtra += extra;  
                    horasDominicales += normal;
                }  
            }
        }
    }
    return([horasNormales, horasNocturnas, horasDominicales, horasNormalesExtra, horasNocturnasExtra,
        horasDominicalesExtra, total]);
}


