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
        paddingTop: 62,
        padding: 16,
        backgroundColor: "#f56",
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 4,
        color: "black",
        textAlign: "center"
    },
})