import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { auth, db } from "../FireBase";
import { get, ref, set } from "firebase/database";

export default function Emotion() {
  const [hasPermission, setHasPermission] = useState(null);
  const [detect, setDetect] = useState(true);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
  const [faceData, setFaceData] = useState([]);
  const cameraRef = useRef(null);
  const [data, setData] = useState(null);

  const EMOTIONS = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Neutral",
    "Sad",
    "Surprise",
  ];

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    requestCameraPermission();
    // loadModel();
  }, []);

  const loadModel = async () => {
    try {
      const modelJson = require("../models/fer.json");
      const modelWeights = require("./path/to/model-weights.bin");
      await tf.ready();
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeights)
      );
      console.log("Model loaded successfully!");
      // Use the model for prediction
      // ...
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const currentUser = auth.currentUser;
  const userId = currentUser.uid;

  const getEmotion = (faceData) => {
    const leftEye = faceData.LEFT_EYE;
    const rightEye = faceData.RIGHT_EYE;
    const noseTip = faceData.NOSE_BASE;
    const mouthLeft = faceData.LEFT_MOUTH;
    const mouthRight = faceData.RIGHT_MOUTH;

    const distance = (point1, point2) => {
      return Math.sqrt(
        Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
      );
    };

    const eyeDistance = distance(leftEye, rightEye);
    const mouthDistance = distance(mouthLeft, mouthRight);

    const eyeHeightDiff = (leftEye.y - rightEye.y) / eyeDistance;
    const mouthHeightDiff = (mouthLeft.y - mouthRight.y) / mouthDistance;

    if (eyeHeightDiff > 0.25 && mouthHeightDiff < -0.2) {
      return "Happy";
    } else if (eyeHeightDiff < -0.25 && mouthHeightDiff > 0.2) {
      return "Sad";
    } else if (eyeHeightDiff < -0.25 && mouthHeightDiff < -0.2) {
      return "Angry";
    } else if (eyeHeightDiff > 0.25 && mouthHeightDiff > 0.2) {
      return "Surprised";
    } else {
      return "Neutral";
    }
  };

  const handleFacesDetected = ({ faces }) => {
    // console.log(faces);

    setFaceData(faces);
    if (faces.length != 0) {
      let prob = faces[0].smilingProbability;
      console.log(
        prob,
        prob < 0.1 ? "Sad" : prob < 0.4 ? "Neutral" : "Happy",
        "=> ",
        getEmotion(faces[0])
      );
      setSum(sum + prob);
      setCount(count + 1);
      if (count == 10) {
        const val = sum / 10;
        setDetect(false);
        let emotionn = val < 0.1 ? "Sad" : val < 0.4 ? "Neutral" : "Happy";

        const usersRef = ref(db, "Users");
        if (currentUser) {
          get(usersRef)
            .then((snapshot) => {
              const usersData = snapshot.val();
              let usersArray;

              // If "Users" data doesn't exist, create a new array
              if (!usersData) {
                usersArray = [];
              } else {
                // If "Users" data exists, convert it to an array
                usersArray = Object.values(usersData);
              }

              // Find the user with the matching user ID
              const userIndex = usersArray.findIndex(
                (user) => user.uid === userId
              );

              if (userIndex !== -1) {
                // User found, update the location parameter
                usersArray[userIndex].emotion = emotionn;

                // Set the updated array back to the "Users" reference in the database
                set(usersRef, usersArray)
                  .then(() => {
                    console.log("Emotion data added successfully.");
                  })
                  .catch((error) => {
                    console.error("Error adding Emotion data:", error);
                  });
              } else {
                console.log("User not found.");
              }
            })
            .catch((error) => {
              console.error("Error retrieving current user data:", error);
            });
        } else {
          console.log("No user is currently logged in.");
        }

        console.log(
          "Average: ",
          val,
          val < 0.1 ? "Sad" : val < 0.4 ? "Neutral" : "Happy"
        );
      }
    } else console.log("No Faces Detected");
  };

  return (
    <View style={styles.container}>
      {detect && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={cameraRef}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 500,
            tracking: true,
          }}
        ></Camera>
      )}
      {!detect && (
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={startCamera}> */}
          <View>
            <Text style={styles.text1}>Your current emotion is:</Text>
            <Text style={styles.text}>
              {sum / 10 < 0.1 ? "Sad" : sum / 10 < 0.4 ? "Neutral" : "Happy"}
            </Text>
          </View>

          <View style={styles.btn}>
            <Button
              title="Recognise Emotion"
              onPress={() => {
                setDetect(true);
                setSum(0);
              }}
            />
            {/* </TouchableOpacity> */}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    // height:0,
    // width:0
    // display: "none",
  },
  buttonContainer: {
    // flex: 0.1,
    backgroundColor: "transparent",
    // flexDirection: "row",
    margin: 20,
  },
  btn: {
    margin: 20,
    marginTop: 30,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text1: {
    fontSize: 30,
    color: "#000",
  },
  text: {
    fontSize: 80,
    color: "#000",
  },
  faceSquare: {
    position: "absolute",
    borderColor: "#FFD700",
    borderWidth: 10,
  },
  // faces: {
  //   backgroundColor: "#ffffff",
  //   alignSelf: "stretch",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   margin: 16,
  // },
  // faceDesc: {
  //   fontSize: 20,
  // },
});

// // import React, { useState, useEffect, useRef } from "react";
// // import { StyleSheet, Text, View } from "react-native";
// // import { Camera } from "expo-camera";

// // export default function App() {
// //   const [hasPermission, setHasPermission] = useState(null);
// //   const [cameraFrames, setCameraFrames] = useState([]);
// //   const cameraRef = useRef(null);

// //   useEffect(() => {
// //     (async () => {
// //       const { status } = await Camera.requestPermissionsAsync();
// //       setHasPermission(status === "granted");
// //     })();
// //   }, []);

// //   useEffect(() => {
// //     if (cameraRef.current) {
// //       setTimeout(() => {
// //         cameraRef.current.stopRecording();
// //         handleCameraClose();
// //       }, 5000);
// //     }
// //   }, [cameraRef.current]);

// //   const handleCameraClose = () => {
// //     console.log("Captured frames:", cameraFrames);
// //     setCameraFrames([]);
// //     cameraRef.current=null;
// //   };

// //   const handleCameraReady = () => {
// //     cameraRef.current.startPreview();
// //   };

// //   const handleCameraFrame = (data) => {
// //     setCameraFrames((prevFrames) => [...prevFrames, data]);
// //   };

// //   if (hasPermission === null) {
// //     return <View />;
// //   }

// //   if (hasPermission === false) {
// //     return <Text>No access to camera</Text>;
// //   }

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <Camera
// //         style={{ flex: 1 }}
// //         type={Camera.Constants.Type.front}
// //         ref={cameraRef}
// //         onCameraReady={() => {
// //           console.log("ready");
// //           cameraRef.current.startPreview();
// //         }}
// //         onCameraFrame={(data) => {
// //           console.log("setframes");
// //           setCameraFrames((prevFrames) => [...prevFrames, data]);
// //         }}
// //       />
// //       {/* <View style={{ height: 100 }}>
// //         {cameraFrames.map((frame, index) => (
// //           <Text key={index}>
// //             Frame {index + 1}: {frame}
// //           </Text>
// //         ))}
// //       </View> */}
// //     </View>
// //   );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Camera } from "expo-camera";
// import * as FaceDetector from "expo-face-detector";
// // import * as FileSystem from "expo-file-system";
// // import * as tf from "@tensorflow/tfjs";
// // import * as tmImage from "@teachablemachine/image";

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [detect, setDetect] = useState(true);
//   const [count, setCount] = useState(0);
//   const [sum, setSum] = useState(0);
//   const [faceData, setFaceData] = useState([]);
//   const [cameraFrames, setCameraFrames] = useState([]);
//   const cameraRef = useRef(null);
//   const [model, setModel] = useState(null);
//   const [data, setData] = useState(null);
//   const [isModelReady, setIsModelReady] = useState(false);
//   const [emotion, setEmotion] = useState(null);

//   const EMOTIONS = [
//     "Angry",
//     "Disgust",
//     "Fear",
//     "Happy",
//     "Neutral",
//     "Sad",
//     "Surprise",
//   ];

//   const requestCameraPermission = async () => {
//     const { status } = await Camera.requestPermissionsAsync();
//     setHasPermission(status === "granted");
//   };

//   // const loadModel = async () => {
//   //   const modelURL = "./model/model.json";
//   //   const metadataURL = "./model/metadata.json";
//   //   const model = await tmImage.load(modelURL, metadataURL);
//   //   setModel(model);
//   //   setIsModelReady(true);
//   // };

//   // const handleCameraClose = () => {
//   //   console.log("Captured frames:", cameraFrames);
//   //   setCameraFrames([]);
//   //   cameraRef.current = null;
//   //   setIsModelReady(false);
//   //   setEmotion(null);
//   // };

//   // const handleCameraReady = () => {
//   //   cameraRef.current.startPreview();
//   // };

//   // const handleCameraFrame = async (data) => {
//   //   if (isModelReady) {
//   //     const tensor = tf.browser
//   //       .fromPixels(data, 3)
//   //       .resizeNearestNeighbor([224, 224])
//   //       .toFloat()
//   //       .div(tf.scalar(255));
//   //     const predictions = await model.predict(tensor).data();
//   //     setEmotion(predictions.indexOf(Math.max(...predictions)));
//   //     tensor.dispose();
//   //   }
//   //   setCameraFrames((prevFrames) => [...prevFrames, data]);
//   // };

//   const startCamera = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true };
//       const photo = await cameraRef.current.takePictureAsync(options);
//       const formData = new FormData();
//       const file = new Blob([photo], { type: "image/jpeg" });
//       formData.append("file", file);
//       // console.warn("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", photo);
//       console.warn("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", file);

//       // formData.append("file", file);

//       // loadModel();
//       fetch("http://192.168.248.88:5000/predict")
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("insdem 2 then");
//           setData(data);
//           console.table(data);
//         })
//         .catch((e) => {
//           console.log("insdem errr");
//           console.log(e);
//         });

//       fetch("http://192.168.248.88:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         body: formData,
//       })
//         .then((response) => response.text())
//         .then((content) => {
//           console.log("insdem 2 then");
//           console.log(content); // Check the response content
//           const result = JSON.parse(content);
//           // ...
//         })
//         .catch((error) => {
//           console.log("insdem errr");
//           console.log(error);
//         });
//     }
//   };
//   // let sum = 0;
//   // let count = 0;
//   useEffect(() => {
//     requestCameraPermission();
//     // setTimeout(() => setDetect(false), 3000);
//     // loadModel();
//     // fetch("http://192.168.248.88:5000/predict")
//     //   .then((res) => res.json())
//     //   .then((data) => {
//     //     console.log("insdem 2 then");
//     //     setData(data);
//     //     console.log(data);
//     //   })
//     //   .catch((e) => {
//     //     console.log("insdem errr");
//     //     console.log(e);
//     //   });
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   function getFaceDataView() {
//     if (faceData.length === 0) {
//       return (
//         <View style={styles.faces}>
//           <Text style={styles.faceDesc}>No faces :(</Text>
//         </View>
//       );
//     } else {
//       return faceData.map((face, index) => {
//         const eyesShut =
//           face.rightEyeOpenProbability < 0.4 &&
//           face.leftEyeOpenProbability < 0.4;
//         const winking =
//           !eyesShut &&
//           (face.rightEyeOpenProbability < 0.4 ||
//             face.leftEyeOpenProbability < 0.4);
//         const smiling = face.smilingProbability > 0.7;
//         return (
//           <View style={styles.faces} key={index}>
//             <Text style={styles.faceDesc}>
//               Eyes Shut: {eyesShut.toString()}
//             </Text>
//             <Text style={styles.faceDesc}>Winking: {winking.toString()}</Text>
//             <Text style={styles.faceDesc}>Smiling: {smiling.toString()}</Text>
//           </View>
//         );
//       });
//     }
//   }

//   const handleFacesDetected = ({ faces }) => {
//     setFaceData(faces);
//     if (faces.length != 0) {
//       let prob = faces[0].smilingProbability;
//       console.log(
//         prob,
//         prob < 0.15 ? "Sad" : prob < 0.45 ? "Neutral" : "Happy"
//       );
//       setSum((sum + prob) / 2);
//       setCount(count + 1);
//       if (count == 10) {
//         setDetect(false);
//         console.log(
//           "Average: ",
//           sum,
//           sum < 0.15 ? "Sad" : sum < 0.45 ? "Neutral" : "Happy"
//         );
//       }
//     } else console.log("No Faces Detected");
//   };

//   return (
//     // <View style={{ flex: 1 }}>
//     //   {/* {data} */}

//     //   {/* <Camera
//     //     style={{ flex: 1 }}
//     //     type={Camera.Constants.Type.front}
//     //     ref={cameraRef}
//     //     onCameraReady={handleCameraReady}
//     //     onCameraFrame={handleCameraFrame}
//     //   />
//     //   {emotion !== null && (
//     //     <View style={{ height: 100 }}>
//     //       <Text>Detected emotion: {EMOTIONS[emotion]}</Text>
//     //     </View>
//     //   )} */}
//     // </View>

//     <View style={styles.container}>
//       {detect && (
//         <Camera
//           style={styles.camera}
//           type={Camera.Constants.Type.front}
//           ref={cameraRef}
//           onFacesDetected={handleFacesDetected}
//           faceDetectorSettings={{
//             mode: FaceDetector.FaceDetectorMode.fast,
//             detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
//             runClassifications: FaceDetector.FaceDetectorClassifications.all,
//             minDetectionInterval: 500,
//             tracking: true,
//           }}
//         >
//           {/* <Text style={styles.text}>Happy</Text> */}
//           {/* {getFaceDataView()} */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={startCamera}>
//               <Text style={styles.text}>Take Picture</Text>
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     // display: "none",
//   },
//   buttonContainer: {
//     flex: 0.1,
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     margin: 20,
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: "flex-end",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 18,
//     color: "white",
//   },
//   // faces: {
//   //   backgroundColor: "#ffffff",
//   //   alignSelf: "stretch",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   //   margin: 16,
//   // },
//   // faceDesc: {
//   //   fontSize: 20,
//   // },
// });
