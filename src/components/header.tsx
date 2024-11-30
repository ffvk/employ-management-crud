import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";

const Header: React.FC = () => {
  const employee = useSelector(
    (state: RootState) => state.employees.selectedEmployee
  );

  console.log("employee", employee);
  console.log("employee full name", employee?.fullName);

  return (
    <AppBar position="static">
      <Toolbar>
        {employee ? (
          <>
            <Avatar src={employee.image} alt={employee.fullName} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              {employee.fullName}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" sx={{ ml: 2 }}>
            Welcome Employee of Fortmindz
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
