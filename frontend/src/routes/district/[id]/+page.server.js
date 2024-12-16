export async function load({ params }) {
  let response = await fetch(`http://localhost/api/districts/${params.id}`);
  let data = await response.json();

  return { data };
}
