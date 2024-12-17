<script>
  import { signIn } from "@auth/sveltekit/client";

  import "../app.css";
  let { children, data } = $props();
</script>

<div class="navbar bg-base-100 shadow">
  <a
    href="/"
    class="btn btn-ghost text-xl"
  >
    Astra Education Technologys
  </a>

  <div>
    <button on:click={signIn}>Signin</button>
  </div>
</div>

{@render children()}
