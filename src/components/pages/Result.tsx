import { FC, useState, useEffect, SyntheticEvent } from 'react'
import { Box, Card, Stack, Typography, Container, Divider, Tabs, Tab } from '@mui/material'
// import { TabContext, TabList, Tab } from '@mui/lab'
import { PieChart } from'@mui/x-charts'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { Vote } from '../../types/Vote'
import { User, Result } from '../../types/Result'
import { ChartData } from '../../types/Chart'

export const ResultPage:FC = () => {
    const params = useParams<{voteId: string}>()
    const navigate = useNavigate()

    const [tab, setTab] = useState('0')

    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState<Array<ChartData>>([])
    const [series, setSeries] = useState<Array<{data: Array<ChartData>}>>([])

    const [votedUsers, setVotedUsers] = useState<Array<Array<User>>>([])

    useEffect(() => {
        const getData = async(voteId: string) => {
            try {
                const res0 = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/vote/${voteId}`)
                const res1 = await fetch(`https://fdyoc3p9e3.execute-api.ap-northeast-1.amazonaws.com/result/${voteId}`)
                const vote:Vote = (await res0.json())
                const data1:{result: Result} = (await res1.json())

                setQuestion(vote.question)

                const data: Array<ChartData> = []
                const users: Array<Array<User>> = []
                data1.result.options.forEach((option, index) => {
                    const serie: ChartData = {
                        id: index,
                        value: option.totalCount,
                        label: option.option
                    }
                    data.push(serie)

                    users.push(option.votedUser.sort((a, b) => {return (a.voteCount < b.voteCount ? 1 : -1)}))
                })
                setSeries([{data: data}])
                setOptions(data)
                setVotedUsers(users)
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
                                <Box>
                                    <Divider />
                                    <Box sx={{display: "flex"}}>
                                        <Typography width='80%' sx={{ my: 1, fontWeight: 'bold', textAlign: 'center' }}>
                                            選択肢
                                        </Typography>
                                        <Typography width='20%' sx={{ my: 1, fontWeight: 'bold', textAlign: 'center' }}>
                                            票数
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    {options.map((option, index) => {
                                        return (
                                            <Box sx={{display: "flex"}} key={`select-${index}`}>
                                                <Typography width='80%' sx={{ my: 1, textAlign: 'center' }}>
                                                    {option.label}
                                                </Typography>
                                                <Typography width='20%' sx={{ my: 1, textAlign: 'center' }}>
                                                    {option.value}
                                                </Typography>
                                            </Box>
                                        )
                                    })}
                                    <Divider />
                                </Box>
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
                            {votedUsers.length && (
                                <Card sx={{m: 3, p: 3}}>
                                    <Typography variant="h6" sx={{ textAlign:"left", my: 2, fontWeight: 'bold' }}>
                                        | Details
                                    </Typography>
                                    <Box>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs aria-label='select' value={tab}
                                                onChange={(event: SyntheticEvent, v: string) => {
                                                    setTab(v)
                                                    console.log(event)
                                                }} 
                                            >
                                                {options.map((option, index) => {
                                                    return (
                                                        <Tab
                                                            label={option.label}
                                                            value={index.toString()}
                                                            key={`tab-${index}`}
                                                            id={`tab-${index}`}
                                                            aria-controls={`tabpanel-${index}`}
                                                        />
                                                    )
                                                })}
                                            </Tabs>
                                            {votedUsers.map((users, index) => {
                                                return (
                                                    <Box
                                                        role="tabpanel"
                                                        // hidden={tab === index.toString()}
                                                        key={`tab-panel-${index}`}
                                                        id={`tab-${index}`}
                                                        aria-labelledby={`tabpanel-${index}`}
                                                    >
                                                        {tab === index.toString() && (
                                                            <Box sx={{px: 1, py: 2}}>
                                                                <Divider />
                                                                <Box sx={{display: "flex"}}>
                                                                    <Typography width='80%' sx={{ my: 1, fontWeight: 'bold', textAlign: 'center' }}>
                                                                        ユーザー名
                                                                    </Typography>
                                                                    <Typography width='20%' sx={{ my: 1, fontWeight: 'bold', textAlign: 'center' }}>
                                                                        票数
                                                                    </Typography>
                                                                </Box>
                                                                <Divider />
                                                                {users.map((user, userIndex) => {
                                                                    return (
                                                                        <Box sx={{display: "flex"}} key={`tabpanel-${index}-${userIndex}`}>
                                                                            <Typography width='80%' sx={{ my: 1, textAlign: 'center' }}>
                                                                                {user.userName}
                                                                            </Typography>
                                                                            <Typography width='20%' sx={{ my: 1, textAlign: 'center' }}>
                                                                                {user.voteCount}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                                })}
                                                                <Divider />
                                                            </Box>
                                                        )}
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                </Card>
                                
                            )}
                        </Stack>
                    </Container>
                </Box>
            </DefaultLayout>
        </>
    )
}