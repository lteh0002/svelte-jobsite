<script>
  import { goto } from '$app/navigation';

  function goHomePage() {
    goto('http://localhost:5173')
  }

  function goSignUp() {
    goto('./users/new')
  }
</script>

<header class="flex justify-between p-3 items-center border-b-4 border-500 bg-slate-100">
    <button on:click={goHomePage} class="btn btn-ghost normal-case text-xl">Next Job DB</button>
    <div class="flex items-center mr-3">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-active m-1">Sign Up / Log In</label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a on:click={goSignUp}>Sign Up</a></li>
              <li><a>Log In</a></li>
            </ul>
            <button class="btn btn-active">Post Jobs</button>
          </div>
    </div>    
    
  </header>

