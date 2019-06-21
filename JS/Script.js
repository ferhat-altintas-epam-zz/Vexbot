let quantity = 500;

const canvas = document.getElementById('canvas');
canvas.width = 1100;
canvas.height = 969;
const ctx = canvas.getContext('2d');

let places = [];

const fetchToJSON = response => {
    if(response.status === 200) {                
        return response.json();
    }
};

const init = (async () => {

    fetch(`https://api.noopschallenge.com/vexbot?count=${quantity}`)
        .then(fetchToJSON)
        .then(data => {
            drawSquares(data);
        });
})();

const wait = milliseconds => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
};

const getRandomColor = () => {
    return `rgba(${getRandomColorNumber()}, ${getRandomColorNumber()}, ${getRandomColorNumber()}, 0.5)`;
};

const getRandomColorNumber = () => {
    return Math.floor(Math.random() * 255);
};

const drawSquares = async datas => {

    for(let square of datas.vectors) {
        if(!isCollision({x: square.a.x, y: square.a.y, width: 100, height: 100})) {
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(square.a.x, square.a.y, 100, 100);
            places.push({x: square.a.x, y: square.a.y, width: 100, height: 100});
            await wait(300);
        }
    }
};

const isCollision = (square) => {
    
    for(let place of places) {
        if(square.x < place.x + place.width &&
            square.x + square.width > place.x &&
            square.y < place.y + place.height &&
            square.y + square.height > place.y) {
            return true;
        }
    }
    
    return false;
};
