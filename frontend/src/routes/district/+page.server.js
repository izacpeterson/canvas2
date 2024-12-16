export async function load({ params }) {
  let response = await fetch("http://localhost/api/districts/all");
  let data = await response.json();

  return { data };
}
