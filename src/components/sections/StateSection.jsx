/* ============================================
   StateSection.jsx - Sección 04: useState
   ============================================
   
   ESTADO (State) = La "memoria" de un componente
   
   useState es el hook más importante de React.
   Cuando el estado cambia, React RE-RENDERIZA
   el componente automáticamente para mostrar
   los nuevos valores.
   
   Sintaxis: const [valor, setValor] = useState(valorInicial)
   
   - valor: el dato actual
   - setValor: función para cambiar el dato
   - valorInicial: con qué empieza
   
   REGLA CLAVE: NUNCA modificar el estado directamente
   ✗ cuenta = 5        (NUNCA hacer esto)
   ✓ setCuenta(5)      (siempre usar el setter)
*/

import { useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Componente: Contador simple
// Demuestra useState con número
function Contador() {
  // Declarar estado: cuenta empieza en 0
  const [cuenta, setCuenta] = useState(0)

  return (
    <div className="flex items-center gap-4">
      {/* Decrementar: usar función para estado previo */}
      <button
        onClick={() => setCuenta(c => c - 1)}
        className="w-10 h-10 rounded-xl glass hover:bg-red-500/20 text-red-400 font-bold transition-all hover:scale-110"
      >
        -
      </button>
      
      {/* Mostrar cuenta con color condicional */}
      <span className={`text-3xl font-bold min-w-[60px] text-center transition-colors ${
        cuenta > 0 ? 'text-green-400'    // Positivo = verde
        : cuenta < 0 ? 'text-red-400'    // Negativo = rojo
        : 'text-white'                    // Cero = blanco
      }`}>
        {cuenta}
      </span>
      
      {/* Incrementar */}
      <button
        onClick={() => setCuenta(c => c + 1)}
        className="w-10 h-10 rounded-xl glass hover:bg-green-500/20 text-green-400 font-bold transition-all hover:scale-110"
      >
        +
      </button>
      
      {/* Reset: establecer valor directo */}
      <button
        onClick={() => setCuenta(0)}
        className="px-3 py-2 rounded-xl glass hover:bg-white/10 text-gray-400 text-sm transition-all"
      >
        Reset
      </button>
    </div>
  )
}

// Componente: Toggle Switch
// Demuestra useState con boolean
function ToggleSwitch() {
  const [activo, setActivo] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setActivo(!activo)} // Invertir el valor
        className={`w-14 h-7 rounded-full transition-all duration-300 relative ${
          activo ? 'bg-green-500' : 'bg-gray-600'
        }`}
      >
        {/* Bolita que se mueve */}
        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 ${
          activo ? 'left-8' : 'left-1'
        }`} />
      </button>
      <span className={`text-sm font-medium ${activo ? 'text-green-400' : 'text-gray-400'}`}>
        {activo ? 'Activado ✓' : 'Desactivado'}
      </span>
    </div>
  )
}

// Componente: Selector de Color
// Demuestra useState con string
function CambiadorColor() {
  const [color, setColor] = useState('#61dafb')
  const colores = ['#61dafb', '#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="space-y-3">
      {/* Preview del color seleccionado */}
      <div
        className="w-full h-16 rounded-xl transition-all duration-500 flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="text-white font-bold text-sm mix-blend-difference">{color}</span>
      </div>
      {/* Botones de colores */}
      <div className="flex gap-2">
        {colores.map(c => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-8 h-8 rounded-lg transition-all hover:scale-125 ${
              color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-900' : ''
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  )
}

export default function StateSection() {
  return (
    <SectionWrapper
      id="state"
      number="04"
      title="useState"
      subtitle="Estado y reactividad"
      icon="🔄"
      color="orange"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué es el Estado?</h3>
            <p className="text-gray-400 leading-relaxed">
              El estado (<span className="text-orange-400 font-medium">state</span>) es 
              la memoria de un componente. Cuando cambia, React 
              <span className="text-orange-400 font-medium"> re-renderiza</span> el componente 
              automáticamente.
            </p>
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <code className="code-font text-sm text-orange-300">
                const [valor, setValor] = useState(valorInicial)
              </code>
            </div>
          </div>

          <CodeBlock
            title="useState.jsx"
            code={`import { useState } from 'react';

function Contador() {
  // Declarar estado con valor inicial 0
  // cuenta = valor actual
  // setCuenta = función para cambiarlo
  const [cuenta, setCuenta] = useState(0);

  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      
      {/* Actualizar con valor directo */}
      <button onClick={() => setCuenta(cuenta + 1)}>
        Incrementar
      </button>
      
      {/* Actualizar basado en estado PREVIO
          Usa función cuando dependes del valor anterior
          Esto es más seguro con actualizaciones rápidas */}
      <button onClick={() => setCuenta(prev => prev - 1)}>
        Decrementar
      </button>
    </div>
  );
}

// Estado con diferentes tipos de datos
function Ejemplo() {
  const [texto, setTexto] = useState('');     // string
  const [activo, setActivo] = useState(false); // boolean
  const [color, setColor] = useState('#fff');  // string
  const [lista, setLista] = useState([]);      // array
  const [user, setUser] = useState({           // objeto
    nombre: '', edad: 0 
  });
  
  // Para objetos: SIEMPRE spread (...) + cambio
  setUser(prev => ({ ...prev, nombre: 'Ana' }));
  
  // Para arrays: SIEMPRE spread (...) + nuevo item
  setLista(prev => [...prev, nuevoItem]);
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Contador interactivo">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-3">Contador con useState:</p>
                <Contador />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-500 mb-3">Toggle (boolean state):</p>
                <ToggleSwitch />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-500 mb-3">Selector de color:</p>
                <CambiadorColor />
              </div>
            </div>
          </LiveDemo>

          {/* Tips adicionales */}
          <div className="glass rounded-2xl p-6">
            <h4 className="text-white font-bold mb-3">📌 Reglas del Estado</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="text-red-400">✗</span>
                <span>Nunca modificar directo: <code className="text-red-400 code-font">cuenta = 5</code></span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Usar el setter: <code className="text-green-400 code-font">setCuenta(5)</code></span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Usar función cuando depende del previo</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Updates son asíncronos (batching)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}