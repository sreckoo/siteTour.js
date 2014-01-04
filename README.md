# siteTour.js

> Providing site tour by highlighting important page elements.


## How to use
siteTour.js can be added to your site in three simple steps:

**1)** Include latest jQuery library, `siteTour.js` and `sitetour.css` in your page.

**2)** Add Markup

`<div step-no="1" data-text="First Step">
    <h3>First step</h3>
        Powder pudding donut apple 
        pie powder chocolate.
</div>
<div step-no="2" data-position="right" data-text="<h3>Second step</h3>">
    <h3>Second step</h3>
        Gummies ice cream chocolate cake cheesecake 
        cotton candy fruitcake cheesecake cotton candy. 
</div>`

**3)** Hook up the siteTour

`<script type="text/javascript">
        $(function () {
            $("#trigger").siteTour();
        });
</script>`



## License
> Copyright (C) 2014 Srecko Podvinski (srecko_podvinski@yahoo.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
