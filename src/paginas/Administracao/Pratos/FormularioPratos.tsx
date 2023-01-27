import { TextField, Button, Typography, AppBar, Toolbar, Container, Link, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [restaurante, setRestaurante] =useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [imagem, setImagem] = useState<File | null>(null)

    useEffect(() => {
        // Abaixo resgatamos o array de tags para utilizá-lo no select dentro do return
        http.get< {tags: ITag[] } >('tags/')
            .then(response => setTags(response.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => setRestaurantes(response.data))
    }, [])

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0])
        } else {
            setImagem(null)
        }
    }
    
    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Criando o FormData para fazer o upload para a API
        const formData = new FormData()

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)
        if (imagem) {
            formData.append('imagem', imagem)
        }

        // Fazendo o upload para a API
        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                alert('Prato cadastrado com sucesso!')
            })
            .catch(erro => console.log(erro))
    }
    
    return(
        <Box>
            <Container maxWidth="lg" sx={{mt: 1}}>
                {/*conteúdo da página*/}
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Typography component="h1" variant="h6">Formulário de pratos</Typography>
                    <Box component='form' sx={{width: "100%"}} onSubmit={aoSubmeterForm}>
                        <TextField 
                            value={nomePrato} 
                            onChange = {event => setNomePrato(event.target.value)}
                            label="Nome do prato"
                            variant ="standard"
                            fullWidth
                            margin="dense"
                            required
                        />
                        <TextField 
                            value={descricao} 
                            onChange = {event => setDescricao(event.target.value)}
                            label="Descricap do prato"
                            variant ="standard"
                            fullWidth
                            margin="dense"
                            required
                        />

                        <FormControl margin="dense" fullWidth>
                            <InputLabel id="select-tag">Tag</InputLabel>
                            <Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}>
                                {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                    {tag.value}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl margin="dense" fullWidth>
                            <InputLabel id="select-restaraunte">Restaurante</InputLabel>
                            <Select labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}>
                                {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                    {restaurante.nome}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                        <input type="file" onChange={selecionarArquivo}/>

                        <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Salvar</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )

}

export default FormularioPrato