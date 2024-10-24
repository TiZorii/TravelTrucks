export default function Location ({ location }){
  const formattedLocation = location
    ? location.split(", ").reverse().join(", ")
    : "";

  return <span>{formattedLocation}</span>;
};
