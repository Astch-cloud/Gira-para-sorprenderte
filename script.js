const options = ["Sorpresa 1", "Sorpresa 2", "Sorpresa 3"];
const surprises = {
    "Sorpresa 1": "Capylampara",
    "Sorpresa 2": "Concierto inolvidable",
    "Sorpresa 3": "Pelucheee"
};
let currentOptions = [...options];
let wheelCanvas = document.getElementById("wheelCanvas");
let ctx = wheelCanvas.getContext("2d");
let spinButton = document.getElementById("spinButton");
let popup = document.getElementById("popup");
let selectedOptionElement = document.getElementById("selectedOption");
let rotation = 0;
let spinning = false;

function drawWheel() {
    const arcSize = (2 * Math.PI) / currentOptions.length;
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    currentOptions.forEach((option, i) => {
        const angle = i * arcSize + rotation;
        ctx.beginPath();
        ctx.arc(250, 250, 250, angle, angle + arcSize);
        ctx.lineTo(250, 250);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arcSize / 2);
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.fillText(option, 100, 0);
        ctx.restore();
    });
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    spinButton.disabled = true;
    let duration = 5000; // 5 seconds
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        rotation += (Math.PI / 180) * 10; // Rotate 10 degrees per frame
        drawWheel();

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            finalizeSpin();
        }
    }

    requestAnimationFrame(animate);
}

function finalizeSpin() {
    const arcSize = (2 * Math.PI) / currentOptions.length;
    const selectedIndex = Math.floor((rotation / arcSize) % currentOptions.length);
    const selectedOption = currentOptions[selectedIndex];
    currentOptions.splice(selectedIndex, 1);
    showPopup(selectedOption);

    if (currentOptions.length > 0) {
        spinButton.disabled = false;
    } else {
        spinButton.disabled = true;
    }

    spinning = false;
    rotation = 0;
}

function showPopup(option) {
    const message = surprises[option];
    selectedOptionElement.textContent = message;
    popup.style.display = "flex";
}

function cerrarPopup() {
    popup.style.display = "none";
}

spinButton.addEventListener("click", spinWheel);

drawWheel();