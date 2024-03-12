import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import usestyles from './styles';
import { getProductDetails } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';


const ProductCard= ({product})=>{
    console.log(product);
    const classes = usestyles();

    const options={
        edit : false,
        color : "rgba(20,20,20,0.1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ? 20 : 25,
        value:product.ratings,
        isHalf: true
    } 
 
    return(<>
    <Link to={`/product/${product._id}`} className={classes.links}> 
    <Card className={classes.Card}>
        <CardMedia 
        className={classes.image}
         image={product.image[0].url}
        title="green iguana"
        />
        <CardContent>
            <Typography variant='h6'>{product.name}</Typography>
            <Typography><ReactStars {...options}/><span>({product.numOfReviews} Reviews)</span></Typography>
            <Typography variant='h6'>Rs{product.price}</Typography>

        </CardContent>
    </Card>
    </Link>
    </>)
}
export default ProductCard;