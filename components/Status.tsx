import { Text } from "react-native"

import Medicine from "@/components/Medicine";

import Hunger from "@/components/Hunger";
import Sleep from "@/components/Sleep";
import Hygiene from "@/components/Hygiene";
import Fun from "@/components/Fun";



type Dead = {
    message: string;
    description?: string;
}
type Critical = {
    message: string;
    description?: string;
}
type VerySad = {
    message: string;
    description?: string;
}
type Sad = {
    message: string;
    description?: string;
}
type Ok = {
    message: string;
    description?: string;
}
type Good = {
    message: string;
    description?: string;
}
type VeryGood = {
    message: string;
    description?: string;
}

type Props = {
    ???
}




const Status = ({ Hunger, Sleep, Hygiene, Fun }: Props) => {

    let status: number = Hunger + Sleep + Hygiene + Fun;
    let message: string;

    if (status <= 0) {
        // função de morrer
        message = "Morto";
    } else if (status <= 50) {
        // função de ficar doente (critical()...), aceitar componente Medicine
        message = "Crítico";
    } else if (status <= 100) {
        message = "Muito Triste";
    } else if (status <= 150) {
        message = "Triste";
    } else if (status <= 200) {
        message = "Ok";
    } else if (status <= 250) {
        message = "Bem";
    } else if (status >= 251) {
        message = "Muito Bem";
    }

    return (
        <Text>
            situação do bichinho
            {message}
        </Text >
    );
}

export default Status;