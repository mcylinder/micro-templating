# Micro-templating
A method for rendering ATOMIC partials without a server or additional package.
Working with `tailwind.css` to build static pages and try layouts, I was pasting a lot of `html` and it was starting to get unruly. There are plenty of templating languages that could be set up for a local development environment, but I wanted a simple, short  `Javascript` file that could be dropped in.

## Server

From your command line, `cd` in to the main directory and start a local server.

### PHP
```
$ php -S localhost:8080
```

### Python3
```
$ python3 -m http.server 8080
```

### Node/NPM
I recommend this approach because of the live re-loading option. Get the [required package](https://www.npmjs.com/package/live-server).
```
$ live-server
```


## Structure
A partial is a very simple tag with an attribute. The attribute contains the name of the file intended to replace the partial. 
- First example references the file `/atomic/org/footer.xml`

```
 <org footer></org>
```
     
        
- Second example references the file `/atomic/atm/link_style_A.xml`

```
  <atm link_style_A></atm>
```


The small elements are replaced in a specific sequence: 
Organism, Molecule & Atom.   
`<org>, <mol>, & <atm>`

Learn more about the [ATOMIC design system](https://bradfrost.com/blog/post/atomic-web-design/).

The files use `.xml` as their extension because I wanted to maintain code sensing in my IDE. If I use `.html`, they would be injected with Javascript for hot reloading when using certain server options. Such as `live-server`.

The last option is a simple string token.
If you use %headline% in your code, it will be replaced by the content of this `/atomic/tkn/headline`.
