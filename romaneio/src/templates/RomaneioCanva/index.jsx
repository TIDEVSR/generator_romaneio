import { useEffect, useRef, useState } from 'react';
import { formatarData } from '../../utils/formataData';
import image_molde from './img/image_molde.png'
import { Api } from '../../services/api';
import { useLocation } from 'react-router-dom';

import './style.css';

import JsBarcode from  'jsbarcode';

export const RomaneioCanva = () => {
    const divBarcode = useRef();
    const location = useLocation();

    const { id_romaneio } = location.state;

    const [romaneio, setRomaneio] = useState(null);

    const findRomaneio = async () => {

        try {
            const resp = await Api.get(`/romaneio/?romaneio=${id_romaneio}`);

            console.log(resp.data)
            
            setRomaneio(resp.data);
        }
        catch(e) {
            setRomaneio(null);
        }
        finally {
        }
    }

    const createBarcode = () => {
        if (!divBarcode.current) return;
        divBarcode.current.innerHTML = '';
        const svg = document.createElement('canvas');
        // item cliente + data_fabricao_validade + lote
        JsBarcode(svg, "010000000000407011231206122412061000079633");
        divBarcode.current.appendChild(svg);
    }


    useEffect(() => {
        findRomaneio();
    }, []);
   

    return (
        <div id="romaneio_container" style={{position: 'relative', top: 0, left: 0, maxWidth: '1542.1px', border: '1px solid #c2c2c2'}}>
            {
                romaneio && (
                    <>
                        <img src={image_molde} alt="" />

                        <div class="bloco romaneio">
                            <span>{romaneio.cod_romaneio}</span>
                        </div>

                        <div class="bloco op_lote">
                            <span>{Number(romaneio.cod_ordem)}/{romaneio.cod_lote}</span>
                        </div>
                        <div class="bloco barcode" ref={divBarcode}>
                            <svg id="code_barras"></svg>
                        </div>
                        <div class="bloco cliente">
                            <span>{romaneio.nome_cliente}</span>
                        </div>
                        <div class="bloco itemsr">
                            <span>{romaneio.item_sr}</span>
                        </div>
                        <div class="bloco item_cliente">
                            <span>{romaneio.item_cliente}</span>
                        </div>

                        <div class="bloco cidade">
                            <span>{romaneio.nome_cidade}</span>
                        </div>

                        <div class="bloco peso_bruto">
                            <span>{romaneio.peso_bruto}</span>
                        </div>

                        <div class="bloco peso_liquido">
                            <span>{romaneio.peso_liquido}</span>
                        </div>

                        <div class="bloco peso_tubete">
                            <span>{romaneio.peso_tubete}</span>
                        </div>

                        <div class="bloco quantidade">
                            <span>{romaneio.peso_liquido}</span>
                        </div>

                        <div class="bloco endereco">
                            <span>{romaneio.endereco}</span>
                        </div>

                        <div class="bloco qtd_vol">
                            <span>{romaneio.qtd_volume}</span>
                        </div>

                        <div class="bloco data_prod">
                            <span>{formatarData(romaneio.data_producao)}</span>
                        </div>
                        
                        <div class="bloco op_lote2">
                            <span>{Number(romaneio.cod_ordem)}/{romaneio.cod_lote}</span>
                        </div>
                        {
                            romaneio && createBarcode()
                        }
                    </>
                )
            }       
            <button onClick={createBarcode}>Gerar</button>
        </div>
    )
}