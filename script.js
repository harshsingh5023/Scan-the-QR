const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close"),
copyBtn = wrapper.querySelector(".copy");

function fetchRequest(formData, file){
    infoText.innerHTML = "Scanning QR Code...";

    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result =>{
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerHTML = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        infoText.innerHTML = "Scanning QR Code...";
        wrapper.classList.add("active");
    });
}

fileInp.addEventListener("change", e => {
    let file = e.target.files[0];
    if(!file){
        return;
    }
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));