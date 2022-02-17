import React from 'react'
import Formulario from '../components/Formulario'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Spinner from '../components/Spinner';


const EditarCliente = () => {
  const [cliente, setCliente]= useState({})
    const [cargando, setCargando]=useState(true)
    const {id}= useParams();
    useEffect(()=>{
        const obtenerClienteAPI=async ()=>{
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta= await fetch(url);
                const resultado= await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                
                setCargando(!cargando);
            }, 1000);
        }
        obtenerClienteAPI();
    },[])
  return (
    cargando? <Spinner/> : Object.keys(cliente).length===0 ? <p>No hay resultados</p>:
    (

    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      {cliente?.nombre && (

      <Formulario
        cliente={cliente}
        cargando={cargando}/>
      )}
    </>
    )
  )
}

export default EditarCliente