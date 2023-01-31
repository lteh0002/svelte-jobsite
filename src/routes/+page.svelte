<script>
  import Header from "./Header.svelte";
  import humanize from 'humanize-plus'
  import { goto } from '$app/navigation';
	export let data

  function applyJob(id) {
    goto(`./jobs/${id}`)
  }
</script>

<Header />
<h1 class="text-center text-3xl mt-5 font-bold">Find Your Next Dream Job Here!</h1>
<div class="flex flex-col items-center gap-3">
  {#each data.jobs as job}
    <div class="card w-4/6 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{job.title}</h2>
        <p>{job.employer}</p>
  
        <h3 class="font-bold mt-3">{job.location}</h3>
        <span class="text-sm font-bold">
          <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)} yearly</span>
        </span>
  
        <div class="mt-4 ">
          {job.description.slice(0, 240)}...
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
          <button on:click={applyJob(job.id)} class="btn btn-outline">Apply</button>
        </div>
      </div>
    </div>
  {/each}
  </div>
  