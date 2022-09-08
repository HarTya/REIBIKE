import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

function Logo(): ReactElement {

    const router = useRouter();

    return (
        <div onClick={() => router.push('/')} className='logo'>REIBIKE</div>
    )
}
  
export default Logo;