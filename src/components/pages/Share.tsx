import { FC, useState, useEffect } from 'react'
import { Typography, Stack } from '@mui/material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useParams } from 'react-router-dom'

export const SharePage:FC = () => {
    const params = useParams<{id: string}>()
    const [voteId, setVoteId] = useState('')
    let isFirst = true

    useEffect(() => {
        if (isFirst) {
            setVoteId(params.id ?? '')
            isFirst = false
        }
    }, [])

    return (
        <>
            <DefaultLayout>
                <Stack spacing={5}>
                    <Typography variant="h5" color="black">
                        問題を作成しました
                    </Typography>
                    <Typography variant="h6" color="black">
                        { voteId }
                    </Typography>
                </Stack>
            </DefaultLayout>
        </>
    )
}