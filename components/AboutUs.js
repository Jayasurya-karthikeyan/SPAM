import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "react-native-vector-icons";
import about from "../assets/about.png";

const Aboutus = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {

  const fetchData = () => {
    console.log("clicked");
    // fetch("http://10.0.2.2:5000/predict")
    fetch("http://192.168.248.88:5000/predict")
      .then((res) => res.json())
      .then((data) => {
        console.log("insdem 2 then");
        setData(data);
        console.log(data);
      })
      .catch((e) => {
        console.log("insdem errr");
        console.log(e);
      });
    // }, []);
  };
  // let a=1//;/
  // useEffect(()=> console.log(a++,data),[])

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
            >
              {data}
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#005114",
                  padding: 5,
                  textAlign: "center",
                }}
                onPress={() => fetchData()}
              >
                SPAM
              </Text>
            </View>

            <View>
              <Image
                source={about}
                style={{
                  height: 350,
                  width: 330,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Our Mission
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 15, padding: 10 }}>
                To provide children activity maintenance and genetrate a report
                and that will be sent to the parents
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                  textAlign: "center",
                }}
              >
                Contact us
              </Text>
            </View>
            <View style={styles.contact}>
              <View>
                <Text style={styles.InputHighLight}>Email :</Text>
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  label="Enter Email"
                  //   style={{ marginLeft: 0 }}
                />
              </View>
              <View>
                <Text style={styles.InputHighLight}>Message :</Text>
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  label="Enter Message"
                  //   style={{ height: 150, marginLeft: 0 }}
                />
              </View>
              <View>
                <Button
                  style={{
                    margin: 10,
                    backgroundColor: "black",
                    marginLeft: 0,
                    // color: "black"
                  }}
                  mode="contained"
                >
                  Submit
                </Button>
              </View>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Follow us on
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-around",
                backgroundColor: "#f6f6f6",
              }}
            >
              <Pressable>
                <Ionicons
                  name="logo-facebook"
                  style={{ color: "#4267B2", fontSize: 30 }}
                />
              </Pressable>
              <Pressable>
                <Ionicons
                  name="logo-instagram"
                  style={styles.icons}
                  //   style={{ color: "#8a3ab9", fontSize: 30 }}
                />
              </Pressable>
              <Pressable>
                <Ionicons
                  name="logo-twitter"
                  style={{ color: "#1DA1F2", fontSize: 30 }}
                />
              </Pressable>
              <Pressable>
                <Ionicons
                  name="logo-github"
                  style={{ color: "#333", fontSize: 30 }}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Aboutus;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    // backgroundColor: "#f6f6f6",
  },
  steps: {
    padding: 4,
  },
  highLight: {
    color: "#2EA2C1",
    fontSize: 17,
  },
  input: {
    width: 300,
    height: 40,
    marginHorizontal: 25,
  },
  contact: {
    padding: 5,
  },
  InputHighLight: {
    padding: 3,
    fontSize: 17,
    // color: "#005114",
    fontWeight: "bold",
  },
});

// // import React from "react";
// import {
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   View,
//   Image,
//   ScrollView,
//   Pressable,
// } from "react-native";
// import { TextInput, Button } from "react-native-paper";
// import Ionicons from "react-native-vector-icons/Ionicons";

// // ***********************************************************************

// import React, { useRef, useEffect } from "react";
// // import "./App.css";
// // import logo from "./logo.svg";

// import * as tf from "@tensorflow/tfjs";
// import { Camera } from "react-native-camera";
// import { drawMesh } from "./utilities";

// import {
//   getModel,
//   convertBase64ToTensor,
//   startPrediction,
// } from "./helpers/tensor-helper";
// import { cropPicture } from "./helpers/image-helper";

//   // const webcamRef = useRef(null);
//   // const canvasRef = useRef(null);
//   // const blazeface = require("@tensorflow-models/blazeface");

//   // //  Load blazeface
//   // const runFaceDetectorModel = async () => {
//   //   const model = await blazeface.load();
//   //   console.log("FaceDetection Model is Loaded..");
//   //   setInterval(() => {
//   //     detect(model);
//   //   }, 100);
//   // };

//   // const detect = async (net) => {
//   //   if (
//   //     typeof webcamRef.current !== "undefined" &&
//   //     webcamRef.current !== null &&
//   //     webcamRef.current.video.readyState === 4
//   //   ) {
//   //     // Get Video Properties
//   //     const video = webcamRef.current.video;
//   //     const videoWidth = webcamRef.current.video.videoWidth;
//   //     const videoHeight = webcamRef.current.video.videoHeight;

//   //     // Set video width
//   //     webcamRef.current.video.width = videoWidth;
//   //     webcamRef.current.video.height = videoHeight;

//   //     // Set canvas width
//   //     canvasRef.current.width = videoWidth;
//   //     canvasRef.current.height = videoHeight;

//   //     // Make Detections
//   //     const face = await net.estimateFaces(video);
//   //     //console.log(face);

//   //     // Websocket
//   //     var socket = new WebSocket("ws://localhost:8000");
//   //     var imageSrc = webcamRef.current.getScreenshot();
//   //     var apiCall = {
//   //       event: "localhost:subscribe",
//   //       data: {
//   //         image: imageSrc,
//   //       },
//   //     };
//   //     socket.onopen = () => socket.send(JSON.stringify(apiCall));
//   //     socket.onmessage = function (event) {
//   //       var pred_log = JSON.parse(event.data);
//   //       document.getElementById("Angry").value = Math.round(
//   //         pred_log["predictions"]["angry"] * 100
//   //       );
//   //       document.getElementById("Neutral").value = Math.round(
//   //         pred_log["predictions"]["neutral"] * 100
//   //       );
//   //       document.getElementById("Happy").value = Math.round(
//   //         pred_log["predictions"]["happy"] * 100
//   //       );
//   //       document.getElementById("Fear").value = Math.round(
//   //         pred_log["predictions"]["fear"] * 100
//   //       );
//   //       document.getElementById("Surprise").value = Math.round(
//   //         pred_log["predictions"]["surprise"] * 100
//   //       );
//   //       document.getElementById("Sad").value = Math.round(
//   //         pred_log["predictions"]["sad"] * 100
//   //       );
//   //       document.getElementById("Disgust").value = Math.round(
//   //         pred_log["predictions"]["disgust"] * 100
//   //       );

//   //       document.getElementById("emotion_text").value = pred_log["emotion"];

//   //       // Get canvas context
//   //       const ctx = canvasRef.current.getContext("2d");
//   //       requestAnimationFrame(() => {
//   //         drawMesh(face, pred_log, ctx);
//   //       });
//   //     };
//   //   }
//   // };

//   // useEffect(() => {
//   //   runFaceDetectorModel();
//   // }, []);

// // ***********************************************************************

// const RESULT_MAPPING = ["Happy", "Sad", "Neutral"];

// const Aboutus = () => {
//     const cameraRef = useRef();
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [presentedShape, setPresentedShape] = useState("");

//     const handleImageCapture = async () => {
//       setIsProcessing(true);
//       const imageData = await cameraRef.current.takePictureAsync({
//         base64: true,
//       });
//       processImagePrediction(imageData);
//     };

//     const processImagePrediction = async (base64Image) => {
//       const croppedData = await cropPicture(base64Image, 300);
//       const model = await getModel();
//       const tensor = await convertBase64ToTensor(croppedData.base64);

//       const prediction = await startPrediction(model, tensor);

//       const highestPrediction = prediction.indexOf(
//         Math.max.apply(null, prediction)
//       );
//       setPresentedShape(RESULT_MAPPING[highestPrediction]);
//     };

//   return (
//     <>
//       <SafeAreaView>
//         {/* <ScrollView>
//           <View style={styles.container}>
//             <Text
//               style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
//             >
//               About us
//             </Text>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 25,
//                   fontWeight: "bold",
//                   color: "#005114",
//                   padding: 5,
//                   textAlign: "center",
//                 }}
//               >
//                SPAM
//               </Text>
//             </View>

//             <View>
//               <Image
//                 // source={}
//                 style={{
//                   height: 350,
//                   width: 330,
//                 }}
//               />
//             </View>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: "bold",
//                   color: "black",
//                   padding: 5,
//                 }}
//               >
//                 Our Mission
//               </Text>
//             </View>
//             <View>
//               <Text style={{ fontSize: 15, padding: 10 }}>
//                 To provide children activity maintenance and genetrate a report and that will be sent to the parents
//               </Text>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: "bold",
//                   color: "black",
//                   padding: 5,
//                   textAlign: "center",
//                 }}
//               >
//                 Contact us
//               </Text>
//             </View>
//             <View style={styles.contact}>
//               <View>
//                 <Text style={styles.InputHighLight}>Email :</Text>
//                 <TextInput
//                   style={styles.input}
//                   mode="outlined"
//                   label="Enter Email"
//                 //   style={{ marginLeft: 0 }}
//                 />
//               </View>
//               <View>
//                 <Text style={styles.InputHighLight}>Message :</Text>
//                 <TextInput
//                   style={styles.input}
//                   mode="outlined"
//                   label="Enter Message"
//                 //   style={{ height: 150, marginLeft: 0 }}
//                 />
//               </View>
//               <View>
//                 <Button
//                   style={{
//                     margin: 10,
//                     backgroundColor: "black",
//                     marginLeft: 0,
//                     // color: "black"
//                   }}
//                   mode="contained"
//                 >
//                   Submit
//                 </Button>
//               </View>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: "bold",
//                   color: "black",
//                   padding: 5,
//                 }}
//               >
//                 Follow us on
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 padding: 10,
//                 justifyContent: "space-around",
//                 backgroundColor: "#f6f6f6",
//               }}
//             >
//               <Pressable>
//                 <Ionicons
//                   name="logo-facebook"
//                   style={{ color: "#4267B2", fontSize: 30 }}
//                 />
//               </Pressable>
//               <Pressable>
//                 <Ionicons
//                   name="logo-instagram"
//                   style={styles.icons}
//                 //   style={{ color: "#8a3ab9", fontSize: 30 }}
//                 />
//               </Pressable>
//               <Pressable>
//                 <Ionicons
//                   name="logo-twitter"
//                   style={{ color: "#1DA1F2", fontSize: 30 }}
//                 />
//               </Pressable>
//               <Pressable>
//                 <Ionicons
//                   name="logo-github"
//                   style={{ color: "#333", fontSize: 30 }}
//                 />
//               </Pressable>
//             </View>
//           </View>
//         </ScrollView> */}

//         {/* <Camera
//           ref={webcamRef}
//           style={styles.preview}
//           type={Camera.Constants.Type.back}
//           flashMode={Camera.Constants.FlashMode.auto}
//           autoFocus={Camera.Constants.AutoFocus.on}
//           onGoogleVisionBarcodesDetected={({ barcodes }) => {
//             console.log(barcodes);
//           }}
//         /> */}

//         <View style={styles.container}>
//           <Modal
//             visible={isProcessing}
//             transparent={true}
//             animationType="slide"
//           >
//             <View style={styles.modal}>
//               <View style={styles.modalContent}>
//                 <Text>Your current shape is {presentedShape}</Text>
//                 {presentedShape === "" && <ActivityIndicator size="large" />}
//                 <Pressable
//                   style={styles.dismissButton}
//                   onPress={() => {
//                     setPresentedShape("");
//                     setIsProcessing(false);
//                   }}
//                 >
//                   <Text>Dismiss</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </Modal>

//           <Camera
//             ref={cameraRef}
//             style={styles.camera}
//             type={Camera.Constants.Type.back}
//             autoFocus={true}
//             whiteBalance={Camera.Constants.WhiteBalance.auto}
//           ></Camera>
//           <Pressable
//             onPress={() => handleImageCapture()}
//             style={styles.captureButton}
//           ></Pressable>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export default Aboutus;

// const styles = StyleSheet.create({
//   container: {
//     padding: 40,
//     // backgroundColor: "#f6f6f6",
//   },
//   steps: {
//     padding: 4,
//   },
//   highLight: {
//     color: "#2EA2C1",
//     fontSize: 17,
//   },
//   input: {
//     width: 300,
//     height: 40,
//     marginHorizontal: 25,
//   },
//   contact: {
//     padding: 5,
//   },
//   InputHighLight: {
//     padding: 3,
//     fontSize: 17,
//     // color: "#005114",
//     fontWeight: "bold",
//   },
// });

// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   SafeAreaView,
// //   View,
// //   Image,
// //   ScrollView,
// //   Pressable,
// // } from "react-native";
// // import { TextInput, Button } from "react-native-paper";
// // import Ionicons from "react-native-vector-icons/Ionicons";

// // import { StyleSheet, Text, View } from 'react-native';
// // import { Camera } from 'react-native-camera';
// // import * as tf from '@tensorflow/tfjs';
// // import { fetch } from '@tensorflow/tfjs-react-native';

// // // Load the TensorFlow Lite model
// // async function loadModel() {
// //   const modelJson = require('../ML_model/current/model.json');
// //   const modelWeight = require('../ML_model/current/model.tflite');
// //   const model = await tf.loadGraphModel(fetch(modelJson), fetch(modelWeight));
// //   return model;
// // }

// //   const [model, setModel] = useState(null);
// //   const [out, setOut] = useState(null);
// //   const cameraRef = useRef(null);

// // // Preprocess the image
// // function preprocessImage(imageData) {
// //   const { width, height, data } = imageData;

// //   // Convert the image to grayscale
// //   const grayData = new Uint8ClampedArray(width * height);
// //   for (let i = 0; i < data.length; i += 4) {
// //     const r = data[i];
// //     const g = data[i + 1];
// //     const b = data[i + 2];
// //     grayData[i / 4] = 0.2989 * r + 0.587 * g + 0.114 * b;
// //   }

// //   // Resize the image to 48x48 pixels
// //   const canvas = document.createElement("canvas");
// //   canvas.width = 48;
// //   canvas.height = 48;
// //   const context = canvas.getContext("2d");
// //   const imageData = context.createImageData(48, 48);
// //   imageData.data.set(grayData);
// //   context.putImageData(imageData, 0, 0);
// //   const resizedData = context.getImageData(0, 0, 48, 48).data;

// //   // Normalize the pixel values to be between 0 and 1
// //   const normalizedData = Array.from(resizedData, (x) => x / 255);

// //   // Reshape the data to be a 4D tensor (batch size = 1)
// //   const reshapedData = tf.tensor(normalizedData).reshape([1, 48, 48, 1]);

// //   return reshapedData;
// // }

// //   useEffect(() => {
// //     // Load the TensorFlow Lite model when the component mounts
// //     loadModel().then(setModel);
// //   }, []);

// //   async function handleCameraCapture() {
// //     if (!model) return;

// //     // Capture an image from the camera
// //     const imageData = await cameraRef.current.takePictureAsync();

// //     // Preprocess the captured image
// //     const preprocessedImage = preprocessImage(imageData);

// //     // Pass the preprocessed image to the TensorFlow Lite model for prediction
// //     const inputTensor = tf.tensor(preprocessedImage);
// //     const output = model.execute(inputTensor);
// //     const prediction = output.dataSync()[0];
// //     setOut(prediction);
// //     console.log(prediction);
// //     // // Display the predicted emotion in the UI
// //     // ...
// //   }

// // const Aboutus = () => {
// //   return (
// //     <>
// //     <View style={styles.container}>
// //       <Camera style={styles.camera} ref={cameraRef} />
// //       <View style={styles.buttonContainer}>
// //         <Button title="Capture" onPress={handleCameraCapture} />
// //       </View>
// //       <Text>{out}</Text>
// //     </View>
// //       {/* <SafeAreaView>
// //         <ScrollView>
// //           <View style={styles.container}>
// //             <Text
// //               style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
// //             >
// //               About us
// //             </Text>
// //             <View>
// //               <Text
// //                 style={{
// //                   fontSize: 25,
// //                   fontWeight: "bold",
// //                   color: "#005114",
// //                   padding: 5,
// //                   textAlign: "center",
// //                 }}
// //               >
// //                SPAM
// //               </Text>
// //             </View>

// //             <View>
// //               <Image
// //                 // source={}
// //                 style={{
// //                   height: 350,
// //                   width: 330,
// //                 }}
// //               />
// //             </View>
// //             <View>
// //               <Text
// //                 style={{
// //                   fontSize: 20,
// //                   fontWeight: "bold",
// //                   color: "black",
// //                   padding: 5,
// //                 }}
// //               >
// //                 Our Mission
// //               </Text>
// //             </View>
// //             <View>
// //               <Text style={{ fontSize: 15, padding: 10 }}>
// //                 To provide children activity maintenance and genetrate a report and that will be sent to the parents
// //               </Text>
// //             </View>

// //             <View>
// //               <Text
// //                 style={{
// //                   fontSize: 20,
// //                   fontWeight: "bold",
// //                   color: "black",
// //                   padding: 5,
// //                   textAlign: "center",
// //                 }}
// //               >
// //                 Contact us
// //               </Text>
// //             </View>
// //             <View style={styles.contact}>
// //               <View>
// //                 <Text style={styles.InputHighLight}>Email :</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   mode="outlined"
// //                   label="Enter Email"
// //                 //   style={{ marginLeft: 0 }}
// //                 />
// //               </View>
// //               <View>
// //                 <Text style={styles.InputHighLight}>Message :</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   mode="outlined"
// //                   label="Enter Message"
// //                 //   style={{ height: 150, marginLeft: 0 }}
// //                 />
// //               </View>
// //               <View>
// //                 <Button
// //                   style={{
// //                     margin: 10,
// //                     backgroundColor: "black",
// //                     marginLeft: 0,
// //                     // color: "black"
// //                   }}
// //                   mode="contained"
// //                 >
// //                   Submit
// //                 </Button>
// //               </View>
// //             </View>

// //             <View>
// //               <Text
// //                 style={{
// //                   fontSize: 20,
// //                   fontWeight: "bold",
// //                   color: "black",
// //                   padding: 5,
// //                 }}
// //               >
// //                 Follow us on
// //               </Text>
// //             </View>

// //             <View
// //               style={{
// //                 flexDirection: "row",
// //                 padding: 10,
// //                 justifyContent: "space-around",
// //                 backgroundColor: "#f6f6f6",
// //               }}
// //             >
// //               <Pressable>
// //                 <Ionicons
// //                   name="logo-facebook"
// //                   style={{ color: "#4267B2", fontSize: 30 }}
// //                 />
// //               </Pressable>
// //               <Pressable>
// //                 <Ionicons
// //                   name="logo-instagram"
// //                   style={styles.icons}
// //                 //   style={{ color: "#8a3ab9", fontSize: 30 }}
// //                 />
// //               </Pressable>
// //               <Pressable>
// //                 <Ionicons
// //                   name="logo-twitter"
// //                   style={{ color: "#1DA1F2", fontSize: 30 }}
// //                 />
// //               </Pressable>
// //               <Pressable>
// //                 <Ionicons
// //                   name="logo-github"
// //                   style={{ color: "#333", fontSize: 30 }}
// //                 />
// //               </Pressable>
// //             </View>
// //           </View>
// //         </ScrollView>
// //       </SafeAreaView> */}
// //     </>
// //   );
// // };

// // export default Aboutus;

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 40,
// //     // backgroundColor: "#f6f6f6",
// //   },
// //   steps: {
// //     padding: 4,
// //   },
// //   highLight: {
// //     color: "#2EA2C1",
// //     fontSize: 17,
// //   },
// //   input: {
// //     width: 300,
// //     height: 40,
// //     marginHorizontal: 25,
// //   },
// //   contact: {
// //     padding: 5,
// //   },
// //   InputHighLight: {
// //     padding: 3,
// //     fontSize: 17,
// //     // color: "#005114",
// //     fontWeight: "bold",
// //   },
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   camera: {
// //     width: '100%',
// //     height: '80%',
// //   },
// //   buttonContainer: {
// //     width: '100%',
// //     height: '20%',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });
