<script>
    import { authenticateUser } from './../../utils/auth.js';
    import { goto } from '$app/navigation';
    import {isUserRedirectedFromPostJob} from "./../../utils/alert.js";

    let formErrors = {}
    let result
    let isLoginClicked = false

    async function userLogin (e) {
        isLoginClicked = true
        e.preventDefault()
        result = await authenticateUser(e.target.username.value, e.target.password.value)
        if (result.success) {
            goto('/')
        } else if (result.res.code == 400) {
            formErrors['errormessage'] = 'Invalid username or password'
            isLoginClicked = false
        }
    }
</script>

<div class="flex justify-center">
    <div class="flex justify-center alert alert-warning shadow-lg w-10/12 {$isUserRedirectedFromPostJob == true ? 'block' : 'hidden'} sm:w-5/12">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Please Login/Sign Up to Post Jobs!</span>
        </div>
    </div>
</div>


<h1 class="text-center text-2xl mt-5 font-bold sm:text-3xl">Login</h1>
<form on:submit={userLogin} class="flex flex-col items-center mt-4 gap-4">
    <div class="form-control w-8/12 sm:w-6/12">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text text-xl">Username</span>
        </label>
        <input type="text" name="username" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'errormessage' in formErrors}
            <span class="label-text-alt text-red-500">Invalid username or password </span>
        {/if}
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text text-xl">Password</span>
        </label>
        <input type="password" name="password" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'errormessage' in formErrors}
            <span class="label-text-alt text-red-500">Invalid username or password </span>
        {/if}
    </div>

    <div class="flex flex-col w-8/12 mt-4 sm:w-4/12 sm:gap-4">
        <button class="btn"><button class="btn btn-ghost loading {isLoginClicked == true ? 'inline-flex' : 'hidden'}"></button><span class="{isLoginClicked == true ? 'hidden' : 'block'}">Login</span></button>
        <div class="text-center">
            <p><span class="hidden sm:inline">New User?</span> <br class="sm:hidden">
            <span><a class="link-hover italic underline text-blue-600" href="./../users/new">
            Click here to <span class="font-bold">CREATE</span> <span class="hidden sm:inline">one</span> <span class="sm:hidden">an account</span>
             </a></span></p>
        </div>
    </div>
</form>