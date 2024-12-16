<script>
  const { data } = $props();
  const students = data.data;
  const school = {
    district_name: students[0].district_name,
    district_id: students[0].district_id,
    name: students[0].school_name,
    id: students[0].district_id
  };

  //   console.log(students[0]);
  console.log(school);
</script>

<main class="p-4">
  <div class="breadcrumbs text-sm">
    <ul>
      <li>
        <a
          href="/"
          class="link"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/district"
          class="link"
        >
          Districts
        </a>
      </li>
      <li>
        <a
          href={`/district/${school.district_id}`}
          class="link"
        >
          {school.district_name}
        </a>
      </li>
      <li>
        {school.name}
      </li>
    </ul>
  </div>
  <h1>{school.name}</h1>
  <table class="table table-xs table-zebra">
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>DOB</th>
      </tr>
    </thead>
    <tbody>
      {#each students as student}
        <tr>
          <td>{student.student_id}</td>
          <td>{student.student_firstname}</td>
          <td>{student.student_lastname}</td>
          <td>{new Date(student.student_dob * 1).toLocaleDateString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
