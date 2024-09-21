import { useSQLiteContext } from "expo-sqlite";

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
};

export function useDatabase() {
    const database = useSQLiteContext();

    async function createTamagotchi({ image, name }: { image: number; name: string }) {
        const query = await database.prepareAsync(`
            INSERT INTO Tamagotchis (image, name) VALUES (?, ?)
        `);
        try {
            await query.executeAsync([image, name]);
        } catch (error) {
            console.log("Erro ao criar Tamagotchi:", error);
        } finally {
            await query.finalizeAsync();
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



    async function updateTamagotchi(id: number, state: AttributesProps) {
        const query = await database.prepareAsync(`
            INSERT OR REPLACE INTO TamagotchiStates (id, hunger, sleep, hygiene, fun) VALUES (?, ?, ?, ?, ?)
        `);
        try {
            await query.executeAsync([id, state.hunger, state.sleep, state.hygiene, state.fun]);
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

            // Verifica se a query retornou algum resultado
            if (results && results.length > 0) {
                // Força o TypeScript a reconhecer o formato da linha retornada
                const row = results[0] as {
                    hunger: number;
                    sleep: number;
                    hygiene: number;
                    fun: number;
                };

                // Retorna os atributos
                return {
                    hunger: row.hunger,
                    sleep: row.sleep,
                    hygiene: row.hygiene,
                    fun: row.fun,
                };
            } else {
                return null; // Caso não haja resultados
            }
        } catch (error) {
            console.error("Erro ao buscar o estado do Tamagotchi:", error);
            return null;
        }
    }




    // async function getTamagotchiState(id: number): Promise<AttributesProps | null> {

    //     try {
    //         const db = await database;
    //         const results = await db.getAllSync(
    //             `SELECT * FROM TamagotchiStates WHERE id = ?`,
    //             [id]
    //         );
    //         if (results.length > 0) {
    //             return results[0] as AttributesProps;
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error("Erro ao buscar o estado do Tamagotchi:", error);
    //         return null;
    //     }
    // }

    return { createTamagotchi, deleteTamagotchi, getTamagotchis, updateTamagotchi, getTamagotchiState };
}








// import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

// type Tamagotchi = {
//     id: number;
//     image: number;
//     name: string;
// };

// type AttributesProps = {
//     hunger: number;
//     sleep: number;
//     hygiene: number;
//     fun: number;
// };

// export function useDatabase() {
//     const database = useSQLiteContext();

//     async function createTamagotchi({ image, name }: { image: number; name: string }) {
//         const query = await database.prepareAsync(`
//             INSERT INTO Tamagotchis (image, name) VALUES (?, ?)
//         `);
//         try {
//             await query.executeAsync([image, name]);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function deleteTamagotchi(id: number) {
//         const query = await database.prepareAsync(`
//             DELETE FROM Tamagotchis WHERE id = ?
//         `);
//         try {
//             await query.executeAsync([id]);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function getTamagotchis(): Promise<Tamagotchi[]> {
//         try {
//             const result = await database.getAllAsync(`
//                 SELECT * FROM Tamagotchis;
//             `);
//             return result as Tamagotchi[];
//         } catch (error) {
//             console.error("Erro ao buscar Tamagotchis:", error);
//             throw error;
//         }
//     }

//     async function updateTamagotchi(id: number, state: AttributesProps) {
//         const query = await database.prepareAsync(`
//             INSERT OR REPLACE INTO TamagotchiStates (id, hunger, sleep, hygiene, fun) VALUES (?, ?, ?, ?, ?)
//         `);
//         try {
//             await query.executeAsync([id, state.hunger, state.sleep, state.hygiene, state.fun]);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function getTamagotchiState(id: number): Promise<AttributesProps | null> {

//         try {
//             const db = await database;
//             const results = await db.getAllSync(
//                 `SELECT * FROM TamagotchiStates WHERE id = ?`,
//                 [id]
//             );
//             if (results.length > 0) {
//                 return results[0] as AttributesProps;
//             } else {
//                 return null;
//             }
//         } catch (error) {
//             console.error("Erro ao buscar o estado do Tamagotchi:", error);
//             return null;
//         }
//     }

//     return { createTamagotchi, deleteTamagotchi, getTamagotchis, updateTamagotchi, getTamagotchiState };
// }









// try {
//     const result = await database.getAllAsync(`
//         SELECT * FROM TamagotchiStates WHERE id = ?
//     `, [id]);
//     return result.length > 0 ? result[0] as AttributesProps : null;
// } catch (error) {
//     console.error("Erro ao buscar o estado do Tamagotchi:", error);
//     return null;
// }





// import { useSQLiteContext } from "expo-sqlite";

// type Tamagotchi = {
//     id: number;
//     image: number;
//     name: string;
// };

// type AttributesProps = {
//     hunger: number;
//     sleep: number;
//     hygiene: number;
//     fun: number;
// };

// export function useDatabase() {
//     const database = useSQLiteContext();

//     async function createTamagotchi({ image, name }: { image: number; name: string }) {
//         const query = await database.prepareAsync(`
//             INSERT INTO Tamagotchis (image, name) VALUES ($image, $name)
//         `);
//         try {
//             await query.executeAsync({ $image: image, $name: name });
//         } catch (error) {
//             console.log(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function deleteTamagotchi(id: number) {
//         const query = await database.prepareAsync(`
//             DELETE FROM Tamagotchis WHERE id = ?
//         `);
//         try {
//             await query.executeAsync([id]);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function getTamagotchis(): Promise<Tamagotchi[]> {
//         try {
//             const result = await database.getAllAsync(`
//                 SELECT * FROM Tamagotchis;
//             `);
//             return result as Tamagotchi[];
//         } catch (error) {
//             console.error("Erro ao buscar Tamagotchis:", error);
//             throw error;
//         }
//     }

//     async function updateTamagotchi(id: number, state: AttributesProps) {
//         const query = await database.prepareAsync(`
//             INSERT OR REPLACE INTO TamagotchiStates (id, hunger, sleep, hygiene, fun) VALUES ($id, $hunger, $sleep, $hygiene, $fun)
//         `);
//         try {
//             await query.executeAsync({
//                 $id: id,
//                 $hunger: state.hunger,
//                 $sleep: state.sleep,
//                 $hygiene: state.hygiene,
//                 $fun: state.fun,
//             });
//         } catch (error) {
//             console.error(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function getTamagotchiState(id: number): Promise<AttributesProps | null> {
//         try {
//             // Obtenha a instância do banco de dados
//             const db = await database;

//             // Execute a consulta SQL
//             const results = await db.getAllSync(
//                 `SELECT * FROM TamagotchiStates WHERE id = ?`,
//                 [id]
//             );

//             // Verifique se há resultados e retorne o primeiro
//             if (results.length > 0) {
//                 return results[0] as AttributesProps;
//             } else {
//                 return null;
//             }
//         } catch (error) {
//             console.error("Erro ao buscar o estado do Tamagotchi:", error);
//             return null;
//         }

//     async function getTamagotchiState(id: number): Promise<AttributesProps | null> {
//         try {
//             const result = await database.getAllSync(`
//                 SELECT * FROM TamagotchiStates WHERE id = ?
//             `, [id]);
//         GPT AQUI DÁ ERRO -> return result ? result : null;
//         } catch (error) {
//             console.error("Erro ao buscar o estado do Tamagotchi:", error);
//             return null;
//         }
//     }
// }

//     return { createTamagotchi, deleteTamagotchi, getTamagotchis, updateTamagotchi, getTamagotchiState };
// }









// import { useSQLiteContext } from "expo-sqlite"

// type Tamagotchi = {
//     id: number;
//     image: number;
//     name: string;
// };

// type AttributesProps = {
//     hunger: number;
//     sleep: number;
//     hygiene: number;
//     fun: number;
// };


// export function useDatabase() {
//     const database = useSQLiteContext()

//     async function createTamagotchi({ image, name }: { image: number, name: string }) {
//         const query = await database.prepareAsync(`
//             INSERT INTO Tamagotchis (image, name) VALUES ($image, $name)
//             `)
//         try {
//             await query.executeAsync({ $image: image, $name: name })

//         } catch (error) {
//             console.log(error)
//         } finally {
//             await query.finalizeAsync()
//         }
//     }

//     async function deleteTamagotchi(id: number) {
//         const query = await database.prepareAsync(`
//             DELETE FROM Tamagotchis WHERE id = ?
//         `);
//         try {
//             await query.executeAsync([id]);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function getTamagotchis(): Promise<Tamagotchi[]> {
//         try {
//             const result = await database.getAllAsync(`
//                 SELECT * FROM Tamagotchis;
//             `);
//             return result as Tamagotchi[];
//         } catch (error) {
//             console.error("Erro ao buscar Tamagotchis:", error);
//             throw error;
//         }
//     }

//     async function updateTamagotchi(id: number, state: AttributesProps) {
//         const query = await database.prepareAsync(`
//             INSERT OR REPLACE INTO TamagotchiStates (id, hunger, sleep, hygiene, fun) VALUES ($id, $hunger, $sleep, $hygiene, $fun)
//         `);
//         try {
//             await query.executeAsync({
//                 $id: id,
//                 $hunger: state.hunger,
//                 $sleep: state.sleep,
//                 $hygiene: state.hygiene,
//                 $fun: state.fun,
//             });
//         } catch (error) {
//             console.error(error);
//         } finally {
//             await query.finalizeAsync();
//         }
//     }

//     async function getTamagotchiState(id: number): Promise<AttributesProps | null> {
//         try {
//             const result = await database.getAllSync(`
//                 SELECT * FROM TamagotchiStates WHERE id = ?
//             `, [id]);
//             return result ? result : null;
//         } catch (error) {
//             console.error("Erro ao buscar o estado do Tamagotchi:", error);
//             return null;
//         }
//     }

//     return { createTamagotchi, deleteTamagotchi, getTamagotchis, updateTamagotchi, getTamagotchiState }
// }