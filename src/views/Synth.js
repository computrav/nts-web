import { Suspense, lazy, useState } from "react";

import Display from "../components/layout/Display";
import More from "../components/layout/More";
import Section from "../components/layout/Section"
import { defaultLayout } from "../config/layout";
import { useMidi } from "../hooks/useMidi";
import { useNTS } from "../hooks/useNTS";

const Synth = () => {
    const { enabled, input, output, passthrough, octave } = useMidi();
    const { bank } = useNTS();
    const [ command, setCommand ] = useState("bank");

    const selectScreen = (command) => {
        let Screen = () => { return (<div className="flex-1"></div>) }

        switch (command){
            case "bank":
                Screen = lazy(() => import('../components/screens/Bank'));
                break;
            default:
                break;
        }

        return <Screen />
    }

    return (        
        <div className="grid w-full h-full xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-auto gap-8 grid-flow-row">
            <div className="flex flex-col">
                <Display bank={ bank } midi={ enabled } octave={ octave } devices={{ input, output, passthrough }}>
                    <Suspense fallback={<div className="flex-1"></div>}>
                        { selectScreen(command) }
                    </Suspense>
                </Display>
                <Section section={defaultLayout.osc} />
                <Section section={defaultLayout.arp} />
            </div>
            <div className="flex flex-col">
                <Section section={defaultLayout.amp} />
            </div>
            <div className="flex flex-col">
                <Section section={defaultLayout.effects} />
            </div>
            <div className="flex flex-col">
                <Section section={defaultLayout.vcf} />
                <More />
            </div>
        </div>
    )
}

export default Synth;