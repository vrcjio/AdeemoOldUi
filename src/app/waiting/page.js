"use client"

import React, { useEffect } from "react";
import { Box, Button, Container, Grid, } from "@mui/material";
import { useRouter } from "next/navigation";

import { ThemeProvider } from "@mui/material";
import { themes } from "../layout/themes";
import Image from "next/image";
import Link from "next/link";
import Page404 from "../not-found";



const Waiting = () => {
  let router = useRouter();
  let id = sessionStorage.getItem('id');

  const routeChange = () => {
    let path = "/";
    router.push(path);
  };
  return (
    <>
      { (id===null) ? <Page404/> :
        <>
          <ThemeProvider theme={themes}>
            <Container sx={{ height: "100vh", width: "100vw" }}>
              <Box
                justifyContent="center"
                alignItems="center"
                sx={{ display: "flex", height: "100vh", flexDirection: "column" }}
              >
                <Grid>
                </Grid>
                <Grid>
                  {/* <h1>Thanks for signup. Please check your email.</h1> */}
                  <h1>Do not refresh page</h1>
                  <h1>Please Confirm by clicking here.</h1>
                  <Link href={`/signup/confirm/${id}`}>Confirme Link</Link>
                </Grid>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      }
    </>
  );
};

export default Waiting