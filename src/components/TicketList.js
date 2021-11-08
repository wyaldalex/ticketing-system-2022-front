import React,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import API from '../api-service'
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

export default function TicketList(props) {

    const [token, setToken] = useCookies(['ts-token']);
    const [ ticket, setTicket ] = useState('ticket1');

    const handleClick = (ticket_id) => {
        console.info("Testing ticket id 2 " + ticket_id)
        let tokenToUse = token['ts-token']
        API.getTicketUser(ticket_id, tokenToUse) 
          .then( resp => setTicket(resp))          
          .catch( error => console.log(error))

          window.location.href = `/ticketdetail/${ticket_id}`; 

      }

    return (
        props.tickets && props.tickets.map(ticket => {
            return (
                <tr>
                    <td>{ticket.title}</td>
                    <td>{ticket.description}</td>
                    <td>{String(ticket.is_closed)}</td>
                    <td><Button
                        variant="outline-light"
                        size="lg"
                        onClick={() => handleClick(ticket.ticket_id)}
                    >
                        Ticket Details
                    </Button></td>
                </tr>
            )
        })
    )
}