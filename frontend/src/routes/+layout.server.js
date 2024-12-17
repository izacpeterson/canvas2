export const load = async (event) => {
  try {
    let response = await fetch(`http://localhost/api/faculty/${session.user.email}`);
    let data = await response.json();

    session.facultyData = data;
  } catch (error) {}
  const session = await event.locals.auth();

  return {
    session
  };
};
