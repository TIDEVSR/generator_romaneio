import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";
import { formatarData } from "../../../utils/formataData";

export const BarcodeGS1 = ({ data }) => {
    const divBarcode = useRef();

    const { item_cliente, cod_ordem, data_producao  } = data;

    const retornaItemCliente = () => {
        let resp = '';
        const value = item_cliente.split('-');

        const length = value[0].length;

        for(let i = 0; i < (14 - length); i++) {
            resp += "0";
        }

        resp += value[0];

        return resp;
    }

    const coletaData = () => {
        const retorno = formatarData(data_producao).split('/');

        return '' + retorno[0] + retorno[1] + retorno[2];
    }

    const dados_code_barras = `(01)${retornaItemCliente()}(11)${Number(cod_ordem)}(12)${coletaData()}(10)02049927`;

    const createBarcode = () => {
        if (!divBarcode.current) return;
        divBarcode.current.innerHTML = '';
        const svg = document.createElement('canvas');
        // item cliente + data_fabricao_validade + lote
        JsBarcode(svg, dados_code_barras, {
            // width: 3,
            fontSize: 24
        });
        svg.classList.add('img-fluid');
        divBarcode.current.appendChild(svg);
    }

    useEffect(() => {
        createBarcode();
    }, []);

    return (
        <div className="bloco barcodegs1" ref={divBarcode}>
        </div>
    )
}