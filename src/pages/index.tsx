import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import brands from '../images/index/brands/bg.jpg';
import whyAreWeIcon1 from '../images/index/whyAreWe/1.jpg';
import whyAreWeIcon2 from '../images/index/whyAreWe/2.jpg';
import whyAreWeIcon3 from '../images/index/whyAreWe/3.jpg';
import feedbackAboutUs1 from '../images/index/feedbackAboutUs/1.jpg';
import feedbackAboutUs2 from '../images/index/feedbackAboutUs/2.jpg';
import feedbackAboutUs3 from '../images/index/feedbackAboutUs/3.jpg';
import feedbackAboutUs4 from '../images/index/feedbackAboutUs/4.jpg';
import feedbackAboutUs5 from '../images/index/feedbackAboutUs/5.jpg';
import feedbackAboutUs6 from '../images/index/feedbackAboutUs/6.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { selectBurgerMenuState, setBurgerMenuState } from 'src/store/burgerMenuSlice';

function Index(): ReactElement {
    const router = useRouter();

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

    const [click, setClick] = useState(0);

    return (
        <Layout title='Про нас'>
            <div className='everythingForYou'>
                <div className='container'>
                    <div className='everythingForYou_inner'>
                        <div className='everythingForYou_inner_title'>Все що завгодно <br />для вас</div>
                        <div className='everythingForYou_inner_subtitle'>Ви можете замовити що завгодно залишив посилання з сторінці товара в інтернеті, а ми дбайливо все привеземо для вас</div>
                        <div className='everythingForYou_inner_button' onClick={() => router.push('/order')}>Замовити</div>
                    </div>
                </div>
            </div>
            <div className='brands'>
                <div className='brands_background'>
                    <Image src={brands} />
                </div>
            </div>
            <div className='whyAreWe'>
                <div className='container'>
                    <div className='whyAreWe_inner'>
                        <div className='whyAreWe_inner_title'>Чому ми варті уваги?</div>
                        <div className='whyAreWe_inner_cards'>
                            <div className='whyAreWe_inner_cards_card'>
                                <Image src={whyAreWeIcon1} width={200} height={200} />
                                <div className='whyAreWe_inner_cards_card_title'>Що завгодно звідки <br />завгодно</div>
                                <div className='whyAreWe_inner_cards_card_subtitle'>Ви з легкістю можете замовити запчастину яку ви не знайдете ніде в іншому місті</div>
                            </div>
                            <div className='whyAreWe_inner_cards_card'>
                                <Image src={whyAreWeIcon2} width={200} height={200} />
                                <div className='whyAreWe_inner_cards_card_title'>Доставка по всій <br />Україні</div>
                                <div className='whyAreWe_inner_cards_card_subtitle'>Наш магазин працює та приймає замовлення по всій країні, ми турботливо доставимо вам товар на відділеня пошти, а якщо ви в Запоріжжі, навіть до двері</div>
                            </div>
                            <div className='whyAreWe_inner_cards_card'>
                                <Image src={whyAreWeIcon3} width={200} height={200} />
                                <div className='whyAreWe_inner_cards_card_title'>Низькі ціни за <br />товар</div>
                                <div className='whyAreWe_inner_cards_card_subtitle'>Ви не робите переплату. Ціна вашого замовлення буде більша ніж на європейському сайті, але набагато нижче, ніж в веломагазині</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='anythingForYourHobby'>
                <div className='container'>
                    <div className='anythingForYourHobby_inner'>
                        <div className='anythingForYourHobby_inner_title'>Преміальний магазин</div>
                        <div className='anythingForYourHobby_inner_subtitle'>На сторінці магазину ви можете побачити добірку брендів та товарів, яких ніколи не було в Україні</div>
                        <div className='anythingForYourHobby_inner_button' onClick={() => router.push('/shop')}>В Магазин</div>
                    </div>
                </div>
            </div>
            <div className='feedbackAboutUs'>
                <div className='container'>
                    <div className='feedbackAboutUs_title'>Відгуки про нас</div>
                    <div className='feedbackAboutUs_cards'>
                        <div className='feedbackAboutUs_cards_view'>
                            {click === 0 ? <></> : <div onClick={() => setClick(click - 1)} className='feedbackAboutUs_cards_view_leftArrow'>
                                <div className='feedbackAboutUs_cards_view_leftArrow_arrow'></div>
                            </div>}
                            {click === 5 ? <></> : <div onClick={() => setClick(click + 1)} className='feedbackAboutUs_cards_view_rightArrow'>
                                <div className='feedbackAboutUs_cards_view_rightArrow_arrow'></div>
                            </div>}
                        </div>
                        {click === 0 ? 
                            <div className='feedbackAboutUs_cards_card-mobile'>
                                <div className='feedbackAboutUs_cards_card-mobile_img'>
                                    <Image src={feedbackAboutUs1} width={75} height={75} />
                                </div>
                                <div className='feedbackAboutUs_cards_card-mobile_content'>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_title'>Андрій</div>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_subtitle'>Дуже хотів оновити свій старий пайк але ніде не мог знайти потрібну пружину DebonAir, але магазин Reibike з легкістью підібрав для мене її і через 3 тижні я вже катався на новій пружинці</div>
                                </div>
                            </div> : <></>
                        }
                        {click === 1 ? 
                            <div className='feedbackAboutUs_cards_card-mobile'>
                                <div className='feedbackAboutUs_cards_card-mobile_img'>
                                    <Image src={feedbackAboutUs2} width={75} height={75} />
                                </div>
                                <div className='feedbackAboutUs_cards_card-mobile_content'>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_title'>Кирилл</div>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_subtitle'>Довго шукав гарну вилку під ексцентрик, ніде не було в наявності, але я наткнувся на цей сайт і спокійно замовив вилку, та ось через місяць обновка була вже в мене</div>
                                </div>
                            </div> : <></>
                        }
                        {click === 2 ? 
                            <div className='feedbackAboutUs_cards_card-mobile'>
                                <div className='feedbackAboutUs_cards_card-mobile_img'>
                                    <Image src={feedbackAboutUs3} width={75} height={75} />
                                </div>
                                <div className='feedbackAboutUs_cards_card-mobile_content'>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_title'>Антон</div>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_subtitle'>Ломав голову над тим, де мені зібрати дертовий велосипед на топових комплектуючих і недорого, знайшов цей магазин і замовив, все чітко</div>
                                </div>
                            </div> : <></>
                        }
                        {click === 3 ? 
                            <div className='feedbackAboutUs_cards_card-mobile'>
                                <div className='feedbackAboutUs_cards_card-mobile_img'>
                                    <Image src={feedbackAboutUs4} width={75} height={75} />
                                </div>
                                <div className='feedbackAboutUs_cards_card-mobile_content'>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_title'>Арсеній</div>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_subtitle'>Шукав потрібний амортизатор, магазин reibike допоміг мені з цим, і я тепер можу кататися</div>
                                </div>
                            </div> : <></>
                        }
                        {click === 4 ? 
                            <div className='feedbackAboutUs_cards_card-mobile'>
                                <div className='feedbackAboutUs_cards_card-mobile_img'>
                                    <Image src={feedbackAboutUs5} width={75} height={75} />
                                </div>
                                <div className='feedbackAboutUs_cards_card-mobile_content'>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_title'>Іван</div>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_subtitle'>Замовляв собі раму yeti, бренд дорогий, у нас ніде немає такої, особливо в потрібному розмірі, але магазин reibike привіз мені раму в цілісності та безпеці</div>
                                </div>
                            </div> : <></>
                        }
                        {click === 5 ? 
                            <div className='feedbackAboutUs_cards_card-mobile'>
                                <div className='feedbackAboutUs_cards_card-mobile_img'>
                                    <Image src={feedbackAboutUs6} width={75} height={75} />
                                </div>
                                <div className='feedbackAboutUs_cards_card-mobile_content'>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_title'>Давид</div>
                                    <div className='feedbackAboutUs_cards_card-mobile_content_subtitle'>Потрібні були покришки та обода, в Україні не було скрізь, знайшов цей сервіс і за посиланням оформив замовлення, все отримав, дякую</div>
                                </div>
                            </div> : <></>
                        }
                        <div className='feedbackAboutUs_cards_card'>
                            <div className='feedbackAboutUs_cards_card_img'>
                                <Image src={feedbackAboutUs1} width={75} height={75} />
                            </div>
                            <div className='feedbackAboutUs_cards_card_content'>
                                <div className='feedbackAboutUs_cards_card_content_title'>Андрій</div>
                                <div className='feedbackAboutUs_cards_card_content_subtitle'>Дуже хотів оновити свій старий пайк але ніде не мог знайти потрібну пружину DebonAir, але магазин Reibike з легкістью підібрав для мене її і через 3 тижні я вже катався на новій пружинці</div>
                            </div>
                        </div>
                        <div className='feedbackAboutUs_cards_card'>
                            <div className='feedbackAboutUs_cards_card_img'>
                                <Image src={feedbackAboutUs2} width={75} height={75} />
                            </div>
                            <div className='feedbackAboutUs_cards_card_content'>
                                <div className='feedbackAboutUs_cards_card_content_title'>Кирилл</div>
                                <div className='feedbackAboutUs_cards_card_content_subtitle'>Довго шукав гарну вилку під ексцентрик, ніде не було в наявності, але я наткнувся на цей сайт і спокійно замовив вилку, та ось через місяць обновка була вже в мене</div>
                            </div>
                        </div>
                        <div className='feedbackAboutUs_cards_card'>
                            <div className='feedbackAboutUs_cards_card_img'>
                                <Image src={feedbackAboutUs3} width={75} height={75} />
                            </div>
                            <div className='feedbackAboutUs_cards_card_content'>
                                <div className='feedbackAboutUs_cards_card_content_title'>Антон</div>
                                <div className='feedbackAboutUs_cards_card_content_subtitle'>Ломав голову над тим, де мені зібрати дертовий велосипед на топових комплектуючих і недорого, знайшов цей магазин і замовив, все чітко</div>
                            </div>
                        </div>
                        <div className='feedbackAboutUs_cards_card'>
                            <div className='feedbackAboutUs_cards_card_img'>
                                <Image src={feedbackAboutUs4} width={75} height={75} />
                            </div>
                            <div className='feedbackAboutUs_cards_card_content'>
                                <div className='feedbackAboutUs_cards_card_content_title'>Арсеній</div>
                                <div className='feedbackAboutUs_cards_card_content_subtitle'>Шукав потрібний амортизатор, магазин reibike допоміг мені з цим, і я тепер можу кататися</div>
                            </div>
                        </div>
                        <div className='feedbackAboutUs_cards_card'>
                            <div className='feedbackAboutUs_cards_card_img'>
                                <Image src={feedbackAboutUs5} width={75} height={75} />
                            </div>
                            <div className='feedbackAboutUs_cards_card_content'>
                                <div className='feedbackAboutUs_cards_card_content_title'>Іван</div>
                                <div className='feedbackAboutUs_cards_card_content_subtitle'>Замовляв собі раму yeti, бренд дорогий, у нас ніде немає такої, особливо в потрібному розмірі, але магазин reibike привіз мені раму в цілісності та безпеці</div>
                            </div>
                        </div>
                        <div className='feedbackAboutUs_cards_card'>
                            <div className='feedbackAboutUs_cards_card_img'>
                                <Image src={feedbackAboutUs6} width={75} height={75} />
                            </div>
                            <div className='feedbackAboutUs_cards_card_content'>
                                <div className='feedbackAboutUs_cards_card_content_title'>Давид</div>
                                <div className='feedbackAboutUs_cards_card_content_subtitle'>Потрібні були покришки та обода, в Україні не було скрізь, знайшов цей сервіс і за посиланням оформив замовлення, все отримав, дякую</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
  
export default Index;