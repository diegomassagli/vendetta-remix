import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta( { matches } ) {
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.name);
  return (
    [
      charset,
      viewport,
      {title: 'La Vendetta - Sobre Nosotros'},
      {description: 'La Primer Pizza a la Parrilla'}
    ]
  )
}

export function links() { 
  return (
    [
      {
        rel: 'stylesheet', 
        href: styles
      },
      {
        rel: 'preload', 
        href: imagen, 
        as: 'image'
      }    
    ]
  )
}



function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="sobre nosotros" />
        <div>
          <p>El nuevo food park funciona en patio al aire libre de La Vendetta, clásica pizzería rosarina con 26 años de trayectoria. El consumo es autoservicio, con mesas al aire libre y el paseo de contenededores está integrado al local de La Vendetta.</p>
          <p>La tradicional pizzería <strong>La Vendetta </strong>llevará su receta a una estratégica esquina del centro de <strong>Rosario</strong>. Las reformas ya están en marcha y si todo avanza de acuerdo a los plazos previstos, a principios de abril próximo abrirá un nuevo <strong>La Vendetta </strong>en la intersección de <strong>Catamarca y España</strong>. Allí, donde hasta antes de la pandemia funcionaba el bar<strong> Tango Azteca</strong> -famoso por haber sido el primer bar inclusivo que contrata a personas con discapacidad-, se instalará un restaurante de la clásica pizzería rosarina.&nbsp;</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
