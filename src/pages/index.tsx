import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import brands from '../images/index/brands/bg.jpg';
import whyAreWeIcon1 from '../images/index/whyAreWe/1.jpg';
import whyAreWeIcon2 from '../images/index/whyAreWe/2.jpg';
import whyAreWeIcon3 from '../images/index/whyAreWe/3.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { selectBurgerMenuState, setBurgerMenuState } from 'src/store/burgerMenuSlice';
import IndexArrow from 'src/components/UI/icons/IndexArrow';

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

    return (
        <Layout title='Головна'>
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
            <div className='messageFromOwner'>
                <div className='container'>
                    <div className='messageFromOwner_inner'>
                        <div className='messageFromOwner_inner_avatar'></div>
                        <div className='messageFromOwner_inner_content'>
                            <p className='messageFromOwner_inner_name'>Антон</p>
                            <p className='messageFromOwner_inner_title'>засновник <span>REIBIKE</span></p>
                            <p className='messageFromOwner_inner_subtitle'>“У Запоріжжі, особисто мене знає багато людей. Я вже 2 роки займаюсь привозом детальок, і лише зараз зібрав команду людей які будуть вести інстаграм та робити сайт, вважаю треба монетизувати те що подобається)”</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='whyAreWe'>
                <div className='container'>
                    <div className='whyAreWe_inner'>
                        <div className='whyAreWe_inner_title'>Як ми працюємо?</div>
                        <div className='whyAreWe_inner_cards'>
                            <div className='whyAreWe_inner_cards_card'>
                                <Image src={whyAreWeIcon3} width={200} height={200} />
                                <div className='whyAreWe_inner_cards_card_text'>Ви відправляєте нам посилання та робите передоплату</div>
                            </div>
                            <div className='whyAreWe_inner_cards_arrow'><IndexArrow /></div>
                            <div className='whyAreWe_inner_cards_card'>
                                <Image src={whyAreWeIcon2} width={200} height={200} />
                                <div className='whyAreWe_inner_cards_card_text'>Товар їде з будь якої країни у місто Запоріжжя</div>
                            </div>
                            <div className='whyAreWe_inner_cards_arrow'><IndexArrow /></div>
                            <div className='whyAreWe_inner_cards_card'>
                                <Image src={whyAreWeIcon1} width={200} height={200} />
                                <div className='whyAreWe_inner_cards_card_text'>Ми відправляємо вам ваш товар або особисто віддаємо</div>
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
        </Layout>
    )
}
  
export default Index;