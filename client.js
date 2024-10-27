const io = require("socket.io-client")
const readline = require("readline")
const crypto = require("crypto");

const socket = io("http://localhost:3000")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

let username = "";

function BuatHash(message) {
    return crypto.createHash('sha256').update(message).digest('hex');
}

socket.on("connect", () => {
    console.log("Connected to the server");

    rl.question("Enter your username: ", (input) => {
        username = input;
        console.log(`Welcome, ${username} to the chat`);
        rl.prompt();

        rl.on("line", (message) =>{
        if (message.trim()) {
            const Hashed = BuatHash(message);

            socket.emit("message", { username, message, hash: Hashed });
        }
        rl.prompt();
        });     
    });
});

socket.on("message", (data) => {
    const { username: senderUsername, message: senderMessage, hash: senderHash } = data;
    
    if (senderUsername != username) {
        const Hash = BuatHash(senderMessage);

        if (Hash === senderHash) {
            console.log(`${senderUsername}: ${senderMessage}`);
        } 
        else {
            console.log(`${senderUsername} (Warning this message has been modified by the server!): ${senderMessage}`);
        }
        rl.prompt();
    }
});

socket.on("disconnect", () => {
    console.log("Server disconnected, Exiting...");
    rl.close();
    process.exit(0);
});

rl.on("SIGINT", () => {
    console.log("\nExiting...");
    socket.disconnect();
    rl.close();
    process.exit(0);
});