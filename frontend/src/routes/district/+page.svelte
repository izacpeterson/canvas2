<script>
  const { data } = $props();
  const districts = data.data;
  console.log(districts);
</script>

<main class="p-4">
  <table class="table table-xs table-zebra">
    <thead>
      <tr>
        <td>id</td>
        <td>Name</td>
        <td>School Count</td>
        <td>Student Count</td>
      </tr>
    </thead>
    <tbody>
      {#each districts as district}
        <tr>
          <td>{district.id}</td>
          <td>
            <a
              href={`/district/${district.id}`}
              class="link"
            >
              {district.name}
            </a>
          </td>
          <td>{district.school_count}</td>
          <td>{district.student_count}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
