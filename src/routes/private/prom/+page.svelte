<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    interface PromSignupSummary {
        id: string;
        name: string;
        grade: string;
        has_paid: boolean;
    }

    const { data } = $props();
    const { supabase } = $derived(data);
    let promSignupSummaries: PromSignupSummary[] | undefined = $state(undefined);

    onMount(async () => {
        const { data, error } = await supabase.from('prom').select('id, grade, name, has_paid');

        if (error || !data) {
            console.error('Error fetching prom signups:', error);
            return;
        }

        promSignupSummaries = data as PromSignupSummary[];
    });
</script>

<div class="card bg-base-100 shadow-lg">
    <div class="card-body">
        <h2 class="card-title mb-4 text-xl">Prom Signups</h2>

        {#if promSignupSummaries}
            <div class="overflow-x-auto">
                <table class="table-zebra table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each promSignupSummaries as signup}
                            <tr>
                                <td>{signup.name}</td>
                                <td>{signup.grade}</td>
                                <td>
                                    <div
                                        class="badge {signup.has_paid
                                            ? 'badge-success'
                                            : 'badge-warning'}"
                                    >
                                        {signup.has_paid ? 'Paid' : 'Unpaid'}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        class="btn btn-sm btn-outline"
                                        onclick={() => {
                                            goto(`/private/prom/${signup.id}`);
                                        }}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="flex justify-center p-6">
                <div class="loading loading-spinner loading-lg"></div>
                <p class="ml-4">Loading signups...</p>
            </div>
        {/if}
    </div>
</div>
