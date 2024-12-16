<script>
  const { data } = $props();
  console.log(data);
  const schools = data.data;
  const district = {
    name: schools[0].district_name
  };
</script>

<main>
  <h1>{district.name}</h1>
  <table class="table table-xs table-zebra">
    <thead>
      <tr>
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
          <td>{school.name}</td>
          <td>{school.level}</td>
          <td>{school.full_name}</td>
          <td>{school.student_count}</td>
          <td>{school.mascot}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
