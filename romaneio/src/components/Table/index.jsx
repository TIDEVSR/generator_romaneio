import styled from "styled-components"

export const Table = ({ children }) => {    
    return (
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Romaneio</th>
            <th scope="col">Nome Cliente</th>
            <th scope="col">Item Cliente</th>
            <th scope="col">Data Produção</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    )
}
