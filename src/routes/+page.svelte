<script>

	import Auth from "$components/elements/Auth.svelte";
	import { authStore } from "$stores/authStore";
	import { appname, appnameLong } from "$stores/static";

</script>

<!--
	TODO: Use Semantic HTML for all pages
	currently, <div>s are used everywhere
-->

<h1>{appname}</h1>
<p>{appnameLong}</p>

<br />

<Auth/>
