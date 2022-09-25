import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next/types';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketNotificationCount, selectBasketProducts, setBasketProducts, setNotificationCount } from 'src/store/basketSlice';
import { setBurgerMenuState } from 'src/store/burgerMenuSlice';

function Product({ product, category, subcategory, brand, сharacteristics }): ReactElement {
    const router = useRouter();

    const notificationCount = useSelector(selectBasketNotificationCount);
    const basketProducts = useSelector(selectBasketProducts);
    const dispatch = useDispatch();

    const [isProductInBasket, setIsProductInBasket] = useState(false);
    const [buyButtonText, setBuyButtonText] = useState('Придбати');

    function addProductToBasket() {
        const basketProductObj = {
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            count: 1
        }

        let isBasketProductAlreadyExist = false;

        basketProducts.forEach(basketProduct => {
            if (basketProduct.id === basketProductObj.id) {
                return isBasketProductAlreadyExist = true;
            } 
        })

        if (isBasketProductAlreadyExist) {
            return
        }

        dispatch(setNotificationCount(notificationCount + 1))
        dispatch(setBasketProducts([...basketProducts, basketProductObj]))
    }

    useEffect(() => {
        setIsProductInBasket(false)
        setBuyButtonText('Придбати')
        basketProducts.forEach(basketProduct => {
            if (basketProduct.id === product.id) {
                setIsProductInBasket(true)
                setBuyButtonText('Додано до кошика')
            }
        })
    }, [basketProducts])

    function openSubcategoryPage(subcategoryId) {
        localStorage.setItem('categoryIdOfSubcategory', category.id)
        localStorage.setItem('categoryNameOfSubcategory', category.name)
        router.push('/shop/subcategory/[id]', `/shop/subcategory/${subcategoryId}`)
    }

    const informationSection = useRef<HTMLDivElement>();

    const [informationState, setInformationState] = useState(false);
    const [moreCharacteristics, setMoreCharacteristics] = useState(false);

    return (
        <Layout title={product.name}>
            <div className='shop_inner_products_product_page'>
                <div className='container'>
                    <div className='shop_inner_products_product_page_inner'>
                        <a href={product.image}><div className='shop_inner_products_product_page_imgContainer'>
                            <img className='shop_inner_products_product_page_img' src={product.image} />
                        </div></a>
                        <div className='shop_inner_products_product_page_content'>
                            <div className='shop_inner_title shop_inner_products_product_page_content_title'>
                                <div className='shop_inner_title_nav'>
                                    <div onClick={() => router.push('/shop')} className='shop_inner_title_nav_item'>Магазин</div>
                                    <div className='shop_inner_title_nav_rightArrow'></div>
                                    <div 
                                        onClick={() => router.push('/shop/category/[id]', `/shop/category/${category.id}`)} 
                                        className='shop_inner_title_nav_item'
                                    >
                                        {category.name}
                                    </div>
                                    <div className='shop_inner_title_nav_rightArrow'></div>
                                    <div 
                                        onClick={() => openSubcategoryPage(subcategory.id)} 
                                        className='shop_inner_title_nav_item-active shop_inner_title_nav_item'
                                    >
                                        {subcategory.name}
                                    </div>
                                </div>
                            </div>
                            <div className='shop_inner_products_product_page_content_name'>
                                <div className='shop_inner_products_product_page_content_name_text'>{product.name}</div>
                                <div 
                                    className={product.available ? 
                                    'shop_inner_products_product_page_content_name_status shop_inner_products_product_page_content_name_status-true' : 
                                    'shop_inner_products_product_page_content_name_status shop_inner_products_product_page_content_name_status-false'}
                                >
                                    {product.available ? 'У наявності' : 'Під замовлення'}
                                </div>
                            </div>
                            <div className='shop_inner_products_product_page_content_price'>{product.price} <span>$</span></div>
                            <div className='shop_inner_products_product_page_content_buy'>
                                <div 
                                    onClick={() => {addProductToBasket(); dispatch(setBurgerMenuState(true))}} 
                                    className={isProductInBasket ? 'shop_inner_products_product_page_content_buy_button-active shop_inner_products_product_page_content_buy_button' : 'shop_inner_products_product_page_content_buy_button'}
                                >
                                    {buyButtonText}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='shop_inner_products_product_page_information' ref={informationSection}>
                        <div className='shop_inner_products_product_page_information_nav'>
                            <div 
                                onClick={() => setInformationState(false)}
                                className={!informationState ? 'shop_inner_products_product_page_information_nav_item shop_inner_products_product_page_information_nav_item-active' : 'shop_inner_products_product_page_information_nav_item'}
                            >
                                Опис
                            </div>
                            <div 
                                onClick={() => setInformationState(true)}
                                className={informationState ? 'shop_inner_products_product_page_information_nav_item shop_inner_products_product_page_information_nav_item-active' : 'shop_inner_products_product_page_information_nav_item'}
                            >
                                Характеристики
                            </div>
                        </div>
                        <div className='shop_inner_products_product_page_information_content'>
                            {!informationState ? 
                                <pre className='shop_inner_products_product_page_information_content_description'>{product.description.split('. ').join('.\n\n')}</pre>
                                : <div className='shop_inner_products_product_page_information_content_сharacteristics'>
                                    <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic'>
                                        <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic_title'>Бренд:</div>
                                        <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic_content'>{brand.name}</div>
                                    </div>
                                    {!moreCharacteristics ?
                                        <>
                                            {сharacteristics.map((сharacteristic, index) => 
                                                <div key={сharacteristic.id}>
                                                    {index < 2 ?
                                                        <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic'>
                                                            <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic_title'>{сharacteristic.title}:</div>
                                                            <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic_content'>{сharacteristic.content}</div>
                                                        </div> 
                                                    : <></>}
                                                </div>
                                            )}
                                        </>
                                        : 
                                        <>
                                            {сharacteristics.map(сharacteristic => 
                                                <div key={сharacteristic.id}>
                                                    <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic'>
                                                        <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic_title'>{сharacteristic.title}:</div>
                                                        <div className='shop_inner_products_product_page_information_content_сharacteristics_сharacteristic_content'>{сharacteristic.content}</div>
                                                    </div> 
                                                </div>
                                            )}
                                        </>
                                    }
                                    {сharacteristics.length > 2 ? 
                                        <div onClick={() => {setMoreCharacteristics(!moreCharacteristics); moreCharacteristics ? window.scrollTo(0, informationSection.current.offsetTop - 100) : null}} className='shop_inner_products_product_page_information_content_сharacteristics_button' >
                                            <span>{!moreCharacteristics ? 'Показати всі' : 'Сховати'}</span>
                                            <span className={!moreCharacteristics ? 'shop_inner_products_product_page_information_content_сharacteristics_button_arrow' : 'shop_inner_products_product_page_information_content_сharacteristics_button_arrow shop_inner_products_product_page_information_content_сharacteristics_button_arrow-active'}></span>
                                        </div> 
                                    : <></>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const product = await prisma.product.findUnique({
        where: { id: String(params?.id) }
    });
    const category = await prisma.category.findUnique({
        where: { id: product.categoryId }
    });
    const subcategory = await prisma.subcategory.findUnique({
        where: { id: product.subcategoryId }
    });
    const brand = await prisma.brand.findUnique({
        where: { id: product.brandId }
    });
    const сharacteristics = await prisma.characteristic.findMany({
        where: { productId: String(params?.id) }
    });

    return {
      props: { product, category, subcategory, brand, сharacteristics }
    }
}