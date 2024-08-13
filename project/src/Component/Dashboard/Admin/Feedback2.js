import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Rating,
  Box,
  IconButton,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import './Feedback2.css';

const FeedbackReceiver = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/feedback')
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/feedback/${id}`)
      .then(() => {
        setFeedbacks(feedbacks.filter((f) => f.id !== id));
        setOpenDeleteDialog(false);
      })
      .catch((error) => {
        console.error('Error deleting feedback:', error);
      });
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedFeedbackId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedFeedbackId(null);
  };

  return (
    <Container component="main" maxWidth="md" className="feed1-container">
      <CssBaseline />
      <Typography variant="h4" component="h1" className="feed1-title">
        🌟 USER FEEDBACK
      </Typography>
      <Box className="feed1-grid">
        {feedbacks.map((feedback, index) =>
          feedback.name && feedback.email ? ( // Ensure feedback has necessary properties
            <Collapse in={true} timeout={500} key={index}>
              <Card className="feed1-card">
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar className="feed1-avatar">
                        {feedback.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" component="div" className="feed1-name">
                        {feedback.name}
                      </Typography>
                      <Typography variant="body2" className="feed1-email">
                        {feedback.email}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleOpenDeleteDialog(feedback.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" component="p" className="feed1-feedback">
                    {feedback.feedback || 'No feedback provided.'}
                  </Typography>
                  <Typography variant="body2" className="feed1-location">
                    <LocationOnIcon fontSize="small" /> {feedback.location || 'Unknown'}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={feedback.rating || 0}
                    readOnly
                    className="feed1-rating"
                  />
                </CardContent>
              </Card>
            </Collapse>
          ) : null
        )}
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{'Delete Feedback'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this feedback?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedFeedbackId)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FeedbackReceiver;
