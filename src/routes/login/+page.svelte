<script>
    import { authenticateUser } from './../../utils/auth.js';
    import { goto } from '$app/navigation';
    let formErrors = {}
    let result

    async function userLogin (e) {
        e.preventDefault()
        result = await authenticateUser(e.target.username.value, e.target.password.value)
        if (result.success) {
            goto('./..')
        } else if (result.res.code == 400) {
            formErrors['errormessage'] = 'Invalid username or password'
        }
    }
</script>

<h1 class="text-center text-3xl mt-5 font-bold">Login</h1>
<div class="text-center mt-1">
    <a class="link-hover italic" href="./../users/new">
       Don't have an account? Click here to create one.
    </a>
</div>
<form on:submit={userLogin} class="flex flex-col items-center mt-4 gap-4">
    <div class="form-control w-4/12">
        <label class="label">
          <span class="label-text text-xl">Username</span>
        </label>
        <input type="text" name="username" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'errormessage' in formErrors}
            <span class="label-text-alt text-red-500">Invalid username or password </span>
        {/if}
    </div>

    <div class="form-control w-4/12">
        <label class="label">
          <span class="label-text text-xl">Password</span>
        </label>
        <input type="password" name="password" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'errormessage' in formErrors}
            <span class="label-text-alt text-red-500">Invalid username or password </span>
        {/if}
    </div>

    <div class="flex flex-col w-4/12 gap-8 mt-4">
        <button class="btn">Login</button>
    </div>
</form>