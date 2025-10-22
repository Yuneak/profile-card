// ============================= 
// Clock Functionality (Profile Page)
// ============================= 

function updateTime() {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    timeElement.textContent = timeString;
  }
}

// Start clock if on profile page
if (document.getElementById('current-time')) {
  updateTime();
  setInterval(updateTime, 1000);
}

// ============================= 
// Form Validation (Contact Page)
// ============================= 

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  const successMessage = document.getElementById('success-message');

  // Validation functions
  function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
      showError(nameInput, nameError, 'Full name is required');
      return false;
    } else if (value.length > 100) {
      showError(nameInput, nameError, 'Name must be less than 100 characters');
      return false;
    } else {
      clearError(nameInput, nameError);
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
      showError(emailInput, emailError, 'Email is required');
      return false;
    } else if (!emailRegex.test(value)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      return false;
    } else if (value.length > 255) {
      showError(emailInput, emailError, 'Email must be less than 255 characters');
      return false;
    } else {
      clearError(emailInput, emailError);
      return true;
    }
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    if (value === '') {
      showError(subjectInput, subjectError, 'Subject is required');
      return false;
    } else if (value.length > 200) {
      showError(subjectInput, subjectError, 'Subject must be less than 200 characters');
      return false;
    } else {
      clearError(subjectInput, subjectError);
      return true;
    }
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === '') {
      showError(messageInput, messageError, 'Message is required');
      return false;
    } else if (value.length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters');
      return false;
    } else if (value.length > 1000) {
      showError(messageInput, messageError, 'Message must be less than 1000 characters');
      return false;
    } else {
      clearError(messageInput, messageError);
      return true;
    }
  }

  function showError(input, errorElement, message) {
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }

  function clearError(input, errorElement) {
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }

  // Real-time validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  subjectInput.addEventListener('blur', validateSubject);
  messageInput.addEventListener('blur', validateMessage);

  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    // If all valid, show success message and reset form
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Show success message
      successMessage.classList.remove('hidden');
      
      // Reset form
      contactForm.reset();
      
      // Clear all error states
      clearError(nameInput, nameError);
      clearError(emailInput, emailError);
      clearError(subjectInput, subjectError);
      clearError(messageInput, messageError);

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
