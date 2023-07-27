import { useState, useEffect } from 'react'
import { useOutletContext } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'  // antes de usar esto tengo que hacer: npm i remix-utils y sirve para indicar que algo se ejecute solo en el cliente
import styles from '../styles/carrito.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta({ matches }) {  
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.name);
console.log(viewport)
  return (
    [
      charset,
      viewport,
      {title: 'La Vendetta - Carrito de Compras'},
      {description: '`La Primer Pizza a la Parrilla de Rosario, Carrito de Compras'}
    ]
  )
}

function Carrito() {
  const [total, setTotal] = useState(0)
  const { carrito, actualizarCantidad, eliminarProducto } = useOutletContext()
  
  useEffect ( () => {
    const calculoTotal = carrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0)
    setTotal(calculoTotal)
  }, [carrito])

  return (
    <ClientOnly fallback={'cargando...'}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0 ? 'Carrito vacio' : (
                carrito?.map( producto => (              
                  <div key={producto.id} className='producto'>
                    <div>
                      <img src={producto.imagen} alt={`Imagen del Producto ${producto.nombre}`} />
                    </div>

                    <div>
                      <p className='nombre'>{producto.nombre}</p>
                      <label htmlFor="botonera">Cantidad</label>
                      <div className='botonera'>
                        <input type="button" className='btnResta' value="-" onClick={e =>actualizarCantidad({
                          operacion: e.target.value,
                          id: producto.id
                        })}/>
                        <div className='cantidad'>{producto.cantidad}</div>
                        <input type="button" className='btnSuma' value="+" onClick={e =>actualizarCantidad({
                          operacion: e.target.value,
                          id: producto.id
                        })}/>
                      </div>
                      <p className='precio'>$ <span>{producto.precio}</span></p>
                      <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                    </div>
                    <button type='button' className='btn_eliminar' onClick={() => eliminarProducto(producto.id)}>X</button>
                  </div>
                ))
              )}
            </div>
            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  )
}

export default Carrito
