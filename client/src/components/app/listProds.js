import React, { useState, useEffect } from 'react';
import {
    getOrderByChild,
    getFilterByChild,
    getMostExpensive,
    getMostCheap,
    getPriceRange
} from '../providers/ProdutosProvider';
import { TableProds } from './tableProds';
import 'materialize-css';
import { Button, Select, Row, Col, ProgressBar, TextInput } from 'react-materialize';
import { Icon } from 'react-materialize';

function ListProds(props) {

    const prods = []
    const [data, setData] = useState([])
    const [loading, setLoad] = useState(true)
    const [order, setOrder] = useState('id_prod')
    const [filter, setFilter] = useState('nome')
    const maxPrice = 25000
    const minPrice = 10
    const [priceRange, setRange] = useState(maxPrice)
    const [sorted, setSorted] = useState(false)

    useEffect(() => {
        !sorted && loadProdsFb()
    }, [order, filter, sorted])

    const loadProdsFb = async ()=>{
        await getOrderByChild(order, receiveProds)
        console.log({ 'ordenar': order })
    }

    const receiveProds = async (data)=>{
        if (!data || data === 'undefined')
            return console.log('Error')
        data.map((produto) => prods.push(produto))
        prods.length?setData([...prods]):setLoad(false)
    }

    const handlerSelectOrder = (event) => {
        setOrder(event.target.value)
    }

    const handlerSelectFilter = (event) => {
        setFilter(event.target.value)
    }

    const handlerApplyFilter = () => {
        prods.length = 0;
        setData([...prods])
        setInterval(() => setLoad(false), 3000)
        const termo = document.getElementById('termo').value
        if (termo) {
            getFilterByChild(filter, termo, receiveProds)
            setLoad(true)
        }
    }

    const handlerMostExpensive = () => {
        prods.length = 0;
        setData([...prods])
        setLoad(true)
        getMostExpensive(setData, prods)
    }

    const handlerMostCheap = () => {
        prods.length = 0;
        setData([...prods])
        setLoad(true)
        getMostCheap(receiveProds)
    }

    const handlerPriceRange = (event) => {
        let newRange = event.target.value
        prods.length = 0;
        setData([...prods])
        setLoad(true)
        setRange(newRange)
        getPriceRange(newRange, receiveProds)
        console.log({ newRange, priceRange })
    }

    const sortCacheListedProducts = (column) => {
        setData(data.reverse())
        setSorted(!sorted)
        console.log({sorted})
    }

    return (<div className='flex-container'>
        <div className={'filterFormContainer'}>
            <Select id='order'
                name='order'
                value={order}
                label="Ordenar por:"
                onChange={handlerSelectOrder}>
                <option value={'id_prod'} >ID</option>
                <option value={'preco'} >Preco</option>
                <option value={'qtd_estoque'}>Quantidade</option>
                <option value={'nome'} >Nome</option>
            </Select>
            <div className='filterPanel'>
                <div>
                    <Select id='filter'
                        name='field'
                        label="Filtrar por:"
                        value={filter}
                        onChange={handlerSelectFilter}>
                        <option value={'nome'} >Nome</option>
                        <option value={'descricao'} >Descricao</option>
                    </Select>
                </div>
                <div>
                    <TextInput id="termo"
                        placeholder='Digite o termo'
                        label="Termo de filtro:"
                        onChange={handlerApplyFilter} />
                </div>
            </div>
            <label htmlFor="price_range">Preco:</label>
            <div className='rangeStyle'>
                R$ 10-20k&nbsp;<input type='range'
                    id={"price_range"}
                    name={"price_range"}
                    value={priceRange}
                    max={maxPrice}
                    min={minPrice}
                    step='10'
                    onChange={handlerPriceRange}
                />
                &nbsp;{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceRange)}
            </div>
            {/* <Button onClick={handlerApplyFilter}>Filtrar</Button> */}
            <div className='btnsContainers'>
                <Button
                    className="waves-effect waves-light btn red"
                    style={{ marginRight: '5px' }}
                    onClick={handlerMostExpensive}>
                    Mais Caros
                    <Icon tiny left>account_balance_wallet</Icon>
                </Button>
                <Button
                    className="waves-effect waves-light btn"
                    style={{ marginRight: '5px' }}
                    onClick={handlerMostCheap}>
                    <Icon tiny left>savings</Icon>
                    Mais Baratos
                </Button>
            </div>
        </div>
        <div className={'tableContainer'}>
            {(data.length > 0)
                ? <TableProds
                    produtos={data}
                    sorted={sorted}
                    sort={sortCacheListedProducts} />
                : (loading) ? <Row>
                    <Col s={12}>
                        <ProgressBar />
                    </Col>
                </Row> : <p>Sem Resultados</p>
            }
        </div>
    </div>);
}

export default ListProds