import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">Modify</Button>
    </Stack>
  );
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'Authenticate',
    headerName: 'Authenticate',
    width: 150,
    editable: true,
  }
];

export default function DataGridDemo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.109.206.134:3000/api/rows');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once on component mount

  return (
   <>
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={15}
        checkboxSelection
        disableRowSelectionOnClick
      />

    </Box>
    <BasicButtons />

    </>
  );
}