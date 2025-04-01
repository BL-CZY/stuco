<script>
    let element = $state();
    import { fly } from 'svelte/transition';
    let show = $state(false);
    $effect(() => {
        show = true;
    });
</script>

<div class="bg-base-200 bg flex max-h-[90vh] flex-col">
    <div class="hero min-h-[90vh]">
        <div class="hero-overlay"></div>
        <div class="hero-content text-neutral-content text-center">
            <div class="max-w-md">
                {#if show}
                    <p
                        class="mb-5 text-7xl font-bold sm:text-9xl"
                        in:fly={{ y: -50, duration: 1000, delay: 200 }}
                    >
                        STUCO
                    </p>
                    <p class="mb-5 text-2xl" in:fly={{ y: 30, duration: 800, delay: 600 }}>
                        Events and activities
                    </p>
                    <button
                        onclick={() => {
                            element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }}
                        class="btn btn-accent mt-[50px]"
                        in:fly={{ y: 70, duration: 800, delay: 600 }}>More</button
                    >
                {/if}
            </div>
        </div>
    </div>

    <!-- Events section with cards -->
    <div class="container mx-auto px-4 py-12" bind:this={element}>
        <h2 class="mb-8 text-center text-3xl font-bold">Upcoming Events</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <!-- Prom Card with centered title -->
            <a
                href="/prom"
                class="card bg-base-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
            >
                <figure>
                    <img
                        src="/api/placeholder/600/300"
                        alt="Prom Night Image"
                        class="h-48 w-full object-cover"
                    />
                </figure>
                <div class="card-body">
                    <h3 class="card-title justify-center text-2xl">Prom Night</h3>
                    <p>
                        Join us for a magical evening with music, dancing and memories that will
                        last a lifetime!
                    </p>
                    <div class="card-actions mt-4 justify-end">
                        <div class="badge badge-outline">May 31</div>
                        <div class="badge badge-primary">Register Now</div>
                    </div>
                </div>
            </a>
            <!-- Placeholder for future events (currently empty/disabled) -->
            <div class="card bg-base-100 opacity-50 shadow-sm">
                <div class="card-body flex min-h-64 items-center justify-center">
                    <p class="text-center text-lg">More events coming soon!</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer -->
    <footer class="footer footer-center bg-base-300 text-base-content mt-auto p-6">
        <div>
            <p>© 2025 STUCO - Student Council</p>
        </div>
    </footer>
</div>

<style>
    .bg {
        background-image: url('$lib/images/bg.png');
        background-color: var(--color-base-200);
        background-position: center;
    }
</style>
