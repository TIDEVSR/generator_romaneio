import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";
import { formatarData } from "../../../utils/formataData";

export const BarcodeGS1 = ({ data }) => {
    const divBarcode = useRef();

    const { cod_lote, data_producao, cod_material  } = data;

    const retornaItemCliente = () => {
        let resp = '';
        const value = cod_material.split('-')[0];

        const length = value.length;

        for(let i = 0; i < (14 - length); i++) {
            resp += "0";
        }

        resp += value;

        return resp;
    }

    const retornaLote = () => {
        let resp = '';

        const length = (Number(cod_lote) + '').length;

        for(let i = 0; i < (8 - length); i++) {
            resp += "0";
        }

        resp += Number(cod_lote);

        return resp;
    }

    const coletaData = () => {
        const retorno = formatarData(data_producao).split('/');

        return {
            prod: retorno[2].substring(2, 4) + retorno[1] + retorno[0],
            validade: (Number(retorno[2].substring(2, 4)) + 1) + retorno[1] + retorno[0]
        };
    }

    const dados_code_barras = `(01)${retornaItemCliente()}(11)${coletaData().prod}(12)${coletaData().validade}(10)${retornaLote()}`;

    const createBarcode = () => {
        if (!divBarcode.current) return;
        divBarcode.current.innerHTML = '';
        const svg = document.createElement('canvas');
        // item cliente + data_fabricao_validade + lote
        JsBarcode(svg, dados_code_barras, {
            // width: 3,
            format: "CODE128A",
            ean128: true,
            fontSize: 26
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