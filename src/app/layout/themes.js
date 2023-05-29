import { createTheme } from "@mui/material/styles";

export const themes = createTheme({
  palette: {
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
  },
  components: {
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
        },
      },
    },
    MuiTableCell:{
        styleOverrides:{
            head:{
                color: "#ffffff",
            },
            root:{
                textAlign: 'center',
            }

        }
    },
    MuiDataTable:{
        styleOverrides:{
            paper:{
                border:'1px'
            }
        }
    },
    MuiDrawer:{
        styleOverrides:{
            paper:{
                backgroundColor: "#212529",
                color:"#343a40"
            }
        }
    },
    MuiAppBar:{
        styleOverrides:{
            root:{
                backgroundColor: "#ffffff",
            }
        }
    },
    MUIDataTableToolbar :{
      styleOverrides:{
        actions:{
          display: 'none',
        }
      }
    }
  },
});
