<script>
  const { data } = $props();
  console.log(data);
  const schools = data.data;
  const district = {
    name: schools[0].district_name
  };
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
      <li>{district.name}</li>
    </ul>
  </div>
  <h1>{district.name}</h1>
  <table class="table table-xs table-zebra">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>level</th>
        <th>Full Name</th>
        <th>Student Count</th>
        <th>Mascot</th>
      </tr>
    </thead>
    <tbody>
      {#each schools as school}
        <tr>
          <td>{school.id}</td>
          <td>
            <a
              href={`/school/${school.id}`}
              class="link"
            >
              {school.name}
            </a>
          </td>
          <td>{school.level}</td>
          <td>{school.full_name}</td>
          <td>{school.student_count}</td>
          <td>{school.mascot}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
