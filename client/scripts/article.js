const form = document.getElementById('new');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const story = document.getElementById('story').value;
  const image = document.getElementById('image').files[0];

  const formData = new FormData();
  formData.append('author', author);
  formData.append('title', title);
  formData.append('story', story);
  formData.append('image', image);

  try {

      const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/blog/add', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    const data = await response.json();

    if (response.ok) {
      
      console.log(data.message);
      console.log(data.blogId);
      
    } else {
      
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});