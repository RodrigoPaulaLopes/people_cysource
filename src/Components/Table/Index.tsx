import { ReactElement } from "react"
import IPeople from "../../Interfaces/Peoples"

interface People {
    peoples: IPeople[]
    update: Function
    deleteFunction: Function
}

function Table({peoples, update, deleteFunction}: People): ReactElement {
    return (
        <div style={{"overflow": "scroll", "height": "15rem", "width": "100%"}}>
            <table className="table table-stripped" style={{"borderCollapse": "collapse"}}>
                <thead>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Date Born</th>
                    <th>CPF</th>
                    <th>RG</th>
                    <th>PHONE</th>
                    <th>EMAIL</th>
                </thead>
                <tbody>
                    {peoples.map(people => (
                        <tr key={people.id}>
                            <td>{people.id}</td>
                            <td>{people.name + " " + people.last_name}</td>
                            <td>{people.date_born}</td>
                            <td>{people.cpf}</td>
                            <td>{people.rg}</td>
                            <td>{people.phone}</td>
                            <td>{people.email}</td>
                            <td><button className="btn btn-success" onClick={e => update(e, people.id)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={e => deleteFunction(e, people.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Table