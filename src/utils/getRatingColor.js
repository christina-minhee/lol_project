export function getRatingColor(rating) {
  let color = "text-style-regular";

  if (rating >= 5) {
    color = "text-style-orange";
  } else if (rating >= 4) {
    color = "text-style-blue";
  } else if (rating >= 3) {
    color = "text-style-green";
  }

  return color;
}
