/* ============================================
   MemoSection.jsx - Sección 12: Memoización
   ============================================
   
   Optimización de rendimiento. 3 herramientas:
   
   1. React.memo(Componente)
      → No re-renderizar si las props no cambiaron
   
   2. useMemo(fn, [deps])
      → Memorizar el RESULTADO de un cálculo costoso
      → Solo recalcula cuando las dependencias cambian
   
   3. useCallback(fn, [deps])
      → Memorizar la REFERENCIA de una función
      → Útil al pasar funciones a componentes memo
   
   ⚠️ NO memorizar todo. Solo cuando hay problemas reales.
*/

import { useState, useMemo, useCallback, memo } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Componente envuelto en React.memo()
// Solo se re-renderiza si sus PROPS cambian
const BotonMemo = memo(function BotonMemo({ onClick, label }) {
  // Este timestamp nos permite VER cuándo se re-renderiza
  const renderTime = new Date().toLocaleTimeString()
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all"
    >
      {label}{' '}
      <span className="text-xs text-gray-500 code-font">({renderTime})</span>
    </button>
  )
})

function MemoDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // useCallback: memoriza la función
  // Sin esto, se crearía una NUEVA función en cada render
  // y React.memo pensaría que la prop cambió
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, []) // [] = nunca cambia

  // useMemo: memoriza el RESULTADO del cálculo
  // Solo recalcula cuando count cambia
  const numEsPrimo = useMemo(() => {
    if (count < 2) return false
    for (let i = 2; i <= Math.sqrt(count); i++) {
      if (count % i === 0) return false
    }
    return true
  }, [count])

  // Otro cálculo costoso memorizado
  const fibonacciResult = useMemo(() => {
    const fib = (n) => {
      if (n <= 1) return n
      let a = 0, b = 1
      for (let i = 2; i <= n; i++) {
        const temp = a + b
        a = b
        b = temp
      }
      return b
    }
    return fib(count)
  }, [count])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-white code-font">{count}</span>
        {/* Este botón NO se re-renderiza al escribir en el input */}
        <BotonMemo onClick={handleIncrement} label="➕ Incrementar" />
      </div>

      {/* Resultados memorizados */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 glass rounded-xl">
          <p className="text-xs text-gray-500">¿Es primo?</p>
          <p className={`font-bold ${numEsPrimo ? 'text-green-400' : 'text-red-400'}`}>
            {numEsPrimo ? '✓ Sí' : '✗ No'}
          </p>
        </div>
        <div className="p-3 glass rounded-xl">
          <p className="text-xs text-gray-500">Fibonacci({count})</p>
          <p className="font-bold text-react-500 code-font">{fibonacciResult}</p>
        </div>
      </div>

      {/* Input que causa re-render pero NO afecta al botón */}
      <div>
        <p className="text-xs text-gray-500 mb-1">
          Escribir aquí NO re-renderiza el botón:
        </p>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe algo..."
          className="w-full px-3 py-2 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50"
        />
        {text && (
          <p className="text-xs text-gray-400 mt-1">
            El botón conserva su timestamp = no se re-renderizó ✨
          </p>
        )}
      </div>
    </div>
  )
}

export default function MemoSection() {
  return (
    <SectionWrapper
      id="memo"
      number="12"
      title="Memoización"
      subtitle="useMemo, useCallback y React.memo"
      icon="🧠"
      color="rose"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Optimización de rendimiento</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <p className="text-rose-300 font-semibold">React.memo()</p>
                <p className="text-rose-300/70 text-xs mt-1">No re-renderizar si props iguales</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-300 font-semibold">useMemo(fn, deps)</p>
                <p className="text-purple-300/70 text-xs mt-1">Memorizar resultado de cálculo</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-300 font-semibold">useCallback(fn, deps)</p>
                <p className="text-blue-300/70 text-xs mt-1">Memorizar referencia de función</p>
              </div>
            </div>
          </div>

          <CodeBlock
            title="Memoizacion.jsx"
            code={`import { memo, useMemo, useCallback } from 'react';

// React.memo: no re-renderizar si props iguales
const Boton = memo(function Boton({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // useCallback: memorizar la función
  // Sin esto, se crea una NUEVA función cada render
  // y Boton pensaría que onClick cambió
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // useMemo: memorizar el resultado
  // Solo recalcula cuando count cambia
  const esPrimo = useMemo(() => {
    if (count < 2) return false;
    for (let i = 2; i <= Math.sqrt(count); i++) {
      if (count % i === 0) return false;
    }
    return true;
  }, [count]);

  return (
    <div>
      {/* NO se re-renderiza al escribir */}
      <Boton onClick={handleClick} label="Click" />
      <input onChange={e => setText(e.target.value)} />
      <p>¿{count} es primo? {esPrimo ? 'Sí' : 'No'}</p>
    </div>
  );
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Memoización en acción">
            <MemoDemo />
          </LiveDemo>

          <div className="glass rounded-2xl p-6">
            <h4 className="text-white font-bold mb-3">💡 ¿Cuándo usar?</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2"><span className="text-green-400">✓</span> Cálculos costosos → useMemo</li>
              <li className="flex gap-2"><span className="text-green-400">✓</span> Callbacks a componentes memo → useCallback</li>
              <li className="flex gap-2"><span className="text-green-400">✓</span> Componentes pesados → React.memo</li>
              <li className="flex gap-2"><span className="text-red-400">✗</span> NO memorizar todo por defecto</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}