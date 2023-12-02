import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SignIn from './SignIn';
import CsvViewer from './CsvViewer';

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignInClick = () => {
    setIsSignInOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  const handleSignInSuccess = () => {
    // Set the user as signed in
    setIsSignedIn(true);
    // Close the sign-in dialog
    setIsSignInOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Demo app
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
          {isSignedIn ? (
            <CsvViewer />
          ) : (
            <Button color="inherit" onClick={handleSignInClick}>
              SignIn
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {isSignInOpen && <SignIn onClose={handleSignInClose} onSuccess={handleSignInSuccess} />}
    </div>
  );
};

export default Header;
