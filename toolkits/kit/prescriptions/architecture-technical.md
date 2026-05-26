---
vertex: architecture
substrate: technical
status: drafted
---

# Architecture × Technical

## Signature

One person is the runtime of the system. They onboard everyone. They are the source of truth for how anything works. The architecture diagram exists but is wrong. The system runs because they run. If they leave for a month, output collapses; if they leave permanently, the system has to be rediscovered.

## Reading

Movement 4 + **`tensegrity_application_lens.md`**. Modular design scales naturally because the structure outlasts any individual element. A technical system has Architecture when the artifacts — code, tests, docs, runbooks — carry enough information to reproduce the system without the original author present.

## Practice

Review **projects/recognition-node/README.md** as an example of architecture made portable. The shape of the artifact — README → CONTRIBUTING → docs → examples — is the shape of architecture that survives its author.

## Intervention

Find one piece of internal knowledge that lives only in one person's head or one chat thread. Externalize it into a durable artifact: doc, diagram, runnable test, executable runbook. The test for a true gift here is severe — a stranger to the project must be able to use the artifact without conversation. If they need to ask the original author what something means, the externalization didn't happen yet. Iterate until it does.

## Expected resistance

*"It's faster to just tell them."* — For now. Each time you tell them, you are paying interest on a debt the architecture is carrying. The cost is invisible until the person who knows is no longer available.

## Signal of success

A new contributor can do useful work in their first week without the central person being available.
