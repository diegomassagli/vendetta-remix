import Navegacion from "./navegacion"

function Footer() {
  return (
   <footer className="footer">
    <div className="contenedor">
      <div className="contenido">
        <Navegacion />

        <p className="copyright">Todos los derechos reservados {new Date().getFullYear()}</p>
      </div>
    </div> 
   </footer>
  )
}

export default Footer
