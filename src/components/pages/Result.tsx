import { FC, useState, useEffect } from 'react'
import { Box, Card, Stack, Button, Typography, Container } from '@mui/material'
import { PieChart } from'@mui/x-charts'
import { PendingActions, Person } from '@mui/icons-material'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { Vote, Option } from '../../types/Vote'
import { ResultOption, Result } from '../../types/Result'
import { ChartData } from '../../types/Chart'

export const ResultPage:FC = () => {
    const params = useParams<{voteId: string}>()
    const navigate = useNavigate()

    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState<Array<ChartData>>([])
    const [series, setSeries] = useState<Array<{data: Array<ChartData>}>>([])

    useEffect(() => {
        const getData = async(voteId: string) => {
            try {
                const res0 = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/vote/${voteId}`)
                const res1 = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/result/${voteId}`)
                const vote:Vote = (await res0.json())
                const data1:{result: Result} = (await res1.json())

                setQuestion(vote.question)

                const data: Array<ChartData> = []
                data1.result.options.forEach((option, index) => {
                    const serie: ChartData = {
                        id: index,
                        value: option.totalCount,
                        label: option.option
                    }
                    data.push(serie)
                })
                setSeries([{data: data}])
                setOptions(data)


            } catch(e) {
                console.log(e)
                navigate('/404')
            }
        }

        getData(params.voteId ? params.voteId : '')
    }, [])


    return (
        <>
            <DefaultLayout>
                <Box maxWidth="100%">
                    <Container>
                        <Stack spacing={2}>
                            <Card sx={{p: 3}}>
                                <Typography variant="h6" sx={{ textAlign:"left", my: 2, fontWeight: 'bold' }}>
                                    | Question
                                </Typography>
                                <Typography textAlign='left' sx={{mx: 2}}>
                                    { question }
                                </Typography>
                            </Card>
                            <Card sx={{p: 3}}>
                                <Typography variant="h6" sx={{ textAlign:"left", my: 2, fontWeight: 'bold' }}>
                                    | Options
                                </Typography>
                                <Stack spacing={1} sx={{mx: 2}}>
                                    {options.map((option, index) => {
                                        return (
                                            <Typography textAlign='left' key={index}>
                                                - {option.label}: {option.value}
                                            </Typography>
                                        )
                                    })}
                                </Stack>
                            </Card>
                            {series.length && (
                                <Card sx={{m: 3, p: 3}}>
                                    <PieChart
                                        series={series}
                                        width={350}
                                        height={200}
                                    />
                                </Card>
                                
                            )}
                        </Stack>
                    </Container>
                </Box>
            </DefaultLayout>
        </>
    )
}