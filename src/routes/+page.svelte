<script>
	import humanize from 'humanize-plus';
	import { goto } from '$app/navigation';
	import { getUserInfo } from '../utils/auth.js';
	import { loginStatus } from './../utils/auth.js';
	export let data;

	const mq = window.matchMedia('(max-width: 640px)');

	function applyJob(id) {
		if (mq.matches && event.target.innerHTML !== 'More Details') {
			return;
		} else if (!mq.matches && event.target.innerHTML == 'Edit Job') {
			return;
		} else {
			goto(`/jobs/${id}`);
		}
	}

	function editJob(id) {
		goto(`/jobs/${id}/update`);
	}
</script>
<h1 class="text-center text-xl mt-5 font-bold sm:text-3xl">Find Your Next Dream Job Here!</h1>
<div class="flex flex-col items-center gap-3 mb-10">
	{#each data.jobs as job}
		<div
			class="card w-5/6 bg-base-100 shadow-xl hover:-translate-y-1 hover:transition hover:delay-75"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={applyJob(job.id)} class="card-body sm:cursor-pointer">
				<div class="flex justify-between">
					<div>
						<h2 class="card-title">{job.title}</h2>
						<p>{job.employer}</p>
					</div>
					{#if job.user == getUserInfo().userId}
						<div class="mt-2 z-40 sm:hidden {$loginStatus ? 'inline-block' : 'hidden'}">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<i
								on:click={editJob(job.id)}
								class="far fa-edit cursor-pointer"
								style="font-size:24px"
							/>
						</div>
					{/if}
				</div>

				<h3 class="font-bold mt-3">{job.location}</h3>
				<span class="text-sm font-bold">
					<span class="text-sm"
						>USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
							job.maxAnnualCompensation
						)} yearly</span
					>
				</span>

				<div class="hidden sm:inline-block">
					{#if job.description.length < 241}
						{job.description}
					{:else}
						{job.description.slice(0, 240)}...
					{/if}
				</div>

				<div class="italic text-xs opacity-50 mt-2">
					posted {new Date(job.created).toLocaleDateString(undefined, {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</div>

				<div class="card-actions justify-end">
					<div class="{$loginStatus
            ? 'block'
            : 'hidden'}">
						{#if job.user == getUserInfo().userId}
							<button
								on:click|self={editJob(job.id)}
								class="hidden sm:btn sm:btn-outline mt-2">Edit Job</button
							>
						{/if}
					</div>

					<button on:click|self={applyJob(job.id)} class="btn btn-outline mt-2 sm:hidden"
						>More Details</button
					>
				</div>
			</div>
		</div>
	{/each}
</div>
