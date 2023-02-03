<script>
    export let data;
    import { goto } from '$app/navigation'; 
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    let formErrors = {}

    function goBackJobs() {
      goto(`/jobs/${data.job.id}`)
    }

    async function updateJobs(e) {
        const getDatafromLocalStorage = localStorage.getItem("auth")
        const JSONtoObj = JSON.parse(getDatafromLocalStorage)
        const userID = JSONtoObj.userId

        const updatedJob = {
            user: userID,
            title: e.target.jobtitle.value,
            minAnnualCompensation: e.target.mincomp.value,
            maxAnnualCompensation: e.target.maxcomp.value,
            description: e.target.description.value,
            requirements: e.target.requirements.value,
            applicationInstructions: e.target.instructions.value,
            location: e.target.location.value,
            employer: e.target.companyname.value,
        }

        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: JSONtoObj.token

            },
            body: JSON.stringify(updatedJob),
        }) //https://codeinu.net/language/javascript/c548269-cors-fetch-method-post-headers-content-type-application-json

        if (resp.status == 200) {
            goto(`/jobs/${data.job.id}`)
        } else {
            const res = await resp.json()
            formErrors = res.data
        }
}
</script>

<form on:submit={updateJobs} class="flex flex-col items-center">
    <div class="form-control w-8/12 sm:w-6/12">
        <label class="label">
            <span class="label-text text-xl">Job title</span>
        </label>
        <input type="text" name="jobtitle" value={data.job.title} class="input input-bordered w-full" required/>
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
        <label class="label">
            <span class="label-text text-xl">Min Annual Compensation</span>
        </label>
        <input type="number" value={data.job.minAnnualCompensation} name="mincomp" class="input input-bordered w-full" required/>
        <label class="label">
            <span class="label-text-alt">USD</span>
            <span class="label-text-alt">per annum</span>
        </label>
        {#if 'minAnnualCompensation' in formErrors}
            <span class="label-text-alt text-red-500">{formErrors['minAnnualCompensation'].message}</span>
        {/if}
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
        <label class="label">
            <span class="label-text text-xl">Max Annual Compensation</span>
        </label>
        <input type="number" name="maxcomp"  value={data.job.maxAnnualCompensation} class="input input-bordered w-full" required/>
        <label class="label">
            <span class="label-text-alt">USD</span>
            <span class="label-text-alt">per annum</span>
        </label>
        {#if 'maxAnnualCompensation' in formErrors}
            <span class="label-text-alt text-red-500">{formErrors['maxAnnualCompensation'].message}</span>
        {/if}
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
        <label class="label">
            <span class="label-text text-xl">Company Name</span>
        </label>
        <input type="text" name="companyname" value={data.job.employer} class="input input-bordered w-full" required/>
        
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
        <label class="label">
            <span class="label-text text-xl">Job Location</span>
        </label>
        <input type="text" name="location" value={data.job.location} class="input input-bordered w-full" required/>
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
    <label class="label">
        <span class="label-text text-xl">Description</span>
    </label>
    <textarea name="description" value={data.job.description} class="textarea textarea-bordered textarea-lg w-full" required></textarea>
    {#if 'description' in formErrors}
        <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
    {/if}
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
        <label class="label">
            <span class="label-text text-xl">Requirements</span>
        </label>
        <textarea name="requirements" value={data.job.requirements} class="textarea textarea-bordered textarea-lg w-full" required></textarea>
        {#if 'requirements' in formErrors}
                <span class="label-text-alt text-red-500">{formErrors['requirements'].message}</span>
        {/if}
    </div>

    <div class="form-control w-8/12 sm:w-6/12">
        <label class="label">
            <span class="label-text text-xl">Application Instructions</span>
        </label>
        <textarea  name="instructions" value={data.job.applicationInstructions} class="textarea textarea-bordered textarea-lg w-full h-64" required></textarea>
        {#if 'applicationInstructions' in formErrors}
                <span class="label-text-alt text-red-500">{formErrors['applicationInstructions'].message}</span>
        {/if}
    </div>
    
    <div class="flex flex-col w-8/12 sm:w-6/12 gap-4 m-4 sm:mt-5">
        <button class="btn">Update Job</button>
        <button on:click={goBackJobs} class="btn">Back</button>
    </div>
</form>
