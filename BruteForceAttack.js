const crypto = require("crypto");

// Given MD5 hash of Alice's PIN
const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Function to compute MD5 hash
function md5Hash(data) {
    return crypto.createHash("md5").update(data).digest("hex");
}

// Brute-force function to find the PIN
function findPIN() {
    for (let pin = 0; pin <= 9999; pin++) {
        // Convert pin to a 4-digit string (e.g., 9 -> "0009")
        const pinString = pin.toString().padStart(4, "0");
        
        // Calculate MD5 hash
        const hash = md5Hash(pinString);
        
        // Check if the hash matches the target
        if (hash === targetHash) {
            console.log(`Alice's PIN is: ${pinString}`);
            return pinString;
        }
    }
    console.log("PIN not found!");
    return null;
}

// Start the brute-force attack
findPIN();
