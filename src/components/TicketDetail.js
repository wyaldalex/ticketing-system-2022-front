import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import API from '../api-service'
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';


export default function TicketDetail(props) {

    const { id } = useParams();
    const [ticket, setTicket] = useState([]);
    const [ticketLoaded, setTicketLoaded] = useState(false);
    const [token, setToken] = useCookies(['ts-token']);

/*
    useEffect(() => {
        console.info("Testing ticket id 2 " + id)
        let tokenToUse = token['ts-token']
        API.getTicketUser(id, tokenToUse)
            .then(resp => setTicket(resp))
            .then(setTicketLoaded(true))
            .catch(error => console.log(error))
          
    }, []) */

    const fetchTicket = async () => {

        try {
          let tokenToUse = token['ts-token']
          let response = await fetch(`http://127.0.0.1:8000/tickets/ticketsuser/${id}/get_ticket_user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${tokenToUse}`
            }
          })
          let json = await response.json();
          return { success: true, data: json };
        } catch (error) {
          console.log(error);
          return { success: false };
        }
      }

      useEffect(() => {
        (async () => {
            setTicket(false);
          let res = await fetchTicket();
          if (res.success) {
            setTicket(res.data);
            setTicketLoaded(true);
          }
        })();
      }, []);

    return (
        <React.Fragment>
                
            {ticketLoaded ? (            
             <h2>{ticket.ticket.description}   </h2>
            
            ) : (
                <p>No tickte loaded</p>
              )}
        </React.Fragment>

    )
}