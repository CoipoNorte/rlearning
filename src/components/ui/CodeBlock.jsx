/* ============================================
   CodeBlock.jsx - Bloque de código con estilo
   ============================================
   
   Componente reutilizable que muestra código
   con un diseño bonito tipo terminal/editor.
   
   Props:
   - code: string con el código a mostrar
   - language: lenguaje (jsx, js, etc.)
   - title: nombre del archivo (opcional)
   
   Incluye botón para copiar al portapapeles.
*/

import { useState } from 'react'
import { Check, Copy } from 'lucide-react' // Iconos

export default function CodeBlock({ code, language = 'jsx', title }) {
  // Estado para saber si se copió el código
  const [copied, setCopied] = useState(false)

  // Función para copiar código al portapapeles
  const handleCopy = () => {
    navigator.clipboard.writeText(code) // API del navegador
    setCopied(true)
    // Después de 2 segundos, volver al estado normal
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden glass border border-white/10 group">
      
      {/* Header tipo editor de código */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        {/* Botones tipo macOS (rojo, amarillo, verde) */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {/* Nombre del archivo si existe */}
          {title && (
            <span className="text-xs text-gray-400 code-font">{title}</span>
          )}
        </div>

        {/* Lenguaje + botón copiar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 code-font">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            title="Copiar código"
          >
            {/* Cambiar icono según estado */}
            {copied ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Área del código */}
      <div className="p-4 overflow-x-auto">
        <pre className="code-font text-sm leading-relaxed">
          <code className="text-gray-300">
            {code.trim() /* .trim() quita espacios al inicio/final */}
          </code>
        </pre>
      </div>
    </div>
  )
}