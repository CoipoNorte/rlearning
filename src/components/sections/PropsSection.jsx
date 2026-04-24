/* ============================================
   PropsSection.jsx - Sección 03: Props
   ============================================
   
   PROPS = Propiedades que se pasan a un componente
   
   Imagina un componente como una función:
   - Las props son los ARGUMENTOS
   - El JSX es el RETORNO
   
   Regla importante: las props son de SOLO LECTURA
   Un componente NUNCA debe modificar sus propias props
   
   Flujo de datos: Padre → Hijo (unidireccional)
*/

import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// Componente que recibe varias props con desestructuración
// El = false es un valor por defecto
function UserCard({ nombre, rol, avatar, online = false }) {
  return (
    <div className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/10 transition-all">
      <div className="relative">
        {/* Avatar con gradiente */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-react-500 to-purple-500 flex items-center justify-center text-lg">
          {avatar}
        </div>
        {/* Indicador online: solo se muestra si online=true */}
        {online && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-dark-900" />
        )}
      </div>
      <div>
        <p className="text-white font-medium text-sm">{nombre}</p>
        <p className="text-gray-500 text-xs">{rol}</p>
      </div>
    </div>
  )
}

// Componente con la prop especial "children"
// children = lo que va ENTRE las etiquetas del componente
function Alerta({ tipo = 'info', children }) {
  // Estilos dinámicos según el tipo
  const estilos = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    error: 'bg-red-500/10 border-red-500/30 text-red-300',
  }
  const iconos = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' }

  return (
    <div className={`flex items-start gap-2 p-3 rounded-lg border ${estilos[tipo]}`}>
      <span>{iconos[tipo]}</span>
      <p className="text-sm">{children}</p>
    </div>
  )
}

export default function PropsSection() {
  return (
    <SectionWrapper
      id="props"
      number="03"
      title="Props"
      subtitle="Pasando datos entre componentes"
      icon="📦"
      color="green"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué son las Props?</h3>
            <p className="text-gray-400 leading-relaxed">
              Las props (propiedades) son la forma de pasar datos de un 
              <span className="text-green-400 font-medium"> componente padre a un hijo</span>. 
              Son de <strong className="text-white">solo lectura</strong> — nunca las modifiques.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> Strings, numbers, booleans, arrays, objetos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> Funciones (callbacks)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> Otros componentes (children)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> Valores por defecto con =
              </li>
            </ul>
          </div>

          <CodeBlock
            title="Props.jsx"
            code={`// Desestructuración: { prop1, prop2 }
// En vez de recibir "props" y usar "props.nombre"
function UserCard({ nombre, rol, avatar, online = false }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={nombre} />
      {/* Renderizar condicionalmente con && */}
      {online && <span className="online-dot" />}
      <h3>{nombre}</h3>
      <p>{rol}</p>
    </div>
  );
}

// Pasando props al usar el componente
function App() {
  return (
    <div>
      <UserCard
        nombre="Ana García"
        rol="Frontend Dev"
        avatar="👩‍💻"
        online={true}  {/* boolean necesita {} */}
      />
    </div>
  );
}

// "children" es una prop especial
// Es lo que va ENTRE las etiquetas
function Alerta({ tipo = "info", children }) {
  return (
    <div className={\`alerta \${tipo}\`}>
      {children}  {/* ← contenido entre etiquetas */}
    </div>
  );
}

// Así se usa:
<Alerta tipo="success">
  ¡Esto es children! ← este texto
</Alerta>`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Props en acción">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-2">
                {'<UserCard />'} con diferentes props:
              </p>
              <div className="space-y-2">
                {/* Mismo componente, diferentes datos = diferente resultado */}
                <UserCard nombre="Ana García" rol="Frontend Dev" avatar="👩‍💻" online={true} />
                <UserCard nombre="Carlos López" rol="Backend Dev" avatar="👨‍💻" online={true} />
                <UserCard nombre="María Ruiz" rol="UX Designer" avatar="👩‍🎨" online={false} />
              </div>

              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  {'<Alerta />'} con children y tipo:
                </p>
                <div className="space-y-2">
                  <Alerta tipo="info">Esto es una alerta informativa</Alerta>
                  <Alerta tipo="success">¡Operación completada!</Alerta>
                  <Alerta tipo="warning">Ten cuidado con esto</Alerta>
                  <Alerta tipo="error">Algo salió mal</Alerta>
                </div>
              </div>
            </div>
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  )
}