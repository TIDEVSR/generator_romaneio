import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle';
import { Table } from '../../components/Table';
import { useState } from 'react';
import { Api } from '../../services/api';
import { TableItem } from '../../components/TableItem';

export const App = () => {
    const [romaneios, setRomaneios] = useState(null);
    const [op, setOP] = useState();
    const [loading, setLoading] = useState(false);

    const findRomaneio = async (ordem) => {
        setLoading(true);
        try {
            const resp = await Api.get(`http://localhost:8080/romaneio/?ordem=${ordem}`);
            console.log(resp)
            setRomaneios(resp.data);
        }
        catch(e) {
            setRomaneios(null);
        }
        finally {
            setLoading(false);
        }
    }

    const handleClick = () => {
        findRomaneio(op);
    }

  return (
    <div>
      <div className="container">
        <div className="mt-4"></div>
        <div className="mt-4"></div>

        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Digite o número da ordem" aria-label="Digite o número da ordem" aria-describedby="button-addon2" value={op} onChange={(e) => setOP(e.target.value)} />
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleClick}>Procurar</button>
        </div>

        <div className="mb-4"></div>

        {
            romaneios && (
                <Table>
                    {
                        romaneios.map(romaneio => (
                            <TableItem key={romaneio.cod_romaneio} data={{...romaneio}} />
                        ))
                    }
                </Table>
            )
        }
        
      </div>
    </div>
  );
}
