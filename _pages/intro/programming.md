---
title: Programming Computers
---
## Computation

Let's consider two moments from the history of computing to get some context about how we design, build and use computers today.

This is just one narrative from the history of computing. Follow the links below for more information about other stories and figures important to the development of computers and computation.

For now, let's start in the $$1930$$s with the parallel development of two abstract mathematical ideas: the binary properties of electrical switches and the Turing Machine.

### The Turing Machine

English mathematician Alan Turing came up with the concept of the [Turing Machine](https://en.wikipedia.org/wiki/Turing_machine) in $$1936$$ during his PhD at Princeton University.

The Turing Machine is a conceptual model of computation that describes a simple machine that uses very few rules to perform arbitrary and complex computation.

In its simplest form, the machine consists of an infinite tape that holds data and instructions. During its operation, the machine reads a value from the tape and, depending on the history of values read so far, it will either overwrite the value on the tape, move one position and read a new value, or stop. That's it.

<div class="scaled-images">
  <img src="{{ '/assets/images/intro/turing-machine.jpg' | relative_url }}">
</div>
*Simplified representation of a Turing Machine with instruction set $$\{$$ $$X$$, $$Y$$, $$\varnothing$$, $$\forall$$ $$\}$$*

This simple model of reading and writing instructions and data from the same place is still used today, and is what enables computers to do an almost infinite number of tasks using a finite number of instructions.

### Electrical Switches

In $$1937$$ Claude Shannon wrote his master's thesis "[A Symbolic Analysis of Relay and Switching Circuits](https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits)" while at MIT. In his thesis Shannon showed how to optimize telephone relay circuits by using a form of algebra that only uses two numbers: $$1$$s and $$0$$s.

He went on to prove that this type of math, called [Boolean Algebra](https://en.wikipedia.org/wiki/Boolean_algebra), could be implemented using electrical switches that were either $$on$$ or $$\mathit{off}$$.

The properties of this binary algebra make it easy to build complex circuits from very basic, repeatable, building blocks. What this means is that many types of calculations and logic problems could now be solved using physical circuits that were easy to conceptualize, design and scale.

<div class="scaled-images">
  <img src="{{ '/assets/images/intro/shannon-switches.jpg' | relative_url }}">
</div>
*Different representations of the logic operations that were implemented by Shannon using electrical switches*

This enabled the physical construction of Turing Machines that use $$0$$s and $$1$$s to describe instructions, data and state, and is still used today to build more complex computation machines.

## Programming

In these two stories we can not only see the beginnings of what later developed into more refined systems for computation, but we can also see the appearance of certain concepts that are still important today when we want to tell computers what to do.

The kinds of things that a computer can do has constantly evolved since the $$1930$$s, but *how* we tell computers what to do is still vastly influenced by concepts like memory, instructions, internal state, loops, boolean logic and binary circuits that can be traced back to a time when what we understand today as a *computer* wasn't even physically possible.

Programming, or coding, is the art and science of telling a computer to do *something* by giving it some data along with sequences of instructions that specify exactly what it should do with the data.

Some form of computer programming has been happening since at least the $$1830$$s when [Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace) wrote a program to calculate a sequence of Bernoulli numbers on a mechanical computer. Mechanical computers were programmed using punched cards, physical pieces of cardboard with holes, that were fed into the machine at specific times. The holes, or lack of holes, in specific positions of the cards is what determined whether certain mechanical connections were made, and this is what caused the computer to behave in a specific way.

It wasn't until the $$1940$$s, with the advance of electronic computers, that writing and running a computer program could be done on the same machine. The commands that were given to these computers, however, were still pretty much written out in a way that specified sequences of $$on$$ and $$\mathit{off}$$ signals for electronic switches and other components.

## Languages

We can trace the origins of the programming languages that we use today to the late $$1950$$s, and the work of American computer scientist and Navy admiral [Grace Hopper](https://en.wikipedia.org/wiki/Grace_Hopper). Hopper showed that English terms could be used to describe instructions for a program in a generic way, that could later be translated into sequences of $$on$$ and $$\mathit{off}$$ signals for specific computers.

This led to the advent of "high-level", machine-independent, programming languages like FORTRAN, ALGOL and COBOL, which could be used to write programs in human-readable English. The term "high-level" here is somewhat relative and fluid. It's used to describe how close a programming language is to a natural language and to denote a level of abstraction provided by the language in relation to the specific hardware that its resulting programs will run on.

What was considered "high-level" in the $$1950$$s and $$1960$$s is certainly not what is considered "high-level" today.

Most of the popular programming languages used today have very expressive syntaxes with single-word commands that get turned into very long sequences of instructions for the computer to execute. Some of these languages don't even require a separate translation step to turn the human-readable code into computer instructions.

## JavaScript and p5.js

One such language is JavaScript.

JavaScript is an interpreted language, which means that the code that we write doesn't get compiled, or, translated, into instructions for the computer, but instead gets *interpreted* one line at a time by a separate program that is responsible for executing our code.

One of the main reasons behind JavaScript's popularity is that, in most instances, the program that interprets and executes our JavaScript code is a browser. Most computers, phones, watches, etc have a browser. This means that not only do we not have to worry about the specifics of the hardware it will run on, but in most cases we don't even have to worry about its operating system or any other compatibility issues.

Being a high-level, multi-paradigm programming language, JavaScript can be used to write different types of programs using different techniques or styles of programming. And like most other general programming languages, it relies on *libraries* to extend its core functionalities and provide easier ways of doing specific tasks.

The [p5.js](https://p5js.org/) library is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive. It extends the core functionality of the JavaScript language and makes it easier for programmers to create audio-visual experiences using images, drawings, videos, sound, etc, directly on a webpage in a browser.

## References

Again, this is a very high-level and particular narrative of some moments in the history of computation. Other notable moments, people and histories can be found by following these links:

- [A sketch for an alternate history of computing](https://phoenixperry.medium.com/an-alternate-history-of-computing-a-sketch-1811197814ff)
- [The Story of NASA’s *Hidden Figures*](https://www.scientificamerican.com/article/the-story-of-nasas-real-ldquo-hidden-figures-rdquo/)
- [Rhizome's Queer History of Computing](https://rhizome.org/editorial/2013/feb/19/queer-computing-1/)
- [The Wild West of Computing](https://cutpathways.podbean.com/e/a-byte-size-history-of-computing/)
