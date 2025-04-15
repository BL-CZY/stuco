<script lang="ts">
    import type { EventSignupForm } from '$lib/events';

    let fieldType = $state('');
    let form: EventSignupForm = $state({ booleans: [], elements: [] });
</script>

{@debug form}

<form action="?/new-event">
    <input type="text" name="eventName" id="eventName" placeholder="Event Name" required />
    <input type="file" name="flyer" id="flyer" accept="image/*" />
    {#each form.elements as element, i}
        {#if element.type === 'question'}
            <div>
                <label for={`${i}-q-selection`}>Question Type</label>
                <select
                    name={`${i}-q-selection`}
                    id={`${i}-q-selection`}
                    bind:value={element.body.type}
                >
                    <option value="checkbox">Checkbox</option>
                    <option value="input">Input</option>
                    <option value="select">Selection</option>
                </select>

                <label for={`${i}-q-name`}>Question Name:</label>
                <input
                    type="text"
                    name={`${i}-q-name`}
                    id={`${i}-q-name`}
                    placeholder="Question Name"
                    bind:value={element.name}
                />

                <p>{element.conditions}</p>

                <button
                    onclick={() => {
                        form.elements.splice(i, 1);
                    }}>Remove element</button
                >
            </div>
        {:else if element.type === 'text'}
            <div>
                <p>{element.text}</p>
                <p>{element.color}</p>
                <p>{element.conditions}</p>
            </div>
        {/if}
    {/each}
    <select name="fieldType" id="fieldType" bind:value={fieldType}>
        <option value="text">Text</option>
        <option value="question">Question</option>
    </select>
    <button
        onclick={() => {
            if (fieldType === 'text') {
                form.elements.push({
                    type: 'text',
                    text: '',
                    color: 'regular',
                    conditions: []
                });
            } else if (fieldType === 'question') {
                form.elements.push({
                    type: 'question',
                    name: '',
                    conditions: [],
                    body: {
                        type: 'input'
                    }
                });
            }
        }}
        type="button">New field</button
    >
</form>
