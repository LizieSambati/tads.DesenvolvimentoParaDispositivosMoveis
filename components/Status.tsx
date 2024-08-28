import { Text } from "react-native"


// import Hunger from "@/components/Hunger";
// import Sleep from "@/components/Sleep";
// import Hygiene from "@/components/Hygiene";
// import Fun from "@/components/Fun";



// type Dead = {
//     message: string;
//     description?: string;
// }
// type Critical = {
//     message: string;
//     description?: string;
// }
// type VerySad = {
//     message: string;
//     description?: string;
// }
// type Sad = {
//     message: string;
//     description?: string;
// }
// type Ok = {
//     message: string;
//     description?: string;
// }
// type Good = {
//     message: string;
//     description?: string;
// }
// type VeryGood = {
//     message: string;
//     description?: string;
// }

type Props = {
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
    play: () => void; // Recebe a função como prop ????????
};


const Status = ({ hunger, sleep, hygiene, fun }: Props) => {

    let status: number = hunger + sleep + hygiene + fun;
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
            situação do bichinho: {message}
        </Text >
    );
}

export default Status;