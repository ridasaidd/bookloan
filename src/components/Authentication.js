import * as React from 'react';
import PropTypes from 'prop-types';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { UsersService } from '../service/users_service';

const service = new UsersService();

export default function AuthenticationContent () {
    React.useEffect(() => {
        return async () => {
            let users = await service.getUsers();
            console.log(users);
        }
    })
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <AuthenticationComponent handleClickOpen={ handleClickOpen } isLoggedIn={ isLoggedIn } />
            <AuthenticationDialog isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } open={open} onClose={handleClose} />
        </React.Fragment>
    )
}

function AuthenticationDialog (props) {
    const { onClose, open } = props;

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClose = () => {
        setUsername("");
        setPassword("");
        onClose();
    };

    function handleUsernameChange (event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    async function handleLogin () {
        try {
            const result = await service.authenticate(username, password);
            if (result.length > 0) {
                let res = await service.updateUserById(result[0].id, {
                    isLoggedIn: true
                });
                console.log('user found', res);
            } else {
                console.log('user not found!');
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
            <TextField autoFocus margin="dense" id="dialogInputUsername" label="Username" type="text" fullWidth variant="standard" value={ username } onChange={ handleUsernameChange } />
            <TextField margin='dense' id="dialogInputPassword" label="Password" type="password" fullWidth variant="standard" value={ password } onChange={ handlePasswordChange } />
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleClose }>Cancel</Button>
            <Button onClick={ handleLogin }>Sign in</Button>
        </DialogActions>
        </Dialog>
    );
}

AuthenticationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

function AuthenticationComponent (props) {
    return (
        <IconButton color="inherit" onClick={props.handleClickOpen}>
            <AccountCircle />
        </IconButton>
    )
}