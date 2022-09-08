import React, { ReactElement } from 'react';

function ExitCross({ crossFunction }): ReactElement {
    return (
        <div onClick={() => crossFunction()} className='cross'></div>
    )
}
  
export default ExitCross;