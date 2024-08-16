# Steps to build and run app:

1 - Get Tauri set up on your machine. To do this, follow the [quick start guide](https://tauri.app/v1/guides/getting-started/prerequisites)

3 - npm install. You only need to do this the first time

4 - npm run tauri dev

# Why Monaco?

The main design choice we had to make toward the end of this project was the following:

How would we implement our code editing element?

We tried using an HTML textarea element. This worked great for us until we wanted to implement a certain feature: syntax highlighting. The main problem is that a textarea cannot have any child elements, meaning we wouldn't be able to use something like a mark or a span element to be able to change the styling of specific characters within the element. After searching, I found a couple of sources discussing this very problem. The main options we found concerning this were the ones found at https://codemirror.net/, https://zackoverflow.dev/writing/implementing-syntax-highlighting/, and https://microsoft.github.io/monaco-editor/. If we were to implement a component ourselves, it became clear to us that we would need to implement a parser and write code that would update the syntax tree everytime the source code would change. Given our limited knowledge, the amount of time left, and a belief that what we could come up with would 1) not be efficient enough and 2) not be applicable to multiple languages without taking the time to write the grammars for them, we decided to use an already existing tool. Out of the options of Tree-Sitter, codemirror, and monaco editor, we decided to go with monaco editor because it had the most robust documentation and offered more features than any of the other options. It also gave us an opportunity to practice the very valuable skill of importing a custom react component and working with it, which isn't something we would have had to do with the other options which were not built with react. By using monaco editor, we were able to learn a lot about using something created by someone else and work around it. Although using monaco editor did not bring about the difficulties of writing a parser and creating your own syntax tree, we dealt with a much more common in react that comes with using dependencies and making sure you always are updating state and rerendering at the appropriate times. The problems we encountered were not the ones faced by classic programmers, but more modern ones; and I'd argue that those challenges can be just as difficult.
