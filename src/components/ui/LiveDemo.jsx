/* ============================================
   LiveDemo.jsx - Contenedor de demos en vivo
   ============================================
   
   Componente simple que envuelve demos interactivas
   con un estilo tipo "preview en vivo".
   
   Tiene un indicador verde parpadeante para
   mostrar que es contenido interactivo.
   
   Props:
   - title: texto descriptivo (opcional)
   - children: el contenido interactivo
*/

export default function LiveDemo({ title, children }) {
  return (
    <div className="rounded-xl overflow-hidden glass border border-white/10">
      {/* Header con indicador de "en vivo" */}
      <div className="px-4 py-2.5 bg-white/5 border-b border-white/10 flex items-center gap-2">
        {/* Punto verde parpadeante */}
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-gray-400 code-font">
          {title || 'Demo en vivo'}
        </span>
      </div>
      {/* Contenido de la demo */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}