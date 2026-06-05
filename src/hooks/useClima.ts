import { useEffect, useState } from 'react';

interface Clima {
  fecha: string;
  ciudad: string;
  humedad: number;
  velocidadViento: number;
  presionATM: number;
  temperatura: number;
  condicion: string;
}

interface Dia {
  date: string;
  day: {
    avgtemp_c: number;
    avghumidity: number;
    maxwind_kph: number;
    condicion: {
      text: string;
    };
  };
}
export default function useClima() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [dias, setDias] = useState<Dia[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState(0);
  const [ciudad, setCiudad] = useState('');
  const climaActual = dias[diaSeleccionado];


  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  const fechaHoy = hoy.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
  });
  const fechaAyer = ayer.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
  });
  const fechaMañana = mañana.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
  });

  
  useEffect(() => {
    async function traerInfoDeApi() {
      const respuesta = await fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=bfb3b780b81a490cb14224558260406&q=Argentina&days=3&aqi=no&alerts=no&lang=es"
      );
      const datos = await respuesta.json();
      setDias(datos.forecast.forecastday);


      setClima({
        fecha: new Date().toLocaleDateString('es-AR'),
        ciudad: datos.location.name,
        humedad: datos.current.humidity,
        velocidadViento: datos.current.wind_kph,
        presionATM: datos.current.pressure_mb,
        temperatura: datos.current.temp_c,
        condicion: datos.current.condition.text,
      });
    console.log(datos)

    }

    traerInfoDeApi();
  }, []);

    

  return { clima, fechaAyer, fechaHoy, fechaMañana, ciudad, dias, climaActual, diaSeleccionado, setDiaSeleccionado,};
}
