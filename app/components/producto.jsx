import { Link } from '@remix-run/react'

export default function Producto( {producto} ) {

  const { nombreCorto, precioAnt, precio, descripcion, disponible, imagen, url} = producto

  return (    
      <div className="producto">
        <Link to={`/productos/${url}`}>
          <img src={imagen.data.attributes.formats.small.url} alt={`Imagen Pizza ${nombreCorto}`} />
        </Link>
        <div className="contenido">
          <h3>{nombreCorto}</h3>
          <p className='precioAnt'><span className='tachado'>${precioAnt}</span><mark> 15% OFF</mark></p>
          <p className="precio">${precio} x Unidad</p>
          <p className="descripcion">{descripcion}</p>
        </div>
      </div>
  )
}


