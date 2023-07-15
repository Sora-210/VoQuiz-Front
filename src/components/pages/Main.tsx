import { FC } from 'react'
import { Box, Card, TextField, Stack, Button, Typography } from '@mui/material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useNavigate } from 'react-router-dom'

export const Main:FC = () => {
    const navigate = useNavigate()

    const PushDebugPage = () => {
        navigate("/dev")
    }

    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    <Card sx={{m: 3, p: 3}}>
                        <Typography>
                            参加する
                        </Typography>
                        <Typography>
                            投票コードを入力して投票しよう！
                        </Typography>
                        <Stack spacing={3} sx={{mx: 5, my:2}}>
                            <TextField id="outlined-basic" label="UserName" variant="outlined" />
                            <TextField id="outlined-basic" label="VoteID" variant="outlined" />
                            <Button variant="contained">
                                Join
                            </Button>
                        </Stack>
                    </Card>
                    <Card sx={{m: 3, p: 3}}>
                        <Typography>
                            作成する
                        </Typography>
                        <Typography>
                            投票を開始しよう！
                        </Typography>
                        <Stack spacing={3} sx={{mx: 5, my:2}}>
                            <TextField id="outlined-basic" label="UserName" variant="outlined" />
                            <Button variant="contained">
                                Create
                            </Button>
                        </Stack>
                    </Card>
                    <Button onClick={PushDebugPage}>
                        Debug Page
                    </Button>
                </Box>
            </DefaultLayout>
        </>
    )
}