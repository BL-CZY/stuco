<script>
    let { data, children } = $props();
    let { supabase } = $derived(data);
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        }
    };
</script>

<div class="flex min-h-screen flex-col">
    <header class="bg-base-200 shadow-md">
        <div class="container mx-auto px-4">
            <div class="navbar h-16">
                <div class="navbar-start">
                    <a href="/" class="btn btn-ghost text-xl">Home</a>
                </div>
                <div class="navbar-end">
                    <button onclick={logout} class="btn btn-outline btn-sm">Logout</button>
                </div>
            </div>
        </div>
    </header>

    <main class="container mx-auto flex-grow px-4 py-6">
        {@render children()}
    </main>
</div>
