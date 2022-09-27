import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/UI/Loader';
import { orderService } from 'src/services/order.service';
import { selectBurgerMenuState, setBurgerMenuState } from 'src/store/burgerMenuSlice';
import Layout from '../components/Layout';
import Image from 'next/image';
import Website1 from '../images/order/websites/1.jpeg';
import Website2 from '../images/order/websites/2.jpeg';
import Website3 from '../images/order/websites/3.jpeg';
import Website4 from '../images/order/websites/4.jpeg';

function Order(): ReactElement {
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

    const [link, setLink] = useState('');
    const [contact, setContact] = useState('');
    const [comment, setComment] = useState('')

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setLink('')
        setContact('')
        setComment('')
    }, [success])

    const [error, setError] = useState('');

    const orderLink = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess('')
        setError('')
        
        return orderService.orderLink(contact, link, comment)
            .then(() => {
                setLoading(false)
                setSuccess(`Замовлення відправлено, ми зв'яжемося з вами за вказаними контактними даними`)
            })      
            .catch(error => {
                setLoading(false)
                setError(error)
            });
    };

    return (
        <Layout title='Замовити'>
            <div className='order'>
                <div className='container'>
                    <div className='order_inner'>
                        <div className='order_inner_title'>Як я можу замовити щось особливе?</div>
                        <div className='order_inner_subtitle'>Наш веломагазин привезе вам що завгодно, просто залиште посилання на сайт запчастини чи велосипеда та напишіть комментарій до замовлення</div>
                        {loading ? <Loader white={true} /> :
                            <>
                                <div className='order_inner_inputs'>
                                    <div>
                                        <input
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            onClick={() => setError('')}
                                            className='order_inner_inputs_inputLink'
                                        />
                                        {link.length ? <></> : <p className='order_inner_inputs_inputLink_placeholder'>Вставьте посилання сюди</p>}
                                    </div>
                                    <div>
                                        <input
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            onClick={() => setError('')}
                                            className='order_inner_inputs_inputContact'
                                        />
                                        {contact.length ? <></> : <p className='order_inner_inputs_inputContact_placeholder'>Пошта або номер телефону</p>}
                                    </div>
                                    <div>
                                        <textarea 
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            onClick={() => setError('')}
                                            className='order_inner_inputs_inputComment'
                                        />
                                        {comment.length ? <></> : <p className='order_inner_inputs_inputComment_placeholder'>Напишіть будь ласка комментарій до замовлення</p>}
                                    </div>
                                </div>
                                <div className='order_inner_button' onClick={(e) => orderLink(e)}>Замовити</div>
                            </>
                        }
                    </div>
                    <div className='recommendedWebsites'>
                        <div className='recommendedWebsites_title'>Рекомендовані сайти для пошуку товару</div>
                        <div className='recommendedWebsites_websites'>
                            <div className='recommendedWebsites_websites_website'><a href='https://www.bike24.com' target={'_blank'}><Image src={Website1} width={300} height={174} /></a></div>
                            <div className='recommendedWebsites_websites_website'><a href='https://www.bike-discount.de/' target={'_blank'}><Image src={Website2} width={300} height={174} /></a></div>
                            <div className='recommendedWebsites_websites_website'><a href='https://www.bike-components.de/en/' target={'_blank'}><Image src={Website3} width={300} height={174} /></a></div>
                            <div className='recommendedWebsites_websites_website'><a href='https://www.chainreactioncycles.com/us/en' target={'_blank'}><Image src={Website4} width={300} height={174} /></a></div>
                        </div>
                    </div>
                </div>
                <div onClick={() => setSuccess('')} className={success ? 'order_success-active order_success' : 'order_success' }>{success}</div>
                <div onClick={() => setError('')} className={error ? 'order_error-active order_error' : 'order_error' }>{error}</div>
            </div>
        </Layout>
    )
}
  
export default Order;