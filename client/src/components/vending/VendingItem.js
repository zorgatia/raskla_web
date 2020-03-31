import React from 'react'
import { setVending } from '../../actions/vending'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const VendingItem = ({setVending,vending}) => {
    return (
        <tr>
            <td>{vending.numero}</td>
            <td>{vending.model}</td>
            <td>{vending.status}</td>
            <td>{vending.vends.length}</td>
            <td><Link to="/map" onClick={e=>setVending(vending)}>Track</Link></td>
        </tr>
    )
}

export default connect (null,{setVending}) (VendingItem)
