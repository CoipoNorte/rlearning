/* ============================================
   ReducerSection.jsx - Sección 13: useReducer
   ============================================
   
   useReducer = useState para estado COMPLEJO
   
   En vez de múltiples setState, usas UN dispatch
   que envía "acciones" a una función "reducer".
   
   Conceptos:
   - State: el estado actual (objeto)
   - Action: { type: 'NOMBRE', payload: datos }
   - Reducer: función pura (state, action) => nuevoState
   - Dispatch: función para enviar acciones
   
   Similar a Redux, pero local al componente.
*/

import { useReducer, useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Estado inicial del todo app
const initialState = {
  tareas: [
    { id: 1, texto: 'Aprender React', completada: true },
    { id: 2, texto: 'Practicar hooks', completada: false },
    { id: 3, texto: 'Crear un proyecto', completada: false },
  ],
  filtro: 'todas',
}

// REDUCER: función pura que recibe estado + acción
// y retorna el NUEVO estado (sin mutar el anterior)
function tareasReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR':
      return {
        ...state,
        tareas: [...state.tareas, {
          id: Date.now(),
          texto: action.payload,
          completada: false,
        }]
      }
    case 'TOGGLE':
      return {
        ...state,
        tareas: state.tareas.map(t =>
          t.id === action.payload
            ? { ...t, completada: !t.completada }
            : t
        )
      }
    case 'ELIMINAR':
      return {
        ...state,
        tareas: state.tareas.filter(t => t.id !== action.payload)
      }
    case 'SET_FILTRO':
      return { ...state, filtro: action.payload }
    case 'LIMPIAR_COMPLETADAS':
      return {
        ...state,
        tareas: state.tareas.filter(t => !t.completada)
      }
    default:
      return state // Siempre retornar state por defecto
  }
}

function TodoApp() {
  // useReducer retorna [state, dispatch]
  const [state, dispatch] = useReducer(tareasReducer, initialState)
  const [nuevoTexto, setNuevoTexto] = useState('')

  // Filtrar tareas según el filtro activo
  const tareasFiltradas = state.tareas.filter(t => {
    if (state.filtro === 'activas') return !t.completada
    if (state.filtro === 'completadas') return t.completada
    return true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nuevoTexto.trim()) return
    // dispatch envía una acción al reducer
    dispatch({ type: 'AGREGAR', payload: nuevoTexto.trim() })
    setNuevoTexto('')
  }

  const completadas = state.tareas.filter(t => t.completada).length

  return (
    <div className="space-y-4">
      {/* Formulario para agregar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={nuevoTexto}
          onChange={e => setNuevoTexto(e.target.value)}
          placeholder="Nueva tarea..."
          className="flex-1 px-3 py-2 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-react-500 to-blue-500 rounded-xl text-sm text-white font-medium hover:shadow-lg transition-all"
        >
          Agregar
        </button>
      </form>

      {/* Filtros */}
      <div className="flex gap-2">
        {['todas', 'activas', 'completadas'].map(f => (
          <button
            key={f}
            onClick={() => dispatch({ type: 'SET_FILTRO', payload: f })}
            className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
              state.filtro === f
                ? 'bg-react-500/20 text-react-500'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de tareas */}
      <div className="space-y-1.5">
        {tareasFiltradas.map(tarea => (
          <div
            key={tarea.id}
            className="flex items-center gap-3 p-2.5 glass rounded-xl group hover:bg-white/5 transition-all"
          >
            {/* Checkbox de completar */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE', payload: tarea.id })}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all text-xs ${
                tarea.completada
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-600 hover:border-react-500'
              }`}
            >
              {tarea.completada && '✓'}
            </button>
            {/* Texto con tachado si está completada */}
            <span className={`flex-1 text-sm transition-all ${
              tarea.completada ? 'text-gray-500 line-through' : 'text-white'
            }`}>
              {tarea.texto}
            </span>
            {/* Eliminar */}
            <button
              onClick={() => dispatch({ type: 'ELIMINAR', payload: tarea.id })}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/10">
        <span>{completadas}/{state.tareas.length} completadas</span>
        {completadas > 0 && (
          <button
            onClick={() => dispatch({ type: 'LIMPIAR_COMPLETADAS' })}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Limpiar completadas
          </button>
        )}
      </div>
    </div>
  )
}

export default function ReducerSection() {
  return (
    <SectionWrapper
      id="reducer"
      number="13"
      title="useReducer"
      subtitle="Estado complejo con acciones"
      icon="⚙️"
      color="violet"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué es useReducer?</h3>
            <p className="text-gray-400 leading-relaxed">
              Alternativa a useState para{' '}
              <span className="text-violet-400 font-medium">lógica de estado compleja</span>. 
              Usa un reducer + dispatch como Redux.
            </p>
            <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20 code-font text-xs text-violet-300">
              const [state, dispatch] = useReducer(reducer, initialState)
            </div>
          </div>

          <CodeBlock
            title="useReducer.jsx"
            code={`import { useReducer } from 'react';

// 1. Estado inicial
const initialState = { tareas: [], filtro: 'todas' };

// 2. Reducer: función pura
// Recibe estado actual + acción
// Retorna NUEVO estado (sin mutar)
function reducer(state, action) {
  switch (action.type) {
    case 'AGREGAR':
      return {
        ...state,
        tareas: [...state.tareas, {
          id: Date.now(),
          texto: action.payload,
        }]
      };
    case 'TOGGLE':
      return {
        ...state,
        tareas: state.tareas.map(t =>
          t.id === action.payload
            ? { ...t, completada: !t.completada }
            : t
        )
      };
    case 'ELIMINAR':
      return {
        ...state,
        tareas: state.tareas.filter(t => 
          t.id !== action.payload
        )
      };
    default:
      return state;
  }
}

// 3. Usar en componente
function TodoApp() {
  const [state, dispatch] = useReducer(
    reducer, initialState
  );

  // Enviar acciones con dispatch
  dispatch({ type: 'AGREGAR', payload: 'Nueva' });
  dispatch({ type: 'TOGGLE', payload: 123 });
  dispatch({ type: 'ELIMINAR', payload: 123 });
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Todo App con useReducer">
            <TodoApp />
          </LiveDemo>

          <div className="glass rounded-2xl p-6">
            <h4 className="text-white font-bold mb-3">useState vs useReducer</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="text-blue-300 font-bold mb-1">useState</p>
                <ul className="space-y-1 text-blue-300/70">
                  <li>• Estado simple</li>
                  <li>• Pocas actualizaciones</li>
                  <li>• Valores independientes</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-violet-500/10">
                <p className="text-violet-300 font-bold mb-1">useReducer</p>
                <ul className="space-y-1 text-violet-300/70">
                  <li>• Estado complejo</li>
                  <li>• Muchas acciones</li>
                  <li>• Valores relacionados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}