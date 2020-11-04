
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Item from '../Item/Item'

const Order = ({ open, onClose, orders2, orderid }) => {

    return (
        // <div></div>
        <Dialog onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={open}>
            {/* 目前包了這個 */}
            <Item orders2={orders2}  orderid={orderid} onClose={onClose}></Item>
            {/* 目前包了這個 */}
        </Dialog>
    );
}

export default Order;
