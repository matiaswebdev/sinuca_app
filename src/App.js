import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TimeCadastro from "./pages/time/TimeCadastro";
import TimeList from "./pages/time/TimeList";
import TabelaList from "./pages/tabela/TabelaList";
import TabelaCadastro from "./pages/tabela/TabelaCadastro";
import Tabela from "./pages/tabela/Tabela";

function App() {
  return (
    <Router basename="/sinuca/build">
      <div>
        <Switch>
          <Route path="/time-cadastro/:id" children={<TimeCadastro />} />
          <Route path="/tabela-cadastro">
            <TabelaCadastro />
          </Route>
          <Route path="/time-list">
            <TimeList />
          </Route>
          <Route path="/tabela-list">
            <TabelaList />
          </Route>
          <Route path="/tabela/:id" children={<Tabela />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
