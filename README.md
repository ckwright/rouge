#Rouge
A personal modification of the Ghost Theme Day & Night by phantomus

##Changes from Day & Night
- Striped out Tags, quote icons, author info
- Logo/font changes
- A bit of cdd clean up

Day & Night - Simple Theme By Phantomus
Day & Night is a simple theme for Ghost publishing platform. The theme contains a concept of day vs. night color combination, which changes depending on the time of day for a local reader visiting the blog.

The "day" in this concept is from 6am to 6pm. When your readers visit the blog during that time, the default color theme is lighter in the background. When the night falls, the theme switches to darker background color, indicating night. Both color themes are designed to be easy on the reader's eyes. In addition, the color themes are interchangable regardless of time and may be changed by the reader at anytime by clicking the toggle button.

##Features
The theme contains the following features:
-Responsive Design powered by Zurb's Foundation framework.
-About and contacts page provided by default, just add it as static page through Ghost dashboard.
-Google Analytics and Disqus commenting integration.
-Menu
-The menu for this theme is located to the right of the reading area for large and medium screens, and to the top for smaller screens (smartphones). The following may be considered as section of the menu:

Navigation - navigation menu customizable by making modifications to partials/menu.hbs file.
Color theme indicator area - this section contains an indicator for current time. The icon (sun or half moon) is also a button to change the color combinations on demand.
Pagination - the pagination section displays current and total pages, and links to change between the pages as well as go back to post list if the reader is located within the post content.
Name of the blog, blog icon - displays the name of the blog and blog icon. The name of the blog in this context is truncated if greater than 40 characters. While this is currently a limitation, it was designed to fit nicely within the theme style.
Note: this theme does not display blog description or blog cover image. Such decision was done to provide a simpler theme with concentration on text content.

##Navigation Menu
The navigation menu may be modified to include any links required by the blog owner. To modify the menu open and edit partials/menu.hbs file to include / remove li elements. The default content of this file is the following:

<li><a href="/" class="dn-ajx-link">Home</a></li>
<li><a href="/about-me" class="dn-ajx-link">About</a></li>
<li><a href="/contacts" class="dn-ajx-link">Contacts</a></li>
Notice the class is set to dn-ajx-link. You should set the same class to indicate that this link should be loaded and rendered as blog static page, rather than navigating out of the context of your blog.

If you would like to use the default setup with About and Contacts pages, please make sure you have static pages setup with URLS of about-me and contacts.

Please note: to display static pages correct, the links must point to actual page URL. By default, Ghost sets the URL of newly created page to title, this could be changed by modifying URL setting directly.

##Google Analytics and Disqus
The theme has an integration with Google Analytics and Disqus commenting systems. Both settings are controlled by entering the appropriate values for javascript variables located inside default.hbs file.

For google analytics, change gAccount variable to contain the tracking code provided by Google for your domain. Ex.:

var gAccount = "UA-NNNNNN45-2";

Disqus commenting system works based on the short name of your discussion / commenting board. Once setup, you should enter the short name as a value of disqusShortName variable. Ex.:

var disqusShortName = "shortnamehere";

Once the disqus short name was setup, you would see disqus commenting load for every post of your blog. Disqus integration was purposely removed for static blog pages.
