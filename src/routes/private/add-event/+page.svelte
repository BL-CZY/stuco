<script lang="ts">
    import ConditionEditor from '$lib/condition-editor.svelte';
    import type { EventSignupForm } from '$lib/events';
    import VerticalDragList from '$lib/vertical-drag-list.svelte';
    import { slide } from 'svelte/transition';
    let fieldType = $state('');
    let form: EventSignupForm = $state({ booleans: [], elements: [] });
    $effect(() => {
        $inspect(form);
    });
</script>

<div
    style="position: fixed; top: 10px; left: 10px; z-index: 1000; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);"
    class="bg-base-100"
>
    <pre>{JSON.stringify(form, null, 2)}</pre>
</div>

<div class="bg-base-200 mx-auto max-w-3xl rounded-lg p-6 shadow-lg">
    <form action="?/new-event" class="space-y-6">
        <h2 class="text-primary mb-6 text-2xl font-bold">Create New Event</h2>

        <div class="form-control w-full">
            <label for="eventName" class="label">
                <span class="label-text font-medium">Event Name</span>
            </label>
            <input
                type="text"
                name="eventName"
                id="eventName"
                placeholder="Enter event name"
                required
                class="input input-bordered w-full"
            />
        </div>

        <div class="form-control w-full">
            <label for="flyer" class="label">
                <span class="label-text font-medium">Event Flyer</span>
            </label>
            <input
                type="file"
                name="flyer"
                id="flyer"
                accept="image/*"
                class="file-input file-input-bordered w-full"
            />
        </div>

        <div class="divider">Form Elements</div>

        {#each form.elements as element, i (element)}
            <div class="element bg-base-100 rounded-md p-4 shadow-sm" transition:slide>
                {#if element.type === 'question'}
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-accent text-lg font-semibold">Question Element</h3>
                            <button
                                type="button"
                                class="btn btn-sm btn-error"
                                onclick={() => {
                                    form.elements.splice(i, 1);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                        <label for={`${i}-q-id`} class="label"
                            ><span>The id of this question (cannot be a duplicate):</span>
                        </label>
                        <input
                            type="text"
                            bind:value={element.id}
                            id={`${i}-q-id`}
                            placeholder="Age"
                        />

                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div class="form-control">
                                <label for={`${i}-q-name`} class="label">
                                    <span class="label-text">Question Text</span>
                                </label>
                                <input
                                    type="text"
                                    name={`${i}-q-name`}
                                    id={`${i}-q-name`}
                                    placeholder="Enter your question"
                                    bind:value={element.question}
                                    class="input input-bordered w-full overflow-hidden text-ellipsis whitespace-nowrap"
                                />
                            </div>

                            <div class="form-control">
                                <label for={`${i}-q-selection`} class="label">
                                    <span class="label-text">Question Type</span>
                                </label>
                                <select
                                    name={`${i}-q-selection`}
                                    id={`${i}-q-selection`}
                                    bind:value={element.body.type}
                                    onchange={(target) => {
                                        if (
                                            (target.target as HTMLSelectElement).value === 'select'
                                        ) {
                                            element.body = {
                                                type: 'select',
                                                options: ['New Option']
                                            };
                                        } else if (
                                            (target.target as HTMLSelectElement).value ===
                                            'checkbox'
                                        ) {
                                            element.body = { type: 'checkbox' };
                                        } else if (
                                            (target.target as HTMLSelectElement).value === 'input'
                                        ) {
                                            element.body = { type: 'input' };
                                        }
                                    }}
                                    class="select select-bordered w-full"
                                >
                                    <option value="checkbox">Checkbox</option>
                                    <option value="input">Text Input</option>
                                    <option value="select">Dropdown Selection</option>
                                </select>
                            </div>
                        </div>

                        {#if element.body.type === 'select'}
                            <div class="flex">
                                <div transition:slide class="w-full">
                                    <VerticalDragList bind:items={element.body.options} />
                                </div>
                            </div>
                        {/if}

                        {#if element.conditions.length > 0}
                            <div class="bg-base-200 rounded p-2 text-sm">
                                <span class="font-medium">Conditions:</span>
                                {element.conditions}
                            </div>
                        {/if}
                    </div>
                {:else if element.type === 'text'}
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <h3 class="text-secondary text-lg font-semibold">Text Element</h3>
                            <button
                                type="button"
                                class="btn btn-sm btn-error"
                                onclick={() => {
                                    form.elements.splice(i, 1);
                                }}
                            >
                                Remove
                            </button>
                        </div>

                        <input
                            type="text"
                            bind:value={element.text}
                            placeholder="Enter text"
                            class="input input-bordered w-full"
                        />

                        <select
                            name={`${i}-text-color`}
                            id={`${i}-text-color`}
                            bind:value={element.color}
                            class="select select-bordered w-full"
                        >
                            <option selected={true} value="regular">Regular</option>
                            <option value="warning">Warning</option>
                        </select>

                        {#if element.conditions.length > 0}
                            <div class="bg-base-200 rounded p-2 text-sm">
                                <span class="font-medium">Conditions:</span>
                                {element.conditions}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>

            <ConditionEditor
                target={element.conditions}
                elements={form.elements}
                AddCondition={(condition) => {
                    element.conditions.push(condition);
                }}
                RemoveCondition={(index) => {
                    element.conditions.splice(index, 1);
                }}
                UpdateCondition={(index, condition) => {
                    element.conditions[index] = condition;
                }}
                InsertCondition={(index, condition) => {
                    element.conditions.splice(index, 0, condition);
                }}
            />
        {/each}

        <div class="divider">Add New Element</div>

        <div class="flex flex-col items-end gap-4 md:flex-row">
            <div class="form-control flex-grow">
                <label for="fieldType" class="label">
                    <span class="label-text">Element Type</span>
                </label>
                <select
                    name="fieldType"
                    id="fieldType"
                    bind:value={fieldType}
                    class="select select-bordered w-full"
                >
                    <option value="" disabled selected>Select element type</option>
                    <option value="text">Text</option>
                    <option value="question">Question</option>
                </select>
            </div>

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
                            question: '',
                            id: form.elements.length.toString(),
                            conditions: [],
                            body: {
                                type: 'input'
                            }
                        });
                    }
                }}
                type="button"
                class="btn btn-primary"
                disabled={!fieldType}
            >
                Add New Element
            </button>
        </div>

        <div class="pt-6">
            <button type="submit" class="btn btn-success w-full md:w-auto"> Create Event </button>
        </div>
    </form>
</div>
