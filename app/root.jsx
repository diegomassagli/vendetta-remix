import { useState, useEffect } from 'react'

import { 
  Meta,        // y esta me permite renderizar el meta en el layout
  Links,       // este componente se usa para renderizar links y sus hojas de estilo
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link
} from '@remix-run/react'

import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

// con esto export la funcion meta
export function meta() {
  return [
      {charset: 'utf-8'},
      {title: "La Vendetta"},
      {name: "viewport", content: "width=device-width,initial-scale=1"}
  ]
}

// para exportar hojas de estilo se recomienda usar esta funcion(y van a estar en todas las paginas !)
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: "true"
    }, 
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },
    {
      rel: 'stylesheet',
      href: styles
    }       
  ]
}


// Lo que este en routes se injecta en Outlet. lo que agregue en el Outlet como context se ata al context propio de remix
// aca el problema que tengo es que si permito repetir el mismo producto, eso estaria bien porque quizas uno va con anotaciones y el otro no
// pero habria que usar otra forma de identificar cada producto del carrito porque el id del producto ya no seria unico. (uuid ?)
export default function App() {

   const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
   const [carrito, setCarrito] = useState(carritoLS)

  useEffect ( () => {
      localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarCarrito = producto => {  
    if(carrito.some(productoState => productoState.id === producto.id)) {
      const carritoActualizado = carrito.map(productoState => {  
        if(productoState.id === producto.id) {          
          productoState.cantidad = producto.cantidad
        }
        return productoState
      })
      setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, producto])
    }
  }
  
  const actualizarCantidad = producto => {
    const carritoActualizado = carrito.map( productoState => {
      if(productoState.id === producto.id) {
        if (producto.operacion === '+') {
          productoState.cantidad += 1
        } else {
          if (productoState.cantidad>0) {
            productoState.cantidad -= 1
          } 
        }
      }
      return productoState
    })
    setCarrito(carritoActualizado)
  }


  const eliminarProducto = id => {
    const carritoActualizado = carrito.filter( productoState => productoState.id !== id)
    setCarrito(carritoActualizado)
  }


  return (
    <Document>
      <Outlet 
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarProducto
        }}
      />  
    </Document>
  )
}



function Document( { children } ) {
  return(
    <html lang="es">     
      <head>
          <Meta />
          <Links />
      </head>

      <body>
        <Header />
        {children}

        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}


/** Manejo de Errores */

export function ErrorBoundary() {

  const error = useRouteError()
  
  if(isRouteErrorResponse(error)){
    return (
      <Document>
        <p className="error">{error.status} {error.statusText}</p>
        <Link className='error-enlace' to="/">Tal vez quieras volver a la pagina principal</Link>
      </Document>
    )
  }

}