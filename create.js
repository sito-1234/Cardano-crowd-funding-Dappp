let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show current step
    document.querySelector(`.step-${step}`).classList.add('active');
    
    // Update progress bar
    const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    
    // Update step indicator
    document.getElementById('step-indicator').textContent = `Step ${step} of ${totalSteps}`;
    
    currentStep = step;
}

function nextStep() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        } else {
            submitForm();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            if (!document.getElementById('title').value.trim()) {
                alert('Please enter a campaign title');
                return false;
            }
            if (!document.getElementById('description').value.trim()) {
                alert('Please enter a campaign description');
                return false;
            }
            return true;
            
        case 2:
            if (!document.getElementById('wallet').value.trim()) {
                alert('Please connect your wallet');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

function saveCurrentStepData() {
    // Save data from current step
    if (currentStep === 1) {
        formData.title = document.getElementById('title').value;
        formData.description = document.getElementById('description').value;
        formData.goal = document.getElementById('goal').value;
        formData.duration = document.getElementById('duration').value;
    } else if (currentStep === 2) {
        formData.wallet = document.getElementById('wallet').value;
        formData.category = document.getElementById('category').value;
    }
}

// Initialize the form
document.addEventListener('DOMContentLoaded', () => {
    showStep(1);
    
    // Button event listeners
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', nextStep);
    });
    
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', prevStep);
    });
    
    // Form submission
    document.getElementById('campaign-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm();
    });
});

function submitForm() {
    console.log('Form submitted with data:', formData);
    alert('Campaign created successfully!');
    // Here you would typically:
    // 1. Send data to your backend
    // 2. Deploy smart contract
    // 3. Redirect to campaign page
}