import { ChangeEvent, useState, MouseEvent, FormEvent, useEffect } from "react"
import api from "../../helper/api"
import IPeople from "../../Interfaces/Peoples"


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

interface IPeopleForm{
  peoples: IPeople
}
function Form({peoples}: IPeopleForm) {
  const [values, setValues] = useState<IPeople>(initialValues)
  const [textButton, setTextButton] = useState<string>("SEND")
  const [message, setMessage] = useState<string>("")
  const [hide, setHide] = useState<Boolean>(false)

    useEffect(() => {
      setValues(peoples)
    }, [peoples])

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const cancel = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    setValues(initialValues)
  }



  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    if (values.id !== 0) {
      api.put(`users/${values.id}`, values)
        .then(response => {
          setTextButton("Send")
          setTimeout(() => {
            setMessage("")
            setHide(false)
          }, 3000);
          setMessage(response.data.response)
          setHide(true)
  
        })
        .catch(error => console.log(error))
    }else{
      setTextButton("Sending")
      api.post("users", values)
        .then(response => {
          setTextButton("Send")
          setTimeout(() => {
            setMessage("")
            setHide(false)
          }, 3000);
          setMessage(response.data.response)
          setHide(true)
  
        })
        .catch(error => console.log(error))
    }
   


  }



  return (
    <>
      <form action="" onSubmit={e => send(e)}>
        <div className="row mt-2">
          <div hidden>
            <input type="hidden" name="id" value={values.id} />
          </div>
          <div className="mb-3 col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" name="name" value={values.name} onChange={e => onchange(e)} />
          </div>
          <div className="mb-3 col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" name="last_name" value={values.last_name} onChange={e => onchange(e)} />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">DBorn</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" name="date_born" value={values.date_born} onChange={e => onchange(e)} />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">CPF</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" name="cpf" value={values.cpf} onChange={e => onchange(e)} />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">RG</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" name="rg" value={values.rg} onChange={e => onchange(e)} />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" name="phone" value={values.phone} onChange={e => onchange(e)} />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" name="email" value={values.email} onChange={e => onchange(e)} />
          </div>
          {hide && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          <div className="mb-3 d-flex flex-row col-12 gap-2">
            <button type="submit" className="btn btn-dark col-6 col-xl-3 col-lg-3 mr-2">{textButton}</button>
            <button type="button" className="btn btn-secondary col-6 col-xl-3 col-lg-3 ml-2" onClick={e => cancel(e)}>Cancel</button>
          </div>
        </div>
      </form>

    </>
  )
}

export default Form
