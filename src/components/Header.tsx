import SearchIcon from './UI/icons/SearchIcon';
import BasketIcon from './UI/icons/BasketIcon';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './UI/icons/LogoIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketNotificationCount, selectBasketProducts, selectBasketState, setBasketProducts, setBasketState, setNotificationCount } from 'src/store/basketSlice';
import Modal from './UI/Modal';
import CountTopArrow from './UI/icons/CountTopArrow';
import CountBottomArrow from './UI/icons/CountBottomArrow';
import BasketProductDeleteIcon from './UI/icons/BasketProductDeleteIcon';
import { setSearchState } from 'src/store/searchSlice';
import { selectBurgerMenuState, setBurgerMenuState } from 'src/store/burgerMenuSlice';
import { orderService } from 'src/services/order.service';
import Loader from './UI/Loader';

function Header(): ReactElement {
    const router = useRouter();

    const burgerMenuState = useSelector(selectBurgerMenuState);
    const basketState = useSelector(selectBasketState);
    const notificationCount = useSelector(selectBasketNotificationCount);
    const basketProducts = useSelector(selectBasketProducts);

    const dispatch = useDispatch();

    async function openSearch() {
        if (!router.asPath.includes('/shop') || router.asPath.includes('/shop/product')) {
            await router.push('/shop')
        }
        dispatch(setBurgerMenuState(false))
        dispatch(setSearchState(true))
    }

    async function increment(basketProductId) {
        const updatedBasketProducts = await basketProducts.map(basketProduct => {
            if (basketProduct.id === basketProductId && basketProduct.count < 10) {
                const updatedBasketProduct = {
                    id: basketProduct.id,
                    image: basketProduct.image,
                    name: basketProduct.name,
                    price: basketProduct.price + basketProduct.price / basketProduct.count,
                    count: basketProduct.count + 1
                }
                return updatedBasketProduct
            }   
            return basketProduct
        })

        dispatch(setBasketProducts(updatedBasketProducts))
    }

    async function decrement(basketProductId) {
        const updatedBasketProducts = await basketProducts.map(basketProduct => {
            if (basketProduct.id === basketProductId && basketProduct.count > 1) {
                const updatedBasketProduct = {
                    id: basketProduct.id,
                    image: basketProduct.image,
                    name: basketProduct.name,
                    price: basketProduct.price - basketProduct.price / basketProduct.count,
                    count: basketProduct.count - 1
                }
                return updatedBasketProduct
            }   
            return basketProduct
        })

        dispatch(setBasketProducts(updatedBasketProducts))
    }

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let sum = 0;
        basketProducts.forEach(basketProduct => sum += basketProduct.price)
        setTotalPrice(sum)
    }, [basketProducts])

    function deleteBasketProduct(basketProductId) {
        const updatedBasketProducts = basketProducts.filter(basketProduct => basketProduct.id !== basketProductId)
        dispatch(setBasketProducts(updatedBasketProducts))
    }

    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

    const [contact, setContact] = useState('');
    const [comment, setComment] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setContact('')
        setComment('')
    }, [success])

    const [error, setError] = useState('');

    const orderBasket = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess('')
        setError('')

        let content = [];
        basketProducts.map((basketProduct, index) => content.push(`№${index + 1} ${basketProduct.name} ${basketProduct.price}$ (x${basketProduct.count})`))

        const contentText = content.join(', ');

        return orderService.orderBasket(contact, totalPrice, contentText, comment)
            .then(() => {
                setLoading(false)
                setSuccess(`Замовлення відправлено, ми зв'яжемося з вами за вказаними контактними даними`)
                setIsBuyModalOpen(false)
                dispatch(setBasketState(false))
                dispatch(setBasketProducts([]))
            })      
            .catch(error => {
                setLoading(false)
                setError(error)
            });
    };

    return (
        <header className='header'>
            <Logo />
            <div onClick={() => dispatch(setBurgerMenuState(!burgerMenuState))} className='header_menu_icon_area'>
                <div className={burgerMenuState ? 'header_menu_icon-active header_menu_icon' : 'header_menu_icon'}>
                    {burgerMenuState ? <style jsx global>{`
                        @media screen and (max-width: 768px) {
                            body {
                                overflow: hidden!important;
                            }
                            #__next {
                                overflow: hidden!important;
                            }
                        }
                    `}</style> : <></>}
                    <span></span>
                </div>
            </div>
            <div className={burgerMenuState ? 'header_menu-active header_menu' : 'header_menu'}>
                <div className='header_menu_background'></div>
                <div className='header_menu_inner'>
                    <Logo />
                    <div className='header_links'>
                        <div 
                            className={router.asPath === '/' ? 
                            'header_links_link-active header_links_link' 
                            : 'header_links_link'} 
                            onClick={() => router.push('/')}
                        >
                            Про нас
                        </div>
                        <div 
                            className={router.asPath === '/shop' ? 
                            'header_links_link-active header_links_link' 
                            : 'header_links_link'} 
                            onClick={() => router.push('/shop')}
                        >
                            Магазин
                        </div>
                        <div 
                            className={router.asPath === '/order' ? 
                            'header_links_link-active header_links_link' 
                            : 'header_links_link'} 
                            onClick={() => router.push('/order')}
                        >
                            Замовити
                        </div>
                    </div>
                    <div className='header_icons'>
                        <div className='header_icons_icon' onClick={() => openSearch()}>
                            <SearchIcon />
                        </div>
                        <div className='header_icons_icon' onClick={() => {dispatch(setSearchState(false)); dispatch(setBurgerMenuState(false)); dispatch(setBasketState(true)); dispatch(setNotificationCount(0))}}>
                            <BasketIcon />
                            {notificationCount ? <span className='header_icons_icon_notification'>
                                {notificationCount}
                            </span> : <></>}
                        </div>
                    </div>
                </div>
            </div>
            <Modal visible={basketState} setVisible={setBasketState}>
                <div className='basket_products'>
                    {basketProducts.length ? <div className='basket_products_totalPrice'>Всього: {totalPrice} $ <span>(без урахування доставки)</span></div> : <></>}
                    <span className='basket_icon'><BasketIcon /></span>
                    {basketProducts.length ? basketProducts.map(basketProduct =>
                        <div 
                            key={basketProduct.id} 
                            className='basket_products_product' 
                        >
                            <img src={basketProduct.image} />
                            <div className='basket_products_product_content'>
                                <div className='basket_products_product_content_name'>{basketProduct.name}</div>
                                <div className='basket_products_product_content_price'>{basketProduct.price} $</div>
                                <div className='basket_products_product_content_count'>
                                    <div onClick={() => increment(basketProduct.id)}><CountTopArrow /></div>
                                    <span>{basketProduct.count}</span>
                                    <div onClick={() => decrement(basketProduct.id)}><CountBottomArrow /></div>
                                </div>
                                <div
                                    className='basket_products_product_content_cross'
                                    onClick={() => deleteBasketProduct(basketProduct.id)}
                                >
                                    <BasketProductDeleteIcon />
                                </div>
                            </div>
                        </div>
                    ): <div className='shop_inner_message basket_message'>Перейдіть на сторінку товару, щоб додати його до кошика</div>}
                    {basketProducts.length ? <div className='basket_buy_button' onClick={() => {dispatch(setBasketState(false)); setIsBuyModalOpen(true)}}>Оформити замовлення</div> : <></>}
                </div>
            </Modal>
            <Modal visible={isBuyModalOpen} setVisible={setIsBuyModalOpen}>
                {basketProducts.length ? 
                    <>
                        <div className='buy_inner_title'>Оформлення замовлення</div>
                        {loading ? 
                            <>
                                <style jsx global>{`
                                    .buy_inner_title {
                                        margin-bottom: 0!important;
                                    }
                                `}</style>
                                <Loader /> 
                            </>
                            :
                            <>
                                <div className='buy_inner_inputs'>
                                    <div>
                                        <input
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            onClick={() => setError('')}
                                            className='buy_inner_inputs_inputContact'
                                        />
                                        {contact.length ? <></> : <p className='buy_inner_inputs_inputContact_placeholder'>Пошта або номер телефону</p>}
                                    </div>
                                    <div>
                                        <textarea 
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            onClick={() => setError('')}
                                            className='buy_inner_inputs_inputComment'
                                        />
                                        {comment.length ? <></> : <p className='buy_inner_inputs_inputComment_placeholder'>Комментарій</p>}
                                    </div>
                                </div>
                                <div className='buy_inner_button' onClick={(e) => orderBasket(e)}>Замовити</div>
                            </>
                        }
                    </>
                    : <div className='shop_inner_message basket_message'>Кошик порожній, заповніть його щоб оформити замовлення</div>
                }
            </Modal>
            <div onClick={() => setSuccess('')} className={success ? 'order_success-active order_success' : 'order_success' }>{success}</div>
            <div onClick={() => setError('')} className={error ? 'order_error-active order_error' : 'order_error' }>{error}</div>
        </header>
    )
}

export default Header;