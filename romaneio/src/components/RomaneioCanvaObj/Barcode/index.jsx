import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react"

export const Barcode = ({ cod_romaneio }) => {
    const divBarcode = useRef();

    const createBarcode = () => {
        if (!divBarcode.current) return;
        divBarcode.current.innerHTML = '';
        const svg = document.createElement('canvas');
        // item cliente + data_fabricao_validade + lote
        JsBarcode(svg, cod_romaneio, {
            // width: 3,
            fontSize: 0,
            height: 35,
        });
        svg.classList.add('img-fluid');
        divBarcode.current.appendChild(svg);
    }

    useEffect(() => {
        createBarcode();
    }, []);

    return (
        <div className="bloco barcode" ref={divBarcode}>
        </div>
    )
}