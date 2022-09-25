import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Layout from 'src/components/Layout';
import { useRouter } from 'next/router';
import PriceSortButtons from './UI/PriceSortButtons';
import { selectSearchState, setSearchState } from 'src/store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import BlackSearchIcon from './UI/icons/BlackSearchIcon';

function ShopContent({ 
    products = null, 
    categories = null, 
    category = null, 
    subcategories = null, 
    subcategory = null, 
    brands = null, 
    title = null,
    isShopPage = null, 
    isCategoryPage = null, 
    isSubcategoryPage = null
}): ReactElement {
    const router = useRouter();

    const productsRef = useRef<HTMLDivElement>(null);
    const observableSection = useRef<HTMLDivElement>(null);
    const observer = useRef<any>(null);

    const [menuScrollTopOffset, setMenuScrollTopOffset] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', async () => {
            const isStuck = observableSection.current ? window.scrollY >= observableSection.current.offsetTop - window.innerHeight : false;
            if (isStuck) {
                return setMenuScrollTopOffset(
                    window.scrollY === 0 ? 0 :
                    observableSection.current.offsetTop - window.innerHeight
                )
            }
            setMenuScrollTopOffset(0)
        })
    }, [])

    const [productsState, setProductsState] = useState(products);
    const [unfilteredProducts, setUnfilteredProducts] = useState(productsState);

    const [idOfCurrentBrand, setIdOfCurrentBrand] = useState(1);

    function showAllProducts() {
        setProductsState(products) 
        setUnfilteredProducts(products)
        setIdOfCurrentBrand(1) 
        refreshSortPriceButtons()
    }

    function productsWithCurrentBrand(brandId) {
        setIdOfCurrentBrand(brandId)
        const filteredProductsWithCurrentBrand = products.filter(product => product.brandId === brandId);
        setProductsState(filteredProductsWithCurrentBrand)
        setUnfilteredProducts(filteredProductsWithCurrentBrand)
        refreshSortPriceButtons()
    }

    function openSubcategoryPage(subcategoryId) {
        localStorage.setItem('categoryIdOfSubcategory', category.id)
        localStorage.setItem('categoryNameOfSubcategory', category.name)
        router.push('/shop/subcategory/[id]', `/shop/subcategory/${subcategoryId}`)
    }

    const [categoryIdOfCurrentSubcategory, setCategoryIdOfCurrentSubcategory] = useState(null);
    const [categoryNameOfCurrentSubcategory, setCategoryNameOfCurrentSubcategory] = useState(null);
        
    isSubcategoryPage ?
        useEffect(() => {
            setCategoryIdOfCurrentSubcategory(localStorage.getItem('categoryIdOfSubcategory'))
            setCategoryNameOfCurrentSubcategory(localStorage.getItem('categoryNameOfSubcategory'))
        }, []) : null

    const [isBottomPriceActive, setIsBottomPriceActive] = useState(false);
    const [isTopPriceActive, setIsTopPriceActive] = useState(false);
    const [isRecommendedProductsActive, setIsRecommendedProductsActive] = useState(true);

    const refreshSortPriceButtons = () => {
        setIsBottomPriceActive(false)
        setIsTopPriceActive(false)
        setIsRecommendedProductsActive(true)
    }

    const [isCategoriesSelectOpen, setIsCategoriesSelectOpen] = useState(false);
    const [isSubcategoriesSelectOpen, setIsSubcategoriesSelectOpen] = useState(false);
    const [isFiltrationMenuOpen, setIsFiltrationMenuOpen] = useState(false);

    const searchState = useSelector(selectSearchState);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    function closeSearch() {
        dispatch(setSearchState(false))
        setSearchQuery('')
    }

    function filterProducts(searchText, products) {
        if (!searchText) {
            return unfilteredProducts
        }
        return products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }

    useEffect(() => {
        const filteredProducts = filterProducts(searchQuery, productsState)
        refreshSortPriceButtons()
        setProductsState(filteredProducts)
        if (searchQuery.length) {
            setIsFiltrationMenuOpen(false)
            window.scroll(0, productsRef.current.offsetTop)
        }
    }, [searchQuery, unfilteredProducts])

    return (
        <Layout title={title}>
            <div className={searchState && router.asPath.includes('/shop') ? 'search-active search' : 'search'}>
                <div className='search_icon'><BlackSearchIcon /></div>
                <input  
                    className='search_input'
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Пошук у каталозі'
                />
                <div className='search_button' onClick={() => closeSearch()}></div>
            </div>
            <div className='shop' onClick={() => setIsFiltrationMenuOpen(false)}>
                <div className={isFiltrationMenuOpen ? 'shop_inner_menu-active shop_inner_menu' : 'shop_inner_menu'} onClick={(e) => e.stopPropagation()}>
                    {menuScrollTopOffset ? <style jsx global>{`
                        .shop_inner_menu {
                            position: absolute!important;
                            top: ${menuScrollTopOffset}px!important;
                        }
                    `}</style> : <></>}
                    <div className={isFiltrationMenuOpen ? 'shop_inner_menu_close shop_inner_menu_close-active' : 'shop_inner_menu_close'} onClick={(e) => {e.stopPropagation(); setIsFiltrationMenuOpen(false)}}>
                        <div className='shop_inner_menu_close_arrow'></div>
                    </div>
                    <div className='shop_inner_menu_inner'>
                        <div className='shop_inner_brands'>
                            <div 
                                className={idOfCurrentBrand === 1 ? 'shop_inner_brands_button-active shop_inner_brands_button' : 'shop_inner_brands_button'} 
                                onClick={() => {showAllProducts(); window.scroll(0, 0)}}
                            >
                                Показати всі
                            </div>
                            {brands.length ? brands.map(brand => 
                                <div 
                                    key={brand.id} 
                                    onClick={() => {productsWithCurrentBrand(brand.id); window.scroll(0, 0)}} 
                                    className={idOfCurrentBrand === brand.id ? 'shop_inner_brands_brand-active shop_inner_brands_brand' : 'shop_inner_brands_brand'}
                                >
                                    {brand.name}
                                </div>
                            ) : <div className='shop_inner_message shop_inner_select_message'>Бренди відсутні</div>}
                        </div>
                        <div className='shop_inner_sort'>
                            <div className='shop_inner_sort_text'>Сортувати:</div>
                            <PriceSortButtons
                                productsState={productsState} 
                                setProductsState={setProductsState} 
                                unfilteredProducts={unfilteredProducts}
                                isBottomPriceActive={isBottomPriceActive}
                                setIsBottomPriceActive={setIsBottomPriceActive}
                                isTopPriceActive={isTopPriceActive}
                                setIsTopPriceActive={setIsTopPriceActive}
                                isRecommendedProductsActive={isRecommendedProductsActive}
                                setIsRecommendedProductsActive={setIsRecommendedProductsActive}
                            />
                        </div>
                    </div>
                </div>
                <div className={isFiltrationMenuOpen ? 'shop_inner-active shop_inner' : 'shop_inner'}>
                    <div className='shop_inner_title'>
                        {isShopPage ? 
                            <div className='shop_inner_title_text'>Магазин</div> : isCategoryPage ? 
                            <>
                                <div className='shop_inner_title_nav'>
                                    <div onClick={() => router.push('/shop')} className='shop_inner_title_nav_item'>Магазин</div>
                                    <div className='shop_inner_title_nav_rightArrow'></div>
                                    <div 
                                        onClick={() => router.push('/shop/category/[id]', `/shop/category/${category.id}`)} 
                                        className='shop_inner_title_nav_item-active shop_inner_title_nav_item'
                                    >
                                        {category.name}
                                    </div>
                                </div> 
                                <div className='shop_inner_title_text'>{category.name}</div>
                            </> : isSubcategoryPage ?
                            <>
                                <div className='shop_inner_title_nav'>
                                    <div onClick={() => router.push('/shop')} className='shop_inner_title_nav_item'>Магазин</div>
                                    <div className='shop_inner_title_nav_rightArrow'></div>
                                    <div 
                                        onClick={() => router.push('/shop/category/[id]', `/shop/category/${categoryIdOfCurrentSubcategory}`)} 
                                        className='shop_inner_title_nav_item'
                                    >
                                        {categoryNameOfCurrentSubcategory}
                                    </div>
                                    <div className='shop_inner_title_nav_rightArrow'></div>
                                    <div 
                                        onClick={() => router.push('/shop/subcategory/[id]', `/shop/subcategory/${subcategory.id}`)} 
                                        className='shop_inner_title_nav_item-active shop_inner_title_nav_item'
                                    >
                                        {subcategory.name}
                                    </div>
                                </div>
                                <div className='shop_inner_title_text'>{subcategory.name}</div>
                            </> : <></>
                        }
                    </div>
                    {isShopPage ? 
                        <div className='shop_inner_select'>
                            <div 
                                className={isCategoriesSelectOpen ? 'shop_inner_select_title-active shop_inner_select_title' :  'shop_inner_select_title'} 
                                onClick={() => setIsCategoriesSelectOpen(!isCategoriesSelectOpen)}
                            >
                                <span className='shop_inner_select_title_text'>Категорії</span> 
                                <div className='shop_inner_select_title_downArrow'></div>
                            </div>
                            <div className={isCategoriesSelectOpen ? 'shop_inner_categories-active shop_inner_categories' : 'shop_inner_categories'}>
                                {categories.length ? categories.map(category => 
                                    <div 
                                        key={category.id} 
                                        onClick={() => router.push('/shop/category/[id]', `/shop/category/${category.id}`)} 
                                        className='shop_inner_categories_category'
                                    >
                                        {category.name}
                                    </div>
                                ) : <div className='shop_inner_message shop_inner_select_message'>Категорії відсутні</div>}
                            </div>
                        </div> : isCategoryPage ?
                        <div className='shop_inner_select'>
                            <div 
                                className={isSubcategoriesSelectOpen ? 'shop_inner_select_title-active shop_inner_select_title' :  'shop_inner_select_title'} 
                                onClick={() => setIsSubcategoriesSelectOpen(!isSubcategoriesSelectOpen)}
                            >
                                <span className='shop_inner_select_title_text'>Подкатегорії</span>
                                <div className='shop_inner_select_title_downArrow'></div>
                            </div>
                            <div className={isSubcategoriesSelectOpen ? 'shop_inner_subcategories-active shop_inner_subcategories' : 'shop_inner_subcategories'}>
                                {subcategories.length ? subcategories.map(subcategory => 
                                    <div 
                                        key={subcategory.id} 
                                        className='shop_inner_subcategories_subcategory' 
                                        onClick={() => openSubcategoryPage(subcategory.id)}
                                    >
                                        {subcategory.name}
                                    </div>
                                ) : <div className='shop_inner_message shop_inner_select_message'>У даній категорії немає подкатегорій</div>}  
                            </div> 
                        </div> : <></>
                    }
                    <div className='shop_inner_menu_open' onClick={(e) => {e.stopPropagation(); setIsFiltrationMenuOpen(!isFiltrationMenuOpen)}}>Фільтрація</div>
                    <div className='shop_inner_products' ref={productsRef}>
                        {productsState.length ? productsState.map(product => 
                            <div onClick={() => {dispatch(setSearchState(false)); router.push('/shop/product/[id]', `/shop/product/${product.id}`)}}  key={product.id} className='shop_inner_products_product'>
                                <div className='shop_inner_products_product_imgContainer'><img className='shop_inner_products_product_img' src={product.image} /></div>
                                <div className='shop_inner_products_product_content'>
                                    <div className='shop_inner_products_product_content_name'>{product.name}</div>
                                    <div className='shop_inner_products_product_content_price'>{product.price} $</div>
                                </div>
                            </div>
                        ) : <div className='shop_inner_message_products'>
                                <div className='shop_inner_message_products_title'>Товари відсутні</div>
                                <div className='shop_inner_message_products_subtitle'>Але ви завжди можете знайти в інтернеті те що вам потрібно та замовити залишив посилання</div>
                                <div className='shop_inner_message_products_button' onClick={() => router.push('/order')}>Замовити</div>
                            </div>}                            
                    </div>
                </div>
            </div>
            <div ref={observableSection}></div>
        </Layout>
    )
}
  
export default ShopContent;