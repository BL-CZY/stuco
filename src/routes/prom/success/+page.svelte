<script lang="ts">
    import { goto } from '$app/navigation';
    const { data } = $props();
    const { id } = $derived(data);
    $effect(() => {
        window.localStorage.setItem('id', id);
    });
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center p-4">
    <div class="card bg-base-100 w-full max-w-md shadow-xl">
        <div class="card-body items-center text-center">
            <div class="bg-success mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-success-content h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <h2 class="card-title mb-2 text-2xl">Registration Complete!</h2>

            <p class="mb-6">Your registration has been successfully submitted.</p>

            <div class="bg-base-200 mb-6 w-full rounded-lg p-3">
                <p class="text-sm opacity-70">Reference ID:</p>
                <p class="font-mono text-sm">{id}</p>
                <p class="mt-2 text-xs opacity-60">Please save this ID for your records.</p>
            </div>

            <div class="card-actions">
                <button
                    class="btn btn-primary"
                    onclick={() => {
                        window.localStorage.removeItem('id');
                        goto('/prom');
                    }}
                >
                    Register Another Person
                </button>

                <button
                    class="btn btn-outline"
                    onclick={() => {
                        goto('/');
                    }}
                >
                    Return to Home
                </button>
            </div>
        </div>
    </div>
</div>
