import React, {useState} from "react";
import {FormHelperText, TextField, Tooltip} from "@material-ui/core";
import {useMutation} from "@apollo/client";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {LOGIN, LOGOUT} from "./mutations";


export const Logout = ({setAuthenticated}) => {
  const [logoutMutation] = useMutation(LOGOUT);
  const logout = () => {
    logoutMutation()
      .then(() => setAuthenticated(false))
      .catch((e) => console.error(e));
  };
  return (
    <Tooltip title="Log out" placement='bottom-start'>
      <span id='logout-span'>
        <ExitToAppIcon id='logout' onClick={logout}/>
      </span>
    </Tooltip>
  )

};


export const Login = ({setAuthenticated}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginMutation] = useMutation(LOGIN);

  const onSubmit = e => {
    e.preventDefault();
    loginMutation({variables: {password: password}})
      .then(() => setAuthenticated(true))
      .catch(() => setError('Incorrect password'));
  };

  return (
    <form id="password">
      <FormHelperText error={true} className='py-2'>{error || ' '}</FormHelperText>
      <TextField
        id='passcode-input'
        label="Passcode"
        variant="outlined"
        placeholder='Enter passcode'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyPress={e => e.key == 'Enter' && onSubmit(e)}
      />
    </form>
  );
};


