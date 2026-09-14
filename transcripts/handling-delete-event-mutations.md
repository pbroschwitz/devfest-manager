>> Alex Okrushko: So that is great, and HTTP resource isreally amazing for reading the data.However, there's an issue with writing the
data or mutating the data, changing state.As I mentioned a little bit earlier, if
you send a request and there's another
value change,it'll cancel that one. Moreover, if the
HTTP resource is part of a component,for example, right now we have a service,
which is good,but if you had it in the component and you
move from one page to another,your HTTP resource will be destroyed, so
if you are posting that,that request will be canceled altogether,
right?So that's quite an issue.So Angular also recommends to use, if you
usea HTTP resource, only using it for the
fetching of the data,right? But in real applications, we do
need to modify data as well sometimes,right? So let's see how we can handle the
mutations.In our case, we'll just add ways to delete
the events as well.So in our event serviceactually, let's go back tothe list itself, the event list. So right
now,we are doing it just calling the console
log.Obviously it's not going to be the best
approach, so we'll just tell it to delete
eventdelete event, which will beour method, and we'll pass which exactly
event to delete because we have,each event has an ID.So it highlights doesn't exist yet, that's
right,so we'll create this, so we'll create thedelete event, delete event, and we'll pass
the IDof what we want to delete.So we can have some confirmation or not,
up to you,but the main idea is that we'll invoke
this service,event service, and we'll just delete the
event there.So we're basically delegating it.Event service becomes almost like a wrap
around our HTTP client,so it knows how to invoke certain things,
and that's a good abstraction in general,so that service knows which exact URLs to
call and how to do some of those thingsIt doesn't get too involvedwhat happens after, or it can be involved,it's all depending how you structure this,
so in our case,we'll just need to have this delete event
in our service,and we're going to get back to the
template in a second.So the way we're going to delete this
event,let me see here, delete event service,
delete event service,that's right. We should havethe code for this as well.Delete event, delete event service, it
will have a delete event service code.But what we're going to do is in our event
service,we're going to create this delete event,
and again, it'll be basically as ID
string.All right, so that's one.So this service will be super simple.We're going to inject our HTTP client
here, so,okay, we'll just have private, private
read-only so it's not exposed outside ofthe service. This probably could be
read-only as well,so let's call it HTTP and we'll inject the
standard Angular's HTTPclient. That's the one that is provided to
the appin our configuration, where's the
configuration here, right,this is HTTP client, this is, and even the
HTTP resources using HTTP client as well
under the hood.So we have this HTTP client now, and in
thisdelete event, we're going to do just,
we're just return the result of this HTTP,and then we're going to post the, we're
going to set a delete event,delete event, returning nothing for us to.This URL, this is the same API URL.So I'll be this API URL, slashour ID. So if we post to this,or if we send a delete request to this,it'll delete it. One thing to note is it
returns usobservable back, so HTTP client by default
in today's Angular,it's working with observables. And there
are good things forus. But it's a single time observable.Observables sometimes are designed to
create many different events synchronouslyor asynchronously, they can emit many
values.This is a single time emitting observable,
although there's no difference intypes, for example, it just says it's
observable of some kind of result.In this case, void. We're going to touch a
little bit on this during the advanced
AngularFor now, the way weoperate this, like, unlike promises, you
can call a promise,promise is done, you might be not awaiting
or waiting for it, but the promise will
execute the code.Observable does not execute the code until
it's subscribed to.So that's just as much as we need to know
for now.So it returns as observable, so it doesn't
invoke this if we just call it by default,right? So we do this, it doesn't do
anything.So what we need to do is we need to
subscribe for this,subscribe to this, when we subscribe to
this, we basically have two results,well, a few, three, but two that we care
about.First is the success, so when everything's
fine, it has like the value of success,but this one returns as void, so just
void, we'll be doing nothing,and then the other one is the error,the one we want to know about. So if HTTP
client calls something and there's no,500 or whatever, it goes into the error
channel.So in our subscribe, we, let's just handle
both.So when we have the next, which is the
success,we're going to call something, going to
call,what we're going to call?We're going to go to our event service,because we just deleted the event.We want to refresh it.So we're going to go to our events, and
thisresource has another, we saw, we saw
value,we saw error, we saw spending, it has
another cool thing is because it's reload.So it will re-trigger the HTTP request
without actual query changingit's just like, hey, whateveryou have now, just redo it.Right, and it's up to you where you want
to put this logic,do you want to put this logic in the
service itself, basically, do you want to
reload events every timethe delete is happening, then you could
have moved this logic into your serviceIn our case, we justbecause we're tying a searchquery to a specific event, they can
technically have a few of them with
different queries,right? So we want to reload this specificHTTP resource, right? So that's one, and
error,it's always good to handle the error, and
then again,in this case, what do we want to do, which
is likeconsole log. Console log it and do the
alert,that's, it's just the extent of what we're
going to do.Typically you want to do maybe a little
bit more around this.And so this one is mutation, we are
deleting something on theBackend. And it will survive all things,
right?That's the standard way in as of Angular
21 tohandle mutations. Let's make sure that our
delete event is wired.Delete event is wired here.Let's make sure that we can delete one of
those events, for example,signals deep dive, not interested.Oh, let's see. And it's loading gun.Right? So we deleted the event, it
refetched it,and things are gone, and moreover, it's
updated our JSON file herea DB JSON, because it'slive tracking it. I just want to undo this
because I want to make sure thatwe still have all those three events here,
I'm going to do undo for the RDB JSON.Cool. All right. And then, again if we
refresh the page,we have all three events back.Yes, questions? Yeah, I noticed you did
not use complete, you use the next,the error, and now we don't have complete
again,right? Yes, completed is usually when the
observable streamcloses, in our case, there's nothing, this
next value is good enough,because it will close anyway for the next,because it's a single time emission, so we
don't really need complete.Complete is technically, like rarely used.Again, it's more use when you need to know
when all the values are through and the
observable actuallycompleted. Yeah, don't need it in this
case.And then, and reload again is new to me,
so,yes, I love that, it's cool. Reload is
part of theHTTP resource. This is generally the
pattern for like server cache type of
things tohave a way to revalidate or send and get
all the new fresh data,invalidate and revalidate, right? So
that's very powerful.Are there any major differences between
using the subscribetechnique versus the finalize RxJS pipe?So subscribe, you need to subscribe
anyway, if you don't subscribe to
observable,it just won't execute. On finalize,
finalize is one of the operatorswithin RxJS. I didn't go into the
operators here much,we'll see some of them in the advanced
Angular, the ones that I feel like are
quite important,but generally finalize works for success
and error cases.That's, it's catching, it's listening for
both streams,so next and error, the finalize would do,that's a great example, if you, for
example, have like some loading spinner,whatever, and you want to turn off the
spinner,not only on success, but also on the
error, so you'd use a finalize operator
and just disablethem both, but I'm going to show you some
other ways to deal with these things in
advancedAngular as well. But yeah, good question.