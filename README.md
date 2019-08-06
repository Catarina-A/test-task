
* `gulp` - run dev-server and let magic happen, or
* `gulp build` - build project from sources


for dev usage example:

	{# variable example #}
	<h1>{{title}}</h1>

	
	{# partial example #}
	{% include "partials/_header.twig" %}

	{# mixin example #}
	{{mixins.icon('facebook')}}


	{# data usage example #}
		{% import "data/data.twig" as tests %}
		
		{% for test in tests.list %}
		<li>{{test.title}}</li>
		{% endfor %}
	{# end of example #}
