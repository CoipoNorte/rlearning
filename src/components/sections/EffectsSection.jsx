/* ============================================
   EffectsSection.jsx - Sección 05: useEffect
   ============================================
   
   useEffect = Efectos Secundarios
   
   Un "efecto secundario" es cualquier cosa que
   NO sea renderizar UI:
   - Llamar a una API
   - Crear un timer/intervalo
   - Escuchar eventos del navegador
   - Cambiar el título de la página
   - Conectar a un WebSocket
   
   useEffect(callback, dependencias)
   
   Dependencias controlan CUÁNDO se ejecuta:
   - Sin array    → cada render
   - []           → solo al montar
   - [valor]      → cuando "valor" cambie
   
   Return dentro = CLEANUP (limpieza al desmontar)
*/

import { useState, useEffect } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Reloj en tiempo real
// Demuestra: useEffect con [] + cleanup
function Reloj() {
  const [hora, setHora] = useState(new Date())

  useEffect(() => {
    // EFECTO: crear intervalo que actualiza cada segundo
    const intervalo = setInterval(() => {
      setHora(new Date())
    }, 1000)

    // CLEANUP: limpiar intervalo al desmontar
    // Si no haces esto, el intervalo sigue corriendo
    // y causa un "memory leak" (fuga de memoria)
    return () => clearInterval(intervalo)
  }, []) // [] = solo ejecutar al montar el componente

  return (
    <div className="text-center">
      <div className="text-4xl font-bold code-font text-react-500">
        {hora.toLocaleTimeString('es-ES')}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Se actualiza cada segundo con useEffect
      </p>
    </div>
  )
}

// Detectar tamaño de ventana
// Demuestra: useEffect con evento del navegador + cleanup
function AnchoVentana() {
  const [ancho, setAncho] = useState(window.innerWidth)

  useEffect(() => {
    // Función que se ejecuta cuando cambia el tamaño
    const handleResize = () => setAncho(window.innerWidth)
    
    // Agregar listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup: remover listener al desmontar
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div className="px-4 py-2 glass rounded-lg code-font">
        <span className="text-purple-400">{ancho}</span>
        <span className="text-gray-500">px</span>
      </div>
      <span className="text-sm text-gray-400">← Redimensiona la ventana</span>
    </div>
  )
}

// Cambiar título de la pestaña
// Demuestra: useEffect con dependencia [cuenta]
function ContadorConEfecto() {
  const [cuenta, setCuenta] = useState(0)

  useEffect(() => {
    // Se ejecuta cada vez que "cuenta" cambia
    document.title = `(${cuenta}) rlearning`
    
    // Cleanup: restaurar título al desmontar
    return () => {
      document.title = 'rlearning - Aprende React'
    }
  }, [cuenta]) // ← DEPENDENCIA: solo re-ejecutar cuando cuenta cambie

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setCuenta(c => c + 1)}
        className="px-4 py-2 glass rounded-xl hover:bg-white/10 transition-all text-sm"
      >
        Clicks: <span className="text-react-500 font-bold">{cuenta}</span>
      </button>
      <span className="text-xs text-gray-500">← Mira el título de la pestaña</span>
    </div>
  )
}

export default function EffectsSection() {
  return (
    <SectionWrapper
      id="effects"
      number="05"
      title="useEffect"
      subtitle="Efectos secundarios"
      icon="⚡"
      color="yellow"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué es useEffect?</h3>
            <p className="text-gray-400 leading-relaxed">
              useEffect ejecuta{' '}
              <span className="text-yellow-400 font-medium">efectos secundarios</span>: 
              APIs, timers, subscripciones, manipulación del DOM...
            </p>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-blue-500/10 text-xs code-font text-blue-300">
                useEffect(fn) → Cada render
              </div>
              <div className="p-2 rounded-lg bg-green-500/10 text-xs code-font text-green-300">
                useEffect(fn, []) → Solo al montar
              </div>
              <div className="p-2 rounded-lg bg-yellow-500/10 text-xs code-font text-yellow-300">
                useEffect(fn, [dep]) → Cuando dep cambie
              </div>
              <div className="p-2 rounded-lg bg-red-500/10 text-xs code-font text-red-300">
                return () =&gt; cleanup → Al desmontar
              </div>
            </div>
          </div>

          <CodeBlock
            title="useEffect.jsx"
            code={`import { useState, useEffect } from 'react';

function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    // EFECTO: crear intervalo
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // CLEANUP: limpiar al desmontar
    return () => clearInterval(intervalo);
  }, []); // [] = solo al montar

  return <p>{hora.toLocaleTimeString()}</p>;
}

// Efecto que depende de un valor
function Buscador() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // No buscar si hay menos de 3 caracteres
    if (query.length < 3) return;
    
    // Llamada a API cuando query cambia
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResultados(data));
    
  }, [query]); // Se ejecuta cuando query cambia
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="useEffect demos">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-3">⏰ Reloj en tiempo real:</p>
                <Reloj />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-500 mb-3">📏 Ancho de ventana:</p>
                <AnchoVentana />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-500 mb-3">📑 Título del documento:</p>
                <ContadorConEfecto />
              </div>
            </div>
          </LiveDemo>

          <div className="glass rounded-2xl p-6">
            <h4 className="text-white font-bold mb-3">⚠️ Errores comunes</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                <span className="text-red-400 font-medium">Loop infinito:</span> Olvidar el array de dependencias
              </li>
              <li className="p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                <span className="text-red-400 font-medium">Memory leak:</span> No limpiar subscripciones/timers
              </li>
              <li className="p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                <span className="text-red-400 font-medium">Dep faltante:</span> No incluir todas las variables usadas
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}