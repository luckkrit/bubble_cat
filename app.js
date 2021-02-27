let bubbles = [];
let animationFrames = 1000 / 60;
let container = d3
  .select("body")
  .append("svg")
  .attr("width", window.screen.width)
  .attr("height", window.screen.height);
let containerWidth = parseInt(container.attr("width"));
let containerHeight = parseInt(container.attr("height"));
let circleRadius = 20;
let count = 0;

function getRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}
function getRandomX(containerWidth, circleRadius) {
  return getRandomBetween(circleRadius, containerWidth - circleRadius);
}
function getRandomY(containerHeight, circleRadius) {
  return getRandomBetween(containerHeight, containerHeight + circleRadius);
}
function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomBubbles(total) {
  if (total < 1) throw Error("Total less than 1");
  for (let i = 0; i < total; i++) {
    let bubble = new Bubble(
      d3,
      container,
      getRandomX(containerWidth, circleRadius),
      getRandomY(containerHeight, circleRadius),
      circleRadius,
      "#" + getRandomColor(),
      animationFrames
    );
    bubbles.push(bubble);
  }
}

function createRandomBubbleImage(total) {
  if (total < 1) throw Error("Total less than 1");
  for (let i = 0; i < total; i++) {
    let bubble = new BubbleImage(
      d3,
      container,
      getRandomX(containerWidth, circleRadius),
      getRandomY(containerHeight, circleRadius),
      circleRadius,
      "#" + getRandomColor(),
      animationFrames,
      "https://loremflickr.com/300/300/cat?random=" + i,
      300,
      i
    );
    bubbles.push(bubble);
  }
}

function getBubble(index) {
  if (index === bubbles.length) {
    count = 0;
    index = 0;
  }
  return bubbles[index];
}

// createRandomBubbles(3);
createRandomBubbleImage(10);
setInterval(() => {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
  }
}, animationFrames);
