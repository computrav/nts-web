import React from 'react';
import { Space, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

export function Display() { 
    const isLoading = useSelector(state => state.loader).value;
    const controlValues = useSelector(state => state.synthesizer).value;
    const screen = useSelector(state => state.display).value;

    const renderLine = (values) => {
        let line = [];
        Object.keys(values).forEach( (key) => {
            if(key !== "active") line.push(<Col className="line" span={6}>{key}: {values[key]}</Col>);
        })
       
        return line;
    }

    const renderDisplay = (values) => {
        let content;

        switch(screen){
            case "welcome":
                content = (                    
                    <Col>
                        <h2>WELLCOME TO NTS-WEB</h2> 
                        <p>If you like it, please, support me by buying me a coffee.</p>
                        <p>Link at the bottom.</p>
                    </Col>                    
                )
                break;
            case "link":
                content = (                    
                    <Col>
                        <h2>LINK COPIED TO CLIPBOARD</h2> 
                        <p>Go and share it with your firends.</p>
                    </Col>                    
                )
                break;
            case "import":
                content = (                    
                    <Col>
                        <h2>PATCH IMPORTED</h2> 
                        <p>Your patch has been successfully imported.</p>
                    </Col>                    
                )
                break;
            default:
                content = [
                    <Col span={24}><h2 className="title">{screen}</h2></Col>
                ];
        
                Object.keys(values[screen]).forEach( (key) => {
                    if(typeof values[screen][key] === "object"){
                        content.push(
                            <Col span={24}>
                                <Row>
                                    <Col span={24}><h3 className="line bordered">{key}</h3></Col>
                                    {renderLine(values[screen][key])}
                                </Row>
                            </Col>
                        );
                    }else{
                        if(key !== "active" && key !== "type"){
                            content.push(
                                <Col span={6}>
                                    {key} : {values[screen][key]}
                                </Col>
                            )
                        }
                    }
                });
        
                break;
        }

        return (
            <Row className="text-lcd">
                {content}
            </Row>
        )
    }

    return  (
        <Space align="start" className="display bg-grid">
            { isLoading ? 
                <h2 className="text-lcd">PLEASE, ALLOW THE APP TO USE YOUR MIDI DEVICES</h2> 
                : renderDisplay(controlValues)
            }
        </Space>
    );
}