<script lang="ts">
    const { data } = $props();
    const { prom, supabase } = $derived(data);
</script>

{#if prom}
    <h1>Signup Detail</h1>
    <p>{prom.name}</p>
    <p>{prom.grade}</p>
    <p>{prom.options.selection}</p>
    <p>{prom.has_paid}</p>
    <p>{prom.payment_method}</p>
    <p>{prom.signup_id}</p>

    <button
        onclick={async () => {
            const { error } = await supabase
                .from('prom')
                .update({ has_paid: true })
                .eq('id', prom.id);

            if (error) {
                console.error('Error updating prom signup:', error);
            }
        }}>markAsPaid</button
    >
    <button
        onclick={async () => {
            const { error } = await supabase
                .from('prom')
                .update({ has_paid: false })
                .eq('id', prom.id);

            if (error) {
                console.error('Error updating prom signup:', error);
            }
        }}>markAsNotPaid</button
    >
{:else}
    <p>Error</p>
{/if}
