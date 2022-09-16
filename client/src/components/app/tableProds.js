import React from "react";
import { Table, Checkbox, Icon } from 'react-materialize';

export const TableProds = (props) => {

    const sortIcon = `keyboard_double_arrow${props.sorted ? '_up' : '_down'}`

    return (<><Table className="striped responsive-table">
        <thead>
            <tr>
                <th className={"theadId"}>
                    <button
                        className={'orderIcon'}
                        onClick={() => props.sort('id')}>
                        Id<Icon right tiny>
                            {sortIcon}
                        </Icon>
                    </button>
                </th>
                <th>Nome</th>
                <th>Descricao</th>
                <th>Estoque</th>
                <th>Preço &#128176;</th>
                <th>Importado</th>
                {/* <th colspan="2">Ações</th> */}
            </tr>
        </thead>
        <tbody>
            {props.produtos.map((produto, key) => {
                return (
                    <tr key={key}>
                        <td>{produto.id_prod}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.qtd_estoque}</td>
                        <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}</td>
                        <td>{(produto.importado) ? <Checkbox label="" value="" checked /> : <label>não</label>}</td>
                        {/* <td>
                    <a href="{{route('delete',$produto->id)}}" title='Deletar'>&#128465</a>
                    <a href="{{route('edit',$produto->id)}}" title="Editar">✎</a>
                </td> */}
                    </tr>)
            })}
        </tbody>
    </Table>
    </>)
}