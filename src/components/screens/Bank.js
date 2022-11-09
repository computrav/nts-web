import { useNTS } from "../../hooks/useNTS";

const Bank = ({ bank }) => {
    const { setBank } = useNTS();

    return (        
        <div className="flex flex-col flex-1 justify-center items-center">
            <div className="grid grid-cols-4 grid-rows-4 w-full text-center">
                {
                    [...Array(16).keys()].map( (k) => <button onClick={() => setBank(k)} className={`btn-ghost hover:bg-accent hover:text-neutral h-full w-full ${k === parseInt(bank) && 'bg-accent text-neutral'}`} key={k}>{k < 10 && 0 }{k}</button>)
                }
            </div>
        </div>
    )
}

export default Bank;