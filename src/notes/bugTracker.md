# Bug tracker

## Need to fix

## Git Graph

Need to test and improve Git Graph logic

<br/>

## Fixed

### Character counter is not counting headings.

RCA. current logic splits the content based on " " and calls it a word, in case of headings there is no separation as it's in html `<h1></h1><p></p>`
Used regex to replace html tags in the eidtor.getContent() output.

### Placeholder extension not working as expected

Wrote a custom component overlaid on top of the text editor to act as place holder

---

### Headings and lists not working

RCA, while using proseMirror with tailwind an additional plugin is required to render the markdown inside the editor properly. Added `@tailwindcss/typography` fixed it

---

### Revert to step was appending existing editor's content

Clear the doc content before initiating newDoc and build the steps in the empty newDoc
