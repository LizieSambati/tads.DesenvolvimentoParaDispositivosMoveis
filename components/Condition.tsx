import { useState, useEffect } from 'react';

type AttributesProps = {
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
};

export const Condition = ({ hunger, sleep, hygiene, fun }: AttributesProps) => {

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        let status: number = hunger + sleep + hygiene + fun;
        let action: () => void;

        const dead = () => {
            setMessage("Morto");
        };
        const critical = () => {
            setMessage("Crítico");
        };
        const verySad = () => {
            setMessage("Muito Triste");
        };
        const sad = () => {
            setMessage("Triste");
        };
        const ok = () => {
            setMessage("Ok");
        };
        const good = () => {
            setMessage("Bem");
        };
        const veryGood = () => {
            setMessage("Muito Bem");
        };

        if (status <= 0) {
            action = dead;
        } else if (status <= 66) {
            action = critical;
        } else if (status <= 132) {
            action = verySad;
        } else if (status <= 198) {
            action = sad;
        } else if (status <= 264) {
            action = ok;
        } else if (status <= 330) {
            action = good;
        } else {
            action = veryGood;
        }

        action();
    }, [hunger, sleep, hygiene, fun]);

    return { message };
};
export default Condition;