document.addEventListener('DOMContentLoaded', () => {
    // --- State & Constants ---
    const COST_PRICE = 80;
    const DEFAULT_PRICE = 120;
    
    // --- DOM Elements ---
    const screens = {
        home: document.getElementById('screen-home'),
        processing: document.getElementById('screen-processing'),
        result: document.getElementById('screen-result'),
        success: document.getElementById('screen-success')
    };

    const buttons = {
        scan: document.getElementById('btn-scan'),
        cancel: document.getElementById('btn-cancel'),
        print: document.getElementById('btn-print'),
        next: document.getElementById('btn-next-scan')
    };

    const slider = document.getElementById('price-slider');
    const displayPrice = document.getElementById('display-price');
    const displayProfitMargin = document.getElementById('profit-margin');
    const displayProfitAmount = document.getElementById('profit-amount');

    // --- Functions ---

    // Switch visible screen
    function showScreen(screenId) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        screens[screenId].classList.add('active');
    }

    // Update pricing metrics
    function updateMetrics() {
        const price = parseInt(slider.value, 10);
        displayPrice.textContent = price;

        const profit = price - COST_PRICE;
        const margin = (profit / price) * 100;

        displayProfitAmount.textContent = `¥${profit}`;
        displayProfitMargin.textContent = `${margin.toFixed(1)}%`;

        // Update colors based on margin
        displayProfitMargin.className = 'metric-value'; // Reset
        displayProfitAmount.parentElement.className = 'metric-item'; // Reset background if needed (optional)

        if (margin >= 30) {
            displayProfitMargin.classList.add('profit-high');
        } else if (margin >= 20) {
            displayProfitMargin.classList.add('profit-med');
        } else {
            displayProfitMargin.classList.add('profit-low');
        }
    }

    // Simulate Scanning Process
    function startScan() {
        console.log("Scanning started...");
        showScreen('processing');

        // Simulate steps with timeouts
        const steps = document.querySelectorAll('.loading-steps .step');
        
        // Reset steps
        steps.forEach(s => {
            s.classList.remove('completed', 'active');
            s.innerHTML = s.innerHTML.replace('fa-check', 'fa-circle').replace('fa-circle-notch fa-spin', 'fa-circle');
        });

        // Step 1: OCR (Start instantly)
        setTimeout(() => {
            steps[0].classList.add('active');
            steps[0].querySelector('i').className = 'fas fa-circle-notch fa-spin';
        }, 100);

        // Step 2: Product ID (After 1s)
        setTimeout(() => {
            steps[0].classList.remove('active');
            steps[0].classList.add('completed');
            steps[0].querySelector('i').className = 'fas fa-check';

            steps[1].classList.add('active');
            steps[1].querySelector('i').className = 'fas fa-circle-notch fa-spin';
        }, 1500);

        // Step 3: Pricing (After 2.5s)
        setTimeout(() => {
            steps[1].classList.remove('active');
            steps[1].classList.add('completed');
            steps[1].querySelector('i').className = 'fas fa-check';

            steps[2].classList.add('active');
            steps[2].querySelector('i').className = 'fas fa-circle-notch fa-spin';
        }, 2500);

        // Finish (After 3.5s)
        setTimeout(() => {
            showScreen('result');
            // Reset slider to default for new scan
            slider.value = DEFAULT_PRICE;
            updateMetrics();
        }, 3500);
    }

    // Message Handler for "Print"
    function printLabel() {
        // Show success screen
        showScreen('success');
    }

    // Reset to Home
    function resetApp() {
        showScreen('home');
    }

    // --- Event Listeners ---

    // Navigation
    buttons.scan.addEventListener('click', startScan);
    
    buttons.cancel.addEventListener('click', () => {
        if(confirm('値付けをキャンセルしますか？')) {
            showScreen('home');
        }
    });

    buttons.print.addEventListener('click', printLabel);
    
    buttons.next.addEventListener('click', resetApp);

    // Pricing Slider
    slider.addEventListener('input', updateMetrics);

    // Initialize
    updateMetrics();
});
