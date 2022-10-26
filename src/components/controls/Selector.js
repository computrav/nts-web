import { useEffect, useRef, useState } from "react";

import selector from "../../assets/selector.png";

const Selector = ({defaultValue = 0, minValue = 0, maxValue = 10, label, onChange}) => {
    const [ value, setValue ] = useState(defaultValue ? defaultValue : minValue);
    const selectorRef = useRef(null);
    
    const handleValue = (e) => {
        const val = Math.ceil(e.target.value);
        setValue(val);
        selectorRef.current.value = val;
        // onChange(val);
    }

    useEffect(() => {
        const currentKnob = selectorRef.current;

        currentKnob.addEventListener("change", handleValue)        
        currentKnob.addEventListener("input", handleValue)

        return () => {
            currentKnob.removeEventListener("change", handleValue)        
            currentKnob.removeEventListener("input", handleValue)
        }
    }, [])

    return (
        <span className="flex flex-col items-center justify-center">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <input 
                ref={selectorRef}
                type="range"
                name={label}
                className="input-knob focus-visible:ring-offset-0"
                data-src={ selector }
                data-sprites="23"
                diameter="90" 
                value={ value }
                min={ minValue }
                max={ maxValue }
                step={ 0.2 }
                onChange={ handleValue }
            />
        </span>
    )
}

export default Selector;