<template>
  <div class="payment-page-background">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-body p-4 p-sm-5">
              
              <div class="text-center mb-4">
                <h2 class="card-title fw-bold text-dark mb-2">
                  <i class="fas fa-shield-alt me-2 text-primary"></i>Secure Payment
                </h2>
                <p class="text-muted">Complete your purchase</p>
              </div>

              <div class="mb-4">
                <h5 class="fw-semibold">Order Summary</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Standard Tyre (x2)
                    <span class="fw-medium">₱4,500.00</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Service Fee
                    <span class="fw-medium">₱500.00</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0 border-top pt-3">
                    <strong class="h5">Total</strong>
                    <strong class="h5 text-primary">₱5,000.00</strong>
                  </li>
                </ul>
              </div>

              <hr class="my-4">

              <h5 class="fw-semibold mb-3">Choose Payment Method</h5>
              <div class="d-grid gap-3">
                <label class="payment-option-label">
                  <input 
                    type="radio" 
                    class="form-check-input" 
                    name="paymentMethod" 
                    value="cod" 
                    v-model="selectedPaymentMethod"
                  >
                  <div class="d-flex align-items-center">
                    <i class="fas fa-truck fa-2x me-3 text-muted"></i>
                    <div>
                      <span class="fw-bold d-block">Cash on Delivery (COD)</span>
                      <small class="text-muted">Pay with cash upon receiving your order.</small>
                    </div>
                  </div>
                </label>

                <label class="payment-option-label">
                  <input 
                    type="radio" 
                    class="form-check-input" 
                    name="paymentMethod" 
                    value="gcash" 
                    v-model="selectedPaymentMethod"
                  >
                  <div class="d-flex align-items-center">
                    <img src="/src/assets/gcash-logow.png" alt="GCash Logo" class="payment-logo me-3">
                    <div>
                      <span class="fw-bold d-block">Pay with GCash</span>
                      <small class="text-muted">Pay via GCash and upload your proof.</small>
                    </div>
                  </div>
                </label>
              </div>

              <div v-if="selectedPaymentMethod === 'gcash'" class="mt-4 p-3 bg-light rounded-3">
                <h6 class="fw-bold">GCash Payment Instructions</h6>
                <p class="small text-muted">
                  Please send the exact amount of <strong>₱5,000.00</strong> to the following GCash number: 
                  <strong>0912-345-6789 (RYT-Tyre Inc.)</strong>
                </p>
                <div class="mb-3">
                  <label for="gcashNumber" class="form-label fw-semibold">Your GCash Number</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="gcashNumber" 
                    v-model="gcashNumber" 
                    placeholder="e.g., 09XX-XXX-XXXX"
                  >
                </div>
                <div>
                  <label for="paymentProof" class="form-label fw-semibold">Upload Proof of Payment</label>
                  <input 
                    class="form-control" 
                    type="file" 
                    id="paymentProof" 
                    @change="handleFileUpload"
                  >
                  <div class="form-text">Please upload a screenshot of your successful transaction.</div>
                </div>
              </div>

              <div v-if="selectedPaymentMethod === 'cod'" class="mt-4 p-3 bg-light rounded-3 text-center">
                <p class="mb-0"><i class="fas fa-info-circle me-2"></i>You will pay the courier upon delivery.</p>
              </div>

              <div class="d-grid mt-4">
                <button 
                  class="btn btn-primary btn-lg fw-semibold" 
                  @click="handleSubmit" 
                  :disabled="!selectedPaymentMethod"
                >
                  <i class="fas fa-check-circle me-2"></i>
                  {{ selectedPaymentMethod === 'cod' ? 'Place Order' : 'Confirm and Submit' }}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive state to hold user selections
const selectedPaymentMethod = ref(null); // 'cod' or 'gcash'
const gcashNumber = ref('');
const paymentProofFile = ref(null);

// Handler for the file input
const handleFileUpload = (event) => {
  paymentProofFile.value = event.target.files[0];
  console.log('File selected:', paymentProofFile.value.name);
};

// Handler for the final submission
const handleSubmit = () => {
  if (!selectedPaymentMethod.value) {
    alert('Please select a payment method.');
    return;
  }

  if (selectedPaymentMethod.value === 'cod') {
    // Logic for Cash on Delivery
    console.log('Processing Cash on Delivery order...');
    alert('Your order has been placed successfully! Please prepare cash for delivery.');
    // Here you would typically submit the order to your backend
  } 
  
  else if (selectedPaymentMethod.value === 'gcash') {
    // Validation for GCash fields
    if (!gcashNumber.value || !paymentProofFile.value) {
      alert('Please enter your GCash number and upload proof of payment.');
      return;
    }
    // Logic for GCash payment
    console.log('Processing GCash payment...');
    console.log('GCash Number:', gcashNumber.value);
    console.log('Proof File:', paymentProofFile.value.name);
    alert('Your payment information has been submitted for verification. You will be notified once confirmed.');
    // Here you would upload the file and submit the data to your backend
  }
};
</script>

<style scoped>
.payment-page-background {
  background-color: #f4f7f9;
  font-family: 'Segoe UI', sans-serif;
}

.card {
  transition: all 0.3s ease;
}

.payment-option-label {
  display: block;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.payment-option-label:hover {
  border-color: #0d6efd;
  background-color: #f8f9fa;
}

/* Style for when the radio button inside is checked */
.payment-option-label:has(input:checked) {
  border-color: #0d6efd;
  background-color: #e7f1ff;
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.payment-logo {
  width: 40px;
  height: auto;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn:disabled {
  background: #ced4da;
  cursor: not-allowed;
}
</style>