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

  <div class="m-5 flex flex-col lg:justify-center">
    <div class="flex justify-between items-center sm:items-start">
      <div class="flex flex-col basis-10/12 lg:hidden">
        <h1 class="text-xl w-full font-extrabold sm:text-3xl sm:w-full">{data.job.title}</h1>
        <p class="text-sm sm:text-xl">{data.job.employer} <span class="sm:hidden">({data.job.location})</span></p>
      </div>

      <div class="flex items-center">
        {#if data.job.user == userID}
        <div class="dropdown dropdown-bottom dropdown-end pr-4 sm:hidden">
          <label tabindex="0" class="btn btn-circle btn-outline m-1"><i class="fa-solid fa-chevron-down"></i></label>
          <ul tabindex="0" class="flex flex-col items-center dropdown-content menu p-2 shadow bg-base-100 rounded-box w-20">
            <li on:click={goUpdate}><i class='far fa-edit sm:hidden' style='font-size:24px'></i></li>
            <li on:click={goHomePage}><i class="fa-solid fa-x" style='font-size:24px'></i></li>
          </ul>
        </div>
        
        <div class="hidden sm:dropdown sm:dropdown-bottom lg:hidden">
          <label tabindex="0" class="btn btn-outline m-1">Edit/Delete</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li on:click={goUpdate}><a>Edit</a></li>
            <li on:click={deleteJobs}><a>Delete</a></li>
          </ul>
        </div>
        {/if}

        <div>
          <button on:click={goHomePage} class="hidden sm:btn sm:btn-active sm:btn-outline lg:hidden">Back to Homepage</button>
          {#if data.job.user !== userID}
          <button on:click={goHomePage} class="btn btn-circle btn-outline sm:hidden">
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

    <div class="flex">
      <div class="flex flex-col text-justify justify-between sm:w-full lg:justify-center">
        <div class="flex sm:justify-between sm:gap-10 lg:justify-center">
          <div class="prose max-w-none w-full sm:basis-2/3 lg:basis-2/4">    
            <div class='hidden lg:block'>
              <h1 class="hidden sm:text-3xl lg:inline lg:w-full lg:font-extrabold lg:text-3xl">{data.job.title}</h1> <br>
              <p class="hidden sm:text-2xl lg:inline lg:text-2xl">{data.job.employer} <span class="sm:hidden">({data.job.location})</span></p>
            </div>     
            <h2 class="text-xl font-thin">Description</h2>
            <SvelteMarkdown source={data.job.description} />
            <div class="mt-6" />
            <h2 class="text-xl font-thin">Requirements</h2>
            <SvelteMarkdown source={data.job.requirements} />
            <div class="mt-6"/>
              <h2 class="text-xl font-thin">How to Apply?</h2>
              <p class="break-all">{data.job.applicationInstructions}</p>
            </div>
            
            <div class="hidden sm:block">
              {#if data.job.user == userID}
              <div class="hidden lg:dropdown lg:dropdown-bottom">
                <label tabindex="0" class="btn btn-outline m-1">Edit/Delete</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li on:click={goUpdate}><a>Edit</a></li>
                  <li on:click={deleteJobs}><a>Delete</a></li>
                </ul>
              </div>
              {/if}
              <button on:click={goHomePage} class="hidden lg:btn lg:btn-outline sm:mb-4 md:mt-4 lg:mb-3 xl:mb-2">Back to Homepage</button>
              <div>
                <h2 class="text-xl font-thin sm:mt-10 lg:mt-9 md:mt-10">Location</h2>
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

          
        </div>
        
      </div>
    </div>
    
  
    