import { Link } from "react-router-dom";
import { formatarData } from "../../utils/formataData";
import { RomaneioCanvaObj } from "../RomaneioCanvaObj";

export const TableItem = ({data}) => {    
    const { cod_romaneio, nome_cliente, item_cliente, data_registro } = data;

    return (
        <tr>
            <th scope="row">{cod_romaneio}</th>
            <td>{nome_cliente}</td>
            <td>{item_cliente}</td>
            <td>{formatarData(data_registro)}</td>
            <td><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${cod_romaneio}`}>Visualizar</button></td>

            <RomaneioCanvaObj cod_romaneio={cod_romaneio} />
        </tr>
    )
}
