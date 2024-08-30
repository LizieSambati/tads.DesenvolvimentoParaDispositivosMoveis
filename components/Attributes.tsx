import React from "react";
import { useState } from "react";

type AttributesType = {
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
    eat: () => void;
    clean: () => void;
    play: () => void;
    medicine: () => void;
    rest: () => void;
    // routine: () => void;
};

export const Attributes = (): AttributesType => {

    const [hunger, setHunger] = useState<number>(50);
    const [sleep, setSleep] = useState<number>(50);
    const [hygiene, setHygiene] = useState<number>(50);
    const [fun, setFun] = useState<number>(50);

    const limit = (value: number) => {
        if (value > 100) return 100;
        if (value < 0) return 0;
        return value;
    };

    const eat = () => {
        setHunger(limit(hunger + 50));
        setSleep(limit(sleep + 0));
        setHygiene(limit(hygiene - 20));
        setFun(limit(fun + 15));
    };

    const clean = () => {
        setHunger(limit(hunger + 0));
        setSleep(limit(sleep + 0));
        setHygiene(limit(hygiene + 75));
        setFun(limit(fun + 10));
    };

    const play = () => {
        setHunger(limit(hunger - 5));
        setSleep(limit(sleep - 10));
        setHygiene(limit(hygiene - 5));
        setFun(limit(fun + 30));
    };

    const medicine = () => {
        setHunger(limit(hunger + 75));
        setSleep(limit(sleep + 75));
        setHygiene(limit(hygiene + 0));
        setFun(limit(fun + 75));
    };

    const rest = () => {
        setHunger(limit(hunger - 10));
        setSleep(limit(sleep + 50));
        setHygiene(limit(hygiene - 10));
        setFun(limit(fun + 10));
    };

    // const routine = () => {
    //     setHunger(hunger + ?);
    //     setSleep(sleep + ?);
    //     setHygiene(hygiene + ?);
    //     setFun(fun + ?);
    // };

    return {
        hunger, sleep, hygiene, fun,
        eat, clean, play, medicine, rest
        // routine,
    };
}
