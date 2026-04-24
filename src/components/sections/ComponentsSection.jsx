/* ============================================
   ComponentsSection.jsx - Sección 02: Componentes
   ============================================
   
   Los COMPONENTES son el corazón de React.
   
   Son funciones de JavaScript que retornan JSX.
   Piensa en ellos como piezas de LEGO:
   - Son reutilizables
   - Son independientes
   - Se pueden combinar para crear UIs complejas
   
   Regla: siempre empiezan con MAYÚSCULA
   ✓ <MiComponente />
   ✗ <miComponente />
*/

import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Ejemplo de componente reutilizable
// Recibe props (titulo y emoji) y renderiza una tarjeta
function Tarjeta({ titulo, emoji }) {
  return (
    <div className="p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
      <span className="text-3xl">{emoji}</span>
      <h4 className="text-white font-semibold mt-2">{titulo}</h4>
    </div>
  )
}

// Componente con variantes controladas por props
function BotonBonito({ children, variante = 'primary' }) {
  // Objeto con estilos según la variante
  const estilos = {
    primary: 'bg-gradient-to-r from-react-500 to-blue-500 text-white',
    secondary: 'glass text-gray-300 hover:bg-white/10',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
  }

  return (
    <button className={`px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${estilos[variante]}`}>
      {children}  {/* children = lo que va entre las etiquetas */}
    </button>
  )
}

export default function ComponentsSection() {
  return (
    <SectionWrapper
      id="components"
      number="02"
      title="Componentes"
      subtitle="Bloques de construcción de React"
      icon="🧩"
      color="purple"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué son los Componentes?</h3>
            <p className="text-gray-400 leading-relaxed">
              Los componentes son{' '}
              <span className="text-purple-400 font-medium">piezas reutilizables</span> de 
              UI. Son funciones que retornan JSX. Piensa en ellos como bloques de LEGO.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 font-semibold text-sm">✅ Funcionales</p>
                <p className="text-xs text-gray-400 mt-1">
                  Funciones que retornan JSX (recomendado)
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-yellow-400 font-semibold text-sm">⚠️ De Clase</p>
                <p className="text-xs text-gray-400 mt-1">
                  Estilo antiguo, ya casi no se usa
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            title="Componente.jsx"
            code={`// Componente funcional (moderno y recomendado)
// Es simplemente una función que retorna JSX
function Tarjeta({ titulo, emoji }) {
  return (
    <div className="tarjeta">
      <span>{emoji}</span>
      <h4>{titulo}</h4>
    </div>
  );
}

// También se puede usar arrow function
const Boton = ({ children, variante }) => {
  return (
    <button className={variante}>
      {children}
    </button>
  );
};

// COMPOSICIÓN: combinar componentes como LEGO
// Un componente puede usar otros componentes
function App() {
  return (
    <div>
      <Tarjeta titulo="React" emoji="⚛️" />
      <Tarjeta titulo="JavaScript" emoji="💛" />
      <Boton variante="primary">Click</Boton>
    </div>
  );
}

export default App;`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Componentes renderizados">
            <div className="space-y-6">
              {/* Demostrar reutilización del componente Tarjeta */}
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  {'<Tarjeta />'} reutilizable:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {/* Mismo componente, diferentes datos */}
                  <Tarjeta titulo="React" emoji="⚛️" />
                  <Tarjeta titulo="JavaScript" emoji="💛" />
                  <Tarjeta titulo="CSS" emoji="🎨" />
                </div>
              </div>

              {/* Demostrar variantes del botón */}
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  {'<BotonBonito />'} con variantes:
                </p>
                <div className="flex flex-wrap gap-3">
                  <BotonBonito variante="primary">Primary</BotonBonito>
                  <BotonBonito variante="secondary">Secondary</BotonBonito>
                  <BotonBonito variante="danger">Danger</BotonBonito>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm text-purple-300">
                  💡 <strong>Tip:</strong> Los nombres de componentes siempre 
                  empiezan con MAYÚSCULA para que React los distinga de tags HTML.
                </p>
              </div>
            </div>
          </LiveDemo>

          <CodeBlock
            title="estructura-archivos.txt"
            language="plaintext"
            code={`src/
├── components/           ← Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ui/               ← Componentes base (Button, Card...)
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Input.jsx
│   └── sections/         ← Secciones de página
│       ├── Hero.jsx
│       └── Features.jsx
├── App.jsx               ← Componente raíz
└── main.jsx              ← Punto de entrada`}
          />
        </div>
      </div>
    </SectionWrapper>
  )
}