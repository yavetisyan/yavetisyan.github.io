import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import {doc, deleteDoc, collection, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()});
        });
        setUsers(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub()
    }
  }, [])
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      // setUsers(users.filter((item) => item.uid !== id))

    } catch (e) {
      console.log('users data - ', e)
    }
  }

  console.log(users)

  return (
    <TableContainer component={Paper} sx={{mt: 4, mb: 5}}>
      <Table sx={{minWidth: 450}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Delete User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row) => (
            <TableRow
              key={row.regEmail}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {`${row.firstName} ${row.lastName}`}
              </TableCell>
              <TableCell align="right">{row.regEmail}</TableCell>
              <TableCell align="right">
                <Button variant={"contained"} onClick={() => handleDelete(row.regEmail)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );


};

export default Users;


