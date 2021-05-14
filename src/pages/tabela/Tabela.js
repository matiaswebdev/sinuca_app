import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import api from '../../services/api';
import './tabela.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';
  

  function Tabela() {

    const [tabela, setTabela] = useState([]);
    const [times, setTimes] = useState([]);
    const history = useHistory();
    let { id } = useParams();

    function handleAddTime () {
      if(times.length < 10){
        history.push('/time-cadastro/'+id)
        return;
      }
      
      NotificationManager.error('Capacidade de times esgotada, escolha outra tabela', 'Fechar!', 1000, () => {});
    }

    useEffect(()=>{

        api.get(`http://localhost/sinuca/api/tabela/${id}`)
            .then(function (response) {
                setTabela(response.data.data.tabela[0]);
                setTimes(response.data.data.times);
            })
            .catch(function (error) {
               console.log(error)
            })
    },[])

    const renderTimes = () => {
      return times.map(time=><p key={time.id}>{time.nome} <span>Pontos: {time.pontos}</span></p>)
    }
    
    return (
      <div className="container __main-container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <h1 className="__page-title">{tabela.nome}</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            
              <div className="col-lg-6">
                <div className="card __card" style={{width: "100%"}}>
                    <div className="card-body">
                        <p>Prêmio <span className="__player-name">{tabela.premio}</span></p>
                        <p>Pontuação <span className="__player-name">{tabela.pontuacao}</span></p>
                        <p>Regra <span className="__player-name">{tabela.regra}</span></p>  
                    </div>
                    <div className="container">
                        <div className="row">
                            {renderTimes()}
                        </div>
                    </div>
                </div>
                <button type="button" onClick={handleAddTime} className="btn btn-primary btn-sm" style={{marginRight: '10px'}}>Adicionar time</button>
                <button type="button" onClick={e=>history.push('/tabela-list')} className="btn btn-primary btn-sm">Todas as tabelas</button>
              </div>

              
          </div>
          <NotificationContainer></NotificationContainer>
      </div>
    );
  }
  
  export default Tabela;
  