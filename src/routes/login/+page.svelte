<script>
	import { authenticateUser } from './../../utils/auth.js';
	import { alerts } from '../../utils/alert.js';
	import { goto } from '$app/navigation';
	import { afterNavigate } from '$app/navigation';

	let formErrors = {};
	let result;
	let isLoginClicked = false;

	async function userLogin(e) {
		isLoginClicked = true;
		e.preventDefault();
		result = await authenticateUser(e.target.username.value, e.target.password.value);
		if (result.success) {
			goto('/');
		} else if (result.res.code == 400) {
      alerts.setAlert('Invalid credentials', 'warning');
			formErrors['errormessage'] = 'Invalid username or password';
			isLoginClicked = false;
		}
	}
</script>

<h1 class="text-center text-2xl mt-5 font-bold sm:text-3xl">Login</h1>
<form on:submit={userLogin} class="flex flex-col items-center mt-4 gap-4">
	<div class="form-control w-8/12 sm:w-6/12">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text text-xl">Username</span>
		</label>
		<input
			type="text"
			name="username"
			placeholder="Type here"
			class="input input-bordered w-full"
			required
		/>
		{#if 'errormessage' in formErrors}
			<span class="label-text-alt text-red-500">Invalid username or password </span>
		{/if}
	</div>

	<div class="form-control w-8/12 sm:w-6/12">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text text-xl">Password</span>
		</label>
		<input
			type="password"
			name="password"
			placeholder="Type here"
			class="input input-bordered w-full"
			required
		/>
		{#if 'errormessage' in formErrors}
			<span class="label-text-alt text-red-500">Invalid username or password </span>
		{/if}
	</div>

	<div class="flex flex-col w-8/12 mt-4 sm:w-4/12 sm:gap-4">
		<button class="btn"
			><button
				class="btn btn-ghost loading {isLoginClicked == true ? 'inline-flex' : 'hidden'}"
			/><span class={isLoginClicked == true ? 'hidden' : 'block'}>Login</span></button
		>
		<div class="text-center">
			<p>
				<span class="hidden sm:inline">New User?</span> <br class="sm:hidden" />
				<span
					><a class="link-hover italic underline text-blue-600" href="./../users/new">
						Click here to <span class="font-bold">CREATE</span>
						<span class="hidden sm:inline">one</span> <span class="sm:hidden">an account</span>
					</a></span
				>
			</p>
		</div>
	</div>
</form>
