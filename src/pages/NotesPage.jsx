import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const STORAGE_KEY = 'stock-analysis-notes';

const NotesPage = () => {
  const [notes, setNotes] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 localStorage에서 노트를 불러옵니다.
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleSave = () => {
    // localStorage에 현재 노트 내용을 저장합니다.
    localStorage.setItem(STORAGE_KEY, notes);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        투자 노트
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={15}
        variant="outlined"
        placeholder="여기에 투자 아이디어나 분석 내용을 자유롭게 기록하세요..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '100%',
            alignItems: 'flex-start',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        노트 저장
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          성공적으로 저장되었습니다!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotesPage;
