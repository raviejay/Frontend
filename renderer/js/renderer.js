const form = document.getElementById("Raw_recipe");
if(form) {
    form.onsubmit = async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        let sentence = formData.get("sentence");
        if(sentence.length <= 5 ) {
        alertMessages("error","INPUT SOME WORD ");

        return;
    }
        const response = await window.axios.openAI(formData.get("sentence"));
        document.getElementById("Full_recipe").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
        


        
    };
}

function alertMessages(status , sentence){
    window.Toastify.showToast({
       text : sentence ,     
       duration: 4000,
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
           textAlign : "center",
           background: status == "error" ? "red" : "green",
           color : "white",
           paddings: "5px",
           marginTop: "2px"
        }
});
} 