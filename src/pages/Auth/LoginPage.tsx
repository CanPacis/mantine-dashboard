import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { login } from '@stores/userStore';

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(
      login({
        id: '3',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=3',
        accessToken: '123',
        refreshToken: '123',
      })
    );
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Box sx={{ width: 420 }}>
        <Title
          align="center"
          sx={theme => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Link to="/signup">
            <Anchor component="span" size="sm">
              Create account
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Link to="/forgot-password">
              <Anchor component="span" size="sm">
                Forgot password?
              </Anchor>
            </Link>
          </Group>
          <Button onClick={handleLogin} fullWidth mt="xl">
            Login
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
