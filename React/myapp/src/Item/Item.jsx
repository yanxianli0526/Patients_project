import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios"
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import swal from 'sweetalert';


const Item = ({ orders2, onClose, orderid }) => {
    const [orders, setorders] = useState(orders2);

    //改值的時候
    const onChangeorder = (e, i) => {
        const items = [...orders];
        items[i] = { Message: e.target.value };
        setorders(items);

    }

    //新增order
    const insert_order = () => {
        const items = [...orders];
        items.push({ Message: "" });
        setorders([...items]);
    }

    //刪除order
    const delete_order = (e, i) => {
        const items = [...orders];
        items.splice(i, 1);
        setorders(items);
    }

    // 儲存
    const saveorder = () => {

        let order = [{ order: [] }];
        orders.forEach(data => {
            order[0].order.push({
                Id: orderid,
                Message: data.Message
            })
        })
        console.log(order[0].order)
        // 先刪除
        axios.delete(`http://127.0.0.1:8080/api/todolist/orders/id/${orderid}`, {
        })
            .then(() => {
            })
            .then(() => {
                // 再新增
                axios.post(`http://127.0.0.1:8080/api/todolist/orders`,
                    order[0].order,
                )
                    .then((res) => {
                        // console.log(res)
                        swal("儲存成功!", "醫囑已更新!", "success").then(() =>
                            onClose()
                        );
                    })
                    .catch(e => {
                        console.log(e);
                    })
            })
            .catch(e => {
                console.log(e);
            })
    }
    return (
        <div>
            <Toolbar>
                <Typography variant="h6" >
                    Order
                </Typography>
                <Button autoFocus color="inherit" onClick={insert_order}>
                    Insert
                </Button>
            </Toolbar>
            <List>
                {orders.map((order, i) => (
                    <ListItem key={i}>
                        <TextField label="Message"
                            value={order.Message} onChange={(e) => onChangeorder(e, i)} />
                        <IconButton onClick={(e) => delete_order(e, i)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <DialogActions>
                <Button autoFocus onClick={() => onClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={saveorder} color="primary">
                    Save
                </Button>
            </DialogActions>
        </div>
    );
}

export default Item;
