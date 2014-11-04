Ext.data.JsonP.views({"title":"Views","guide":"<h1>Using Views in your Applications</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/views-section-1'>Using Existing Components</a></li>\n<li><a href='#!/guide/views-section-2'>A Real World Example</a></li>\n<li><a href='#!/guide/views-section-3'>Custom Configurations and Behavior</a></li>\n<li><a href='#!/guide/views-section-4'>Advanced Configurations</a></li>\n<li><a href='#!/guide/views-section-5'>Usage in MVC</a></li>\n</ol>\n</div>\n\n<p>From the user's point of view, your application is just a collection of views. Although much of the value of the app is in the Models and Controllers, the Views are what the user interacts with directly. In this guide we're going to look at how to create the views that build your application.</p>\n\n<h2 id='views-section-1'>Using Existing Components</h2>\n\n<p>The easiest way to create a view is to just use <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> with an existing Component. For example, if we wanted to create a simple Panel with some HTML inside we can just do this:</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>', {\n    html: 'Welcome to my app',\n    fullscreen: true\n});\n</code></pre>\n\n<p>This simply creates a Panel with some html and makes it fill the screen. You can create any of our built-in components this way but best practice is to create a subclass with your specializations and then create that. Thankfully that's simple too:</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.Welcome', {\n    extend: '<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>',\n\n    config: {\n        html: 'Welcome to my app',\n        fullscreen: true\n    }\n});\n\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.Welcome');\n</code></pre>\n\n<p>The outcome is the same, but now we have a brand new component that we can create any number of times. This is the pattern we'll normally want to follow when building our app - create a subclass of an existing component then create an instance of it later. Let's take a look through what we just changed:</p>\n\n<ul>\n<li><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a> allows us to create a new class, extending an existing one (<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a> in this case)</li>\n<li>We followed the MyApp.view.MyView convention for our new view class. You can name it whatever you like but we suggest sticking with convention</li>\n<li>We defined config for the new class inside a config object</li>\n</ul>\n\n\n<p>Any of the config options available on <a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a> can now be specified in either our new class's config block or when we come to create our instance. When defining a subclass be sure to use the config object, when creating just pass in an object.</p>\n\n<p>For example, here's the same code again but with additional configuration passed in with our <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> call:</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.Welcome', {\n    extend: '<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>',\n\n    config: {\n        html: 'Welcome to my app',\n        fullscreen: true\n    }\n});\n\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.Welcome', {\n    styleHtmlContent: true\n});\n</code></pre>\n\n<h2 id='views-section-2'>A Real World Example</h2>\n\n<p>This is one of the view classes from our Twitter app:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Twitter.view.SearchBar', {\n    extend: '<a href=\"#!/api/Ext.Toolbar\" rel=\"Ext.Toolbar\" class=\"docClass\">Ext.Toolbar</a>',\n    xtype : 'searchbar',\n    requires: ['<a href=\"#!/api/Ext.field.Search\" rel=\"Ext.field.Search\" class=\"docClass\">Ext.field.Search</a>'],\n\n    config: {\n        ui: 'searchbar',\n        layout: 'vbox',\n        cls: 'big',\n\n        items: [\n            {\n                xtype: 'title',\n                title: 'Twitter Search'\n            },\n            {\n                xtype: 'searchfield',\n                placeHolder: 'Search...'\n            }\n        ]\n    }\n});\n</code></pre>\n\n<p>This follows the same pattern as before - we've created a new class called Twitter.view.SearchBar, which extends the framework's <a href=\"#!/api/Ext.Toolbar\" rel=\"Ext.Toolbar\" class=\"docClass\">Ext.Toolbar</a> class. We also passed in some configuration options, including a layout and an <a href=\"#!/api/Ext.Container-cfg-items\" rel=\"Ext.Container-cfg-items\" class=\"docClass\">items</a> array.</p>\n\n<p>We've used a couple of new options this time:</p>\n\n<ul>\n<li><strong>requires</strong> - because we're using a searchfield in our items array, we tell our new view to require the <a href=\"#!/api/Ext.field.Search\" rel=\"Ext.field.Search\" class=\"docClass\">Ext.field.Search</a> class. At the moment the dynamic loading system does not recognize classes specified by xtype so we need to define the dependency manually</li>\n<li><strong>xtype</strong> - gives our new class its own xtype, allowing us to easily create it in a configuration object (just like we did with searchfield above)</li>\n</ul>\n\n\n<p>This allows us to create instances of our new view class in a couple of ways:</p>\n\n<pre><code>//creates a standalone instance\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Twitter.view.SearchBar');\n\n//alternatively, use xtype to create our new class inside a Panel\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>', {\n    html: 'Welcome to my app',\n\n    items: [\n        {\n            xtype: 'searchbar',\n            docked: 'top'\n        }\n    ]\n});\n</code></pre>\n\n<h2 id='views-section-3'>Custom Configurations and Behavior</h2>\n\n<p>Sencha Touch 2 makes extensive use of the configuration system to provide predictable APIs and keep the code clean and easily testable. We strongly suggest you do the same in your own classes.</p>\n\n<p>Let's say you want to create a image viewer that pops up information about the image when you tap on it. Our aim is to create a reusable view that can be configured with the image url, title and description, and displays the title and description when you tap on it.</p>\n\n<p>Most of the work around displaying images is taken care of for us by the <a href=\"#!/api/Ext.Img\" rel=\"Ext.Img\" class=\"docClass\">Ext.Img</a> component, so we'll subclass that:</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.Image', {\n    extend: '<a href=\"#!/api/Ext.Img\" rel=\"Ext.Img\" class=\"docClass\">Ext.Img</a>',\n\n    config: {\n        title: null,\n        description: null\n    },\n\n    //sets up our tap event listener\n    initialize: function() {\n        this.callParent(arguments);\n\n        this.element.on('tap', this.onTap, this);\n    },\n\n    //this is called whenever you tap on the image\n    onTap: function() {\n        <a href=\"#!/api/Ext.Msg-method-alert\" rel=\"Ext.Msg-method-alert\" class=\"docClass\">Ext.Msg.alert</a>(this.getTitle(), this.getDescription());\n    }\n});\n\n//creates a full screen tappable image\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.Image', {\n    title: 'Orion Nebula',\n    description: 'The Orion Nebula is rather pretty',\n\n    src: 'http://apod.nasa.gov/apod/image/1202/oriondeep_andreo_960.jpg',\n    fullscreen: true\n});\n</code></pre>\n\n<p>We're adding two more configurations to our class - title and description - which both start off as null. When we create an instance of our new class we pass the title and description configs in just like any other configuration.</p>\n\n<p>Our new behavior happens in the initialize and onTap functions. The initialize function is called whenever any component is instantiated, so is a great place to set up behavior like event listeners. The first thing we do is use this.callParent(arguments) to make sure the superclass' initialize function is called. <strong>This is very important</strong>, omitting this line may cause your components not to behave correctly.</p>\n\n<p>After callParent, we add a tap listener to the component's element, which will call our onTap function whenever the element is tapped. All components in Sencha Touch 2 have an element property that you can use in this way to listen to events on the DOM objects, add or remove styling, or do anything else you'd normally do to an <a href=\"#!/api/Ext.dom.Element\" rel=\"Ext.dom.Element\" class=\"docClass\">Ext.dom.Element</a>.</p>\n\n<p>The onTap function itself is pretty simple, it just uses <a href=\"#!/api/Ext.Msg-method-alert\" rel=\"Ext.Msg-method-alert\" class=\"docClass\">Ext.Msg.alert</a> to quickly pop up some information about the image. Note that our two new configs - title and description - both receive generated getter functions (getTitle and getDescription respectively), as well as generated setter functions (setTitle and setDescription).</p>\n\n<h2 id='views-section-4'>Advanced Configurations</h2>\n\n<p>When you create a new configuration option to a class, the getter and setter functions are generated for you so a config called 'border' is automatically given getBorder and setBorder functions:</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.MyView', {\n    extend: '<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>',\n\n    config: {\n        border: 10\n    }\n});\n\nvar view = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.MyView');\n\nalert(view.getBorder()); //alerts 10\n\nview.setBorder(15);\nalert(view.getBorder()); //now alerts 15\n</code></pre>\n\n<p>The getter and setter aren't the only functions that are generated, there are a couple more that make life as a component author much simpler - applyBorder and updateBorder:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.MyView', {\n    extend: '<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>',\n\n    config: {\n        border: 0\n    },\n\n    applyBorder: function(value) {\n        return value + \"px solid red\";\n    },\n\n    updateBorder: function(newValue, oldValue) {\n        this.element.setStyle('border', newValue);\n    }\n});\n</code></pre>\n\n<p>Our applyBorder function is called internally any time the border configuration is set or changed, including when the component is first instantiated. This is the best place to put any code that transforms an input value. In this case we're going to take the border width passed in an return a CSS border specification string.</p>\n\n<p>This means that when we set the view's border config to 10, our applyBorder function will make sure that we transform that value to '10px solid red'. The apply function is totally optional but note that you must <strong>return</strong> a value from it or nothing will happen.</p>\n\n<p>The updateBorder function is called <em>after</em> the applyBorder function has had a chance to transform the value, and is usually used to modify the DOM, send AJAX requests or perform any other kind of processing. In our case we're just getting the view's element and updating the border style using <a href=\"#!/api/Ext.dom.Element-method-setStyle\" rel=\"Ext.dom.Element-method-setStyle\" class=\"docClass\">setStyle</a>. This means that every time setBorder is called our DOM will immediately be updated to reflect the new style.</p>\n\n<p>Here's an example of the new view in action. Click the Code Editor button to see the source - basically we just create an instance of the new view and dock a <a href=\"#!/api/Ext.field.Spinner\" rel=\"Ext.field.Spinner\" class=\"docClass\">spinner field</a> at the top, allowing us to change the border width by tapping the spinner buttons. We hook into the Spinner's <a href=\"#!/api/Ext.field.Spinner-event-spin\" rel=\"Ext.field.Spinner-event-spin\" class=\"docClass\">spin</a> event and call our view's new setBorder function from there:</p>\n\n<pre class='inline-example preview'><code>//as before\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.MyView', {\n    extend: '<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>',\n\n    config: {\n        border: 0\n    },\n\n    applyBorder: function(value) {\n        return value + \"px solid red\";\n    },\n\n    updateBorder: function(newValue, oldValue) {\n        this.element.setStyle('border', newValue);\n    }\n});\n\n//create an instance of MyView with a spinner field that updates the border config\nvar view = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.MyView', {\n    border: 5,\n    fullscreen: true,\n    styleHtmlContent: true,\n    html: 'Tap the spinner to change the border config option',\n    items: {\n        xtype: 'spinnerfield',\n        label: 'Border size',\n        docked: 'top',\n        value: 5,\n        minValue: 0,\n        maxValue: 100,\n        increment: 1,\n        listeners: {\n            spin: function(spinner, value) {\n                view.setBorder(value);\n            }\n        }\n    }\n});\n</code></pre>\n\n<h2 id='views-section-5'>Usage in MVC</h2>\n\n<p>We recommend that most Sencha Touch applications should follow the <a href=\"#!/guide/apps_intro\">MVC conventions</a> so that your code remains well organized and reusable. As the \"V\" in MVC, views also fit into this structure. The conventions around views in MVC are very simple and follow directly from the naming convention we used above.</p>\n\n<p>Our <em>MyApp.view.MyView</em> class should be defined inside a file called <em>app/view/MyView.js</em> - this allows the Application to find and load it automatically. If you're not already familiar with the file structure for MVC-based Sencha Touch apps, it's pretty simple - an app is just an html file, an <em>app.js</em> and a collection of models, views and controllers inside the <em>app/model</em>, <em>app/view</em> and <em>app/controller</em> directories:</p>\n\n<pre><code>index.html\napp.js\napp/\n    controller/\n    model/\n    view/\n        MyView.js\n</code></pre>\n\n<p>You can create as many views as you want and organize them inside your <em>app/view</em> directory. By specifying your application's views inside your app.js they'll be loaded automatically:</p>\n\n<pre><code>//contents of app.js\nExt.application({\n    name: 'MyApp',\n    views: ['MyView'],\n\n    launch: function() {\n        <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.MyView');\n    }\n});\n</code></pre>\n\n<p>By following the simple view naming conventions we can easily load and create instances of our view classes inside our application. The example above does exactly that - loads the MyView class and creates an instance of it in the application launch function. To find out more about writing MVC apps in Sencha Touch please see the <a href=\"#!/guide/apps_intro\">intro to apps guide</a>.</p>\n"});