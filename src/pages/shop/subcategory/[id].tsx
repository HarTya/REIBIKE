import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next/types';
import React, { ReactElement } from 'react';
import ShopContent from 'src/components/ShopContent';

function Subcategory(props): ReactElement {
    const products = props.products;
    const subcategory = props.subcategory;
    const brands = props.brands;

    return (
        <ShopContent products={products} subcategory={subcategory} brands={brands} title={subcategory.name} isSubcategoryPage={true} />
    )
}

export default Subcategory;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const products = await prisma.product.findMany({
        where: { subcategoryId: String(params?.id) }
    });
    const subcategory = await prisma.subcategory.findUnique({
        where: { id: String(params?.id) }
    });
    const brands = await prisma.brand.findMany();

    return {
      props: { products, subcategory, brands }
    }
}