import { Users, Activity, Clock, ChevronRight } from 'lucide-react';
import {useState, useEffect} from "react";
import Axios from "axios";

export function Dashoard() {
  const [datos, setDatos] = useState([])
 /* const stats = [
    { id: 1, label: 'Alumnos interesados', value: '48', icon: <Users />, color: 'blue' },
    { id: 2, label: 'Desean seguir estudiando Sistemas', value: '6', icon: <Clock />, color: 'amber' },
    { id: 3, label: 'Promedio de estudiantes de EMS', value: '8.5', icon: <Activity />, color: 'emerald' },
  ];*/

  const datosBd = async()=>{
    const datosbd = await Axios.get("http://localhost:4000/api/persona/buscar");
    setDatos(datosbd.data);
    console.log(datosbd.data);
  }
  useEffect(() => {
    datosBd();
  }, [])

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resumen de Actividad</h1>
        <p className="text-slate-500 text-sm">Monitorea de estudiantes visitados semanales.</p>
      </div>

      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* {stats.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-${item.color}-50 text-${item.color}-600`}>
              {item.icon}
            </div>
            <p className="text-sm text-slate-500 font-medium">{item.label}</p>
            <p className="text-3xl font-bold text-slate-800">{item.value}</p>
          </div>
        ))} */}
      </div>

      {/* Tabla de últimas consultas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Últimas Visitas a EMS</h2>
          <button className="text-blue-600 text-xs font-bold flex items-center hover:underline">
            VER TODO <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">EMS</th>
                <th className="px-6 py-4">Estudiantes</th>
                <th className="px-6 py-4">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {['EMSAD 19', 'CBTA 82', 'CECYTECH 19'].map((escuelas, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{escuelas}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">Visitados</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">
                      COMPLETADO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}
