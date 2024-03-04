
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = React.useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAboutUsClick = () => {
    setIsAboutUsModalOpen(true);
    handleMenuClose();
  };

  const handleAboutUsModalClose = () => {
    setIsAboutUsModalOpen(false);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#adff2f", height: "70px" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontSize: "40px",
              color: "#000000",
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: '24px', sm: '32px', md: '40px', lg: '48px', xl: '56px' },
            }}
          >
            RESUME ANALYZER
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {/* <MenuItem onClick={handleMenuClose}>Contact us</MenuItem> */}
        <MenuItem onClick={handleAboutUsClick}>About us</MenuItem>
      </Menu>

      {/* About Us Modal */}
      <Modal open={isAboutUsModalOpen} onClose={handleAboutUsModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" sx={{ lineHeight: 1.6, fontSize: '24px' }}>
            About Us
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '18px' }}>
          Welcome to the Resume Analyzer app, your personalized tool for optimizing resumes tailored to specific job descriptions! Powered by OpenAI, our platform empowers users to fine-tune their resumes for targeted job applications.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
