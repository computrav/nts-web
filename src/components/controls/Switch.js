import { useEffect, useRef, useState } from "react";

import switchButton from "../../assets/switch.png";

const Switch = ({ isActive = false, isMomentary = false, label, onChange }) => {
    const [ active, setActive ] = useState(isActive || false);
    
    const switchRef = useRef(null);
    const toggle = (e) => {
        setActive(a => !a);
    };

    const handleValue = (e) => {        
        !isMomentary && setActive(e.value);
    }

    useEffect(() => {
        // onChange(active)
    }, [active, onChange])

    useEffect(() => {
        if(!isMomentary) return;
        const currentSwitch = switchRef.current;
        currentSwitch.addEventListener("mousedown", toggle);
        currentSwitch.addEventListener("mouseup", toggle);
        currentSwitch.addEventListener("touchstart", toggle);        
        currentSwitch.addEventListener("touchend", toggle);

        return () => {
            currentSwitch.removeEventListener("mousedown", toggle);
            currentSwitch.removeEventListener("mouseup", toggle);
            currentSwitch.removeEventListener("touchstart", toggle);        
            currentSwitch.removeEventListener("touchend", toggle);
        }
    }, [isMomentary])

    return (
        <span className="flex flex-col items-center justify-center">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <input 
                ref={switchRef}
                type="checkbox"
                className="input-switch"
                data-diameter="60"
                data-src={ switchButton }
                checked={ active }
                onChange={ handleValue }
            />
        </span>
    )
}

export default Switch;