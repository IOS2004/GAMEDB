
const forms = document.querySelectorAll('form');

async function checkPassword(pass)
{
  try {
    const data = { password: pass };
    const url = '/authorize';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const response = await res.json();
    return response.valid;
  }
  catch(error) {
    console.log(error);
    return 'ERROR';
  }
}

forms.forEach((form) => {
  const submitButton = form.querySelector('button[type="submit"]');
  if (!submitButton) return; 

  const text = submitButton.textContent.trim();
  if (['Update', 'Delete', 'Add'].includes(text)) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); 
      const password = prompt("Enter admin password:");
      if (password === null)
        return;
      const res = await checkPassword(password);
      if(res === 'TRUE')
        form.submit(); 
      else if (res === 'ERROR')
        alert('Error during authorization')
      else 
        alert('Incorrect password');
    });
  }
});