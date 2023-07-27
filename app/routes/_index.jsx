import { useLoaderData, Link } from '@remix-run/react'
import { getProductos } from '../models/productos.server'
import Producto from '../components/producto'
import styles from '../styles/productos.css'
import imagen from '../../public/img/carrito.png'

export function meta( { matches } ) {
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.name);
  return (
    [
      charset,
      viewport,
      {title: 'La Vendetta - Nuestros Productos'},
      {description: 'La Primer Pizza a la Parrilla de Rosario'}
    ]
  )
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export async function loader() {    // esta es una opcion para llamar a la API la otra es crear un archivo .server.js que se ejecuta en el servidor
  // const respuesta = await fetch(`${process.env.API_URL}/productos?populate=imagen`)
  // const resultado = await respuesta.json()  
  const productos = await getProductos()
  return productos.data
}

function Index() {
  const productos = useLoaderData()
  return (
    <main className="contenedor">
      <h2 className="heading">Nuestras Pizzas</h2>
        {productos?.length && (
          <div className="productos-grid">
            {productos.map( producto => (
              <Producto 
                key={producto?.id}
                producto={producto?.attributes}
              />
            ))}
          </div>
        )}
      <Link to="/carrito">
        <div className="carrito-container">
          <style jsx="true">{`    
            .carrito-container {
            background-image: url(${imagen});
            }
          `}
          </style>
        </div>
      </Link>
    </main>
  )
}

export default Index
