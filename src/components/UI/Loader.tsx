import React, { ReactElement } from 'react';

function Loader({ white = false }): ReactElement {
    return (
        <div className='loader'>
            <div className={white ? 'loader-line loader-line--1 loader-line-white' : 'loader-line loader-line--1'}>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--left'></div>
                </div>
                <div className='loader-line-ticker'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--center'></div>
                </div>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--right'></div>
                </div>
            </div>
            <div className='loader-line loader-line--2'>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--left'></div>
                </div>
                <div className='loader-line-ticker'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--center'></div>
                </div>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--right'></div>
                </div>
            </div>
            <div className={white ? 'loader-line loader-line--3 loader-line-white' : 'loader-line loader-line--3'}>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--left'></div>
                </div>
                <div className='loader-line-ticker'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--center'></div>
                </div>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--right'></div>
                </div>
            </div>
            <div className='loader-line loader-line--4'>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--left'></div>
                </div>
                <div className='loader-line-ticker'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--center'></div>
                </div>
                <div className='loader-line-cog'>
                    <div className='loader-line-cog-inner loader-line-cog-inner--right'></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;