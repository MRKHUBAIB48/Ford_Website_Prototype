// Grab the navbar element
const navbar = document.getElementById('navbar');

// Listen for scrolling on the page
window.addEventListener('scroll', () => {
    // If the user scrolls down more than 50 pixels
    if (window.scrollY > 50) {
        // Remove transparent background, add solid dark background
        navbar.classList.remove('bg-transparent', 'py-4');
        navbar.classList.add('bg-black', 'shadow-lg', 'py-2');
    } else {
        // Revert back to transparent when at the top
        navbar.classList.remove('bg-black', 'shadow-lg', 'py-2');
        navbar.classList.add('bg-transparent', 'py-4');
    }
});

// --- FINANCE CALCULATOR LOGIC ---

// Get DOM elements
const vehiclePriceInput = document.getElementById('vehicle-price');
const downPaymentInput = document.getElementById('down-payment');
const loanTermInput = document.getElementById('loan-term');
const loanAprInput = document.getElementById('loan-apr');

const priceDisplay = document.getElementById('price-display');
const downDisplay = document.getElementById('down-display');
const termDisplay = document.getElementById('term-display');
const aprDisplay = document.getElementById('apr-display');
const monthlyPaymentDisplay = document.getElementById('monthly-payment');

// Format numbers as currency
const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
};

// Calculate Auto Loan
function calculatePayment() {
    const price = parseFloat(vehiclePriceInput.value);
    let downPayment = parseFloat(downPaymentInput.value);
    const term = parseFloat(loanTermInput.value);
    const apr = parseFloat(loanAprInput.value);

    // Prevent down payment from being higher than vehicle price
    if (downPayment > price) {
        downPayment = price;
        downPaymentInput.value = price;
    }

    // Update Display Values
    priceDisplay.textContent = formatCurrency(price);
    downDisplay.textContent = formatCurrency(downPayment);
    termDisplay.textContent = term + ' Months';
    aprDisplay.textContent = apr.toFixed(1) + '%';

    // Math for loan
    const principal = price - downPayment;
    
    let monthlyPayment = 0;

    if (apr === 0) {
        // 0% APR scenario
        monthlyPayment = principal / term;
    } else {
        // Standard loan calculation
        const monthlyRate = (apr / 100) / 12;
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    }

    // Display Final Monthly Payment
    monthlyPaymentDisplay.textContent = formatCurrency(monthlyPayment);
}

// Add Event Listeners to all sliders
vehiclePriceInput.addEventListener('input', calculatePayment);
downPaymentInput.addEventListener('input', calculatePayment);
loanTermInput.addEventListener('input', calculatePayment);
loanAprInput.addEventListener('input', calculatePayment);

// Run once on load to initialize values
calculatePayment();