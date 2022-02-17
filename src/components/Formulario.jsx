import { Formik, Form, Field, } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
const Formulario = ({cliente, cargando}) => {
  const navigate= useNavigate();
  const nuevoClienteSchema= Yup.object().shape({
    nombre: Yup.string().
                min(3, "El nombre es muy corto").
                max(20, "El nombre es muy largo").
                required('El nombre del cliente es obligatorio'),
    empresa: Yup.string().max(20,"El nombre de la empresa es muy largo").
                 required("el nombre de la empresa es obligatorio"),
    email:"",
    telefono:"",
    notas:""
  })
  const handleSubmit= async (valores)=>{
    try {
      let respuesta
      if(cliente.id){
        const url= `http://127.0.0.1:4000/clientes/${cliente.id}`;
         respuesta=await fetch(url,{
          method: 'PUT',
          body: JSON.stringify(valores),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        
      }else{
        const url= "http://127.0.0.1:4000/clientes";
        respuesta=await fetch(url,{
        method: 'POST',
        body: JSON.stringify(valores),
        headers:{
          'Content-Type': 'application/json'
        }
      })
    }
    await respuesta.json();
    navigate("/clientes");
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto '>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre? "Editar Cliente": "Agregar Cliente"}</h1>
        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            email: cliente?.email ?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? "" 
          }}
          

          onSubmit={async (valores, {resetForm})=>{
            await handleSubmit(valores);
            resetForm();
          }}
          validationSchema={nuevoClienteSchema}
          
          enableReinitialize={true}
        >
          {({errors, touched})=>(

          <Form
            className="mt-10">
                <div className="mb-4">
                  <label 
                    className="text-gray-800"
                    htmlFor='nombre'>Nombre:</label>
                  <Field 
                    id="nombre"
                    name="nombre"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    type="text"
                    placeholder="Nombre del Cliente"/>
                    {errors.nombre && touched.nombre?(
                      <Alerta>{errors.nombre}</Alerta>
                    ): null}
                </div>
                <div className="mb-4">
                  <label 
                    className="text-gray-800"
                    htmlFor="empresa">Empresa:</label>
                  <Field 
                    id="empresa"
                    name="empresa"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    type="text"
                    placeholder="Empresa del Cliente"/>
                    {errors.empresa && touched.empresa?(
                      <Alerta>{errors.empresa}</Alerta>
                    ): null}
                </div>

                <div className="mb-4">
                  <label 
                    className="text-gray-800"
                    htmlFor="email">Email:</label>
                  <Field 
                    id="email"
                    name="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    type="text"
                    placeholder="Email del Cliente"/>
                </div>
                <div className="mb-4">
                  <label 
                    className="text-gray-800"
                    htmlFor="telefono">Telefono:</label>
                  <Field 
                    id="telefono"
                    name="telefono"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    type="tel"
                    placeholder="Telefono del Cliente"/>
                </div>
                <div className="mb-4">
                  <label 
                    className="text-gray-800"
                    htmlFor="notas">Notas:</label>
                  <Field 
                    as="textarea"
                    id="notas"
                    name="notas"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    type="text"
                    placeholder="Notas del Cliente"/>
                </div>
                <input 
                  type="submit"
                  value={cliente?.nombre? "Editar Cliente": "Agregar Cliente"}
                  className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' />
          </Form>
  )}
        </Formik>
    </div>
  )
}
Formulario.defaultProps={
  cliente:{}
}
export default Formulario