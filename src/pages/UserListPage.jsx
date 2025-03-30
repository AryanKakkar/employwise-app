import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  Typography,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Link,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { users } from "../services/api";
import logo from "../assets/logo.png";

const UserListPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await users.list(currentPage);
        setUsersList(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (userId) => {
    try {
      await users.delete(userId);
      setUsersList(usersList.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <>
      <CssBaseline />

      {/* Header */}
      <AppBar position="fixed" sx={{ boxShadow: "none" }}>
        <Toolbar
          sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}
        >
          <img
            src={logo}
            alt="Company Logo"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              color: "white",
              textAlign: "center",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Global Groupware Solutions Limited
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered User List */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          maxWidth: "800px",
          minHeight: "60vh",
          maxHeight: "90vh",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            overflowX: "auto", // Allow horizontal scroll if needed
            width: "100%",
            mb: 4,

            /* Custom Scrollbar */
            "&::-webkit-scrollbar": { height: "6px", width: "6px" }, // Thin scrollbar for both directions
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "10px",
            }, // Light track
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
              "&:hover": { background: "#555" }, // Darker on hover
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} avatar`}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => navigate(`/edit/${user.id}`)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Box>

      {/* Footer */}
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          boxShadow: "none",
          py: 1,
          background: "linear-gradient(135deg, #1A237E 0%, #1976D2 100%)",
        }}
      >
        <Toolbar>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "0.8rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box component="span" sx={{ mx: 1 }}>
              © {new Date().getFullYear()} Global Groupware Solutions Limited
            </Box>
            <Box component="span" sx={{ mx: 0.5 }}>
              •
            </Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Box component="span" sx={{ mx: 0.5 }}>
              •
            </Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default UserListPage;
