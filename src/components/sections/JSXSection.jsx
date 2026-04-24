/* ============================================
   JSXSection.jsx - Sección 01: JSX
   ============================================
   
   JSX = JavaScript XML
   
   Es la sintaxis que permite escribir "HTML"
   dentro de JavaScript. React la usa para
   describir cómo se ve la interfaz.
   
   Lo que parece HTML en React en realidad es
   JSX, que se compila a React.createElement()
*/

import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

export default function JSXSection() {
  // Esto es JSX guardado en una variable
  const name = 'React Developer'
  
  // JSX puede guardarse en variables
  const element = (
    <h3 className="text-xl font-bold text-react-500">
      ¡Esto es JSX renderizado!
    </h3>
  )

  return (
    <SectionWrapper
      id="jsx"
      number="01"
      title="JSX"
      subtitle="Sintaxis de JavaScript + XML"
      icon="📝"
      color="react"
    >
      {/* Layout de 2 columnas en desktop */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Columna izquierda: Explicación + Código */}
        <div className="space-y-6">
          {/* Card de explicación */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué es JSX?</h3>
            <p className="text-gray-400 leading-relaxed">
              JSX es una extensión de sintaxis para JavaScript que te permite escribir 
              <span className="text-react-500 font-medium"> HTML dentro de JavaScript</span>. 
              React usa JSX para describir cómo debería verse la UI.
            </p>
            {/* Lista de reglas */}
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>
                  Puedes usar{' '}
                  <code className="text-react-500 code-font text-sm bg-react-500/10 px-1.5 py-0.5 rounded">
                    {'{ expresiones }'}
                  </code>{' '}
                  de JavaScript
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>
                  Usa <code className="text-react-500 code-font text-sm bg-react-500/10 px-1.5 py-0.5 rounded">className</code> en 
                  vez de <code className="text-gray-500 code-font text-sm">class</code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Siempre debe retornar un solo elemento raíz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Las etiquetas deben cerrarse siempre</span>
              </li>
            </ul>
          </div>

          {/* Ejemplo de código */}
          <CodeBlock
            title="jsx-basico.jsx"
            code={`// JSX permite mezclar HTML con JavaScript
function Saludo() {
  const nombre = "React Developer";
  const fecha = new Date().toLocaleDateString();
  
  // Las {} permiten insertar expresiones JS
  return (
    <div className="saludo">
      <h1>¡Hola, {nombre}!</h1>
      <p>Hoy es {fecha}</p>
      <p>2 + 2 = {2 + 2}</p>
      <img src="foto.jpg" alt="Foto" />
    </div>
  );
}`}
          />
        </div>

        {/* Columna derecha: Demo + más código */}
        <div className="space-y-6">
          {/* Demo interactiva */}
          <LiveDemo title="JSX en acción">
            <div className="space-y-4">
              {/* Esto renderiza el JSX guardado en la variable */}
              {element}
              
              {/* Expresiones JS dentro de {} */}
              <p className="text-gray-300">
                Hola, <span className="text-react-500 font-bold">{name}</span>!
              </p>
              
              <p className="text-gray-400">
                Hoy es:{' '}
                <span className="text-purple-400 font-mono">
                  {new Date().toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </p>
              
              {/* Operaciones matemáticas en JSX */}
              <p className="text-gray-400">
                Expresión JS:{' '}
                <span className="text-green-400 font-mono">
                  {2 + 2} = {`{2 + 2}`}
                </span>
              </p>
              
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400">
                  JSX se compila a{' '}
                  <code className="text-yellow-400 code-font">
                    React.createElement()
                  </code>
                </p>
              </div>
            </div>
          </LiveDemo>

          {/* Ejemplo avanzado */}
          <CodeBlock
            title="jsx-avanzado.jsx"
            code={`// Fragment <> </> para retornar múltiples elementos
// sin agregar un div extra al DOM
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

// Estilos en línea usan objetos JavaScript
// Las propiedades CSS van en camelCase
const estilo = {
  color: 'blue',
  fontSize: '20px',  // font-size → fontSize
  backgroundColor: '#000'
};

<p style={estilo}>Texto estilizado</p>

// También se puede poner inline directo
<p style={{ color: 'red', margin: '10px' }}>
  Inline
</p>`}
          />
        </div>
      </div>
    </SectionWrapper>
  )
}