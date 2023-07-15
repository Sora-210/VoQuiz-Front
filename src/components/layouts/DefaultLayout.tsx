import { FC, ReactNode } from 'react'
import { Box, Container, AppBar, Toolbar, Typography, Stack } from '@mui/material'
import { Calculate } from '@mui/icons-material';

type Props = {
    children: ReactNode;
}

export const DefaultLayout:FC<Props> = ({ children }) => {
    return (
        <>
        <Box bgcolor="#F4F4F4" height="100vh" width="100vw">
            <Container disableGutters maxWidth="xs" sx={{height: "100vh", bgcolor: "#FFFFFF"}}>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: "center"}}>
                        <Typography variant="h4">
                            VoQuiz
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container sx={{height: 'calc(100vh - 64px)', overflowY: 'scroll'}}>
                    <Stack textAlign="center" sx={{ mt: 2, mb: 6 }}>
                        { children }
                    </Stack>
                </Container>
            </Container>
        </Box>
        </>
    )
}