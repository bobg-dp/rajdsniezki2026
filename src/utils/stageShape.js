export function formatStageDistance(distanceKm) {
  return new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(distanceKm);
}

export function buildStageShape(points, options = {}) {
  const width = options.width ?? 160;
  const height = options.height ?? 112;
  const padding = options.padding ?? 12;

  if (!Array.isArray(points) || points.length === 0) {
    return {
      pathD: "",
      start: null,
      finish: null,
      width,
      height,
    };
  }

  const longitudes = points.map(([longitude]) => longitude);
  const latitudes = points.map(([, latitude]) => latitude);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);

  const spanLongitude = Math.max(maxLongitude - minLongitude, 0.00001);
  const spanLatitude = Math.max(maxLatitude - minLatitude, 0.00001);
  const scale = Math.min(
    (width - padding * 2) / spanLongitude,
    (height - padding * 2) / spanLatitude,
  );

  const scaledWidth = spanLongitude * scale;
  const scaledHeight = spanLatitude * scale;
  const offsetX = (width - scaledWidth) / 2;
  const offsetY = (height - scaledHeight) / 2;

  const projectedPoints = points.map(([longitude, latitude]) => ({
    x: offsetX + (longitude - minLongitude) * scale,
    y: height - offsetY - (latitude - minLatitude) * scale,
  }));

  return {
    width,
    height,
    start: projectedPoints[0],
    finish: projectedPoints[projectedPoints.length - 1],
    pathD: projectedPoints
      .reduce((path, point, index) => {
        const command = index === 0 ? "M" : "L";
        return `${path}${command}${point.x.toFixed(2)} ${point.y.toFixed(2)} `;
      }, "")
      .trim(),
  };
}
