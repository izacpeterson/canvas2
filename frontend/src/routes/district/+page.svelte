<script>
  const { data } = $props();
  const districts = data.data;
  console.log(districts);
</script>

<main>
  <table class="table table-xs table-zebra">
    <thead>
      <tr>
        <td>id</td>
        <td>Name</td>
        <td>School Count</td>
        <td>Student Count</td>
        <td>Link</td>
      </tr>
    </thead>
    <tbody>
      {#each districts as district}
        <tr>
          <td>{district.id}</td>
          <td>{district.name}</td>
          <td>{district.school_count}</td>
          <td>{district.student_count}</td>
          <td><a href={`/district/${district.id}`}>ClickMe</a></td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
