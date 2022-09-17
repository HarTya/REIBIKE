import prisma from 'lib/prisma';
import Router from 'next/router';
import { GetServerSideProps } from 'next/types';
import React, { ReactElement, useEffect, useState } from 'react';
import Loader from 'src/components/UI/Loader';
import Modal from 'src/components/UI/Modal';
import { categoryService } from 'src/services';
import Layout from '../components/Layout';
import { selectAdminAuthState, setAdminAuthState } from 'src/store/adminAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { brandService } from 'src/services/brand.service';
import { subcategoryService } from 'src/services/subcategory.service';
import { productService } from 'src/services/product.service';
import { characteristicService } from 'src/services/characteristic.service';

function Admin(props): ReactElement {
    const products = props.products;
    const categories = props.categories;
    const subcategories = props.subcategories;
    const brands = props.brands;
    const characteristics = props.characteristics;

    const adminAuthState = useSelector(selectAdminAuthState);
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');

    function loginAdmin() {
        setPassword('')
        if (password === process.env.ADMIN_PASSWORD) {
            localStorage.setItem('isAdmin', 'true')
            return dispatch(setAdminAuthState(true))
        }
        localStorage.setItem('isAdmin', 'false')
        return dispatch(setAdminAuthState(false))
    }

    useEffect(() => {
        const isStillAdmin = localStorage.getItem('isAdmin');
        if (isStillAdmin === 'true') {
            dispatch(setAdminAuthState(true))
        }
    }, [])

    const [isCategoriesAdminSelectOpen, setIsCategoriesAdminSelectOpen] = useState(false);
    const [isSubcategoriesAdminSelectOpen, setIsSubcategoriesAdminSelectOpen] = useState(false);
    const [isBrandsAdminSelectOpen, setIsBrandsAdminSelectOpen] = useState(false);
    const [isCharacteristicsAdminSelectOpen, setIsCharacteristicsAdminSelectOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [modalInputValue, setModalInputValue] = useState('');
    const [error, setError] = useState('');

    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    const [isCreateSubcategoryModalOpen, setIsCreateSubcategoryModalOpen] = useState(false);
    const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
    const [subcategoryId, setSubcategoryId] = useState(null);
    const [subcategoryName, setSubcategoryName] = useState(null);

    const [isCreateBrandModalOpen, setIsCreateBrandModalOpen] = useState(false);
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
    const [brandId, setBrandId] = useState(null);
    const [brandName, setBrandName] = useState(null);

    const [isCreateCharacteristicModalOpen, setIsCreateCharacteristicModalOpen] = useState(false);
    const [isCharacteristicModalOpen, setIsCharacteristicModalOpen] = useState(false);
    const [characteristicId, setCharacteristicId] = useState(null);

    const createCategory = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return categoryService.createCategory(modalInputValue)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const [subcategoriesState, setSubcategoriesState] = useState([]);

    function openCategoryModal(categoryId, categoryName) {
        setCategoryId(categoryId)
        setCategoryName(categoryName)
        setIsCategoryModalOpen(true)

        const filteredSubcategoriesWithCurrentCategory = subcategories.filter(subcategory => subcategory.categoryId === categoryId);
        setSubcategoriesState(filteredSubcategoriesWithCurrentCategory)
    }

    const changeCategory = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return categoryService.changeCategory(modalInputValue, categoryId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const deleteCategory = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return categoryService.deleteCategory(categoryId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const createSubcategory = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return subcategoryService.createSubcategory(modalInputValue, categoryId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    function openSubcategoryModal(subcategoryId, subcategoryName) {
        setSubcategoryId(subcategoryId)
        setSubcategoryName(subcategoryName)
        setIsSubcategoryModalOpen(true)
    }

    const changeSubcategory = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return subcategoryService.changeSubcategory(modalInputValue, subcategoryId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const deleteSubcategory = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return subcategoryService.deleteSubcategory(subcategoryId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const createBrand = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return brandService.createBrand(modalInputValue)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    function openBrandModal(brandId, brandName) {
        setBrandId(brandId)
        setBrandName(brandName)
        setIsBrandModalOpen(true)
    }

    const changeBrand = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return brandService.changeBrand(modalInputValue, brandId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const deleteBrand = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return brandService.deleteBrand(brandId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
    const [isCategoryModalOpenProduct, setIsCategoryModalOpenProduct] = useState(false);

    const [fullImage, setFullImage] = useState(null);
    const [image, setImage] = useState(null);

    function handleOnChangeFileInput(event) {
        if (event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = async function(onLoadEvent) {
                setImage(onLoadEvent.target.result)
            }

            reader.readAsDataURL(event.target.files[0])
        }
    };

    async function handleOnSubmitFileInput() {
        setLoading(true)
        const formData = new FormData();

        formData.append('file', image)
        formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME)

        const data = await fetch(process.env.CLOUDINARY_REQ_URL, { method: 'POST', body: formData }).then(res => res.json());
        setFullImage(process.env.CLOUDINARY_RES_URL.replace('w_500,h_500,c_fill/', '') + 'v' + data.version + '/' + data.public_id)
        setImage(process.env.CLOUDINARY_RES_URL + 'v' + data.version + '/' + data.public_id)
        setLoading(false)
    }

    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productAvailable, setProductAvailable] = useState(false);
    const [productCategoryId, setProductCategoryId] = useState(null);
    const [productSubcategoryId, setProductSubcategoryId] = useState(null);
    const [productBrandId, setProductBrandId] = useState(null);
    const [characteristicTitleValue, setCharacteristicTitleValue] = useState('');
    const [characteristicContentValue, setCharacteristicContentValue] = useState('');

    function openCategoryModalProduct(categoryId, categoryName) {
        setCategoryId(categoryId)
        setCategoryName(categoryName)
        setIsCategoryModalOpenProduct(true)
        setProductCategoryId(categoryId)

        const filteredSubcategoriesWithCurrentCategory = subcategories.filter(subcategory => subcategory.categoryId === categoryId);
        setSubcategoriesState(filteredSubcategoriesWithCurrentCategory)
    }

    const createProduct = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        return productService.createProduct(image, fullImage, productName, productPrice, productDescription, productAvailable, productCategoryId, productSubcategoryId, productBrandId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    const [characteristicsState, setCharacteristicsState] = useState([]);

    function openProductModal(productId, productImg, productFullImg, productName, productPrice, productDescription, productAvailable, productCategoryId, productSubcategoryId, productBrandId) {
        setProductId(productId)
        setImage(productImg)
        setFullImage(productFullImg)
        setProductName(productName)
        setProductPrice(productPrice)
        setProductDescription(productDescription)
        setProductAvailable(productAvailable)
        setProductCategoryId(productCategoryId)
        setProductSubcategoryId(productSubcategoryId)
        setProductBrandId(productBrandId)
        setIsProductModalOpen(true)

        const filteredCharacteristicsWithCurrentProduct = characteristics.filter(characteristic => characteristic.productId === productId);
        setCharacteristicsState(filteredCharacteristicsWithCurrentProduct)
    }

    const changeProduct = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        return productService.changeProduct(productId, image, fullImage, productName, productPrice, productDescription, productAvailable, productCategoryId, productSubcategoryId, productBrandId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const deleteProduct = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return productService.deleteProduct(productId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const createCharacteristic = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        return characteristicService.createCharacteristic(characteristicTitleValue, characteristicContentValue, productId)
            .then(() => {setLoading(false); setCharacteristicTitleValue(''); setCharacteristicContentValue('')})
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    function openCharacteristicModal(characteristicId, characteristicTitle, characteristicContent) {
        setCharacteristicId(characteristicId)
        setCharacteristicTitleValue(characteristicTitle)
        setCharacteristicContentValue(characteristicContent)
        setIsCharacteristicModalOpen(true)
    }

    const changeCharacteristic = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        return characteristicService.changeCharacteristic(characteristicTitleValue, characteristicContentValue, characteristicId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    const deleteCharacteristic = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        return characteristicService.deleteCharacteristic(characteristicId)
            .then(() => Router.reload())
            .finally(() => window.scroll(0, 0))
            .catch(error => {
                setLoading(false)
                setError(error)
                function closeError() {
                    setError('')
                }
                setTimeout(closeError, 5000)
            });
    };

    return (
        <Layout title='Адмін панель'>
            <div className='admin'>
                <div className='container'>
                    {adminAuthState ? 
                        <>
                            <div className='admin_title'>Ласкаво просимо</div>
                            <div className='admin_select'>
                                <div 
                                    className={isCategoriesAdminSelectOpen ? 'admin_select_title-active admin_select_title' :  'admin_select_title'} 
                                    onClick={() => setIsCategoriesAdminSelectOpen(!isCategoriesAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Категорії</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isCategoriesAdminSelectOpen ? 'admin_categories-active admin_categories' : 'admin_categories'}>
                                    <div onClick={() => setIsCreateCategoryModalOpen(true)} className='admin_select_button'>Додати категорію</div>
                                    {categories.length ? categories.map(category => 
                                        <div 
                                            onClick={() => openCategoryModal(category.id, category.name)}
                                            key={category.id} 
                                            className='admin_categories_category' 
                                        >
                                            {category.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message'>Категорії відсутні</div>}  
                                </div> 
                            </div>
                            <div className='admin_select'>
                                <div 
                                    className={isBrandsAdminSelectOpen ? 'admin_select_title-active admin_select_title' :  'admin_select_title'} 
                                    onClick={() => setIsBrandsAdminSelectOpen(!isBrandsAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Бренди</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isBrandsAdminSelectOpen ? 'admin_brands-active admin_brands' : 'admin_brands'}>
                                    <div onClick={() => setIsCreateBrandModalOpen(true)} className='admin_select_button'>Додати бренд</div>
                                    {brands.length ? brands.map(brand => 
                                        <div 
                                            onClick={() => openBrandModal(brand.id, brand.name)}
                                            key={brand.id} 
                                            className='admin_brands_brand' 
                                        >
                                            {brand.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message'>Бренди відсутні</div>}  
                                </div> 
                            </div>
                            <div className='admin_products'>
                                <div onClick={() => {
                                    setIsCreateProductModalOpen(true)
                                    setImage(null)
                                    setFullImage(null)
                                    setProductId(null)
                                    setProductName('')
                                    setProductPrice('')
                                    setProductDescription('')
                                    setProductAvailable(false)
                                    setProductCategoryId(null)
                                    setProductSubcategoryId(null)
                                    setProductBrandId(null)
                                }} className='admin_products_panel_button'>Додати товар</div>
                                <div className='admin_products_content'>
                                    {products.length ? products.map(product => 
                                        <div 
                                            onClick={() => openProductModal(product.id, product.image, product.fullImage, product.name, product.price, product.description, product.available, product.categoryId, product.subcategoryId, product.brandId)}
                                            key={product.id} 
                                            className='admin_products_product' 
                                        >
                                            <img src={product.image} />
                                            <p>{product.name}</p>
                                        </div>
                                    ) : <div className='admin_message'>Товари відсутні</div>}  
                                </div>
                            </div>
                        </> 
                        :
                        <>
                            <div className='admin_title'>Адмін Панель</div>
                            <div className='admin_login'>
                                <input
                                    type={'password'}
                                    onKeyDown={(e) => {if (e.key === 'Enter') {loginAdmin()}}}
                                    placeholder='ID вашої картки'
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='admin_login_input'
                                />
                                <div className='admin_login_button' onClick={() => loginAdmin()}>Підтвердити</div>
                            </div> 
                        </>
                    }
                </div>
                <Modal visible={isCreateCategoryModalOpen} setVisible={setIsCreateCategoryModalOpen}>
                    {loading ? <Loader /> :
                        <div className='admin_modal'>
                            <input
                                onKeyDown={(e) => {if (e.key === 'Enter') {createCategory(e)}}}
                                placeholder='Назва категорії'
                                value={modalInputValue} 
                                onChange={(e) => setModalInputValue(e.target.value)}
                                className='admin_modal_input'
                            />
                            <div onClick={createCategory} className='admin_modal_button'>Додати</div>
                        </div> 
                    }
                </Modal>
                <Modal visible={isCategoryModalOpen} setVisible={setIsCategoryModalOpen}>
                    {loading ? <Loader /> :
                        <>
                            <div className='admin_modal_text'>{categoryName}</div>
                            <div className='admin_modal'>
                                <input
                                    onKeyDown={(e) => {if (e.key === 'Enter') {changeCategory(e)}}}
                                    placeholder='Нова назва категорії'
                                    value={modalInputValue} 
                                    onChange={(e) => setModalInputValue(e.target.value)}
                                    className='admin_modal_input'
                                />
                                <div onClick={changeCategory} className='admin_modal_button'>Застосувати</div>
                            </div> 
                            <div className='admin_select admin_select_subcategories'>
                                <div 
                                    className={isSubcategoriesAdminSelectOpen ? 'admin_select_title-active admin_select_title admin_select_subcategories_title' :  'admin_select_title admin_select_subcategories_title'} 
                                    onClick={() => setIsSubcategoriesAdminSelectOpen(!isSubcategoriesAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Подкатегорії</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isSubcategoriesAdminSelectOpen ? 'admin_subcategories-active admin_subcategories' : 'admin_subcategories'}>
                                    <div onClick={() => setIsCreateSubcategoryModalOpen(true)} className='admin_select_button'>Додати подкатегорію</div>
                                    {subcategoriesState.length ? subcategoriesState.map(subcategory => 
                                        <div 
                                            onClick={() => openSubcategoryModal(subcategory.id, subcategory.name)}
                                            key={subcategory.id} 
                                            className='admin_subcategories_subcategory admin_select_subcategories_subcategory' 
                                        >
                                            {subcategory.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message admin_select_subcategories_message'>У даній категорії немає подкатегорій</div>}  
                                </div> 
                            </div>
                            <div onClick={deleteCategory} className='admin_modal_button admin_modal_button_delete'>Вилучити</div>
                        </>
                    }
                </Modal>
                <Modal visible={isCreateSubcategoryModalOpen} setVisible={setIsCreateSubcategoryModalOpen}>
                    {loading ? <Loader /> :
                        <div className='admin_modal'>
                            <input
                                onKeyDown={(e) => {if (e.key === 'Enter') {createSubcategory(e)}}}
                                placeholder='Назва подкатегорії'
                                value={modalInputValue} 
                                onChange={(e) => setModalInputValue(e.target.value)}
                                className='admin_modal_input'
                            />
                            <div onClick={createSubcategory} className='admin_modal_button'>Додати</div>
                        </div> 
                    }
                </Modal>
                <Modal visible={isSubcategoryModalOpen} setVisible={setIsSubcategoryModalOpen}>
                    {loading ? <Loader /> :
                        <>
                            <div className='admin_modal_text'>{subcategoryName}</div>
                            <div className='admin_modal'>
                                <input
                                    onKeyDown={(e) => {if (e.key === 'Enter') {changeSubcategory(e)}}}
                                    placeholder='Нова назва подкатегорії'
                                    value={modalInputValue} 
                                    onChange={(e) => setModalInputValue(e.target.value)}
                                    className='admin_modal_input'
                                />
                                <div onClick={changeSubcategory} className='admin_modal_button'>Застосувати</div>
                            </div> 
                            <div onClick={deleteSubcategory} className='admin_modal_button admin_modal_button_delete'>Вилучити</div>
                        </>
                    }
                </Modal>
                <Modal visible={isCreateBrandModalOpen} setVisible={setIsCreateBrandModalOpen}>
                    {loading ? <Loader /> :
                        <div className='admin_modal'>
                            <input
                                onKeyDown={(e) => {if (e.key === 'Enter') {createBrand(e)}}}
                                placeholder='Назва бренда'
                                value={modalInputValue} 
                                onChange={(e) => setModalInputValue(e.target.value)}
                                className='admin_modal_input'
                            />
                            <div onClick={createBrand} className='admin_modal_button'>Додати</div>
                        </div> 
                    }
                </Modal>
                <Modal visible={isBrandModalOpen} setVisible={setIsBrandModalOpen}>
                    {loading ? <Loader /> :
                        <>
                            <div className='admin_modal_text'>{brandName}</div>
                            <div className='admin_modal'>
                                <input
                                    onKeyDown={(e) => {if (e.key === 'Enter') {changeBrand(e)}}}
                                    placeholder='Нова назва бренда'
                                    value={modalInputValue} 
                                    onChange={(e) => setModalInputValue(e.target.value)}
                                    className='admin_modal_input'
                                />
                                <div onClick={changeBrand} className='admin_modal_button'>Застосувати</div>
                            </div> 
                            <div onClick={deleteBrand} className='admin_modal_button admin_modal_button_delete'>Вилучити</div>
                        </>
                    }
                </Modal>
                <Modal visible={isCreateProductModalOpen} setVisible={setIsCreateProductModalOpen}>
                    {loading ? <Loader /> :
                        <div className='admin_products_panel'>
                            <input 
                                type={'file'}
                                accept='image/png, image/jpg, image/jpeg'
                                name='file'
                                onChange={handleOnChangeFileInput}
                            />
                            {image ? <img className='admin_products_panel_img' src={image} /> : <></>}
                            <div onClick={handleOnSubmitFileInput} className='admin_products_panel_button'>Обрізати</div>
                            <input
                                placeholder='Назва товара'
                                value={productName} 
                                onChange={(e) => setProductName(e.target.value)}
                                className='admin_modal_input'
                            />
                            <input
                                placeholder='Ціна товара'
                                value={productPrice} 
                                onChange={(e) => setProductPrice(e.target.value)}
                                className='admin_modal_input'
                            />
                            <input
                                placeholder='Опис товара'
                                value={productDescription} 
                                onChange={(e) => setProductDescription(e.target.value)}
                                className='admin_modal_input'
                            />
                            <div 
                                className={productAvailable ? 'admin_modal_available_button admin_modal_available_button-true' : 'admin_modal_available_button admin_modal_available_button-false'} 
                                onClick={() => setProductAvailable(!productAvailable)}
                            >
                                {productAvailable ? 'У наявності' : 'Під замовлення'}
                            </div>
                            <div className='admin_select'>
                                <div 
                                    className={isCategoriesAdminSelectOpen ? 'admin_select_title-active admin_select_title' :  'admin_select_title'} 
                                    onClick={() => setIsCategoriesAdminSelectOpen(!isCategoriesAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Категорії</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isCategoriesAdminSelectOpen ? 'admin_categories-active admin_categories' : 'admin_categories'}>
                                    {categories.length ? categories.map(category => 
                                        <div 
                                            onClick={() => openCategoryModalProduct(category.id, category.name)}
                                            key={category.id} 
                                            className={productCategoryId === category.id ? 'admin_categories_category-active admin_categories_category' : 'admin_categories_category'}
                                        >
                                            {category.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message'>Категорії відсутні</div>}  
                                </div> 
                            </div>
                            <div className='admin_select'>
                                <div 
                                    className={isBrandsAdminSelectOpen ? 'admin_select_title-active admin_select_title' :  'admin_select_title'} 
                                    onClick={() => setIsBrandsAdminSelectOpen(!isBrandsAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Бренди</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isBrandsAdminSelectOpen ? 'admin_brands-active admin_brands' : 'admin_brands'}>
                                    {brands.length ? brands.map(brand => 
                                        <div 
                                            onClick={() => setProductBrandId(brand.id)}
                                            key={brand.id} 
                                            className={productBrandId === brand.id ? 'admin_brands_brand-active admin_brands_brand' : 'admin_brands_brand'}
                                        >
                                            {brand.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message'>Бренди відсутні</div>}  
                                </div> 
                            </div>
                            <div onClick={createProduct} className='admin_products_panel_button'>Додати</div>
                        </div> 
                    }
                </Modal>
                <Modal visible={isProductModalOpen} setVisible={setIsProductModalOpen}>
                    {loading ? <Loader /> :
                        <div className='admin_products_panel'>
                            <input 
                                type={'file'}
                                accept='image/png, image/jpg, image/jpeg'
                                name='file'
                                onChange={handleOnChangeFileInput}
                            />
                            {image ? <img className='admin_products_panel_img' src={image} /> : <></>}
                            <div onClick={handleOnSubmitFileInput} className='admin_products_panel_button'>Обрізати</div>
                            <input
                                placeholder='Назва товара'
                                value={productName} 
                                onChange={(e) => setProductName(e.target.value)}
                                className='admin_modal_input'
                            />
                            <input
                                placeholder='Ціна товара'
                                value={productPrice} 
                                onChange={(e) => setProductPrice(e.target.value)}
                                className='admin_modal_input'
                            />
                            <input
                                placeholder='Опис товара'
                                value={productDescription} 
                                onChange={(e) => setProductDescription(e.target.value)}
                                className='admin_modal_input'
                            />
                            <div 
                                className={productAvailable ? 'admin_modal_available_button admin_modal_available_button-true' : 'admin_modal_available_button admin_modal_available_button-false'} 
                                onClick={() => setProductAvailable(!productAvailable)}
                            >
                                {productAvailable ? 'У наявності' : 'Під замовлення'}
                            </div>
                            <div className='admin_select'>
                                <div 
                                    className={isCategoriesAdminSelectOpen ? 'admin_select_title-active admin_select_title' :  'admin_select_title'} 
                                    onClick={() => setIsCategoriesAdminSelectOpen(!isCategoriesAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Категорії</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isCategoriesAdminSelectOpen ? 'admin_categories-active admin_categories' : 'admin_categories'}>
                                    {categories.length ? categories.map(category => 
                                        <div 
                                            onClick={() => openCategoryModalProduct(category.id, category.name)}
                                            key={category.id} 
                                            className={productCategoryId === category.id ? 'admin_categories_category-active admin_categories_category' : 'admin_categories_category'}
                                        >
                                            {category.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message'>Категорії відсутні</div>}  
                                </div> 
                            </div>
                            <div className='admin_select'>
                                <div 
                                    className={isBrandsAdminSelectOpen ? 'admin_select_title-active admin_select_title' :  'admin_select_title'} 
                                    onClick={() => setIsBrandsAdminSelectOpen(!isBrandsAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Бренди</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isBrandsAdminSelectOpen ? 'admin_brands-active admin_brands' : 'admin_brands'}>
                                    {brands.length ? brands.map(brand => 
                                        <div 
                                            onClick={() => setProductBrandId(brand.id)}
                                            key={brand.id} 
                                            className={productBrandId === brand.id ? 'admin_brands_brand-active admin_brands_brand' : 'admin_brands_brand'}
                                        >
                                            {brand.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message'>Бренди відсутні</div>}  
                                </div> 
                            </div>
                            <div className='admin_select'>
                                <style jsx>{`
                                    .admin_select_title_text {
                                        width: 80%;
                                    }
                                `}</style>
                                <div 
                                    className={isCharacteristicsAdminSelectOpen ? 'admin_select_title-active admin_select_title' :  'admin_select_title'} 
                                    onClick={() => setIsCharacteristicsAdminSelectOpen(!isCharacteristicsAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Характеристики</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isCharacteristicsAdminSelectOpen ? 'admin_brands-active admin_brands' : 'admin_brands'}>
                                    <div onClick={() => {setCharacteristicId(null); setCharacteristicTitleValue(''); setCharacteristicContentValue(''); setIsCreateCharacteristicModalOpen(true)}} className='admin_select_button'>Додати характеристику</div>
                                    {characteristicsState.length ? characteristicsState.map(characteristic => 
                                        <div 
                                            onClick={() => openCharacteristicModal(characteristic.id, characteristic.title, characteristic.content)}
                                            key={characteristic.id} 
                                            className='admin_brands_brand'
                                        >
                                            {characteristic.title}
                                        </div>
                                    ) : <div className='admin_message admin_select_message'>Характеристики відсутні</div>}  
                                </div> 
                            </div>
                            <div onClick={changeProduct} className='admin_products_panel_button'>Застосувати</div>
                            <div onClick={deleteProduct} className='admin_products_panel_button admin_products_panel_button_delete'>Вилучити</div>
                        </div> 
                    }
                </Modal>
                <Modal visible={isCategoryModalOpenProduct} setVisible={setIsCategoryModalOpenProduct}>
                    {loading ? <Loader /> :
                        <>
                            <div className='admin_modal_text'>{categoryName}</div>
                                <style jsx>{`
                                    .admin_modal_text {
                                        margin: 0;
                                    }
                                `}</style>
                            <div className='admin_select admin_select_subcategories'>
                                <div 
                                    className={isSubcategoriesAdminSelectOpen ? 'admin_select_title-active admin_select_title admin_select_subcategories_title' :  'admin_select_title admin_select_subcategories_title'} 
                                    onClick={() => setIsSubcategoriesAdminSelectOpen(!isSubcategoriesAdminSelectOpen)}
                                >
                                    <span className='admin_select_title_text'>Подкатегорії</span>
                                    <div className='admin_select_title_downArrow'></div>
                                </div>
                                <div className={isSubcategoriesAdminSelectOpen ? 'admin_subcategories-active admin_subcategories' : 'admin_subcategories'}>
                                    {subcategoriesState.length ? subcategoriesState.map(subcategory => 
                                        <div 
                                            onClick={() => {setProductSubcategoryId(subcategory.id); setIsCategoryModalOpenProduct(false); setIsCategoriesAdminSelectOpen(false)}}
                                            key={subcategory.id} 
                                            className={productSubcategoryId === subcategory.id ? 'admin_subcategories_subcategory admin_select_subcategories_subcategory admin_select_subcategories_subcategory-active' : 'admin_subcategories_subcategory admin_select_subcategories_subcategory'}
                                        >
                                            {subcategory.name}
                                        </div>
                                    ) : <div className='admin_message admin_select_message admin_select_subcategories_message'>У даній категорії немає подкатегорій</div>}  
                                </div> 
                            </div>
                        </>
                    }
                </Modal>
                <Modal visible={isCreateCharacteristicModalOpen} setVisible={setIsCreateCharacteristicModalOpen}>
                    {loading ? <Loader /> :
                        <div className='admin_modal'>
                            <style jsx>{`
                                .admin_modal {
                                    flex-direction: column;
                                }

                                .admin_modal > input:not(:last-child) {
                                    margin: 0 0 15px 0;
                                }
                            `}</style>
                            <input
                                placeholder='Назва характеристики'
                                value={characteristicTitleValue} 
                                onChange={(e) => setCharacteristicTitleValue(e.target.value)}
                                className='admin_modal_input'
                            />
                            <input
                                placeholder='Опис характеристики'
                                value={characteristicContentValue} 
                                onChange={(e) => setCharacteristicContentValue(e.target.value)}
                                className='admin_modal_input'
                            />
                            <div onClick={createCharacteristic} className='admin_modal_button'>Додати</div>
                        </div> 
                    }
                </Modal>
                <Modal visible={isCharacteristicModalOpen} setVisible={setIsCharacteristicModalOpen}>
                    {loading ? <Loader /> :
                        <>
                            <div className='admin_modal'>
                                <style jsx>{`
                                    .admin_modal {
                                        flex-direction: column;
                                    }

                                    .admin_modal > input:not(:last-child) {
                                        margin: 0 0 15px 0;
                                    }
                                `}</style>
                                <input
                                    placeholder='Нова назва характеристики'
                                    value={characteristicTitleValue} 
                                    onChange={(e) => setCharacteristicTitleValue(e.target.value)}
                                    className='admin_modal_input'
                                />
                                <input
                                    placeholder='Новий опис характеристики'
                                    value={characteristicContentValue} 
                                    onChange={(e) => setCharacteristicContentValue(e.target.value)}
                                    className='admin_modal_input'
                                />
                                <div onClick={changeCharacteristic} className='admin_modal_button'>Застосувати</div>
                            </div> 
                            <div onClick={deleteCharacteristic} className='admin_modal_button admin_modal_button_delete'>Вилучити</div>
                        </>
                    }
                </Modal>
                <div onClick={() => setError('')} className={error ? 'admin_error-active admin_error' : 'admin_error' }>{error}</div>
            </div>
        </Layout>
    )
}
  
export default Admin;

export const getServerSideProps: GetServerSideProps = async () => {
    const products = await prisma.product.findMany();
    const categories = await prisma.category.findMany();
    const subcategories = await prisma.subcategory.findMany();
    const brands = await prisma.brand.findMany();
    const characteristics = await prisma.characteristic.findMany();
    
    return {
      props: { products, categories, subcategories, brands, characteristics }
    }
}