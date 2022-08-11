import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { getToken, opcionesGET } from '../../utils/configuracion';

import usePage from '../../hooks/usePage';
import { getData } from '../../utils/Librerias';

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog(props) {
    const { endpoint } = usePage();
    const { datos, setDatos } = props;
    const { criterioBusqueda, setCriterioBusqueda } = props;



    const [open, toggleOpen] = React.useState(false);


    const handleClose = () => {
        setDialogValue({
            nombre: '',
            year: '',
        });

        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        nombre: '',
        year: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setCriterioBusqueda({
            nombre: dialogValue.nombre,
            year: parseInt(dialogValue.year, 10),
        });

        handleClose();
    };

    // no sirve mientras escribo buscar en pageproducto
    React.useEffect(() => {
        let active = true;
        console.log('entro');
        (async () => {
            const Authorization = getToken();
            const endpointBuscar = `${endpoint}/buscar/${criterioBusqueda}`;
            const datos = await getData(endpointBuscar, opcionesGET(Authorization));

            if (active) {
                setDatos([...datos]);
            }
        })();

        return () => {
            active = false;
        };
    }, [criterioBusqueda]);

    return (
        <React.Fragment>
            <Autocomplete
                value={criterioBusqueda}
                onChange={(event, newValue) => {

                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.

                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                nombre: newValue,
                                year: '',
                            });
                            setCriterioBusqueda(newValue);
                        });
                    } else if (newValue && newValue.inputValue) {
                        setCriterioBusqueda(newValue.inputValue);
                        toggleOpen(true);
                        setDialogValue({
                            nombre: newValue.inputValue,
                            year: '',
                        });
                    } else {
                        setCriterioBusqueda(newValue);
                    }
                }}

                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            nombre: `Crear "${params.inputValue}"`,
                        });
                        setCriterioBusqueda(params.inputValue);
                    }

                    return filtered;
                }}
                id="autocomplete-creable"
                options={datos}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.nombre;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.nombre}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Buscar Producto" />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new film</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any film in our list? Please, add it!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.nombre}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    nombre: event.target.value,
                                })
                            }
                            label="nombre"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.year}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    year: event.target.value,
                                })
                            }
                            label="year"
                            type="number"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { nombre: 'The Shawshank Redemption', year: 1994 },
    { nombre: 'The Godfather', year: 1972 },
    { nombre: 'The Godfather: Part II', year: 1974 },
    { nombre: 'The Dark Knight', year: 2008 },
    { nombre: '12 Angry Men', year: 1957 },
    { nombre: "Schindler's List", year: 1993 },
    { nombre: 'Pulp Fiction', year: 1994 },
    {
        nombre: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { nombre: 'The Good, the Bad and the Ugly', year: 1966 },
    { nombre: 'Fight Club', year: 1999 },
    {
        nombre: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        nombre: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { nombre: 'Forrest Gump', year: 1994 },
    { nombre: 'Inception', year: 2010 },
    {
        nombre: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { nombre: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { nombre: 'Goodfellas', year: 1990 },
    { nombre: 'The Matrix', year: 1999 },
    { nombre: 'Seven Samurai', year: 1954 },
    {
        nombre: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { nombre: 'City of God', year: 2002 },
    { nombre: 'Se7en', year: 1995 },
    { nombre: 'The Silence of the Lambs', year: 1991 },
    { nombre: "It's a Wonderful Life", year: 1946 },
    { nombre: 'Life Is Beautiful', year: 1997 },
    { nombre: 'The Usual Suspects', year: 1995 },
    { nombre: 'Léon: The Professional', year: 1994 },
    { nombre: 'Spirited Away', year: 2001 },
    { nombre: 'Saving Private Ryan', year: 1998 },
    { nombre: 'Once Upon a Time in the West', year: 1968 },
    { nombre: 'American History X', year: 1998 },
    { nombre: 'Interstellar', year: 2014 },
    { nombre: 'Casablanca', year: 1942 },
    { nombre: 'City Lights', year: 1931 },
    { nombre: 'Psycho', year: 1960 },
    { nombre: 'The Green Mile', year: 1999 },
    { nombre: 'The Intouchables', year: 2011 },
    { nombre: 'Modern Times', year: 1936 },
    { nombre: 'Raiders of the Lost Ark', year: 1981 },
    { nombre: 'Rear Window', year: 1954 },
    { nombre: 'The Pianist', year: 2002 },
    { nombre: 'The Departed', year: 2006 },
    { nombre: 'Terminator 2: Judgment Day', year: 1991 },
    { nombre: 'Back to the Future', year: 1985 },
    { nombre: 'Whiplash', year: 2014 },
    { nombre: 'Gladiator', year: 2000 },
    { nombre: 'Memento', year: 2000 },
    { nombre: 'The Prestige', year: 2006 },
    { nombre: 'The Lion King', year: 1994 },
    { nombre: 'Apocalypse Now', year: 1979 },
    { nombre: 'Alien', year: 1979 },
    { nombre: 'Sunset Boulevard', year: 1950 },
    {
        nombre: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { nombre: 'The Great Dictator', year: 1940 },
    { nombre: 'Cinema Paradiso', year: 1988 },
    { nombre: 'The Lives of Others', year: 2006 },
    { nombre: 'Grave of the Fireflies', year: 1988 },
    { nombre: 'Paths of Glory', year: 1957 },
    { nombre: 'Django Unchained', year: 2012 },
    { nombre: 'The Shining', year: 1980 },
    { nombre: 'WALL·E', year: 2008 },
    { nombre: 'American Beauty', year: 1999 },
    { nombre: 'The Dark Knight Rises', year: 2012 },
    { nombre: 'Princess Mononoke', year: 1997 },
    { nombre: 'Aliens', year: 1986 },
    { nombre: 'Oldboy', year: 2003 },
    { nombre: 'Once Upon a Time in America', year: 1984 },
    { nombre: 'Witness for the Prosecution', year: 1957 },
    { nombre: 'Das Boot', year: 1981 },
    { nombre: 'Citizen Kane', year: 1941 },
    { nombre: 'North by Northwest', year: 1959 },
    { nombre: 'Vertigo', year: 1958 },
    {
        nombre: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { nombre: 'Reservoir Dogs', year: 1992 },
    { nombre: 'Braveheart', year: 1995 },
    { nombre: 'M', year: 1931 },
    { nombre: 'Requiem for a Dream', year: 2000 },
    { nombre: 'Amélie', year: 2001 },
    { nombre: 'A Clockwork Orange', year: 1971 },
    { nombre: 'Like Stars on Earth', year: 2007 },
    { nombre: 'Taxi Driver', year: 1976 },
    { nombre: 'Lawrence of Arabia', year: 1962 },
    { nombre: 'Double Indemnity', year: 1944 },
    {
        nombre: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { nombre: 'Amadeus', year: 1984 },
    { nombre: 'To Kill a Mockingbird', year: 1962 },
    { nombre: 'Toy Story 3', year: 2010 },
    { nombre: 'Logan', year: 2017 },
    { nombre: 'Full Metal Jacket', year: 1987 },
    { nombre: 'Dangal', year: 2016 },
    { nombre: 'The Sting', year: 1973 },
    { nombre: '2001: A Space Odyssey', year: 1968 },
    { nombre: "Singin' in the Rain", year: 1952 },
    { nombre: 'Toy Story', year: 1995 },
    { nombre: 'Bicycle Thieves', year: 1948 },
    { nombre: 'The Kid', year: 1921 },
    { nombre: 'Inglourious Basterds', year: 2009 },
    { nombre: 'Snatch', year: 2000 },
    { nombre: '3 Idiots', year: 2009 },
    { nombre: 'Monty Python and the Holy Grail', year: 1975 },
];
