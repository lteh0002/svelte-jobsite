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
      goto(`./${data.job.id}/update`)
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

  <div class="p-10">
    <div class="flex">
      <div class="flex-1">
        <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
        <p class="text-xl">{data.job.employer}</p>
      </div>

      <div>
        {#if data.job.user == userID}
        <div class="dropdown dropdown-bottom">
          <label tabindex="0" class="btn m-1">Edit/Delete</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li on:click={goUpdate}><a>Edit</a></li>
            <li on:click={deleteJobs}><a>Delete</a></li>
          </ul>
        </div>
        {/if}
        <button on:click={goHome} class="btn btn-active">Back to Homepage</button>
      </div>
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