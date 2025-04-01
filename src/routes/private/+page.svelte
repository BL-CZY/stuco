<script lang="ts">
    import { goto } from '$app/navigation';
    let { data } = $props();
    let { user } = $derived(data);
</script>

<!-- Header with admin title -->
<div class="bg-primary text-primary-content mb-8 rounded-lg p-6 shadow-lg">
    <h1 class="text-3xl font-bold">Admin Dashboard</h1>
    <p class="opacity-80">Logged in as: {user?.email}</p>
</div>

<!-- Event Links -->
<div class="card bg-base-100 mb-8 shadow-lg">
    <div class="card-body">
        <h2 class="card-title mb-4 text-xl">Manage Events</h2>
        <div class="flex flex-wrap gap-4">
            <button
                class="btn btn-primary"
                onclick={() => {
                    goto('/private/prom');
                }}
            >
                Prom Management
            </button>
            <button class="btn btn-outline opacity-50" disabled> Future Events </button>
        </div>
    </div>
</div>
