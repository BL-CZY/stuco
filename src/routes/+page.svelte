<script>
    // You can add any necessary imports or data handling here
</script>

<div class="bg-base-200 flex min-h-screen flex-col">
    <!-- Hero section with big title -->
    <div class="hero bg-primary text-primary-content py-16">
        <div class="hero-content text-center">
            <div>
                <h1 class="text-5xl font-bold tracking-wider md:text-7xl">STUCO</h1>
                <p class="py-4 text-xl">Student Council Events & Activities</p>
            </div>
        </div>
    </div>

    <!-- Events section with cards -->
    <div class="container mx-auto px-4 py-12">
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
