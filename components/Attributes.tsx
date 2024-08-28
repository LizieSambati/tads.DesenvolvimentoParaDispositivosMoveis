

import Hunger from "@/components/Hunger";
import Sleep from "@/components/Sleep";
import Hygiene from "@/components/Hygiene";
import Fun from "@/components/Fun";


import React from "react";
import { createContext, useContext, useState } from "react";
import { Button, View } from "react-native";


type AttributesState = {
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
};

type AttributesActions = {
    play: () => void;
    eat: () => void;
    clean: () => void;
    medicine: () => void;
};

// Consolidar estado e ações em um tipo
type AttributesContext = AttributesState & AttributesActions;

const AttributesContext = createContext<AttributesContext | undefined>(undefined);

export const useAttributes = () => {
    return useContext(AttributesContext);
};


export const Attributes = () => {

    const [hunger, setHunger] = useState(75);
    const [sleep, setSleep] = useState(75);
    const [hygiene, setHygiene] = useState(75);
    const [fun, setFun] = useState(75);


    const eat = () => {
        setHunger(hunger + 50);
        setSleep(sleep + 0);
        setHygiene(hygiene - 20);
        setFun(fun + 15);
    };

    const clean = () => {
        setHunger(hunger + 0);
        setSleep(sleep + 0);
        setHygiene(hygiene + 75);
        setFun(fun + 10);
    };

    const play = () => {
        setHunger(hunger - 5);
        setSleep(sleep - 10);
        setHygiene(hygiene - 5);
        setFun(fun + 30);
    };

    const medicine = () => {
        setHunger(hunger + 50);
        setSleep(sleep + 50);
        setHygiene(hygiene + 0);
        setFun(fun + 50);
    };

    // const rest = () => {
    //     setHunger(hunger - ?);
    //     setSleep(sleep - ?);
    //     setHygiene(hygiene - ?);
    //     setFun(fun + ?);
    // };

    // const routine = () => {
    //     setHunger(hunger + ?);
    //     setSleep(sleep + ?);
    //     setHygiene(hygiene + ?);
    //     setFun(fun + ?);
    // };

    // return (
    //     <View>
    //         <Button title="Comer" onPress={eat} />
    //         <Button title="Higiene" onPress={clean} />
    //         <Button title="Jogar" onPress={play} />
    //         <Button title="Remédio" onPress={medicine} />
    //         {/* <Button title="Dormir" onPress={rest} /> */}
    //     </View>
    // );
    const value = {
        hunger,
        sleep,
        hygiene,
        fun,
        play,
        eat,
        clean,
        medicine
    };

    return (
        <AttributesContext.Provider value={value}>
            {???}
        </AttributesContext.Provider>
    );
}







// // Valor padrão para o contexto (opcional)
// const defaultContextValue: AttributesContextType = {
//     hunger: 75,
//     sleep: 75,
//     hygiene: 75,
//     fun: 75,
//     play: () => { },
//     eat: () => { },
//     clean: () => { },
//     medicine: () => { }
// };

