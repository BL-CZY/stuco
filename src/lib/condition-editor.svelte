<script lang="ts">
    import type { Condition } from '$lib/events';

    let {
        addCondition,
        removeCondition,
        conditions = $bindable()
    }: {
        conditions: Condition[];
        addCondition: (con: Condition) => void;
        removeCondition: (index: number) => void;
    } = $props();
</script>

<div>
    <h2>Condition Editor</h2>
    <div>
        {#each conditions as condition, i}
            <div class="condition">
                <input
                    type="text"
                    placeholder="Name"
                    bind:value={condition.name}
                    on:input={(e) => updateCondition(condition.id, 'name', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Value"
                    bind:value={condition.value}
                    on:input={(e) => updateCondition(condition.id, 'value', e.target.value)}
                />
                <button on:click={() => removeCondition(condition.id)}>Remove</button>
            </div>
        {/each}
    </div>
    <button on:click={addCondition}>Add Condition</button>
</div>
