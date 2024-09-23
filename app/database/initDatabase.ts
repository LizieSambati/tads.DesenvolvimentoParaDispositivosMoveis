import { SQLiteDatabase } from 'expo-sqlite';

export async function initDatabase(database: SQLiteDatabase) {
    try {

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS Tamagotchis (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                image INTEGER NOT NULL,
                name TEXT NOT NULL
            );
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS TamagotchiStates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tamagotchiId INTEGER NOT NULL,
                hunger INTEGER NOT NULL,
                sleep INTEGER NOT NULL,
                hygiene INTEGER NOT NULL,
                fun INTEGER NOT NULL,
                condition TEXT NOT NULL,
                light BOOLEAN,
                FOREIGN KEY(tamagotchiId) REFERENCES Tamagotchis(id)
            );
        `);
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
}