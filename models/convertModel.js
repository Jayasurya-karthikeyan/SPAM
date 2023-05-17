const tf = require("@tensorflow/tfjs");
// require("@tensorflow/tfjs-node");

const convertModel = async () => {
  // Load the model from model.h5
  const model = await tf.loadLayersModel("./fer.h5");

  // Save the model weights to model-weights.bin
  await model.saveWeights("./fer-weights.bin");
};

convertModel();
