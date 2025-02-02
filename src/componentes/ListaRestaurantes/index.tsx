import axios, { AxiosRequestConfig } from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IParametrosBusca from '../../interfaces/IParametrosBusca';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')
  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    // Obter restaurantes
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
     .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next as SetStateAction<string>)
        setPaginaAnterior(resposta.data.previous as SetStateAction<string>)
     })
     .catch(erro => {
        console.log(erro)
     })
  }

  const buscar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }

    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <div>
        <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      </div>
      <div>
        <label htmlFor="select-ordenacao">Ordenação</label>
        <select
          name="select-ordenacao"
          id="select-ordenacao"
          value={ordenacao}
          onChange={evento => setOrdenacao(evento.target.value)}
        >
          <option value="">Padrão</option>
          <option value="id">Por ID</option>
          <option value="nome">Por Nome</option>
        </select>
      </div>
      <button type='submit'>buscar</button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Pagina Anterior</button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>}
  </section>)
}

export default ListaRestaurantes