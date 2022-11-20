---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
# classes: wide
toc: true
toc_sticky: true

#excerpt: "This post should display a **header with a solid background color**, if the theme supports it."
#header:
#  overlay_color: "#FFF"
#  overlay_filter: linear-gradient(rgba(255, 0, 0, 0.5), rgba(0, 255, 255, 0.5))


author_profile: true
author:
  name     : "Your Name"
  avatar   : "/assets/2.png"
  bio      : "My awesome biography constrained to a sentence or two goes here."
  location : "Somewhere, USA"
---

{% include figure image_path="/assets/2.png" alt="this is a placeholder image" caption="This is a figure caption." %}

<video autoplay="autoplay"  loop="loop" width="100%" height="auto" controls>
  <source src="/assets/Video.webm" type="video/webm">
</video>

# Thing 1
![image-center](/assets/test.png){: width="150" }
![image-center](/assets/2.png)

<iframe width="560" height="315" src="https://www.youtube.com/embed/AcAjSNDYw5g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{% include video id="AcAjSNDYw5g" provider="youtube" %}

<script src="https://gist.github.com/redmorr/878df0c3637ba6167c024c211465ea58.js"></script>

```
    private void HurtVignettePulse()
    {
        if (vignettePulse.IsPlaying())
        {
            if (vignettePulse.IsBackwards())
            {
                vignettePulse.Flip();
            }
        }
        else
        {
            vignettePulse.Restart();
        }
    }
```