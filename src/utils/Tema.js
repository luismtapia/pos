import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const modo = (mode) => {
    // mode: 'dark',
    //     mode: 'light',
    return mode;
}

const MiTema = createTheme({
    status: {
        danger: '#FF4842',
    },
    palette: {

        primary: {
            lighter: '#C8FACD',
            light: '#5BE584',
            main: '#00AB55',
            dark: '#007B55',
            darker: '#005249',
        },
        secondary: {
            lighter: '#D6CE4FF',
            light: '#84A9FF',
            main: '#3366FF',
            dark: '#1939B7',
            darker: '#091A7A',
        },
        info: {
            lighter: '#D0F2FF',
            light: '#74CAFF',
            main: '#1890FF',
            dark: '#0C53B7',
            darker: '#04297A',
        },
        success: {
            lighter: '#E9FCD4',
            light: '#AAF27F',
            main: '#54D62C',
            dark: '#229A16',
            darker: '#08660D',
        },
        warning: {
            lighter: '#FFF7CD',
            light: '#FFE16A',
            main: '#FFC107',
            dark: '#B78103',
            darker: '#7A4F01',
        },
        error: {
            lighter: '#FFE7D9',
            light: '#FFA48D',
            main: '#FF4842',
            dark: '#B72136',
            darker: '#7A0C2E',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
        gris: {
            100: '#F9FAFB',
            200: '#F4F6F8',
            300: '#DFE3E8',
            main: '#F9FAFB',
        }
    },
});

export default MiTema;