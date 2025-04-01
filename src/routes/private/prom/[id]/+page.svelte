<script lang="ts">
    import { goto } from '$app/navigation';

    const { data } = $props();
    const { prom, supabase } = $derived(data);
    let paymentMethod = $state('');
</script>

<div class="bg-base-200 rounded-2xl p-6">
    <div class="mx-auto max-w-2xl">
        {#if prom}
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h1 class="card-title mb-6 text-2xl">Signup Details</h1>

                    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="form-control">
                            <span class="label-text font-medium">Name</span>
                            <input
                                type="text"
                                value={prom.name}
                                class="input input-bordered"
                                disabled
                            />
                        </div>

                        <div class="form-control">
                            <span class="label-text font-medium">Grade</span>
                            <input
                                type="text"
                                value={prom.grade}
                                class="input input-bordered"
                                disabled
                            />
                        </div>

                        <div class="form-control">
                            <span class="label-text font-medium">Guest Name</span>
                            <input
                                type="text"
                                value={prom.options.guestName || 'No'}
                                class="input input-bordered"
                                disabled
                            />
                        </div>

                        {#if prom.payment_method}
                            <div class="form-control">
                                <span class="label-text font-medium">Payment Method</span>
                                <input
                                    type="text"
                                    value={prom.payment_method || 'Not specified'}
                                    class="input input-bordered"
                                    disabled
                                />
                            </div>
                        {:else}
                            <div class="form-control">
                                <label class="label" for="paymentMethod">
                                    <span class="label-text">Payment Method</span>
                                </label>
                                <select
                                    id="paymentMethod"
                                    class="select select-bordered w-full"
                                    bind:value={paymentMethod}
                                >
                                    <option value="" disabled selected
                                        >Select the payment method</option
                                    >
                                    {#each ['cash', 'card'] as option}
                                        <option value={option}>{option}</option>
                                    {/each}
                                </select>
                            </div>
                        {/if}

                        <div class="form-control">
                            <span class="label-text font-medium">Payment Status</span>
                            <div class="input input-bordered flex items-center">
                                <div
                                    class="badge {prom.has_paid
                                        ? 'badge-success'
                                        : 'badge-warning'} p-3"
                                >
                                    {prom.has_paid ? 'Paid' : 'Unpaid'}
                                </div>
                            </div>
                        </div>

                        <div class="form-control">
                            <span class="label-text font-medium">Signup ID</span>
                            <input
                                type="text"
                                value={prom.signup_id}
                                class="input input-bordered font-mono text-sm"
                                disabled
                            />
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="flex flex-col justify-end gap-4 sm:flex-row">
                        <button
                            class="btn btn-success"
                            onclick={async () => {
                                const { error } = await supabase
                                    .from('prom')
                                    .update({ has_paid: true, payment_method: paymentMethod })
                                    .eq('id', prom.id);
                                if (error) {
                                    console.error('Error updating prom signup:', error);
                                }

                                goto('/private/prom');
                            }}
                            disabled={prom.has_paid}
                        >
                            Mark as Paid
                        </button>

                        <button
                            class="btn btn-warning"
                            onclick={async () => {
                                const { error } = await supabase
                                    .from('prom')
                                    .update({ has_paid: false, payment_method: '' })
                                    .eq('id', prom.id);
                                if (error) {
                                    console.error('Error updating prom signup:', error);
                                }

                                goto('/private/prom');
                            }}
                            disabled={!prom.has_paid}
                        >
                            Mark as Unpaid
                        </button>

                        <button class="btn btn-outline" onclick={() => history.back()}>
                            Back to List
                        </button>
                    </div>
                </div>
            </div>
        {:else}
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body flex items-center justify-center">
                    <div class="text-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <p class="mt-4 text-xl">Error loading signup details</p>
                    <button class="btn btn-outline mt-4" onclick={() => history.back()}>
                        Back to List
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>
