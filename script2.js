// Camera setup
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const capturedImage = document.getElementById('capturedImage');

// Request access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
        alert("Unable to access camera. Please upload the ID manually.");
    });

// Capture the image when the button is clicked
captureButton.addEventListener('click', function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Convert the canvas image to a data URL
    const imageDataUrl = canvas.toDataURL('image/png');
    capturedImage.src = imageDataUrl;
    capturedImage.style.display = 'block';  // Show the captured image

    // Optionally, save the image data to a hidden input field for form submission
    const hiddenImageInput = document.createElement('input');
    hiddenImageInput.type = 'hidden';
    hiddenImageInput.name = 'capturedImage';
    hiddenImageInput.value = imageDataUrl;
    document.getElementById('brgyForm').appendChild(hiddenImageInput);
});

// Form validation
function validateForm() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var contact = document.getElementById("contact").value;
    var applicationType = document.getElementById("applicationType").value;
    var purpose = document.getElementById("purpose").value;
    var idProof = document.getElementById("idProof").value;
    var date = document.getElementById("date").value;
    var capturedImageSrc = document.getElementById("capturedImage").src;

    if (name === "" || address === "" || contact === "" || applicationType === "" || purpose === "" || (idProof === "" && capturedImageSrc === "") || date === "") {
        alert("Please fill all the required fields.");
        return false;
    }

    document.getElementById("brgyForm").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
    return false;
}
