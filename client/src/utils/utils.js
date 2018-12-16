export const projection = (width, height) => {
  return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
};

export const getPowerOfTwo = (value, pow) => {
  pow = pow || 1;
  while (pow < value) {
    pow *= 2;
  }
  return pow;
}

export const measureText = (ctx, textToMeasure) => {
  return ctx.measureText(textToMeasure).width;
}

export const createMultilineText = (ctx, textToWrite, maxWidth, text) => {
  textToWrite = textToWrite.replace("\n", " ");
  let currentText = textToWrite;
  let futureText;
  let subWidth = 0;
  let maxLineWidth = 0;

  let wordArray = textToWrite.split(" ");
  let wordsInCurrent, wordArrayLength;
  wordsInCurrent = wordArrayLength = wordArray.length;

  while (measureText(ctx, currentText) > maxWidth && wordsInCurrent > 1) {
    wordsInCurrent--;
    let linebreak = false;

    currentText = futureText = "";
    for (let i = 0; i < wordArrayLength; i++) {
      if (i < wordsInCurrent) {
        currentText += wordArray[i];
        if (i + 1 < wordsInCurrent) {
          currentText += " ";
        }
      } else {
        futureText += wordArray[i];
        if (i + 1 < wordArrayLength) {
          futureText += " ";
        }
      }
    }
  }
  text.push(currentText);
  maxLineWidth = measureText(ctx, currentText);

  if (futureText) {
    subWidth = createMultilineText(ctx, futureText, maxWidth, text);
    if (subWidth > maxLineWidth) {
      maxLineWidth = subWidth;
    }
  }

  return maxLineWidth;
}
