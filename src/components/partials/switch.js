import React, { useEffect, useRef } from 'react';

import button from '../../assets/button.png';

export function Switch(props) {
    const control = useRef(null);
    const onChange = (event) => props.onChange(props.cc, { active: event.target.value, value: event.target.value ? props.value : props.switch });

    useEffect(() => {
        const current = control.current;
        current.addEventListener("change", onChange);  
        if( current.value !== props.active){
            current.value = props.active;
        }   
        return () => current.removeEventListener("change", onChange);   
    }, [props.value]);

    return  (
        <span className="text-light switch-button">
            <webaudio-switch 
                ref={control}
                src={button}
                id={ props.label + '-btn' }
                value={ props.active }>
            </webaudio-switch> { props.tag ? props.label : ''}
        </span>
    );
}

Switch.defaultProps = {
    label: null,
    tag: false,
    cc: null,
    switch: 0,
    active: 0,
    value: 0
};