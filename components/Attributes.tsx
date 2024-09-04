import React, { useEffect, useState, useCallback, useRef } from "react";

type AttributesType = {
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
    eat: () => void;
    clean: () => void;
    play: () => void;
    medicine: () => void;
    light: boolean;
    setLight: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Attributes = (): AttributesType => {

    const [hunger, setHunger] = useState<number>(50);
    const [sleep, setSleep] = useState<number>(50);
    const [hygiene, setHygiene] = useState<number>(50);
    const [fun, setFun] = useState<number>(50);
    const [light, setLight] = useState<boolean>(true);

    const limit = (value: number) => {
        if (value > 100) return 100;
        if (value < 0) return 0;
        return value;
    };

    const eat = useCallback(() => {
        setHunger(limit(hunger + 50));
        setSleep(limit(sleep + 0));
        setHygiene(limit(hygiene - 20));
        setFun(limit(fun + 15));
    }, [
        setHunger, hunger,
        setSleep, sleep,
        setHygiene, hygiene,
        setFun, fun
    ]);

    const clean = useCallback(() => {
        setHunger(limit(hunger + 0));
        setSleep(limit(sleep + 0));
        setHygiene(limit(hygiene + 75));
        setFun(limit(fun + 10));
    }, [
        setHunger, hunger,
        setSleep, sleep,
        setHygiene, hygiene,
        setFun, fun
    ]);

    const play = useCallback(() => {
        setHunger(limit(hunger - 5));
        setSleep(limit(sleep - 10));
        setHygiene(limit(hygiene - 5));
        setFun(limit(fun + 30));
    }, [
        setHunger, hunger,
        setSleep, sleep,
        setHygiene, hygiene,
        setFun, fun
    ]);

    const medicine = useCallback(() => {
        setHunger(limit(hunger + 75));
        setSleep(limit(sleep + 75));
        setHygiene(limit(hygiene + 0));
        setFun(limit(fun + 75));
    }, [
        setHunger, hunger,
        setSleep, sleep,
        setHygiene, hygiene,
        setFun, fun
    ]);

    useEffect(() => {

        const timer = setInterval(() => {
            if (!light) {
                setHunger(limit(hunger - 7));
                setSleep(limit(sleep + 10));
                setHygiene(limit(hygiene - 6));
                setFun(limit(fun + 7));
            }
            if (light) {
                setHunger(limit(hunger - 4));
                setSleep(limit(sleep - 10));
                setHygiene(limit(hygiene - 2));
                setFun(limit(fun - 1));
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [limit,
        eat,
        clean,
        play,
        medicine])

    return {
        hunger, sleep, hygiene, fun,
        eat, clean, play, medicine,
        light, setLight
    };
}
