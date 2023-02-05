<script>
    import humanize from "humanize-plus";
    import SvelteMarkdown from 'svelte-markdown';
    import { goto } from '$app/navigation';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    let formErrors = {}

    function goHomePage() {
      goto('/')
    }

    function goUpdate() {
      goto(`/jobs/${data.job.id}/update`)
    }

    let obtainDataFromLocalStorage= localStorage.getItem("auth")
    let parseJSON = JSON.parse(obtainDataFromLocalStorage)
    let userID = parseJSON.userId
    export let data;

    async function deleteJobs() {
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: parseJSON.token
            },
        }) //https://codeinu.net/language/javascript/c548269-cors-fetch-method-post-headers-content-type-application-json
        
        if (resp.status == 204) {
            goHomePage()
        } else {
            const res = await resp.json()
            formErrors = res.message
        }
}

</script>

  <div class="p-5 mb-5">
    <div class="flex justify-between items-center sm:items-start">
      <div class="flex flex-col basis-10/12">
        <h1 class="text-xl w-full font-extrabold sm:text-3xl sm:w-full">{data.job.title}</h1>
        <p class="text-sm sm:text-xl">{data.job.employer} <span class="sm:hidden">({data.job.location})</span></p>
      </div>

      <div class="flex items-center">
        {#if data.job.user == userID}
        <div class="dropdown dropdown-bottom dropdown-end pr-4 sm:hidden">
          <label tabindex="0" class="btn btn-circle btn-outline m-1"><i class="fa-solid fa-chevron-down"></i></label>
          <ul tabindex="0" class="flex flex-col items-center dropdown-content menu p-2 shadow bg-base-100 rounded-box w-20">
            <li on:click={goUpdate}><i on:click={goUpdate} class='far fa-edit sm:hidden' style='font-size:24px'></i></li>
            <li on:click={goHomePage}><i on:click={goHomePage} class="fa-solid fa-x" style='font-size:24px'></i></li>
          </ul>
        </div>
        
        <div class="hidden sm:dropdown sm:dropdown-bottom">
          <label tabindex="0" class="btn btn-outline m-1">Edit/Delete</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li on:click={goUpdate}><a>Edit</a></li>
            <li on:click={deleteJobs}><a>Delete</a></li>
          </ul>
        </div>
        {/if}
        <div>
          <button on:click={goHomePage} class="hidden sm:btn sm:btn-active sm:btn-outline">Back to Homepage</button>
          {#if data.job.user !== userID}
          <button on:click={goHomePage} class="btn btn-circle btn-outline mr-3.5 sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {/if}
        </div>
        
      </div>
    </div>


    <h2 class="text-xl font-thin mt-3 sm:hidden">Salary Range</h2>
    <p class="mt-1 sm:hidden">
      USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD
      {humanize.formatNumber( data.job.maxAnnualCompensation ) } yearly
    </p>
  
    <div class="flex flex-row mt-4 text-justify justify-between sm:w-full sm:gap-10">
      <div class="prose max-w-none w-full sm:basis-2/3">
        <h2 class="text-xl font-thin">Description</h2>
        <SvelteMarkdown source={data.job.description} />
        <div class="mt-6" />
        <h2 class="text-xl font-thin">Requirements</h2>
        <SvelteMarkdown source={data.job.requirements} />
        <div class="mt-6"/>
          <h2 class="text-xl font-thin">How to Apply?</h2>
          <p class="break-all">{data.job.applicationInstructions}</p>
        </div>
        <div class="hidden sm:inline-block ml-4">
          <h2 class="text-xl font-thin">Location</h2>
          <p>{data.job.location}</p>
          <div class="mt-6" />
          <h2 class="text-xl font-thin">Salary Range</h2>
          <p>
            USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD
            {humanize.formatNumber( data.job.maxAnnualCompensation )} yearly
          </p>
        </div>
      </div>
    </div>