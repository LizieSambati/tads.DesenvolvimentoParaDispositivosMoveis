import { useEffect, useCallback, useState } from 'react';
import { useDatabase } from '../app/database/service';
import getConditionInfo from './Condition';

export function useAttributes(id: number) {
    const [hunger, setHunger] = useState<number>(17);
    const [sleep, setSleep] = useState<number>(79);
    const [hygiene, setHygiene] = useState<number>(34);
    const [fun, setFun] = useState<number>(62);
    const [light, setLight] = useState<boolean>(true);

    const { getTamagotchiState, updateTamagotchi } = useDatabase();

    async function saveState() {
        const { message: condition } = getConditionInfo({ hunger, sleep, hygiene, fun });
        await updateTamagotchi(id, { hunger, sleep, hygiene, fun, condition, light });
    }

    function limit(value: number): number {
        return Math.max(0, Math.min(100, value));
    }

    const eat = useCallback(() => {
        setHunger(hunger => limit(hunger + 27));
        setHygiene(hygiene => limit(hygiene - 6));
        setFun(fun => limit(fun + 9));
    }, [hunger, hygiene, fun]);

    const clean = useCallback(() => {
        setHygiene(hygiene => limit(hygiene + 100));
        setFun(fun => limit(fun + 8));
    }, [hygiene, fun]);

    const play = useCallback(() => {
        setHunger(hunger => limit(hunger - 5));
        setSleep(sleep => limit(sleep - 2));
        setHygiene(hygiene => limit(hygiene - 5));
        setFun(fun => limit(fun + 30));
    }, [hunger, sleep, hygiene, fun]);

    const medicine = useCallback(() => {
        const { message: condition } = getConditionInfo({ hunger, sleep, hygiene, fun });
        if (condition === "Crítico") {
            setHunger(hunger => limit(hunger + 39));
            setSleep(sleep => limit(sleep + 45));
            setFun(fun => limit(fun + 34));
        }
    }, [hunger, sleep, fun]);

    const passTime = useCallback(() => {
        if (!light) {
            setHunger(hunger => limit(hunger - 2));
            setSleep(sleep => limit(sleep + 1));
            setHygiene(hygiene => limit(hygiene - 1));
            setFun(fun => limit(fun + 1));
        } else {
            setHunger(hunger => limit(hunger - 3));
            setSleep(sleep => limit(sleep - 1));
            setHygiene(hygiene => limit(hygiene - 1));
            setFun(fun => limit(fun - 1));
        }
        saveState();
    }, [light, hunger, sleep, hygiene, fun]);

    useEffect(() => {
        const timer = setInterval(passTime, 10000);
        return () => clearInterval(timer);
    }, [passTime]);

    async function fetchState() {
        const state = await getTamagotchiState(id);
        if (state) {
            setHunger(state.hunger);
            setSleep(state.sleep);
            setHygiene(state.hygiene);
            setFun(state.fun);
        }
    }

    return {
        hunger,
        sleep,
        hygiene,
        fun,
        eat,
        clean,
        play,
        medicine,
        light,
        setLight,
        fetchState,
        saveState,
    };
}
