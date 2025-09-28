import express from 'express';
import dotenv from 'dotenv';
import AWS from "@aws-sdk/client-rekognition";
import cors from 'cors';
import bodyParser from 'body-parser';

const { RekognitionClient, DetectFacesCommand } = AWS;

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json({ limit: '10mb' }));

// Initialize AWS Rekognition client
const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// API endpoint for face detection
app.post('/api/verify-liveness', async (req, res) => {
  try {
    const { imageData } = req.body;
    if (!imageData) {
      return res.status(400).json({ success: false, message: 'No image data provided.' });
    }
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const imageBytes = Buffer.from(base64Data, 'base64');
    const detectFacesCommand = new DetectFacesCommand({ Image: { Bytes: imageBytes } });
    const detectFacesResult = await rekognitionClient.send(detectFacesCommand);

    if (detectFacesResult.FaceDetails && detectFacesResult.FaceDetails.length > 0) {
      return res.json({ success: true, message: 'Face detected. Verification passed.' });
    } else {
      return res.status(400).json({ success: false, message: 'No face was detected in the image.' });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});