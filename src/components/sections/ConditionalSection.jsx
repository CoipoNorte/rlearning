/* ============================================
   ConditionalSection.jsx - Sección 06: Renderizado Condicional
   ============================================
   
   Mostrar u ocultar elementos según una condición.
   
   4 formas principales:
   1. Ternario:     condición ? <A /> : <B />
   2. AND (&&):     condición && <A />
   3. OR (||):      valor || "por defecto"
   4. Early return: if (cond) return <A />
*/

import { useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

function LoginStatus() {
  const [logueado, setLogueado] = useState(false)
  const [rol, setRol] = useState('usuario')

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {/* Botón que alterna el estado */}
        <button
          onClick={() => setLogueado(!logueado)}
          className={`px-4 py-2 rounded-xl font-medium transition-all text-sm ${
            logueado
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {logueado ? '✓ Logueado' : '✗ No logueado'}
        </button>

        {/* Select: solo visible si está logueado (&&) */}
        {logueado && (
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="px-3 py-2 rounded-xl glass text-sm text-white bg-transparent border border-white/10"
          >
            <option value="usuario" className="bg-dark-800">Usuario</option>
            <option value="admin" className="bg-dark-800">Admin</option>
            <option value="moderador" className="bg-dark-800">Moderador</option>
          </select>
        )}
      </div>

      {/* Contenido condicional con ternario */}
      <div className="p-4 glass rounded-xl">
        {logueado ? (
          // Si logueado = true
          <div className="space-y-2">
            <p className="text-green-400">👋 ¡Bienvenido de vuelta!</p>
            <p className="text-sm text-gray-400">
              Rol: <span className="text-purple-400">{rol}</span>
            </p>
            {/* Condicionales anidados con && */}
            {rol === 'admin' && (
              <p className="text-sm text-yellow-400">🔑 Tienes acceso total</p>
            )}
            {rol === 'moderador' && (
              <p className="text-sm text-blue-400">🛡️ Puedes moderar contenido</p>
            )}
          </div>
        ) : (
          // Si logueado = false
          <p className="text-gray-400">Por favor, inicia sesión para continuar</p>
        )}
      </div>
    </div>
  )
}

// Badge de notificaciones con renderizado condicional
function NotificationBadge() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setCount(c => c + 1)}
        className="relative px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all"
      >
        🔔 Notificaciones
        {/* Solo mostrar badge si count > 0 */}
        {count > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-bounce-in">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>
      <button
        onClick={() => setCount(0)}
        className="text-xs text-gray-500 hover:text-white transition-colors"
      >
        Limpiar
      </button>
    </div>
  )
}

export default function ConditionalSection() {
  return (
    <SectionWrapper
      id="conditional"
      number="06"
      title="Renderizado Condicional"
      subtitle="Mostrar u ocultar elementos"
      icon="🔀"
      color="pink"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Formas de renderizado condicional</h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded-lg bg-white/5 code-font">
                <span className="text-pink-400">ternario ? :</span>
                <span className="text-gray-500"> → Mostrar A o B</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 code-font">
                <span className="text-pink-400">&& (AND)</span>
                <span className="text-gray-500"> → Mostrar solo si true</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 code-font">
                <span className="text-pink-400">|| (OR)</span>
                <span className="text-gray-500"> → Valor por defecto</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 code-font">
                <span className="text-pink-400">early return</span>
                <span className="text-gray-500"> → Retornar antes si...</span>
              </div>
            </div>
          </div>

          <CodeBlock
            title="Condicional.jsx"
            code={`function Dashboard({ usuario, notificaciones }) {
  // 1. TERNARIO: si/entonces/sino
  return (
    <div>
      {usuario ? (
        <p>Hola, {usuario.nombre}!</p>
      ) : (
        <p>Inicia sesión</p>
      )}

      {/* 2. AND (&&): solo si es verdadero */}
      {notificaciones > 0 && (
        <span className="badge">
          {notificaciones}
        </span>
      )}

      {/* 3. OR (||): valor por defecto */}
      <img src={usuario?.avatar || '/default.png'} />

      {/* 4. Nullish coalescing (??) */}
      <p>Puntos: {usuario?.puntos ?? 0}</p>
    </div>
  );
}

// EARLY RETURN: retornar temprano
function Contenido({ cargando, error, datos }) {
  if (cargando) return <Spinner />;
  if (error) return <Error msg={error} />;
  if (!datos) return <Vacio />;
  
  // Si llegamos aquí, todo está bien
  return <Lista datos={datos} />;
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Condicional en acción">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-3">Login con roles:</p>
                <LoginStatus />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-500 mb-3">Badge condicional:</p>
                <NotificationBadge />
              </div>
            </div>
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  )
}