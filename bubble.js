class Bubble {
  constructor(d3, container, x, y, radius, color, animationFrames) {
    this.d3 = d3;
    this.container = container;
    this.x = x;
    this.y = y;
    this.r = radius;
    this.bubble = this.container
      .append("circle")
      .attr("fill", color)
      .attr("cx", this.x)
      .attr("cy", this.y)
      .attr("r", this.r);
    this.containerWidth = parseInt(this.container.attr("width"));
    this.containerHeight = parseInt(this.container.attr("height"));
    this.animationFrames = animationFrames; // 1000/60
    this.x_fix = x;
    this.range = 20;
    this.angle = 0;
    this.anglespeed = 0.1;
    this.speed = 0.5;
    this.min_range = 20;
    this.max_range = 60;
    this.increase_size = 1;
    this.min_r = radius;
    this.direction = 1;
    this.start = false;
    this.resetFade();
  }
  getRandomSpeed(min, max) {
    return this.getRandomBetween(min, max);
  }
  getRandomIncreaseSize(min, max) {
    return this.getRandomBetween(min, max);
  }
  getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  resetFade() {
    this.bubble.attr("opacity", 1);
  }
  fade() {
    this.bubble
      .transition()
      .ease(this.d3.easeLinear)
      .duration(Math.floor(this.animationFrames * this.containerHeight) - 3000)
      .attr("opacity", 0.3);
  }
  resetSize() {
    this.r = this.min_r;
    this.bubble.attr("r", this.r);
  }
  /**
   *  Move left to right
   * 
    let x = parseInt(bubble.attr("cx"));
    let y = parseInt(bubble.attr("cy"));
    let y_fix = y;
    let range = 20;
    let angle = 0;
    let anglespeed = 0.1;
    let speed = 1;
    let i = setInterval(() => {
    x += speed;
    angle += anglespeed;
    y = y_fix + Math.sin(angle) * range;
    if (x > 500) {
        x = 0;
        range = 20;
    }
    bubble.attr("cx", x).attr("cy", y);
   */
  move() {
    if (!this.start) {
      this.start = true;
      this.fade();
    }
    this.speed = this.getRandomSpeed(0.2, 3);
    this.y -= this.speed;
    this.angle += this.anglespeed;
    this.range += this.direction * (Math.random() * 1.5);
    this.r += this.getRandomIncreaseSize(0.2, 0.3);
    if (this.range > this.max_range || this.range < this.min_range) {
      this.direction *= -1;
    }
    this.x = this.x_fix + Math.cos(this.angle) * this.range;
    if (this.y < 0) {
      this.y = this.containerHeight;
      this.range = this.min_range;
      this.resetSize();
      this.resetFade();
      this.fade();
    }
    this.bubble.attr("r", this.r);
    this.bubble.attr("cx", this.x).attr("cy", this.y);
  }
}
