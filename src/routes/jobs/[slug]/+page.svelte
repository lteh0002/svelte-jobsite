<script>
    import humanize from "humanize-plus";
    import Header from "../../Header.svelte";
    import SvelteMarkdown from 'svelte-markdown';
    import { goto } from '$app/navigation';

    function goHome() {
      goto('./../..')
    }

    export let data;
</script>
  
<Header />
  <div class="p-10">
    <div class="flex">
      <div class="flex-1">
        <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
        <p class="text-xl">{data.job.employer}</p>
      </div>
      <button on:click={goHome} class="btn btn-active">Back to Homepage</button>
    </div>
  
    <div class="flex flex-row w-full mt-8">
      <div class="basis-2/3 prose max-w-none w-full">
        <h2 class="text-xl font-thin">Description</h2>
        <SvelteMarkdown source={data.job.description} />
        <div class="mt-6" />
        <h2 class="text-xl font-thin">Requirements</h2>
        <SvelteMarkdown source={data.job.requirements} />
          <div class="mt-6" />
          <h2 class="text-xl font-thin">How to Apply?</h2>
          <p>{data.job.applicationInstructions}</p>
        </div>
        <div class="basis-1/3 ml-4">
          <h2 class="text-xl font-thin">Location</h2>
          <p>{data.job.location}</p>
          <div class="mt-6" />
          <h2 class="text-xl font-thin">Salary Range</h2>
          <p>
            USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD
            {humanize.formatNumber( data.job.maxAnnualCompensation )}
          </p>
        </div>
      </div>
    </div>