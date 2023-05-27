import React from 'react';
//methods
import { useCountdown } from '../hooks/UseCountdown';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/UseFetch';
//components
import SvgIcon from './core/SvgIcon';

export default function CountDown({targetDate, message}) {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 5000)
    },[])

    return (
        <>
        <div className={`countdown ${!isVisible && "hidden"}`}>
            {days + hours + minutes + seconds > 0 &&
                <>
                <div className="countdown__message">{message}</div>
                <div className="countdown__counter">
                    <div className='countdown__time countdown__time--days'>
                        {days}
                        <span>Dnů</span>
                    </div>
                    <div className='countdown__time countdown__time--hours'>
                        {hours}
                        <span>Hodin</span>
                    </div>
                    <div className='countdown__time countdown__time--minutes'>
                        {minutes}
                        <span>Minut</span>
                    </div>
                    <div className='countdown__time countdown__time--seconds'>
                        {seconds}
                        <span>Vteřin</span>
                    </div>
                </div>
                </>
            }
            <div className="countdown__close" onClick={ () => {setIsVisible(false)}}>
                <SvgIcon svgName={"cancel"}/>
            </div>
        </div>
    </>
    )
};