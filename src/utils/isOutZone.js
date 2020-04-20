const isOutZone = (zone, location) => {
  let midpoint = { lat: 0, lng: 0 };

  // doi ve float
  location.lat = parseFloat(location.lat);
  location.lng = parseFloat(location.lng);

  zone.forEach((point) => {
    // doi ve float
    point.lat = parseFloat(point.lat);
    point.lng = parseFloat(point.lng);

    midpoint.lat += point.lat;
    midpoint.lng += point.lng;
  });

  // tinh midpoint
  midpoint.lat /= zone.length;
  midpoint.lng /= zone.length;

  var R = 0;

  zone.forEach((point) => {
    // công thức tính khoảng cách giữa 2 điểm tọa độ
    let distance = Math.sqrt(
      Math.pow(point.lat - midpoint.lat, 2) + Math.pow(point.lng - midpoint.lng, 2)
    );
    if (distance > R) R = distance;
  });

  // khoang cach hien tai
  let distance = Math.sqrt(
    Math.pow(midpoint.lat - location.lat, 2) + Math.pow(midpoint.lng - location.lng, 2)
  );

  if (distance > R) return 1;
  else return 0;
};

export default isOutZone;
