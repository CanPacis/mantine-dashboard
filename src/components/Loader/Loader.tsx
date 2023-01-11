import { Box, Loader as MantineLoader } from '@mantine/core';

export interface LoaderProps {
  display?: 'grow' | 'fill' | 'inline';
  inverted?: boolean;
}

export function Loader(props: LoaderProps) {
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
      })}>
      <MantineLoader variant="bars" />
    </Box>
  );
}
