import * as React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Box, createStyles } from '@mantine/core';

import {
  IconCalendar,
  IconCalendarEvent,
  IconChecklist,
  IconRadar,
  IconWaveSawTool,
} from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon: string = getRef('icon');

  return {
    wrapper: {
      display: 'flex',
      height: '100%',
    },
    leftPane: {
      padding: theme.spacing.xs,
      width: 260,
      height: '100%',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    },

    link: {
      ...theme.fn.focusStyles(),
      'display': 'flex',
      'alignItems': 'center',
      'textDecoration': 'none',
      'fontSize': theme.fontSizes.sm,
      'color': theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      'padding': `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      'borderRadius': theme.radius.md,
      'fontWeight': 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },
  };
});

const options = [
  { link: '/dashboard/overview', label: 'Overview', icon: IconRadar },
  { link: '/dashboard/calendar', label: 'Calendar', icon: IconCalendar },
  { link: '/dashboard/events', label: 'Events', icon: IconCalendarEvent },
  { link: '/dashboard/evaluations', label: 'Evaluations', icon: IconWaveSawTool },
  { link: '/dashboard/tasks', label: 'Tasks', icon: IconChecklist },
];

function LeftPane() {
  const { classes, cx } = useStyles();
  const location = useLocation();

  const links = options.map(item => (
    <Link key={item.label} to={item.link}>
      <span className={cx(classes.link, { [classes.linkActive]: location.pathname === item.link })}>
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </span>
    </Link>
  ));

  return <div className={classes.leftPane}>{links}</div>;
}

export function DashboardPage() {
  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate(options[0].link);
    }
  }, [location.pathname, navigate]);

  return (
    <Box className={classes.wrapper}>
      <LeftPane />
      <Box p="md" sx={{ width: '100%', height: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
