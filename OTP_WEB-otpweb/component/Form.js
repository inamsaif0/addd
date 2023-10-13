import { Card, Stack, Typography } from '@mui/material'
import Layout from '../Layout'
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function Form() {
    return (
        <Stack flexDirection={'column'} alignItems='center' justifyContent='center' gap='2rem'>
            <Card>
                <CardContent>
                    <Typography>Name</Typography>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                    />
                    <TextField
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                    />
                    <TextField
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                    />

                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Stack>

    )
}