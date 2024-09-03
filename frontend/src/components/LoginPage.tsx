import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Box } from '@mui/material';
const LoginPage = () => {
    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#222',
            }}
        >
            <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/convert"
                    style={{ fontSize: '24px', padding: '20px 40px' }}
                >
                    Login
                </Button>
            </Box>
        </Container>
    )
}

export default LoginPage