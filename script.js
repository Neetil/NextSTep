document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('getStartedForm');
    const inputs = document.querySelectorAll('input, textarea, select');

    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Log form data to console
        console.log('Form submitted with data:', data);
        
        // Show success message
        alert('Thank you for submitting your details! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });

    // Real-time form validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });

        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    function validateInput(input) {
        // Remove any existing error messages
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Check if the input is required and empty
        if (input.required && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            addErrorMessage(input, 'This field is required');
            return false;
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.style.borderColor = '#e74c3c';
                addErrorMessage(input, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation (basic)
        if (input.type === 'tel' && input.value) {
            const phonePattern = /^\+?[\d\s-]{10,}$/;
            if (!phonePattern.test(input.value)) {
                input.style.borderColor = '#e74c3c';
                addErrorMessage(input, 'Please enter a valid phone number');
                return false;
            }
        }

        input.style.borderColor = '#ddd';
        return true;
    }

    function addErrorMessage(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    }
});