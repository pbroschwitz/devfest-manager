>> Alex Okrushko: Now, let's add the derived state, this
computed thing that we talked about.So we're going to do a compute.Right now we have the date.Again, we're not displaying it yet. We're
going to display it as well, but we have
the date that we'repassing in. It's kind of nice to have this
little helper to calculate how manydays until we have this future event.So let's have this. The date itself is a
source,source of truth, and the days until is
basically a derived value computed from
thedays that we have. So we'll have something
like this: days until,which would be a computedvalue. So any signals that we would use
within the body function wouldbe retriggering this computed, right?So because we're using this data multiple
times, we can just first read the value
from this,and we'll have this date there, right?So now we have this event date. It's the
actual value,string or undefined, if it's not there,
right?If the event date is undefined or null,we can just return null as well, return
null as well.So we basically immediately exit.There's no days until. Yeah.Then, how do we compute the days until?Well, we can use some help from today's
date.So we'll first calculate what is today is
today by calling the new date function,and then we'll create the date object from
the target date,which is the event date.And then we'll pass this event date stringright? So basically create usthe date object. Now we need to findthe difference between the two, right?So we'll just do the constant of time,and this will be targetget time, so we get it in milliseconds,minus the today get time as well, minusAll right, so now wehave the difference. This difference is
still in milliseconds,so we need to compute and convert to days.Again, this is a simple conversion.We'll divide the milliseconds onto the
times that we have in the day,and then basically round it up.So we'll have diff days, mathceiling of this diff time, divided by, and
thisis again, this is one of those tricks that
I like.In general, I never multiply the dates,
time values together.I split them up by milliseconds, seconds,
minutes,days, hours, whatever I need, right?So I'll typically have, hey, I need to
have days, so I needmilliseconds, seconds, minutes, and hours,
right?So I'll say, hey, this is 1000
milliseconds,then there's 60 seconds, 60 seconds, then
there's 60 minutes inan hour, and then it's like 24 means the
whole day is 24 hours,right? It's just again some helpful tricks
that I do.Typically always do that. Or even
sometimes I would push this into the
constantand explain what it is as well: time and
milliseconds,day, days and milliseconds, for example.So this is to avoid the magic numbers in
your codebase,which could be surprising, what the hell
is that, right?All right, and then so I have my diff
days.It could be also negative, by the way,
because if the event is passed,it'll be negative. This will work still.And now I'm returning this, returndiff days. All right, so now we have a
computed that will compute us the daysuntil the event. Let's utilize this in our
template now,and this is where we'll use another cool
thing,which is a let directive.I can read the value once from the days
until and put it into a specific constin the template directly, and what is
going to help me is this let directive.I can say let days, and I can read these
days until,right? So I'll now computed the days once,
read it once,and I'm going to be reusing it multiple
times in my template.All right, so I have this one here.This is for, yes, cool.So I have this bubble here already.This is where our days until will go, and
this bubble is just empty.First of all, I need to make sure the days
are not null,so it's like an optional value.So I do again, this is the new control
flow.They were introduced already some time
ago, probably a few years ago,three or four versions of Angular ago.But they're really powerful, and this is
where,coming back to the power of Angular's
compiler, before that it wasn't present,we had the ng-if and ng-for directives.And because the initial idea for Angular
template would be almost 100% compatiblewith actual HTML, no extra things, this
was reviseda few times. And one of the reasons that
it was revised is because,well, if you go away from the modules now,right, you need to import these directives
for the components,so every component will have ng-if and
this and this.It becomes too much, too much.So they said, okay, let's just have a newcontrol flow syntax. And this new control
flow syntax, again, this allows us to have
this@let, @if, right? So this will help
compiler to distinguish how to read thistemplate and where to put what.Having your own compiler is super
powerful.I'm sure it was a lot of work for Angular
team to originally implement that,right? JSX is already like straight
available, no need for that,but this was pre-JSX days and is, I think,a really powerful feature of Angular.That's actually also what allowed Angular
team to rewrite the Angularitself a few times over this 21 versions.They literally rewrote the framework but
provided the same developerexperience or improved. Then they rewrote
and then improved the developer experience
with that furtherright? So we'll check thathey, if these days isnot null, then we can do something about
it,right? So this is we're going to wrap it.This is that, okay, cool, that'sthis stuff, I think. Yes, that's this div.We won't have anything else, and you can
see now it should be gone,right? It's gone because for this one we
didn't pass the day.All right, so now that's gone.Now in this bubble, let's have some text.So we'll have another @if, and we'll say,hey, if days is more than zero, then we
can say daysdays, right? Then we cansay that in, whatever that value is, daysSee, that's why we havethis let directive. We use these days many
times.We could have used days until every time,
but there's no reason.We could just have a variable in the
template, in this many days.Then we'll have or elseif, else if days is less than zero,which ideally it shouldn't happen.You probably should filter at the Backend
because right now it says upcoming events,right? So but anyhow, if it was in the
past,I can just say past the event, past the
event.And finally we'll just do else, andit's just because there's zero days. That
means it's like happening now,happening now. All right, sonow we have our strings here.Perfect. Let's check. It should be working
now.Yes, in one day, in one day.Probably should also check the day or days
difference,but if we just go to our event list and
just move itfor one day here, which is today dayit's happening now, right?