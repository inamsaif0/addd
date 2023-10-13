import { Stack, Typography, Grid,TextField } from '@mui/material'
import Layout from '../Layout'
import BasicTable from '../../component/Table';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit'


export default function UserList(){
    return (
        <Layout>
            
            <Stack flexDirection={'column'} alignItems='centen' justifyContent='flex-end' gap='2rem' 
            sx={{ 
             mt:{lg:'10rem', sm:'3rem', md:'2rem'},
             ml:{lg:'5rem', md:'15rem', sm:'1rem'},
             mb:{lg:'2rem', md:'1rem',sm:'1rem'},
   
             }}>
                <Stack alignItems='center' justifyContent="center"><Typography variant='h4' sx={{color:'#5c0931'}}><b>USERS LIST</b></Typography></Stack>
                            <Stack direction={'column'} alignItems='center' justifyContent='center'>
                <Stack flexDirection='row' justifyContent='space-between' ml={'700px'}>

                    {/* <Button onClick={handleOpen} sx={{width:'150px',height:'50px'}}>Add New</Button> */}
                    <Button
                        href='/users/createUser'
                        style={{ background: '#5c0931', color: '#FFFFFF', width: '150px', height: '50px' }}
                    >Add New</Button></Stack></Stack>
                    <Stack><BasicTable/></Stack>
                
            </Stack>  
        </Layout>
    )
} 