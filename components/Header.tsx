import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    title: string,
}

const Header = ({ title }: HeaderProps) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    );
}
export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 24,
        padding: 8,
        backgroundColor: "#293624",
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 4,
        color: "#D3B4D9",
        textAlign: "center"
    },
})