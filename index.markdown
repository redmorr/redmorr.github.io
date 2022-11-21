---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
#classes: wide
toc: true
toc_sticky: true
title: Portfolio
#excerpt: "This post should display a **header with a solid background color**, if the theme supports it."
#header:
#  overlay_color: "#FFF"
#  overlay_filter: linear-gradient(rgba(255, 0, 0, 0.5), rgba(0, 255, 255, 0.5))


author_profile: true
author:
  name     : "Your Name"
  avatar   : "/assets/IK.gif"
  bio      : "My awesome biography constrained to a sentence or two goes here."
  location : "Somewhere, USA"
---
Welcome to my portfolio! Let me show you some features from an isometic shooter prototype I'm currently working on.

# IK
![image-center](/assets/IK.gif)

# Destruction
![image-center](/assets/destruction.gif)

# Camera toggle
![image-center](/assets/cinemachine.gif)

![image-center](/assets/camera_toggle.gif)

# Intersection shader
![image-center](/assets/shield_bubble.gif)

# Occluded models silluethes
![image-center](/assets/occluded_models.gif)

# Movement
![image-center](/assets/movement.gif)

# AI
<video loop="loop" width="100%" height="auto" controls>
  <source src="/assets/AI.webm" type="video/webm">
</video>

<style type="text/css">
  .highlight {
    max-height: 700px;
    overflow-y: auto;
}
</style>

{% highlight C# linenos %}
Func<bool> TargetDetected() => () => (targetDetector.TargetSighted && !targetDetector.TargetObstructed) || targetDetector.Alerted;
Func<bool> TargetContact() => () => targetDetector.TargetSighted && !targetDetector.TargetObstructed;
Func<bool> TargetObstructed() => () => targetDetector.TargetObstructed;
Func<bool> TargetTooFarAway() => () => targetDetector.TooFarAway;
Func<bool> TargetTooClose() => () => targetDetector.TooClose;
Func<bool> ReachedTheirDestination() => () => !navMeshAgent.pathPending && navMeshAgent.remainingDistance <= navMeshAgent.stoppingDistance;
Func<bool> Retreated() => () => (!navMeshAgent.pathPending && navMeshAgent.remainingDistance <= navMeshAgent.stoppingDistance) || targetDetector.TooFarAway;
{% endhighlight %}