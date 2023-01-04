---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
#classes: wide
toc: true
toc_sticky: true
title: Unity C# Developer/Programmer
#excerpt: "This post should display a **header with a solid background color**, if the theme supports it."
#header:
#  overlay_color: "#FFF"
#  overlay_filter: linear-gradient(rgba(255, 0, 0, 0.5), rgba(0, 255, 255, 0.5))

author_profile: true
---
<style type="text/css">
  .highlight {
    max-height: 600px;
    overflow-y: auto;
}
</style>
Welcome to my gamedev portfolio! Let me show you some of my work.

# Projects
This section showcases my Unity games/projects
## Bushador
Prototype of an isometric shooter based on one of my favorite games - Brigador.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/gameplay.webm" type="video/webm">
</video>

## Lucifer
Small 2D game made with 2 of my friends for a 72-hour-long video game development jam. Because the jams special limitation everything in the game can be hurt and destroyed.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/lucifer1.webm" type="video/webm">
</video>

## Retro shooter
Very early version of first person shooter prototype that I'm actively working on.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/shooting.webm" type="video/webm">
</video>

## Missile command
Small game about protecting a city from missile strikes. Developed in about 4 days.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/command.webm" type="video/webm">
</video>

# Features
This section showcases specific featrues/mechanics from the games above.

## Spring based weapon aiming
Weapon moves just like a spring responding to a change. 
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/spring.webm" type="video/webm">
</video>
Depending on its parameters the weapon can oscillate, overshoot, smoothly settles or anticipate movement.

## Destruction
Destructible environment and damaged object discoloration.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/destruction.webm" type="video/webm">
</video>

## AI
AI based on state machine responds to player's actions and moves AI agents across a navmesh. 
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/AI.webm" type="video/webm">
</video>
Here is the code defining AI states, conditions that change those states and dependency injections to each of the states. 
This component is attached to every AI agent. At runtime an AI manager "ticks" only one state machine per frame to save resources.

{% highlight C# linenos %}
public class EnemyStateMachine : MonoBehaviour
{
    [SerializeField] private CharacterController PlayerController;

    private StateMachine stateMachine;
    private TargetDetector targetDetector;
    private NavMeshAgent navMeshAgent;

    public void Awake()
    {
        targetDetector = GetComponent<TargetDetector>();
        navMeshAgent = GetComponent<NavMeshAgent>();
        var targetPicker = GetComponent<TargetPicker>();
        var enemyController = GetComponent<EnemyController>();
        var enemyInput = GetComponent<EnemyInput>();
        var messager = GetComponent<Messager>();

        stateMachine = new StateMachine();

        var idle = new Idle(messager);
        var chase = new Chase(PlayerController.transform, navMeshAgent, targetPicker);
        var attackStandStill = new AttackStandStill(PlayerController.transform, targetDetector, enemyController, navMeshAgent, enemyInput);
        var attackAdvance = new AttackAdvance(PlayerController.transform, targetDetector, targetPicker, enemyController, navMeshAgent, enemyInput);
        var attackRetreat = new AttackRetreat(PlayerController.transform, targetDetector, targetPicker, enemyController, navMeshAgent, enemyInput);

        void At(IState to, IState from, Func<bool> condition) => stateMachine.AddTransition(to, from, condition);

        At(idle, chase, TargetDetected());
        At(idle, attackAdvance, TargetContact());

        At(chase, attackAdvance, TargetContact());

        At(attackAdvance, chase, TargetObstructed());
        At(attackAdvance, attackStandStill, ReachedTheirDestination());
        At(attackAdvance, attackRetreat, TargetTooClose());

        At(attackRetreat, chase, TargetObstructed());
        At(attackRetreat, attackStandStill, Retreated());
        At(attackRetreat, attackAdvance, TargetTooFarAway());

        At(attackStandStill, chase, TargetObstructed());
        At(attackStandStill, attackAdvance, TargetTooFarAway());
        At(attackStandStill, attackRetreat, TargetTooClose());

        Func<bool> TargetDetected() => () => (targetDetector.TargetSighted && !targetDetector.TargetObstructed) || targetDetector.Alerted;
        Func<bool> TargetContact() => () => targetDetector.TargetSighted && !targetDetector.TargetObstructed;
        Func<bool> TargetObstructed() => () => targetDetector.TargetObstructed;
        Func<bool> TargetTooFarAway() => () => targetDetector.TooFarAway;
        Func<bool> TargetTooClose() => () => targetDetector.TooClose;
        Func<bool> ReachedTheirDestination() => () => !navMeshAgent.pathPending && navMeshAgent.remainingDistance <= navMeshAgent.stoppingDistance;
        Func<bool> Retreated() => () => (!navMeshAgent.pathPending && navMeshAgent.remainingDistance <= navMeshAgent.stoppingDistance) || targetDetector.TooFarAway;

        stateMachine.SetState(idle);
    }

    public void Tick()
    {
        targetDetector.Tick();
        stateMachine.Tick();
    }
}
{% endhighlight %}

## Occluded models silhouettes
Models silhouettes of occluded objects made with Universal Render Pipeline features.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/occluded_models.webm" type="video/webm">
</video>

## Intersection shader
Intersection shader lights up when close to an object.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/shield_bubble.webm" type="video/webm">
</video>
It was quite tricky to make it work with orthographic camera, because its depth is not easily available.

## Animation rigging
Animation Rigging package to make procedural motions on top of predefined animations.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/IK.webm" type="video/webm">
</video>

## Cinemachine camera toggle
Cinemachine smoothly blends between cameras and extends players vision.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/cinemachine.webm" type="video/webm">
</video>
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/camera_toggle.webm" type="video/webm">
</video>

## Movement
Acceleration and deceleration based movement model.
<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/movement.webm" type="video/webm">
</video>

## Vignette pulse with DOTween
Tweeining engine smoothly animates vignette on being hit.

![image-center](/assets/pulse.gif)

The vignette pulse is triggered by an event making its value go from 0 to `VignettePeakIntensity`. This component uses uses a single instance of a Tween object and updates it instead of spawning multiple effects. Also it cleans after itself before being destroyed. 

{% highlight C# linenos %}
public class VignettePulse : MonoBehaviour
{
    [SerializeField] private Volume GlobalVolume;
    [SerializeField] private Health PlayerHP;
    [SerializeField] private Color VignetteColor;
    [SerializeField][Range(0f, 1f)] private float VignettePeakIntensity = 0.25f;
    [SerializeField][Range(0f, 2f)] private float VignetteAttackTime = 0.1f;

    private Vignette vignette;
    private Tween vignettePulse;

    private void Start()
    {
        GlobalVolume.profile.TryGet<Vignette>(out vignette);

        if (vignette)
        {
            vignette.intensity.value = 0f;
            vignette.color.value = VignetteColor;

            vignettePulse = DOTween.To(() => vignette.intensity.value, x => vignette.intensity.value = x, VignettePeakIntensity, VignetteAttackTime)
                .SetEase(Ease.InOutCubic)
                .SetAutoKill(false)
                .Pause();
            vignettePulse.OnComplete(() => vignettePulse.SmoothRewind());
        }
        else
        {
            Debug.LogErrorFormat("{0} - Vigniette not found", gameObject.name);
        }

        if (PlayerHP)
        {
            PlayerHP.OnHpLost += HurtVignettePulse;
        }
        else
        {
            Debug.LogErrorFormat("{0} - PlayerHealth not found", gameObject.name);
        }
    }

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

    private void OnDestroy()
    {
        if (PlayerHP)
            PlayerHP.OnHpLost -= HurtVignettePulse;

        vignettePulse.Kill();
    }
}
{% endhighlight %}
