'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Divider,
  Accordion,
AccordionSummary,
AccordionDetails,
} from '@mui/material';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import type { ProjectManifest } from "@/Types/projectManifest";
import type { ProjectCmpProps } from '../project';
import { data } from './data';
import PATHS from '@/Config/paths';
import DrawioEmbed from '@/Themes/Default/Components/DrawioEmbed/DrawioEmbed';
import { CardTabsCmp } from '@/Themes/Default/Components/CardTabs';
import { useAppTheme, useComponents } from '@/Themes/ThemeProvider';
import { gradientH1Styles } from '@/Themes/Default/themeUtils';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const { MediaCmp, ParentSizeObserverCmp: ParentSizeObserver, ImageMultiCompareCmp, CodeBlockCmp, ProjectOverviewCmp, IconCmp, MarkdownRendererCmp } = useComponents();
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={gradientH1Styles}>
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== MAIN FEATURES ==================== */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Main Features
        </Typography>
      
        <CardTabsCmp>
<CardTabsCmp.Item label="Game Objects">
  <MarkdownRendererCmp
    markdown={`
A GameObject is the basic entity that exists in a scene.  
It represents something in the world (player, enemy, UI element, camera, trigger, etc.), but it doesn't do anything by itself.  
A GameObject only provides identity, transform, hierarchy, and lifecycle — behavior is added by attaching components.

#### What a GameObject Stores
- A name and unique ID
- Local + world transform (position, rotation, scale)
- Parent/child relationship (scene graph)
- A collection of components
- Runtime state: enabled, disabled, destroyed

#### Creating a GameObject
\`\`\`cpp
auto* player = scene->CreateObject("Player");
\`\`\`

#### Adding Behavior (via Components)
\`\`\`cpp
player->AddComponent<PlayerScriptComponent>();   // movement, input, etc.
\`\`\`

The GameObject itself does not define gameplay logic — it acts as the container that components attach to.  
This allows the same GameObject system to represent anything: characters, UI widgets, physics bodies, triggers, cameras, etc.
`}
  />
</CardTabsCmp.Item>

<CardTabsCmp.Item label="Components">
  <MarkdownRendererCmp
    markdown={`
Components are how behavior is added to a \`GameObject\`.  
Each component handles one specific responsibility (health, score, movement, rendering, UI, etc.), and the final behavior emerges by combining multiple components on the same object.

The engine calls each component's lifecycle methods automatically (\`Start\`, \`Update\`, \`FixedUpdate\`, etc.), and components can communicate with each other through events or by retrieving other components from the same object.

#### Example: Building a Player Object
In the game code, a player is not created as one big class.  
Instead, it is assembled from multiple components, each handling a single concern:

\`\`\`cpp
auto* player = scene->CreateObject("Player");

player->AddComponent<JRE::SpriteRendererComponent>();
player->AddComponent<JRE::SpriteAnimatorComponent>();
player->AddComponent<JRE::Box2DColliderComponent>();

auto* health = player->AddComponent<HealthComponent>();
health->SetMaxHealth(4);
health->SetHealth(4);

player->AddComponent<ScoreComponent>();
player->AddComponent<PlayerScriptComponent>();
player->AddComponent<PlayerControllerComponent>(actionMapIndex);
\`\`\`

#### How Components Fit Together
- Each component handles one isolated responsibility (health, score, movement, UI, etc.)
- A GameObject becomes a gameplay entity by combining multiple components
- Components can talk to each other through events or by fetching other components on the same object

#### Core Concepts
- Add behavior with \`AddComponent<T>()\`
- Look up other components with \`GetComponent<T>()\`
- Components may expose events or listen to events from others
- No inheritance chains — gameplay is built by composition
`}
  />
</CardTabsCmp.Item>

<CardTabsCmp.Item label="Events">
  <MarkdownRendererCmp
    markdown={`
The engine uses a localized event/observer system.  
Events are not dispatched through a global bus — instead, individual components expose their own \`Event\` objects, and other components subscribe to them.

Each event type defines:
- a unique \`EventID\`
- a typed argument struct (derived from \`EventArgs\`)

#### Declaring an Event
\`\`\`cpp
JRE::Event OnPlayerLostLive{};
\`\`\`

#### Broadcasting an Event
\`\`\`cpp
EventInfo e = CreateEvent<Events::PlayerLostLive>(m_pHealthCmp->GetHealth());
OnPlayerLostLive.Notify(e);
\`\`\`

#### Subscribing to an Event
A listener must inherit from \`IObserver\`:

\`\`\`cpp
class PlayerScriptComponent final
    : public ComponentBase
    , public IObserver
{
    void Start() override
    {
        m_pHealthCmp->OnHealthChanged.AddObserver(this);
    }

    void OnNotify(EventInfo& event) override
    {
        switch (event.GetID())
        {
        case Events::PlayerLostLive::ID:
            HandleLifeLost();
            break;
        }
    }
};
\`\`\`

#### Usage Pattern
- A component **owns** an event (e.g. \`OnHealthChanged\`)
- Other components **register** as observers
- When something important happens, the event **notifies** all observers
- The observer handles it in \`OnNotify(EventInfo&)\` using a switch on \`EventID\`

This keeps gameplay systems loosely coupled: health, score, UI, audio, and effects can all react without direct references to each other.
`}
  />
</CardTabsCmp.Item>

<CardTabsCmp.Item label="Service Locator">
  <MarkdownRendererCmp
    markdown={`
The service locator provides global access to core engine systems such as audio, physics, and resource management.  
Each service is stored as a \`std::unique_ptr\` inside the locator, which means the locator owns the lifetime of the service.

#### Registering or Replacing a Service
A service can be registered at startup or replaced later at runtime:

\`\`\`cpp
ServiceLocator::RegisterSoundSystem(std::make_unique<SDLSoundSystem>());
ServiceLocator::RegisterSoundSystem(std::make_unique<FMODSoundSystem>()); // hot-swap
\`\`\`

If \`nullptr\` is passed, the locator installs a built-in *Null Service* instead of leaving the system uninitialized:

\`\`\`cpp
ServiceLocator::RegisterSoundSystem(nullptr); // falls back to NullSoundSystem
\`\`\`

#### Retrieving a Service
\`\`\`cpp
auto& sound = ServiceLocator::GetSoundSystem();
sound.Play("explosion.wav");
\`\`\`

Because services are referenced through interfaces (e.g. \`ISoundSystem\`), gameplay code does not depend on concrete implementations.  
This allows platform-specific systems, editor overrides, unit-testing stubs, and runtime swapping without changing user code.
`}
  />
</CardTabsCmp.Item>

<CardTabsCmp.Item label="Input Handling">
  <MarkdownRendererCmp
    markdown={`
The input system is managed by an \`InputManager\` that polls devices, evaluates bindings, and executes commands.  
Input is not queried directly inside gameplay code — it is mapped through **ActionMaps**, which can be enabled or disabled depending on the active state.

#### Devices
- \`SDLKeyboard\` — tracks only keys that are bound
- \`XBoxController\` — XInput-based, supports \`Pressed\`, \`DownThisFrame\`, \`UpThisFrame\`

#### Action Maps
An ActionMap groups input bindings for a specific context (menu, gameplay, pause, etc.).  
Only enabled ActionMaps are processed each frame.

#### Binding Input to Commands
Bindings connect:
- a **Command**
- a device (keyboard or controller)
- a key/button + input state

When the condition is met, the command’s \`Execute()\` function is called.

\`\`\`cpp
auto& im = InputManager::GetInstance();
m_ActionMapIdx = im.AddActionMap({ 0 });

im.BindCommand(
    m_ActionMapIdx,
    "StartSinglePlayer",
    std::make_unique<StartSinglePlayerCommand>(*this),
    std::make_unique<ControllerBindingInfo>(ControllerButton::DPAD_LEFT, ButtonState::DownThisFrame)
);

im.SetEnableActionMap(m_ActionMapIdx, true);
\`\`\`

Command example:

\`\`\`cpp
class StartSinglePlayerCommand : public JRE::Command
{
public:
    StartSinglePlayerCommand(MainMenuState& state) : m_State{ state } {}
    void Execute() override { m_State.m_StartSinglePlayer = true; }
private:
    MainMenuState& m_State;
};
\`\`\`

#### Key Points
- Input is routed through commands, not manually checked  
- Devices are abstracted (\`IKeyboard\`, \`IController\`)  
- ActionMaps allow clean switching between menu and gameplay input  
- Per-frame input states: \`Pressed\`, \`DownThisFrame\`, \`UpThisFrame\`
`}
  />
</CardTabsCmp.Item>

<CardTabsCmp.Item label="Physics & Collision">
  <MarkdownRendererCmp
    markdown={`
The physics system is based on axis-aligned box colliders and a single physics system implementation: \`BoxPhysicsSystem\`.  
It handles gravity, collision checks, collision response, and dispatches collision events to components.

#### Collider Components
- \`Box2DColliderComponent\` — dynamic collider attached to a GameObject  
- \`RigidBody2DComponent\` — applies gravity and velocity, but does **not** handle collision on its own  

#### Physics System
\`BoxPhysicsSystem\` tracks:
- Dynamic colliders (GameObject components)
- Static colliders (added manually, e.g. tilemaps, platforms)
- Gravity, world scale, and movement resolution

Dynamic vs Dynamic is checked in \`Update()\`.  
Dynamic vs Static uses swept collision inside \`MoveCollider()\`.

#### Layers & Masks
Each collider has a layer and a collision mask.  
Collision only happens when:  
\`(A.layer & B.mask) && (B.layer & A.mask)\`

This allows things like:
- Players collide with level tiles
- Enemies collide with players
- UI or triggers ignore physics entirely

#### Static Colliders Example (TileMap)
Static colliders are registered directly into the physics system:

\`\`\`cpp
m_StaticCollisionGruop = ServiceLocator::GetPhysicsSystem().GetFreeStaticGroup();

StaticCollider collider;
collider.shape = std::make_unique<BoxShape>(collisionRect.boxShape);
collider.group = m_StaticCollisionGruop;
collider.properties.layer = CollisionLayer::StaticLevel;
collider.properties.mask  = CollisionMask::StaticLevel;
collider.properties.isStatic = true;

ServiceLocator::GetPhysicsSystem().RegisterStaticCollider(std::move(collider));
\`\`\`

#### Dynamic Collider Example
A GameObject becomes a physics object by adding:

\`\`\`cpp
player->AddComponent<RigidBody2DComponent>();
player->AddComponent<Box2DColliderComponent>();
\`\`\`

The collider automatically registers with the physics system when enabled.

#### Movement & Collision Resolution
Movement is done through the physics system, not by writing to transform directly:

\`\`\`cpp
BoxPhysicsSystem::CollisionSettings cs{ oldPos, *m_pBox2DColliderCmp };
cs.dt = Timer::GetInstance().GetFixedTimeStep();
cs.applyGravity = true;
cs.vel = m_Vel;

physicsSystem.MoveCollider(cs, m_CollInfo);
GetGameObject().SetWorldPosition(m_CollInfo.newPos.x, m_CollInfo.newPos.y);
m_Vel = m_CollInfo.velOut;
\`\`\`

The result includes \`newPos\`, \`velOut\`, and collision direction flags like:

- \`m_CollInfo.collDir.down\` → standing on ground  
- \`m_CollInfo.collDir.up\` → hit ceiling  
- \`m_CollInfo.collDir.left/right\` → wall hit

#### Collision Events
\`Box2DColliderComponent\` exposes an event when two dynamic colliders overlap:

\`\`\`cpp
void Box2DColliderComponent::OnCollisionWith(const ICollider& other)
{
    EventInfo e{ CreateEvent<Events::Box2DCollisionEvent>(*this, other) };
    OnCollisionEvent.Notify(e);
}
\`\`\`

Example: Player reacts to collision with enemy

\`\`\`cpp
m_pBox2DColliderCmp->OnCollisionEvent.AddObserver(this);

void PlayerScriptComponent::OnNotify(EventInfo& event)
{
    if (event.GetID() == Events::Box2DCollisionEvent::ID)
    {
        auto& args = event.GetArgs<Events::Box2DCollisionEvent>();
        if (args.other.GetProperties().layer & CollisionLayer::Enemy)
            HandlePlayerDeath();
    }
}
\`\`\`

#### Key Points
- Box-only 2D collision system (AABB)
- Dynamic colliders = components  
- Static colliders = registered separately (tilemaps, platforms, etc.)
- Layers & masks control what collides
- Physics system calculates new position + resolves overlap
- Gameplay reacts to collision through events, not polling
`}
  />
</CardTabsCmp.Item>

<CardTabsCmp.Item label="Resource Manager">
  <MarkdownRendererCmp
    markdown={`
The resource system loads, stores, and retrieves engine assets through a handle-based API.  
Assets are **imported once**, registered in the \`AssetRegistry\`, and then fetched on demand through the \`ResourceManager\`.

#### Importing Assets
Assets are imported using a specific importer class (Texture, Font, Sound, Sprite, etc.).  
Importing returns an \`AssetHandle\`, which uniquely identifies the asset in the registry.

\`\`\`cpp
auto fontHandle = AssetImporter::GetInstance().ImportAsset(FontImporter("Fonts/Pixel_NES.otf"));
auto fontSoftRef = SoftAssetRef<Font>(fontHandle);
\`\`\`

The importer converts the file into the correct engine type and registers:
- file path
- asset type
- metadata (size, format, etc.)

#### Registry + Manager
- \`AssetRegistry\` remembers every imported asset and its metadata  
- \`ResourceManager\` loads the asset **when first requested** and caches it  
- Re-requests return the same in-memory object (no reloading)

\`\`\`cpp
AssetRef<Texture2D> tex = ResourceManager::GetAsset<Texture2D>(texHandle);
\`\`\`

#### Strong vs Soft References
| Type | Purpose |
|-------|---------|
| \`AssetRef<T>\` | Loaded asset, guaranteed valid while referenced |
| \`SoftAssetRef<T>\` | Lazy reference, only loads when accessed |

Example (Player sounds):

\`\`\`cpp
SoftAssetRef<ISoundClip> m_JumpSound{ nullptr };
...
m_JumpSound->Play();
\`\`\`

#### Custom Assets & Importers
The system is not limited to engine-defined types.  
Games can define **new asset classes** and **register custom importers**.

Example: Bubble Bobble's \`TileMap\` asset + importer:

\`\`\`cpp
static bool s_Registered = []()
{
    AssetImporter::GetInstance().RegisterImporter(
        TileMap::GetStaticType(),
        TileMapImporter::ImportAsset
    );
    return true;
}();
\`\`\`

After import:

\`\`\`cpp
auto handle = AssetImporter::GetInstance().ImportAsset(TileMapImporter(path));
auto tilemap = ResourceManager::GetAsset<TileMap>(handle);
\`\`\`

#### Supported Asset Types (built-in + custom)
- Texture2D  
- Font  
- Sprite / SpriteAnimationClip  
- SoundClip  
- Game-defined types (TileMap, LevelData, etc.)

#### Key Points
- Assets are imported once, referenced by handle
- ResourceManager loads and caches automatically
- No direct file paths in gameplay code — only handles and refs
- SoftAssetRef allows delayed loading and lightweight storage
- New asset types + importers can be added outside the engine
`}
  />
</CardTabsCmp.Item>
        </CardTabsCmp>
      </Container>
    </Box>
  );
}
