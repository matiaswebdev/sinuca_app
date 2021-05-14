import { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import api from '../../services/api';
import './tabelaCadastro.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';
  

  function TabelaCadastro() {

    const [nome, setNome] = useState('');
    const [premio, setPremio] = useState('');
    const [pontuacao, setPontuacao] = useState('');
    const [regra, setRegra] = useState('');
    const history = useHistory();


    const onSubmit = (ev) => {
        ev.preventDefault();

        if(!nome.length){
            NotificationManager.error('Por favor escolha um nome para a tabela', 'Click me!', 1000);
            return;
        }

        if(!pontuacao.length){
            NotificationManager.error('Por favor escolha uma pontucao para a tabela', 'Click me!', 1000);
            return;
        }

        api.post('http://localhost/sinuca/api/tabela', {
            nome,
            premio,
            pontuacao,
            regra
          })
          .then(function (response) {
            if(response.request.status === 200){
                setNome('');
                setPremio('');
                setPontuacao('');
                setRegra('');
                NotificationManager.success('Cadastrado com successo', 'Sucesso', 1000);

                setTimeout(function(){
                    history.goBack();
                }, 1000)
            }
          })
          .catch(function (error) {
            if(error.response.status === 409){
                NotificationManager.error('Esta tabela já existe escolha outro nome', 'Click me!', 1000, () => {});
            }
          });
    }

    return (
      <div className="container">
          <div className="row d-flex justify-content-center align-items-center min-vh-100">
              <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2>Cadastrar Tabela</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nome"
                                    value={nome}
                                    onChange={e=> setNome(e.target.value)}
                                    ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="premio" className="form-label">Prêmio</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="premio"
                                    value={premio}
                                    onChange={e=> setPremio(e.target.value)}
                                    ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pontuacao" className="form-label">Pontuação</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="pontuacao" 
                                    value={pontuacao}
                                    onChange={e=> setPontuacao(e.target.value)}
                                    ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="regra" className="form-label">Regra</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="regra" 
                                    value={regra}
                                    onChange={e=> setRegra(e.target.value)}
                                    ></input>
                            </div>
                           
                            <button type="submit" className="btn btn-primary">Cadastrar tabela</button>
                            <button onClick={e=>{history.goBack()}} className="btn btn-default">Cancelar</button>
                        </form>
                    </div>
                </div>
              </div>
          </div>
          <NotificationContainer></NotificationContainer>
      </div>
    );
  }
  
  export default TabelaCadastro;
  