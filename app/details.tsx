// - Tela de detalhes do bichinho:
//  Acessada através da listagem, deve mostrar a imagem do bichinho, sua foto, atributos, status e fornecer as opções:
// 	Alimentar: irá alimentar o bichinho, e por consequência aumentar o seu atributo “fome”
// 	Dormir: Irá colocar o bichinho para dormir, aumentando seu atributo “sono”
// 	Brincar: Irá abrir a tela de jogos
// deve mostrar:
// 	imagem do bichinho
// 	status (morto, crítico, muito triste, triste, ok, bem, muito bem)
// 	fornecer as opções:
// 		alimentação: dar comida aumenta o nível de alimentação
// 			0% alimentado a 100% alimentado
// 		sono: a iluminação determina se o bichinho irá dormir ou não
// 			Luz acesa/apagada
// 		higiene: cuidar dos dejetos do bichinho
// 		diversão: o bichinho se tornará mais feliz brincando nos jogos
// 			Irá abrir a tela de jogos

import { StyleSheet, Text, View } from "react-native";

const Details = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                imagem,
                status de vida detalhado,
                ---
                alimentar,
                brincar,
                apagar/acender a Luz,
                limpar
            </Text>
            <Text>Botão ir para status</Text>
            <Text>Botão ir para game</Text>
        </View>
    );
}
export default Details;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text: {
        color: "#5178"
    }
})