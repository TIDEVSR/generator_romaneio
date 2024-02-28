import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle';

export const App = () => {
  return (
    <div>
      <div className="container">
        <div className="mt-4"></div>
        <div className="mt-4"></div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Digite o número da ordem" aria-label="Digite o número da ordem" aria-describedby="button-addon2" />
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Procurar</button>
        </div>
      </div>
    </div>
  );
}
