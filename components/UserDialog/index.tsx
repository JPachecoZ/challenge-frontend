'use client';

import { useMutation } from "@apollo/client";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { BaseSyntheticEvent } from "react";

import { User } from "@/models/user.model";
import { CREATE_USER, EDIT_USER } from "@/libs/graphql/mutations";
import { GET_USERS } from "@/libs/graphql/queries";

export default function UserDialog({open, onHandleDialogOpen, onHandleEditUser, user, dialogType}: {open: boolean, dialogType: 'Edit' | 'Create', onHandleEditUser: (user: User) => void, onHandleDialogOpen: (open: boolean) => void, user: User | null}){
    const [updateUser, {}] = useMutation(EDIT_USER, {refetchQueries: [{query: GET_USERS}]})
    const [createUser, {}] = useMutation(CREATE_USER, {refetchQueries: [{query: GET_USERS}]})

    const handleClose = () => {
        onHandleDialogOpen(false);
    }

    const handleSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        if (!user){
          handleClose()
          return  
        }
        if (dialogType === 'Create') createUser({variables: {name: user.name, email: user.email}})
        if (dialogType === 'Edit') updateUser({variables: {id: user.id, name: user.name, email: user.email}})
        handleClose()
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