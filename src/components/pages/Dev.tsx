import { FC, useState } from 'react'
import { Box, Card, Button, Typography } from '@mui/material'
import { DefaultLayout } from '../layouts/DefaultLayout'

export const Dev:FC = () => {
    const [checkData, setCheckData] = useState("");

    // health check api
    const checkHealth = async () => {
        try {
            const res = await fetch('https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/helloWorld')
            const data = await res.json()
            setCheckData(JSON.stringify(data))
        } catch(e) {
            setCheckData('Error');
        }
    }


    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    <Card sx={{m: 3, p: 3}}>
                        <Typography>
                            API Health Check
                        </Typography>
                        <Button variant="contained" onClick={checkHealth}>
                            Send
                        </Button>
                        <p>
                            { checkData }
                        </p>
                    </Card>
                </Box>
            </DefaultLayout>
        </>
    )
}