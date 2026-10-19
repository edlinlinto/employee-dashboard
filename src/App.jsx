import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress
} from '@mui/material';
import { Dashboard as DashboardIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
        {/* Navbar with Home and Employee Form links */}
        <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Employee Management Portal
            </Typography>
            <Button color="inherit" component={Link} to="/" startIcon={<DashboardIcon />}>
              Dashboard / Home
            </Button>
            <Button color="inherit" component={Link} to="/form" startIcon={<PersonAddIcon />}>
              Employee Form
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<EmployeeForm />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Employee Dashboard (API Data)[span_5](start_span)[span_5](end_span)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID[span_6](start_span)[span_6](end_span)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name[span_7](start_span)[span_7](end_span)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email[span_8](start_span)[span_8](end_span)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

function EmployeeForm() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Employee Added Successfully!\nName: ${name}\nDesignation: ${designation}\nLocation: ${location}\nSalary: ${salary}`);
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Employee Form[span_9](start_span)[span_9](end_span)
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Name[span_10](start_span)[span_10](end_span)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Designation[span_11](start_span)[span_11](end_span)"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Location[span_12](start_span)[span_12](end_span)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            type="number"
            label="Salary[span_13](start_span)[span_13](end_span)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth size="large">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}