
import React, { useEffect, useCallback, useState } from 'react';
import { useDatabase } from '../app/database/service';
import { Condition } from './Condition';

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



export const useAttributes = (id: number): AttributesType => {
    const [hunger, setHunger] = useState<number>(50);
    const [sleep, setSleep] = useState<number>(50);
    const [hygiene, setHygiene] = useState<number>(50);
    const [fun, setFun] = useState<number>(50);
    const [light, setLight] = useState<boolean>(true);

    const { getTamagotchiState, updateTamagotchi } = useDatabase();

    // Log para garantir que o id do Tamagotchi está correto
    console.log("ID do Tamagotchi:", id);

    useEffect(() => {
        const fetchState = async () => {
            console.log("Buscando estado do Tamagotchi no banco de dados para o id:", id);
            const state = await getTamagotchiState(id);

            if (state) {
                console.log("Estado encontrado:", state);
                setHunger(state.hunger);
                setSleep(state.sleep);
                setHygiene(state.hygiene);
                setFun(state.fun);
            } else {
                console.log("Estado do Tamagotchi não encontrado.");
            }
        };
        fetchState();  // Busca o estado do Tamagotchi ao carregar
    }, [id]);

    useEffect(() => {
        const saveState = async () => {
            console.log("Salvando estado do Tamagotchi no banco de dados:", { hunger, sleep, hygiene, fun });
            await updateTamagotchi(id, { hunger, sleep, hygiene, fun });  // Atualiza o estado no banco de dados
        };
        saveState();  // Salva o estado sempre que um dos atributos muda
    }, [hunger, sleep, hygiene, fun]);

    const limit = (value: number) => {
        if (value > 100) return 100;
        if (value < 0) return 0;
        return value;
    };

    const eat = useCallback(() => {
        console.log("Comendo... alterando os atributos");
        setHunger(limit(hunger + 50));
        setSleep(limit(sleep));
        setHygiene(limit(hygiene - 20));
        setFun(limit(fun + 15));
    }, [hunger, sleep, hygiene, fun]);

    const clean = useCallback(() => {
        console.log("Limpando... alterando os atributos");
        setHunger(limit(hunger));
        setSleep(limit(sleep));
        setHygiene(limit(hygiene + 100));
        setFun(limit(fun + 10));
    }, [hunger, sleep, hygiene, fun]);

    const play = useCallback(() => {
        console.log("Brincando... alterando os atributos");
        setHunger(limit(hunger - 5));
        setSleep(limit(sleep - 10));
        setHygiene(limit(hygiene - 5));
        setFun(limit(fun + 30));
    }, [hunger, sleep, hygiene, fun]);

    const medicine = useCallback(() => {
        if (Condition({ hunger, sleep, hygiene, fun }).message === "Crítico") {
            console.log("Tomando remédio... alterando os atributos");
            setHunger(limit(hunger + 75));
            setSleep(limit(sleep + 75));
            setHygiene(limit(hygiene));
            setFun(limit(fun + 75));
        }
    }, [hunger, sleep, hygiene, fun]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!light) {
                console.log("Estado luz desligada, alterando atributos ao longo do tempo");
                setHunger(limit(hunger - 4));
                setSleep(limit(sleep + 10));
                setHygiene(limit(hygiene - 6));
                setFun(limit(fun + 1));
            } else {
                console.log("Estado luz ligada, alterando atributos ao longo do tempo");
                setHunger(limit(hunger - 4));
                setSleep(limit(sleep - 10));
                setHygiene(limit(hygiene - 2));
                setFun(limit(fun - 2));
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [light, hunger, sleep, hygiene, fun]);

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
        setLight
    };
};









// import React, { useEffect, useCallback, useState } from 'react';
// import { useDatabase } from '../app/database/service';
// import { Condition } from './Condition';

// type AttributesType = {
//     hunger: number;
//     sleep: number;
//     hygiene: number;
//     fun: number;
//     eat: () => void;
//     clean: () => void;
//     play: () => void;
//     medicine: () => void;
//     light: boolean;
//     setLight: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export const useAttributes = (id: number): AttributesType => {
//     const [hunger, setHunger] = useState<number>(50);
//     const [sleep, setSleep] = useState<number>(50);
//     const [hygiene, setHygiene] = useState<number>(50);
//     const [fun, setFun] = useState<number>(50);
//     const [light, setLight] = useState<boolean>(true);

//     const { getTamagotchiState, updateTamagotchi } = useDatabase();

//     useEffect(() => {
//         const fetchState = async () => {
//             const state = await getTamagotchiState(id);
//             if (state) {
//                 setHunger(state.hunger);
//                 setSleep(state.sleep);
//                 setHygiene(state.hygiene);
//                 setFun(state.fun);
//             }
//         };
//         fetchState();
//     }, [id]);

//     useEffect(() => {
//         const saveState = async () => {
//             await updateTamagotchi(id, { hunger, sleep, hygiene, fun });
//         };
//         saveState();
//     }, [hunger, sleep, hygiene, fun]);

//     const limit = (value: number) => {
//         if (value > 100) return 100;
//         if (value < 0) return 0;
//         return value;
//     };

//     const eat = useCallback(() => {
//         setHunger(limit(hunger + 50));
//         setSleep(limit(sleep));
//         setHygiene(limit(hygiene - 20));
//         setFun(limit(fun + 15));
//     }, [hunger, sleep, hygiene, fun]);

//     const clean = useCallback(() => {
//         setHunger(limit(hunger));
//         setSleep(limit(sleep));
//         setHygiene(limit(hygiene + 100));
//         setFun(limit(fun + 10));
//     }, [hunger, sleep, hygiene, fun]);

//     const play = useCallback(() => {
//         setHunger(limit(hunger - 5));
//         setSleep(limit(sleep - 10));
//         setHygiene(limit(hygiene - 5));
//         setFun(limit(fun + 30));
//     }, [hunger, sleep, hygiene, fun]);

//     const medicine = useCallback(() => {
//         if (Condition({ hunger, sleep, hygiene, fun }).message === "Crítico") {
//             setHunger(limit(hunger + 75));
//             setSleep(limit(sleep + 75));
//             setHygiene(limit(hygiene));
//             setFun(limit(fun + 75));
//         }
//     }, [hunger, sleep, hygiene, fun]);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             if (!light) {
//                 setHunger(limit(hunger - 4));
//                 setSleep(limit(sleep + 10));
//                 setHygiene(limit(hygiene - 6));
//                 setFun(limit(fun + 1));
//             } else {
//                 setHunger(limit(hunger - 4));
//                 setSleep(limit(sleep - 10));
//                 setHygiene(limit(hygiene - 2));
//                 setFun(limit(fun - 2));
//             }
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [light, hunger, sleep, hygiene, fun]);

//     return {
//         hunger,
//         sleep,
//         hygiene,
//         fun,
//         eat,
//         clean,
//         play,
//         medicine,
//         light,
//         setLight
//     };
// };











// import React, { useEffect, useCallback, useState } from 'react';
// import { useDatabase } from '../app/database/service';
// import { Condition } from './Condition';

// type AttributesType = {
//     hunger: number;
//     sleep: number;
//     hygiene: number;
//     fun: number;
//     eat: () => void;
//     clean: () => void;
//     play: () => void;
//     medicine: () => void;
//     light: boolean;
//     setLight: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export const useAttributes = (id: number): AttributesType => {
//     const [hunger, setHunger] = useState<number>(50);
//     const [sleep, setSleep] = useState<number>(50);
//     const [hygiene, setHygiene] = useState<number>(50);
//     const [fun, setFun] = useState<number>(50);
//     const [light, setLight] = useState<boolean>(true);

//     const { getTamagotchiState, updateTamagotchi } = useDatabase();

//     useEffect(() => {
//         const fetchState = async () => {
//             const state = await getTamagotchiState(id);
//             if (state) {
//                 setHunger(state.hunger);
//                 setSleep(state.sleep);
//                 setHygiene(state.hygiene);
//                 setFun(state.fun);
//             }
//         };
//         fetchState();
//     }, [id]);

//     useEffect(() => {
//         updateTamagotchi(id, { hunger, sleep, hygiene, fun });
//     }, [hunger, sleep, hygiene, fun]);

//     const limit = (value: number) => {
//         if (value > 100) return 100;
//         if (value < 0) return 0;
//         return value;
//     };

//     const eat = useCallback(() => {
//         setHunger(limit(hunger + 50));
//         setSleep(limit(sleep));
//         setHygiene(limit(hygiene - 20));
//         setFun(limit(fun + 15));
//     }, [hunger, sleep, hygiene, fun]);

//     const clean = useCallback(() => {
//         setHunger(limit(hunger));
//         setSleep(limit(sleep));
//         setHygiene(limit(hygiene + 100));
//         setFun(limit(fun + 10));
//     }, [hunger, sleep, hygiene, fun]);

//     const play = useCallback(() => {
//         setHunger(limit(hunger - 5));
//         setSleep(limit(sleep - 10));
//         setHygiene(limit(hygiene - 5));
//         setFun(limit(fun + 30));
//     }, [hunger, sleep, hygiene, fun]);

//     const medicine = useCallback(() => {
//         if (Condition({ hunger, sleep, hygiene, fun }).message === "Crítico") {
//             setHunger(limit(hunger + 75));
//             setSleep(limit(sleep + 75));
//             setHygiene(limit(hygiene));
//             setFun(limit(fun + 75));
//         }
//     }, [hunger, sleep, hygiene, fun]);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             if (!light) {
//                 setHunger(limit(hunger - 4));
//                 setSleep(limit(sleep + 10));
//                 setHygiene(limit(hygiene - 6));
//                 setFun(limit(fun + 1));
//             } else {
//                 setHunger(limit(hunger - 4));
//                 setSleep(limit(sleep - 10));
//                 setHygiene(limit(hygiene - 2));
//                 setFun(limit(fun - 2));
//             }
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [light, hunger, sleep, hygiene, fun]);

//     return {
//         hunger,
//         sleep,
//         hygiene,
//         fun,
//         eat,
//         clean,
//         play,
//         medicine,
//         light,
//         setLight
//     };
// };














// import React, { useEffect, useState, useCallback } from "react";
// import Condition from "./Condition";

// type AttributesType = {
//     hunger: number;
//     sleep: number;
//     hygiene: number;
//     fun: number;
//     eat: () => void;
//     clean: () => void;
//     play: () => void;
//     medicine: () => void;
//     light: boolean;
//     setLight: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export const Attributes = (): AttributesType => {

//     const [hunger, setHunger] = useState<number>(50);
//     const [sleep, setSleep] = useState<number>(50);
//     const [hygiene, setHygiene] = useState<number>(50);
//     const [fun, setFun] = useState<number>(50);
//     const [light, setLight] = useState<boolean>(true);

//     const { message } = Condition({ hunger, sleep, hygiene, fun });

//     const limit = (value: number) => {
//         if (value > 100) return 100;
//         if (value < 0) return 0;
//         return value;
//     };

//     const eat = useCallback(() => {
//         setHunger(limit(hunger + 50));
//         setSleep(limit(sleep));
//         setHygiene(limit(hygiene - 20));
//         setFun(limit(fun + 15));
//     }, [hunger, sleep, hygiene, fun]);

//     const clean = useCallback(() => {
//         setHunger(limit(hunger));
//         setSleep(limit(sleep));
//         setHygiene(limit(hygiene + 100));
//         setFun(limit(fun + 10));
//     }, [hunger, sleep, hygiene, fun]);

//     const play = useCallback(() => {
//         setHunger(limit(hunger - 5));
//         setSleep(limit(sleep - 10));
//         setHygiene(limit(hygiene - 5));
//         setFun(limit(fun + 30));
//     }, [hunger, sleep, hygiene, fun]);

//     const medicine = useCallback(() => {
//         if (message === "Crítico") {
//             setHunger(limit(hunger + 75));
//             setSleep(limit(sleep + 75));
//             setHygiene(limit(hygiene));
//             setFun(limit(fun + 75));
//         }
//     }, [message, hunger, sleep, hygiene, fun]);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             if (!light) {
//                 setHunger(limit(hunger - 4));
//                 setSleep(limit(sleep + 10));
//                 setHygiene(limit(hygiene - 6));
//                 setFun(limit(fun + 1));
//             } else {
//                 setHunger(limit(hunger - 4));
//                 setSleep(limit(sleep - 10));
//                 setHygiene(limit(hygiene - 2));
//                 setFun(limit(fun - 2));
//             }
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [
//         light,
//         hunger,
//         sleep,
//         hygiene,
//         fun,
//         eat,
//         clean,
//         play,
//         medicine
//     ]);

//     return {
//         hunger,
//         sleep,
//         hygiene,
//         fun,
//         eat,
//         clean,
//         play,
//         medicine,
//         light,
//         setLight
//     };
// };