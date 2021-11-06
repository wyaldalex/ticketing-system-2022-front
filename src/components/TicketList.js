import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function TicketList(props) {

 return (
    props.tickets && props.tickets.map(ticket => {
        return (
                <tr>
                    <td>{ticket.title}</td>
                    <td>{ticket.description}</td>
                    <td>{String(ticket.is_closed)}</td>
                    <td><Button variant="info" >Details</Button></td>
                </tr>
        )
    })
 )
}