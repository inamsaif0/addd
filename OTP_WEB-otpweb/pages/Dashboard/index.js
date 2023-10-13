import { Grid, Stack, Typography } from '@mui/material'
import Layout from '../Layout'

export default function Dashboard(){
    return (
        <Layout>
            <Stack flexDirection={'row'} alignItems='center' justifyContent='center' sx={{mt:{lg:'16rem'}, ml:{lg:'9rem'}}}>
               
                <Typography variant='h2' textAlign='center' fontFamily='monospace'>This Is OTP Dashboard</Typography>
                
            
            </Stack>
        </Layout>
    )
}