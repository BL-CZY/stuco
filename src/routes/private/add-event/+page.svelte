<script lang="ts">
    import type { EventSignupForm } from '$lib/events';

    let form: EventSignupForm = $state({ booleans: [], elements: [] });
</script>

{@debug form}

<form action="?/new-event">
    <input type="text" name="eventName" id="eventName" placeholder="Event Name" required />
    <input type="file" name="flyer" id="flyer" accept="image/*" />
</form>
