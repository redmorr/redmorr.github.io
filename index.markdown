---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
#classes: wide
toc: true
toc_sticky: true
title: Game Developer Portfolio
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
Welcome to my gamedev portfolio! Let me present you features from two games I've been working on. There are gifs, short videos and code examples. You can find games builds on my itch.io profile. More examples are coming soon!

# Game 1 - [Bushador](https://redmorr.itch.io/bushador)
This is an isometic shooter prototype I'm currently working on by myself, although I might bring some more people to the projet in the future once it's more fleshed out.

## Animation Rigging
I'm using Animation Rigging Unity package to make procedural motions on top of predefined animations.

![image-center](/assets/IK.gif)

## Destruction
The game is going to feature destructable enviornment. Enviornment elements shift their color towards red to signal how many hit point they have left.

![image-center](/assets/destruction.gif)

## Camera toggle
I'm using cinemachine to blend between cameras and make possible to look further into the level.

![image-center](/assets/cinemachine.gif)

![image-center](/assets/camera_toggle.gif)

## Vignette pulse
I'm using dotween to pulse screen on damage

![image-center](/assets/pulse.gif)

{% highlight C# linenos %}
public class VignettePulse : MonoBehaviour
{
    [SerializeField] private Volume GlobalVolume;
    [SerializeField] private Health playerHP;
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

            // Cannot easly change values from this premade tween, it works, but maybe I should make this tween at runtime
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

        if (playerHP)
        {
            playerHP.OnHpLost += HurtVignettePulse;
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
        if (playerHP)
            playerHP.OnHpLost -= HurtVignettePulse;

        vignettePulse.Kill();
    }
}
{% endhighlight %}

## Intersection shader
This is an intersection shader, which makes objects light up when close to another object. 
It was quite tricky to make it work with orthographic camera, because its depth is not easly available.
Luckily I found a solution: [solution]

![image-center](/assets/shield_bubble.gif)

## Occluded models silluethes
I'm using URP's render features to show silluethes of occluded objects.

![image-center](/assets/occluded_models.gif)

## Movement
Current movement model uses acceleration and deaccelereation to make it feel more smooth and interesting.

![image-center](/assets/movement.gif)

## AI
AI based on state machine responds actively responds to player's actions and moves AI agents on navmesh. 
Right now the destination is picked semi-random to make AI less predictable.

<video loop="loop" width="100%" height="auto" controls>
  <source src="/assets/AI.webm" type="video/webm">
</video>

Here is the code defining AI states, conditions that change those states and dependency injections to each of the states. 
This component is attached to every AI agent. At runtime a manager ticks only one AI agent state machine per frame to save resources.

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
Also I might implement influence maps in the future, if there is a need for them (or just for fun :)). 

# Game 2 - [Lucifer](https://redmorr.itch.io/lucifer)
Together with 2 of my friends, I made this game for a 72-hour-long video game development jam - Mini Jam. The jam takes place every 2 weeks and features a limitation revealed as the start. This time the limitation was: `Everything Can Die`. So to abide that rule I made level and everyting in the game destructable. The player can get hurt by being hit in the health bar, and the ammo bar acts as a shield consuming ammo on being hit. It prevents damage as as long as it's not empty making sure players time their reloads well. On this project I was responsible for programming and SFX.

![image-center](/assets/lucifer1.gif)

![image-center](/assets/lucifer2.gif)

![image-center](/assets/lucifer3.gif)