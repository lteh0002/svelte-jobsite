<script>
    import Header from "../Header.svelte";
    import { goto } from '$app/navigation';

  function goLogIn() {
    goto('./../login')
  }
</script>

<Header />
<div class="hero min-h-screen" style="background-image: url(https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Account Created!</h1>
        <p class="mb-5">Click the button below to log in.</p>
        <button on:click={goLogIn} class="btn btn-primary">Log In</button>
        <ul class="steps steps-vertical lg:steps-horizontal mt-4">
            <li class="step step-primary">Sign Up</li>
            <li class="step">Log In</li>
            <li class="step">Create a Job</li>
            <li class="step">Start Recruiting!</li>
          </ul>
      </div>
    </div>
</div>