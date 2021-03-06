function getFirstEdge(coordinates, width, height, angle)
{
  return getNextEdge(getNextEdge(coordinates, width / 2, angle, 2), height / 2, angle, 3);
}

function getNextEdge(coordinates, length, angle, angleModifier)
{
  var pointX = Math.round(coordinates[0] + length * Math.cos(Math.PI * (angle + 90 * angleModifier) / 180));
  var pointY = Math.round(coordinates[1] + length * Math.sin(Math.PI * (angle + 90 * angleModifier) / 180));
  var bufferPoint = [pointX, pointY];
  return bufferPoint;
}

function drawCircle(ctx, xPos, yPos, radius, color)
{
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(xPos, yPos, radius, 0,2*Math.PI);
  ctx.fill();
}

function writeText(canvas, xPos, yPos, size, font, text, color)
{
  ctx = canvas.context;
  ctx.fillStyle = color;
  ctx.font = size + "px " + font;
  ctx.textAlign = "center";
  ctx.fillText(text, xPos, yPos);
}

function toastText(xPos, yPos, size, font, text, color)
{
  this.id = toastTextId.getNextId();

  this.existenceTimeCounter = 0;

  this.update = function()
  {
    if(this.existenceTimeCounter < 50)
    {
      writeText(myGameArea, xPos, yPos - this.existenceTimeCounter, size, font, text, color);
      this.existenceTimeCounter++;
    }
    else
    {
      toastTextArray = toastTextArray.filter(toastText => toastText._id != this._id);
    }
  }
}

function drawRoundedBox(xPos, yPos, width, height, cornerRadius, color, borderColor)
{
  ctx = myGameArea.context;
  ctx.fillStyle = color;
  ctx.strokeStyle = borderColor;
  ctx.beginPath();
  ctx.arc(xPos - width / 2 + cornerRadius, yPos - height / 2 + cornerRadius, cornerRadius, 1 * Math.PI, 1.5 * Math.PI);
  ctx.arc(xPos + width / 2 - cornerRadius, yPos - height / 2 + cornerRadius, cornerRadius, 1.5 * Math.PI, 0 * Math.PI);
  ctx.arc(xPos + width / 2 - cornerRadius, yPos + height / 2 - cornerRadius, cornerRadius, 0 * Math.PI, 0.5 * Math.PI);
  ctx.arc(xPos - width / 2 + cornerRadius, yPos + height / 2 - cornerRadius, cornerRadius, 0.5 * Math.PI, 1 * Math.PI);
  ctx.lineTo(xPos - width / 2, yPos - height / 2 + cornerRadius);
  ctx.fill();
  ctx.stroke()
}

function drawButton(xPos, yPos, width, height, cornerRadius, color, hoverColor, borderColor, buttonName)
{
  var chosenColor;
  if(checkHoverFromCenter(xPos, yPos, width, height))
  {
    chosenColor = hoverColor;
    mouseOverButton = buttonName;
  }
  else
  {
    chosenColor = color;
    if(mouseOverButton == buttonName)
    {
      mouseOverButton = "none";
    }
  }
  drawRoundedBox(xPos, yPos, width, height, cornerRadius, chosenColor, borderColor)
}

function drawMenuIcon(xPos, yPos, image, iconName ,scale)
{
  if(checkHoverFromCenter(xPos, yPos, scale, scale))
  {
    drawImageCenteredAndScaled(myGameArea, xPos, yPos, image, scale + 10, scale + 10);
    mouseOverButton = iconName;
  }
  else
  {
    drawImageCenteredAndScaled(myGameArea, xPos, yPos, image, scale, scale);
    if(mouseOverButton == iconName)
    {
      mouseOverButton = "none"
    }
  }
}

function checkHoverFromCenter(xPos, yPos, width, height)
{
  if(inBetween(mousePosition[0], xPos - width / 2, xPos + width / 2) && inBetween(mousePosition[1], yPos - height / 2, yPos + height / 2))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function drawBar(xPos, yPos, height, width, color, barColor, maxValue, currentValue)
{
  ctx = myGameArea.context;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(xPos - width / 2, yPos - height / 2, width, height);
  ctx.fill();
  if(currentValue > 1)
  {
    ctx.beginPath();
    ctx.fillStyle = barColor;
    ctx.rect(xPos - width / 2 + 1, yPos - height / 2 + 1, width * (currentValue / maxValue) - 2, height - 2);
    ctx.fill();
  }
}
