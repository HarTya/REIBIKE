import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Logo from './UI/icons/LogoIcon';
import TelephoneIcon from './UI/icons/TelephoneIcon';
import InstagramIcon from './UI/icons/InstagramIcon';
import MailIcon from './UI/icons/MailIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketState, setBasketState } from 'src/store/basketSlice';

function Footer(): ReactElement {
    const router = useRouter();

    const basketState = useSelector(selectBasketState);
    const dispatch = useDispatch();

    return (
        <footer className='footer'>
            <div className='footer_inner'>
                <div className='footer_inner_logo'><Logo /></div>
                <div className='footer_inner_help'>
                    <div className='footer_inner_help_title'>Якщо ви маєте труднощі, пишить нам, <br />ми зробимо все можливе!</div>
                    <div className='footer_inner_help_contact'><a href='https://t.me/reibike_bot' target={'_blank'}>@REIBIKE Support</a></div>
                </div>
                <div className='footer_inner_quickLinks'>
                    <div className='footer_inner_quickLinks_pages'>
                        <div className={router.asPath === '/' ? 'footer_inner_quickLinks_pages_page-active footer_inner_quickLinks_pages_page' : 'footer_inner_quickLinks_pages_page'} onClick={() => router.push('/')}>Про нас</div>
                        <div className={router.asPath === '/shop' ? 'footer_inner_quickLinks_pages_page-active footer_inner_quickLinks_pages_page' : 'footer_inner_quickLinks_pages_page'} onClick={() => router.push('/shop')}>Магазин</div>
                        <div className={router.asPath === '/order' ? 'footer_inner_quickLinks_pages_page-active footer_inner_quickLinks_pages_page' : 'footer_inner_quickLinks_pages_page'} onClick={() => router.push('/order')}>Замовити</div>
                    </div>
                    <div className='footer_inner_quickLinks_other'>
                        <div className={basketState ? 'footer_inner_quickLinks_other_item-active footer_inner_quickLinks_other_item' : 'footer_inner_quickLinks_other_item'} onClick={() => dispatch(setBasketState(true))}>Кошик</div>
                    </div>
                </div>
                <div className='footer_inner_information'>
                    <div className='footer_inner_information_contacts'>
                        <div className='footer_inner_information_contacts_contact'>
                            <TelephoneIcon />
                            <div className='footer_inner_information_contacts_contact_text'><a href='tel:+380996252092'>0996252092</a></div>
                        </div>
                        <div className='footer_inner_information_contacts_contact'>
                            <InstagramIcon />
                            <div className='footer_inner_information_contacts_contact_text'><a href='https://www.instagram.com/reibike_shop_ua/' target={'_blank'}>@reibike_shop_ua</a></div>
                        </div>
                        <div className='footer_inner_information_contacts_contact'>
                            <MailIcon />
                            <div className='footer_inner_information_contacts_contact_text'><a href='mailto:reibike.contact@gmail.com' target={'_blank'}>reibike.contact@gmail.com</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='help_ua'><a href='https://shtd.org/' target={'_blank'}><span>Волонтерська група</span> “Шо ти, Дядя?”</a></div>
        </footer>
    )
}

export default Footer;