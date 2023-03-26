import { useEffect, useState, MouseEvent} from 'react'
import Form from './Components/Form/Index'
import Table from './Components/Table/Index'
import api from './helper/api'
import IPeople from './Interfaces/Peoples'

const initialValues: IPeople = {
  id: 0,
  name: "",
  last_name: "",
  date_born: "",
  cpf: "",
  rg: "",
  phone: "",
  email: ""
}
function App() {
  const [peoples, setPeoples] = useState<IPeople[]>([])
  const [peoplesForm, setPeoplesForm] = useState<IPeople>(initialValues)

  useEffect(() => {
    api.get("users")
    .then(response => setPeoples(response.data))
    .catch(error => {
      console.log(error)
      setPeoples([])
    })
  }, [peoples])

  const update = (e: MouseEvent<HTMLButtonElement, MouseEvent>, id: any) => {
    api.get(`users?id=${id}`)
    .then(response => {setPeoplesForm(response.data); console.log(peoplesForm)})
    .catch(error => console.log(error))
    
  }
  const deleteFunction = (e: MouseEvent<HTMLButtonElement, MouseEvent>, id: any) => {
    api.delete(`users/${id}`).then(response => console.log(response.data)).catch(error => console.log(error))
  }
  return (
    <div className="container">
      <h1>Register people</h1>
      <Form peoples={peoplesForm}/>
      <Table peoples={peoples} update={update} deleteFunction={deleteFunction} />
    </div>
  )
}

export default App
