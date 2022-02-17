import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import EditarCliente from "./paginas/EditarCliente"
import Inicio from "./paginas/Inicio"
import NuevoCliente from "./paginas/NuevoCliente"
import VerClientes from "./paginas/VerClientes"




function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          <Route path="editar/:id" element={<EditarCliente/>}/>
          <Route path=":id" element={<VerClientes/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
