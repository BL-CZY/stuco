<script lang="ts">
    import { goto } from '$app/navigation';

    $effect(() => {
        if (window.localStorage.getItem('id')) {
            goto('/prom/success?id=' + window.localStorage.getItem('id'));
        }
    });
</script>

<form
    method="POST"
    action="?/new"
    onsubmit={(e) => {
        //@ts-ignore
        if (e.target.name.value.length < 3) {
            e.preventDefault();
            alert('Name must be at least 3 characters long');
        }

        //@ts-ignore
        if (!e.target.grade.value) {
            e.preventDefault();
            alert('Please enter your grade');
        }

        //@ts-ignore
        if (!e.target.option.value) {
            e.preventDefault();
            alert('Please enter your option');
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

    <input type="submit" value="Submit" class="btn btn-primary mt-4" />
</form>
