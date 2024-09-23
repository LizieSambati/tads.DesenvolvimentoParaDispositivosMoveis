
type AttributesProps = {
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
};

const Condition = (status: number): string => {
    if (status <= 0) {
        return "Morto";
    } else if (status <= 66) {
        return "Crítico";
    } else if (status <= 132) {
        return "Muito Triste";
    } else if (status <= 198) {
        return "Triste";
    } else if (status <= 264) {
        return "Ok";
    } else if (status <= 330) {
        return "Bem";
    } else {
        return "Muito Bem";
    }
};

export const getConditionInfo = ({ hunger, sleep, hygiene, fun }: AttributesProps) => {
    const status: number = hunger + sleep + hygiene + fun;
    const message = Condition(status);
    return { message, status };
};

export default getConditionInfo;