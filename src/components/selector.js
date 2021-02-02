import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { midiControlChange } from '../utils/midi';
import { pathToStore } from '../utils/store';

import selector from '../assets/selector.png';

export function Selector(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    const control = useRef(null);
    
    useEffect( () => {
      const current = control.current;
      current.addEventListener("input", (event) => {
        dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, event.target.value) })
      }); 
    }, [props.path, dispatch])

    useEffect( () => {
      const val = props.value >= props.max - props.offset ? 127 : props.vstep * (props.value);
      if( control.current.value !== props.value) control.current.value = props.value;  
      if( props.active ) midiControlChange(props.cc, val, midiConfig.outputDevice, midiConfig.outputChannel);
    }, [props.values, props.cc, props.active, props.value, props.vstep, props.absolute, midiConfig]);

    useEffect( () => {
      const current = control.current;
      current.max = props.max - props.offset
    }, [props.max])
    
    return  (
        <div className='selector-wrapper'>   
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }      
          <webaudio-knob
            ref={control} 
            className="selector" 
            diameter="60" 
            id={props.name + props.cc} 
            name={props.name} 
            src={selector} 
            step={props.step} 
            vstep={props.vstep}
            min={ props.min } 
            max={ props.max - props.offset } 
            value={props.value}>              
          </webaudio-knob>
        </div>
    );
}

Selector.defaultProps = {
    name: null,
    cc: null,
    value: 1,
    step: 1,
    min: 0,
    max: 5,
    active: true,
    values: [],
    path: null,
    offset: 0
};