import { Box, Text, Title, useMantineTheme } from '@mantine/core';

export interface ErrorViewProps {
  display?: 'grow' | 'fill' | 'inline';
  inverted?: boolean;
  title?: string;
  message?: string;
}

export function ErrorView(props: ErrorViewProps) {
  const theme = useMantineTheme();
  let sx = {};

  if (props.display === 'fill') {
    sx = { width: '100vw', height: '100vh' };
  } else if (props.display === 'grow') {
    sx = { width: '100%', height: '100%' };
  }

  return (
    <Box
      sx={theme => ({
        ...sx,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        flexDirection: 'column',
        gap: theme.spacing.md,
      })}>
      <Title color={theme.primaryColor} order={1}>
        {props.title}
      </Title>
      <Text color={theme.colorScheme === 'dark' ? 'white' : 'gray'}>{props.message}</Text>
    </Box>
  );
}
