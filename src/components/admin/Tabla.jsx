import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

import { Box, Table, TableBody, TableCell, Switch, FormControlLabel, Tooltip, IconButton, Checkbox, Paper, Typography, Toolbar, TableSortLabel, TableRow, TablePagination, TableHead, TableContainer, Chip } from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon, Delete as DeleteIcon, Edit as EditIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';

function comparadorDescendente(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) { return -1; }
    if (b[orderBy] > a[orderBy]) { return 1; }
    return 0;
}

function getComparador(order, orderBy) {
    return order === 'desc'
        ? (a, b) => comparadorDescendente(a, b, orderBy)
        : (a, b) => -comparadorDescendente(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparador) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparador(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// Encabezado de la tabla
function TablaHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columnas } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all',
                        }}
                    />
                </TableCell>
                {columnas.map((encabezado) => (
                    <TableCell
                        key={encabezado.id}
                        align={encabezado.numeric ? 'right' : 'left'}
                        padding={encabezado.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === encabezado.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === encabezado.id}
                            direction={orderBy === encabezado.id ? order : 'asc'}
                            onClick={createSortHandler(encabezado.id)}
                        >
                            {encabezado.label}
                            {orderBy === encabezado.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

TablaHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columnas: PropTypes.array.isRequired
};


// acciones
const obtenerDatos = async (URL, id) => {
    const opciones = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(`${URL}/${id}`, opciones);
    const datos = await response.json();
    return datos;
}

const TablaToolbar = (props) => {
    const { numSelected, titulo, idSeleccionado, seleccionado, URL, handleClickOpenDialogoEditar, setID } = props;

    const handleClickActionDelete = () => {
        alert(`Eliminar ${numSelected} ${titulo} ? ${seleccionado}`);

    }
    const handleClickActionEdit = async () => {
        handleClickOpenDialogoEditar();
        setID(idSeleccionado);


        //const datosViejos = await obtenerDatos(URL, idSeleccionado[0]);

        //console.log(datosViejos);

    }

    return (
        <Toolbar sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} {titulo} seleccionados
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {titulo}
                </Typography>
            )}

            {numSelected === 1 ? (
                <Tooltip title="Editar">
                    <IconButton onClick={handleClickActionEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected > 0 ? (
                <Tooltip title="Eliminar">
                    <IconButton onClick={handleClickActionDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filtro">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

TablaToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
};

export default function Tabla(props) {
    const { titulo, columnas, filas, URL, handleClickOpenDialogoEditar, setID } = props;

    const [idSeleccionado, setIdSeleccionado] = useState([]);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('nombre');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = filas.map((n) => n.nombre);
            setSelected(newSelecteds);
            const nuevosIdsSelecionados = filas.map((n) => n._id);
            setIdSeleccionado(nuevosIdsSelecionados);
            return;
        }
        setSelected([]);
        setIdSeleccionado([]);
    };

    const handleClick = (event, name, id) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        let newIdSeleccionado = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
            newIdSeleccionado = newIdSeleccionado.concat(idSeleccionado, id); //error
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newIdSeleccionado = newIdSeleccionado.concat(idSeleccionado.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newIdSeleccionado = newIdSeleccionado.concat(idSeleccionado.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            newIdSeleccionado = newIdSeleccionado.concat(
                idSeleccionado.slice(0, selectedIndex),
                idSeleccionado.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        setIdSeleccionado(newIdSeleccionado);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // evita a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filas.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TablaToolbar numSelected={selected.length} titulo={titulo}
                    idSeleccionado={idSeleccionado} seleccionado={selected}
                    URL={URL}
                    handleClickOpenDialogoEditar={handleClickOpenDialogoEditar}
                    setID={setID}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <TablaHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={filas.length}
                            columnas={columnas}
                        />
                        <TableBody>
                            {
                                stableSort(filas, getComparador(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((fila, index) => {
                                        const isItemSelected = isSelected(fila.nombre); //podemos cambiar a id

                                        //setIdSeleccionado(fila._id);
                                        const labelId = `id-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, fila.nombre, fila._id)} //podemos cambiar a id
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={fila._id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                {columnas.map((columna) => {

                                                    const Renderizado = () => {
                                                        let codigo = '';
                                                        if (fila[columna.id] === true) {
                                                            codigo = <CheckIcon />;
                                                        } else if (fila[columna.id] === false) {
                                                            codigo = <CloseIcon />;
                                                        } else {
                                                            codigo = < >{fila[columna.id]}</>;

                                                        }
                                                        return codigo;
                                                    }
                                                    return (
                                                        (typeof (fila[columna.id]) === 'number') ?
                                                            <TableCell component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                                align='right'>{fila[columna.id]}</TableCell>
                                                            :
                                                            <TableCell >
                                                                {
                                                                    <Renderizado />
                                                                }
                                                            </TableCell>
                                                    )

                                                })}
                                            </TableRow>
                                        );
                                    }) // fin map
                            }
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
