// server.js (Updated with robust quality checks)
import express from 'express';
import cors from 'cors';
import { RekognitionClient, DetectFacesCommand } from '@aws-sdk/client-rekognition';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.post('/api/verify-face', async (req, res) => {
  const { imageBase64 } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ success: false, message: 'Image data is required.' });
  }

  try {
    const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const command = new DetectFacesCommand({
      Image: { Bytes: imageBuffer },
      Attributes: ['ALL'],
    });

    const response = await rekognitionClient.send(command);
    const faceDetails = response.FaceDetails;

    // --- NEW ROBUST VALIDATION LOGIC ---

    // 1. Check if exactly one face was detected
    if (!faceDetails || faceDetails.length !== 1) {
      console.log('Verification failed: Not exactly one face detected.');
      return res.status(400).json({ success: false, message: 'Please ensure only one person is in the photo.' });
    }

    const face = faceDetails[0];

    // 2. Define a list of quality checks to perform
    const validationChecks = [
      {
        isValid: face.Confidence > 95,
        message: 'Could not identify a face with high confidence. Please try again in better lighting.'
      },
      {
        isValid: face.Quality.Sharpness > 80,
        message: 'Image is too blurry. Please hold the camera steady.'
      },
      {
        isValid: face.Quality.Brightness > 30 && face.Quality.Brightness < 75,
        message: 'Image is too dark or too bright. Please find better lighting.'
      },
      {
        isValid: face.EyesOpen.Value && face.EyesOpen.Confidence > 90,
        message: 'Please make sure your eyes are open.'
      },
      {
        isValid: !face.MouthOpen.Value || face.MouthOpen.Confidence < 90,
        message: 'Please close your mouth for the photo.'
      },
      {
        isValid: Math.abs(face.Pose.Yaw) < 15 && Math.abs(face.Pose.Pitch) < 15,
        message: 'Please look directly at the camera.'
      }
    ];

    // 3. Go through each check. If one fails, send its specific error message.
    for (const check of validationChecks) {
      if (!check.isValid) {
        console.log(`Verification failed: ${check.message}`);
        return res.status(400).json({ success: false, message: check.message });
      }
    }

    // 4. If all checks pass, verification is successful
    console.log('Face verification successful.');
    return res.status(200).json({ success: true, message: 'Face verified successfully.' });

  } catch (error) {
    console.error('AWS Rekognition error:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during face verification.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});