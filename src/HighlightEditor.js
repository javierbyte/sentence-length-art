const React = require('react');
const lodash = require('lodash');

var text = `
This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It's like a stuck record. The ear demands some variety.

Now listen. I vary the sentence length, and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes when I am certain the reader is rested, I will engage him with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo, the roll of the drums, the crash of the cymbals--sounds that say listen to this, it is important.

So write with a combination of short, medium, and long sentences. Create a sound that pleases the reader's ear. Don't just write words. Write music.

-Gary Provost
`

function getLengthColor(length) {
  const colorDict = {
    1: '#FCF9C7',
    2: '#FCF9C7',
    3: '#F1D0EF',
    4: '#F1D0EF',
    5: '#FCB8B0',
    6: '#C7F5C7',
    7: '#C7F5C7',
    8: '#C7F5C7',
    9: '#C7F5C7',
    10: '#C7F5C7',
    11: '#C7F5C7',
    12: '#C7F5C7',
    13: '#A0F6F2'
  }

  return colorDict[length] || colorDict[_.keys(colorDict).length];
}

var HighlightEditor = React.createClass({

  getInitialState() {
    return {
      text: text
    }
  },

  onChangeText(evt) {
    this.setState({
      text: evt.target.value.replace(/  /g, ' ')
    })
  },

  onScroll(evt) {
    this.refs.draw.scrollTop = evt.target.scrollTop
  },

  render() {
    var {text, scrollTop} = this.state

    return (
      <div className='highlight-editor'>
        <div className='draw' ref='draw'>
          {text.split('\n').map(row => {
            return [row.split('.').map((sentence, sentenceIndex) => {
              return <span style={{
                backgroundColor: getLengthColor(_.words(sentence).length)
              }} key={sentenceIndex}>{sentence ? sentence + '.' : ''}</span>
            }), <br />]
          })}
        </div>
        <textarea value={text} onChange={this.onChangeText} onScroll={this.onScroll} />
      </div>
    )
  }
})

module.exports = HighlightEditor;
