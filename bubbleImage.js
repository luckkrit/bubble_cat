class BubbleImage extends Bubble {
  constructor(
    d3,
    container,
    x,
    y,
    radius,
    color,
    animationFrames,
    imageUrl,
    imageWidth,
    id
  ) {
    super(d3, container, x, y, radius, color, animationFrames);
    this.id = id;
    this.imageUrl = imageUrl;
    this.imageWidth = imageWidth;
    this.defs = this.container.append("svg:defs");
    this.pattern = this.defs.append("svg:pattern");
    this.pattern
      .attr("id", "picture" + id)
      .attr("width", imageWidth)
      .attr("height", imageWidth)
      .attr("patternUnits", "userSpaceOnUse");
    this.image = this.pattern.append("svg:image");
    this.image
      .attr("xlink:href", imageUrl)
      .attr("width", imageWidth)
      .attr("height", imageWidth)
      .attr("x", 0)
      .attr("y", 0);

    this.bubble
      .attr("cx", imageWidth / 2)
      .attr("cy", imageWidth / 2)
      .attr("r", imageWidth / 2)
      .attr("fill", "#fff")
      .attr("fill", "url(#picture" + id + ")");
  }
  randomImage(randomId) {
    this.image.attr(
      "xlink:href",
      "https://loremflickr.com/300/300/cat?random=" + randomId
    );
  }
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
      this.randomImage(this.getRandomBetween(1, 20));
      this.resetSize();
      this.resetFade();
      this.fade();
    }
    this.pattern.attr("width", this.r * 2);
    this.pattern.attr("height", this.r * 2);
    this.image.attr("width", this.r * 2);
    this.image.attr("height", this.r * 2);
    this.bubble.attr("r", this.r);
    this.bubble.attr("cx", this.r).attr("cy", this.r);
    this.bubble.attr("transform", "translate(" + this.x + "," + this.y + ")");
  }
}
