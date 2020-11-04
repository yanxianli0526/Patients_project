import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios"
import Dialog from '@material-ui/core/Dialog';
import Item from '../Item/Item'
import Order from '../order/Order'



const TodoList = () => {

  const useStyles = makeStyles((theme) => ({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

  const classes = useStyles();
  // id 病人名稱  orderID
  const [patients, setpatients] = useState([]);
  // id  病囑
  const [orders, setorders] = useState([]);

  const [orderid, setorderid] = useState('1');

  const [open, setOpen] = useState(false);



  const handleClickOpen = (e, i) => {
    orders.length = 0
    setorderid(i + 1)
    axios.get(`http://localhost:8080/api/todolist/orders/${i + 1}`, {
    })
      .then(response => {
        console.log(response)
        /*接到request data後要做的事情*/
        response.data.forEach((element) => {
          orders.push({
            Message: element.Message,
            Id: element.Id
          });
        });
        orders.push({
          Id: i + 1,
          Message: ""
        });
        setorders([...orders])
      }).then(() => {
        setOpen(true);
      })
      .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
      })
  };

  // function SimpleDialog(props) {
  //   const { onClose, open } = props;

  //   const handleClose2 = () => {
  //     console.log(props)
  //     onClose();
  //   };

  //   return (
  //     <Dialog onClose={handleClose2} aria-labelledby="simple-dialog-title" open={open}>
  //       {/* 目前包了這個 */}
  //       <Item orders2={orders} props2={props} orderid={orderid}></Item>
  //       {/* 目前包了這個 */}
  //     </Dialog>
  //   );
  // }


  useEffect(() => {
    axios.get('http://localhost:8080/api/todolist/patients', {
    })
      .then(({ data }) => {
        setpatients(data[0].patients)
      })
      .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
      })
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={4} md={2}>
          <Typography variant="h6" className={classes.title}>
            Patients List
          </Typography>
          <div className={classes.demo}>
            <List>
              {patients.map((title, i) =>
                <ListItem key={i}>
                  <ListItemText
                    primary={title.Name}
                  />
                  <IconButton onClick={(e) => handleClickOpen(e, i)}>
                    <EditIcon />
                  </IconButton>
                </ListItem>
              )}
            </List>
          </div>
          {/* <SimpleDialog open={open} onClose={handleClose} /> */}
          <Order onClose={() => setOpen(false)} open={open} orders2={orders} orderid={orderid} />
        </Grid>
        <Grid item xs={8} md={10}>
        </Grid>
      </Grid>
    </div>
  );

}

export default TodoList;
