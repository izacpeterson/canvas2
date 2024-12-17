<script>
  import { signIn } from "@auth/sveltekit/client";

  import "../app.css";
  let { children, data } = $props();
</script>

{#if data.session}
  <div class="navbar bg-base-100 shadow">
    <div class="navbar-start">
      <a
        href="/"
        class="btn btn-ghost text-xl"
      >
        Astra Education Technologys
      </a>
    </div>
    <div class="navbar-end">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost btn-circle avatar"
      >
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={data.session.user.image}
          />
        </div>
      </div>
    </div>
  </div>

  {@render children()}
{:else}
  <div class="flex items-center justify-center h-screen">
    <button
      class="btn btn-primary"
      onclick={signIn}
    >
      Sign In
    </button>
  </div>
{/if}
