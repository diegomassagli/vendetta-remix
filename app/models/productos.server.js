export async function getProductos() {
  
  const respuesta = await fetch(`${process.env.API_URL}/productos?populate=imagen`)
  const resultado = await respuesta.json()

  return resultado
}

export async function getProducto(url) {
  const respuesta = await fetch(`${process.env.API_URL}/productos?filters[url]=${url}&populate=imagen`)
  return await respuesta.json()
}