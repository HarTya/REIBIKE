import React, { ReactElement, useEffect, useState } from 'react';
import BottomPriceIcon from './icons/BottomPriceIcon';
import RecommendedProductsIcon from './icons/RecommendedProductsIcon';
import TopPriceIcon from './icons/TopPriceIcon';

function PriceSortButtons({
    isDisabled = null,
    productsState = null, 
    setProductsState = null,
    unfilteredProducts = null,
    isBottomPriceActive = null, 
    setIsBottomPriceActive = null, 
    isTopPriceActive = null,
    setIsTopPriceActive = null,
    isRecommendedProductsActive = null,
    setIsRecommendedProductsActive = null
}): ReactElement {

    const [filteredProductsToBottomPrice, setFilteredProductsToBottomPrice] = useState(null);
    const [filteredProductsToTopPrice, setFilteredProductsToTopPrice] = useState(null);

    useEffect(() => {
        let productsToBottom = [];
        productsState.forEach(product => productsToBottom.push(product))

        productsToBottom.sort((a, b) => b.price - a.price)
        setFilteredProductsToBottomPrice(productsToBottom)

        let productsToTop = [];
        productsState.forEach(product => productsToTop.push(product))

        productsToTop.sort((a, b) => a.price - b.price)
        setFilteredProductsToTopPrice(productsToTop)
    }, [unfilteredProducts])
   
    function bottomPriceProducts() {
        setIsBottomPriceActive(true)
        setIsTopPriceActive(false)
        setIsRecommendedProductsActive(false)
        setProductsState(filteredProductsToBottomPrice)
    }

    function topPriceProducts() {
        setIsBottomPriceActive(false)
        setIsTopPriceActive(true)
        setIsRecommendedProductsActive(false)
        setProductsState(filteredProductsToTopPrice)
    }

    function recommendedProducts() {
        setIsBottomPriceActive(false)
        setIsTopPriceActive(false)
        setIsRecommendedProductsActive(true)
        setProductsState(unfilteredProducts)
    }

    return (
        <div className='shop_inner_sort_buttons'>
            <div 
                onClick={() => bottomPriceProducts()} 
                className={isDisabled ? 'shop_inner_sort_buttons_bottomPrice shop_inner_sort_buttons_bottomPrice-disabled' : isBottomPriceActive ? 'shop_inner_sort_buttons_bottomPrice-active shop_inner_sort_buttons_bottomPrice' 
                : 'shop_inner_sort_buttons_bottomPrice'}
            >
                <BottomPriceIcon />
            </div>
            <div 
                onClick={() => topPriceProducts()} 
                className={isDisabled ? 'shop_inner_sort_buttons_topPrice shop_inner_sort_buttons_topPrice-disabled' : isTopPriceActive ? 'shop_inner_sort_buttons_topPrice-active shop_inner_sort_buttons_topPrice' 
                : 'shop_inner_sort_buttons_topPrice'}
            >
                <TopPriceIcon />
            </div>
            <div 
                onClick={() => recommendedProducts()} 
                className={isRecommendedProductsActive ? 'shop_inner_sort_buttons_recommendedProducts-active shop_inner_sort_buttons_recommendedProducts' 
                : 'shop_inner_sort_buttons_recommendedProducts'}
            >
                <RecommendedProductsIcon />
            </div>
        </div>
    )
}

export default PriceSortButtons;