/* ============================================
   CustomHooksSection.jsx - Sección 11: Custom Hooks
   ============================================
   
   Custom Hooks = Funciones que empiezan con "use"
   y encapsulan lógica reutilizable.
   
   ¿Por qué?
   - Evitar repetir código entre componentes
   - Separar lógica del UI
   - Código más limpio y testeable
   
   Reglas:
   - SIEMPRE empezar con "use" (useAlgo)
   - Pueden usar otros hooks internamente
   - Son funciones normales que retornan lo que quieras
*/

import { useState, useEffect } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// =========================================
// CUSTOM HOOK: useLocalStorage
// Igual que useState pero persiste en localStorage
// =========================================
function useLocalStorage(key, initialValue) {
  // Inicializar estado desde localStorage (si existe)
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Retornar exactamente como useState: [valor, setter]
  return [value, setValue]
}

// =========================================
// CUSTOM HOOK: useToggle
// Boolean con funciones helper
// =========================================
function useToggle(initial = false) {
  const [state, setState] = useState(initial)
  const toggle = () => setState(s => !s)
  const setTrue = () => setState(true)
  const setFalse = () => setState(false)
  return { state, toggle, setTrue, setFalse }
}

// =========================================
// CUSTOM HOOK: useCounter
// Contador con increment, decrement y reset
// =========================================
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial)
  const increment = () => setCount(c => c + step)
  const decrement = () => setCount(c => c - step)
  const reset = () => setCount(initial)
  return { count, increment, decrement, reset }
}

// Componente que USA los custom hooks
function CustomHookDemo() {
  // Usar nuestros hooks como si fueran de React
  const [nombre, setNombre] = useLocalStorage('nombre-demo', '')
  const modal = useToggle(false)
  const counter = useCounter(0, 5)

  return (
    <div className="space-y-6">
      {/* Demo useLocalStorage */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500">
          useLocalStorage - persiste al recargar:
        </p>
        <input
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Escribe tu nombre (se guarda en localStorage)"
          className="w-full px-3 py-2 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50"
        />
        {nombre && (
          <p className="text-sm text-green-400">
            💾 Guardado: &quot;{nombre}&quot; — ¡Recarga la página!
          </p>
        )}
      </div>

      {/* Demo useToggle */}
      <div className="border-t border-white/10 pt-4 space-y-2">
        <p className="text-xs text-gray-500">useToggle:</p>
        <div className="flex gap-2">
          <button onClick={modal.toggle} className="px-3 py-1.5 glass rounded-lg text-sm hover:bg-white/10 transition-all">
            Toggle
          </button>
          <button onClick={modal.setTrue} className="px-3 py-1.5 glass rounded-lg text-sm hover:bg-green-500/20 text-green-400 transition-all">
            Open
          </button>
          <button onClick={modal.setFalse} className="px-3 py-1.5 glass rounded-lg text-sm hover:bg-red-500/20 text-red-400 transition-all">
            Close
          </button>
        </div>
        {modal.state && (
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 animate-slide-up">
            <p className="text-purple-300 text-sm">🎉 ¡Modal abierto con useToggle!</p>
          </div>
        )}
      </div>

      {/* Demo useCounter */}
      <div className="border-t border-white/10 pt-4 space-y-2">
        <p className="text-xs text-gray-500">useCounter (step = 5):</p>
        <div className="flex items-center gap-3">
          <button onClick={counter.decrement} className="w-8 h-8 glass rounded-lg text-red-400 hover:bg-red-500/20 transition-all">-</button>
          <span className="text-2xl font-bold text-white w-16 text-center code-font">{counter.count}</span>
          <button onClick={counter.increment} className="w-8 h-8 glass rounded-lg text-green-400 hover:bg-green-500/20 transition-all">+</button>
          <button onClick={counter.reset} className="px-3 py-1.5 glass rounded-lg text-xs text-gray-400 hover:bg-white/10 transition-all">Reset</button>
        </div>
      </div>
    </div>
  )
}

export default function CustomHooksSection() {
  return (
    <SectionWrapper
      id="custom-hooks"
      number="11"
      title="Custom Hooks"
      subtitle="Lógica reutilizable"
      icon="🪝"
      color="emerald"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué son los Custom Hooks?</h3>
            <p className="text-gray-400 leading-relaxed">
              Funciones con{' '}
              <code className="text-emerald-400 code-font bg-emerald-500/10 px-1.5 py-0.5 rounded">use</code>{' '}
              que <span className="text-emerald-400 font-medium">encapsulan lógica reutilizable</span>.
            </p>
          </div>

          <CodeBlock
            title="customHooks.js"
            code={`// useLocalStorage: useState que persiste
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]; // misma API que useState
}

// useToggle: boolean con helpers
function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = () => setState(s => !s);
  const setTrue = () => setState(true);
  const setFalse = () => setState(false);
  return { state, toggle, setTrue, setFalse };
}

// useCounter: contador reutilizable
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  return {
    count,
    increment: () => setCount(c => c + step),
    decrement: () => setCount(c => c - step),
    reset: () => setCount(initial),
  };
}

// USO: igual que los hooks de React
const [nombre, setNombre] = useLocalStorage('user', '');
const modal = useToggle(false);
const counter = useCounter(0, 5);`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Custom Hooks en acción">
            <CustomHookDemo />
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  )
}