<script lang="ts">
    import type { Condition, EventSignupElement } from './events';

    let {
        target = $bindable(),
        elements
    }: {
        target: Condition[];
        elements: EventSignupElement[];
        AddCondition: (condition: Condition) => void;
        RemoveCondition: (index: number) => void;
        UpdateCondition: (index: number, condition: Condition) => void;
        InsertCondition: (index: number, condition: Condition) => void;
    } = $props();

    const logicalOperators = ['(', ')', 'and', 'or', 'not'];
</script>

{#each target as condition, i}
    {#if condition.type === 'connection'}
        <div class="form-control">
            <label for={`connection-${i}`} class="label">
                <span class="label-text">Logical Connector</span>
            </label>
            <select
                id={`connection-${i}`}
                bind:value={condition.connector}
                class="select select-bordered w-full"
            >
                {#each logicalOperators as operator}
                    <option value={operator}>{operator}</option>
                {/each}
            </select>
        </div>
    {:else if condition.type === 'value'}
        <div></div>
    {/if}
{/each}
