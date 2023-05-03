document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!validateForm(formData)) {
        alert("Az összes mező kitöltése szükséges a rendeléshez.");
        return;
    }
    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

function validateForm(formData) {
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const image = formData.get("image");
    const description = formData.get("description");
    return name && phone && email && image && description;
}
