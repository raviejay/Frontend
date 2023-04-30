const form = document.getElementById("Raw_recipe");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    
    const response = await window.axios.openAI(formData.get("sentence")); 
    document.getElementById("Full_recipe").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
  };
}
