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
        paddingTop: 16,
        padding: 8,
        backgroundColor: "#293624",
    },
    textTitle: {
        fontWeight: "700",
        fontSize: 20,
        paddingBottom: 4,
        color: "#E6B400",
        textAlign: "center"
    },
})