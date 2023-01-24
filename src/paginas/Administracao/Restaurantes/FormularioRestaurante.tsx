import { TextField, Button, Typography, AppBar, Toolbar, Container, Link, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Link as RouterLink} from "react-router-dom"

const FormularioRestaurante = () => {

    const parametros = useParams()

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
            .then(response => setNomeRestaurante(response.data.nome))
        }
    }, [parametros])

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`,
            {nome : nomeRestaurante}
            )
            .then(() => {
                alert('Restaurante atualizado com sucesso!')
            })
        } else {
            http.post('restaurantes/',
            {nome : nomeRestaurante}
            )
            .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
        }

    }
    
    return(
        <Box>
            <Container maxWidth="lg" sx={{mt: 1}}>
                {/*conteúdo da página*/}
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Typography component="h1" variant="h6">Formulário de restaurantes</Typography>
                    <Box component='form' sx={{width: "100%"}} onSubmit={aoSubmeterForm}>
                        <TextField 
                            value={nomeRestaurante} 
                            onChange = {event => setNomeRestaurante(event.target.value)}
                            label="Nome do restaurante"
                            variant ="standard"
                            fullWidth
                            required
                        />
                        <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Salvar</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )

}

export default FormularioRestaurante
