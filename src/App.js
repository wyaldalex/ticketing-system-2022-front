import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import Footer from './components/footer';
import TicketList from './components/TicketList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import API from './api-service'
import { useCookies } from 'react-cookie';

function App() {

  const [tickets, setTicket] = useState(['Ticket 1' , 'Ticket'])
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['ts-token']);


  const logoutUser = () => {
    deleteToken(['ts-token']);
  }


  useEffect(() => {
    fetch("http://127.0.0.1:8000/tickets/ticketsuser/get_tickets", {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Token ${token['ts-token']}`
    }
    }).then(resp => resp.json())
    .then (resp => setTicket(resp))
    .catch(error => console.log(error))
  }, [])

  useEffect( () => {
    if(!token['ts-token']) window.location.href = '/';
  }, [token])


  const ticketClicked = ticket => {
    console.log(ticket.title)
    setSelectedTicket(ticket)
  }

  return (

    <div className="App">
      <Button variant="danger" onClick={logoutUser}>Log Out</Button>{' '}      
      <div><h2>Ticket List</h2>
      <div>
      <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                <th>Ticket Title</th>
                                <th>Description</th>
                                <th>Status Closed</th>
                                <th>Ticket Details</th>
                                </tr>
                            </thead>
                            <tbody>
        <TicketList tickets={tickets} ticketClicked={ticketClicked} ></TicketList>
        </tbody>
        </Table>                            
                        </div> 
      </div>
      <h1>Ticket System 2022</h1>
    </div>
  );
}

export default App;
