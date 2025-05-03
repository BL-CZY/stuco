<script lang="ts">
    import { droppable, draggable, type DragDropState } from '@thisux/sveltednd';
    import { slide } from 'svelte/transition';
    let value = $state('');
    let { items = $bindable() }: { items: string[] } = $props();

    // Track which item is being dragged and which container is being hovered over
    let draggedItem = $state<string | null>(null);
    let dragOverContainer = $state<string | null>(null);
</script>

<div class="bg-base-200 mx-auto w-full max-w-md rounded-lg p-4 shadow-md">
    <h3 class="text mb-4 font-semibold">Options:</h3>

    <div class="mb-4 space-y-2">
        {#each items as item, i (i)}
            <div
                class="bg-base-100 hover:bg-base-300 flex cursor-move items-center gap-2 rounded-md p-2 transition-all duration-200"
                transition:slide
                use:droppable={{
                    container: i.toString(),
                    callbacks: {
                        onDrop: (state: DragDropState<string>) => {
                            const { draggedItem, targetContainer } = state;
                            console.log(`${draggedItem} dropped on ${targetContainer}`);
                            if (!targetContainer) {
                                return;
                            }
                            const dragIndex = parseInt(draggedItem);
                            const dropIndex = parseInt(targetContainer);
                            if (!isNaN(dragIndex) && !isNaN(dropIndex)) {
                                let drag = items[dragIndex];
                                let drop = items[dropIndex];
                                items[dragIndex] = drop;
                                items[dropIndex] = drag;
                            }
                        },
                        onDragEnter: (state: DragDropState<string>) => {
                            dragOverContainer = state.targetContainer;
                        },
                        onDragLeave: () => {
                            dragOverContainer = null;
                        }
                    }
                }}
                use:draggable={{
                    container: i.toString(),
                    dragData: i.toString(),
                    callbacks: {
                        onDragStart: (state: DragDropState<string>) => {
                            draggedItem = state.draggedItem;
                        },
                        onDragEnd: () => {
                            draggedItem = null;
                        }
                    }
                }}
                class:dragging={draggedItem === i.toString()}
                class:drag-over={dragOverContainer === i.toString()}
            >
                <div class="text-primary flex-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    bind:value={items[i]}
                    class="input input-bordered input-sm focus:outline-primary flex-grow"
                />
                <button
                    type="button"
                    class="btn btn-circle btn-sm btn-error btn-outline"
                    onclick={() => {
                        items.splice(i, 1);
                    }}
                    aria-label="Remove item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        {/each}
    </div>

    <div class="flex gap-2">
        <input
            type="text"
            bind:value
            class="input input-bordered input-md flex-grow"
            placeholder="New Option"
        />
        <button
            type="button"
            class="btn btn-primary"
            onclick={() => {
                try {
                    if (value.trim()) {
                        items.push(value);
                        value = '';
                    }
                } catch (e) {
                    alert('New options have to have a unique name');
                }
            }}
        >
            Add
        </button>
    </div>
</div>
