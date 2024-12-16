<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="navbar bg-base-100 shadow">
  <a
    href="/"
    class="btn btn-ghost text-xl"
  >
    Astra Education Technology
  </a>
</div>

{@render children()}
