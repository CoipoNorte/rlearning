/* ============================================
   FormsSection.jsx - Sección 08: Formularios
   ============================================
   
   En React los formularios usan "componentes controlados":
   - El VALOR del input viene del estado (value={estado})
   - El CAMBIO actualiza el estado (onChange={setter})
   
   Así React siempre sabe qué tiene cada input.
   
   Tip: un solo handler genérico puede manejar
   TODOS los inputs si usan el atributo "name".
*/

import { useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

function FormularioRegistro() {
  // Un solo estado objeto para todo el formulario
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    framework: 'react',
    acepta: false,
  })
  const [enviado, setEnviado] = useState(false)

  // Handler GENÉRICO: funciona para CUALQUIER input
  // Usa el atributo "name" del input para saber qué campo actualizar
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev, // Mantener los demás campos
      // Si es checkbox usar checked, sino usar value
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault() // SIEMPRE prevenir recarga de página
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Input de texto */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"          // ← name = clave del estado
          value={form.nombre}    // ← valor viene del estado
          onChange={handleChange} // ← actualiza el estado
          placeholder="Tu nombre"
          className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50 transition-colors"
        />
      </div>

      {/* Input de email */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50 transition-colors"
        />
      </div>

      {/* Input de password */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••"
          className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-500 bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50 transition-colors"
        />
      </div>

      {/* Select */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Framework favorito</label>
        <select
          name="framework"
          value={form.framework}
          onChange={handleChange}
          className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white bg-transparent border border-white/10 focus:outline-none focus:border-react-500/50"
        >
          <option value="react" className="bg-dark-800">⚛️ React</option>
          <option value="vue" className="bg-dark-800">💚 Vue</option>
          <option value="angular" className="bg-dark-800">🔴 Angular</option>
          <option value="svelte" className="bg-dark-800">🧡 Svelte</option>
        </select>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="acepta"
          checked={form.acepta}    // checkbox usa checked, no value
          onChange={handleChange}
          className="w-4 h-4 rounded accent-react-500"
        />
        <span className="text-sm text-gray-400">Acepto los términos</span>
      </label>

      {/* Botón submit */}
      <button
        type="submit"
        disabled={!form.acepta} // Deshabilitado si no acepta
        className="w-full py-2.5 rounded-xl font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-react-500 to-blue-500 text-white hover:shadow-lg hover:shadow-react-500/20"
      >
        {enviado ? '✓ Enviado!' : 'Registrarse'}
      </button>

      {/* Preview del estado en tiempo real */}
      <div className="p-3 rounded-lg bg-white/5 text-xs code-font text-gray-400">
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </form>
  )
}

export default function FormsSection() {
  return (
    <SectionWrapper
      id="forms"
      number="08"
      title="Formularios"
      subtitle="Inputs controlados y eventos"
      icon="📝"
      color="teal"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Formularios en React</h3>
            <p className="text-gray-400 leading-relaxed">
              Usamos <span className="text-teal-400 font-medium">componentes controlados</span>: 
              el valor viene del estado y se actualiza con onChange.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-300">
                <strong>Controlado</strong>
                <p className="text-xs mt-1 text-green-300/70">value + onChange</p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-300">
                <strong>No controlado</strong>
                <p className="text-xs mt-1 text-yellow-300/70">useRef + defaultValue</p>
              </div>
            </div>
          </div>

          <CodeBlock
            title="Formulario.jsx"
            code={`function Formulario() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    framework: 'react',
    acepta: false,
  });

  // Un handler para TODOS los inputs
  // Usa e.target.name para saber cuál cambió
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ¡NUNCA olvidar esto!
    console.log('Datos:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"           // ← identifica el campo
        value={form.nombre}     // ← valor del estado
        onChange={handleChange}  // ← actualizar estado
      />
      <select
        name="framework"
        value={form.framework}
        onChange={handleChange}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
      <input
        type="checkbox"
        name="acepta"
        checked={form.acepta}
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Formulario controlado">
            <FormularioRegistro />
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  )
}