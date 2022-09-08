import React, { ReactElement } from 'react';

function Loader({ white = false }): ReactElement {
    return (
        <div className={white ? 'loader loader-white' : 'loader'}>
            <span className='loader_span'></span>
        </div>  
    )
}
  
export default Loader;