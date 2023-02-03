<script>
    import { goto } from '$app/navigation';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    let formErrors = {}

    function goHomePage() {
        goto('/')
    }

    export async function postSignUp() {
        localStorage.setItem("newUser", true)
        goto('/login')
    }

    async function createUser(e) {
        e.preventDefault()
        if (e.target.password.value !== e.target.passwordconfirmation.value) {
            formErrors['password'] = {
                message: "Password confirmation does not match"
            }
            return;
        }
        
        const userData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            passwordConfirm: e.target.passwordconfirmation.value
        }  

        
        const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}/api/collections/users/records`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }) //https://codeinu.net/language/javascript/c548269-cors-fetch-method-post-headers-content-type-application-json

        if (resp.status == 200) {
            postSignUp()
        } else {
            const res = await resp.json()
            formErrors = res.data
        }
    }

</script>

<h1 class="text-center text-xl mt-5 font-bold sm:text-3xl">Create an Account to Post a Job</h1>
<div class="text-center">
    <a class="link-hover italic" href="/login">
        <span class="hidden sm:inline">Already have an account?</span> Click here to <span class="font-bold">LOGIN</span> instead!
    </a>
</div>
<form on:submit={createUser} class="flex flex-col items-center mt-4 gap-4">
    <div class="form-control w-8/12">
        <label class="label">
          <span class="label-text text-xl">Username</span>
        </label>
        <input type="text" name="username" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'username' in formErrors}
            <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
        {/if}
    </div>

    <div class="form-control w-8/12">
        <label class="label">
          <span class="label-text text-xl">Email</span>
        </label>
        <input type="text" name="email" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'email' in formErrors}
            <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
        {/if}
    </div>
    
    <div class="form-control w-8/12">
        <label class="label">
          <span class="label-text text-xl">Password</span>
        </label>
        <input type="password" name="password" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'password' in formErrors}
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
        {/if}
    </div>

    <div class="form-control w-8/12">
        <label class="label">
          <span class="label-text text-xl">Confirm Password</span>
        </label>
        <input type="password" name="passwordconfirmation" placeholder="Type here" class="input input-bordered w-full" required/>
        {#if 'password' in formErrors}
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
        {/if}
    </div>

    <div class="flex flex-col w-8/12 gap-3 mb-4 sm:gap-7 mt-5">
        <button class="btn">Create Account</button>
        <button on:click={goHomePage} class="btn">Back to Homepage</button>
    </div>
</form>
