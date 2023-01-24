import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(() => {
    // Obter restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
     .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next as SetStateAction<string>)
     })
     .catch(erro => {
        console.log(erro)
     })
  }, [])

  const verMais = () => {
    // Lembre-se que a variável proximaPagina abaixo é uma URL
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then(resposta => {
      setRestaurantes([...restaurantes, ...resposta.data.results])
      setProximaPagina(resposta.data.next as SetStateAction<string>)
    })
    .catch(erro => {
      console.log(erro)
    })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>
      ver mais  
    </button>}
  </section>)
}

export default ListaRestaurantes