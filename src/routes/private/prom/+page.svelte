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

{#if promSignupSummaries}
    <h1>Prom Signups</h1>
    <ul>
        {#each promSignupSummaries as signup}
            <li>
                <button
                    onclick={() => {
                        goto(`/private/prom/${signup.id}`);
                    }}
                >
                    <p>{signup.name} - {signup.grade}</p>
                    <p>has paid: {signup.has_paid ? 'yes' : 'no'}</p>
                </button>
            </li>
        {/each}
    </ul>
{:else}
    <p>Loading...</p>
{/if}
