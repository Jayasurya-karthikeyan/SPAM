import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Report from "./ReportGeneration";

export default function AppUsage({ navigation }) {
  const cardsData = [
    {
      id: 1,
      image: require("../assets/logo/expo.png"),
      title: "Expo Go",
      description: "1 Hour 20 minutes",
    },
    {
      id: 18,
      image: require("../assets/logo/youtube.png"),
      title: "Youtube",
      description: "1 Hour 02 minutes",
    },
    {
      id: 2,
      image: require("../assets/logo/settings.png"),
      title: "Settings",
      description: "20 minutes",
    },
    {
      id: 3,
      image: require("../assets/logo/google.png"),
      title: "Google",
      description: "5 minutes",
    },

    {
      id: 4,
      image: require("../assets/logo/playstore.png"),
      title: "Play Store",
      description: "Recently not used",
    },
    {
      id: 5,
      image: require("../assets/logo/chrome.png"),
      title: "Chrome",
      description: "Recently not used",
    },
    {
      id: 6,
      image: require("../assets/logo/google-calendar.png"),
      title: "Calendar",
      description: "Recently not used",
    },
    {
      id: 7,
      image: require("../assets/logo/camera.png"),
      title: "Camera",
      description: "Recently not used",
    },
    {
      id: 8,
      image: require("../assets/logo/clock.png"),
      title: "Clock",
      description: "Recently not used",
    },
    {
      id: 9,
      image: require("../assets/logo/google-contacts.png"),
      title: "Contacts",
      description: "Recently not used",
    },
    {
      id: 10,
      image: require("../assets/logo/google-drive.png"),
      title: "Google-Drive",
      description: "Recently not used",
    },
    {
      id: 11,
      image: require("../assets/logo/gmail.png"),
      title: "G-mail",
      description: "Recently not used",
    },
    {
      id: 12,
      image: require("../assets/logo/folder.png"),
      title: "File Manager",
      description: "Recently not used",
    },
    {
      id: 13,
      image: require("../assets/logo/google-maps.png"),
      title: "Map",
      description: "Recently not used",
    },
    {
      id: 14,
      image: require("../assets/logo/email.png"),
      title: "Messanger",
      description: "Recently not used",
    },
    {
      id: 15,
      image: require("../assets/logo/google-duo.png"),
      title: "Duo",
      description: "Recently not used",
    },
    {
      id: 16,
      image: require("../assets/logo/telephone.png"),
      title: "Phone",
      description: "Recently not used",
    },
    {
      id: 17,
      image: require("../assets/logo/photos.png"),
      title: "Google-Photos",
      description: "Recently not used",
    },
    {
      id: 19,
      image: require("../assets/logo/google-play-movie.png"),
      title: "Play movies & TV",
      description: "Recently not used",
    },
    {
      id: 20,
      image: require("../assets/logo/youtube-music.png"),
      title: "YT Music",
      description: "Recently not used",
    },
  ];
  const handlePress = () => {
    // navigation.navigate("KeyPad");
  };
  const Card = ({ image, title, description }) => {
    return (
      <>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cardsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            image={item.image}
            title={item.title}
            description={item.description}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

//   const Card = ({ image, title, description }) => {
//     return (
//       <View style={styles.card}>
//         <View style={styles.up}>
//           <Image source={image} style={styles.image} resizeMode="contain" />
//           <Text style={styles.title}>{title}</Text>
//         </View>

//         <View>
//           <Text style={styles.description}>{description}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <FlatList
//           data={cardsData}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <Card
//               image={item.image}
//               title={item.title}
//               description={item.description}
//             />
//           )}
//         />
//       </View>
//     </>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f2f2f2",
//   },
//   card: {
//     flex: 1,
//     // flexDirection: "row",

//     alignItems: "stretch",
//     // justifyContent:"center",
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },

//   up:{
// flex:1,
// flexDirection:"row",
// justifyContent:"space-between"

//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "bold",
//     marginRight: 150,
//     alignItems:"center"

//   },
//   description: {
//     flex: 1,
//     fontSize: 18,
//     marginTop:4,
//     color: "#666",
//   },
//   image: {
//     width: 50,
//     height: 50,
//   },
// });
