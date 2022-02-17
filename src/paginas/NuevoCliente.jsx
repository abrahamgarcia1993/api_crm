import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Nuevo CLiente</h1>
        <p className='mt-3'>Llena los siguientes campos para registrar a un cliente</p>
        <Formulario/>
    </>
  )
}

export default NuevoCliente