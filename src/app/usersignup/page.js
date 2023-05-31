'use client'
import React from "react";
import { Container, Divider, Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { useEffect } from "react";
import { IMaskInput } from "react-imask";
import {IMask} from "react-imask";
import * as API from "../api/authenticate";
import { useRouter } from "next/navigation";

const momentFormat = 'YY/MM';
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="####"
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TextMaskCustom1 = React.forwardRef(function TextMaskCustom1(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={[
        { mask: "0000 0000 0000 0000" },
        { mask: "00000 00000 00000 0000" },
      ]}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
    />
  );
});

TextMaskCustom1.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TextMaskCustom2 = React.forwardRef(function TextMaskCustom2(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={Date}
      pattern={momentFormat}
      blocks={{
        MM: {
          mask: IMask.MaskedRange,
          from: 10,
          to: 120
        },
        YY: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 99
        },
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom2.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      companyAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      CreditCard: {
        name: "",
        cardNumber: "",
        cardType: "",
        securityCode: "",
        expiry: "",
        billingAddress: {
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
        },
      },
    },
  });
  const [confirmlink,setConfirmlink] = React.useState();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const CardType = [
    {
      value: "VI",
      label: "VI",
    },
    {
      value: "AX",
      label: "AX",
    },
    {
      value: "MC",
      label: "MC",
    },
    {
      value: "DI",
      label: "DI",
    },
  ];

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let router = useRouter();
  const routeChange = (temp,id) => {
    router.push(temp);
  };

  function alphaOnly(event) {
    var key = event.keyCode;
    return (key >= 65 && key <= 90) || key == 8;
  }

  function formatString(e) {
    var inputChar = String.fromCharCode(e.keyCode);
    var code = e.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    e.target.value = e.target.value
      .replace(
        /^([1-9]\/|[2-9])$/g,
        "0$1/" // 3 > 03/
      )
      .replace(
        /^(0[1-9]|1[0-2])$/g,
        "$1/" // 11 > 11/
      )
      .replace(
        /^([0-1])([3-9])$/g,
        "0$1/$2" // 13 > 01/3
      )
      .replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
        "$1/$2" // 141 > 01/41
      )
      .replace(
        /^([0]+)\/|[0]+$/g,
        "0" // 0/ > 0 and 00 > 0
      )
      .replace(
        /[^\d\/]|^[\/]*$/g,
        "" // To allow only digits and `/`
      )
      .replace(
        /\/\//g,
        "/" // Prevent entering more than 1 `/`
      );
  }

  const [values, setValues] = React.useState({
    numberformat: "1320",
    textmask: "(100) 000-0000",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (data) => {
    let str = data?.CreditCard?.cardNumber.replaceAll(' ','');
    data.CreditCard.cardNumber = str;

    API.onSignup(data)      
    .then((res) => {
      console.log("response is : ",res)
      if (res.status === 201) {
        console.log(res);
        let data1 = res.data.confirmURL.split("/")
        let id = data1[3];
        sessionStorage.setItem('id',id)
        routeChange(`/waiting`);
      }
    })
    .catch((err) =>
    console.log(err));
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#343a40" }}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Toolbar sx={{ backgroundColor: "#343a40" }} />
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: { xs: "column" },
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Divider />
            <Box
              component="form"
              onSubmit={handleSubmit(handleOnSubmit)}
              sx={{ mt: 1, width: "100%" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{
                      required: {
                        value: true,
                        message: "First name is required",
                      },
                      pattern: {
                        value: /^[A-Z]+[a-zA-Z]*$/,
                        message: "First letter should be uppercase",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.firstName}
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        // id="firstName"
                        label="First Name"
                        // name="firstName"
                        helperText={errors.firstName?.message}
                        // autoComplete="firstName"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{
                      required: {
                        value: true,
                        message: "Last name is required",
                      },
                      pattern: {
                        value: /^[A-Z]+[a-zA-Z]*$/,
                        message: "First letter should be uppercase",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.lastName}
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        // id="firstName"
                        label="Last Name"
                        // name="firstName"
                        helperText={errors.lastName?.message}
                        // autoComplete="firstName"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email is not valid",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.email}
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        // id="firstName"
                        label="Email"
                        // name="firstName"
                        helperText={errors.email?.message}
                        // autoComplete="firstName"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                        message:
                          "Requires atleast an 1 Uppercase,1 Lowercase and 1 Number and 1 Special character",
                      },
                      minLength: {
                        value: 8,
                        message: "Password should be atleast 8 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password should be less than 20 characters",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        error={!!errors.password}
                        fullWidth
                        size="small"
                        name="password"
                        label="Password"
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        helperText={errors.password?.message}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Controller
                    control={control}
                    name="companyName"
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Company Name"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Toolbar disableGutters>
                <h4>Company Address:-</h4>
              </Toolbar>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="companyAddress.street"
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Street"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="companyAddress.city"
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Only letters are accepted",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        error={!!errors.companyAddress?.city}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        helperText={errors.companyAddress?.city?.message}
                        label="City"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="companyAddress.state"
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Only letters are accepted",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        error={!!errors.companyAddress?.state}
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        helperText={errors.companyAddress?.state?.message}
                        label="State"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="companyAddress.country"
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Only letters are accepted",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        error={!!errors.companyAddress?.country}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        helperText={errors.companyAddress?.country?.message}
                        label="Country"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="companyAddress.postalCode"
                    onChange={handleChange}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Postal Code"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Toolbar disableGutters>
                <h4>Credit Card:-</h4>
              </Toolbar>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.name"
                    rules={{
                      pattern: /^[a-zA-Z ]*$/,
                      message: "Can only be letters",
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        error={!!errors.CreditCard?.name}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        helperText={
                          errors.CreditCard?.name ? "Can only be letters" : ""
                        }
                        label="Name"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.cardNumber"
                    onChange={handleChange}
                    rules={{
                      maxLength: {
                        value: 19,
                        message: "Card Number should be maximum 19 digits",
                      },
                      minLength: {
                        value: 14,
                        message: "Card number should be minimum 14 digits",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        error={!!errors.CreditCard?.cardNumber}
                        size="small"
                        helperText={errors.CreditCard?.cardNumber?.message}
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        InputProps={{
                          inputComponent: TextMaskCustom1,
                        }}
                        inputRef={field.ref}
                        label="Card Number"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.cardType"
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        select
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Card Type"
                      >
                        {CardType.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.securityCode"
                    onChange={handleChange}
                    rules={{
                      maxLength: {
                        value: 4,
                        message: "Max. 4 digits are allowed",
                      },
                      minLength: {
                        value: 3,
                        message: "Min. 3 digits are required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        error={!!errors.CreditCard?.securityCode}
                        size="small"
                        fullWidth
                        placeholder="CVV"
                        helperText={errors.CreditCard?.securityCode?.message}
                        value={field.value}
                        InputProps={{
                          inputComponent: TextMaskCustom,
                        }}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Security Code"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.expiry"
                    // rules={{
                    //   pattern: {
                    //     value: /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/,
                    //   },
                    // }}
                    render={({ field }) => (
                      <TextField
                        // onKeyUp={(e) => formatString(e)}
                        margin="dense"
                        size="small"
                        placeholder="MM/YYYY"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        InputProps={{
                          inputComponent: TextMaskCustom2,
                        }}
                        inputRef={field.ref}
                        label="Expiry Date"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Toolbar disableGutters>
                <h4>Billing Address :-</h4>
              </Toolbar>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.billingAddress.street"
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Street"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.billingAddress.city"
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Only letters are accepted",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        error={!!errors.CreditCard?.billingAddress?.city}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        helperText={
                          errors.CreditCard?.billingAddress?.city?.message
                        }
                        label="City"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.billingAddress.state"
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Only letters are accepted",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        error={!!errors.CreditCard?.billingAddress?.state}
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="State"
                        helperText={
                          errors.CreditCard?.billingAddress?.state?.message
                        }
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.billingAddress.country"
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Only letters are accepted",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        error={!!errors.CreditCard?.billingAddress?.country}
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Country"
                        helperText={
                          errors.CreditCard?.billingAddress?.country?.message
                        }
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Controller
                    control={control}
                    name="CreditCard.billingAddress.postalCode"
                    onChange={handleChange}
                    render={({ field }) => (
                      <TextField
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        label="Postal Code"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Toolbar sx={{ backgroundColor: "#343a40" }} />
      {/* <Copyright sx={{ p: 2 }} /> */}
    </>
  );
};

export default Register;
