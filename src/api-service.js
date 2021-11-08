const TOKEN =  "";

export default class API {

    static loginUser(body) {
      return fetch(`http://127.0.0.1:8000/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( body )
      }).then( resp => resp.json())
    }

    static getTicketUser(ticket_id,token) {
      return fetch(`http://127.0.0.1:8000/tickets/ticketsuser/${ticket_id}/get_ticket_user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }).then(resp => resp.json())
    }
}