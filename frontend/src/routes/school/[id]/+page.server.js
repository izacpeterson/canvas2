export async function load({ params }) {
  let response = await fetch(`http://localhost/api/schools/${params.id}`);
  let data = await response.json();

  console.log(data);
  return { data };
}
