---
vertex: differentiation
substrate: technical
status: drafted
---

# Differentiation × Technical

## Signature

Two components have overlapping responsibility. Engineers describe each in language that contains the phrase "and also." Changes ripple unpredictably because no one is sure which component owns which behavior. Onboarding a new engineer requires a mentor because the architecture diagram lies.

## Reading

Movement 1 + **`tensegrity_application_lens.md`**. Tensegrity's compression elements are *discontinuous* — they do not touch each other directly. In software this maps to components that communicate through clean interfaces rather than shared state. A component without distinct boundaries cannot bear distinct load.

## Practice

For each component, write three sentences: *what it is, what it isn't, what it owns.* Read across the team. Where two members write contradictory descriptions for the same component, you have found the differentiation gap.

## Intervention

Pick one place where two components have overlapping responsibility. Make one own it. Remove the duplication. The coupling that breaks unrelated to the duplication you removed — that is the hidden coupling that was already there. Document it.

## Expected resistance

*"But we'll lose flexibility."* — The flexibility was undefined behavior. You are trading the appearance of flexibility for the reality of capacity.

## Signal of success

A new engineer can read the architecture diagram and produce a correct mental model without conversation.
