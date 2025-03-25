if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.log("Service Worker Failed: ", err));
}

let count = 0;
let stream = null; // To store camera stream
let track = null; // To control the flashlight

document.getElementById("clickButton").addEventListener("click", function() {
    count++;
    
    document.getElementById("counter").textContent = count;
    

    // Turn on flashlight when count reaches 20
    if (count === 100) {
        turnOnFlashlight();
    }

if (count === 105) {
        turnOffFlashlight();
    }
    
    
    
    // Vibrate when count reaches 100
    if ("vibrate" in navigator) {
        if (count === 33) {
            navigator.vibrate(100); // Vibrate for 100ms at 10 clicks
        } else if (count === 66) {
            navigator.vibrate([200, 100, 200]); // Vibrate twice at 20 clicks
        } else if (count === 99) {
            navigator.vibrate([300, 100, 300, 100, 300]); // Vibrate three times at 50 clicks
        }
        else if (count === 15) {
            navigator.vibrate([300, 100, 300, 100, 300]);}
         else if (count === 100) {
            navigator.vibrate([500, 200, 500, 200, 500]); // Strong vibration at 100 clicks
        }
    }
});

// Reset button functionality
document.getElementById("resetButton").addEventListener("click", function() {
    count = 0;
    document.getElementById("counter").textContent = count;
    turnOffFlashlight(); // Turn off flashlight when reset
});

// Function to turn on the flashlight
async function turnOnFlashlight() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", torch: true } });
        track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();

        if (capabilities.torch) {
            track.applyConstraints({ advanced: [{ torch: true }] });
        }
    } catch (error) {
        console.error("Flashlight error:", error);
    }
}

// Function to turn off the flashlight
function turnOffFlashlight() {
    if (track) {
        track.stop();
        track = null;
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}
