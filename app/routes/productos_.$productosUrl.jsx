import { useState } from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { getProducto }  from '../models/productos.server'
import styles from '../styles/productos.css'


export async function loader( { params } ) {
  
  const { productosUrl } = params 
  const producto = await getProducto(productosUrl)
 
  if(producto.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Producto No Encontrado',
      data: {}
    })
  }

  return producto
}


export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta({  data, matches }) {  
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.name);

  if (!data || !data.data || data.data.length === 0) {
    return (
      [
        charset,
        viewport,
        {title: 'La Vendetta - Producto No Encontrado'},
        {description: `La Primer Pizza a la Parrilla de Rosario, Producto No Encontrado`}
      ]
    )
  }

  return [
    {
      charset,
      viewport,
      title: `La Vendetta - ${data.data[0].attributes.nombreCorto}`, /* el data es algo de remix y el segundo data es de strapi, eso si hago data.data*/
      description: `La Primer Pizza a la Parrilla de Rosario, ${data.data[0].attributes.nombreCorto}`
    }
  ]
}


function Productos() {
  const { agregarCarrito } = useOutletContext()
  
  const [cantidad, setCantidad] = useState(0)
  const [notas, setNotas] = useState('')
  const producto = useLoaderData()
  const { nombre, nombreCorto, descripcion, imagen, precio, precioAnt} = producto.data[0].attributes
  

  const handleSubmit = e => {
    e.preventDefault();

    if (cantidad < 1) {
      alert('Debes seleccionar una cantidad')
      return
    }

    const productoSeleccionado = {
      id: producto.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre: nombreCorto,
      precio,
      cantidad,
      notas
    }
    
    agregarCarrito(productoSeleccionado)

  }



  const handleCantidad = e => {
    if (e === '+') {
      setCantidad(cantidad + 1)
    } else {
      if (cantidad>0) {
        setCantidad(cantidad - 1)
      } 
    }
  }


  return (
   <main className='contenedor producto'>
    <img src={imagen.data.attributes.url} alt={`Imagen de la ${nombre}`} className="imagen" />

    <div className="contenido">
      <h3>{nombreCorto}</h3>
      <p className='texto'>{descripcion}</p>
      <mark>15% OFF</mark>
      <p className='precioAnt tachado'>$ {precioAnt}</p>
      <p className='precio'>{`$ ${precio} x Unidad`}</p>
    </div>

    <form className='formulario' onSubmit={handleSubmit}>
      <div className='selectorCantidad card'>
        <label htmlFor="botonera">Cantidad</label>
        <div className='botonera'>
          <input type="button" className='btnResta' value="-" onClick={e =>handleCantidad(e.target.value)} />
          <div className='cantidad'>{cantidad}</div>
          <input type="button" className='btnSuma' value="+"  onClick={e =>handleCantidad(e.target.value)} />
        </div>
      </div>

      <p className='txtAclaracion'>Quieres aclarar algo:</p>
      <textarea rows="2" cols="30" className='notas card' type="text" placeholder='Notas del Producto' value={notas} onChange={ (e) => setNotas(e.target.value)}></textarea>
      
      <input type="submit" value="Agregar a mi pedido" />
    </form>
    
   </main>
  )
}

export default Productos
