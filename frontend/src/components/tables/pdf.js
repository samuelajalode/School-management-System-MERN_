import jsPDF from "jspdf";

export const pdf = function ({
  data,
  headers,
  filename,
  title,
  subheading,
  date,
}) {
  const doc = new jsPDF({
    orientation: "l",
    unit: "pt",
    format: "a4",
  });

  // Get the page total pt height and pt width based on
  // https://github.com/MrRio/jsPDF/blob/ddbfc0f0250ca908f8061a72fa057116b7613e78/jspdf.js#L59

  const pageDimensions = {
    height: 595.28,
    width: 841.89,
  };

  // Set some general padding to the document
  const pageMargin = 50;

  const liveArea = {
    width: pageDimensions.width - pageMargin,
    height: pageDimensions.height - pageMargin,
  };

  // Let's set up a standard padding that we can add to known coordinates
  const padding = 15;

  doc.setFontSize(8);

  if (title) {
    doc.text(title, 200, 29);
  }

  if (subheading) {
    doc.text(subheading, 200, 30);
  }
  if (date) {
    doc.text(date, 200, 32);
  }

  const xPositions = [];

  headers.forEach((heading, index) => {
    if (heading.hasOwnProperty("xPos")) {
      doc.text(heading.label, heading.xPos, pageMargin);
      xPositions.push(heading.xPos);
    } else {
      const xPositionForCurrentHeader =
        pageMargin + index * (liveArea.width / headers.length);
      const yPositionForHeaders = pageMargin;
      doc.text(
        heading.label,
        index === 0
          ? xPositionForCurrentHeader
          : xPositionForCurrentHeader + padding,
        yPositionForHeaders
      );

      xPositions.push(
        index === 0
          ? xPositionForCurrentHeader
          : xPositionForCurrentHeader + padding
      );
    }
  });

  doc.line(pageMargin, pageMargin + 3.5, liveArea.width, pageMargin + 3.5);

  const baseYPosForRows = pageMargin + padding;
  let nextYPos = baseYPosForRows;

  // ROWS
  data.forEach((row, rIndex) => {
    const rowHeights = [];

    // COLUMNS
    headers.forEach((column, cIndex) => {
      const longText = doc.splitTextToSize(
        String(row[column.key]),
        xPositions[cIndex] - xPositions[cIndex !== 0 && cIndex - 1]
      );
      const rowHeight = longText.length * doc.getLineHeight();
      rowHeights.push(rowHeight);

      doc.text(longText, xPositions[cIndex], nextYPos);
    });

    nextYPos = nextYPos + padding + Math.max(...rowHeights, 30);
    if (nextYPos > liveArea.height) {
      doc.addPage();
      nextYPos = baseYPosForRows;
    }
  });

  doc.save(filename);
};
