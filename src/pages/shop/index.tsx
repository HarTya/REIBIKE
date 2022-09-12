import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next/types';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopContent from 'src/components/ShopContent';
import { selectBurgerMenuState, setBurgerMenuState } from 'src/store/burgerMenuSlice';

function Shop(props): ReactElement {
    const burgerMenuState = useSelector(selectBurgerMenuState);
    const dispatch = useDispatch();

    useEffect(() => {
        const Debounce = setTimeout(() => {
            if (burgerMenuState) {
                dispatch(setBurgerMenuState(false))
            }
        }, 700);

        return () => clearTimeout(Debounce)
    }, [])
        
    const products = props.products;
    const categories = props.categories;
    const brands = props.brands;

    return (
        <ShopContent products={products} categories={categories} brands={brands} title={'Магазин'} isShopPage={true} />
    )
}
  
export default Shop;

export const getServerSideProps: GetServerSideProps = async () => {
    const products = await prisma.product.findMany();
    const categories = await prisma.category.findMany();
    const brands = await prisma.brand.findMany();
    
    return {
      props: { products, categories, brands }
    }
}
