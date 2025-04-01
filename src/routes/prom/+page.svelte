<script lang="ts">
    import { goto } from '$app/navigation';
    $effect(() => {
        if (window.localStorage.getItem('id') && window.localStorage.getItem('cost')) {
            goto(
                '/prom/success?id=' +
                    window.localStorage.getItem('id') +
                    '&cost=' +
                    window.localStorage.getItem('cost')
            );
        }
    });

    let grade = $state('');
    let hasGuest = $state(false);
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
                    <select
                        id="grade"
                        class="select select-bordered w-full"
                        name="grade"
                        bind:value={grade}
                    >
                        <option value="" disabled selected>Select your grade</option>
                        {#each ['Sec 1', 'Sec 2', 'Sec 3', 'Sec 4'] as option}
                            <option value={option}>{option}</option>
                        {/each}
                    </select>
                </div>

                <div>
                    <input
                        type="checkbox"
                        name="hasGuest"
                        id="option"
                        class="checkbox checkbox-primary"
                        bind:checked={hasGuest}
                    />
                    <label for="option">I would like to bring a guest</label>
                </div>

                {#if hasGuest}
                    <div class="form-control">
                        <label class="label" for="guestName">
                            <span class="label-text">Guest Name</span>
                        </label>
                        <input
                            id="guestName"
                            type="text"
                            name="guestName"
                            placeholder="Enter the name of the guest"
                            class="input input-bordered w-full"
                        />
                    </div>

                    <p>Guest should be at least 14 years old</p>
                    <p>A permission slip is required as well.</p>
                {/if}

                {#if grade && grade === 'Sec 4'}
                    <p>Your cost is 30€</p>
                {:else if grade}
                    <p>Your cost is 36€</p>
                {/if}

                <div class="form-control mt-6">
                    <input type="submit" value="Submit" class="btn btn-primary w-full" />
                </div>
            </form>
        </div>
    </div>
</div>
