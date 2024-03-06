import { useEffect, useState } from "react";
import { formatarData } from "../../utils/formataData"
import { Barcode } from "../RomaneioCanvaObj/Barcode"
import { BarcodeGS1 } from "../RomaneioCanvaObj/BarcodeGS1"

import './style.css';

export const Romaneio = ({ romaneio, image_molde }) => {
    const [isBemBrasil, setIsBemBrasil] = useState(false);

    const validaBemBrasil = () => {
        if(romaneio.cnpj_cliente.toString().includes("06004860")) {
            if (romaneio.nome_cliente.toString().includes("BEM BRASIL")) return true;
        }
        return false;
    }

    useEffect(() => {
        setIsBemBrasil(validaBemBrasil());
    }, [])
    
    return (
        <div id={`romaneio_container_${romaneio.cod_romaneio}`} style={{position: 'relative', top: 0, left: 0, width: '1504.5px', maxWidth: '1504.5px', border: '1px solid #c2c2c216'}}>
            <img src={image_molde} alt="" />

            <div class="bloco romaneio">
                <span>{romaneio.cod_romaneio}</span>
            </div>

            <div class="bloco op_lote">
                <span>{Number(romaneio.cod_ordem)}/{romaneio.cod_lote}</span>
            </div>
            
            <Barcode cod_romaneio={romaneio.cod_romaneio} />

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

            {
                isBemBrasil && (romaneio.referencia_cliente.length > 0) && (
                    <div className="bloco referencia-cliente">
                        <p>Ordem de compra</p>
                        <span>{romaneio.referencia_cliente}</span>
                    </div>
                )
            }

            <div class="bloco peso_tubete">
                <span>{romaneio.peso_tubete}</span>
            </div>

            <div class="bloco quantidade">
                <span>{romaneio.peso_liquido} KG</span>
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

            <BarcodeGS1 data={romaneio} />
        </div>
    )
}