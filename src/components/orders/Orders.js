import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import Order from './order/Order';
import { SubNav, Header } from '../index';
import { useStateValue } from '../../contextAPI/StateProvider';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          ),
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <>
      <Header />
      <SubNav />
      <div className='orders'>
        <h1>Your Orders</h1>
        <div className='orders__ocontainer'>
          {orders?.map((order) => (
            <Order order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
