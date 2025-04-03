<script lang="ts">
    import { onMount } from 'svelte';

    const { data } = $props();
    const { supabase } = $derived(data);

    // State variables
    let password = $state('');
    let confirmPassword = $state('');
    let loading = $state(false);
    let error: string | null = $state(null);
    let success = $state(false);
    let hashParams = $state(
        null as {
            accessToken: string;
            expiresAt: string | null;
            expiresIn: string | null;
            refreshToken: string;
            tokenType: string | null;
            type: string;
        } | null
    );

    // Parse hash parameters from URL
    onMount(() => {
        // Remove the leading '#' and parse parameters
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        let accessToken = params.get('access_token');
        let refreshToken = params.get('refresh_token');
        let type = params.get('type');

        // Validate that this is an invite
        if (type !== 'invite' || !accessToken || !refreshToken) {
            error = 'Invalid or missing invitation parameters';
            return;
        }

        // Extract all parameters
        hashParams = {
            accessToken,
            expiresAt: params.get('expires_at'),
            expiresIn: params.get('expires_in'),
            refreshToken,
            tokenType: params.get('token_type'),
            type
        };
    });

    // Handle form submission
    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        // Reset states
        error = null;
        loading = true;

        // Validate passwords
        if (!password || password.length < 6) {
            error = 'Password must be at least 6 characters';
            loading = false;
            return;
        }

        if (password !== confirmPassword) {
            error = 'Passwords do not match';
            loading = false;
            return;
        }

        if (!hashParams) {
            error = 'No valid invitation found';
            loading = false;
            return;
        }

        supabase.auth.setSession({
            access_token: hashParams.accessToken,
            refresh_token: hashParams.refreshToken
        });

        try {
            // Complete user signup using the invite token and new password
            const { error: signupError } = await supabase.auth.updateUser({
                password: password
            });

            if (signupError) throw signupError;

            // User created successfully
            success = true;

            // Clear the URL hash for security
            window.location.hash = '';

            // Optional: Save session data to local storage
            localStorage.setItem(
                'supabase.auth.token',
                JSON.stringify({
                    access_token: hashParams.accessToken,
                    refresh_token: hashParams.refreshToken,
                    expires_at: hashParams.expiresAt
                })
            );
        } catch (err) {
            console.error('Error completing signup:', err);
            error = 'Failed to create account. Please try again.';
        } finally {
            loading = false;
        }
    }
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center p-4">
    <div class="card bg-base-100 w-full max-w-md shadow-xl">
        <div class="card-body">
            {#if error}
                <div class="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <span>{error}</span>
                </div>
            {/if}

            {#if success}
                <div class="text-center">
                    <h2 class="text-success mb-4 text-2xl font-bold">
                        Account Created Successfully!
                    </h2>
                    <p class="mb-6">Your account has been set up and you're now logged in.</p>
                    <a href="/private" class="btn btn-success btn-block">Continue to Admin</a>
                </div>
            {:else if hashParams && hashParams && hashParams.accessToken}
                <h2 class="card-title mb-2 text-center text-2xl font-bold">
                    Complete Your Account Setup
                </h2>
                <p class="mb-6 text-center">Please create a password to activate your account.</p>

                <form onsubmit={handleSubmit}>
                    <div class="form-control mb-4 w-full">
                        <label class="label" for="password">
                            <span class="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            bind:value={password}
                            placeholder="Enter a secure password"
                            class="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div class="form-control mb-6 w-full">
                        <label class="label" for="confirm-password">
                            <span class="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            bind:value={confirmPassword}
                            placeholder="Confirm your password"
                            class="input input-bordered w-full"
                            required
                        />
                    </div>

                    <button type="submit" class="btn btn-primary btn-block" disabled={loading}>
                        {#if loading}
                            <span class="loading loading-spinner loading-sm"></span>
                            Setting up your account...
                        {:else}
                            Create Account
                        {/if}
                    </button>
                </form>
            {:else}
                <div class="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <span>No valid invitation found. Please request a new invitation.</span>
                </div>
            {/if}
        </div>
    </div>
</div>
