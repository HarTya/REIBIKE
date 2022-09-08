import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { setBasketState } from 'src/store/basketSlice';
import BasketIcon from './icons/BasketIcon';
import ExitCross from './icons/ExitCrossIcon';

function Modal({ children, visible, setVisible }): ReactElement {

    const dispatch = useDispatch();

    function crossFunction() {
        setVisible(false)
        dispatch(setBasketState(false))
    }

    return (
        <div 
            onClick={() => {setVisible(false); dispatch(setBasketState(false))}} 
            className={visible ? 'modal-active modal' : 'modal'}
        >
            {visible ? <style jsx global>{`
                body {
                    overflow: hidden!important;
                }
                #__next {
                    overflow: hidden!important;
                }
            `}</style> : <></>}
            <div 
                className='modal_content' 
                onClick={(e) => e.stopPropagation()}
            >
                <ExitCross crossFunction={crossFunction} />
                {children}
            </div>
        </div>
    )
}

export default Modal;