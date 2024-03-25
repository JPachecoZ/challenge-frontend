import { User } from "@/models/user.model";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

const EDIT_USER = gql`
    mutation updateUser($id: ID!, $name: String, $email: String!) {
      updateUser(id: $id, name: $name, email: $email) {
        id
        name
        email
      }
    }
  `

const CREATE_USER = gql`
    mutation createUser($name: String, $email: String!) {
      createUser(name: $name, email: $email) {
        name
        email
      }
    }
  `

export default function UserDialog({open, onHandleDialogOpen, onHandleEditUser, user}: {open: boolean, onHandleEditUser: (user: User) => void, onHandleDialogOpen: (open: boolean) => void, user: User | null}){
    const [dialogType, _setDialogType] = useState( user? 'Edit': 'Create')

    const [updateUser, {}] = useMutation(EDIT_USER)
    const [createUser, {}] = useMutation(CREATE_USER)

    const handleClose = () => {
        onHandleDialogOpen(false);
    }

    const handleSubmit = () => {
        if (user){
            if (dialogType === 'Create') createUser({variables: {name: user.name, email: user.email}})
            if (dialogType === 'Edit') updateUser({variables: {id: user.id, name: user.name, email: user.email}})
        }
        onHandleDialogOpen(false);
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogType}</DialogTitle>
                <DialogContent>
                    <Box className="flex flex-col" component="form" onSubmit={handleSubmit} sx={{'& .MuiTextField-root': {m:1, width: '25ch'}}} noValidate autoComplete="off">
                        <TextField label="Name" value={user?.name} onChange={(event) => onHandleEditUser({...user, name: event.target.value} as User)}/>
                        <TextField label="Email" value={user?.email} onChange={(event) => onHandleEditUser({...user, email: event.target.value} as User)}/>
                        <Button type="submit" variant="contained">Save</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )    
}