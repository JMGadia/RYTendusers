<template>
  <div class="login-page">
    <div class="background-overlay"></div>
    <div class="container-fluid">
      <div class="row min-vh-100 align-items-center">
        <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary-gradient text-white position-relative">
           <div class="text-center z-index-2 px-4">
            <div class="mb-4">
              <i class="fas fa-user-plus fa-5x mb-3 text-white-50"></i>
            </div>
            <h1 class="display-4 fw-bold mb-3">RYT-Tyre</h1>
            <h2 class="h3 fw-light mb-4">Customer Sign Up</h2>
            <p class="lead mb-0">
              Create your account to place orders and track your transactions.
            </p>
          </div>

          <div class="position-absolute top-0 start-0 w-100 h-100 opacity-10">
            <div class="floating-shapes">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6 d-flex flex-column justify-content-center py-5">
          <div class="login-form-container mx-auto w-100 px-3 px-sm-4 px-md-5">
            <div class="card shadow-lg border-0 rounded-4">
              <div class="card-body p-4 p-sm-5">
                 <div class="text-center mb-4">
                  <div class="avatar-wrapper mx-auto mb-3">
                    <div class="avatar bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <i class="fas fa-user-plus fa-2x text-primary"></i>
                    </div>
                  </div>
                  <h3 class="card-title fw-bold text-dark mb-2">Create an Account</h3>
                  <p class="text-muted mb-0">Fill out the form to register</p>
                </div>

                <form @submit.prevent="handleSignUp" novalidate>
                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-user me-2 text-muted"></i>Create Username
                    </label>
                    <input type="text" class="form-control form-control-lg rounded-3" v-model="form.username" placeholder="Enter your username" required :class="{ 'is-invalid': errors.username }" />
                    <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-envelope me-2 text-muted"></i>Email
                    </label>
                    <input type="email" class="form-control form-control-lg rounded-3" v-model="form.email" placeholder="Enter your email" required :class="{ 'is-invalid': errors.email }" />
                    <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-lock me-2 text-muted"></i>Create Password
                    </label>
                    <input type="password" class="form-control form-control-lg rounded-3" v-model="form.password" placeholder="Enter your password" required :class="{ 'is-invalid': errors.password }" />
                    <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
                  </div>

                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" id="facialRecognition" v-model="form.facialRecognition" />
                    <label class="form-check-label" for="facialRecognition">
                      Enable facial recognition login and agree to the <a href="#">Terms and Conditions</a>
                    </label>
                  </div>

                  <div class="d-grid mb-4">
                    <button type="submit" class="btn btn-primary btn-lg rounded-3 fw-semibold" :disabled="isLoading">
                      <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                      <i v-else class="fas fa-user-plus me-2"></i>
                      {{ isLoading ? 'Processing...' : 'Sign Up' }}
                    </button>
                  </div>
                </form>

                <div class="text-center">
                  <button
                    type="button"
                    class="btn btn-outline-secondary rounded-3"
                    @click="$router.push({ name: 'Login' })"
                  >
                    <i class="fas fa-arrow-left me-2"></i>Back to Login
                  </button>
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <p class="text-muted small mb-0">
                © 2024 RYT-Tyre. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCameraModal" class="camera-modal">
      <div class="camera-modal-content">
        <h4 class="text-center mb-3">Face Verification</h4>
        <p class="text-center text-muted mb-3">Please center your face in the frame and capture a photo.</p>
        <video ref="videoRef" autoplay playsinline class="w-100 rounded-3 mb-3"></video>
        <div class="d-grid gap-2">
           <button @click="captureAndVerify" class="btn btn-success btn-lg">
             <i class="fas fa-camera me-2"></i>Capture Photo
           </button>
           <button @click="closeCamera" class="btn btn-secondary btn-sm">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../server/supabase'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  facialRecognition: false
})

const errors = reactive({
  username: '',
  email: '',
  password: ''
})

const isLoading = ref(false)
const showCameraModal = ref(false)
const videoRef = ref(null)
let stream = null;

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
  } catch (err) {
    console.error("Error accessing camera:", err);
    alert("Could not access the camera. Please ensure you have given permission.");
    closeCamera();
  }
}

const closeCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  showCameraModal.value = false
  isLoading.value = false;
}

const captureAndVerify = async () => {
  if (!videoRef.value) return;

  isLoading.value = true;
  const canvas = document.createElement('canvas');
  canvas.width = videoRef.value.videoWidth;
  canvas.height = videoRef.value.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
  const imageBase64 = canvas.toDataURL('image/jpeg');
  
  closeCamera();

  try {
    // ✅ **UPDATED LINE:** The URL now uses your environment variable
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify-face`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Face verification failed.');
    }

    console.log('Face verification successful!');
    await proceedWithSupabaseSignUp();

  } catch (error) {
    console.error('Face verification failed:', error.message);
    alert(`Face verification failed: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
}

const proceedWithSupabaseSignUp = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username
        }
      }
    });

    if (error) throw error;
    
    alert('Account created! Please check your email for a verification link.');
    router.push({ name: 'Login' });

  } catch (error) {
    console.error('Sign-up failed:', error.message);
    alert(`Sign-up failed: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const handleSignUp = async () => {
  errors.username = ''
  errors.email = ''
  errors.password = ''

  let hasError = false;
  if (!form.username.trim()) { errors.username = 'Username is required'; hasError = true; }
  if (!form.email.trim()) { errors.email = 'Email is required'; hasError = true; }
  if (form.password.length < 6) { errors.password = 'Password must be at least 6 characters'; hasError = true; }
  if (hasError) return;

  if (form.facialRecognition) {
    showCameraModal.value = true;
    startCamera();
  } else {
    await proceedWithSupabaseSignUp();
  }
}

onUnmounted(() => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
})
</script>

<style scoped>
/* All existing styles remain the same */
.login-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/background.jpg') no-repeat center center;
  background-size: cover;
  opacity: 0.1;
  z-index: 1;
}

.bg-primary-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-form-container { 
  max-width: 720px; /* or try 640px or 720px */
  width: 100%;
  padding: 2rem;
  position: relative; 
  z-index: 2;
}

.avatar-wrapper,
.avatar {
  width: 80px;
  height: 80px;
}

.card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}


/* NEW: Styles for the camera modal */
.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.camera-modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
</style>