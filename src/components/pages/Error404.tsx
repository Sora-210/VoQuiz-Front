import { FC } from 'react'
import { Typography, Stack } from '@mui/material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Link } from 'react-router-dom'

export const Error404:FC = () => {
    return (
        <>
            <DefaultLayout>
                <Stack spacing={5}>
                    <Typography variant="h3" color="black">
                        - 404 -
                    </Typography>
                    <Typography variant="h5" color="black">
                        NotFound
                    </Typography>
                    <Link to="/">Top</Link>
                </Stack>
            </DefaultLayout>
        </>
    )
}