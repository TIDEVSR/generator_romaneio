
export const TableItem = ({data}) => {    
    const { nome_cliente, item_cliente, data_registro } = data;
    return (
        <tr>
        <th scope="row">-</th>
        <td>{nome_cliente}</td>
        <td>{item_cliente}</td>
        <td>{data_registro}</td>
        </tr>
    )
}
