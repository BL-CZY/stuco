<script lang="ts">
    import { goto } from '$app/navigation';

    let { data } = $props();
    let { user } = $derived(data);
</script>

<h1>Private page for user: {user?.email}</h1>
<button
    onclick={() => {
        goto('/private/prom');
    }}>Prom</button
>
