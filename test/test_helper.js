import jsdom from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'

// initialize jsdom and define global variables document and window
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

// make all window properties as global variables
Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key]
    }
})

chai.use(chaiImmutable)