import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import api from '../../services/api';
import './tabelaList.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';
  

  function TabelaList() {

    const [tabelas, setTabelas] = useState([]);
    const history = useHistory();
  

    function handleCardClick (id) {
        history.push(`/tabela/${id}`);
    }
    

    useEffect(()=>{
        api.get('http://localhost/sinuca/api/tabela')
            .then(function (response) {
                setTabelas(response.data.data);
            })
            .catch(function (error) {
               console.log(error)
            })
    },[])
    
    return (
      <div className="container __main-container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <h1 className="__page-title">Lista de Tabelas</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="button" onClick={e=>{history.push('/tabela-cadastro')}} className="btn btn-primary btn-sm mb-3" style={{marginRight: '10px'}}>Adicionar tabela</button>
            </div>
          </div>
          <div className="row">
            {tabelas.map(tabela=>
              <div key={tabela.id} className="col-md-6 col-lg-4" onClick={()=>handleCardClick(tabela.id)}>
                <div className="card __card" style={{width: "100%"}}>
                    <div className="card-body">
                        <h3>{tabela.nome}</h3>
                        <p>Prêmio <span className="__player-name">{tabela.premio}</span></p>
                        <p>Pontuação <span className="__player-name">{tabela.pontuacao}</span></p>
                        <p>Regra <span className="__player-name">{tabela.regra}</span></p>
                        
                    </div>
                </div>
              </div>
            )}
          </div>
          
          <NotificationContainer></NotificationContainer>
      </div>
    );
  }
  
  export default TabelaList;
  