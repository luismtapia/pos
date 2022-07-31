// import { makeStyles } from '@material-ui/core/styles';

import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

// export const useStyles = makeStyles(({ palette }) => ({
//     card: {
//         borderRadius: 12,
//         minWidth: 256,
//         textAlign: 'center',
//     },
//     avatar: {
//         width: 60,
//         height: 60,
//         margin: 'auto',
//     },
//     heading: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         letterSpacing: '0.5px',
//         marginTop: 8,
//         marginBottom: 0,
//     },
//     subheader: {
//         fontSize: 14,
//         color: palette.grey[500],
//         marginBottom: '0.875em',
//     },
//     statLabel: {
//         fontSize: 12,
//         color: palette.grey[500],
//         fontWeight: 500,
//         fontFamily:
//             '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//         margin: 0,
//     },
//     statValue: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 4,
//         letterSpacing: '1px',
//     },
// }));


export const ActiveBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#229A16',
        color: '#229A16',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export const InactiveBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#FF4842',
        color: '#FF4842',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));