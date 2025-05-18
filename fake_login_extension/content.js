// Step 1: Detect login form and collect info
window.addEventListener('load', () => {
  const forms = document.getElementsByTagName('form');
  let loginFormDetected = false;

  for (let form of forms) {
    const inputs = form.getElementsByTagName('input');
    let hasPassword = false;

    for (let input of inputs) {
      if (input.type === 'password') {
        hasPassword = true;
        break;
      }
    }

    if (hasPassword) {
      loginFormDetected = true;
      break;
    }
  }

  if (loginFormDetected) {
    // Step 2: Send URL and HTML content to backend
    const pageData = {
      url: window.location.href,
      html: document.documentElement.outerHTML
    };

    fetch('http://localhost:5000/check-login', { // change to your backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.result === 'fake') {
        alert('⚠️ Warning: This login page is likely fake!');
      } else if (data.result === 'real') {
        alert('✅ This login page looks safe.');
      } else {
        alert('❓ Unable to verify this page.');
      }
    })
    .catch(err => {
      console.error(err);
      alert('❌ Error checking login page.');
    });
  }
});
