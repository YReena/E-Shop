import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';



const order = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

 

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(myOrders());
      }, [dispatch, alert, error]);
        return (
            <Fragment>
              <MetaData title={`${user.name} - Orders`} />
        
              {loading ? (
                <Loader />
              ) : (
                <>
                 <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                 <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell align="right">Order Id</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Amount&nbsp;($)</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders && orders.map((item, idx) => (
                    <TableRow key={row.idx}>
                        <TableCell align="right">{item._id}</TableCell>
                        <TableCell align="right">{item.orderItems.length}</TableCell>
                        <TableCell align="right">{item.totalPrice}</TableCell>
                        <TableCell align="right">{item.orderStatus}</TableCell>
                        <TableCell align="right"><Box>
                            Edit
                        </Box></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
                </>
                 
                
              )}
            </Fragment>
          );
        };
export default order;