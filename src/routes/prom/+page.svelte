<script lang="ts">
    import { goto } from '$app/navigation';
    $effect(() => {
        if (window.localStorage.getItem('id')) {
            goto('/prom/success?id=' + window.localStorage.getItem('id'));
        }
    });
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center px-4 py-8">
    <div class="card bg-base-100 mx-auto w-full max-w-md shadow-xl">
        <div class="card-body">
            <h2 class="card-title mb-6 text-center text-2xl font-bold">Registration Form</h2>

            <form
                method="POST"
                action="?/new"
                class="space-y-4"
                onsubmit={(e) => {
                    //@ts-ignore
                    if (e.target.name.value.length < 3) {
                        e.preventDefault();
                        alert('Name must be at least 3 characters long');
                        return;
                    }
                    //@ts-ignore
                    if (!e.target.grade.value) {
                        e.preventDefault();
                        alert('Please enter your grade');
                        return;
                    }
                    //@ts-ignore
                    if (!e.target.option.value) {
                        e.preventDefault();
                        alert('Please enter your option');
                        return;
                    }
                }}
            >
                <div class="form-control">
                    <label class="label" for="name">
                        <span class="label-text">Name</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        class="input input-bordered w-full"
                    />
                </div>

                <div class="form-control">
                    <label class="label" for="grade">
                        <span class="label-text">Grade</span>
                    </label>
                    <select id="grade" class="select select-bordered w-full" name="grade">
                        <option value="" disabled selected>Select your grade</option>
                        {#each ['Sec 1', 'Sec 2', 'Sec 3', 'Sec 4'] as option}
                            <option value={option}>{option}</option>
                        {/each}
                    </select>
                </div>

                <div class="form-control">
                    <label class="label" for="option">
                        <span class="label-text">Option</span>
                    </label>
                    <select id="option" class="select select-bordered w-full" name="option">
                        <option value="" disabled selected>Select your option</option>
                        {#each ['A', 'B', 'C'] as option}
                            <option value={option}>{option}</option>
                        {/each}
                    </select>
                </div>

                <div class="form-control mt-6">
                    <input type="submit" value="Submit" class="btn btn-primary w-full" />
                </div>
            </form>
        </div>
    </div>
</div>
