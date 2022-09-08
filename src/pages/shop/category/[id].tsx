import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next/types';
import React, { ReactElement } from 'react';
import ShopContent from 'src/components/ShopContent';

function Category(props): ReactElement {
    const products = props.products;
    const category = props.category;
    const subcategories = props.subcategories;
    const brands = props.brands;

    return (
        <ShopContent products={products} category={category} subcategories={subcategories} brands={brands} title={category.name} isCategoryPage={true} />
    )
}

export default Category;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const products = await prisma.product.findMany({
        where: { categoryId: String(params?.id) }
    });
    const category = await prisma.category.findUnique({
        where: { id: String(params?.id) }
    });
    const subcategories = await prisma.subcategory.findMany({
        where: { categoryId: String(params?.id) }
    });
    const brands = await prisma.brand.findMany();

    return {
      props: { products, category, subcategories, brands }
    }
}