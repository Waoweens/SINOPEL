<script>

	import Auth from "$components/Auth.svelte";
	import { authStore } from "$stores/authStore";
	import { appname, appnameLong } from "$stores/static";

</script>

<h1>{appname}</h1>
<p>{appnameLong}</p>

<br />

<Auth/>
