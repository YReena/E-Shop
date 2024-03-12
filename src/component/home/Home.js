import React, { useEffect } from 'react';
import { Button, Container, Toolbar } from '@mui/material';
import { CgMouse } from "react-icons/cg";
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useRef } from 'react';

import './home.css';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Product/ProductCard';

const Home = () => {
    const alert = useAlert();
    const scrollef = useRef();
    const dispatch = useDispatch();
    const { products, error, isloading } = useSelector(state => state.products);
    
    function scroll() {
        scrollef.current.scrollIntoView({behavior: 'smooth'});
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        dispatch(getProduct());
    }, [dispatch], error)
    return (<>
        {isloading ? (<Loader />) : (<>
            <MetaData title="Ecommerce" />
            <div className='banner'>
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <Link > 
                    <Button onClick={scroll}>Scroll<CgMouse /></Button>
                </Link>
            </div>
            <h1 className='homeHeading'>Featured Products</h1>

            <Container maxWidth='xl'>
                <div className='container' id="container" ref={scrollef}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}

                </div>
            </Container>
        </>)}


    </>)

}

export default Home;