import React from 'react';
import { Layout } from 'antd';
import { Pianoroll, Controls }  from './components';
import { useSelector } from 'react-redux';

export function Sequencer() {
  const { Content } = Layout;
  const seqValues = useSelector(state => state.sequencer).value;

  return (
    <Content className="main transparent">
      <Controls play={seqValues.play} loop={seqValues.loop} tempo={seqValues.tempo} />
      <Pianoroll play={seqValues.play} loop={seqValues.loop} tempo={seqValues.tempo} />
    </Content>
  );
}