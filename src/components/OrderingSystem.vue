<template>
  <div class="ordering-page">
     <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom shadow-sm">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center order-0" href="#">
            <img src="/images/background.jpg" alt="RYT-Tyre Logo" height="40" class="me-2 rounded-circle" />
            <strong class="text-dark fs-5">RYT-Tyre</strong>
          </a>

          <div class="col-12 col-md-6 col-lg-5 mx-auto order-2 order-lg-1 mt-2 mt-lg-0">
            <form class="d-flex">
              <input class="form-control rounded-5" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-primary ms-2 rounded-circle p-2" type="submit">
                <img src="/images/searchIcon.png" height="25" />
              </button>
            </form>
          </div>

          <div class="d-flex align-items-center order-1 order-lg-2">
            <a href="#" class="text-dark me-3">
                <img src="/images/userIcon.png" alt="Account Management" height="24" />
            </a>
            <span class="mx-2 text-muted">|</span>
            <a href="#" class="me-3">
              <img src="/images/orderTrackicon.png" alt="Order Tracking" height="24" />
            </a>
            <span class="mx-2 text-muted">|</span>
            <a href="#">
              <img src="/images/cartIcon.png" alt="Cart" height="24" />
            </a>
          </div>
        </div>
      </nav>

    <section class="advertisement-banner">
      <img src="/images/mainAds.png" alt="Best place to buy tires online advertisement" class="img-fluid" />
    </section>

    <section class="py-5 bg-light border-bottom">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4">
            <i class="fas fa-shipping-fast fa-2x text-primary mb-3"></i>
            <h5 class="fw-bold">Reliable Shipping</h5>
            <p class="text-secondary">Fast delivery with optional shipping insurance available.</p>
          </div>
          <div class="col-md-4">
            <i class="fas fa-shield-alt fa-2x text-primary mb-3"></i>
            <h5 class="fw-bold">You're Safe With Us</h5>
            <p class="text-secondary">Secure payment system supporting major debit and credit cards.</p>
          </div>
          <div class="col-md-4">
            <i class="fas fa-tags fa-2x text-primary mb-3"></i>
            <h5 class="fw-bold">Best Quality & Pricing</h5>
            <p class="text-secondary">Affordable and quality tires and auto products for every vehicle.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 text-center recommended-section">
      <div class="container">
        <h2 class="fw-bold mb-4 section-title">Recommended Tire Car Brands</h2>
        <div class="row flex-nowrap overflow-auto recommended-scroll justify-content-lg-center">
          <div
            class="col-8 col-sm-4 col-md-3 col-lg-2 mb-4"
            v-for="brand in recommendedBrands"
            :key="brand.name"
          >
            <div class="card h-100 shadow-sm rounded-lg-card">
              <div class="card-img-container">
                <img :src="brand.image" class="card-img-top p-3" :alt="brand.name + ' logo'">
              </div>
              <div class="card-body d-flex flex-column justify-content-between align-items-center">
                <h6 class="card-title fw-semibold text-center mb-3">{{ brand.name }}</h6>
                <button class="btn btn-sm btn-outline-primary rounded-pill px-4">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <h3 class="fw-bold mb-4 text-center section-title">CHOOSE YOUR TIRES</h3>
        <div class="row g-4 justify-content-center">
          <div class="col-6 col-md-4 col-lg-3" v-for="product in tireProducts" :key="product.name">
            <div class="card h-100 shadow-sm product-card">
              <div class="card-img-container">
                <img :src="product.image" class="card-img-top p-3" :alt="product.name">
              </div>
              <div class="card-body text-center d-flex flex-column">
                <h6 class="fw-semibold mb-2 product-name">{{ product.name }}</h6>
                <p class="text-danger fw-bold fs-5 mb-3">₱{{ product.price }}</p>
                <span v-if="product.stock === 0" class="badge bg-danger mb-3 align-self-center stock-badge">Out of Stock</span>
                <button class="btn btn-sm btn-primary mt-auto rounded-pill px-4" :disabled="product.stock === 0">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <h3 class="fw-bold mb-4 text-center section-title">NON-TIRE PRODUCTS</h3>
        <div class="row g-4 justify-content-center">
          <div class="col-6 col-md-4 col-lg-3" v-for="product in nonTireProducts" :key="product.name">
            <div class="card h-100 shadow-sm product-card">
              <div class="card-img-container">
                <img :src="product.image" class="card-img-top p-3" :alt="product.name">
              </div>
              <div class="card-body text-center d-flex flex-column">
                <h6 class="fw-semibold mb-2 product-name">{{ product.name }}</h6>
                <p class="text-danger fw-bold fs-5 mb-3">₱{{ product.price }}</p>
                <button class="btn btn-sm btn-primary mt-auto rounded-pill px-4">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-dark text-white pt-5 pb-3">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <img src="/images/background.jpg" alt="RYT Logo" height="45" class="mb-3 rounded-circle shadow-sm" />
            <p class="small text-white-75 pe-lg-4">#1 Trusted Tire Supplier in the Philippines. Dedicated to top-quality products, reliable service, and expert support.</p>
          </div>
          <div class="col-md-4 mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Contact Us</h6>
            <p class="small text-white-75"><i class="fas fa-envelope me-2"></i>info@ryt-tyre.cc</p>
          </div>
          <div class="col-md-4 mb-4">
            <h6 class="text-uppercase fw-bold mb-3">We Accept</h6>
            <div class="payment-icons">
              <i class="fab fa-cc-visa me-3"></i>
              <i class="fab fa-cc-mastercard me-3"></i>
              <i class="fab fa-cc-paypal me-3"></i>
              <i class="fab fa-cc-amex"></i>
            </div>
          </div>
        </div>
        <hr class="bg-white my-4" />
        <div class="text-center small text-white-50">
          &copy; {{ new Date().getFullYear() }} RYT-Tyre. All rights reserved. |
          <a href="#" class="text-white-50 text-decoration-none mx-2">Privacy Policy</a> |
          <a href="#" class="text-white-50 text-decoration-none mx-2">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const recommendedBrands = ref([
  { name: 'Toyota', image: '/images/brands/toyota.png' },
  { name: 'Honda', image: '/images/brands/honda.png' },
  { name: 'Ford', image: '/images/brands/ford.png' },
  { name: 'Mitsubishi', image: '/images/brands/mitsubishi.png' },
  { name: 'Nissan', image: '/images/brands/nissan.png' },
  { name: 'Hyundai', image: '/images/brands/hyundai.png' },
  // Add more brands as needed
]);

const tireProducts = ref([
  { name: 'Toyota', image: '/images/brands/toyota.png' },
  { name: 'Honda', image: '/images/brands/honda.png' },
  { name: 'Ford', image: '/images/brands/ford.png' },
  { name: 'Mitsubishi', image: '/images/brands/mitsubishi.png' },
  // Add more brands as needed
]);

const nonTireProducts = ref([
  { name: 'Toyota', image: '/images/brands/toyota.png' },
  { name: 'Honda', image: '/images/brands/honda.png' },
  { name: 'Ford', image: '/images/brands/ford.png' },
  { name: 'Mitsubishi', image: '/images/brands/mitsubishi.png' },
  // Add more brands as needed
]);

// You may already have tireProducts and nonTireProducts defined elsewhere
</script>

<style scoped>
/* Font import for a more modern look */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');

.ordering-page {
  font-family: 'Roboto', sans-serif; /* A clean, modern sans-serif font */
  color: #333; /* Softer dark text color */
  background-color: #f8f9fa; /* Light background for the entire page */
}

/* Navbar specific adjustments */
.navbar-brand strong {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #212529 !important;
}

.navbar .form-control {
  border-color: #ced4da;
}

.navbar .btn-outline-primary {
  border-color: #0d6efd;
  color: #0d6efd;
}

.navbar .btn-outline-primary:hover {
  background-color: #0d6efd;
  color: #fff;
}

/* New style for the advertisement banner */
.advertisement-banner img {
  width: 100%;
  height: auto;
  display: block; /* Ensures no extra space below image */
}

/* Section headings */
.section-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #212529;
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 40px !important;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #0d6efd;
  border-radius: 2px;
}

/* Info section (Reliable Shipping, etc.) */
section.py-5.bg-light.border-bottom {
  background-color: #ffffff !important; /* White background for clarity */
}

.bg-light .col-md-4 h5 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #212529;
}

.bg-light .col-md-4 p {
  color: #6c757d; /* Softer text color for descriptions */
}

/* Recommended Brands Section */
.recommended-section {
  background-color: #f8f9fa; /* Consistent light background */
}

.recommended-scroll {
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
  padding-bottom: 20px; /* Space for scrollbar if visible */
}

.recommended-scroll::-webkit-scrollbar {
  height: 8px; /* Thinner scrollbar */
}

.recommended-scroll::-webkit-scrollbar-track {
  background: #e9ecef; /* Light track */
  border-radius: 10px;
}

.recommended-scroll::-webkit-scrollbar-thumb {
  background: #ced4da; /* Grey thumb */
  border-radius: 10px;
}

.recommended-scroll::-webkit-scrollbar-thumb:hover {
  background: #aab2bd; /* Darker thumb on hover */
}

.rounded-lg-card {
  border-radius: 1rem !important; /* More pronounced rounded corners */
}

/* Product Card Styling (Tires & Non-Tires) */
.card {
  border: none; /* Remove default card border */
  border-radius: 0.75rem; /* Slightly rounded corners for all cards */
  overflow: hidden; /* Ensures image corners are also rounded */
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Softer shadow */
}

.card:hover {
  transform: translateY(-5px) scale(1.02); /* Lift and slight enlarge effect */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* More prominent shadow on hover */
}

.card-img-container {
  height: 160px; /* Slightly taller image container */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff; /* White background for product images */
  border-bottom: 1px solid #eee; /* Subtle separator */
}

.card-img-top {
  max-height: 100%; /* Ensure image fits container */
  max-width: 100%; /* Ensure image fits container */
  object-fit: contain;
  padding: 10px; /* Reduce padding slightly */
}

.product-name {
  min-height: 40px; /* Ensure consistent height for names */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  color: #212529;
}

.product-card .card-body {
  padding: 1rem; /* Adjust padding */
}

.product-card .badge {
  font-size: 0.8rem;
  padding: 0.4em 0.7em;
  border-radius: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.btn-primary, .btn-outline-primary {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  border-radius: 50rem !important; /* Pill-shaped buttons */
  padding: 0.5rem 1.5rem; /* Adjusted padding */
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0a58ca;
  border-color: #0a58ca;
  transform: translateY(-2px); /* Slight lift on hover */
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.2);
}

.btn-outline-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.1);
}

/* Footer Improvements */
footer {
  background-color: #212529 !important; /* Darker footer for contrast */
  color: #e9ecef; /* Lighter text for readability */
}

footer h6 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #ffffff; /* White headings */
}

footer p.small {
  color: rgba(255, 255, 255, 0.75) !important; /* Softer white for paragraph text */
}

.payment-icons i {
  font-size: 1.8rem; /* Larger payment icons */
  color: #adb5bd; /* Slightly muted color for icons */
  transition: color 0.3s ease, transform 0.3s ease;
}

.payment-icons i:hover {
  color: #ffffff; /* White on hover */
  transform: scale(1.1); /* Slight enlarge on hover */
  text-shadow: none; /* Remove previous text-shadow */
}

footer .text-white-50 {
  color: rgba(255, 255, 255, 0.6) !important;
}

footer .text-white-50:hover {
  color: #ffffff !important;
  text-decoration: underline !important;
}

/* Utility classes for responsive spacing and alignment */
@media (min-width: 992px) {
  .justify-content-lg-center {
    justify-content: center !important;
  }
}
</style>