import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ejerciciosIniciales = [
  { dia: "Lunes", categoria: "Estabilidad y Control", sesiones: [
      { hora: "7:00 AM", nombre: "Elevación de pierna extendida", repeticiones: "3x12 por pierna" },
      { hora: "3:00 PM", nombre: "Deslizamiento de talón en el suelo", repeticiones: "3x10" },
      { hora: "9:00 PM", nombre: "Isométrico en pared", repeticiones: "3x20 seg" },
    ],
  },
  { dia: "Martes", categoria: "Movilidad y Flexibilidad", sesiones: [
      { hora: "7:00 AM", nombre: "Movilización de rótula", repeticiones: "3x15 seg" },
      { hora: "3:00 PM", nombre: "Extensión de rodilla sentado", repeticiones: "3x10" },
      { hora: "9:00 PM", nombre: "Elevaciones de talón", repeticiones: "3x15" },
    ],
  },
  { dia: "Miércoles", categoria: "Fuerza Ligera", sesiones: [
      { hora: "7:00 AM", nombre: "Step-ups en bajo escalón", repeticiones: "3x8 por pierna" },
      { hora: "3:00 PM", nombre: "Isométrico de cuádriceps sentado", repeticiones: "3x20 seg" },
      { hora: "9:00 PM", nombre: "Balanceo de pierna", repeticiones: "3x12" },
    ],
  },
  { dia: "Jueves", categoria: "Control y Coordinación", sesiones: [
      { hora: "7:00 AM", nombre: "Marcha en sitio", repeticiones: "3x30 seg" },
      { hora: "3:00 PM", nombre: "Sentadilla parcial", repeticiones: "3x10" },
      { hora: "9:00 PM", nombre: "Flexión de rodilla acostado", repeticiones: "3x12" },
    ],
  },
  { dia: "Viernes", categoria: "Activación Neuromuscular", sesiones: [
      { hora: "7:00 AM", nombre: "Mini-band caminata lateral", repeticiones: "3x10 por lado" },
      { hora: "3:00 PM", nombre: "Peso muerto con una pierna asistido", repeticiones: "3x8 por pierna" },
      { hora: "9:00 PM", nombre: "Puente de glúteo", repeticiones: "3x12" },
    ],
  },
  { dia: "Sábado", categoria: "Recuperación Activa", sesiones: [
      { hora: "8:00 AM", nombre: "Yoga suave", repeticiones: "30 minutos" },
      { hora: "5:00 PM", nombre: "Estiramientos generales", repeticiones: "20 minutos" },
    ],
  },
  { dia: "Domingo", categoria: "Descanso", sesiones: [
      { hora: "8:00 AM", nombre: "Caminata ligera", repeticiones: "20 minutos" },
    ],
  }
];

const mensajesMotivacionales = [
  "¡Sigue adelante, Pinche Vic cada repetición cuenta!",
  "Recuerda que la constancia es... un papel para faltar a la chamba.",
  "No creas todo lo que dicen del Uli, solo buscan justificar.",
  "Tú puedes, solo un poco más y sigues huevoneando!",
  "El dolor es temporal, la gloria es la vecina bien buena.",
  "No te rindas, estás más cerca de lo que crees!",
  "El esfuerzo de hoy es la victoria de mañana o Corona o Tecate.",
  "¡Tu Puedes, cabrón!",
  "Termina la serie y nos chingamos unas Caguamas."
];

const logros = [
  { nombre: "Rey del Sofá", descripcion: "Terminaste 5 rutinas seguidas sin pausa, ni como el Uli." },
  { nombre: "Modo Uli", descripcion: "Lograste procrastinar sin culpa después del ejercicio." },
  { nombre: "Diseñador Uli", descripcion: "Lograste cambiar el estilo y sobrevivir para contarlo." },
];

export default function LaRodillaDeVic() {
  const [rutinas, setRutinas] = useState(() => JSON.parse(localStorage.getItem("rutinas")) || ejerciciosIniciales);
  const [mensaje, setMensaje] = useState("");
  const [modoOscuro, setModoOscuro] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", modoOscuro);
    const mensajeAleatorio = mensajesMotivacionales[Math.floor(Math.random() * mensajesMotivacionales.length)];
    setMensaje(mensajeAleatorio);
    if (modoOscuro) {
      console.log("Entraste al Modo Uli: Diseño 10/10 papá.");
    }
  }, [rutinas, modoOscuro]);

  const marcarComoRealizado = (diaNombre, ejercicioNombre) => {
  const nuevasRutinas = rutinas.map((dia) => {
   if (dia.dia === diaNombre) {
     return {
       ...dia,
       sesiones: dia.sesiones.map((ej) =>
       ej.nombre === ejercicioNombre
          ? { ...ej, realizado: !ej.realizado }
         : ej
        ),
      };
    }
    return dia;
  });

  setRutinas(nuevasRutinas);
  localStorage.setItem("rutinas", JSON.stringify(nuevasRutinas));
};

    const agregarRutina = () => {
    const nuevaRutina = {
      dia: "Extra", categoria: "Nueva Rutina", sesiones: [
        { hora: "10:00 AM", nombre: "Nuevo ejercicio", repeticiones: "3x10" }
      ]
    };
    const nuevasRutinas = [...rutinas, nuevaRutina];
    setRutinas(nuevasRutinas);
    localStorage.setItem("rutinas", JSON.stringify(nuevasRutinas));
  };

  const eliminarRutina = (diaNombre) => {
  const nuevasRutinas = rutinas.filter((dia) => dia.dia !== diaNombre);
  setRutinas(nuevasRutinas);
  localStorage.setItem("rutinas", JSON.stringify(nuevasRutinas));
};

  return (
    <div className={`p-4 min-h-screen transition-colors duration-300 ${modoOscuro ? "bg-gray-900 text-white" : "bg-blue-700 text-white"}`}>
      <h1 className="text-3xl font-bold text-center">La Rodilla de Vic</h1>
      <p className="text-lg text-center font-semibold my-4 bg-yellow-200 p-2 rounded-md text-red-600">{mensaje}</p>
      <div className="flex justify-between mt-4 items-center">
        <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition transform shadow-xl rounded-md text-white" onClick={agregarRutina}>Agregar Rutina</button>
        <button
          onClick={() => {
            setModoOscuro(!modoOscuro);
            console.log("Diseñador Uli estaría orgulloso...");
          }}
          className="px-4 py-2 bg-gradient-to-r from-gray-600 to-black hover:scale-105 transition transform shadow-xl rounded-md text-white"
        >
          {modoOscuro ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>

      <AnimatePresence>
        {rutinas.map((dia) => (
          <motion.div
  key={dia.dia}
  className="my-4 border-2 border-red-500 p-4 rounded-md bg-white text-black"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -50 }}
>
  <div className="flex justify-between items-center">
    <h2 className="text-xl font-bold text-red-600">{dia.dia} - {dia.categoria}</h2>
    <button
      onClick={() => eliminarRutina(dia.dia)}
      className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md"
    >
      Eliminar
    </button>
  </div>
  {dia.sesiones.map((ej) => (
    <div
      key={ej.nombre}
      className={`flex justify-between items-center p-2 my-2 rounded-md border-2 border-black ${
        ej.realizado ? "bg-green-400" : "bg-yellow-400"
      }`}
    >
      <p
        className={`text-black font-semibold ${
          ej.realizado ? "line-through" : ""
        }`}
      >
        {ej.hora} - {ej.nombre} ({ej.repeticiones})
      </p>
      <button
        onClick={() => marcarComoRealizado(dia.dia, ej.nombre)}
        className={`px-2 py-1 ${
          ej.realizado
            ? "bg-red-500 hover:bg-red-700"
            : "bg-gradient-to-r from-green-500 to-teal-600 hover:scale-105"
        } transition transform shadow-md text-white rounded-md`}
      >
        {ej.realizado ? "Desmarcar" : "Realizado"}
      </button>
    </div>
  ))}
</motion.div>

        ))}
      </AnimatePresence>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center">Progreso</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rutinas.map((r, i) => ({ name: r.dia, ejercicios: r.sesiones.length }))}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ejercicios" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


