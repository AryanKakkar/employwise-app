import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { users } from '../services/api';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await users.get(id);
        setUserData(data.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await users.update(id, userData);
      navigate('/users');
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Edit User</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            value={userData.first_name}
            onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={userData.last_name}
            onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Update User
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditUserPage;