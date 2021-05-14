import { useState, useEffect } from 'react';
import api from '../../services/api';
import './timeList.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';
  

  function TimeList() {

    const [times, setTimes] = useState([]);

    function handleCardClick (id) {
        console.log('handleCardClick', id);
    }
    

    useEffect(()=>{
        api.get('http://localhost/sinuca/api/time')
            .then(function (response) {
                setTimes(response.data.data);
            })
            .catch(function (error) {
               console.log(error)
            })
    },[])
    
    return (
      <div className="container __main-container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <h1 className="__page-title">Lista de Times</h1>
            </div>
          </div>
          <div className="row">
            {times.map(time=>
              <div key={time.id} className="col-lg-4" onClick={()=>handleCardClick(time.id)}>
                <div className="card __card" style={{width: "100%"}}>
                    <div className="card-body">
                        <h3>{time.nome}</h3>
                        <p>Jogador 1 <span className="__player-name">{time.jogador1}</span></p>
                        <p>Jogador 2 <span className="__player-name">{time.jogador2}</span></p>
                    </div>
                </div>
              </div>
            )}

          </div>
          <NotificationContainer></NotificationContainer>
      </div>
    );
  }
  
  export default TimeList;
  