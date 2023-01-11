import * as React from 'react';

import {
  ActionIcon,
  Box,
  Group,
  Header as MantineHeader,
  createStyles,
  useMantineColorScheme,
} from '@mantine/core';

import { IconMoonStars, IconSun } from '@tabler/icons';

const useStyles = createStyles(theme => ({
  wrapper: {
    left: 'var(--mantine-navbar-width)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: theme.spacing.md,
    flex: 1,
  },
}));

export function Header() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader className={classes.wrapper} height={60} p="xs">
      <Box className={classes.headerGroup}>
        <Group position="right" my="xl">
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            })}>
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Box>
    </MantineHeader>
  );
}
