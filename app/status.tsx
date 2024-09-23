// - Tela de listagem de bichinhos:
// Listar imagem, o nome, atributos(saúde): alimentação + sono + higiene + diversão
// status (morto, crítico, muito triste, triste, ok, bem, muito bem)








import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, ImageBackground, SafeAreaView, Pressable } from 'react-native';
import StatusIcons from '../components/StatusIcons';
import { characters } from '@/components/Characters';
import { useDatabase } from '../app/database/service';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from 'expo-router';
import { CompositeNavigationProp, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAttributes } from "@/components/Attributes";
import { getConditionInfo } from "@/components/Condition";

import galaxy from "assets/images/galaxy1.jpg";


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

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'status'>,
  StackNavigationProp<RootStackParamList>
>;

const Status = () => {

  const navigation = useNavigation<ScreenNavigationProp>();

  const { getTamagotchis } = useDatabase();
  const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useFocusEffect(
    React.useCallback(() => {
      const fetchTamagotchis = async () => {
        try {
          const tamagotchisList = await getTamagotchis();
          if (tamagotchisList.length === 0) {
            setError("Você não tem Tamagotchis");
          } else {
            setTamagotchis(tamagotchisList);
          }
        } catch (err) {
          console.error('Erro ao buscar Tamagotchis:', err);
          setError("Erro ao buscar Tamagotchis.");
        } finally {
          setLoading(false);
        }
      };

      fetchTamagotchis();
    }, [tamagotchis]));

  if (loading) {
    return <ActivityIndicator size="large" color="#D3B4D9" />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={galaxy} style={styles.backgroundImage}>
          <View style={styles.menuPlanet}>
            <Pressable onPress={() => navigation.navigate('index')}>
              <Ionicons name="arrow-back-circle-outline" size={48} color="#D3B4D9" />
            </Pressable>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={galaxy} style={styles.backgroundImage}>
        <View style={styles.menuPlanet}>
          <Pressable onPress={() => navigation.navigate('index')}>
            <Ionicons name="planet" size={48} color="#D3B4D9" />
          </Pressable>
        </View>
        <FlatList
          data={tamagotchis}
          renderItem={({ item }) => <TamagotchiItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.statusContainer}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};


export const TamagotchiItem = ({ item }: { item: Tamagotchi }) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const { light, setLight, eat, clean, play, hunger, sleep, hygiene, fun, fetchState } = useAttributes(item.id);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchState();
    }
  }, [isFocused]);


  const condition = getConditionInfo({ hunger, sleep, hygiene, fun }).message;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.displayContainer}>
        <Text style={styles.textName}>{item.name}</Text>
        <StatusIcons
          hunger={hunger}
          sleep={sleep}
          hygiene={hygiene}
          fun={fun}
          iconColor="#D3B4D9"
          iconSize={48}
          textStyle={styles.textIcon}
        />
        <View>
          <Text style={styles.textCondition}>{condition}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('details', { id: item.id })}>
          <Image
            source={characters[item.image]?.charactere || require('assets/images/radioactive.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View >
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 2,
    marginLeft: 20,
    marginBottom: 10,
  },
  displayContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D3B4D9',
    textAlign: 'left',
    padding: 4,
  },
  textIcon: {
    color: "#E6B400",
    fontSize: 20,
    fontWeight: "600",
  },
  textCondition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D3B4D9',
    textAlign: 'right',
    padding: 4,
  },
  menuPlanet: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 150,
    height: 160,
    resizeMode: 'contain',
  },
  statusContainer: {
    padding: 20,
    color: '#D3B4D9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: "#E6B400",
    fontSize: 26,
    fontWeight: "500",
  },
});

export default Status;







































function useCallback(arg0: () => () => void, arg1: never[]): () => undefined | void | (() => void) {
  throw new Error('Function not implemented.');
}
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, ImageBackground, SafeAreaView, Pressable } from 'react-native';
// import StatusIcons from '../components/StatusIcons';
// import { characters } from '@/components/Characters';
// import { useDatabase } from '../app/database/service';
// import { Ionicons } from '@expo/vector-icons';
// import { useFocusEffect, useNavigation } from 'expo-router';
// import { CompositeNavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from './_layout';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useAttributes } from "@/components/Attributes";

// import galaxy from "assets/images/galaxy4.jpg";


// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// type AttributesProps = {
//   hunger: number;
//   sleep: number;
//   hygiene: number;
//   fun: number;
// };

// type ScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<RootStackParamList, 'status'>,
//   StackNavigationProp<RootStackParamList>
// >;

// const Status = () => {

//   const navigation = useNavigation<ScreenNavigationProp>();

//   const { getTamagotchis } = useDatabase();
//   const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null); // Para capturar e exibir erros


//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchTamagotchis = async () => {
//         try {
//           const tamagotchisList = await getTamagotchis();
//           if (tamagotchisList.length === 0) {
//             setError("Você não tem Tamagotchis");
//           } else {
//             setTamagotchis(tamagotchisList);
//           }
//         } catch (err) {
//           console.error('Erro ao buscar Tamagotchis:', err);
//           setError("Erro ao buscar Tamagotchis.");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchTamagotchis();
//     }, [tamagotchis]));

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>

//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground source={galaxy} style={styles.backgroundImage}>
//         <View style={styles.menuPlanet}>
//           <Pressable onPress={() => navigation.navigate('index')}>
//             <Ionicons name="planet" size={48} color="#D3B4D9" />
//           </Pressable>
//         </View>
//         <FlatList
//           data={tamagotchis}
//           renderItem={({ item }) => <TamagotchiItem item={item} />}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.statusContainer}
//         />
//         <View>
//           <Text style={styles.textName}>
//             STATUS???
//           </Text>
//         </View>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// // Componente separado para cada item Tamagotchi
// export const TamagotchiItem = ({ item }: { item: Tamagotchi }) => {
//   const navigation = useNavigation<ScreenNavigationProp>();
//   const { light, setLight, eat, clean, play, hunger, sleep, hygiene, fun } = useAttributes(item.id);

//   useFocusEffect(
//     React.useCallback(() => {
//       // Aqui, você pode adicionar lógica se precisar buscar algo ao focar no item
//       // O estado já estará sendo gerenciado pelo useAttributes
//     }, [hunger, sleep, hygiene, fun])
//   );
//   // const { getTamagotchiState } = useDatabase();
//   // const [attributes, setAttributes] = useState<AttributesProps | null>(null);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState<string | null>(null);


//   // useFocusEffect(
//   //   React.useCallback(() => {

//   //     const fetchAttributes = async () => {
//   //       let state: AttributesProps | null = null;
//   //       try {
//   //         state = await getTamagotchiState(item.id);
//   //         if (!state) {
//   //           console.log('e aeeeee 1111');
//   //           setError("Estado do Tamagotchi não encontrado.");
//   //         } else {
//   //           console.log('e aeeeee 22222');
//   //           setAttributes(state);
//   //         }
//   //       } catch (err) {
//   //         console.error('Erro ao buscar estado do Tamagotchi:', err);
//   //         setError("Erro ao buscar estado do Tamagotchi.");
//   //       } finally {
//   //         console.log('e aeeeee44444');
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchAttributes();
//   //   }, [item.id]) // Adicione item.id como dependência
//   // );
//   // if (loading) {
//   //   return <ActivityIndicator size="small" color="#D3B4D9" />;
//   // }

//   // if (error) {
//   //   return (
//   //     <View style={styles.errorContainer}>
//   //       <Text style={styles.errorText}>{error}</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.itemContainer}>
//       <Text style={styles.textName}>{item.name}</Text>
//       {/* {attributes && (
//         <StatusIcons
//           hunger={attributes.hunger}
//           sleep={attributes.sleep}
//           hygiene={attributes.hygiene}
//           fun={attributes.fun}
//           iconColor="#D3B4D9"
//           iconSize={24}
//         />
//       )} */}

//       <StatusIcons
//         hunger={hunger}
//         sleep={sleep}
//         hygiene={hygiene}
//         fun={fun}
//         iconColor="#D3B4D9"
//         iconSize={24}
//       />

//       <TouchableOpacity onPress={() => navigation.navigate('details', { id: item.id })}>
//         <Image
//           source={characters[item.image]?.charactere || require('assets/images/radioactive.png')}
//           style={styles.image}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     marginTop: 20,
//     color: '#D3B4D9',
//   },
//   textName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#D3B4D9'
//   },

//   menuPlanet: {
//     flexDirection: 'row',
//     padding: 12,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   statusContainer: {
//     padding: 20,
//     color: '#D3B4D9',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: '#D3B4D9',
//     fontSize: 16,
//   },
// });

// export default Status;




































// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import StatusIcons from '../components/StatusIcons';
// import { characters } from '@/components/Characters';
// import { useDatabase } from '../app/database/service';

// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// type AttributesProps = {
//   hunger: number;
//   sleep: number;
//   hygiene: number;
//   fun: number;
// };

// const Status = () => {
//   const { getTamagotchis, getTamagotchiState } = useDatabase();
//   const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTamagotchis = async () => {
//       try {
//         const tamagotchisList = await getTamagotchis();
//         setTamagotchis(tamagotchisList);
//       } catch (error) {
//         console.error('Erro ao buscar Tamagotchis:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTamagotchis();
//   }, [getTamagotchis]);

//   const renderItem = ({ item }: { item: Tamagotchi }) => {
//     const { id, name, image } = item;
//     const [attributes, setAttributes] = useState<AttributesProps | null>(null);

//     useEffect(() => {
//       const fetchAttributes = async () => {
//         try {
//           const state = await getTamagotchiState(id);
//           setAttributes(state);
//         } catch (error) {
//           console.error('Erro ao buscar estado do Tamagotchi:', error);
//         }
//       };

//       fetchAttributes();
//     }, [id, getTamagotchiState]);

//     if (!attributes) {
//       return <ActivityIndicator size="small" color="#0000ff" />;
//     }

//     return (
//       <View style={styles.itemContainer}>
//         <Text style={styles.textName}>{name}</Text>
//         <StatusIcons
//           hunger={attributes.hunger}
//           sleep={attributes.sleep}
//           hygiene={attributes.hygiene}
//           fun={attributes.fun}
//           iconColor="black"
//           iconSize={24}
//         />
//         <TouchableOpacity>
//           <Image
//             source={characters[image]?.charactere || require('assets/images/radioactive.png')}
//             style={styles.image}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <FlatList
//       data={tamagotchis}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//       contentContainerStyle={styles.statusContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   textName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   statusContainer: {
//     padding: 20,
//   },
// });

// export default Status;












// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import StatusIcons from '../components/StatusIcons';
// import { characters } from '@/components/Characters';
// import { useDatabase } from '../app/database/service';

// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// const Status = () => {
//   const { getTamagotchis, getTamagotchiState } = useDatabase();
//   const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTamagotchis = async () => {
//       try {
//         const tamagotchisList = await getTamagotchis();
//         setTamagotchis(tamagotchisList);
//       } catch (error) {
//         console.error('Erro ao buscar Tamagotchis:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTamagotchis();
//   }, [getTamagotchis]);

//   const renderItem = ({ item }: { item: Tamagotchi }) => {
//     const { id, name, image } = item;
//     const [attributes, setAttributes] = useState<any | null>(null);

//     useEffect(() => {
//       const fetchAttributes = async () => {
//         try {
//           const state = await getTamagotchiState(id);
//           setAttributes(state);
//         } catch (error) {
//           console.error('Erro ao buscar estado do Tamagotchi:', error);
//         }
//       };

//       fetchAttributes();
//     }, [id, getTamagotchiState]);

//     if (!attributes) {
//       return <ActivityIndicator size="small" color="#0000ff" />;
//     }

//     return (
//       <View style={styles.itemContainer}>
//         <Text style={styles.textName}>{name}</Text>
//         <StatusIcons
//           hunger={attributes.hunger}
//           sleep={attributes.sleep}
//           hygiene={attributes.hygiene}
//           fun={attributes.fun}
//           iconColor="black"
//           iconSize={24}
//         />
//         <TouchableOpacity>
//           <Image
//             source={characters[image]?.charactere || require('assets/images/radioactive.png')}
//             style={styles.image}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <FlatList
//       data={tamagotchis}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//       contentContainerStyle={styles.statusContainer}
//     />
//   );
// };
// export default Status;

// const styles = StyleSheet.create({
//   itemContainer: {
//     alignItems: 'center',
//     margin: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//   },
//   textName: {
//     fontSize: 16,
//     color: '#D3B4D9',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
// });








// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import StatusIcons from '../components/StatusIcons';
// import { characters } from '@/components/Characters';
// import { useDatabase } from '../app/database/service';

// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// const Status = () => {
//   const { getTamagotchis, getTamagotchiState } = useDatabase();
//   const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTamagotchis = async () => {
//       try {
//         const tamagotchisList = await getTamagotchis();
//         setTamagotchis(tamagotchisList);
//       } catch (error) {
//         console.error('Erro ao buscar Tamagotchis:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTamagotchis();
//   }, [getTamagotchis]);

//   const renderItem = ({ item }: { item: Tamagotchi }) => {
//     const { id, name, image } = item;

//     // Buscar o estado do Tamagotchi
//     const [attributes, setAttributes] = useState<any | null>(null);

//     useEffect(() => {
//       const fetchAttributes = async () => {
//         const state = await getTamagotchiState(id);
//         setAttributes(state);
//       };

//       fetchAttributes();
//     }, [id, getTamagotchiState]);

//     if (!attributes) {
//       return null; // ou algum componente de carregamento
//     }

//     return (
//       <View style={styles.itemContainer}>
//         <Text style={styles.textName}>{name}</Text>
//         <StatusIcons
//           hunger={attributes.hunger}
//           sleep={attributes.sleep}
//           hygiene={attributes.hygiene}
//           fun={attributes.fun}
//           iconColor="black"
//           iconSize={24}
//         />
//         <TouchableOpacity>
//           <Image
//             source={characters[image]?.charactere || require('assets/images/radioactive.png')}
//             style={styles.image}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <FlatList
//       data={tamagotchis}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//       contentContainerStyle={styles.statusContainer}
//     />
//   );
// };








// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   itemContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//   },
//   textName: {
//     fontSize: 16,
//     color: '#D3B4D9',
//   },
// });

// export default Status;




// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { useAttributes } from '../components/Attributes';
// import StatusIcons from '../components/StatusIcons';
// import { useRouter } from 'expo-router';
// import { characters } from '@/components/Characters';


// interface Tamagotchi {
//   id: number;
//   name: string;
//   image: number;
// }
// interface StatusProps {
//   route: {
//     params: {
//       tamagotchi: Tamagotchi;
//     };
//   };
// }

// const Status = ({ route }: StatusProps) => {
//   const router = useRouter();
//   const { tamagotchi } = route.params;

//   const { hunger, sleep, hygiene, fun } = useAttributes(tamagotchi.id);

//   return (
//     <View style={styles.itemContainer}>
//       <Text style={styles.textName}>{tamagotchi.name}</Text>
//       <StatusIcons
//         hunger={hunger}
//         sleep={sleep}
//         hygiene={hygiene}
//         fun={fun}
//         iconColor="black"
//         iconSize={24}
//       />

//       <TouchableOpacity onPress={() => router.push({ pathname: '/details', params: { id: tamagotchi.id } })}>
//         <Image
//           source={characters[tamagotchi.image]?.charactere || require('assets/images/radioactive.png')}
//           style={styles.image}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };






// interface StatusProps {
//   tamagotchi: Tamagotchi;
// }

// const Status = ({ tamagotchi }: StatusProps) => {
//   const router = useRouter();

//   const { hunger, sleep, hygiene, fun } = useAttributes(tamagotchi.id);

//   return (
//     <View style={styles.itemContainer}>
//       <Text style={styles.textName}>{tamagotchi.name}</Text>
//       <StatusIcons
//         hunger={hunger}
//         sleep={sleep}
//         hygiene={hygiene}
//         fun={fun}
//         iconColor="black"
//         iconSize={24}
//       />

//       <TouchableOpacity onPress={() => router.push({ pathname: '/details', params: { id: tamagotchi.id } })}>
//         <Image
//           source={characters[tamagotchi.image]?.charactere || require('assets/images/radioactive.png')}
//           style={styles.image}
//         />
//       </TouchableOpacity>



//     </View>
//   );
// };

// export default Status;












// ESSE STATUS AQUIIIIIIII!!!!!!!!!!!!!!!!!!!!

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   menuPlanet: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignSelf: 'stretch',
//     padding: 12,
//   },
//   itemContainer: {
//     alignItems: 'center',
//     margin: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//   },
//   textName: {
//     fontSize: 16,
//     color: '#D3B4D9',
//   },
//   textStatus: {
//     fontSize: 14,
//     color: '#D3B4D9',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     marginTop: 20,
//   },
//   status: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 96,
//     height: 96,
//     padding: 4,
//   },
//   textNumber: {
//     color: '#D3B4D9',
//     fontSize: 24,
//     fontWeight: '600',
//   },
// });
















// // screens/Status.tsx
// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useDatabase } from '../app/database/service';
// import { Attributes } from '../components/Attributes';
// import { characters } from '../components/Characters';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import galaxy from 'assets/images/galaxy1.jpg';

// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// const Status = () => {
//   const router = useRouter();
//   const { getTamagotchis } = useDatabase();
//   const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);

//   useEffect(() => {
//     const fetchTamagotchis = async () => {
//       try {
//         const result = await getTamagotchis();
//         setTamagotchis(result);
//       } catch (error) {
//         console.error("Erro ao buscar Tamagotchis:", error);
//       }
//     };
//     fetchTamagotchis();
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground source={galaxy} style={styles.backgroundImage}>
//         <FlatList
//           data={tamagotchis}
//           renderItem={({ item }) => (
//             <View style={styles.itemContainer}>
//               <TouchableOpacity onPress={() => router.push({ pathname: 'details', params: { id: item.id } })}>
//                 <Image
//                   source={characters[item.image]?.charactere || require('assets/images/radioactive.png')}
//                   style={styles.image}
//                 />
//               </TouchableOpacity>


//               <Text style={styles.textName}>{item.name}</Text>
//               <Attributes id={item.id} />
//               <TouchableOpacity onPress={() => router.push('details', { id: item.id })}>
//                 <Image source={characters[item.image]?.charactere || require('assets/images/radioactive.png')} style={styles.image} />
//               </TouchableOpacity>
//             </View>
//           )}
//           numColumns={2}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };







// import * as React from 'react';
// import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList, Image, ImageBackground } from "react-native";
// import { useRouter } from 'expo-router';
// import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
// import { Condition } from "@/components/Condition";
// import { Attributes } from "@/components/Attributes";
// import StatusIcons from "@/components/StatusIcons";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useDatabase } from "./database/service";
// import galaxy from "assets/images/galaxy1.jpg";
// import { characters } from "@/components/Characters"; // Importe o arquivo onde os personagens estão definidos
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from './_layout';


// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// type ScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<RootStackParamList, 'status'>,
//   StackNavigationProp<RootStackParamList>
// >;



// const Status = () => {
//   const navigation = useNavigation<ScreenNavigationProp>();
//   const router = useRouter();
//   const { hunger, sleep, hygiene, fun } = Attributes();
//   const { message } = Condition({ hunger, sleep, hygiene, fun });

//   const { getTamagotchis } = useDatabase();
//   const [tamagotchis, setTamagotchis] = React.useState<Tamagotchi[]>([]);

//   React.useEffect(() => {
//     const fetchTamagotchis = async () => {
//       try {
//         const result: Tamagotchi[] = await getTamagotchis();
//         setTamagotchis(result);
//       } catch (error) {
//         console.error("Erro ao buscar Tamagotchis:", error);
//       }
//     };

//     fetchTamagotchis();
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground source={galaxy} style={styles.backgroundImage}>
//         <View style={styles.menuPlanet}>
//           <TouchableOpacity onPress={() => navigation.navigate('index')}>
//             <Ionicons name="planet" size={48} color="#D3B4D9" />
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={tamagotchis}
//           renderItem={({ item }) => {
//             const character = characters[item.image]; // Use o índice para acessar o personagem
//             const image = character ? character.charactere : require('assets/images/radioactive.png');

//             return (
//               <View style={styles.itemContainer}>
//                 <Text style={styles.textName}>{item.name}</Text>
//                 <Text style={styles.textStatus}>{message}</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('details', { id: item.id })}>
//                   <Image
//                     source={image}
//                     style={styles.image}
//                   />
//                 </TouchableOpacity>
//                 <StatusIcons
//                   containerStyle={styles.statusContainer}
//                   statusStyle={styles.status}
//                   textStyle={styles.textNumber}
//                   iconColor="#D3B4D9"
//                   iconSize={40}
//                   hunger={hunger}
//                   sleep={sleep}
//                   hygiene={hygiene}
//                   fun={fun}
//                 />
//               </View>
//             );
//           }}
//           numColumns={2}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };





















// import * as React from 'react';
// import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList, Image, ImageBackground } from "react-native";
// import { useRouter } from 'expo-router';
// import { useNavigation } from '@react-navigation/native';
// import { Condition } from "@/components/Condition";
// import { Attributes } from "@/components/Attributes";
// import { CompositeNavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from './_layout';
// import { StackNavigationProp } from '@react-navigation/stack';
// import StatusIcons from "@/components/StatusIcons";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useDatabase } from "./database/service";

// import galaxy from "assets/images/galaxy1.jpg";

// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// type ScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<RootStackParamList, 'status'>,
//   StackNavigationProp<RootStackParamList>
// >;

// const Status = () => {
//   const navigation = useNavigation<ScreenNavigationProp>();
//   const router = useRouter();
//   const { hunger, sleep, hygiene, fun } = Attributes();
//   const { message } = Condition({ hunger, sleep, hygiene, fun });

//   const { getTamagotchis } = useDatabase();
//   const [tamagotchis, setTamagotchis] = React.useState<Tamagotchi[]>([]);

//   React.useEffect(() => {
//     const fetchTamagotchis = async () => {
//       try {
//         const result: Tamagotchi[] = await getTamagotchis();
//         setTamagotchis(result);
//       } catch (error) {
//         console.error("Erro ao buscar Tamagotchis:", error);
//       }
//     };

//     fetchTamagotchis();
//   }, []);

//   return (




//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground source={galaxy} style={styles.backgroundImage}>
//         <Image
//           source={require('assets/images/alien-gangster-chefao - notselected.png')} // Teste com uma imagem estática
//           style={styles.image}
//         />
//         <View style={styles.menuPlanet}>
//           <TouchableOpacity onPress={() => navigation.navigate('index')}>
//             <Ionicons name="planet" size={48} color="#D3B4D9" />
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={tamagotchis}
//           renderItem={({ item }) => (
//             <View style={styles.itemContainer}>
//               <Text style={styles.textName}>
//                 {item.name}
//               </Text>

//               <Text style={styles.textStatus}>
//                 {message} {/* Certifique-se de que `message` é uma string */}
//               </Text>

//               <TouchableOpacity onPress={() => navigation.navigate('details', { id: item.id })}>
//                 <Image
//                   source={item.image}
//                   style={styles.image}
//                 />
//               </TouchableOpacity>

//               <StatusIcons
//                 containerStyle={styles.statusContainer}
//                 statusStyle={styles.status}
//                 textStyle={styles.textNumber}
//                 iconColor="#D3B4D9"
//                 iconSize={40}
//                 hunger={hunger}
//                 sleep={sleep}
//                 hygiene={hygiene}
//                 fun={fun}
//               />
//             </View>
//           )}
//           // numColumns={4}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   menuPlanet: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignSelf: 'stretch',
//     padding: 12,
//   },
//   itemContainer: {
//     // Adicione estilos apropriados aqui
//   },
//   textName: {
//     color: "#D3B4D9",
//     fontSize: 36,
//     fontWeight: "500",
//   },
//   textStatus: {
//     color: "#D3B4D9",
//     fontSize: 30,
//     fontWeight: "500",
//   },
//   textNumber: {
//     color: "#D3B4D9",
//     fontSize: 22,
//     fontWeight: "500",
//   },
//   image: {
//     width: 100, // Ajuste conforme necessário
//     height: 100, // Ajuste conforme necessário
//     resizeMode: 'cover', // Ajuste conforme necessário
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     marginTop: 20,
//   },
//   status: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 96,
//     height: 96,
//     padding: 4,
//   },

// });

// export default Status;














// import * as React from 'react';
// import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList, Image, ImageBackground } from "react-native";
// import { useRouter } from 'expo-router';
// import { useNavigation } from '@react-navigation/native';
// import { Condition } from "@/components/Condition";
// import { Attributes } from "@/components/Attributes";
// import { CompositeNavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from './_layout';
// import { StackNavigationProp } from '@react-navigation/stack';
// import StatusIcons from "@/components/StatusIcons";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useDatabase } from "./database/service";

// import galaxy from "assets/images/galaxy1.jpg";

// type Tamagotchi = {
//   id: number;
//   image: number;
//   name: string;
// };

// type ScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<RootStackParamList, 'status'>,
//   StackNavigationProp<RootStackParamList>
// >;

// const Status = () => {
//   const navigation = useNavigation<ScreenNavigationProp>();
//   const router = useRouter();
//   const { hunger, sleep, hygiene, fun } = Attributes();
//   const { message } = Condition({ hunger, sleep, hygiene, fun });

//   const { getTamagotchis } = useDatabase();
//   const [tamagotchis, setTamagotchis] = React.useState<Tamagotchi[]>([]);

//   React.useEffect(() => {
//     const fetchTamagotchis = async () => {
//       try {
//         const result: Tamagotchi[] = await getTamagotchis();
//         setTamagotchis(result);
//       } catch (error) {
//         console.error("Erro ao buscar Tamagotchis:", error);
//       }
//     };

//     fetchTamagotchis();
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground source={galaxy} style={styles.backgroundImage}>

//         <View style={styles.menuPlanet}>
//           <TouchableOpacity onPress={() => navigation.navigate('index')}>
//             <Ionicons name="planet" size={48} color="#D3B4D9" />
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={tamagotchis}
//           renderItem={({ item }) => (
//             <View style={styles.itemContainer}>
//               <Text style={styles.textName}>
//                 {item.name}
//               </Text>

//               <Text style={styles.textStatus}>
//                 {message}
//               </Text>

//               <TouchableOpacity onPress={() => navigation.navigate('details', { id: item.id })}> {/* Navegação usando react-navigation */}
//                 <Image
//                   source={item.image}
//                   style={styles.image}
//                 />
//               </TouchableOpacity>

//               <StatusIcons
//                 containerStyle={styles.statusContainer}
//                 statusStyle={styles.status}
//                 textStyle={styles.textNumber}
//                 iconColor="#D3B4D9"
//                 iconSize={40}
//                 hunger={hunger}
//                 sleep={sleep}
//                 hygiene={hygiene}
//                 fun={fun}
//               />
//             </View>
//           )}
//           numColumns={2}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default Status;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   menuPlanet: {
//     flexDirection: 'row',
//     padding: 12,
//   },
//   itemContainer: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10,
//     marginTop: 10,
//     marginBottom: 50,
//   },
//   image: {
//     width: 150,
//     height: 150,
//     marginBottom: 10,
//   },
//   textName: {
//     color: "#D3B4D9",
//     fontSize: 20,
//     fontWeight: '500',
//   },
//   textStatus: {
//     fontSize: 24,
//     color: "white",
//     paddingBottom: 6,
//   },
//   textNumber: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: '500',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 4,
//   },
//   status: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 44,
//     height: 44,
//   },
// });











