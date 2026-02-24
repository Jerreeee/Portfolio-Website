'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';

import type { ProjectCmpProps } from '../project';
import type { ProjectManifest } from '@/Types/projectManifest';

import { data } from './data';
import { useComponents } from '@/Themes/ThemeProvider';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const { MediaCmp, ProjectOverviewCmp, MarkdownRendererCmp } = useComponents();
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box>
      {/* ================= HERO ================= */}
      <Container
        maxWidth="md"
        sx={{ textAlign: 'center', mb: 6 }}
      >
        <Typography variant="gradientH1">{data.title}</Typography>
      </Container>

      {/* ================= OVERVIEW ================= */}
      <ProjectOverviewCmp project={project} />

      <div className="doc-content">
      <Divider sx={{ my: 4, opacity: 0.2 }} />

      {/* Introduction */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary>
          <Typography variant="h2">Introduction</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            {/* Why did I choose Python in Houdini? */}
            <Box>
              <Typography variant="h4">Why did I choose Python in Houdini?</Typography>

              <Typography>
                The game industry is all about speeding up game development. Games
                are becoming bigger, more qualitative. Companies are met with ever
                increasing pressure from tight deadlines to get new updates out for
                the player. And of course getting as many sales as possible. This is
                made possible thanks to amazing tool developers who create easy to
                use, highly interactive tools that update real-time in a game engine
                when the user changes something. This keeps the user from going back
                to their modelling software &gt; changing an asset &gt; exporting to
                disk and reimporting into the game engine. My personal interests are
                completely in line with this mindset of automating highly repetitive
                work while still focusing on art directability. Everything related
                to scripting, proceduralism and getting your assets inside of a game
                engine as fast as possible is a great interest of mine. That's why I
                wanted to research all the steps from creating a tool to in the end
                having an artist use the tool inside of a game engine.
              </Typography>
            </Box>

            {/* What to expect */}
            <Box>
              <Typography variant="h4">What to expect?</Typography>

              <Typography>
                As a practical proof point I have created a Houdini Digital Asset
                (HDA) that helps in the creation of a procedural racetrack that can
                be integrated into Unreal Engine. Instead of updating parameters of
                the Houdini Asset in Unreal, I will make use of Houdini session sync
                and python viewer states to change parameters of the HDA in Houdini.
                This will allow us to make changes to the racetrack inside of
                Houdini and see it automatically update in Unreal as well.
              </Typography>

              <MarkdownRendererCmp
                markdown={`
Here is what I will cover:

- How to interact with objects in your viewport using your mouse and keyboard.
- How to make a super interactive UI that can be navigated using only your mouse and keyboard.
- How to store all the data of the entire racetrack in one json.
- How we can get this json into our geometry network so we can construct the racetrack mesh from it using regular Houdini nodes..
- Why I made the decision to use certain features such as Houdini session sync and python viewer states.
- How to integrate this tool into Unreal Engine

I will not cover:

- How to use this json data to create the racetrack mesh itself
`}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Literature / Prior Art */}
      <Accordion defaultExpanded={false}>
        <AccordionSummary>
          <Typography variant="h2">Literature/prior-art study</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4">Creating racetracks</Typography>

            <Typography>
              Starting off with looking for what's already been done in this field I
              found some interesting sources which helped me with my research. Let's
              start off with the creation of the procedural racetrack itself. There
              are a couple of techniques that are commonly used to create racetracks
              for games.
            </Typography>

            {/* Pre-made segments */}
            <Grid
              container
              spacing={2}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h5">Pre-made segments</Typography>

                <Typography>
                  In this approach you create pre-made segments of the track (corner
                  segment, straight segment, etc…) and then place one segment after
                  the other to create the track. The Trackmania games make use of
                  this approach. The advantage is that different tracks are very
                  consistent in their style as they consist of the same pre-made
                  segments. The disadvantage is that you loose the ability to create
                  very specific turns like 17.6 degrees to the left as all the
                  segments have pre-defined standard angles like 45 or 90 degrees.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <MediaCmp
                  item={
                    getMediaItemsFromManifest(manifest, [
                      'TrackmaniaTrackEditor',
                    ])[0]
                  }
                />
              </Grid>
            </Grid>

            {/* Bending segments */}
            <Grid
              container
              spacing={2}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h5">Bending pre-made segments</Typography>

                <Typography>
                  A second option is to create pre-made segments that have multiple
                  edge loops along their length and then bend them along a curve
                  inside of a game engine. This approach is often used for cables
                  inside of games and gives you the freedom to turn in any
                  direction. But it comes with some negatives. It is a quick and
                  dirty way. These extra edge loops are wasted geometry on straight
                  parts of the curve and this bending method can also cause pinching
                  and stretching of UV's at parts with a high curvature.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <MediaCmp
                  item={getMediaItemsFromManifest(manifest, ['Splinemesh'])[0]}
                />
              </Grid>
            </Grid>

            <Typography variant="h5">Fully procedural racetrack</Typography>

            <Typography>
              Using Houdini, the company Space Ape created a fully procedural
              racetrack based on an input curve that defines the main shape. In this
              GDC talk, they explain all the benefits of using this method. It gives
              you full flexibility over the direction of your track, optimization of
              polycount on straight parts and automatically creating correct UV's
              for your track. Their tool was directly implemented inside of a game
              engine and updates in real-time when a change is made. This is thanks
              to the Houdini Engine for Unreal plugin which connects both software.
              It allows you to change parameters inside of Unreal Engine and in the
              background Houdini will re-calculate the output. Space Ape created
              their game in Unity but everything is applicable to Unreal Engine as
              well.
            </Typography>

            {/* Gallery placeholders */}
            <Box
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              gap={2}
            >
              <div style={{ height: '100%', flex: '1 1 0', minWidth: 0 }}>
                <MediaCmp
                  item={
                    getMediaItemsFromManifest(manifest, [
                      'image_2022-01-22_164602',
                    ])[0]
                  }
                />
              </div>
              <div style={{ height: '100%', flex: '1 1 0', minWidth: 0 }}>
                <MediaCmp
                  item={
                    getMediaItemsFromManifest(manifest, ['UnityHoudiniEngine3'])[0]
                  }
                />
              </div>
            </Box>

            <Typography variant="h4">Limitations of Unreal and Houdini Engine</Typography>

            <Typography>
              The tool that Space Ape created was amazing! They could fully
              customize tons of parameters to change the visual look of the
              racetrack. However, to do this they still needed to drag around
              sliders in the UI. This is the normal way of working when working with
              Unreal and Houdini. But this doesn't fit in with the idea of making
              everything as interactive as possible for the artist that will use the
              tool in the end. What I want is something more like how you would
              model in Blender. Every action is done inside of the viewport using
              simple mouse clicks and keyboard shortcuts. And this is something that
              I wanted for my own racetrack tool as well. This is when I found out
              about Python viewer states.
            </Typography>

            <Typography variant="h4">Python viewer states</Typography>

            <Typography>
              Python viewer states are a way to interactively update parameter
              values on your tool or HDA using mouse clicks and keyboard shortcuts.
            </Typography>

            <Typography>
              I found that some students from the Breda University of Applied
              Sciences had already built something that was similar to what I wanted
              to do. I used their tutorial as a starting point for my own tool. They
              implemented some interactivity but I wanted to take this even a step
              further. I wanted to navigate the entire UI of my tool purely using
              python viewer states.
            </Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['HoudiniTalkResult-2'])[0]}
            />

            <Typography>
              So using python viewer states we can now interactively work with our
              tool. But what is the benefit of using this approach if we can't get
              our racetrack back into Unreal Engine? We can achieve this using
              Houdini session sync. This allows us to open a live connection between
              Unreal and Houdini and we can now jump back and forth between both
              softwares, change something in one and it will immediately update in
              the other and vice versa.
            </Typography>

            <Typography variant="h4">Conclusion</Typography>

            <Typography>
              What was very clear to me, is the workflow/pipeline that I would use
              during my research. First create a tool inside of Houdini. Afterwards
              convert it into a digital asset which can be imported into Unreal
              engine. Then using Houdini engine and Houdini session sync we can open
              a live connection between the softwares and use python viewer states
              in Houdini to change parameters on our racetrack tool.
            </Typography>

            <Typography>
              Some questions that occurred to me after doing my literature study and
              before starting on my own tool were:
            </Typography>

            <MarkdownRendererCmp
              markdown={`
1. How does the tool compare when built with and without python viewer states? What are the pros and cons?
2. Is using Houdini engine in combination with Houdini session sync a benefit to the game asset creation pipeline?
`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Workflow */}
      <Accordion defaultExpanded={false}>
        <AccordionSummary>
          <Typography variant="h2">Workflow</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4">Overview</Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['WorkflowDiagram-3'])[0]}
            />

            <MarkdownRendererCmp
              markdown={`
Here you can see an overview of how I connected all the different parts.

- **Step 1:** create a standard procedural Houdini network using nodes.
- **Step 2:** convert this network into a tool/HDA and import it into Unreal with the Houdini Engine plugin.
- **Step 3:** change the position of curve points in Unreal Engine to shape the racetrack.
- **Step 4:** use Houdini session sync to open a live connection between Unreal and Houdini.
- **Step 5:** interactively work with the tool in the Houdini viewport using python viewer states.
- **Step 6:** the viewer state will automatically update the UI when the artist changes something in the viewport.
- **Step 7:** the python module will run when the artist changes a parameter value in the UI directly.
- **Step 8:** the only reason that this UI exists is to construct a json file that will hold all the data of the entire racetrack.
- **Step 9:** json parameter and other parameters that will help us to construct the json.
- **Step 10:** the procedural network will read in this json and construct a complete racetrack from it.
`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* --------------------------------------------------------- */}
      {/* PROTOTYPING                                              */}
      {/* --------------------------------------------------------- */}
      <Accordion defaultExpanded={false}>
        <AccordionSummary>
          <Typography variant="h2">Prototyping</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <MarkdownRendererCmp
              markdown={`
This will be a more technical part as it is all about using Python. I will always mention all the functions that I created and explain their functionality. I will not always show the code as some of it is just Python basics. Making use of an external code editor is highly advisable but not necessary. I personally used Visual Studio Code. To interact with Houdini using python we will make use of the Houdini object model or [HOM](https://www.sidefx.com/docs/houdini/hom/intro.html) for short. This is a python library that allows you to interact with Houdini. If you don't now how something works, or how you can get access to a certain part of Houdini. Then HOM is your best friend. Thousands of functions, classes, objects and way more are all super well documented. Use this documentation!!

You will probably not understand everything I do the first time you read it or try it out yourself in Houdini. Be patient and dissect every step into smaller chunks. Begin by creating something small and make sure that it works perfect. Then you can start implementing complexer python systems to improve your tool.

Before creating a viewer state let's first create our UI and the rest of our tool which we will link the viewer state to later on. Don't worry, this also involves a lot of Python. I will skip the step on how to create the geometry network as you should already be able to do this if you read this. Let's start with the basics of Python for Houdini digital assets and work our way up from there.
`}
            />

            {/* PYTHON MODULE */}
            <Box>
              <Typography variant="h4">Python Module</Typography>

              <MediaCmp
                item={getMediaItemsFromManifest(manifest, ['UIPythonModule'])[0]}
              />

              <Typography>
                The first thing that you should do when considering to enhance your
                tool using Python is learn about the Python Module. The Python
                Module is a type of event handler. It can run code whenever the user
                presses a button, manually enters a value or slides the slider
                around in the UI. Doing this will trigger and event to which code
                can be linked in the Python Module. There are other event handlers
                like OnUpdated which we will be using as well. You can find these
                event handlers on your HDA under Type Properties → Scripts.
              </Typography>

              <Typography>
                How to link a parameter to a function in the python module? Start
                off by creating your function.
              </Typography>

              <MediaCmp
                item={
                  getMediaItemsFromManifest(manifest, [
                    'image_2022-01-26_195621',
                  ])[0]
                }
              />

              <Typography>
                Afterwards go to the parameter that you want to link this function
                to. In the parameter description under Callback Script we can call
                our function.
              </Typography>

              <MediaCmp
                item={
                  getMediaItemsFromManifest(manifest, [
                    'image_2022-01-26_195554',
                  ])[0]
                }
              />

              <Grid
                container
                spacing={2}
                alignItems="flex-start"
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <MarkdownRendererCmp
                    markdown={`
Use [\`hou.phm()\`](https://www.sidefx.com/docs/houdini/hom/hou/phm.html) to get a reference to the [Python Module](https://www.sidefx.com/docs/houdini/hom/hou/HDAModule.html), and then call the function you created inside that module.

Pass **\`kwargs\`** as an argument — it contains useful information such as the current node, the parameter being changed, and other event context.

Make sure the script language is set to **Python**.
`}
                  />
                </Grid>
              </Grid>

              <MediaCmp
                item={
                  getMediaItemsFromManifest(manifest, [
                    'image_2022-01-26_195905',
                  ])[0]
                }
              />

              <Typography>
                This kwargs dictionary is super important and we will be using it a
                lot. What is in this dictionary is dependent on where the function
                is called from. Sometimes you will get more info than other times.
              </Typography>

              <Typography>
                This is the basic setup, when you now change the parameter the
                script will run. An easy way to test this is to print some text in
                your function. You can open the python console to see this text
                appear.
              </Typography>
            </Box>

            {/* JSON VS MULTIPARAMETER */}
            <Box>
              <Typography variant="h4">Json vs Multiparameter block</Typography>

              <MediaCmp
                item={getMediaItemsFromManifest(manifest, ['UiGeometryNetwork'])[0]}
              />

              <Typography>
                Another super important step that we have to figure out is how we
                can transfer the data that defines our racetrack from our user
                interface into our geometry network so we can use regular Houdini
                nodes to construct the racetrack. But to figure that out we need to
                first figure out what this data looks like so we might have an idea
                on how to store it.
              </Typography>

              <Typography variant="h5">Control handles/points</Typography>

              <MediaCmp
                item={getMediaItemsFromManifest(manifest, ['ControlHandles'])[0]}
              />

              <Typography>
                I will only define certain parameters at a couple of points on the
                racetrack. I will be calling these control handles or control
                points. The idea is that every point can contain multiple parameters
                that define how the racetrack looks and plays like at that point.
                Different points can have different parameters with different
                values. Looking in Houdini, I found two ways that are mostly used to
                store this data and then transfer it on to the geometry network.
              </Typography>

              <Typography variant="h5">Multiparameter block</Typography>

              <MediaCmp
                item={
                  getMediaItemsFromManifest(manifest, [
                    'image_2022-01-23_181815',
                  ])[0]
                }
              />

              <MarkdownRendererCmp
                markdown={`
This is a special parameter type that allows you to create multiple instances of the same set of parameters. Every instance in this multiparameter would represent a control handle/point on our racetrack. This would allow us to define per point data ([example](https://youtu.be/nS4FSMEas-I)).
`}
              />

              {/* gallery */}
              <Grid
                container
                spacing={2}
                mt={1}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <MediaCmp
                    item={
                      getMediaItemsFromManifest(manifest, [
                        'image_2022-01-23_143541',
                      ])[0]
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <MediaCmp
                    item={
                      getMediaItemsFromManifest(manifest, [
                        'image_2022-01-23_143558',
                      ])[0]
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                mt={1}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6">Pros</Typography>
                  <MarkdownRendererCmp
                    markdown={`
- Very visual and easy to understand
- All parameters of all the handles are visible at the same time
`}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6">Cons</Typography>
                  <MarkdownRendererCmp
                    markdown={`
- Hard to manage using Python when handles are deleted or added
- Every control handle will contain the exact same set of parameters, which clutters the UI.
`}
                  />
                </Grid>
              </Grid>

              <Typography variant="h5">JSON</Typography>

              <Typography>
                Using jsons is the other way to transfer data from the user
                interface to your geometry network. A json allows you to put many
                different parameters in a single text field. Each element in the
                json is a dictionary and represents a control handle/point. I will
                be calling this the handle dictionary. In this dictionary we can
                define all the per point data using key-value pairs.
              </Typography>

              <MediaCmp
                item={getMediaItemsFromManifest(manifest, ['JsonStructure'])[0]}
              />

              <Grid
                container
                spacing={2}
                mt={1}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6">Pros</Typography>

                  <MarkdownRendererCmp
                    markdown={`
- Easy to manage through python
- You can add handles that only change certain parameters but not others.
- Can save to disk and share between artists
`}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6">Cons</Typography>

                  <MarkdownRendererCmp
                    markdown={`
- Not as visual and easy to understand as a multiparameter
- Error prone if edited manually
`}
                  />
                </Grid>
              </Grid>

              {/* CONCLUSION */}
              <Typography variant="h5">Conclusion</Typography>

              <Typography>
                The multiparameter block is a super nice Houdini feature but it has
                its drawbacks. When we use json on the other hand the possibilities
                to store our racetrack data are just endless as we are only limited
                by what Python can do. And python can a lot. So for my tool I
                decided to work with json to transfer data from the user interface
                to the geometry network. As I mentioned in the cons about using
                json, we don't want an artist to manually change the json. We will
                need to create a user interface for this so the artist who will use
                the tool does not have to touch the json directly.
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* --------------------------------------------------------- */}
      {/* USER INTERFACE                                            */}
      {/* --------------------------------------------------------- */}
      <Accordion defaultExpanded={false}>
        <AccordionSummary>
          <Typography variant="h2">User Interface</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['UserInterface'])[0]}
            />

            <Typography variant="h5">Active handle user interface</Typography>

            <Typography>
              Because I am using a <a href="#toggleParameter">json</a> structure to
              transfer my per point data, I need a way for the user of my tool to
              interact with this json. The first thing I did was add a UI section on
              my HDA that could show all the values of a single handle dictionary. I
              will be calling this the <u>active handle</u> from now on.
            </Typography>

            <div id="toggleParameter">
              <MediaCmp
                item={
                  getMediaItemsFromManifest(manifest, [
                    'image_2022-01-23_165522',
                  ])[0]
                }
              />
            </div>
            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['ActiveHandleUI'])[0]}
            />

            <Typography variant="h5">All handles json</Typography>

            <Typography>
              We will need some helper parameters in our user interface. First we
              need a string parameter that will contain the json. As we do not yet
              have an option to{' '}
              <a href="#addAndDeleteHandles">add and delete control handles</a>, you
              can always manually edit the json to add a handle dictionary. Beware
              of typos!
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_182332'])[0]
              }
            />

            <Typography variant="h5">All handle parms</Typography>

            <Typography>
              We also need to add a new string parameter which will contain all the
              parameters that our active handle UI contains. This will be very
              useful later.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-16'])[0]} />

            <Typography>
              To set this parameter, I created a function in the OnUpdated event
              handler in the Type Properties → Scripts tab. Here I loop through all
              the parameters in my main folder and add them to the "All Handle
              Parms" parameter.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-17'])[0]} />

            <Typography variant="h5">Changing the active handle</Typography>

            <Typography>
              The "Active Handle" parameter defines which handle's values are shown.
              In the callback script for this parameter I placed the following code:
              <code> hou.phm().updateActiveHandleParms(kwargs) </code>. This calls a
              function in the Python Module.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_180143'])[0]
              }
            />

            <Typography>
              When the user changes this parameter, the value can be accessed using
              <code>kwargs[&quot;script_value&quot;]</code>. Using this you can
              retrieve the correct dictionary from the json. Afterwards, each
              parameter in the UI is updated to match the dictionary values.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_204657'])[0]
              }
            />

            <Typography variant="h5">Updating other parameters</Typography>

            <Typography>
              I also have another function in the Python Module that updates one
              single parameter in the json whenever that parameter changes. This is
              added to all parameter callback scripts except "Active Handle" and
              "curvePos", as those behave differently.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_161547'])[0]
              }
            />

            <Typography>
              Below you can see this in action. When a parameter changes, the
              callback runs and the json is updated. When "Active Handle" changes,
              all UI values update accordingly.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, [
                  'ActiveHandleChangeParameters',
                ])[0]
              }
            />

            <Typography variant="h5">Handle type</Typography>

            <Typography>
              The handle type defines what parameters can be changed on a handle.
              For example, "Normal", "Delete", or "Railings". Only the parameters
              that belong to the chosen handle type are shown. I hide the folder of
              each handle type using the "Hide When" property. I also use prefixes
              like Basic__, Delete__, Rail__ to group the parameters and avoid
              naming conflicts.
            </Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['ChangingHandleTypes'])[0]}
            />
            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['HandleTypes'])[0]}
            />

            <Typography variant="h5">Spare parameters</Typography>

            <Typography>
              These are optional parameters that the user can dynamically add and
              remove from the handle dictionary. Spare parameters are linked to a
              handle type.
            </Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['SpareParms2'])[0]}
            />

            <Typography variant="h5">Menu Script</Typography>

            <Typography>
              The spare parameters dropdown updates automatically. To do this, a
              list of available spare parameters is built in{' '}
              <code>updateActiveHandleParms()</code>. Then a second function{' '}
              <code>updateSpareParmsMenu()</code> builds the menu entries.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-24_115930'])[0]
              }
            />
            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-19'])[0]} />

            <Typography>
              In the Menu → Menu Script tab I set:
              <code>
                {' '}
                kwargs[&quot;node&quot;].hdaModule().updateSpareParmsMenu(kwargs){' '}
              </code>
              . I manually trigger this function from{' '}
              <code>updateActiveHandleParms()</code> using{' '}
              <code>.pressButton()</code>.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-24_120237'])[0]
              }
            />

            <Typography variant="h5">Defining spare parameters</Typography>

            <Typography>
              To create a spare parameter, I add an extra toggle parameter with the
              same name + &quot;_hide&quot;. The toggle hides the parameter when
              true. Under Action Button I call:
              <code>
                {' '}
                kwargs[&quot;node&quot;].hdaModule().deleteSpareParm(kwargs){' '}
              </code>
              .
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_203827'])[0]
              }
            />
            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-24_112608'])[0]
              }
            />
            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-21'])[0]} />

            <Typography variant="h5">Adding and deleting spare parameters</Typography>

            <Typography>
              To add spare parameters, I created an extra function{' '}
              <code>addSpareParm()</code> in my Python Module. This function is
              added to the Callback Script of the &quot;Add&quot; Button. In this
              function, I retrieve the parameter that is currently selected in the
              &quot;Spare Parms&quot; menu. Next, I retrieve the default value for
              this parameter and lastly, I add this parameter to the active handle
              dictionary.
            </Typography>

            <Typography>
              To delete spare parameters, I create an extra function{' '}
              <code>deleteSpareParm()</code> in my Python Module. This function will
              be called whenever the user presses the &quot;Delete&quot; button. In
              this function we can get the name of the parameter that should be
              deleted using <code>kwargs[&quot;parmtuple&quot;].name()</code>.
              Afterwards, this parameter is removed from the active handle
              dictionary.
            </Typography>

            <Typography variant="h5">Curve Position</Typography>

            <Typography>
              The "curvePos" parameter represents the arclength location of a handle
              along the track. Using arclength avoids issues caused by using curveU
              percentages when curve length changes.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_164626'])[0]
              }
            />

            <Typography>
              I created <code>getCurvePos()</code> which returns all curvePos values
              and sorts them. The index of a handle in this sorted list determines
              its position in the json list.
            </Typography>

            <Typography variant="h5">Changing the curve position</Typography>

            <Typography>
              When "curvePos" changes, I call <code>updateCurvePos()</code>, which
              determines where the handle should be placed in the sorted list. If
              its correct index differs from the current list index, the dictionary
              is removed and reinserted at the new location.
            </Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['ChangingCurvePos2'])[0]}
            />

            <Typography variant="h5">Adding and deleting handles</Typography>

            <Typography>
              To add handles, I first need default values for all parameters. I
              created a section in the UI where these default values are stored.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_170346'])[0]
              }
            />
            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-6'])[0]} />
            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-7'])[0]} />

            <Typography>
              When "Add handle" is pressed, I construct a dictionary using these
              default values. The handle is inserted at the index determined by
              sorting all curvePos values.
            </Typography>

            <Typography>
              To delete a handle, I use the "Active Handle" parameter as the index:
              <code> del jsl[index] </code>.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* --------------------------------------------------------- */}
      {/* CREATING A PYTHON VIEWER STATE                            */}
      {/* --------------------------------------------------------- */}
      <Accordion defaultExpanded={false}>
        <AccordionSummary>
          <Typography variant="h2">Creating a python viewer state</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['UIViewerStates-962x1024'])[0]
              }
            />

            <Typography>
              So far, we have not yet touched python viewer states. However, all the
              setup so far has been super important as we will be using a lot of the
              functions that we created in our Python Module in our viewer state as
              well.
            </Typography>

            <Typography>
              You can create a brand-new python viewer state by going on your
              digital asset to Type Properties &gt; Interactive &gt; State Script.
              Here you click "New" to create a new viewer state. The following
              pop-up window will appear where you can select some pre-made functions
              that you would like to use. The ones that I have selected where most
              useful for me.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_183546'])[0]
              }
            />

            <Typography>
              Let's start by assigning some class variables when the user enters the
              viewer state by pressing "Enter" with their mouse cursor in the
              viewport. The self.node and self.phm are important variables which we
              will use a lot. Self.node refers to our HDA node and self.phm refers
              to our Python Module.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-10'])[0]} />

            {/* --------------------------------------------------------- */}
            {/* ADDING AND DELETING HANDLES                              */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5">Adding and deleting handles</Typography>

            <Typography>
              Now we will add the option to change parameter values by using your
              mouse and the ability to add and delete handles. For this we will need
              some keybinds. You can add this right above your __init__ function.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_184403'])[0]
              }
            />

            <Typography>
              Adding and deleting handles is easy as we have already implemented
              this in the Python Module. In the onKeyTransitEvent() first get the
              key that was pressed and afterwards check if this key matches with one
              of our keybinds. If this is the case press the "Add" or "Delete"
              button through code.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_185422'])[0]
              }
            />

            {/* --------------------------------------------------------- */}
            {/* SELECTING HANDLES IN THE VIEWPORT                        */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5">Selecting handles in the viewport</Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['SelectingHandles'])[0]}
            />

            <Typography>
              First get the most important variables from the onMouseEvent(). The
              following three are used almost always in mouse and keyboard events.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-24_143321'])[0]
              }
            />

            <Typography>
              If the user clicked in the viewport then the reason why the
              onMouseEvent() was trigered will be "Start". Next we can cast a ray
              into the scene and collide with a custom geometry from inside our HDA.
              Afterwards, we can get an id attribute that you have to store on the
              primitives of the collision geo. This id represents the position of
              the handle in the json. Using this id we can set the new active
              handle.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-26'])[0]} />

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-24_143337'])[0]
              }
            />

            {/* --------------------------------------------------------- */}
            {/* CYCLING THE ACTIVE PARAMETER                              */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5">Cycling the active parameter</Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['ScrollingActiveParm2'])[0]
              }
            />

            <Typography>
              Up until now I hardcoded the parameter that would be changed when
              dragging your LMB. But ideally we could replace this with a variable.
              For this I used the concept of an "Active Parameter". We need two new
              parameters for this on our UI. One which will contain the currently
              active parameter and another which will contain all the parameters
              that can be cycled through using a keyboard shortcut.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, [
                  'image_2022-01-23_194730-1024x31',
                ])[0]
              }
            />

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-12'])[0]} />

            <Typography>
              The "Cyclable Active Parms" parameter is automatically set in the
              OnUpdated event handler. To define if a parameter can be used in this
              cycle I added a tag to the parameter in the Parameter Description.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-13'])[0]} />

            <Typography>
              In the onUpdated event handler we can now add some code that will
              check all the parameters in the UI if they have this tag. If so, then
              they are added to the active parameter cycle.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_195317'])[0]
              }
            />

            <Typography>
              Now that the setup is done we still need a way to change the active
              parameter and cycle through the list we just created. I will be using
              the onMouseWheelEvent() in the python viewer state for this. Don't
              forget to add new class variables for the active_parm and the
              cyclable_active_parms.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_200210'])[0]
              }
            />

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_202342'])[0]
              }
            />

            <Typography>
              Now when you scroll with your MMB, the <code>cycleMode()</code>{' '}
              function will be called. In this function it is just a matter of
              getting the active parameter &gt; getting the index of this parameter
              in the cyclable_active_parms list. Adding the direction to this index
              &gt; getting the new active parameter from the list &gt; and lastly
              setting the active parameter to this new one. After that we can cycle
              through all the cyclable_active_parms, disable all of them and only
              enable the active parameter.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_202145'])[0]
              }
            />

            <Typography>
              We can now also use this active parameter as the parameter to change
              when the user holds LMB and drags. Cycling through the parameters
              looks like the following.
            </Typography>

            {/* --------------------------------------------------------- */}
            {/* UPDATING PARAMETER VALUES                                 */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5">Updating parameter values</Typography>

            <Typography>
              Updating the parameter value by holding LMB and dragging is a bit
              complexer. Again, tart by getting some of the most important values we
              can get from the onMouseEvent().
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-11'])[0]} />

            <Typography>
              You will still need to add the self.mouse_x_start variable to your
              class. You can set it using <code>device.mouseX()</code> when the
              reason is "Start". If the reason is "Active" then this means the user
              is holding LMB and dragging their mouse. When this happens, we want to
              update our parameter. Let's get the old value, add the direction and
              set the new value.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-23_190711'])[0]
              }
            />

            {/* --------------------------------------------------------- */}
            {/* MULTIPLIER TAG                                            */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5">Multiplier tag</Typography>

            <Typography>
              At the moment the rate at which the parameter value changes is always
              one. However, some parameters need to go quicker up and down than
              others. To define the multiplier for a certain parameter, change the
              active_parm_cycle tag so it is structured as a dictionary with the
              multiplier being a key-value pair.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-22'])[0]} />

            <Typography>
              Next in the python viewer state we have to create a new class variable
              called <code>self.active_parm_tags</code>. Each time the user enters
              the state or changes the active parameter, we will call the following
              function that will set this variable.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-23'])[0]} />

            <Typography>
              If we now calculate the <code>new_value</code> we can multiple the{' '}
              <code>direction</code> with the multiplier defined in the{' '}
              <code>self.active_parm_tags</code> variable. Below, I am changing
              these values purely by scrolling with my mouse. Note how they all
              change with different steps. This is because of the multiplier. This
              way we can also change the handle type through our viewer state if we
              set the multiplier to one. I also added the functionality to change
              the value by scrolling with your middle mouse button. Use
              device.mouseWheel() in the onMouseWheelEvent() to get the scroll
              direction.
            </Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['MultiplierTag2'])[0]}
            />

            {/* --------------------------------------------------------- */}
            {/* ADDING AND DELETING SPARE PARAMETERS                     */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5">Adding and deleting spare parameters</Typography>

            <Typography>
              To do this we need to create some extra keybinds in our class. Add an{' '}
              <code>addSpareParm()</code> and a <code>deleteSpareParm()</code>{' '}
              function to the viewer state. To add a spare parameter, just call the{' '}
              <code>addSpareParm()</code> <a href="#spareParms">function</a> from
              the python module.
            </Typography>

            <Typography>
              To delete a spare parameter first get the currently active parameter
              and check if this parameter has the "spare_parm = 1" tag. If this is
              the case then pass the parameter name on to the{' '}
              <code>deleteSpareParm()</code> function in the Python module to delete
              it.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-24_141924'])[0]
              }
            />

            {/* --------------------------------------------------------- */}
            {/* GEOMETRY FUNCTIONS                                        */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5">Geometry functions</Typography>

            <Typography>
              I do this by using something I made myself called geometry functions.
            </Typography>

            <Typography>
              The idea is that using python viewer states we click in our viewport
              and get the position of where we clicked by colliding with a collision
              geometry (
              <a href="#selecting-handles-in-the-viewport">see selecting handles</a>
              ). This position is stored in a vector parameter in our user
              interface. This is the input of our geometry function. This position
              is read into the geometry network and a point is created at this
              position. I ray the point onto my racetrack curve from which I can get
              the "curvePos" value. All of the values that I want to use as output
              for my geometry function I store in a parameter on a single output
              node. This way I can set the output parameters in the user interface
              by just grabbing the value from this output node.
            </Typography>

            <Typography>
              To use this geometry function you first have to enter a special mode
              called "SetParm" using a keyboard shortcut. When you are in this mode,
              then every mouse action in the viewport will run our special geometry
              function.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, [
                  'GeometryFunctions-1024x355',
                ])[0]
              }
            />

            <Typography>Using Output 0.</Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['SettingCurvePos2'])[0]}
            />

            <Typography>Using output 1.</Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, [
                  'GeometryFunctionDeleteLength',
                ])[0]
              }
            />

            <Typography>
              To define what geometry function a parameter should use as you can
              create multiple geometry functions I modified the "
              <a href="#cycling-the-active-parameter">active_parm_cycle</a>" tag.
              Add a new key-value pair. The key is "SetParm", I will use this to
              detect if a parameter even has a geometry function assigned to it as
              not all parameters will have one. The value consists of three parts.
              The first one being which geometry function to use. The second is
              which collision geometry to use. This value is used in another
              geometry function to switch the collision geometry in my geometry
              network. And the last part is which output to use.
            </Typography>

            <MediaCmp
              item={getMediaItemsFromManifest(manifest, ['image-27-1024x51'])[0]}
            />

            <Typography>
              Below you see the geometry function I created to switch collision
              geometries. Using python I can set the index in the switch node. This
              will change which collision is used.
            </Typography>

            <MediaCmp item={getMediaItemsFromManifest(manifest, ['image-28'])[0]} />

            {/* --------------------------------------------------------- */}
            {/* CREATING A HUD INFO PANEL                                 */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h5" id="creating-a-hud-info-panel">Creating a HUD info panel</Typography>

            <Box
              mt={2}
              sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
            >
              <MediaCmp
                item={
                  getMediaItemsFromManifest(manifest, [
                    'image_2022-01-27_121831',
                  ])[0]
                }
              />

              <Box>
                <Typography>
                  This is a new feature since Houdini 19. It allows you to create an
                  info panel linked to your viewerstate. It is meant to explain the
                  most important functionality of your tool. You can create a HUD
                  panel using the following references.
                </Typography>

                <ul>
                  <li>
                    <a href="https://www.sidefx.com/docs/houdini/hom/hud_info.html">
                      Python state info panels
                    </a>
                  </li>
                  <li>
                    <a href="https://www.sidefx.com/docs/houdini/hom/hou/SceneViewer.html#hudInfo">
                      hou.SceneViewer.hudInfo()
                    </a>
                  </li>
                </ul>
              </Box>
            </Box>

            {/* --------------------------------------------------------- */}
            {/* INTEGRATION INTO UNREAL ENGINE                            */}
            {/* --------------------------------------------------------- */}
            <Typography variant="h4" id="integration-into-unreal-engine">
              Integration into Unreal Engine
            </Typography>

            <Typography>
              To integrate a tool like this into Unreal Engine you will need to
              install the Houdini Engine for Unreal plugin. This will allow you to
              import your Houdini digital assets into Unreal and Unreal will
              recognize them. The most important parameter on my HDA is the curve
              input.
            </Typography>

            <MediaCmp
              item={
                getMediaItemsFromManifest(manifest, ['image_2022-01-27_150229'])[0]
              }
            />

            <Typography>
              I create the shape of the racetrack inside of Unreal using this curve.
              Afterwards, I open a live connection between Unreal and Houdini using
              Houdini session sync. Now I am in Houdini and I can start editing my
              racetrack using the python viewer state that I created.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* --------------------------------------------------------- */}
      {/* REFLECTION                                                */}
      {/* --------------------------------------------------------- */}
      <Accordion id="prototyping" defaultExpanded={false}>
        <AccordionSummary>
          <Typography variant="h2">Reflection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" id="so-how-did-the-tool-compare-when-built-with-and-without-python-viewer-states-how-did-i-experience-using-python-in-houdini">
              So how did the tool compare when built with and without python viewer
              states? How did I experience using Python in Houdini?
            </Typography>

            <Typography>
              Well, it was not easy, but still I think it was worth investing my
              time researching this. I really believe that I created an interactive,
              user-friendly tool that can benefit a game company if they would want
              to create a racetrack. Of course my tool can still be refined but
              that's not what this research was about. Creating the tool is the hard
              part. Adding extra options and increasing the graphical quality is the
              "relatively" easy part. And that is something that I might consider
              doing in the future.
            </Typography>

            <Typography>
              While creating this tool I learned so much about Python in Houdini.
              One of the most important things I learned was that you can literally
              connect every part of Houdini together. At times I felt like I was
              wrongly using Houdini and Python. For example with the parameter tags
              to define geometry functions. It almost felt like hacking or abusing
              the system. But who is to say what the correct way of doing things is?
              If it is possible and it works, then that is the only thing that
              matters.
            </Typography>

            <Typography>
              I do have to mention that you can clearly feel that the part of the
              Houdini object model (HOM) that is used to work with Houdini digital
              assets is not yet perfect for creating a super interactive, flawless
              user interface. Quite often I came across bugs or couldn't find
              functions to do specific things and I had to find workarounds. If the
              workaround does its job then you could say that there is no problem at
              all. However, I would tend to disagree because these workarounds lead
              to lost time for the developer of the tool and make it more difficult
              to maintain.
            </Typography>

            <Typography>
              But, this is also part of the process. Houdini and the python
              integration are in constant development. The only thing that we can do
              as users of Houdini is give feedback. All the 14 bugs I found I sent
              to SideFx support. I also sent 5 feature requests of which 3 have
              already been accepted. When I could not find how to do something I
              first would experiment, watch tutorials or ask around on forums. When
              that didn't work the collaboration with SideFx support went very well.
            </Typography>

            <Typography variant="h4" id="is-using-houdini-engine-in-combination-with-houdini-session-sync-a-benefit-to-the-game-asset-creation-pipeline">
              Is using Houdini engine in combination with Houdini session sync a
              benefit to the game asset creation pipeline?
            </Typography>

            <Typography>
              There is always the valid recommendation to use as little software as
              possible when creating a game. This drastically simplifies the
              pipeline. The more you can do inside of your game engine directly the
              better. However, I believe that this is not the case when these
              softwares are limiting your possibilities for creating the best game
              that you can possibly create. Houdini Engine and Houdini session sync
              are really good tools to link Unreal Engine and Houdini together. They
              allow you to tap into all the things that Houdini has to offer. There
              are still flaws and you will even have crashes, but I am confident
              this will get better over time. And in general I think that that these
              tools are way more valuable than a few rough edges here and there.
            </Typography>

            <Typography variant="h4" id="in-general">In general</Typography>

            <Typography>
              Bridging the gap between Houdini and Unreal complicates the pipeline
              and artists will have to learn to work with Houdini and the Houdini
              tools that tool developers create for them. But, it is absolutely
              worth to use Houdini. The software is super powerful and flexible as I
              have demonstrated with my racetrack tool. It is no wonder why more and
              more game companies are starting to make use of Houdini and all of the
              benefits that proceduralism brings with it. For me personally the end
              goal is always to make as much quality content in as little time as
              possible and make this content available in a game engine as well.
              Using the combination of Houdini, Houdini Engine and Houdini session
              sync I am able to do this. I am not paid to say this. I really believe
              that Houdini will play a bigger and bigger role in the future of game
              development. In the meantime I will keep learning; keep exploring
              Python and Houdini and I hope that you could take something away from
              my research.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      </div>
    </Box>
  );
}
