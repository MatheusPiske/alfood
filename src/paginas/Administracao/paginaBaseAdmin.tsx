import { TextField, Button, Typography, AppBar, Toolbar, Container, Link, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import { Link as RouterLink} from "react-router-dom"

const PaginaBaseAdmin = () => {
    
    return(
    <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography variant="h6">
                        <Link component={RouterLink} to="/restaurantes">
                            <Button sx={{my: 2, color:"white", fontSize: "18px"}}>
                                <u>Administração</u>
                            </Button>
                        </Link>
                    </Typography>
                    <Box sx={{display: "flex", flexGrow: 1, marginLeft: 2}}>
                        <Link component={RouterLink} to="/admin/restaurantes">
                            <Button sx={{my: 2, color: "white"}}>
                                Restaurantes
                            </Button>
                        </Link>
                        <Link component={RouterLink} to="/admin/restaurantes/novo">
                            <Button sx={{my: 2, color: "white"}}>
                                Novo Restaurante
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

        <Box>
            <Container maxWidth="lg" sx={{mt: 1}}>
                <Paper sx={{p: 2}}>
                    {/*conteúdo da página*/}
                    <Outlet/>
                </Paper>
            </Container>
        </Box>

    </>
    )

}

export default PaginaBaseAdmin
