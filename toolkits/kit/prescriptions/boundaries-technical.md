---
vertex: boundaries
substrate: technical
status: drafted
---

# Boundaries × Technical

## Signature

One service is being asked for things its original interface did not promise. The interface has grown by accretion — a parameter here, a special case there, a debug flag that became load-bearing. The service is now performing functions outside its scope, and its actual contract no longer matches its original one. The team has adapted to its over-performance.

## Reading

Movement 3 + **`tensegrity_application_lens.md`**. Precise geometry determines structural capacity. In tensegrity, a member that takes load outside its designed axis collapses the whole structure — not at the member, but somewhere unrelated. The same is true of a service that has crept past its interface: when it fails, the failure shows up somewhere else.

## Practice

**exit.html** — exit and withdrawal as a structural primitive, not a failure. Walk the practice in its ordinary register first, then translate to a technical artifact you maintain.

## Intervention

Find one component whose responsibility has crept past its original interface. Restore the interface. Reject the requests that fall outside it — return errors that say plainly, *this is no longer my responsibility, and it never was.* The calls that fail tell you where the next component needs to be built. Build it, or accept that those requests have no legitimate home in your system.

## Expected resistance

*"But everyone depends on this."* — The dependency is the problem. You are not removing the capability; you are forcing it to find its proper architectural home, which is not inside this component.

## Signal of success

The component's interface fits on a single page. The error returns from out-of-scope requests stop being seen as bugs and start being seen as routing information.
