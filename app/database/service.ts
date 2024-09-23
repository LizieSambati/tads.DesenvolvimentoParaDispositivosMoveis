import { useSQLiteContext } from "expo-sqlite";
import { initDatabase } from "./initDatabase";

type Tamagotchi = {
    id: number;
    image: number;
    name: string;
};

type AttributesProps = {
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
    condition: string;
    light: boolean;
};

export function useDatabase() {
    const database = useSQLiteContext();

    async function createTamagotchi({ image, name }: { image: number; name: string }) {
        const query = await database.prepareAsync(`
            INSERT INTO Tamagotchis (image, name) VALUES (?, ?)

        `);
        try {
            await query.executeAsync([image, name]);
            createTamagotchiStates()
        } catch (error) {
            console.log("Erro ao criar Tamagotchi:", error);
        } finally {
            await query.finalizeAsync();
        }

    }

    async function createTamagotchiStates() {
        const tamagotchiId = await database.getAllSync(
            `SELECT max(id) as max FROM Tamagotchis`
        );

        if (tamagotchiId && tamagotchiId[0] !== null) {
            const row = tamagotchiId[0] as {
                max: number;
            };

            const initialHunger = 17;
            const initialSleep = 79;
            const initialHygiene = 34;
            const initialFun = 62;
            const initialCondition = "Ok";
            const initialLight = true

            const query = await database.prepareAsync(`
                INSERT OR REPLACE INTO TamagotchiStates (hunger, sleep, hygiene, fun, condition, light, tamagotchiId)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            try {
                await query.executeAsync([initialHunger, initialSleep, initialHygiene, initialFun, initialCondition, initialLight, row.max]);
            } catch (error) {
                console.log("Erro ao criar Tamagotchi:", error);
            } finally {
                await query.finalizeAsync();
            }
        }
    }

    async function deleteTamagotchi(id: number) {
        const query = await database.prepareAsync(`
            DELETE FROM Tamagotchis WHERE id = ?
        `);
        try {
            await query.executeAsync([id]);
        } catch (error) {
            console.log(error);
        } finally {
            await query.finalizeAsync();
        }
    }

    async function getTamagotchis(): Promise<Tamagotchi[]> {
        const result = await database.getAllAsync(`
            SELECT * FROM Tamagotchis;
        `);
        try {
            return result as Tamagotchi[];
        } catch (error) {
            console.error("Erro ao buscar Tamagotchis:", error);
            throw error;
        }
    }

    async function getTamagotchiImage(id: number): Promise<number | null> {
        const query = await database.getAllAsync(`
            SELECT image FROM Tamagotchis WHERE id = ` + id);
        try {
            if (query && query[0] !== null) {
                const row = query[0] as {
                    image: number;
                };
                return row.image;
            }
        } catch (error) {
            console.log(error);
        }
        return 0;
    }

    async function updateTamagotchi(
        id: number,
        { hunger, sleep, hygiene, fun, condition, light }: AttributesProps,

    ) {
        const query = await database.prepareAsync(`
          UPDATE TamagotchiStates SET hunger = ?, sleep = ?, hygiene = ?, fun = ?, condition = ?, light = ? 
          WHERE tamagotchiId = ?
        `);

        try {
            await query.executeAsync([hunger, sleep, hygiene, fun, condition, light, id]);
        } catch (error) {
            console.error(error);
        } finally {
            await query.finalizeAsync();
        }
    }

    async function getTamagotchiState(id: number): Promise<AttributesProps | null> {
        try {
            const results = await database.getAllSync(
                `SELECT hunger, sleep, hygiene, fun FROM TamagotchiStates WHERE tamagotchiId = ?`,
                [id]

            );
            console.log('getTamagoshiState: ', results)
            if (results && results.length > 0) {
                const row = results[0] as {
                    hunger: number;
                    sleep: number;
                    hygiene: number;
                    fun: number;
                    condition: string;
                    light: boolean
                };
                return {
                    hunger: row.hunger,
                    sleep: row.sleep,
                    hygiene: row.hygiene,
                    fun: row.fun,
                    condition: row.condition,
                    light: row.light,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar o estado do Tamagotchi:", error);
            return null;
        }
    }

    async function clear() {
        try {
            await database.execAsync(`DROP TABLE IF EXISTS TamagotchiStates;`);
            await database.execAsync(`DROP TABLE IF EXISTS Tamagotchis;`);

            await initDatabase(database);
        } catch (error) {
            console.error("Erro ao limpar o banco de dados:", error);
        }
    }

    return { createTamagotchi, deleteTamagotchi, getTamagotchis, updateTamagotchi, getTamagotchiState, clear, getTamagotchiImage };
}