/* ============================================
   PortalsSection.jsx - Sección 14: Portals
   ============================================
   
   createPortal renderiza un componente en un
   NODO DOM DIFERENTE al de su padre.
   
   ¿Para qué?
   - Modales (necesitan estar sobre todo el contenido)
   - Tooltips
   - Notificaciones
   - Menús dropdown
   
   El componente se renderiza en otro lugar del DOM
   pero MANTIENE el contexto de React (props, estado,
   eventos, contextos... todo sigue funcionando).
   
   createPortal(elemento, contenedorDOM)
*/

import { useState } from 'react'
import { createPortal } from 'react-dom'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Componente Modal usando createPortal
function Modal({ isOpen, onClose, children }) {
  // Si no está abierto, no renderizar nada
  if (!isOpen) return null

  // createPortal: renderizar en document.body en vez del padre
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose} // Click en overlay cierra
    >
      {/* Overlay oscuro con blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Contenido del modal */}
      <div
        className="relative glass-strong rounded-2xl p-6 max-w-md w-full animate-bounce-in border border-white/20 shadow-2xl"
        onClick={e => e.stopPropagation()} // Evitar que click en contenido cierre
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body // ← Se renderiza AQUÍ, no dentro del componente padre
  )
}

// Componente Tooltip simple
function Tooltip({ children, text }) {
  const [show, setShow] = useState(false)

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 glass rounded-lg text-xs text-white whitespace-nowrap animate-fade-in z-50">
          {text}
          {/* Flechita */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 -mt-1" />
        </span>
      )}
    </span>
  )
}

function PortalDemo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)

  return (
    <div className="space-y-6">
      {/* Botones para abrir modales */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Modales con createPortal:</p>
        <div className="flex gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-react-500 to-blue-500 rounded-xl text-sm text-white font-medium hover:shadow-lg hover:shadow-react-500/20 transition-all"
          >
            🌀 Abrir Modal
          </button>
          <button
            onClick={() => setModal2Open(true)}
            className="px-4 py-2 glass rounded-xl text-sm text-purple-400 hover:bg-purple-500/20 transition-all"
          >
            ✨ Modal de Éxito
          </button>
        </div>
      </div>

      {/* Modal 1: Informativo */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <div className="text-4xl text-center">🌀</div>
          <h3 className="text-xl font-bold text-white text-center">
            ¡Esto es un Portal!
          </h3>
          <p className="text-gray-400 text-sm text-center">
            Este modal se renderiza en{' '}
            <code className="text-react-500 code-font">document.body</code> usando{' '}
            <code className="text-react-500 code-font">createPortal</code>, pero mantiene 
            el contexto de React.
          </p>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full py-2 bg-gradient-to-r from-react-500 to-blue-500 rounded-xl text-white font-medium text-sm"
          >
            Entendido 👍
          </button>
        </div>
      </Modal>

      {/* Modal 2: Éxito */}
      <Modal isOpen={modal2Open} onClose={() => setModal2Open(false)}>
        <div className="space-y-4 text-center">
          <div className="text-5xl">🎉</div>
          <h3 className="text-xl font-bold text-green-400">¡Éxito!</h3>
          <p className="text-gray-400 text-sm">
            Has completado la guía de React. 
            ¡Ahora practica construyendo proyectos reales!
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setModal2Open(false)}
              className="flex-1 py-2 glass rounded-xl text-gray-400 text-sm"
            >
              Cerrar
            </button>
            <button
              onClick={() => setModal2Open(false)}
              className="flex-1 py-2 bg-green-500 rounded-xl text-white font-medium text-sm"
            >
              ¡Genial!
            </button>
          </div>
        </div>
      </Modal>

      {/* Tooltips */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-sm text-gray-500 mb-3">Tooltips:</p>
        <div className="flex gap-4">
          <Tooltip text="Esto es React ⚛️">
            <span className="px-3 py-1.5 glass rounded-lg text-sm cursor-help hover:bg-white/10 transition-all">
              ⚛️ Hover aquí
            </span>
          </Tooltip>
          <Tooltip text="¡Se renderiza sobre todo!">
            <span className="px-3 py-1.5 glass rounded-lg text-sm cursor-help hover:bg-white/10 transition-all">
              💡 Y aquí
            </span>
          </Tooltip>
          <Tooltip text="Portals = modales y tooltips">
            <span className="px-3 py-1.5 glass rounded-lg text-sm cursor-help hover:bg-white/10 transition-all">
              🌀 También aquí
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default function PortalsSection() {
  return (
    <SectionWrapper
      id="portals"
      number="14"
      title="Portals"
      subtitle="Renderizar fuera del DOM padre"
      icon="🌀"
      color="react"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué son los Portals?</h3>
            <p className="text-gray-400 leading-relaxed">
              Renderizar hijos en un{' '}
              <span className="text-react-500 font-medium">nodo DOM diferente</span>, 
              manteniendo el contexto de React.
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded-lg bg-react-500/10 text-react-300">📌 Modales y dialogs</div>
              <div className="p-2 rounded-lg bg-react-500/10 text-react-300">📌 Tooltips y popovers</div>
              <div className="p-2 rounded-lg bg-react-500/10 text-react-300">📌 Notificaciones flotantes</div>
            </div>
          </div>

          <CodeBlock
            title="Portal.jsx"
            code={`import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Se renderiza en document.body
  // NO dentro del componente padre
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div 
        className="modal"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    document.body  // ← DESTINO en el DOM
  );
}

// Uso normal, como cualquier componente
function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Abrir
      </button>
      
      {/* Se renderiza en body, no aquí */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>¡Hola desde un Portal!</h2>
      </Modal>
    </div>
  );
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Portals en acción">
            <PortalDemo />
          </LiveDemo>

          <div className="glass rounded-2xl p-6">
            <h4 className="text-white font-bold mb-3">🎓 ¡Completaste la guía!</h4>
            <p className="text-gray-400 text-sm mb-4">
              14 conceptos fundamentales de React. Ahora a practicar.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                'JSX', 'Componentes', 'Props', 'Estado',
                'Efectos', 'Condicional', 'Listas', 'Formularios',
                'Context', 'Refs', 'Custom Hooks', 'Memo',
                'Reducer', 'Portals'
              ].map(topic => (
                <div key={topic} className="flex items-center gap-1.5 p-1.5 rounded bg-green-500/10 text-green-400">
                  <span>✓</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}