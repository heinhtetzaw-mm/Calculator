let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function normalizeSymbol(symbol) {
    return symbol.trim()
        .replace("×", "x")
        .replace("−", "-")
        .replace("–", "-");
}

function render() {
    screen.innerText = buffer;
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") runningTotal += intBuffer;
    else if (previousOperator === "-") runningTotal -= intBuffer;
    else if (previousOperator === "x") runningTotal *= intBuffer;
    else if (previousOperator === "÷") runningTotal /= intBuffer;
}

function handleMath(nextOperator) {
    if (buffer === "0") return;

    const intBuffer = parseInt(buffer, 10);

    if (previousOperator === null) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = nextOperator;
    buffer = "0";
}

function handleEqual() {
    if (previousOperator === null) return;

    flushOperation(parseInt(buffer, 10));
    buffer = String(runningTotal);

    runningTotal = 0;
    previousOperator = null;
}

function handleBackspace() {
    buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
}

function handleNumber(num) {
    buffer = buffer === "0" ? num : buffer + num;
}

function handleSymbol(symbol) {
    symbol = normalizeSymbol(symbol);

    if (symbol === "C") {
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        return;
    }

    if (symbol === "=") {
        handleEqual();
        return;
    }

    if (symbol === "←") {
        handleBackspace();
        return;
    }

    if (["+", "-", "x", "÷"].includes(symbol)) {
        handleMath(symbol);
    }
}

function buttonClick(value) {
    value = normalizeSymbol(value);

    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    render();
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", (event) => {
        if (!event.target.classList.contains("calc-button")) return;
        buttonClick(event.target.innerText);
    });

    render();
}

init();