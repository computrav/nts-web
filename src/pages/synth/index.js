import React, { useEffect } from 'react';
import { Layout, Row, Col, Collapse} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Display } from '../../components';
import { Amplifier, Arpegiator, Effects, More, Oscilator, Vcfilter, Live } from './components';

import { midiListenControlChange } from '../../utils/midi';
import { pathToStore } from '../../utils/store';

import { cc } from '../../config/midi';

export function Synth() {
  const { Panel } = Collapse;
  const { Content } = Layout;
  const dispatch = useDispatch();
  const midiConfig = useSelector(state => state.midi).value;

  const setDisplay = (screen) => {
    dispatch({type:'display/setDisplay', payload: { screen }});
  }

  const setControl = (midi) => {
    dispatch({type:'synthesizer/setControl', payload: pathToStore({}, cc[midi.data[1]], midi.value)});
  }

  useEffect(() => {
    if(midiConfig.inputDevice) midiListenControlChange(setControl, midiConfig.inputDevice, midiConfig.inputChannel);
    return () => midiListenControlChange(setControl, midiConfig.inputDevice, midiConfig.inputChannel, false);
  }, [midiConfig])

  return (
    <Content className="main transparent">
        <Row justify="space-between" align="top" gutter={[0,20]} onMouseLeave={ () => setDisplay("welcome")}>
          <Col span={24} md={12} lg={6}>
            <Display />
            <Row justify="space-between" align="top">
              <Col span={24} onMouseEnter={ () => setDisplay("osc")}>
                <Oscilator />
              </Col>
              <Col span={24} onMouseEnter={ () => setDisplay("arp")}>
                <Arpegiator />
              </Col>
            </Row>
          </Col>          
          <Col span={24} md={10} lg={4} onMouseEnter={ () => setDisplay("amp")}>            
            <Amplifier />
          </Col>
          <Col span={24} md={12} lg={6} onMouseEnter={ () => setDisplay("effects")}>
            <Effects />
          </Col>          
          <Col span={24} md={10} lg={4} onMouseEnter={ () => setDisplay("vcf")}>
            <Vcfilter />
            <More />
          </Col>
        </Row>
        <Collapse className="transparent"  bordered={false} >
          <Panel showArrow={false} header={ <span className='text-gold'><strong >Live controls</strong></span> } key="1">
            <Live />
          </Panel>
        </Collapse>
    </Content>
  );
}