import { TextField, Button, Typography, AppBar, Toolbar, Container, Link, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import http from "../../../http"
import ITag from "../../../interfaces/ITag"

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState<ITag[]>([])

    useEffect(() => {
        // Abaixo resgatamos o array de tags para utilizá-lo no select dentro do return
        http.get< {tags: ITag[] } >('tags/')
            .then(response => setTags(response.data.tags))
    }, [])
    
    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

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
                                {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
                                    {tag.value}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                        <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Salvar</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )

}

export default FormularioPrato