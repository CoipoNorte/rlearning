/* ============================================
   ListsSection.jsx - Sección 07: Listas y Keys
   ============================================
   
   Para renderizar listas en React usamos .map()
   
   REGLA IMPORTANTE: cada elemento necesita una "key"
   - La key debe ser ÚNICA entre hermanos
   - Ayuda a React a identificar qué cambió
   - NUNCA usar el index del array como key
     (causa bugs cuando la lista cambia)
   
   Operaciones comunes (siempre inmutables):
   - Agregar: [...prev, nuevo]
   - Eliminar: prev.filter(x => x.id !== id)
   - Actualizar: prev.map(x => x.id === id ? {...x, cambio} : x)
*/

import { useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Datos iniciales
const tecnologiasIniciales = [
  { id: 1, nombre: 'React', emoji: '⚛️', nivel: 90 },
  { id: 2, nombre: 'JavaScript', emoji: '💛', nivel: 85 },
  { id: 3, nombre: 'TypeScript', emoji: '💙', nivel: 75 },
  { id: 4, nombre: 'Node.js', emoji: '💚', nivel: 70 },
  { id: 5, nombre: 'CSS', emoji: '🎨', nivel: 80 },
]

function ListaTecnologias() {
  const [techs, setTechs] = useState(tecnologiasIniciales)
  const [filtro, setFiltro] = useState('')

  // Filtrar lista según texto de búsqueda
  const filtradas = techs.filter(t =>
    t.nombre.toLowerCase().includes(filtro.toLowerCase())
  )

  // ELIMINAR: filter crea un nuevo array sin el item
  const eliminar = (id) => {
    setTechs(prev => prev.filter(t => t.id !== id))
  }

  // AGREGAR: spread + nuevo item
  const agregar = () => {
    const nuevo = {
      id: Date.now(), // ID único basado en timestamp
      nombre: 'Nueva Tech',
      emoji: '🆕',
      nivel: Math.floor(Math.random() * 100)
    }
    setTechs(prev => [...prev, nuevo])
  }

  return (
    <div className="space-y-3">
      {/* Barra de búsqueda + botón agregar */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Filtrar..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className="flex-1 px-3 py-2 glass rounded-xl text-sm text-white placeholder-gray-500 border border-white/10 bg-transparent focus:outline-none focus:border-react-500/50"
        />
        <button
          onClick={agregar}
          className="px-3 py-2 glass rounded-xl hover:bg-green-500/20 text-green-400 text-sm transition-all"
        >
          + Agregar
        </button>
      </div>

      {/* Renderizar lista con .map() */}
      <div className="space-y-2">
        {filtradas.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No se encontraron resultados</p>
        ) : (
          filtradas.map(tech => (
            // key={tech.id} → OBLIGATORIO y ÚNICO
            <div
              key={tech.id}
              className="flex items-center gap-3 p-3 glass rounded-xl group hover:bg-white/5 transition-all"
            >
              <span className="text-xl">{tech.emoji}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{tech.nombre}</p>
                {/* Barra de progreso */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-react-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${tech.nivel}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{tech.nivel}%</span>
                </div>
              </div>
              {/* Botón eliminar: visible solo al hover */}
              <button
                onClick={() => eliminar(tech.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/20 text-red-400 transition-all text-xs"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
      <p className="text-xs text-gray-500 text-center">
        {filtradas.length} de {techs.length} items
      </p>
    </div>
  )
}

export default function ListsSection() {
  return (
    <SectionWrapper
      id="lists"
      number="07"
      title="Listas y Keys"
      subtitle="Renderizar colecciones de datos"
      icon="📋"
      color="blue"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Renderizar Listas</h3>
            <p className="text-gray-400 leading-relaxed">
              Usa <code className="text-blue-400 code-font bg-blue-500/10 px-1.5 py-0.5 rounded">.map()</code> para 
              transformar arrays en JSX. Cada elemento necesita una 
              <span className="text-blue-400 font-medium"> key única</span>.
            </p>
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-300 text-sm">
                ⚠️ <strong>Key</strong> ayuda a React a saber qué cambió. 
                Usa IDs únicos, <strong>nunca</strong> el index del array.
              </p>
            </div>
          </div>

          <CodeBlock
            title="Listas.jsx"
            code={`function ListaTechs() {
  const [techs, setTechs] = useState([
    { id: 1, nombre: 'React', emoji: '⚛️' },
    { id: 2, nombre: 'Vue', emoji: '💚' },
  ]);

  // .map() convierte cada objeto en JSX
  return (
    <ul>
      {techs.map(tech => (
        <li key={tech.id}>  {/* ← KEY OBLIGATORIA */}
          {tech.emoji} {tech.nombre}
        </li>
      ))}
    </ul>
  );
}

// Operaciones INMUTABLES (nunca mutar el array)

// AGREGAR → spread + nuevo
setTechs(prev => [...prev, nuevoItem]);

// ELIMINAR → filter (nuevo array sin el item)
setTechs(prev => prev.filter(t => t.id !== id));

// ACTUALIZAR → map (nuevo array con item modificado)
setTechs(prev => prev.map(t => 
  t.id === id 
    ? { ...t, completado: true }  // cambiar este
    : t                             // dejar igual
));

// FILTRAR → filter + estado de búsqueda
const filtradas = techs.filter(t => 
  t.nombre.includes(busqueda)
);`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Lista interactiva con filtro">
            <ListaTecnologias />
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  )
}