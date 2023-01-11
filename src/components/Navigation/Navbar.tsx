import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Center,
  Navbar as MantineNavbar,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
} from '@mantine/core';

import { logout } from '@stores/userStore';

import {
  IconBriefcase,
  IconInbox,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconUsers,
  TablerIcon,
} from '@tabler/icons';
import Cookies from 'js-cookie';

const useStyles = createStyles(theme => ({
  wrapper: {
    top: 0,
    height: '100vh',
  },
  link: {
    'width': 50,
    'height': 50,
    'borderRadius': theme.radius.md,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'color': theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  link?: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, link, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  if (onClick) {
    return (
      <Tooltip label={label} position="right" transitionDuration={0}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}>
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <Link to={link as string}>
        <UnstyledButton className={cx(classes.link, { [classes.active]: active })}>
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const items = [
  { icon: IconLayoutDashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: IconUsers, label: 'Candidates', link: '/candidates' },
  { icon: IconBriefcase, label: 'Jobs', link: '/jobs' },
  { icon: IconInbox, label: 'Mailbox', link: '/mail' },
];

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyles();

  const links = items.map(link => (
    <NavbarLink
      {...link}
      key={link.label}
      active={location.pathname.startsWith(link.link)}
      link={link.link}
    />
  ));

  return (
    <MantineNavbar className={classes.wrapper} width={{ base: 80 }} pb="sm" px="md" pt={16}>
      <Center>
        <Link to="/">
          <img width={50} src="/recr.svg" alt="logo" />
        </Link>
      </Center>
      <MantineNavbar.Section grow mt={26}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconLogout}
            onClick={() => {
              Cookies.remove('accessToken');
              dispatch(logout());
              navigate('/login');
            }}
            label="Log out"
          />
          <NavbarLink icon={IconSettings} link="workspace-settings" label="Workspace Settings" />
        </Stack>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
