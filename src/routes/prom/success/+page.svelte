<script lang="ts">
    import { goto } from '$app/navigation';

    const { data } = $props();
    const { id } = $derived(data);

    $effect(() => {
        window.localStorage.setItem('id', id);
    });
</script>

<p>Success! Your id is: {id}</p>
<button
    class="btn"
    onclick={() => {
        window.localStorage.removeItem('id');
        goto('/prom');
    }}>New signup</button
>
