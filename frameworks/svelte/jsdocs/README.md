The files in this folder are used to create the svelte sdk documentation.
Until we implement an automatic process for this, this is how it works:
AdvancedImage.tsx is updated manually and svelte docs are automatically generated from it.
The html files in this directory are manually edited versions of the automatically generated docs for svelte.
They are copied over the automatically generated files by the buildDocs.js script.