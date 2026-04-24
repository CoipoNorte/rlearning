/* ============================================
   RefsSection.jsx - Sección 10: useRef
   ============================================
   
   useRef crea una REFERENCIA que:
   - Persiste entre renders (no se pierde)
   - NO causa re-render al cambiar (a diferencia de useState)
   
   2 usos principales:
   1. Acceder a elementos del DOM (input.focus(), etc.)
   2. Guardar valores que no necesitan re-render
      (IDs de timers, contadores de renders, etc.)
   
   ref.current = el valor actual
*/

import { useRef, useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Demo 1: Acceder al DOM con ref
function FocusInput() {
  // Crear referencia (empieza en null)
  const inputRef = useRef(null)

  return (
    <div className="flex gap-2">
      {/* Conectar ref al elemento DOM con el atributo ref= */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Haz click en el botón →"
        className="flex-1 px-3 py-2 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50 transition-colors"
      />
      <button
        // inputRef.current = el elemento <input> del DOM
        onClick={() => inputRef.current.focus()}
        className="px-4 py-2 glass rounded-xl hover:bg-react-500/20 text-react-500 text-sm transition-all"
      >
        🎯 Focus
      </button>
    </div>
  )
}

// Demo 2: Guardar ID de intervalo sin re-render
function Cronometro() {
  const [tiempo, setTiempo] = useState(0)
  const [corriendo, setCorriendo] = useState(false)
  // Ref para guardar el ID del intervalo
  // Si usáramos useState, causaría re-render innecesario
  const intervalRef = useRef(null)

  const iniciar = () => {
    if (corriendo) return
    setCorriendo(true)
    intervalRef.current = setInterval(() => {
      setTiempo(t => t + 10)
    }, 10)
  }

  const pausar = () => {
    setCorriendo(false)
    clearInterval(intervalRef.current)
  }

  const resetear = () => {
    setCorriendo(false)
    clearInterval(intervalRef.current)
    setTiempo(0)
  }

  // Formatear milisegundos a MM:SS.CC
  const formatear = (ms) => {
    const mins = Math.floor(ms / 60000)
    const secs = Math.floor((ms % 60000) / 1000)
    const centis = Math.floor((ms % 1000) / 10)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`
  }

  return (
    <div className="text-center space-y-4">
      <div className="text-4xl font-bold code-font text-white">
        {formatear(tiempo)}
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={corriendo ? pausar : iniciar}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            corriendo
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}
        >
          {corriendo ? '⏸ Pausar' : '▶ Iniciar'}
        </button>
        <button
          onClick={resetear}
          className="px-4 py-2 glass rounded-xl text-gray-400 text-sm transition-all hover:bg-white/10"
        >
          ↺ Reset
        </button>
      </div>
      <p className="text-xs text-gray-500">
        useRef guarda el ID del intervalo sin causar re-renders
      </p>
    </div>
  )
}

// Demo 3: Contar renders sin causar más renders
function ContadorRenders() {
  const [valor, setValor] = useState('')
  // Ref para contar renders (no causa re-render al cambiar)
  const renderCount = useRef(0)
  renderCount.current += 1 // Se incrementa en cada render

  return (
    <div className="space-y-2">
      <input
        value={valor}
        onChange={e => setValor(e.target.value)}
        placeholder="Escribe algo..."
        className="w-full px-3 py-2 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50"
      />
      <p className="text-sm text-gray-400">
        Renders: <span className="text-react-500 font-bold code-font">{renderCount.current}</span>
        <span className="text-xs text-gray-500 ml-2">
          (useRef no causa re-render al cambiar)
        </span>
      </p>
    </div>
  )
}

export default function RefsSection() {
  return (
    <SectionWrapper
      id="refs"
      number="10"
      title="useRef"
      subtitle="Referencias y valores persistentes"
      icon="🎯"
      color="cyan"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué es useRef?</h3>
            <p className="text-gray-400 leading-relaxed">
              Crea una referencia mutable que{' '}
              <span className="text-cyan-400 font-medium">persiste entre renders</span> sin 
              causar re-renders. Para DOM o valores internos.
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-300">
                📌 Acceder a elementos del DOM
              </div>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-300">
                📌 Guardar IDs de timers/intervalos
              </div>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-300">
                📌 Contar renders sin causar más
              </div>
            </div>
          </div>

          <CodeBlock
            title="useRef.jsx"
            code={`import { useRef, useState } from 'react';

// 1. Referencia al DOM
function FocusInput() {
  const inputRef = useRef(null);
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => {
        // .current = el elemento <input> real del DOM
        inputRef.current.focus();
      }}>
        Enfocar
      </button>
    </div>
  );
}

// 2. Guardar valor sin re-render
function Cronometro() {
  const [tiempo, setTiempo] = useState(0);
  const intervalRef = useRef(null); // NO re-renderiza
  
  const iniciar = () => {
    intervalRef.current = setInterval(() => {
      setTiempo(t => t + 1);
    }, 1000);
  };
  
  const parar = () => {
    clearInterval(intervalRef.current);
  };
}

// 3. Contar renders
function Componente() {
  const renderCount = useRef(0);
  renderCount.current += 1; // No causa re-render
  return <p>Renders: {renderCount.current}</p>;
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="useRef demos">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-3">🎯 Focus con ref:</p>
                <FocusInput />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-500 mb-3">⏱️ Cronómetro:</p>
                <Cronometro />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-500 mb-3">🔢 Contador de renders:</p>
                <ContadorRenders />
              </div>
            </div>
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  )
}