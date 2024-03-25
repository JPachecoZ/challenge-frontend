"use client"

import { useState } from "react";
import { redirect } from "next/navigation";
import { useQuery, gql, useMutation } from '@apollo/client';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from "@mui/material";

import { useAuth } from "@/libs/auth";
import { User } from "@/models/user.model";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import UserDialog from '../components/UserDialog/index';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [deleteUser, {}] = useMutation(DELETE_USER, {refetchQueries: [{query: GET_USERS}]})
  let { user, handleUser } = useAuth();

  if (loading) return <p>Loading...</p>
  if (error) redirect('/login')
  
  const handleEditUser = (user: User) => {
    setUserToEdit(user)
  }

  const handleOpenEditUserDialog = (user: User) => {
    setUserToEdit(user)
    setOpen(true)
  }

  const handleDialogOpen = (open: boolean) => {
    setOpen(open)
  }

  const handleLogout = () => {
    handleUser(null);
    redirect('/login')
  }

  if(user){
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="text-4xl font-bold">Hello, {user.name}!</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.users.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell><EditIcon sx={{cursor: 'pointer'}} onClick={() => handleOpenEditUserDialog(user)} /></TableCell>
                      <TableCell><Delete sx={{cursor: 'pointer'}} onClick={e => {
                        e.preventDefault();
                        deleteUser({variables: {id: user.id}});
                      }}/></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <UserDialog user={userToEdit} open={open} onHandleEditUser={handleEditUser} onHandleDialogOpen={handleDialogOpen}/>
          <button onClick={handleLogout} className="button">Logout</button>
        </main>
    )
  }

  redirect('/login')
}
