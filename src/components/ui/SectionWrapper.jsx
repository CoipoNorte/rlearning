/* ============================================
   SectionWrapper.jsx - Envoltorio de secciones
   ============================================
   
   Componente que envuelve cada sección con:
   - Animación de aparición al hacer scroll
   - Header con número, título e icono
   - Línea decorativa de color
   
   Usa IntersectionObserver para detectar
   cuando la sección es visible en pantalla.
   
   Props:
   - id: para navegación con anclas (#jsx, #state...)
   - number: "01", "02", etc.
   - title: nombre de la sección
   - subtitle: descripción corta
   - icon: emoji
   - color: nombre del color (react, purple, green...)
   - children: contenido de la sección
*/

import { useEffect, useRef, useState } from 'react'

export default function SectionWrapper({ id, number, title, subtitle, icon, color = 'react', children }) {
  // Referencia al elemento DOM de la sección
  const ref = useRef(null)
  // Estado para controlar la animación de aparición
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // IntersectionObserver: detecta cuando un elemento
    // entra en la pantalla visible del usuario
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando al menos 10% de la sección es visible
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 } // 10% visible = disparar
    )

    // Empezar a observar nuestra sección
    if (ref.current) observer.observe(ref.current)

    // Cleanup: dejar de observar al desmontar
    return () => observer.disconnect()
  }, [])

  // Mapa de colores para gradientes
  // Cada color tiene su par de gradiente
  const colorClasses = {
    react: 'from-react-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-amber-500',
    pink: 'from-pink-500 to-rose-500',
    blue: 'from-blue-500 to-indigo-500',
    yellow: 'from-yellow-500 to-orange-500',
    teal: 'from-teal-500 to-cyan-500',
    indigo: 'from-indigo-500 to-purple-500',
    cyan: 'from-cyan-500 to-blue-500',
    emerald: 'from-emerald-500 to-teal-500',
    rose: 'from-rose-500 to-red-500',
    violet: 'from-violet-500 to-purple-500',
  }

  return (
    <section
      id={id}
      ref={ref}
      // Animación: empieza invisible y abajo, luego sube
      className={`relative py-20 md:py-28 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la sección */}
        <div className="text-center mb-16">
          {/* Badge con número */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm mb-6">
            <span className={`bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent font-bold`}>
              {number}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{subtitle}</span>
          </div>

          {/* Título con icono */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-4xl">{icon}</span>
            <h2 className={`text-3xl md:text-5xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
              {title}
            </h2>
          </div>

          {/* Línea decorativa */}
          <div className={`w-24 h-1 mx-auto rounded-full bg-gradient-to-r ${colorClasses[color]} mt-6`} />
        </div>

        {/* Contenido que le pasemos como children */}
        {children}
      </div>
    </section>
  )
}