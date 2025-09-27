<template>
  <div class="login-page">
    <div class="background-overlay"></div>

    <div class="container-fluid">
      <div class="row min-vh-100 align-items-center">
        <div
          class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary-gradient text-white position-relative"
        >
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
                    <input
                      type="text"
                      class="form-control form-control-lg rounded-3"
                      v-model="form.username"
                      placeholder="Enter your username"
                      required
                      :class="{ 'is-invalid': errors.username }"
                    />
                    <div v-if="errors.username" class="invalid-feedback">
                      {{ errors.username }}
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-phone me-2 text-muted"></i>Contact Number
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-lg rounded-3"
                      v-model="form.contact"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-envelope me-2 text-muted"></i>Email
                    </label>
                    <input
                      type="email"
                      class="form-control form-control-lg rounded-3"
                      v-model="form.email"
                      placeholder="Enter your email"
                      required
                      :class="{ 'is-invalid': errors.email }"
                    />
                    <div v-if="errors.email" class="invalid-feedback">
                      {{ errors.email }}
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-lock me-2 text-muted"></i>Create Password
                    </label>
                    <input
                      type="password"
                      class="form-control form-control-lg rounded-3"
                      v-model="form.password"
                      placeholder="Enter your password"
                      required
                      :class="{ 'is-invalid': errors.password }"
                    />
                    <div v-if="errors.password" class="invalid-feedback">
                      {{ errors.password }}
                    </div>
                  </div>

                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" id="facialRecognition" v-model="form.facialRecognition" />
                    <label class="form-check-label" for="facialRecognition">
                      Enable facial recognition login and agree to the <a href="#">Terms and Conditions</a>
                    </label>
                  </div>

                  <div class="d-grid mb-4">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg rounded-3 fw-semibold"
                      :disabled="isLoading"
                    >
                      <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                      <i v-else class="fas fa-user-plus me-2"></i>
                      {{ isLoading ? 'Signing up...' : 'Sign Up' }}
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()

// ⬅️ UPDATED: Removed `fullname` from the form data
const form = reactive({
  username: '',
  contact: '',
  email: '',
  password: '',
  facialRecognition: false
})

// Validation errors
const errors = reactive({
  username: '',
  email: '',
  password: ''
})

// Loading state
const isLoading = ref(false)

const handleSignUp = async () => {
  errors.username = ''
  errors.email = ''
  errors.password = ''

  // Client-side validation
  if (!form.username.trim()) {
    errors.username = 'Username is required'
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  }
  if (!form.password.trim()) {
    errors.password = 'Password is required'
  }
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (errors.username || errors.email || errors.password) {
    return
  }

  isLoading.value = true

  try {
    // Create a new user with Supabase authentication
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (authError) {
      throw authError
    }

    const user = authData.user

    // ⬅️ UPDATED: Insert profile data into `usermanagement` table without fullname
    const { error: profileError } = await supabase
      .from('usermanagement')
      .insert([
        {
          user_id: user.id,
          username: form.username,
          email: form.email,
          contact_number: form.contact,
          role: 'customer'
        }
      ])

    if (profileError) {
      throw profileError
    }

    alert('Account created successfully! Please check your email to verify your account.')
    router.push({ name: 'Login' })

  } catch (error) {
    console.error('Sign-up failed:', error.message)
    if (error.message.includes('User already registered')) {
      alert('This email is already in use. Please log in instead or use a different email.')
    } else {
      alert('An unexpected error occurred. Please try again later.')
    }
  } finally {
    isLoading.value = false
  }
}
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
</style>