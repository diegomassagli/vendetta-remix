import { Link } from '@remix-run/react'
import Logo from '../../public/img/Logo.png'
import Navegacion from './navegacion'

function Header() {

  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/" className="logo">
          <img src={Logo} className="logo" alt="logo" />
        </Link>

        <Navegacion />
      </div>
    </header>
  )
}

export default Header
