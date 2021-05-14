import { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import api from '../../services/api';
import './timeCadastro.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';
  

  function TimeCadastro() {

    const [nome, setNome] = useState('');
    const [jogador1, setJogador1] = useState('');
    const [jogador2, setJogador2] = useState('');
    const [tabela, setTabela] = useState([]);
    const [tabela_id, setTabelaId] = useState(0);
    const history = useHistory();
    let { id } = useParams();



    const onSubmit = (ev) => {
        ev.preventDefault();

        if(!nome.length){
            NotificationManager.error('Por favor escolha um nome para o time', 'Fechar!', 1000);
            return;
        }

        api.post('http://localhost/sinuca/api/time', {
            nome,
            jogador1,
            jogador2,
            tabela_id
          })
          .then(function (response) {
            if(response.request.status === 200){
                setNome('');
                setJogador1('');
                setJogador2('');
                setTabelaId(0);
                NotificationManager.success('Cadastrado com successo', 'Sucesso', 1000);

                setTimeout(function(){
                  history.push('/tabela/'+id)
                }, 1500);
            }
          })
          .catch(function (error) {
            if(error.response.status === 409){
                NotificationManager.error('Este time já existe escolha outro nome', 'Fechar', 1000, () => {});
            }
          });
  
    }

    useEffect(()=>{
        api.get('http://localhost/sinuca/api/tabela/'+id)
        .then(function (response) {
            setTabela(response.data.data.tabela[0]);
            setTabelaId(response.data.data.tabela[0].id);
        })
        .catch(function (error) {
            console.log(error)
        })
    }, [])

    return (
      <div className="container">
          <div className="row d-flex justify-content-center align-items-center min-vh-100">
              <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2>Cadastrar Time</h2>
                        <h5>{tabela.nome}</h5>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nome"
                                    value={nome}
                                    onChange={e=> setNome(e.target.value)}
                                    autoFocus
                                    ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="jogador1" className="form-label">Jogador 1</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="jogador1"
                                    value={jogador1}
                                    onChange={e=> setJogador1(e.target.value)}
                                    ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="jogador2" className="form-label">Jogador 2</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="jogador2" 
                                    value={jogador2}
                                    onChange={e=> setJogador2(e.target.value)}
                                    ></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Cadastrar time</button>
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
  
  export default TimeCadastro;
  