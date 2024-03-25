import { useMutation, gql } from '@apollo/client';
import Delete from "@mui/icons-material/Delete";

import { User } from "@/models/user.model";

function DeleteUserIcon({user}: {user: User}) {
  
  const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
      deleteUser(id: $id) {
        id
      }
    }
  `

  const [deleteUser, {}] = useMutation(DELETE_USER)

  return (
    <Delete sx={{cursor: 'pointer'}} onClick= {e => {
        e.preventDefault();
        deleteUser({variables: {id: user.id}});
    }}/>
  );
}

export default DeleteUserIcon;
