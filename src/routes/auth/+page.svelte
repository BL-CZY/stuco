<script lang="ts">
    const { data } = $props();
    const { msg } = $derived(data);

    $effect(() => {
        if (msg) {
            alert(msg);
        }
    });
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center">
    <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
            <h2 class="card-title mb-6 text-center text-2xl font-bold">Login</h2>

            <form method="POST" action="?/login" class="space-y-4">
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        class="input input-bordered w-full"
                        required
                    />
                </div>

                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        class="input input-bordered w-full"
                        required
                    />
                </div>

                <div class="form-control mt-6">
                    <button class="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>
