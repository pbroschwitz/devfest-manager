>> Alex Okrushko: Now, let's add this data to the template
itself,and this is quite a lot of things we're
doing here.Just to speed it up a little bit, it's
very similar things we've done before,but I'm going to go over the template. I'm
going to copy and paste this.If you want, I can fill it up manually,
but I'm going to go over what we're doing
here.So we're going to go here and copy this
entirething. It's just a little bit of extra
typing.Right, so this is the entire div, I think
it's the entire template that we need to
basically update hereLet me go over exactlywhat we do here. And you can see right
away, right,there's some errors that means we're
missing some imports,right? What kind of imports are we
missing?Event details, right, so we're missing,
let me see,did we paste the whole thing? No, I don't
think we pasted the whole thing.Think we need to still paste the whole
thing.I don't think I copied the entire thing.There you go, that looks more like it.I'm going to convert, remove paste.Alright, that's more like it, but we're
missing the date,it's highlighting here as well, right?So Angular is really good at giving you
hints what exactly is wrong,so there's no pipe found with this name.
To fix this, import date pipe,right, it's like, can't be clearer.Angular has been working really hard on
their error messages,they've been giving error codes to the
error messages, so they're searchable
pretty fast,and then again, LLMs can pick them up as
well really fast if you,if that's the flow you're using.So, let's fix this, right, it says we're
missing thedate pipe, let's add the date pipe.Again, I typically put my imports before
the template,so it's just everything on top and then
the template.Alright, and looks like it's compiled.But there are some things here that might
not work stilllet me check if theydo. So this is our back defense.I can see it's not working.Right, so this is I think, one of those
little things where, hey,things are compiling, and it did complain
about the date.But it didn't complain about something
else, the router link we hear,we use this, right, and it didn't quite
complain about this.Right, so it's not working yet, so we do
need to import also therouter link, a directive.And directives in Angular, they enhance
components behavior,they don't have a template.For the most part, they are basically
components without the templates,so they're called directives, and they
enhance components,adding new behaviors, and this is really
powerful as well.This allows us to target not by specific,like in a selector, not by specific name,
or specific tag only,but really we're here using the existing
anchor tag,right, the A tag, and we are enhancing the
behavior of this anchor tag with the
directivethe router link.So what it would do is that, it will
actually add the href to it and otherthings as well. Things like that, right?So router link is the directive.All right. So we're going to edit, andnow it should work, now it works, right?So we cannot get it here yet, which we're
going to fix in a second,but now, this works for the most part.Things like that are picked up by compiler
and they'll be immediately saying,hey, something's missing. Sometimes things
like that happen.So I have a router link here, and here we
do the same standard thing,right? So we have the loading resource, if
we're loading,right, the error state.And then the success and then here, we'llextract the value, also using the let
function,the let directive here, right?Get the event here and then read all the
data out of this,the title, the date, here we have the full
date,for example, I we'll read the location,
description,and things like that. We're also adding
the image tag with the sourcefor our event image. All right, sothat should help us and see it's muchbetter, right? We have a description now,
we have like the full date,see it now it's Wednesday as well.So it knows what's going on.Alright, so, what do we do next?Now, in our event card, we want to link to
this event to transitionto it, right? Right now we don't have
anything ourbutton to view details or our anchor tag
does not do anything yet.So we need to have also, the ID here.And the way we'll do it is we'll just add
another ID here and this will be another
inputthat is required and then string.Right, so that's another input that's
required.Now, in our event list, see, we'rehaving the error right away because it's
saying they were required the input ID and
we don't have itso we'll add it hereas well. So we'll say ID.It will be event ID.By the way, sometimes it's fine topass many different inputs. Sometimes you
can pass the entire eventobject directly, it depends how much
coupling you want between your components.Right, sometimes you just say, hey, this
is the event, and you read all the data
from that event directlyOkay, in this case, webasically have input by input.It's up to you, but it depends how tightly
coupled do you want to have the parentobject and child object. In ourcase, we're not passing description, we're
not passing location,we're not passing the speakers, we're not
passing any of this information,so again, partial object you can pass the
whole thing and they will use whatever,but again, you might be tightly coupling
this.Okay, so, now back to our event cards,this is something I talked about, we're
going to need thedate pipe, and do we have the routing as
well?Yes, we do have the routing as well here,
this is the view details,so we'll add immediately the router link
here as well.Router link. Router links here, it says
right now it's not used,that's good, the warning is there, so
let's use it.So in our router link herewe're going to add the router link.And see, I'm passing it with the square
brackets here,right? So that means whatever I'm passing
is not the literal string,but I'm passing some object that router
link can work with.And the object that I'm passing is I can
provide different segments,and not combining the whole URL together,
but I can provide some segments to it.I'd say the first segment is event, and
then it will join them using slashright? So it'll know howto join them correctly, and the second
segment is basically our ID,right? That's the ID that is being passed
here as an input.So this one is not bound through URL,this is literally the input that's passed
from the event list itself,right? That's the one that we're passing
here.So, now, this will create the path, it
knows exactly where the path should be
goingand if we look atour component now, if we go back.Get loading events, have events.We click on this, and it routes to the
event slash ID.