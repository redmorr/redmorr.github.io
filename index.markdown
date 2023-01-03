---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
#classes: wide
toc: true
toc_sticky: true
title: Przemysław Szurek - Unity Game Developer Portfolio
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
Welcome to my gamedev portfolio! Let me show you some features from two Unity games I've been working on. There are gifs, short videos and code examples presented.

# Game 1 - [Bushador](https://redmorr.itch.io/bushador) (Unity C#)
This is an isometric shooter prototype I'm currently working on by myself, although I might bring some more people to the project in the future, once I nail down the gameplay.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/gameplay.webm" type="video/webm">
</video>

## Destruction
The game is going to feature destructible environment. Damaged elements shift their color towards red to signal how close to being destroyed they are.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/destruction.webm" type="video/webm">
</video>

## Camera toggle
I'm using cinemachine to blend between cameras and make possible to look further away.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/cinemachine.webm" type="video/webm">
</video>

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/camera_toggle.webm" type="video/webm">
</video>

## Animation rigging
I'm using Animation Rigging Unity package to make procedural motions on top of predefined animations.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/IK.webm" type="video/webm">
</video>

## Vignette pulse
I'm using DOTween to make a smooth vignette pulse on being hit.

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

## AI
AI based on state machine responds to player's actions and moves AI agents across a navmesh. 
Right now the destination is picked semi-random to make the AI seem less predictable.

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

I'm planning to implement A* Pathfinding Project soon. 
Also I want to implement influence maps in the future, if there is a need for them (or just for fun). 

## Intersection shader
This is an intersection shader, which makes objects light up when close to another object.
It was quite tricky to make it work with orthographic camera, because its depth is not easily available.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/shield_bubble.webm" type="video/webm">
</video>

## Occluded models silhouettes
I'm using URP render features to show models silhouettes of occluded objects.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/occluded_models.webm" type="video/webm">
</video>

## Movement
Current movement model uses acceleration and deceleration to make it feel more smooth and interesting.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/movement.webm" type="video/webm">
</video>

# Game 2 - [Lucifer](https://redmorr.itch.io/lucifer) (Unity C#)
Together with 2 of my friends, I made this game for a 72-hour-long video game development jam - Mini Jam. It takes place every 2 weeks and features a limitation revealed at the start. This time the limitation was: `Everything Can Die`. On this project I was responsible for programming and SFX.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/lucifer1.webm" type="video/webm">
</video>

The player can get hurt by being hit in the health bar, and the ammo bar acts as a shield consuming ammo on being hit. It prevents damage as as long as it's not empty, incentivizing players to time their reloads well.

<video loop="loop" width="100%" height="auto" autoplay loop muted controls>
  <source src="/assets/lucifer2.webm" type="video/webm">
</video>

The environment, which is made out tiles, is also destructible.

![image-center](/assets/lucifer3.gif)