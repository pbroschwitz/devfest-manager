>> Alex Okrushko: Linked signal. So we have a like button
here,right, which again, right now it doesn't
work, but we want to make it work.It's kind of local state to the component,
but also we can pass the like state from
the parentsaying, hey, somebody liked it before,
maybe you saved it in local storage,maybe some other way. So let's have a
linked signal for this like.We'll create an input for this, and again,it's 100% optional. This is our component,
and by the way,see I'm grouping my code here.I typically try to have my inputs and
outputs first thing at the top of the
component,then I'll have my computed and other
things, then I'll have my constructor if I
have to,and then I'll have my methods after that.So now we have here, I'll call it initial
like,initial like, because that's what the
parent will kind of pass to me and I just
sayinput false, right? So I'm providing thedefault value. I don't need to specify the
type actually anymore, so you can infer
the type from thevalue that I passed as well.So my initial like. Now I will have the
function,the not the function, the linked signal.I'll have my signal that isfavorite, and this favorite is linked
signal.And we'll read if the parent is pushing
the value,we'll take it. If not, then we can do
things on our own.So I'm reading the initial like here, so
I'm linking my signal tothe initial like. That's why it's linked.And then what I'm going to do here further
is I'll have my function to togglethe favorite. By the way, this is a
Canadianway of spelling, I think, right, you guys?No? She asked, okay. Anyhow, so this is
where I'm goingto use the update function or method on
the signal.So is my favorite, if I toggle it, every
time I click it,I want to inverse the value.So is favorite, I'll do update, and I'll
read my valueand I'll have my opposite value, for
example, right?So inversing the local signal state.All right, so that should work now.We now need to add this functionality to
the template itself.So we'll have here, we'llread that value of is favorite, and again,we can use the ternary operator here, no
problem.I can say, hey, if it's favorite, then
we'll have the full heart.You can do this heart.Alternatively, we'll just use this value.This is also a string, or you can use this
copy of this heart as well,whatever you want. You can do this one, it
looks cool.All right, so that's it.We'll save it, make sure everything's
compiling fine.Cool. Let's take a look at it. Now, we
initially don't pass any value.Okay, clicking it, I need also the toggle
value, right?So one thing that we also want to do is to
add the functionality of this button.So we have this button and we'll bind it
to the click eventWhen the click is happeningthen we'll call this togglefavorite method, right? And one more thing
we'll do,we can again optionally add classes to the
components.This is nothing new, this has been around
since very early versions of Angular,but this is again a very powerful thing
that you can do.So we're going to say that we'll add this
class of textred if it's his favorite, right?So this is a conditional logic to add this
class.All right, so again, Angular does hot
module reloading by defaultso it rebuilds and itshould work now. And as you can see, click
it,it works. That's awesome, right?So it's working. One more time.If a parent at a certain point would want
to push a new initial like stateour linked signal would beoverwritten from what the parent wanted.